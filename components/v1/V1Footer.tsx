import Link from 'next/link'
import { Headphones } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getVisibleCategories } from '@/lib/v1-data'

export function V1Footer() {
  const categories = getVisibleCategories()

  return (
    <footer className="" style={{ background: 'var(--v1-footer-bg)', color: 'var(--v1-footer-foreground)' }}>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-3 md:px-6">
        <div>
          <h2 className="text-lg font-bold">PU 厂务资源平台</h2>
          <p className="mt-3 text-sm leading-6 text-current/70">汇聚产业链优质企业资源，快速寻找合作伙伴、供应商、技术服务与人才资源，让产业对接更高效</p>
        </div>
        <div>
          <h3 className="font-semibold">快速导航</h3>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-current/70">
            <Link href="/v1" className="hover:text-primary">首页</Link>
            <Link href="/v1/companies" className="hover:text-primary">企业</Link>
            <Link href="/v1/demands" className="hover:text-primary">需求</Link>
            <Link href="/v1/news" className="hover:text-primary">行业资讯</Link>
            <Link href="/v1/contact" className="hover:text-primary">联系客服</Link>
            <Link href="/v1/admin" className="hover:text-primary">V1后台</Link>
            {categories.map((category) => <Link key={category.id} href={`/v1#category-${category.id}`} className="hover:text-primary">{category.name}</Link>)}
          </div>
        </div>
        <div>
          <h3 className="font-semibold">联系我们</h3>
          <div className="mt-4 flex gap-4">
            <div className="flex size-24 items-center justify-center rounded-lg border border-primary/10 bg-white/70 text-center text-xs font-semibold text-current/70">企业微信<br />二维码</div>
            <div className="space-y-2 text-sm text-current/70">
              <p>客服电话：400-800-2026</p>
              <p>邮箱：service@auto-resource.com</p>
              <p>办公地址：上海市嘉定区工业互联网创新中心</p>
            </div>
          </div>
          <Link href="/v1/contact" className="mt-5 inline-block"><Button className="h-9 gap-2 rounded-lg text-white hover:opacity-90" style={{ background: 'var(--v1-button-bg)' }}><Headphones className="size-4" />联系平台客服</Button></Link>
        </div>
      </div>
    </footer>
  )
}


