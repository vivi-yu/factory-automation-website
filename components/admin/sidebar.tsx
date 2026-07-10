'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Building2, FileText, MessageSquare, Settings, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AdminSidebar() {
  const pathname = usePathname()

  const menuItems = [
    {
      title: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: '企业管理',
      href: '/admin/companies',
      icon: Building2,
    },
    {
      title: '需求管理',
      href: '/admin/requirements',
      icon: FileText,
    },
    {
      title: '留言管理',
      href: '/admin/messages',
      icon: MessageSquare,
    },
    {
      title: '系统设置',
      href: '/admin/settings',
      icon: Settings,
    },
  ]

  return (
    <div className="fixed left-0 top-0 h-screen w-64 border-r border-border bg-card">
      {/* Header */}
      <div className="border-b border-border p-6">
        <h1 className="text-xl font-bold text-foreground">厂务自动化</h1>
        <p className="mt-1 text-sm text-muted-foreground">管理后台</p>
      </div>

      {/* Menu */}
      <nav className="space-y-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.title}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-border p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
          <LogOut className="h-5 w-5" />
          退出登录
        </button>
      </div>
    </div>
  )
}
