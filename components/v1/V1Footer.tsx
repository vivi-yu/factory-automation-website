'use client'

import Link from 'next/link'
import { Headphones } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSiteConfig } from '@/components/v1/V1ThemeProvider'
import type { Category } from '@/lib/cms/types'

export function V1Footer({ categories = [] }: { categories?: Category[] }) {
  const site = useSiteConfig()

  return (
    <footer style={{ background: 'var(--v1-footer-bg)', color: 'var(--v1-footer-foreground)' }}>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-3 md:px-6">
        <div>
          <div className="flex items-center gap-3">
            <img src={site.footerLogo} alt={site.name} className="h-10 w-auto max-w-44 object-contain" />
            {site.showName ? <h2 className="text-lg font-bold">{site.name}</h2> : null}
          </div>
          <p className="mt-3 text-sm leading-6 text-current/70">{site.footerDescription}</p>
        </div>
        <div>
          <h3 className="font-semibold">快速导航</h3>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-current/70">
            {site.quickLinks.map((item) => <Link key={`${item.href}-${item.label}`} href={item.href} className="v1-footer-link">{item.label}</Link>)}
            <Link href="/contact" className="v1-footer-link">{site.contactButtonText}</Link>
            {categories.map((category) => <Link key={category.id} href={`/#category-${category.id}`} className="v1-footer-link">{category.name}</Link>)}
          </div>
        </div>
        <div>
          <h3 className="font-semibold">联系我们</h3>
          <div className="mt-4 flex gap-4">
            <img src={site.contactQr} alt="企业微信二维码" className="size-24 rounded-lg border border-primary/10 bg-white object-cover" />
            <div className="space-y-2 text-sm text-current/70">
              {site.phone ? <p>客服电话：<a href={`tel:${site.phone}`} className="v1-footer-link">{site.phone}</a></p> : null}
              {site.email ? <p>邮箱：<a href={`mailto:${site.email}`} className="v1-footer-link">{site.email}</a></p> : null}
              {site.address ? <p>办公地址：{site.address}</p> : null}
            </div>
          </div>
          <Link href="/contact" className="mt-5 inline-block"><Button className="h-9 gap-2 rounded-lg text-white hover:opacity-90" style={{ background: 'var(--v1-button-bg)' }}><Headphones className="size-4" />{site.contactButtonText}</Button></Link>
        </div>
      </div>
      {site.icpNumber ? (
        <div className="mx-auto max-w-7xl border-t border-current/15 px-4 py-5 text-center text-xs text-current/60 md:px-6">
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer" className="v1-footer-link">
            {site.icpNumber}
          </a>
        </div>
      ) : null}
      <style jsx>{`.v1-footer-link:hover { color: var(--v1-footer-link); }`}</style>
    </footer>
  )
}
