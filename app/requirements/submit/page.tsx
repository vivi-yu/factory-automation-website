'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronRight, Upload } from 'lucide-react'
import { useState } from 'react'

export default function SubmitRequirementPage() {
  const [formData, setFormData] = useState({
    company: '',
    contactPerson: '',
    phone: '',
    wechat: '',
    email: '',
    title: '',
    type: '',
    content: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.company) newErrors.company = '企业名称为必填项'
    if (!formData.contactPerson) newErrors.contactPerson = '联系人为必填项'
    if (!formData.phone) newErrors.phone = '联系电话为必填项'
    if (!formData.title) newErrors.title = '需求标题为必填项'
    if (!formData.type) newErrors.type = '需求类型为必填项'
    if (!formData.content) newErrors.content = '需求内容为必填项'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setSubmitted(true)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-40 bg-background/95">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
              C
            </div>
            <span className="font-bold text-lg text-foreground">厂务自动化</span>
          </Link>
          <Button className="rounded-full">联系客服</Button>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center gap-2 text-sm">
          <Link href="/" className="text-primary hover:underline">首页</Link>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground">发布需求</span>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          {!submitted ? (
            <div className="border border-border rounded-lg p-8 bg-card">
              <h1 className="text-3xl font-bold text-foreground mb-8">发布需求</h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Company Name */}
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    企业名称 <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    placeholder="请输入企业名称"
                    className={`w-full px-4 py-2 rounded border ${errors.company ? 'border-destructive' : 'border-input'} bg-background focus:outline-none focus:ring-2 focus:ring-primary`}
                  />
                  {errors.company && <p className="text-destructive text-sm mt-1">{errors.company}</p>}
                </div>

                {/* Contact Person */}
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    联系人 <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                    placeholder="请输入联系人姓名"
                    className={`w-full px-4 py-2 rounded border ${errors.contactPerson ? 'border-destructive' : 'border-input'} bg-background focus:outline-none focus:ring-2 focus:ring-primary`}
                  />
                  {errors.contactPerson && <p className="text-destructive text-sm mt-1">{errors.contactPerson}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    联系电话 <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="请输入联系电话"
                    className={`w-full px-4 py-2 rounded border ${errors.phone ? 'border-destructive' : 'border-input'} bg-background focus:outline-none focus:ring-2 focus:ring-primary`}
                  />
                  {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
                </div>

                {/* WeChat */}
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    微信号
                  </label>
                  <input
                    type="text"
                    value={formData.wechat}
                    onChange={(e) => setFormData({...formData, wechat: e.target.value})}
                    placeholder="请输入微信号（可选）"
                    className="w-full px-4 py-2 rounded border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    邮箱
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="请输入邮箱地址（可选）"
                    className="w-full px-4 py-2 rounded border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Title */}
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    需求标题 <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="请输入需求标题"
                    className={`w-full px-4 py-2 rounded border ${errors.title ? 'border-destructive' : 'border-input'} bg-background focus:outline-none focus:ring-2 focus:ring-primary`}
                  />
                  {errors.title && <p className="text-destructive text-sm mt-1">{errors.title}</p>}
                </div>

                {/* Type */}
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    需求类型 <span className="text-destructive">*</span>
                  </label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className={`w-full px-4 py-2 rounded border ${errors.type ? 'border-destructive' : 'border-input'} bg-background focus:outline-none focus:ring-2 focus:ring-primary`}
                  >
                    <option value="">-- 请选择需求类型 --</option>
                    <option value="招聘">招聘</option>
                    <option value="采购">采购</option>
                    <option value="合作">合作</option>
                    <option value="项目">项目</option>
                    <option value="人才">人才</option>
                  </select>
                  {errors.type && <p className="text-destructive text-sm mt-1">{errors.type}</p>}
                </div>

                {/* Content */}
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    需求内容 <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    placeholder="请详细描述您的需求内容..."
                    rows={6}
                    className={`w-full px-4 py-2 rounded border ${errors.content ? 'border-destructive' : 'border-input'} bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none`}
                  />
                  {errors.content && <p className="text-destructive text-sm mt-1">{errors.content}</p>}
                </div>

                {/* Attachment Upload */}
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    附件上传（可选）
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">点击选择文件或拖拽文件到此</p>
                    <p className="text-xs text-muted-foreground">支持PDF、Word、图片等格式，单个文件不超过10MB</p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-6 border-t border-border">
                  <Button 
                    type="reset" 
                    variant="secondary" 
                    size="lg"
                    className="flex-1 rounded-full"
                    onClick={() => setFormData({company: '', contactPerson: '', phone: '', wechat: '', email: '', title: '', type: '', content: ''})}
                  >
                    重置
                  </Button>
                  <Button 
                    type="submit" 
                    size="lg"
                    className="flex-1 rounded-full"
                  >
                    提交
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <div className="border border-border rounded-lg p-12 bg-card text-center">
              <div className="text-6xl mb-6 font-bold text-primary">✓</div>
              <h2 className="text-3xl font-bold text-foreground mb-3">提交成功</h2>
              <p className="text-lg text-muted-foreground mb-8">
                感谢您的提交，我们的客服会尽快与您联系
              </p>
              <Link href="/">
                <Button size="lg" className="rounded-full">
                  返回首页
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-8 border-t border-border mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>© 2024 厂务自动化 版权所有 | ICP备案号：xxx</p>
        </div>
      </footer>
    </div>
  )
}
