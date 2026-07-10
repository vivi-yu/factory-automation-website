import Link from 'next/link'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { V1CompanyTile } from '@/components/v1/V1CompanyTile'
import { V1FloatingActions } from '@/components/v1/V1FloatingActions'
import { V1Footer } from '@/components/v1/V1Footer'
import { V1Header } from '@/components/v1/V1Header'
import { getCategoryCompanies, getV1Category, getVisibleCategories, v1Companies } from '@/lib/v1-data'

const PAGE_SIZE = 10

export default async function V1CompaniesPage({ searchParams }: { searchParams: Promise<{ category?: string; page?: string }> }) {
  const { category, page = '1' } = await searchParams
  const categories = getVisibleCategories()
  const activeCategory = category ? getV1Category(category) : undefined
  const allCompanies = activeCategory
    ? getCategoryCompanies(activeCategory.id)
    : v1Companies
        .filter((company) => company.status === 'visible' && categories.some((item) => item.id === company.categoryId))
        .sort((a, b) => a.sort - b.sort)
  const currentPage = Math.max(1, Number(page) || 1)
  const totalPages = Math.max(1, Math.ceil(allCompanies.length / PAGE_SIZE))
  const safePage = Math.min(currentPage, totalPages)
  const companies = allCompanies.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)
  const categoryParam = activeCategory ? `category=${activeCategory.id}&` : ''

  return (
    <main className="min-h-screen bg-background text-foreground">
      <V1Header />
      <section className="border-b border-border/30 bg-card py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <Link href="/v1" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-accent">
            <ArrowLeft className="size-4" />
            返回首页
          </Link>
          <h1 className="mt-6 text-3xl font-bold md:text-4xl">{activeCategory ? activeCategory.name : '全部企业'}</h1>
          <p className="mt-3 text-muted-foreground">按企业分类查看资源，所有合作咨询统一进入平台客服。</p>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="/v1/companies" className={`rounded-full border px-4 py-2 text-sm font-medium transition ${!activeCategory ? 'border-primary bg-primary text-white' : 'border-border bg-background hover:border-primary'}`}>全部</Link>
            {categories.map((item) => (
              <Link key={item.id} href={`/v1/companies?category=${item.id}`} className={`rounded-full border px-4 py-2 text-sm font-medium transition ${activeCategory?.id === item.id ? 'border-primary bg-primary text-white' : 'border-border bg-background hover:border-primary'}`}>{item.name}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {companies.map((company) => <V1CompanyTile key={company.id} company={company} />)}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <PageLink disabled={safePage <= 1} href={`/v1/companies?${categoryParam}page=${safePage - 1}`} label="上一页" icon="prev" />
            {Array.from({ length: totalPages }).map((_, index) => {
              const itemPage = index + 1
              return (
                <Link key={itemPage} href={`/v1/companies?${categoryParam}page=${itemPage}`} className={`flex size-10 items-center justify-center rounded-lg border text-sm font-medium ${itemPage === safePage ? 'border-primary bg-primary text-white' : 'border-border bg-card hover:border-primary'}`}>{itemPage}</Link>
              )
            })}
            <PageLink disabled={safePage >= totalPages} href={`/v1/companies?${categoryParam}page=${safePage + 1}`} label="下一页" icon="next" />
          </div>
        </div>
      </section>
      <V1Footer />
      <V1FloatingActions />
    </main>
  )
}

function PageLink({ disabled, href, label, icon }: { disabled: boolean; href: string; label: string; icon: 'prev' | 'next' }) {
  if (disabled) {
    return <span className="inline-flex h-10 items-center gap-1 rounded-lg border border-border/50 px-3 text-sm text-muted-foreground opacity-50">{icon === 'prev' ? <ChevronLeft className="size-4" /> : null}{label}{icon === 'next' ? <ChevronRight className="size-4" /> : null}</span>
  }
  return <Link href={href} className="inline-flex h-10 items-center gap-1 rounded-lg border border-border bg-card px-3 text-sm font-medium hover:border-primary">{icon === 'prev' ? <ChevronLeft className="size-4" /> : null}{label}{icon === 'next' ? <ChevronRight className="size-4" /> : null}</Link>
}


