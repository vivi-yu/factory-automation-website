import Link from 'next/link'
import { Search } from 'lucide-react'
import { V1CompanyCard } from '@/components/v1/V1CompanyCard'
import { V1FloatingActions } from '@/components/v1/V1FloatingActions'
import { V1Footer } from '@/components/v1/V1Footer'
import { V1Header } from '@/components/v1/V1Header'
import { getCompanyName, searchV1Resources } from '@/lib/v1-data'

export default async function V1SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q = '' } = await searchParams
  const query = q.trim()
  const results = searchV1Resources(query)

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <V1Header />
      <section className="border-b border-slate-200 bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="text-sm font-semibold text-blue-700">搜索</p>
          <h1 className="mt-2 text-2xl font-bold">搜索结果</h1>
          <p className="mt-2 text-slate-600">
            {query ? `关键词：${query}` : '可搜索企业名称、主营业务、需求标题、地区和关键词。'}
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-7xl space-y-10 px-4 md:px-6">
          <div>
            <div className="mb-5 flex items-center gap-2">
              <Search className="size-5 text-blue-700" />
              <h2 className="text-xl font-bold">企业结果（{results.companies.length}）</h2>
            </div>
            {results.companies.length > 0 ? (
              <div className="grid gap-5 lg:grid-cols-2">
                {results.companies.map((company) => (
                  <V1CompanyCard key={company.id} company={company} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-slate-200 bg-white p-6 text-slate-500">暂无匹配企业。</div>
            )}
          </div>

          <div>
            <h2 className="mb-5 text-xl font-bold">需求结果（{results.demands.length}）</h2>
            {results.demands.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {results.demands.map((demand) => (
                  <Link key={demand.id} href={`/v1/demands/${demand.id}`} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md">
                    <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">{demand.type}</span>
                    <h3 className="mt-3 font-bold text-slate-950">{demand.title}</h3>
                    <p className="mt-2 text-sm text-slate-500">{getCompanyName(demand.companyId)} · {demand.publishedAt}</p>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{demand.content}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-slate-200 bg-white p-6 text-slate-500">暂无匹配需求。</div>
            )}
          </div>
        </div>
      </section>

      <V1Footer />
      <V1FloatingActions />
    </main>
  )
}
