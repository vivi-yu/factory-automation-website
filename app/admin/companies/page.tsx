'use client'

import { ArrowDown, ArrowUp, Edit2, Plus, Star, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getCompanyCategory, getVisibleCategories, v1Companies } from '@/lib/v1-data'

export default function CompaniesAdminPage() {
  const categories = getVisibleCategories()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">企业管理</h1>
          <p className="mt-1 text-sm text-muted-foreground">企业是平台主体；需求只是企业下面的动态信息。</p>
        </div>
        <Button className="gap-2"><Plus className="size-4" />新增企业</Button>
      </div>

      <section className="rounded-lg border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">分类管理</h2>
            <p className="text-sm text-muted-foreground">分类不写死，可新增、编辑、删除和排序，前台自动生成对应模块。</p>
          </div>
          <Button variant="outline" className="gap-2"><Plus className="size-4" />新增分类</Button>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
              <div>
                <p className="font-medium text-foreground">{category.name}</p>
                <p className="text-xs text-muted-foreground">sort: {category.sort}</p>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm"><ArrowUp className="size-4" /></Button>
                <Button variant="ghost" size="sm"><ArrowDown className="size-4" /></Button>
                <Button variant="ghost" size="sm"><Edit2 className="size-4" /></Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="border-b border-border p-6">
          <h2 className="text-lg font-bold">企业列表</h2>
          <p className="mt-1 text-sm text-muted-foreground">字段包含 LOGO、企业名称、所属分类、排序、首页推荐、企业简介、主营业务、服务范围、企业图片、官网和状态。</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px]">
            <thead className="bg-muted/40">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">企业名称</th>
                <th className="px-6 py-3 text-left text-sm font-medium">分类</th>
                <th className="px-6 py-3 text-left text-sm font-medium">主营业务</th>
                <th className="px-6 py-3 text-left text-sm font-medium">排序</th>
                <th className="px-6 py-3 text-left text-sm font-medium">首页推荐</th>
                <th className="px-6 py-3 text-left text-sm font-medium">状态</th>
                <th className="px-6 py-3 text-right text-sm font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {v1Companies.map((company) => {
                const category = getCompanyCategory(company)
                return (
                  <tr key={company.id} className="border-t border-border">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex size-9 items-center justify-center rounded-lg bg-blue-700 text-xs font-bold text-white">{company.logo}</span>
                        <span className="font-medium">{company.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{category?.name}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{company.businessTags.join(' / ')}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{company.sort}</td>
                    <td className="px-6 py-4">{company.featured ? <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700"><Star className="size-3" />是</span> : '否'}</td>
                    <td className="px-6 py-4"><span className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700">显示</span></td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex gap-1">
                        <Button variant="ghost" size="sm"><ArrowUp className="size-4" /></Button>
                        <Button variant="ghost" size="sm"><ArrowDown className="size-4" /></Button>
                        <Button variant="ghost" size="sm"><Edit2 className="size-4" /></Button>
                        <Button variant="ghost" size="sm" className="text-destructive"><Trash2 className="size-4" /></Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
