import { NextResponse } from 'next/server'
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js'

export async function POST(request) {
  try {
    const body = await request.json()
    const { youtubeLink, text, voiceId, action } = body

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
    const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY

    // TTS - ElevenLabs SDK
    if (action === 'tts') {
      if (!ELEVENLABS_API_KEY) {
        return NextResponse.json({ success: false, error: 'Set ELEVENLABS_API_KEY in Vercel' })
      }
      if (!text) {
        return NextResponse.json({ success: false, error: 'Text required' })
      }

      try {
        const voice = voiceId || '21m00Tcm4TlvDq8ikWAM'
        
        const elevenlabs = new ElevenLabsClient({ apiKey: ELEVENLABS_API_KEY })
        
        const audio = await elevenlabs.textToSpeech.convert(
          voice,
          {
            text: text,
            model_id: 'eleven_v3',
            output_format: 'mp3_44100_128'
          }
        )

        // Convert to base64
        const chunks = []
        for await (const chunk of audio) {
          chunks.push(chunk)
        }
        const buffer = Buffer.concat(chunks)
        const base64 = buffer.toString('base64')
        
        return NextResponse.json({ 
          success: true, 
          audio: `data:audio/mpeg;base64,${base64}` 
        })
      } catch (e) {
        return NextResponse.json({ success: false, error: 'TTS error: ' + e.message })
      }
    }

    // SRT from YouTube
    let videoIdToUse = null
    if (youtubeLink) {
      const match = youtubeLink.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
      if (match) videoIdToUse = match[1]
    }

    if (!videoIdToUse) {
      return NextResponse.json({ success: false, error: 'YouTube link required' })
    }

    let videoTitle = 'YouTube Video'
    let videoDescription = ''

    // Get YouTube video info
    if (YOUTUBE_API_KEY) {
      try {
        const ytResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?id=${videoIdToUse}&key=${YOUTUBE_API_KEY}&part=snippet`
        )
        
        if (ytResponse.ok) {
          const ytData = await ytResponse.json()
          if (ytData.items?.length > 0) {
            videoTitle = ytData.items[0].snippet.title
            videoDescription = ytData.items[0].snippet.description || ''
          }
        }
      } catch (e) {
        console.log('YouTube error:', e)
      }
    }

    // Generate SRT with Gemini
    if (GEMINI_API_KEY) {
      const srtPrompt = `Create SRT subtitle for YouTube video "${videoTitle}". 
Description: ${videoDescription}

Create 8 subtitle lines in proper SRT format:
1
00:00:00,000 --> 00:00:03,000
English subtitle

2
00:00:03,500 --> 00:00:06,000
Next subtitle`

      try {
        const srtResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: srtPrompt }] }],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 4096
              }
            })
          }
        )

        if (srtResponse.ok) {
          const srtData = await srtResponse.json()
          const srtContent = srtData.candidates?.[0]?.content?.parts?.[0]?.text
          
          if (srtContent) {
            return NextResponse.json({ 
              success: true, 
              srt: srtContent.trim(),
              videoId: videoIdToUse,
              title: videoTitle
            })
          }
        }
      } catch (e) {
        console.log('Gemini error:', e)
      }
    }

    // Fallback
    return NextResponse.json({
      success: true,
      srt: `1
00:00:00,500 --> 00:00:03,000
${videoTitle}

2
00:00:03,500 --> 00:00:06,000
Welcome to Burme AI Platform!

3
00:00:06,500 --> 00:00:10,000
Made with ❤️ for Myanmar 🇲🇲`,
      videoId: videoIdToUse,
      title: videoTitle
    })
    
  } catch (error) {
    console.log('API Error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Server error: ' + error.message 
    }, { status: 500 })
  }
}