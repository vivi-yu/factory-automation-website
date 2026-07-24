'use client'

import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'

export function V1ClickableCard({ href, children, className }: { href: string; children: ReactNode; className: string }) {
  const router = useRouter()

  function openDetail() {
    router.push(href)
  }

  return (
    <article
      role="link"
      tabIndex={0}
      className={`${className} cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30`}
      onClick={(event) => {
        if (!(event.target as HTMLElement).closest('a, button')) openDetail()
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          openDetail()
        }
      }}
    >
      {children}
    </article>
  )
}
