'use client'

import { useState } from 'react'
import { CheckCircle2, Headphones, Mail, MapPin, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { V1FloatingActions } from '@/components/v1/V1FloatingActions'
import { V1Footer } from '@/components/v1/V1Footer'
import { V1Header } from '@/components/v1/V1Header'

type FormState = { name: string; phone: string; company: string; message: string }
const initialForm: FormState = { name: '', phone: '', company: '', message: '' }

export default function V1ContactPage() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [submitted, setSubmitted] = useState(false)

  function updateField(field: keyof FormState, value: string) { setForm((current) => ({ ...current, [field]: value })); setErrors((current) => ({ ...current, [field]: undefined })) }
  function validate() { const nextErrors: Partial<FormState> = {}; if (!form.name.trim()) nextErrors.name = '请输入姓名'; if (!/^1\d{10}$|^0\d{2,3}-?\d{7,8}$|^400-?\d{3}-?\d{4}$/.test(form.phone.trim())) nextErrors.phone = '请输入有效联系电话'; if (!form.company.trim()) nextErrors.company = '请输入公司名称'; if (form.message.trim().length < 10) nextErrors.message = '留言内容至少 10 个字'; setErrors(nextErrors); return Object.keys(nextErrors).length === 0 }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); if (!validate()) return; setSubmitted(true); setForm(initialForm) }

  return (
    <main className="min-h-screen bg-[#fff8f5] text-foreground">
      <V1Header />
      <section className="relative overflow-hidden py-16" style={{ background: 'var(--v1-button-bg)' }}>
        <img src="/contact-banner.png" alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6"><p className="text-sm font-semibold text-white/90">联系我们</p><h1 className="mt-3 text-3xl font-bold md:text-4xl text-white">统一进入平台客服</h1><p className="mt-4 max-w-2xl leading-7 text-white/90">合作咨询、资源入驻、项目需求和供应商对接全部提交为留言，由平台客服人工跟进。</p></div>
      </section>
      <section className="py-10"><div className="mx-auto grid max-w-7xl gap-6 px-4 md:px-6 lg:grid-cols-[420px_1fr]">
        <aside className="space-y-5"><div className="rounded-lg border border-primary/10 bg-white p-6 shadow-sm"><p className="text-sm font-semibold text-primary">企业微信客服</p><div className="mt-4 flex size-44 items-center justify-center rounded-lg bg-[#fff4f1] text-center text-sm font-semibold text-muted-foreground">企业微信<br />二维码</div></div><div className="rounded-lg border border-primary/10 bg-white p-6 shadow-sm"><div className="space-y-5"><Info icon={Phone} label="客服电话" value="400-800-2026" /><Info icon={Mail} label="邮箱" value="service@auto-resource.com" /><Info icon={MapPin} label="办公地址" value="上海市嘉定区工业互联网创新中心" /></div></div></aside>
        <div className="rounded-lg border border-primary/10 bg-white p-6 shadow-sm"><h2 className="text-2xl font-bold">提交留言</h2><p className="mt-2 text-sm text-muted-foreground">留言会进入后台留言管理，客服将根据内容进行跟进。</p>{submitted ? <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-5 text-green-800"><div className="flex items-center gap-2 font-semibold"><CheckCircle2 className="size-5" />留言已提交</div><p className="mt-2 text-sm">平台客服会根据留言内容进行后续联系。</p></div> : null}<form onSubmit={handleSubmit} className="mt-6 grid gap-4"><Field label="姓名" error={errors.name}><input value={form.name} onChange={(event) => updateField('name', event.target.value)} className="h-11 w-full rounded-lg border border-border px-3 outline-none focus:border-primary focus:ring-3 focus:ring-primary/10" placeholder="请输入姓名" /></Field><Field label="手机" error={errors.phone}><input value={form.phone} onChange={(event) => updateField('phone', event.target.value)} className="h-11 w-full rounded-lg border border-border px-3 outline-none focus:border-primary focus:ring-3 focus:ring-primary/10" placeholder="请输入联系电话" /></Field><Field label="公司" error={errors.company}><input value={form.company} onChange={(event) => updateField('company', event.target.value)} className="h-11 w-full rounded-lg border border-border px-3 outline-none focus:border-primary focus:ring-3 focus:ring-primary/10" placeholder="请输入公司名称" /></Field><Field label="留言内容" error={errors.message}><textarea value={form.message} onChange={(event) => updateField('message', event.target.value)} rows={5} className="w-full resize-none rounded-lg border border-border px-3 py-3 outline-none focus:border-primary focus:ring-3 focus:ring-primary/10" placeholder="请描述希望对接的企业、供应商、人力、配套资源或项目需求" /></Field><Button type="submit" className="h-11 gap-2 rounded-lg text-white hover:opacity-90" style={{ background: 'var(--v1-button-bg)' }}><Headphones className="size-4" />提交留言</Button></form></div>
      </div></section>
      <V1Footer /><V1FloatingActions />
    </main>
  )
}

function Info({ icon: Icon, label, value }: { icon: typeof Phone; label: string; value: string }) { return <div className="flex gap-3"><Icon className="mt-1 size-5 text-primary" /><div><p className="text-sm text-muted-foreground">{label}</p><p className="font-semibold">{value}</p></div></div> }
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) { return <label className="block"><span className="mb-2 block text-sm font-medium text-foreground">{label} <span className="text-primary">*</span></span>{children}{error ? <span className="mt-1 block text-sm text-red-600">{error}</span> : null}</label> }




