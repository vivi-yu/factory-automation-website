import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CalendarDays } from 'lucide-react'
import { V1FloatingActions } from '@/components/v1/V1FloatingActions'
import { V1Footer } from '@/components/v1/V1Footer'
import { V1Header } from '@/components/v1/V1Header'
import { getCmsData } from '@/lib/cms/data.server'
import { getPageMetadata } from '@/lib/cms/metadata.server'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = await getCmsData()
  const news = data.news.find((item) => item.id === id)
  return getPageMetadata('news', news ? {
    title: `${news.title} | ${data.site.name}`,
    description: news.summary,
  } : {})
}

export default async function V1NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = await getCmsData()
  const news = data.news.find((item) => item.id === id)
  if (!news) notFound()
  const related = data.news.filter((item) => item.id !== news.id).slice(0, 3)

  return (
    <main className="v1-inner-page min-h-screen text-foreground">
      <V1Header />
      <section className="v1-inner-hero border-b border-primary/10 py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <Link href="/news" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-accent"><ArrowLeft className="size-4" />返回资讯列表</Link>
          <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground"><CalendarDays className="size-4 text-primary" />{news.date}</div>
          <h1 className="mt-3 max-w-4xl text-2xl font-bold leading-tight">{news.title}</h1>
          <p className="mt-4 max-w-3xl text-muted-foreground">{news.summary}</p>
        </div>
      </section>
      <section className="py-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:px-6 lg:grid-cols-[1fr_340px]">
          <article className="rounded-lg border border-primary/10 bg-card p-6 shadow-sm">
            <img src={news.image} alt="" className="mb-6 h-auto w-full rounded-lg object-contain" />
            <div className="space-y-5 text-base leading-8 text-muted-foreground">
              {news.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </article>
          <aside className="rounded-lg border border-primary/10 bg-card p-5 shadow-sm">
            <h2 className="font-bold">相关资讯</h2>
            <div className="mt-4 space-y-3">
              {related.map((item) => <Link key={item.id} href={`/news/${item.id}`} className="v1-inner-panel-link block rounded-lg p-3 text-sm font-medium hover:text-primary">{item.title}</Link>)}
            </div>
          </aside>
        </div>
      </section>
      <V1Footer categories={data.categories} />
      <V1FloatingActions />
    </main>
  )
}
