'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { getVisibleCategories, v1DemandTypes } from '@/lib/v1-data'

export default function SettingsAdminPage() {
  const [saved, setSaved] = useState(false)
  const categories = getVisibleCategories()

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">系统设置</h1>
        <p className="mt-1 text-sm text-muted-foreground">V1 只保留网站内容和客服信息配置，不做复杂权限和通知系统。</p>
      </div>

      <section className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-lg font-bold">平台信息</h3>
        <div className="space-y-4">
          <Field label="平台名称" defaultValue="DeepLink 自动化产业资源整合平台" />
          <label className="block">
            <span className="mb-2 block text-sm font-medium">平台简介</span>
            <textarea defaultValue="建立一个自动化行业资源展示平台，帮助用户找企业、找供应商、找人力、找配套资源和查看企业最新需求。" rows={3} className="w-full rounded-lg border border-input bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary" />
          </label>
        </div>
      </section>

      <section className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-lg font-bold">客服信息</h3>
        <div className="space-y-4">
          <Field label="客服电话" defaultValue="400-800-2026" />
          <Field label="邮箱" defaultValue="service@deeplink-auto.com" />
          <Field label="办公地址" defaultValue="上海市嘉定区工业互联网创新中心" />
          <Field label="企业微信二维码" defaultValue="/qrcode-wecom.png" />
        </div>
      </section>

      <section className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-lg font-bold">当前分类与需求类型</h3>
        <div className="mb-5 flex flex-wrap gap-2">
          {categories.map((category) => <span key={category.id} className="rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">{category.name}</span>)}
        </div>
        <div className="flex flex-wrap gap-2">
          {v1DemandTypes.map((type) => <span key={type} className="rounded-md bg-slate-100 px-3 py-1 text-sm text-slate-700">{type}</span>)}
        </div>
      </section>

      <section className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-3 text-lg font-bold">通知策略</h3>
        <p className="text-sm leading-6 text-muted-foreground">V1 不开发短信、邮件、微信模板通知。后台 Dashboard 仅显示未处理留言数量；V2 可追加企业微信通知。</p>
      </section>

      <div className="flex items-center gap-4">
        <Button size="lg" onClick={handleSave}>{saved ? '已保存' : '保存设置'}</Button>
        <Button size="lg" variant="outline">重置</Button>
      </div>
      {saved ? <div className="rounded-lg bg-green-50 p-4 text-sm font-medium text-green-700">设置已保存。</div> : null}
    </div>
  )
}

function Field({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium">{label}</span>
      <input defaultValue={defaultValue} className="h-10 w-full rounded-lg border border-input bg-background px-4 outline-none focus:ring-2 focus:ring-primary" />
    </label>
  )
}
