import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Headphones, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { V1FloatingActions } from '@/components/v1/V1FloatingActions'
import { V1Footer } from '@/components/v1/V1Footer'
import { V1Header } from '@/components/v1/V1Header'
import { getCompanyCategory, getCompanyName, getLatestDemands, getV1Company, getV1Demand, type V1Company } from '@/lib/v1-data'

export default async function V1DemandDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const demand = getV1Demand(id)
  if (!demand) notFound()

  const company = getV1Company(demand.companyId)
  const relatedDemands = getLatestDemands().filter((item) => item.id !== demand.id).slice(0, 3)

  return (
    <main className="min-h-screen bg-[#fff8f5] text-foreground">
      <V1Header />
      <section className="border-b border-primary/10 bg-gradient-to-br from-[#fff4f1] via-white to-[#ffe1d8] py-8">
        <div className="mx-auto max-w-[1200px] px-4 md:px-0">
          <Link href="/v1/demands" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-accent"><ArrowLeft className="size-4" />返回需求列表</Link>
          <span className="mt-5 inline-block rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">{demand.type}</span>
          <h1 className="mt-3 max-w-4xl text-3xl font-bold leading-tight md:text-4xl">{demand.title}</h1>
          <p className="mt-3 text-muted-foreground">所属企业：{getCompanyName(demand.companyId)} · 发布时间：{demand.publishedAt}</p>
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto grid max-w-[1200px] gap-6 px-4 md:px-0 lg:grid-cols-[1fr_360px]">
          <article className="rounded-lg border border-primary/10 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-2 border-b border-border/30 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-bold">需求内容</h2>
              <p className="text-sm text-muted-foreground">更新时间：{demand.publishedAt}</p>
            </div>
            <p className="mt-5 leading-8 text-muted-foreground">{demand.content}</p>
            <div className="mt-6 flex flex-col gap-3 border-t border-border/30 pt-5 sm:flex-row sm:items-center">
              <Link href="/v1/contact">
                <Button className="h-10 gap-2 rounded-lg text-white hover:opacity-90" style={{ background: 'var(--v1-button-bg)' }}>
                  <Headphones className="size-4" />
                  联系客服
                </Button>
              </Link>
              <p className="text-sm leading-6 text-muted-foreground">安排对接 匹配供应商或技术人员 促成合作</p>
            </div>
          </article>
          <aside>
            {company ? <DemandCompanySummary company={company} /> : null}
          </aside>
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="mx-auto max-w-[1200px] px-4 md:px-0">
          <h2 className="mb-5 text-xl font-bold">相关需求</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {relatedDemands.map((item) => (
              <Link key={item.id} href={`/v1/demands/${item.id}`} className="group rounded-lg border border-border/40 bg-card p-5 shadow-sm transition-all hover:border-primary hover:shadow-xl hover:shadow-primary/10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{item.type}</span>
                  <span className="text-xs text-muted-foreground">{item.publishedAt}</span>
                </div>
                <h3 className="mt-4 line-clamp-2 min-h-14 text-lg font-bold text-foreground group-hover:text-primary">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{getCompanyName(item.companyId)}</p>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{item.content}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <V1Footer />
      <V1FloatingActions />
    </main>
  )
}

function DemandCompanySummary({ company }: { company: V1Company }) {
  const category = getCompanyCategory(company)

  return (
    <article className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white" style={{ background: 'var(--v1-button-bg)' }}>
          {company.logo}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-bold text-foreground">{company.name}</h3>
            {category ? <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">{category.name}</span> : null}
          </div>
          <p className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="size-4" />
            {company.province} · {company.city}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {company.businessTags.map((tag) => <span key={tag} className="rounded-md bg-muted px-2.5 py-1 text-xs text-muted-foreground">{tag}</span>)}
      </div>

      <p className="mt-4 text-sm leading-6 text-muted-foreground">{company.intro}</p>
    </article>
  )
}


