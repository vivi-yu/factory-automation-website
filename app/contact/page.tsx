'use client'

import { useState } from 'react'
import { CheckCircle2, Headphones, Mail, MapPin, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { V1FloatingActions } from '@/components/v1/V1FloatingActions'
import { V1Footer } from '@/components/v1/V1Footer'
import { V1Header } from '@/components/v1/V1Header'
import { useSiteConfig } from '@/components/v1/V1ThemeProvider'

type FormState = { name: string; phone: string; company: string; message: string; website: string }
const initialForm: FormState = { name: '', phone: '', company: '', message: '', website: '' }

export default function V1ContactPage() {
  const site = useSiteConfig()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function updateField(field: keyof FormState, value: string) { setForm((current) => ({ ...current, [field]: value })); setErrors((current) => ({ ...current, [field]: undefined })) }
  function validate() { const nextErrors: Partial<FormState> = {}; if (!form.name.trim()) nextErrors.name = '请输入姓名'; if (!/^1\d{10}$|^0\d{2,3}-?\d{7,8}$|^400-?\d{3}-?\d{4}$/.test(form.phone.trim())) nextErrors.phone = '请输入有效联系电话'; if (!form.company.trim()) nextErrors.company = '请输入公司名称'; if (form.message.trim().length < 10) nextErrors.message = '留言内容至少 10 个字'; setErrors(nextErrors); return Object.keys(nextErrors).length === 0 }
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(false)
    setSubmitError('')
    if (!validate()) return
    setSubmitting(true)
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone, companyName: form.company, content: form.message, website: form.website, sourcePage: window.location.pathname }),
      })
      const result = await response.json() as { error?: string }
      if (!response.ok) throw new Error(result.error || '留言提交失败，请稍后再试。')
      setSubmitted(true)
      setForm(initialForm)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : '留言提交失败，请稍后再试。')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="v1-inner-page min-h-screen text-foreground">
      <V1Header />
      <section className="relative overflow-hidden py-16" style={{ background: 'var(--v1-button-bg)' }}>
        <img src={site.contactBanner} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6"><p className="text-sm font-semibold text-white/90">{site.contactEyebrow}</p><h1 className="mt-3 text-2xl font-bold text-white">{site.contactTitle}</h1><p className="mt-4 max-w-2xl leading-7 text-white/90">{site.contactDescription}</p></div>
      </section>
      <section className="py-10"><div className="mx-auto grid max-w-7xl gap-6 px-4 md:px-6 lg:grid-cols-[420px_1fr]">
        <aside className="space-y-5"><div className="rounded-lg border border-primary/10 bg-card p-6 shadow-sm"><p className="text-sm font-semibold text-primary">企业微信客服</p><img src={site.contactQr} alt="企业微信二维码" className="mt-4 size-44 rounded-lg border border-border object-cover" /></div><div className="rounded-lg border border-primary/10 bg-card p-6 shadow-sm"><div className="space-y-5">{site.phone ? <Info icon={Phone} label="客服电话" value={site.phone} /> : null}{site.email ? <Info icon={Mail} label="邮箱" value={site.email} /> : null}{site.address ? <Info icon={MapPin} label="办公地址" value={site.address} /> : null}</div></div></aside>
        <div className="rounded-lg border border-primary/10 bg-card p-6 shadow-sm"><h2 className="text-2xl font-bold">{site.contactFormTitle}</h2><p className="mt-2 text-sm text-muted-foreground">{site.contactFormDescription}</p>{submitted ? <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-5 text-green-800"><div className="flex items-center gap-2 font-semibold"><CheckCircle2 className="size-5" />留言已提交</div><p className="mt-2 text-sm">平台客服会根据留言内容进行后续联系。</p></div> : null}{submitError ? <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">{submitError}</div> : null}<form onSubmit={handleSubmit} className="mt-6 grid gap-4"><div className="hidden" aria-hidden="true"><label>网站<input tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => updateField('website', event.target.value)} /></label></div><Field label="姓名" error={errors.name}><input value={form.name} onChange={(event) => updateField('name', event.target.value)} className="h-11 w-full rounded-lg border border-border bg-background px-3 outline-none focus:border-primary focus:ring-3 focus:ring-primary/10" placeholder="请输入姓名" /></Field><Field label="手机" error={errors.phone}><input value={form.phone} onChange={(event) => updateField('phone', event.target.value)} className="h-11 w-full rounded-lg border border-border bg-background px-3 outline-none focus:border-primary focus:ring-3 focus:ring-primary/10" placeholder="请输入联系电话" /></Field><Field label="公司" error={errors.company}><input value={form.company} onChange={(event) => updateField('company', event.target.value)} className="h-11 w-full rounded-lg border border-border bg-background px-3 outline-none focus:border-primary focus:ring-3 focus:ring-primary/10" placeholder="请输入公司名称" /></Field><Field label="留言内容" error={errors.message}><textarea value={form.message} onChange={(event) => updateField('message', event.target.value)} rows={5} className="w-full resize-none rounded-lg border border-border bg-background px-3 py-3 outline-none focus:border-primary focus:ring-3 focus:ring-primary/10" placeholder="请描述希望对接的企业、供应商、人力、配套资源或项目需求" /></Field><Button type="submit" disabled={submitting} className="h-11 gap-2 rounded-lg text-white hover:opacity-90" style={{ background: 'var(--v1-button-bg)' }}><Headphones className="size-4" />{submitting ? '正在提交...' : '提交留言'}</Button></form></div>
      </div></section>
      <V1Footer /><V1FloatingActions />
    </main>
  )
}

function Info({ icon: Icon, label, value }: { icon: typeof Phone; label: string; value: string }) { return <div className="flex gap-3"><Icon className="mt-1 size-5 text-primary" /><div><p className="text-sm text-muted-foreground">{label}</p><p className="font-semibold">{value}</p></div></div> }
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) { return <label className="block"><span className="mb-2 block text-sm font-medium text-foreground">{label} <span className="text-primary">*</span></span>{children}{error ? <span className="mt-1 block text-sm text-red-600">{error}</span> : null}</label> }
