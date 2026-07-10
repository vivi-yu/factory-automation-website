import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { getCompanyCategory, type V1Company } from '@/lib/v1-data'

export function V1CompanyTile({ company }: { company: V1Company }) {
  const category = getCompanyCategory(company)
  const image = company.images[0] || category?.image || '/companies-network.png'

  return (
    <Link href={`/v1/companies/${company.id}`} className="group block h-full">
      <article className="v1-theme-card h-full overflow-hidden rounded-lg border border-border/40 bg-card shadow-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl hover:shadow-primary/15" style={{ borderRadius: 'var(--v1-card-radius)' }}>
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        </div>
        <div className="p-4">
          <h3 className="line-clamp-2 min-h-12 text-base font-bold leading-6 text-foreground group-hover:text-primary">
            {company.name}
          </h3>
          <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="size-3.5" />
            {company.province} · {company.city}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {company.businessTags.slice(0, 2).map((tag) => (
              <span key={tag} className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground" style={{ borderRadius: 'calc(var(--v1-card-radius) * 0.7)' }}>{tag}</span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  )
}





