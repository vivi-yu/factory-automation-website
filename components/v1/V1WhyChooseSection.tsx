'use client'

import { useState } from 'react'
import { Handshake, Network, Search, Share2 } from 'lucide-react'

const features = [
  { title: '产业资源整合', desc: '汇聚产业链上下游资源', icon: Network },
  { title: '快速查找', desc: '按行业快速查询企业', icon: Search },
  { title: '需求共享', desc: '及时了解企业合作需求', icon: Share2 },
  { title: '高效对接', desc: '帮助企业建立合作机会', icon: Handshake },
]

export function V1WhyChooseSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="bg-card py-10 md:py-12">
      <div className="mx-auto max-w-[1200px] px-4 md:px-0">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-foreground">让产业资源更容易被找到</h2>
        </div>

        <div className="hidden gap-8 lg:flex">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isHovered = hoveredIndex === index
            const isOther = hoveredIndex !== null && hoveredIndex !== index
            return (
              <div
                key={feature.title}
                className="group relative animate-grow"
                style={{ flex: isHovered ? '0 0 calc(25% + 80px)' : isOther ? '1' : '1', transition: 'flex 0.5s ease-out' }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className="absolute inset-0 rounded-lg shadow-xl"
                  style={{
                    background: 'var(--v1-why-hover-bg)',
                    opacity: isHovered ? 1 : 0,
                    marginLeft: isHovered ? '-36px' : '0',
                    marginRight: isHovered ? '-36px' : '0',
                    transition: 'opacity 0.5s ease-out, margin 0.5s ease-out',
                  }}
                />
                <div className="v1-theme-card relative z-10 flex min-h-[210px] flex-col items-center justify-center overflow-hidden rounded-lg p-8 text-center" style={{ borderRadius: 'var(--v1-card-radius)' }}>
                  <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-primary to-accent transition-transform duration-500 group-hover:scale-x-100" />
                  <div className={`mb-5 flex size-14 items-center justify-center rounded-xl transition-colors duration-500 ${isHovered ? 'bg-white text-primary' : 'bg-primary/10 text-primary'}`}>
                    <Icon className="size-7" strokeWidth={1.5} />
                  </div>
                  <h3 className={`text-base font-semibold uppercase tracking-wide transition-colors duration-500 ${isHovered ? '' : 'text-foreground'}`} style={{ color: isHovered ? 'var(--v1-why-hover-foreground)' : undefined }}>{feature.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed transition-opacity duration-500" style={{ opacity: isHovered ? 1 : 0, color: isHovered ? 'var(--v1-why-hover-foreground)' : undefined }}>{feature.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:hidden">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isHovered = hoveredIndex === index
            return (
              <div key={feature.title} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} className="v1-theme-card animate-grow overflow-hidden rounded-lg border border-border bg-card p-6 text-center shadow-sm transition " style={{ background: isHovered ? 'var(--v1-why-hover-bg)' : 'var(--card)', borderRadius: 'var(--v1-card-radius)', color: isHovered ? 'var(--v1-why-hover-foreground)' : undefined }}>
                <div className={`mx-auto mb-4 flex size-14 items-center justify-center rounded-xl ${isHovered ? 'bg-white text-primary' : 'bg-primary/10 text-primary'}`}>
                  <Icon className="size-7" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold">{feature.title}</h3>
                <p className="mt-2 text-sm opacity-80">{feature.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}








