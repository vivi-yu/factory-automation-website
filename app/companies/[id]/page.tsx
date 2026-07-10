'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronRight, Phone } from 'lucide-react'
import { useState } from 'react'

export default function CompanyDetailPage() {
  const [showForm, setShowForm] = useState(false)

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
          <Link href="/companies" className="text-primary hover:underline">企业资源</Link>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground">企业详情</span>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="md:col-span-2 space-y-6">
              {/* Company Header */}
              <div className="border border-border rounded-lg p-8 bg-card">
                <div className="flex flex-col md:flex-row gap-6 items-start mb-6">
                  <div className="w-24 h-24 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-4xl font-bold text-primary">企</span>
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-foreground mb-2">某科技自动化公司</h1>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="inline-block px-3 py-1 rounded bg-primary/10 text-primary text-sm font-medium">
                        自动化企业
                      </span>
                      <span className="text-sm text-muted-foreground">✓ 已认证</span>
                    </div>
                    <p className="text-muted-foreground">北京市 · 朝阳区</p>
                  </div>
                </div>

                {/* Company Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-border pt-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">主营业务</p>
                    <p className="font-medium text-foreground">
                      自动化设备、工业控制、机器人集成、生产线设计
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">联系电话</p>
                    <p className="font-medium text-foreground">010-XXXX-XXXX</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">官方网址</p>
                    <a href="#" className="text-primary hover:underline">www.example.com</a>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">企业微信</p>
                    <p className="font-medium text-foreground">微信号：xxx</p>
                  </div>
                </div>
              </div>

              {/* Company Introduction */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">企业介绍</h2>
                <div className="prose prose-sm text-foreground max-w-none space-y-4">
                  <p>
                    某科技自动化公司成立于2010年，是一家专业从事自动化设备设计、制造和集成的高新技术企业。公司致力于为全球制造企业提供智能化、高效化的生产解决方案。
                  </p>
                  <p>
                    公司拥有资深的技术团队，核心管理层均具有15年以上的行业经验。我们已为500+企业提供过专业的自动化服务，客户遍布汽车、电子、食品、制药等多个行业。
                  </p>
                  <p>
                    我们坚持以客户需求为导向，不断创新和完善自身技术体系，为客户创造更大价值。如果您有自动化需求，欢迎与我们联系！
                  </p>
                </div>
              </div>

              {/* Latest Requirements */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">最新需求</h2>
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Link key={i} href={`/requirements/${i}`}>
                      <div className="p-6 rounded-lg border border-border hover:border-primary hover:shadow-md transition bg-card">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <span className="inline-block px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium mr-2">
                              招聘
                            </span>
                            <span className="text-xs text-muted-foreground">2024-12-{20 - i}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">进行中</span>
                        </div>
                        <h3 className="font-bold text-foreground mb-2">高级自动化工程师招聘</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          寻求有5年以上经验的自动化工程师加入我们的研发团队
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Actions */}
            <div>
              <div className="border border-border rounded-lg p-6 bg-card sticky top-24 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">发布的需求</p>
                  <p className="text-3xl font-bold text-primary">3</p>
                </div>
                <div className="border-t border-border pt-4">
                  <Button 
                    size="lg" 
                    className="w-full rounded-full mb-3"
                    onClick={() => setShowForm(true)}
                  >
                    提交合作需求
                  </Button>
                  <Button 
                    size="lg" 
                    variant="secondary" 
                    className="w-full rounded-full"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    联系平台客服
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Companies */}
          <div className="mt-16 border-t border-border pt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">相关推荐</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Link key={i} href={`/companies/${i + 1}`}>
                  <div className="p-6 rounded-lg border border-border hover:border-primary hover:shadow-md transition bg-card text-center">
                    <div className="w-16 h-16 bg-secondary rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">企{i + 2}</span>
                    </div>
                    <h3 className="font-bold text-foreground mb-2">企业名称 {i + 2}</h3>
                    <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                      自动化设备、工业控制
                    </p>
                    <Button variant="outline" size="sm" className="w-full rounded-full">
                      查看企业
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cooperation Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg max-w-md w-full p-6 space-y-4">
            <h3 className="text-xl font-bold text-foreground">提交合作需求</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">您的姓名</label>
                <input type="text" placeholder="请输入姓名" className="w-full px-3 py-2 rounded border border-input" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">联系电话</label>
                <input type="tel" placeholder="请输入电话" className="w-full px-3 py-2 rounded border border-input" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">公司名称</label>
                <input type="text" placeholder="请输入公司名称" className="w-full px-3 py-2 rounded border border-input" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">合作内容</label>
                <textarea placeholder="请描述您的合作意向" className="w-full px-3 py-2 rounded border border-input" rows={3}></textarea>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowForm(false)}
              >
                取消
              </Button>
              <Button className="flex-1 rounded-full">提交</Button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-muted py-8 border-t border-border mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>© 2024 厂务自动化 版权所有 | ICP备案号：xxx</p>
        </div>
      </footer>
    </div>
  )
}
