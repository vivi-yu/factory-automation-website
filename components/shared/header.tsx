'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

export default function Header() {
  return (
    <header className="border-b border-border sticky top-0 z-40 bg-background/95 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm">
            厂
          </div>
          <span className="font-bold text-lg text-foreground">厂务自动化</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-foreground hover:text-primary transition text-sm">
            首页
          </Link>
          <Link href="/companies" className="text-foreground hover:text-primary transition text-sm">
            企业资源
          </Link>
          <Link href="/requirements" className="text-foreground hover:text-primary transition text-sm">
            最新需求
          </Link>
          <Link href="/contact" className="text-foreground hover:text-primary transition text-sm">
            联系我们
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button className="hidden sm:inline-flex">联系客服</Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
