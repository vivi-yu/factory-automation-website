'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Headphones, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navItems = [
  { label: '首页', href: '/v1' },
  { label: '企业', href: '/v1/companies' },
  { label: '需求', href: '/v1/demands' },
  { label: '行业资讯', href: '/v1/news' },
]

export function V1Header() {
  const router = useRouter()

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const query = String(form.get('q') || '').trim()
    router.push(`/v1/search${query ? `?q=${encodeURIComponent(query)}` : ''}`)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-primary/10 shadow-sm backdrop-blur" style={{ background: 'var(--v1-header-bg)' }}>
      <div className="mx-auto flex min-h-20 max-w-7xl flex-wrap items-center gap-3 px-4 py-3 md:gap-4 md:px-6">
        <Link href="/v1" className="flex shrink-0 items-center gap-3">
          <img src="/website-logo.svg" alt="友军博品" className="h-10 w-auto object-contain" />
          <p className="v1-brand-name whitespace-nowrap text-base font-bold text-foreground">友军博品</p>
        </Link>

        <form onSubmit={handleSearch} className="relative order-3 min-w-0 flex-1 basis-full md:order-none md:basis-auto">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            name="q"
            type="search"
            placeholder="搜索企业、主营、关键词、地区"
            className="h-10 w-full rounded-lg border border-border/50 bg-card pl-9 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </form>

        <nav className="order-2 flex w-full min-w-0 items-center gap-1 overflow-x-auto rounded-lg bg-white/35 p-1 [scrollbar-width:none] md:order-none md:w-auto [&::-webkit-scrollbar]:hidden">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="v1-nav-link relative whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors duration-300 hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/v1/contact" className="hidden shrink-0 lg:block">
          <Button className="v1-contact-glow h-10 gap-2 rounded-lg px-4 text-white hover:opacity-95" style={{ background: 'var(--v1-button-bg)' }}>
            <Headphones className="size-4" />
            联系客服
          </Button>
        </Link>
      </div>
      <style jsx>{`
        .v1-nav-link::after {
          content: '';
          position: absolute;
          left: 12px;
          right: 12px;
          bottom: 4px;
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(90deg, var(--primary), var(--accent), var(--primary));
          background-size: 200% 100%;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .v1-nav-link:hover::after {
          transform: scaleX(1);
          animation: v1NavFlow 1.4s linear infinite;
        }
        .v1-contact-glow {
          position: relative;
          box-shadow: 0 0 0 0 color-mix(in srgb, var(--primary) 30%, transparent);
          animation: v1ContactGlow 3s ease-in-out infinite;
        }
        @keyframes v1NavFlow {
          from { background-position: 0% 50%; }
          to { background-position: 200% 50%; }
        }
        @keyframes v1ContactGlow {
          0%, 100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--primary) 28%, transparent), 0 10px 22px color-mix(in srgb, var(--accent) 16%, transparent); }
          50% { box-shadow: 0 0 0 8px transparent, 0 14px 28px color-mix(in srgb, var(--accent) 22%, transparent); }
        }
      `}</style>
    </header>
  )
}


