import Link from 'next/link'
import { Building2, ListTodo, MessageSquare, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getLatestDemands, getCompanyName, v1Companies, v1Messages } from '@/lib/v1-data'

export default function AdminDashboard() {
  const pendingMessages = v1Messages.filter((message) => message.status === 'pending')
  const stats = [
    { label: '企业数量', value: v1Companies.length, icon: Building2, note: '含首页推荐位' },
    { label: '需求数量', value: getLatestDemands().length, icon: ListTodo, note: '管理员录入' },
    { label: '留言数量', value: v1Messages.length, icon: MessageSquare, note: `${pendingMessages.length} 条未处理` },
    { label: '今日新增', value: 3, icon: TrendingUp, note: '演示数据' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-foreground">Dashboard</h2>
        <p className="text-sm text-muted-foreground">V1 只做企业目录、需求录入、留言跟进，不开发会员、支付、聊天和复杂权限。</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="mt-2 text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.note}</p>
                </div>
                <div className="rounded-lg bg-blue-50 p-3 text-blue-700"><Icon className="size-6" /></div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground">未处理留言</h3>
            <Link href="/admin/messages"><Button variant="outline" size="sm">查看全部</Button></Link>
          </div>
          <div className="space-y-4">
            {pendingMessages.map((item) => (
              <div key={item.id} className="border-b border-border pb-4 last:border-0">
                <p className="font-medium text-foreground">{item.name} · {item.company}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.content}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground">最新需求</h3>
            <Link href="/admin/requirements"><Button variant="outline" size="sm">管理需求</Button></Link>
          </div>
          <div className="space-y-4">
            {getLatestDemands(4).map((item) => (
              <div key={item.id} className="border-b border-border pb-4 last:border-0">
                <p className="font-medium text-foreground">{item.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{getCompanyName(item.companyId)} · {item.type}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
