'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Building2, LayoutDashboard, ListTodo, Mail, Settings } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/companies', label: '企业管理', icon: Building2 },
    { href: '/admin/requirements', label: '需求管理', icon: ListTodo },
    { href: '/admin/messages', label: '留言管理', icon: Mail },
    { href: '/admin/settings', label: '系统设置', icon: Settings },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sticky top-0 h-screen w-64 shrink-0 overflow-y-auto border-r border-border/50 bg-white">
        <div className="border-b border-border/30 p-6">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-lg bg-blue-700 font-bold text-white">DL</div>
            <div>
              <p className="text-sm font-bold text-foreground">DeepLink 后台</p>
              <p className="text-xs text-muted-foreground">V1.0 MVP</p>
            </div>
          </Link>
        </div>

        <nav className="space-y-2 p-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
            return (
              <Link key={item.href} href={item.href} className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${isActive ? 'bg-blue-50 text-blue-700' : 'text-foreground hover:bg-muted/50 hover:text-blue-700'}`}>
                <Icon className="size-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-border/30 bg-white/90 p-4 text-center text-xs text-muted-foreground">
          只保留企业、需求、留言三类日常维护
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-30 border-b border-border/30 bg-white/90 backdrop-blur-md">
          <div className="flex items-center justify-between px-8 py-4">
            <h1 className="text-2xl font-bold text-foreground">自动化产业资源整合平台后台</h1>
            <Link href="/v1" className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100">查看前台</Link>
          </div>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
