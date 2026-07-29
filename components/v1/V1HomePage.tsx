import Link from 'next/link'
import { CalendarDays } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { V1BannerCarousel } from '@/components/v1/V1BannerCarousel'
import { V1CategoryShowcase } from '@/components/v1/V1CategoryShowcase'
import { V1FloatingActions } from '@/components/v1/V1FloatingActions'
import { V1Footer } from '@/components/v1/V1Footer'
import { V1Header } from '@/components/v1/V1Header'
import { V1WhyChooseSection } from '@/components/v1/V1WhyChooseSection'
import { V1ClickableCard } from '@/components/v1/V1ClickableCard'
import { getCmsData } from '@/lib/cms/data.server'
import { getCompanyName, latestDemands } from '@/lib/cms/selectors'

export async function V1HomePage() {
  const data = await getCmsData()
  const demands = latestDemands(data.demands, 4)
  const homeNews = data.news.slice(0, 3)

  return (
    <main className="min-h-screen overflow-hidden bg-card text-foreground">
      <V1Header />

      <V1BannerCarousel slides={data.banners} />

      <section id="demands" className="scroll-mt-24 border-y border-border/30 bg-card pb-[10px] pt-[10px] md:pb-[18px] md:pt-[18px]">
        <div className="mx-auto max-w-[1200px] px-4 md:px-0">
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{data.site.copy.home.demandsTitle}</h2>
              <p className="mt-3 text-muted-foreground">{data.site.copy.home.demandsDescription}</p>
            </div>
            <Link href="/demands" className="text-sm font-medium text-primary hover:text-accent">{data.site.copy.home.demandsLinkText}</Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {demands.map((demand) => (
              <V1ClickableCard
                key={demand.id}
                href={`/demands/${demand.id}`}
                className="group cursor-pointer rounded-lg border border-border/40 bg-background p-5 shadow-sm transition-all hover:border-primary hover:shadow-xl hover:shadow-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{demand.type}</span>
                  <span className="text-xs text-muted-foreground">{demand.publishedAt}</span>
                </div>
                <h3 className="mt-4 line-clamp-2 min-h-14 text-lg font-bold text-foreground group-hover:text-primary">{demand.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{getCompanyName(data, demand.companyId)}</p>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{demand.content}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Link href={`/demands/${demand.id}`}><Button variant="outline" className="h-9 rounded-lg border-border/60 hover:border-primary">查看详情</Button></Link>
                  <Link href="/contact"><Button className="h-9 rounded-lg text-white hover:opacity-90" style={{ background: 'var(--v1-button-bg)' }}>联系客服</Button></Link>
                </div>
              </V1ClickableCard>
            ))}
          </div>
        </div>
      </section>

      <V1CategoryShowcase categories={data.categories} companies={data.companies} />
      <V1WhyChooseSection />

      <section id="news" className="bg-card pb-[30px] pt-0 md:pb-[38px] md:pt-2">
        <div className="mx-auto max-w-[1200px] px-4 md:px-0">
          <div className="flex items-end justify-between gap-4">
            <div><h2 className="text-2xl font-bold text-foreground">{data.site.copy.home.newsTitle}</h2></div>
            <Link href="/news" className="text-sm font-medium text-primary hover:text-accent">{data.site.copy.home.newsLinkText}</Link>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {homeNews.map((item) => (
              <Link key={item.id} href={`/news/${item.id}`} className="overflow-hidden rounded-lg border border-border/40 bg-white shadow-sm transition hover:border-primary hover:shadow-xl hover:shadow-primary/10">
                <img src={item.thumbnailImage} alt="" loading="lazy" className="h-44 w-full object-cover" />
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

      <V1Footer categories={data.categories} />
      <V1FloatingActions />
    </main>
  )
}
