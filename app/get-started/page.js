'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function GetStartedPage() {
  const steps = [
    { icon: 'fa-key', title: 'API Keys ထည့်သွင်းပါ', desc: 'ElevenLabs, YouTube, Gemini API keys များကို Vercel မှာ ထည့်ပါ' },
    { icon: 'fa-play-circle', title: 'ဝန်ဆောင်မှုရွေးချယ်ပါ', desc: 'Translate, TTS, SRT Explore များထဲက တစ်ခုကို ရွေးပါ' },
    { icon: 'fa-download', title: 'ရလဒ်များ ရယူပါ', desc: 'SRT subtitle file နှင့် Audio file များကို ဒေါင်းလုဒ်လုပ်ပါ' },
  ]

  return (
    <div className="min-h-screen pb-20 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto py-8"
      >
        <div className="text-center mb-12">
          <i className="fas fa-robot text-6xl text-purple-400 mb-4"></i>
          <h1 className="text-4xl font-bold text-white mb-4">Burme AI Platform</h1>
          <p className="text-gray-300">AI နည်းပညာဖြင့် မြန်မာစာ ဝန်ဆောင်မှုများ</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.2 }}
              className="glass-card p-6 text-center border border-white/10"
            >
              <div className="bg-purple-600 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className={`fas ${step.icon} text-2xl text-white`}></i>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/" className="social-btn bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3">
            <i className="fas fa-rocket mr-2"></i>
            စတင်အသုံးပြုရန်
          </Link>
        </div>
      </motion.div>
    </div>
  )
}