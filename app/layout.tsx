import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { V1ThemeProvider } from '@/components/v1/V1ThemeProvider'
import { getCmsData } from '@/lib/cms/data.server'
import './globals.css'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getCmsData()
  return {
    title: site.seo.title,
    description: site.seo.description,
    keywords: site.seo.keywords.split(/[,，]/).map((item) => item.trim()).filter(Boolean),
    icons: site.favicon ? { icon: site.favicon } : undefined,
  }
}

export async function generateViewport(): Promise<Viewport> {
  const { site } = await getCmsData()
  return {
    colorScheme: 'light',
    themeColor: [{ media: '(prefers-color-scheme: light)', color: site.theme.primary }],
    width: 'device-width',
    initialScale: 1,
    userScalable: true,
  }
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { site } = await getCmsData()
  return (
    <html lang="zh-CN" className="bg-background">
      <body className="antialiased">
        <V1ThemeProvider site={site}>{children}</V1ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
