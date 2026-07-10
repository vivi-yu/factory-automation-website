import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Headphones, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { V1CompanyCard } from '@/components/v1/V1CompanyCard'
import { V1FloatingActions } from '@/components/v1/V1FloatingActions'
import { V1Footer } from '@/components/v1/V1Footer'
import { V1Header } from '@/components/v1/V1Header'
import { getCategoryCompanies, getCompanyCategory, getV1Company, getV1CompanyDemands } from '@/lib/v1-data'

export default async function V1CompanyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const company = getV1Company(id)
  if (!company) notFound()

  const category = getCompanyCategory(company)
  const demands = getV1CompanyDemands(company.id)
  const related = getCategoryCompanies(company.categoryId).filter((item) => item.id !== company.id).slice(0, 2)

  return (
    <main className="min-h-screen bg-[#fff8f5] text-foreground">
      <V1Header />
      <section className="border-b border-primary/10 bg-gradient-to-br from-[#fff4f1] via-white to-[#ffe1d8] py-10">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <Link href="/v1" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-accent"><ArrowLeft className="size-4" />返回首页</Link>
          <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex size-16 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-lg font-bold text-white">{company.logo}</div>
              <div>
                <div className="flex flex-wrap items-center gap-2"><h1 className="text-3xl font-bold">{company.name}</h1>{category ? <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">{category.name}</span> : null}</div>
                <p className="mt-2 flex items-center gap-1 text-muted-foreground"><MapPin className="size-4" />{company.province} · {company.city}</p>
              </div>
            </div>
            <Link href="/v1/contact"><Button className="h-10 gap-2 rounded-lg bg-gradient-to-r from-primary to-accent text-white hover:opacity-90"><Headphones className="size-4" />联系平台客服</Button></Link>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:px-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <div className="rounded-lg border border-primary/10 bg-white p-6 shadow-sm"><h2 className="text-xl font-bold">企业介绍</h2><p className="mt-4 leading-8 text-muted-foreground">{company.intro}</p><div className="mt-5 flex flex-wrap gap-2">{company.businessTags.map((tag) => <span key={tag} className="rounded-md bg-primary/10 px-3 py-1 text-sm text-primary">{tag}</span>)}</div></div>
            <div className="rounded-lg border border-primary/10 bg-white p-6 shadow-sm"><h2 className="text-xl font-bold">服务范围</h2><div className="mt-4 grid gap-3 sm:grid-cols-2">{company.serviceScope.map((item) => <div key={item} className="rounded-lg bg-[#fff4f1] p-4 text-sm font-medium text-muted-foreground">{item}</div>)}</div></div>
            {company.images.length > 0 ? <div className="rounded-lg border border-primary/10 bg-white p-6 shadow-sm"><h2 className="text-xl font-bold">企业图片</h2><div className="mt-4 grid gap-3 sm:grid-cols-3">{company.images.slice(0, 5).map((image) => <img key={image} src={image} alt="" className="h-36 w-full rounded-lg object-cover" />)}</div></div> : null}
          </div>
          <aside className="space-y-6">
            <div className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm"><h2 className="font-bold">最新需求</h2><div className="mt-3 space-y-3">{demands.length > 0 ? demands.map((demand) => <Link key={demand.id} href={`/v1/demands/${demand.id}`} className="block rounded-lg bg-[#fff4f1] p-3 hover:bg-[#ffe9e3]"><p className="text-sm font-semibold text-foreground">{demand.title}</p><p className="mt-1 text-xs text-muted-foreground">{demand.publishedAt} · {demand.type}</p></Link>) : <p className="text-sm text-muted-foreground">暂无公开需求。</p>}</div></div>
            <div className="rounded-lg border border-primary/10 bg-white p-5 shadow-sm"><h2 className="font-bold">平台对接</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">企业电话、微信、联系人不直接展示。请提交留言，由平台客服确认需求后人工撮合。</p><Link href="/v1/contact" className="mt-4 block"><Button className="h-10 w-full rounded-lg bg-gradient-to-r from-primary to-accent text-white hover:opacity-90">联系平台客服</Button></Link></div>
          </aside>
        </div>
      </section>
      {related.length > 0 ? <section className="bg-white py-10"><div className="mx-auto max-w-7xl px-4 md:px-6"><h2 className="mb-5 text-xl font-bold">同类企业</h2><div className="grid gap-5 lg:grid-cols-2">{related.map((item) => <V1CompanyCard key={item.id} company={item} />)}</div></div></section> : null}
      <V1Footer />
      <V1FloatingActions />
    </main>
  )
}

