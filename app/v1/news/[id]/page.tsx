import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CalendarDays } from 'lucide-react'
import { V1FloatingActions } from '@/components/v1/V1FloatingActions'
import { V1Footer } from '@/components/v1/V1Footer'
import { V1Header } from '@/components/v1/V1Header'
import { getV1News, v1News } from '@/lib/v1-data'

export default async function V1NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const news = getV1News(id)
  if (!news) notFound()
  const related = v1News.filter((item) => item.id !== news.id).slice(0, 3)

  return (
    <main className="min-h-screen bg-[#fff8f5] text-foreground">
      <V1Header />
      <section className="border-b border-primary/10 bg-gradient-to-br from-[#fff4f1] via-white to-[#ffe1d8] py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <Link href="/v1/news" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-accent"><ArrowLeft className="size-4" />返回资讯列表</Link>
          <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground"><CalendarDays className="size-4 text-primary" />{news.date}</div>
          <h1 className="mt-3 max-w-4xl text-3xl font-bold md:text-4xl leading-tight">{news.title}</h1>
          <p className="mt-4 max-w-3xl text-muted-foreground">{news.summary}</p>
        </div>
      </section>
      <section className="py-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:px-6 lg:grid-cols-[1fr_340px]">
          <article className="rounded-lg border border-primary/10 bg-white p-6 shadow-sm">
            <img src={news.image} alt="" className="mb-6 h-auto w-full rounded-lg object-contain" />
            <div className="space-y-5 text-base leading-8 text-muted-foreground">
              {news.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </article>
          <aside className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
            <h2 className="font-bold">相关资讯</h2>
            <div className="mt-4 space-y-3">
              {related.map((item) => <Link key={item.id} href={`/v1/news/${item.id}`} className="block rounded-lg bg-[#fff4f1] p-3 text-sm font-medium hover:text-primary">{item.title}</Link>)}
            </div>
          </aside>
        </div>
      </section>
      <V1Footer />
      <V1FloatingActions />
    </main>
  )
}

