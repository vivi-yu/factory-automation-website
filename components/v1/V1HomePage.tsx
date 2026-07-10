import Link from 'next/link'
import { CalendarDays } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { V1CategoryShowcase } from '@/components/v1/V1CategoryShowcase'
import { V1FloatingActions } from '@/components/v1/V1FloatingActions'
import { V1Footer } from '@/components/v1/V1Footer'
import { V1Header } from '@/components/v1/V1Header'
import { V1WhyChooseSection } from '@/components/v1/V1WhyChooseSection'
import { getCompanyName, getLatestDemands, getVisibleCategories, v1News } from '@/lib/v1-data'

export function V1HomePage() {
  const categories = getVisibleCategories()
  const latestDemands = getLatestDemands(4)
  const homeNews = v1News.slice(0, 3)

  return (
    <main className="min-h-screen overflow-hidden bg-card text-foreground">
      <V1Header />

      <section className="bg-card pb-8 pt-0">
        <img src="/hero-banner-new.png" alt="" className="h-auto w-full object-contain" />
      </section>

      <section id="demands" className="scroll-mt-24 border-y border-border/30 bg-card py-10 md:py-12">
        <div className="mx-auto max-w-[1200px] px-4 md:px-0">
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">最新需求动态</h2>
              <p className="mt-3 text-muted-foreground">聚焦企业最新业务动态，展示合作需求、项目信息及行业资讯，促进产业资源高效对接</p>
            </div>
            <Link href="/v1/demands" className="text-sm font-medium text-primary hover:text-accent">查看更多需求</Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {latestDemands.map((demand) => (
              <article key={demand.id} className="group rounded-lg border border-border/40 bg-background p-5 shadow-sm transition-all hover:border-primary hover:shadow-xl hover:shadow-primary/10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{demand.type}</span>
                  <span className="text-xs text-muted-foreground">{demand.publishedAt}</span>
                </div>
                <h3 className="mt-4 line-clamp-2 min-h-14 text-lg font-bold text-foreground group-hover:text-primary">{demand.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{getCompanyName(demand.companyId)}</p>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{demand.content}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Link href={`/v1/demands/${demand.id}`}><Button variant="outline" className="h-9 rounded-lg border-border/60 hover:border-primary">查看详情</Button></Link>
                  <Link href="/v1/contact"><Button className="h-9 rounded-lg text-white hover:opacity-90" style={{ background: 'var(--v1-button-bg)' }}>联系客服</Button></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <V1CategoryShowcase categories={categories} />

      <V1WhyChooseSection />

      <section className="bg-card py-10 md:py-12">
        <div className="mx-auto max-w-[1200px] px-4 md:px-0">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-foreground">4 步完成初步对接</h2>
          </div>
          <img src="/resource-flow.png" alt="合作流程：浏览企业、查看需求、提交合作意向、平台协助对接" className="h-auto w-full rounded-lg border border-border/40 object-contain shadow-sm" />
        </div>
      </section>

      <section id="news" className="bg-card py-10 md:py-12">
        <div className="mx-auto max-w-[1200px] px-4 md:px-0">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-foreground">行业资讯</h2>
            </div>
            <Link href="/v1/news" className="text-sm font-medium text-primary hover:text-accent">查看全部资讯</Link>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {homeNews.map((item) => (
              <Link key={item.id} href={`/v1/news/${item.id}`} className="overflow-hidden rounded-lg border border-border/40 bg-white shadow-sm transition hover:border-primary hover:shadow-xl hover:shadow-primary/10">
                <img src={item.image} alt="" className="h-44 w-full object-cover" />
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><CalendarDays className="size-4 text-primary" />{item.date}</div>
                  <h3 className="mt-3 line-clamp-2 text-lg font-bold hover:text-primary">{item.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{item.summary}</p>
                </div>
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





