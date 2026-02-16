import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'BuffCut Tracker',
  description: 'Personal fitness and nutrition tracker',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-gray-900 text-white p-4 shadow-lg">
          <div className="container mx-auto flex gap-6 items-center">
            <Link href="/" className="text-xl font-bold hover:text-blue-400 transition">
              🏋️ BuffCut
            </Link>
            <Link href="/" className="hover:text-blue-400 transition">
              Dashboard
            </Link>
            <Link href="/history" className="hover:text-blue-400 transition">
              History
            </Link>
          </div>
        </nav>
        <main className="container mx-auto p-4 md:p-6 max-w-6xl">
          {children}
        </main>
      </body>
    </html>
  )
}
