'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function RecommendedRequirements() {
  const recommendations = [
    {
      id: '2',
      title: '寻求技术合作伙伴',
      company: '创新科技股份公司',
      type: '合作',
      date: '2024-06-28',
    },
    {
      id: '3',
      title: '招聘工程师10人',
      company: '智能制造有限公司',
      type: '招聘',
      date: '2024-06-25',
    },
  ]

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        相关推荐
      </h2>
      <div className="space-y-3">
        {recommendations.map((req) => (
          <Link
            key={req.id}
            href={`/requirements/${req.id}`}
            className="p-4 border border-border rounded-lg hover:border-primary hover:shadow-md transition block"
          >
            <div className="flex items-start justify-between mb-2">
              <span className="inline-block px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-medium">
                {req.type}
              </span>
              <span className="text-xs text-muted-foreground">{req.date}</span>
            </div>
            <h3 className="font-medium text-foreground mb-1">{req.title}</h3>
            <p className="text-sm text-muted-foreground">{req.company}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
