'use client'

import { Edit, Plus, Search, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getCompanyName, getLatestDemands, v1DemandTypes } from '@/lib/v1-data'

export default function RequirementsAdminPage() {
  const requirements = getLatestDemands()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">需求管理</h1>
          <p className="mt-1 text-sm text-muted-foreground">需求全部由管理员录入，来源可以是微信、电话、QQ 或线下沟通。</p>
        </div>
        <Button className="gap-2"><Plus className="size-4" />新增需求</Button>
      </div>

      <section className="rounded-lg border border-border bg-card p-6">
        <h2 className="mb-3 text-lg font-bold">需求类型维护</h2>
        <div className="flex flex-wrap gap-2">
          {v1DemandTypes.map((type) => <span key={type} className="rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">{type}</span>)}
          <Button variant="outline" size="sm" className="gap-1"><Plus className="size-4" />新增类型</Button>
        </div>
      </section>

      <div className="flex gap-2">
        <input type="text" placeholder="搜索需求标题或所属企业" className="h-10 flex-1 rounded-lg border border-input bg-background px-4 outline-none focus:ring-2 focus:ring-primary" />
        <Button variant="outline"><Search className="size-4" /></Button>
      </div>

      <section className="overflow-hidden rounded-lg border border-border bg-card">
        <table className="w-full min-w-[860px]">
          <thead className="bg-muted/40">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">需求标题</th>
              <th className="px-6 py-3 text-left text-sm font-medium">所属企业</th>
              <th className="px-6 py-3 text-left text-sm font-medium">类型</th>
              <th className="px-6 py-3 text-left text-sm font-medium">发布时间</th>
              <th className="px-6 py-3 text-left text-sm font-medium">排序</th>
              <th className="px-6 py-3 text-left text-sm font-medium">状态</th>
              <th className="px-6 py-3 text-right text-sm font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {requirements.map((req) => (
              <tr key={req.id} className="border-t border-border">
                <td className="px-6 py-4 font-medium">{req.title}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{getCompanyName(req.companyId)}</td>
                <td className="px-6 py-4"><span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">{req.type}</span></td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{req.publishedAt}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{req.sort}</td>
                <td className="px-6 py-4"><span className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700">进行中</span></td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="sm"><Edit className="size-4" /></Button>
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
