'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { Banner } from '@/lib/cms/types'

export function V1BannerCarousel({ slides }: { slides: Banner[] }) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (slides.length < 2) return
    const timer = window.setInterval(() => setActiveIndex((index) => (index + 1) % slides.length), 5000)
    return () => window.clearInterval(timer)
  }, [slides.length])

  function goToSlide(index: number) {
    setActiveIndex((index + slides.length) % slides.length)
  }

  if (slides.length === 0) return null

  return (
    <section className="group relative overflow-hidden bg-card" aria-label="首页横幅">
      <div className="relative h-[280px] w-full overflow-hidden">
        {slides.map((slide, index) => (
          <picture key={slide.id}>
            <source media="(max-width: 800px)" srcSet={slide.mobileImage} />
            <img
              src={slide.image}
              alt={slide.alt}
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${index === activeIndex ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
            />
          </picture>
        ))}
      </div>

      <button type="button" onClick={() => goToSlide(activeIndex - 1)} className="absolute left-4 top-1/2 hidden size-10 -translate-y-1/2 items-center justify-center rounded-md bg-black/35 text-white transition hover:bg-black/55 group-hover:flex" aria-label="上一张横幅">
        <ChevronLeft className="size-5" />
      </button>
      <button type="button" onClick={() => goToSlide(activeIndex + 1)} className="absolute right-4 top-1/2 hidden size-10 -translate-y-1/2 items-center justify-center rounded-md bg-black/35 text-white transition hover:bg-black/55 group-hover:flex" aria-label="下一张横幅">
        <ChevronRight className="size-5" />
      </button>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((slide, index) => (
          <button key={slide.id} type="button" onClick={() => goToSlide(index)} className={`h-2 rounded-full transition-all ${index === activeIndex ? 'w-6 bg-white' : 'w-2 bg-white/60 hover:bg-white/90'}`} aria-label={`切换到第 ${index + 1} 张横幅`} aria-current={index === activeIndex} />
        ))}
      </div>
    </section>
  )
}
