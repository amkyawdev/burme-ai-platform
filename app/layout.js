import './globals.css'
import MenuBar from './components/menu-bar'
import BackgroundThree from './components/background-three'

export const metadata = {
  title: 'Burme AI Platform',
  description: 'Burmese AI Platform for Translation, TTS, and SRT Processing',
}

export default function RootLayout({ children }) {
  return (
    <html lang="my">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body>
        <BackgroundThree />
        <MenuBar />
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  )
}