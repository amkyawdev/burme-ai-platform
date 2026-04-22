'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function TranslatePage() {
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [srtContent, setSrtContent] = useState('')
  const [error, setError] = useState('')

  const handleTranslate = async () => {
    if (!youtubeUrl.trim()) {
      setError('YouTube link ထည့်ပါ')
      return
    }

    setLoading(true)
    setError('')
    setSrtContent('')

    try {
      const response = await fetch('/api/subtitle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ youtubeLink: youtubeUrl, action: 'srt' })
      })

      const data = await response.json()

      if (data.success) {
        setSrtContent(data.srt)
      } else {
        setError(data.error || 'Translate failed')
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    if (srtContent) {
      await navigator.clipboard.writeText(srtContent)
      alert('Copied!')
    }
  }

  const handleDownload = () => {
    if (srtContent) {
      const blob = new Blob([srtContent], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'burme_subtitle.srt'
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
          <i className="fas fa-language text-5xl text-blue-400 mb-4"></i>
          <h1 className="text-3xl font-bold text-white mb-2">SRT ဘာသာပြန်ဆို</h1>
          <p className="text-gray-400">YouTube link ကနေ SRT subtitle ရယူပါ</p>
        </div>

        {/* Input Section */}
        <div className="glass-card p-6 mb-6">
          <label className="text-sm text-gray-400 mb-2 block">YouTube Link:</label>
          <input
            type="text"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
          />

          {error && (
            <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm">
              <i className="fas fa-exclamation-circle mr-2"></i>
              {error}
            </div>
          )}

          <button
            onClick={handleTranslate}
            disabled={loading}
            className="mt-4 w-full social-btn bg-gradient-to-r from-blue-600 to-cyan-600 text-white disabled:opacity-50"
          >
            {loading ? (
              <><i className="fas fa-spinner fa-spin mr-2"></i>Translating...</>
            ) : (
              <><i className="fas fa-language mr-2"></i>Translate</>
            )}
          </button>
        </div>

        {/* SRT Output Section */}
        {srtContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">SRT Content:</h3>
            <textarea
              value={srtContent}
              readOnly
              className="w-full h-64 p-4 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-sm resize-none"
            />
            <div className="flex gap-4 mt-4">
              <button onClick={handleCopy} className="social-btn flex-1 bg-emerald-500 text-white">
                <i className="fas fa-copy mr-2"></i>Copy
              </button>
              <button onClick={handleDownload} className="social-btn flex-1 bg-purple-500 text-white">
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