import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '더 워케이션',
  description: '기업을 위한 워케이션 플랫폼',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-[#0F172A] text-[#F1F5F9] min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}
