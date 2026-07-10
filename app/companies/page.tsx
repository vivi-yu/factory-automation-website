'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')

  const categories = ['全部', '甲方企业', '自动化企业', '供应商', '人力资源', '配套服务']
  const regions = ['全部', '北京', '上海', '深圳', '杭州', '苏州', '其他']

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
          <span className="text-foreground">企业资源</span>
        </div>
      </div>

      {/* Search & Filter */}
      <section className="border-b border-border py-6">
        <div className="container mx-auto px-4 space-y-6">
          {/* Search */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="搜索企业名称或关键词"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 rounded-full border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button className="rounded-full">
              <Search className="w-4 h-4" />
            </Button>
          </div>

          {/* Category Filter */}
          <div>
            <p className="text-sm font-medium text-foreground mb-3">企业分类：</p>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1 rounded-full text-sm transition ${
                    selectedCategory === cat
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border hover:border-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Region Filter */}
          <div>
            <p className="text-sm font-medium text-foreground mb-3">地区筛选：</p>
            <div className="flex gap-2 flex-wrap">
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-4 py-1 rounded-full text-sm transition ${
                    selectedRegion === region
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border hover:border-primary'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Companies Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <Link key={i} href={`/companies/${i}`}>
                <div className="rounded-lg border border-border hover:border-primary hover:shadow-lg transition bg-card p-6">
                  {/* Logo */}
                  <div className="w-16 h-16 bg-secondary rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">企{i + 1}</span>
                  </div>

                  {/* Company Info */}
                  <h3 className="text-lg font-bold text-foreground mb-2">企业名称 {i + 1}</h3>
                  <p className="text-sm text-muted-foreground mb-3">自动化设备、工业控制、机器人集成</p>

                  {/* Category & Location */}
                  <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground">
                    <span>自动化企业</span>
                    <span>北京市</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    公司致力于提供专业的自动化解决方案，拥有丰富的行业经验和优秀的技术团队。
                  </p>

                  {/* Latest Requirements */}
                  <div className="mb-4 text-xs">
                    <span className="text-primary font-medium">最新需求：3</span>
                  </div>

                  {/* Button */}
                  <Button className="w-full rounded-full">查看详情</Button>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-12">
            <Button variant="outline" disabled>上一页</Button>
            <Button variant="outline">1</Button>
            <Button>2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline">下一页</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>© 2024 厂务自动化 版权所有 | ICP备案号：xxx</p>
        </div>
      </footer>
    </div>
  )
}
