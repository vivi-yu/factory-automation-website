'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { V1CompanyTile } from '@/components/v1/V1CompanyTile'
import type { Category, Company } from '@/lib/cms/types'

export function V1CategoryShowcase({ categories, companies }: { categories: Category[]; companies: Company[] }) {
  if (!categories.length) return null

  return (
    <section id="categories" className="v1-industrial-grid scroll-mt-24 bg-card pb-[30px] pt-0 md:pb-[38px] md:pt-2">
      <div className="mx-auto max-w-[1200px] px-4 md:px-0">
        <div className="space-y-5">
          {categories.map((category) => (
            <CategoryRail key={category.id} category={category} companies={companies.filter((company) => company.categoryId === category.id && company.featured).slice(0, 8)} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CategoryRail({ category, companies }: { category: Category; companies: Company[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = window.setInterval(() => {
      const node = scrollerRef.current
      if (!node || node.scrollWidth <= node.clientWidth) return
      const nearEnd = node.scrollLeft + node.clientWidth >= node.scrollWidth - 8
      node.scrollTo({ left: nearEnd ? 0 : node.scrollLeft + Math.max(260, node.clientWidth * 0.45), behavior: 'smooth' })
    }, 4500)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <section id={`category-${category.id}`} className="scroll-mt-28">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="v1-section-title text-2xl font-bold text-foreground">{category.name}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">{category.description}</p>
        </div>
        <Link href={`/companies?category=${category.id}`}>
          <Button variant="outline" className="gap-2 rounded-lg border-border/60 bg-white hover:border-primary hover:bg-white">
            查看更多
            <ChevronRight className="size-4" />
          </Button>
        </Link>
      </div>

      <div ref={scrollerRef} className="flex snap-x gap-5 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {companies.map((company) => (
          <div key={company.id} className="w-[82%] flex-none snap-start sm:w-[46%] md:w-[30%] lg:w-[calc((100%_-_80px)/5)]">
            <V1CompanyTile company={company} category={category} compact />
          </div>
        ))}
      </div>
    </section>
  )
}

