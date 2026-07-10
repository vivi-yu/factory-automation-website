'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search, ChevronRight, ChevronLeft } from 'lucide-react'
import { useState } from 'react'

interface Requirement {
  id: string
  title: string
  company: string
  type: string
  date: string
  summary: string
  status: string
}

const mockRequirements: Requirement[] = [
  {
    id: '1',
    title: '采购自动化生产线',
    company: '瑞达制造有限公司',
    type: '采购',
    date: '2024-07-01',
    summary: '寻求高效的自动化生产线解决方案，提升生产效率...',
    status: '进行中',
  },
  {
    id: '2',
    title: '寻求技术合作伙伴',
    company: '创新科技股份公司',
    type: '合作',
    date: '2024-06-28',
    summary: '寻求在人工智能和自动化领域有经验的合作伙伴...',
    status: '已完成',
  },
  {
    id: '3',
    title: '招聘工程师10人',
    company: '智能制造有限公司',
    type: '招聘',
    date: '2024-06-25',
    summary: '急招自动化、机械、电气工程师各10人...',
    status: '进行中',
  },
  {
    id: '4',
    title: '寻求采购渠道',
    company: '华创制造有限公司',
    type: '采购',
    date: '2024-06-20',
    summary: '寻求优质的零配件采购渠道，长期合作...',
    status: '进行中',
  },
  {
    id: '5',
    title: '项目外包合作',
    company: '鼎力自动化公司',
    type: '项目',
    date: '2024-06-18',
    summary: '自动化项目设计、实施和集成外包需求...',
    status: '进行中',
  },
  {
    id: '6',
    title: '人才培训合作',
    company: '众星科技有限公司',
    type: '人才',
    date: '2024-06-15',
    summary: '寻求自动化技术人才培训和认证合作方...',
    status: '进行中',
  },
]

const types = ['全部', '招聘', '采购', '合作', '项目', '人才']

export default function RequirementsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('全部')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // 过滤数据
  let filtered = mockRequirements
  if (selectedType !== '全部') {
    filtered = filtered.filter((req) => req.type === selectedType)
  }
  if (searchQuery) {
    filtered = filtered.filter(
      (req) =>
        req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.company.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  // 排序（最新在前）
  filtered = [...filtered].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  // 分页
  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const paginatedItems = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleSearch = () => {
    setCurrentPage(1)
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
          <span className="text-foreground">最新需求</span>
        </div>
      </div>

      {/* Search & Filter */}
      <section className="border-b border-border bg-white py-6">
        <div className="container mx-auto px-4 space-y-6">
          {/* Search */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="搜索需求标题或企业名称"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button className="rounded-lg" onClick={handleSearch}>
              <Search className="w-4 h-4" />
            </Button>
          </div>

          {/* Type Filter */}
          <div>
            <p className="text-sm font-medium text-foreground mb-3">需求类型：</p>
            <div className="flex gap-2 flex-wrap">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedType(type)
                    setCurrentPage(1)
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    selectedType === type
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground hover:bg-primary/10'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between text-sm">
            <p className="text-muted-foreground">
              共找到 <span className="font-semibold text-foreground">{filtered.length}</span> 个需求
            </p>
          </div>
        </div>
      </section>

      {/* Requirements List */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          {paginatedItems.length > 0 ? (
            <div className="space-y-4 mb-8">
              {paginatedItems.map((req) => (
                <Link key={req.id} href={`/requirements/${req.id}`}>
                  <div className="rounded-lg border border-border hover:border-primary hover:shadow-md transition bg-white p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      {/* Left Side */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="inline-block px-3 py-1 rounded bg-blue-100 text-blue-700 text-xs font-medium">
                                {req.type}
                              </span>
                              <span className={`inline-block px-3 py-1 rounded text-xs font-medium ${
                                req.status === '进行中'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}>
                                {req.status}
                              </span>
                            </div>
                          </div>
                        </div>

                        <h3 className="text-lg font-bold text-foreground mb-1 line-clamp-1">
                          {req.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {req.company}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {req.summary}
                        </p>
                      </div>

                      {/* Right Side */}
                      <div className="flex items-center justify-between md:flex-col md:items-end gap-4 md:gap-2">
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          发布于 {req.date}
                        </span>
                        <Button variant="outline" className="rounded-full whitespace-nowrap">
                          查看详情
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">暂无相关需求</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-border rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === i + 1
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border hover:bg-white'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 border border-border rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
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
