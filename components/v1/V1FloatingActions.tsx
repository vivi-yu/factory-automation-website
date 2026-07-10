'use client'

import { ArrowUp, Headphones, Phone } from 'lucide-react'
import Link from 'next/link'

export function V1FloatingActions() {
  function scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-5 right-4 z-50 flex flex-col gap-2">
      <Link href="/v1/contact" className="flex size-11 items-center justify-center rounded-lg text-white shadow-lg transition hover:opacity-90" style={{ background: 'var(--v1-button-bg)' }} title="联系平台客服">
        <Headphones className="size-5" />
      </Link>
      <a href="tel:4008002026" className="flex size-11 items-center justify-center rounded-lg bg-foreground text-background shadow-lg transition hover:opacity-90" title="拨打客服电话">
        <Phone className="size-5" />
      </a>
      <button type="button" onClick={scrollTop} className="flex size-11 items-center justify-center rounded-lg border border-border/40 bg-card text-foreground shadow-lg transition hover:border-primary" title="返回顶部">
        <ArrowUp className="size-5" />
      </button>
    </div>
  )
}

