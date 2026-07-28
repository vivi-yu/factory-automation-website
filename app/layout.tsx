import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { V1ThemeProvider } from '@/components/v1/V1ThemeProvider'
import './globals.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '友军博品',
  description: '友军博品企业资源与项目需求对接平台。',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: [{ media: '(prefers-color-scheme: light)', color: '#0066cc' }],
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className="bg-background">
      <body className="antialiased">
        <V1ThemeProvider>{children}</V1ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
