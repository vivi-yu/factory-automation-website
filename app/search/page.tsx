import Link from 'next/link'
import { Search } from 'lucide-react'
import { V1CompanyCard } from '@/components/v1/V1CompanyCard'
import { V1FloatingActions } from '@/components/v1/V1FloatingActions'
import { V1Footer } from '@/components/v1/V1Footer'
import { V1Header } from '@/components/v1/V1Header'
import { getCmsData } from '@/lib/cms/data.server'
import { getPageMetadata } from '@/lib/cms/metadata.server'
import { getCategory, getCompanyDemands, getCompanyName, searchResources } from '@/lib/cms/selectors'

export const generateMetadata = () => getPageMetadata('search')

export default async function V1SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q = '' } = await searchParams
  const query = q.trim()
  const data = await getCmsData()
  const results = searchResources(data, query)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <V1Header />
      <section className="border-b border-border bg-card py-10">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="text-sm font-semibold text-primary">{data.site.copy.search.eyebrow}</p>
          <h1 className="mt-2 text-2xl font-bold">{data.site.copy.search.title}</h1>
          <p className="mt-2 text-muted-foreground">
            {query ? `关键词：${query}` : data.site.copy.search.description}
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-7xl space-y-10 px-4 md:px-6">
          <div>
            <div className="mb-5 flex items-center gap-2">
              <Search className="size-5 text-primary" />
              <h2 className="text-xl font-bold">{data.site.copy.search.companiesTitle}（{results.companies.length}）</h2>
            </div>
            {results.companies.length > 0 ? (
              <div className="grid gap-5 lg:grid-cols-2">
                {results.companies.map((company) => (
                  <V1CompanyCard key={company.id} company={company} category={getCategory(data, company.categoryId)} demands={getCompanyDemands(data, company.id)} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-border bg-card p-6 text-muted-foreground">{data.site.copy.search.companiesEmpty}</div>
            )}
          </div>

          <div>
            <h2 className="mb-5 text-xl font-bold">{data.site.copy.search.demandsTitle}（{results.demands.length}）</h2>
            {results.demands.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {results.demands.map((demand) => (
                  <Link key={demand.id} href={`/demands/${demand.id}`} className="rounded-lg border border-border bg-card p-5 shadow-sm transition hover:border-primary hover:shadow-md">
                    <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">{demand.type}</span>
                    <h3 className="mt-3 font-bold text-foreground">{demand.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{getCompanyName(data, demand.companyId)} · {demand.publishedAt}</p>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">{demand.content}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-border bg-card p-6 text-muted-foreground">{data.site.copy.search.demandsEmpty}</div>
            )}
          </div>
        </div>
      </section>

      <V1Footer categories={data.categories} />
      <V1FloatingActions />
    </main>
  )
}
