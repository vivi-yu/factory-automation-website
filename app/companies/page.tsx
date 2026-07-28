import Link from 'next/link'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { V1CompanyTile } from '@/components/v1/V1CompanyTile'
import { V1FloatingActions } from '@/components/v1/V1FloatingActions'
import { V1Footer } from '@/components/v1/V1Footer'
import { V1Header } from '@/components/v1/V1Header'
import { getCmsData } from '@/lib/cms/data.server'
import { getPageMetadata } from '@/lib/cms/metadata.server'
import { categoryCompanies, getCategory } from '@/lib/cms/selectors'

const PAGE_SIZE = 10

export const generateMetadata = () => getPageMetadata('companies')

export default async function V1CompaniesPage({ searchParams }: { searchParams: Promise<{ category?: string; page?: string }> }) {
  const { category, page = '1' } = await searchParams
  const data = await getCmsData()
  const categories = data.categories
  const activeCategory = category ? getCategory(data, category) : undefined
  const allCompanies = activeCategory
    ? categoryCompanies(data, activeCategory)
    : [...data.companies].sort((a, b) => a.sort - b.sort)
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
          <Link href="/" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-accent">
            <ArrowLeft className="size-4" />
            返回首页
          </Link>
          <h1 className="mt-6 text-2xl font-bold">{activeCategory ? activeCategory.name : data.site.copy.companies.title}</h1>
          <p className="mt-3 text-muted-foreground">{data.site.copy.companies.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="/companies" className={`rounded-full border px-4 py-2 text-sm font-medium transition ${!activeCategory ? 'border-primary bg-primary text-white' : 'border-border bg-background hover:border-primary'}`}>{data.site.copy.companies.allLabel}</Link>
            {categories.map((item) => (
              <Link key={item.id} href={`/companies?category=${item.id}`} className={`rounded-full border px-4 py-2 text-sm font-medium transition ${activeCategory?.id === item.id ? 'border-primary bg-primary text-white' : 'border-border bg-background hover:border-primary'}`}>{item.name}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {companies.map((company) => <V1CompanyTile key={company.id} company={company} category={getCategory(data, company.categoryId)} />)}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <PageLink disabled={safePage <= 1} href={`/companies?${categoryParam}page=${safePage - 1}`} label="上一页" icon="prev" />
            {Array.from({ length: totalPages }).map((_, index) => {
              const itemPage = index + 1
              return (
                <Link key={itemPage} href={`/companies?${categoryParam}page=${itemPage}`} className={`flex size-10 items-center justify-center rounded-lg border text-sm font-medium ${itemPage === safePage ? 'border-primary bg-primary text-white' : 'border-border bg-card hover:border-primary'}`}>{itemPage}</Link>
              )
            })}
            <PageLink disabled={safePage >= totalPages} href={`/companies?${categoryParam}page=${safePage + 1}`} label="下一页" icon="next" />
          </div>
        </div>
      </section>
      <V1Footer categories={categories} />
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
