'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

const slides = [
  { src: '/hero-banner-1.png', alt: '友军博品产业资源对接平台横幅 1' },
  { src: '/hero-banner-2.png', alt: '友军博品产业资源对接平台横幅 2' },
]

export function V1BannerCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setActiveIndex((index) => (index + 1) % slides.length), 5000)
    return () => window.clearInterval(timer)
  }, [])

  function goToSlide(index: number) {
    setActiveIndex((index + slides.length) % slides.length)
  }

  return (
    <section className="group relative overflow-hidden bg-card" aria-label="首页横幅">
      <div className="relative aspect-[3/1] min-h-44 w-full overflow-hidden sm:min-h-56">
        {slides.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${index === activeIndex ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
          />
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
          <button key={slide.src} type="button" onClick={() => goToSlide(index)} className={`h-2 rounded-full transition-all ${index === activeIndex ? 'w-6 bg-white' : 'w-2 bg-white/60 hover:bg-white/90'}`} aria-label={`切换到第 ${index + 1} 张横幅`} aria-current={index === activeIndex} />
        ))}
      </div>
    </section>
  )
}
