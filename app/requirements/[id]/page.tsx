'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronRight, Phone } from 'lucide-react'
import { useState } from 'react'
import CooperationDialog from '@/components/CooperationDialog'
import RecommendedRequirements from '@/components/RecommendedRequirements'

export default function RequirementDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const [cooperationDialogOpen, setCooperationDialogOpen] = useState(false)

  // 模拟数据
  const requirement = {
    id: params.id,
    title: '采购自动化生产线',
    company: '瑞达制造有限公司',
    publishDate: '2024-07-01',
    type: '采购',
    status: '进行中',
    content: `我们公司正在寻求采购一套高效的自动化生产线，以提升生产效率和产品质量。

具体需求：
- 生产线产能：年产10万件
- 自动化程度：95%以上
- 包含自动上料、加工、检测、包装等环节
- 需要提供完整的技术支持和培训
- 预期交付时间：6个月内

我们优先考虑有以下条件的合作方：
- 有成熟的自动化解决方案
- 有类似行业的成功案例
- 能提供优质的售后服务`,
    contact: {
      name: '张经理',
      phone: '138****1234',
    },
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-40 bg-white">
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
      <div className="border-b border-border bg-white">
        <div className="container mx-auto px-4 py-3 flex items-center gap-2 text-sm">
          <Link href="/" className="text-primary hover:underline">首页</Link>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <Link href="/requirements" className="text-primary hover:underline">最新需求</Link>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground">需求详情</span>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="md:col-span-2 space-y-6">
              {/* Title & Meta */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-block px-3 py-1 rounded bg-blue-100 text-blue-700 text-sm font-medium">
                    {requirement.type}
                  </span>
                  <span className={`inline-block px-3 py-1 rounded text-sm font-medium ${
                    requirement.status === '进行中'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {requirement.status}
                  </span>
                  <span className="text-sm text-muted-foreground">发布于 {requirement.publishDate}</span>
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {requirement.title}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {requirement.company}
                </p>
              </div>

              {/* Content */}
              <div className="bg-white border border-border rounded-lg p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">需求详情</h2>
                <div className="prose prose-sm text-foreground max-w-none whitespace-pre-wrap">
                  {requirement.content}
                </div>
              </div>

              {/* Related Requirements */}
              <RecommendedRequirements />
            </div>

            {/* Right Column - Contact & Actions */}
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="border border-border rounded-lg p-6 bg-white sticky top-24">
                <h3 className="font-bold text-lg text-foreground mb-6">联系人信息</h3>

                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">联系人</p>
                    <p className="text-base font-medium text-foreground">
                      {requirement.contact.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">电话</p>
                    <p className="text-base font-medium text-foreground">
                      {requirement.contact.phone}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      出于隐私保护，电话号码已隐藏
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border space-y-3">
                    <Button
                      onClick={() => setCooperationDialogOpen(true)}
                      className="w-full"
                    >
                      提交合作需求
                    </Button>
                    <Button variant="outline" className="w-full gap-2">
                      <Phone size={16} />
                      联系平台客服
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cooperation Dialog */}
      <CooperationDialog
        open={cooperationDialogOpen}
        onOpenChange={setCooperationDialogOpen}
      />

      {/* Footer */}
      <footer className="bg-muted py-8 border-t border-border mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>© 2024 厂务自动化 版权所有 | ICP备案号：xxx</p>
        </div>
      </footer>
    </div>
  )
}
