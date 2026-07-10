'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronRight, Phone, Mail, MapPin } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', phone: '', company: '', message: '' })
    }, 2000)
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
          <span className="text-foreground">联系我们</span>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            联系我们
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left - Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">联系方式</h2>
                
                {/* QR Code Section */}
                <div className="border border-border rounded-lg p-8 bg-card mb-6">
                  <p className="text-sm text-muted-foreground mb-4">企业微信</p>
                  <div className="w-40 h-40 bg-secondary rounded-lg mx-auto flex items-center justify-center mb-4 text-muted-foreground text-sm">
                    二维码
                  </div>
                  <p className="text-center text-sm text-muted-foreground">
                    扫描二维码添加企业微信客服
                  </p>
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">客服电话</p>
                    <p className="font-medium text-foreground">400-XXX-XXXX</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">企业邮箱</p>
                    <a href="mailto:service@example.com" className="text-primary hover:underline">
                      service@example.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">公司地址</p>
                    <p className="text-foreground">
                      北京市朝阳区<br />
                      XXX大厦 XX层
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">工作时间</p>
                  <p className="text-foreground">
                    周一至周五：9:00-17:00<br />
                    周六日及节假日：休息
                  </p>
                </div>
              </div>
            </div>

            {/* Right - Contact Form */}
            <div>
              <div className="border border-border rounded-lg p-8 bg-card">
                <h2 className="text-2xl font-bold text-foreground mb-6">在线留言</h2>

                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">
                        姓名 <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="请输入您的姓名"
                        className="w-full px-4 py-2 rounded border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">
                        电话 <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="请输入您的电话"
                        className="w-full px-4 py-2 rounded border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">
                        公司名称 <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        placeholder="请输入您的公司名称"
                        className="w-full px-4 py-2 rounded border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">
                        留言内容 <span className="text-destructive">*</span>
                      </label>
                      <textarea
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="请输入您的留言内容"
                        rows={5}
                        className="w-full px-4 py-2 rounded border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full rounded-full">
                      提交
                    </Button>
                  </form>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-5xl mb-4">✓</div>
                    <h3 className="text-xl font-bold text-foreground mb-2">提交成功</h3>
                    <p className="text-muted-foreground">
                      感谢您的留言，我们会尽快与您联系
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
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
