import Link from 'next/link'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { V1ClickableCard } from '@/components/v1/V1ClickableCard'
import { V1FloatingActions } from '@/components/v1/V1FloatingActions'
import { V1Footer } from '@/components/v1/V1Footer'
import { V1Header } from '@/components/v1/V1Header'
import { getCompanyName, getLatestDemands } from '@/lib/v1-data'

const PAGE_SIZE = 6

export default async function V1DemandsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page = '1' } = await searchParams
  const allDemands = getLatestDemands()
  const currentPage = Math.max(1, Number(page) || 1)
  const totalPages = Math.max(1, Math.ceil(allDemands.length / PAGE_SIZE))
  const safePage = Math.min(currentPage, totalPages)
  const demands = allDemands.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <V1Header />
      <section className="border-b border-border/30 bg-card py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <Link href="/v1" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-accent">
            <ArrowLeft className="size-4" />
            返回首页
          </Link>
          <h1 className="mt-6 text-2xl font-bold">最新需求动态</h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">聚焦企业最新业务动态，展示合作需求、项目信息及行业资讯，促进产业资源高效对接。</p>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {demands.map((demand) => (
              <V1ClickableCard key={demand.id} href={`/v1/demands/${demand.id}`} className="group rounded-lg border border-border/40 bg-card p-5 shadow-sm transition-all hover:border-primary hover:shadow-xl hover:shadow-primary/10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{demand.type}</span>
                  <span className="text-xs text-muted-foreground">{demand.publishedAt}</span>
                </div>
                <h2 className="mt-4 line-clamp-2 min-h-14 text-lg font-bold text-foreground group-hover:text-primary">{demand.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{getCompanyName(demand.companyId)}</p>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{demand.content}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Link href={`/v1/demands/${demand.id}`}><Button variant="outline" className="h-9 rounded-lg border-border/60 hover:border-primary">查看详情</Button></Link>
                  <Link href="/v1/contact"><Button className="h-9 rounded-lg bg-gradient-to-r from-primary to-accent text-white hover:opacity-90">联系客服</Button></Link>
                </div>
              </V1ClickableCard>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <PageLink disabled={safePage <= 1} href={`/v1/demands?page=${safePage - 1}`} label="上一页" icon="prev" />
            {Array.from({ length: totalPages }).map((_, index) => {
              const itemPage = index + 1
              return <Link key={itemPage} href={`/v1/demands?page=${itemPage}`} className={`flex size-10 items-center justify-center rounded-lg border text-sm font-medium ${itemPage === safePage ? 'border-primary bg-primary text-white' : 'border-border bg-card hover:border-primary'}`}>{itemPage}</Link>
            })}
            <PageLink disabled={safePage >= totalPages} href={`/v1/demands?page=${safePage + 1}`} label="下一页" icon="next" />
          </div>
        </div>
      </section>
      <V1Footer />
      <V1FloatingActions />
    </main>
  )
}

function PageLink({ disabled, href, label, icon }: { disabled: boolean; href: string; label: string; icon: 'prev' | 'next' }) {
  if (disabled) return <span className="inline-flex h-10 items-center gap-1 rounded-lg border border-border/50 px-3 text-sm text-muted-foreground opacity-50">{icon === 'prev' ? <ChevronLeft className="size-4" /> : null}{label}{icon === 'next' ? <ChevronRight className="size-4" /> : null}</span>
  return <Link href={href} className="inline-flex h-10 items-center gap-1 rounded-lg border border-border bg-card px-3 text-sm font-medium hover:border-primary">{icon === 'prev' ? <ChevronLeft className="size-4" /> : null}{label}{icon === 'next' ? <ChevronRight className="size-4" /> : null}</Link>
}


