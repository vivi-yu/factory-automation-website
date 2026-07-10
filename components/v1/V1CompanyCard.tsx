import Link from 'next/link'
import { ArrowRight, Headphones, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getCompanyCategory, getV1CompanyDemands, type V1Company } from '@/lib/v1-data'

export function V1CompanyCard({ company }: { company: V1Company }) {
  const demands = getV1CompanyDemands(company.id).slice(0, 3)
  const category = getCompanyCategory(company)

  return (
    <article className="v1-theme-card rounded-lg border border-border/40 bg-card p-5 shadow-sm transition hover:border-primary hover:shadow-xl hover:shadow-primary/10">
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

      <div className="mt-4 rounded-lg bg-muted/50 p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-foreground">最新需求</p>
          <Link href={`/v1/companies/${company.id}`} className="text-xs font-medium text-primary hover:text-accent">查看全部</Link>
        </div>
        <div className="mt-2 space-y-2">
          {demands.length > 0 ? demands.map((demand) => (
            <Link key={demand.id} href={`/v1/demands/${demand.id}`} className="block text-sm text-muted-foreground hover:text-primary">{demand.title}</Link>
          )) : <p className="text-sm text-muted-foreground">暂无公开需求，欢迎联系平台客服获取对接信息。</p>}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 border-t border-border/30 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">更新时间：{company.updatedAt}</p>
        <div className="flex gap-2">
          <Link href={`/v1/companies/${company.id}`}>
            <Button variant="outline" className="h-9 gap-1 rounded-lg border-border/60 hover:border-primary">查看详情<ArrowRight className="size-4" /></Button>
          </Link>
          <Link href="/v1/contact">
            <Button className="h-9 gap-1 rounded-lg text-white hover:opacity-90" style={{ background: 'var(--v1-button-bg)' }}><Headphones className="size-4" />联系客服</Button>
          </Link>
        </div>
      </div>
    </article>
  )
}


