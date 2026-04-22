'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function MenuBar() {
  const pathname = usePathname()
  
  const menuItems = [
    { icon: 'fa-home', label: 'Home', href: '/' },
    { icon: 'fa-language', label: 'Translate', href: '/translate' },
    { icon: 'fa-microphone', label: 'TTS', href: '/tts' },
    { icon: 'fa-file-alt', label: 'SRT', href: '/srt-explore' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-lg border-t border-white/10">
      <div className="flex justify-around items-center py-3">
        {menuItems.map((item) => (
          <Link 
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center px-4 py-2 rounded-xl transition-all ${
              pathname === item.href 
                ? 'text-purple-400 bg-purple-500/20' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <i className={`fas ${item.icon} text-xl mb-1`}></i>
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}