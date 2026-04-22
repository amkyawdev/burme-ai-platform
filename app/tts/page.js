'use client'
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function TTSPage() {
  const [text, setText] = useState('')
  const [voiceId, setVoiceId] = useState('21m00Tcm4TlvDq8ikWAM')
  const [loading, setLoading] = useState(false)
  const [audioUrl, setAudioUrl] = useState(null)
  const [error, setError] = useState('')
  const audioRef = useRef(null)

  const voices = [
    { id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel', gender: 'Female', lang: 'English' },
    { id: 'AZnzlk1Xvlr_ohmBJOsoN', name: 'Arnold', gender: 'Male', lang: 'English' },
    { id: 'cgSgspmF5nEAl3hHy3UKj52VjhHpN3u2o', name: 'Nilar', gender: 'Girl', lang: 'Myanmar' },
    { id: 'CwhRBw10ZMtXXKqm3B2i', name: 'Thi Ha', gender: 'Boy', lang: 'Myanmar' },
  ]

  const handleGenerate = async () => {
    if (!text.trim()) {
      setError('Text ထည့်ပါ')
      return
    }

    setLoading(true)
    setError('')
    setAudioUrl(null)

    try {
      const response = await fetch('/api/subtitle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'tts', text, voiceId })
      })

      const data = await response.json()

      if (data.success) {
        setAudioUrl(data.audio)
      } else {
        setError(data.error || 'Generation failed')
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  const handlePlay = () => {
    if (audioRef.current) {
      if (audioUrl) {
        audioRef.current.src = audioUrl
        audioRef.current.play()
      }
    }
  }

  const handleDownload = () => {
    if (audioUrl) {
      const a = document.createElement('a')
      a.href = audioUrl
      a.download = 'burme-tts.mp3'
      a.click()
    }
  }

  return (
    <div className="min-h-screen pb-20 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto py-8"
      >
        <div className="text-center mb-8">
          <i className="fas fa-microphone text-5xl text-purple-400 mb-4"></i>
          <h1 className="text-3xl font-bold text-white mb-2">Burmese TTS</h1>
          <p className="text-gray-400">Text to Speech Generator</p>
        </div>

        {/* Voice Selection */}
        <div className="glass-card p-6 mb-6">
          <label className="text-sm text-gray-400 mb-3 block">Select Voice:</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {voices.map((voice) => (
              <button
                key={voice.id}
                onClick={() => setVoiceId(voice.id)}
                className={`p-4 rounded-xl text-center transition-all ${
                  voiceId === voice.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/5 border border-white/20 hover:border-purple-500/50'
                }`}
              >
                <div className="font-medium">{voice.name}</div>
                <div className="text-xs opacity-70">{voice.gender}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Text Input */}
        <div className="glass-card p-6 mb-6">
          <label className="text-sm text-gray-400 mb-2 block">Enter Text:</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Text ရိုက်ထည့်ပါ..."
            className="w-full h-32 p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
            maxLength={500}
          />
          <div className="text-sm text-gray-500 mt-2">{text.length}/500</div>

          {error && (
            <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm">
              <i className="fas fa-exclamation-circle mr-2"></i>
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-4 w-full social-btn bg-gradient-to-r from-purple-600 to-pink-600 text-white disabled:opacity-50"
          >
            {loading ? (
              <><i className="fas fa-spinner fa-spin mr-2"></i>Generating...</>
            ) : (
              <><i className="fas fa-microphone mr-2"></i>Generate</>
            )}
          </button>
        </div>

        {/* Audio Player */}
        {audioUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4 text-center">Generated Audio</h3>
            <audio ref={audioRef} className="w-full mb-4" controls />
            <div className="flex gap-4">
              <button onClick={handlePlay} className="social-btn flex-1 bg-blue-500 text-white">
                <i className="fas fa-play mr-2"></i>Play
              </button>
              <button onClick={handleDownload} className="social-btn flex-1 bg-emerald-500 text-white">
                <i className="fas fa-download mr-2"></i>Download
              </button>
            </div>
          </motion.div>
        )}

        {/* Back Button */}
        <div className="text-center mt-6">
          <Link href="/" className="social-btn bg-gray-700 text-white">
            <i className="fas fa-arrow-left mr-2"></i>Back
          </Link>
        </div>
      </motion.div>
    </div>
  )
}