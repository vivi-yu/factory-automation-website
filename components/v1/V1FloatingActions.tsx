'use client'

import { ArrowUp, Headphones, Phone } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSiteConfig } from '@/components/v1/V1ThemeProvider'

export function V1FloatingActions() {
  const site = useSiteConfig()
  const pathname = usePathname()
  const showContactActions = pathname !== '/contact'

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-5 right-4 z-50 hidden flex-col gap-2 sm:flex">
      {showContactActions ? <Link href="/contact" className="flex size-11 items-center justify-center rounded-lg text-white shadow-lg transition hover:opacity-90" style={{ background: 'var(--v1-button-bg)' }} title="联系平台客服">
        <Headphones className="size-5" />
      </Link> : null}
      {showContactActions && site.phone ? <div className="group relative flex size-11 items-center justify-center rounded-lg bg-foreground text-background shadow-lg" title={site.phone}>
        <Phone className="size-5" />
        <span className="pointer-events-none absolute right-full mr-2 hidden whitespace-nowrap rounded-md bg-foreground px-3 py-2 text-sm font-medium text-background shadow-lg group-hover:block">{site.phone}</span>
      </div> : null}
      <button type="button" onClick={scrollTop} className="flex size-11 items-center justify-center rounded-lg border border-border/40 bg-card text-foreground shadow-lg transition hover:border-primary" title="返回顶部">
        <ArrowUp className="size-5" />
      </button>
    </div>
  )
}
