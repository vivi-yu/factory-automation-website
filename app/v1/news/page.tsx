import Link from 'next/link'
import { ArrowLeft, CalendarDays } from 'lucide-react'
import { V1FloatingActions } from '@/components/v1/V1FloatingActions'
import { V1Footer } from '@/components/v1/V1Footer'
import { V1Header } from '@/components/v1/V1Header'
import { v1News } from '@/lib/v1-data'

export default function V1NewsPage() {
  return (
    <main className="min-h-screen bg-[#fff8f5] text-foreground">
      <V1Header />
      <section className="border-b border-primary/10 bg-gradient-to-br from-[#fff4f1] via-white to-[#ffe1d8] py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <Link href="/v1" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-accent"><ArrowLeft className="size-4" />返回首页</Link>
          <h1 className="mt-6 text-3xl font-bold md:text-4xl">产业观察与资讯</h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">持续整理自动化、供应链、技术服务和项目对接相关动态。</p>
        </div>
      </section>
      <section className="py-12">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 md:grid-cols-3 md:px-6">
          {v1News.map((item) => (
            <Link key={item.id} href={`/v1/news/${item.id}`} className="overflow-hidden rounded-lg border border-primary/10 bg-white shadow-sm transition hover:border-primary hover:shadow-xl hover:shadow-primary/10">
              <img src={item.image} alt="" className="h-44 w-full object-cover" />
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground"><CalendarDays className="size-4 text-primary" />{item.date}</div>
                <h2 className="mt-3 line-clamp-2 text-lg font-bold hover:text-primary">{item.title}</h2>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{item.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <V1Footer />
      <V1FloatingActions />
    </main>
  )
}




