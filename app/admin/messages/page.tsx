'use client'

import { CheckCircle2, Eye, Search, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { v1Messages } from '@/lib/v1-data'

export default function MessagesAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">留言管理</h1>
        <p className="mt-1 text-sm text-muted-foreground">所有“联系客服”入口都会生成留言，管理员只需要查看、修改状态和删除。</p>
      </div>

      <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 text-sm text-orange-800">
        未处理留言：<strong>{v1Messages.filter((message) => message.status === 'pending').length}</strong>
      </div>

      <div className="flex gap-2">
        <input type="text" placeholder="搜索姓名、手机、公司或留言内容" className="h-10 flex-1 rounded-lg border border-input bg-background px-4 outline-none focus:ring-2 focus:ring-primary" />
        <Button variant="outline"><Search className="size-4" /></Button>
      </div>

      <section className="overflow-hidden rounded-lg border border-border bg-card">
        <table className="w-full min-w-[960px]">
          <thead className="bg-muted/40">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">姓名</th>
              <th className="px-6 py-3 text-left text-sm font-medium">手机</th>
              <th className="px-6 py-3 text-left text-sm font-medium">公司</th>
              <th className="px-6 py-3 text-left text-sm font-medium">留言内容</th>
              <th className="px-6 py-3 text-left text-sm font-medium">来源页面</th>
              <th className="px-6 py-3 text-left text-sm font-medium">提交时间</th>
              <th className="px-6 py-3 text-left text-sm font-medium">状态</th>
              <th className="px-6 py-3 text-right text-sm font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {v1Messages.map((msg) => (
              <tr key={msg.id} className="border-t border-border">
                <td className="px-6 py-4 font-medium">{msg.name}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{msg.phone}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{msg.company}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground"><p className="line-clamp-1">{msg.content}</p></td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{msg.source}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{msg.submittedAt}</td>
                <td className="px-6 py-4">
                  <span className={`rounded-md px-2 py-1 text-xs font-medium ${msg.status === 'contacted' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'}`}>
                    {msg.status === 'contacted' ? '已联系' : '未联系'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="sm"><Eye className="size-4" /></Button>
                  <Button variant="ghost" size="sm"><CheckCircle2 className="size-4" /></Button>
                  <Button variant="ghost" size="sm" className="text-destructive"><Trash2 className="size-4" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
