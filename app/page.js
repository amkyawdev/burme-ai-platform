'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function MainPage() {
  const features = [
    { icon: 'fa-language', title: 'SRT ဘာသာပြန်ဆို', desc: 'YouTube လင့်များကို မြန်မာစာ SRT ဖိုင်အဖြစ် ရယူပါ', link: '/translate', color: 'from-blue-500 to-cyan-500' },
    { icon: 'fa-microphone-alt', title: 'Burmese TTS', desc: 'စာသားကို အသံအဖြစ် ပြောင်းလဲပါ', link: '/tts', color: 'from-purple-500 to-pink-500' },
    { icon: 'fa-file-alt', title: 'SRT Explore', desc: 'YouTube လင့်တစ်ခုပေးပါ၊ SRT ဖိုင်ရယူပါ', link: '/srt-explore', color: 'from-green-500 to-emerald-500' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20 px-4"
      >
        <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-amber-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
          Burme AI Platform
        </h1>
        <p className="text-xl text-gray-300 mb-8">ခေတ်မီ AI နည်းပညာဖြင့် မြန်မာစာ ဝန်ဆောင်မှုများ</p>
        <Link href="/get-started">
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold btn-animated">
            <i className="fas fa-rocket mr-2"></i>
            စတင်ရန်
          </button>
        </Link>
      </motion.div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="card-hover"
            >
              <Link href={feature.link}>
                <div className="glass-card p-6 border hover:border-white/40 transition-all">
                  <div className={`bg-gradient-to-r ${feature.color} w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto`}>
                    <i className={`fas ${feature.icon} text-2xl text-white`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-white text-center mb-2">{feature.title}</h3>
                  <p className="text-gray-300 text-center text-sm">{feature.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}