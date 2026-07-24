'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { V1CompanyTile } from '@/components/v1/V1CompanyTile'
import { getRecommendedCompanies, type V1Category } from '@/lib/v1-data'

export function V1CategorySection({ category }: { category: V1Category }) {
  const companies = getRecommendedCompanies(category.id, 5)
  const scrollerRef = useRef<HTMLDivElement>(null)

  function scrollByCard(direction: 1 | -1) {
    const node = scrollerRef.current
    if (!node) return
    node.scrollBy({ left: direction * Math.max(260, node.clientWidth * 0.45), behavior: 'smooth' })
  }

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
    <section id={`category-${category.id}`} className="scroll-mt-24 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="mt-2 text-2xl font-bold text-foreground">{category.name}</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">{category.description}</p>
          </div>
          <Link href={`/v1/companies?category=${category.id}`}>
            <Button variant="outline" className="gap-2 rounded-lg border-border/60 hover:border-primary">
              查看更多
              <ChevronRight className="size-4" />
            </Button>
          </Link>
        </div>

        <div className="relative">
          <button type="button" onClick={() => scrollByCard(-1)} className="absolute left-2 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-lg border border-border bg-card/95 shadow-lg hover:border-primary" aria-label="上一组企业">
            <ChevronLeft className="size-4" />
          </button>
          <div ref={scrollerRef} className="flex snap-x gap-5 overflow-x-auto scroll-smooth px-2 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {companies.map((company) => (
              <div key={company.id} className="min-w-[82%] snap-start sm:min-w-[46%] md:min-w-[30%] lg:min-w-[calc((100%_-_80px)/5)]">
                <V1CompanyTile company={company} />
              </div>
            ))}
          </div>
          <button type="button" onClick={() => scrollByCard(1)} className="absolute right-2 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-lg border border-border bg-card/95 shadow-lg hover:border-primary" aria-label="下一组企业">
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  )
}

