'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function SRTExplorePage() {
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [srtContent, setSrtContent] = useState('')
  const [error, setError] = useState('')

  const handleFetch = async () => {
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
        setError(data.error || 'Failed')
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
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
          <i className="fas fa-file-alt text-5xl text-green-400 mb-4"></i>
          <h1 className="text-3xl font-bold text-white mb-2">SRT Explore</h1>
          <p className="text-gray-400">YouTube link ပေးပါ SRT ရယူပါ</p>
        </div>

        <div className="glass-card p-6 mb-6">
          <input
            type="text"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500"
          />

          {error && (
            <div className="mt-4 p-3 bg-red-500/20 rounded-xl text-red-400">
              {error}
            </div>
          )}

          <button
            onClick={handleFetch}
            disabled={loading}
            className="mt-4 w-full social-btn bg-gradient-to-r from-green-600 to-emerald-600 text-white"
          >
            {loading ? <><i className="fas fa-spinner fa-spin mr-2"></i>Fetching...</> : <><i className="fas fa-search mr-2"></i>Fetch SRT</>}
          </button>
        </div>

        {srtContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-6"
          >
            <textarea
              value={srtContent}
              readOnly
              className="w-full h-64 p-4 rounded-xl bg-white/5 text-white font-mono text-sm"
            />
            <button
              onClick={handleDownload}
              className="mt-4 w-full social-btn bg-emerald-500 text-white"
            >
              <i className="fas fa-download mr-2"></i>Download SRT
            </button>
          </motion.div>
        )}

        <div className="text-center mt-6">
          <Link href="/" className="social-btn bg-gray-700 text-white">
            <i className="fas fa-arrow-left mr-2"></i>Back
          </Link>
        </div>
      </motion.div>
    </div>
  )
}