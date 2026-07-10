'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold text-foreground mb-4">关于我们</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground text-sm">
                  平台介绍
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground text-sm">
                  联系我们
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-4">资源中心</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/companies" className="text-muted-foreground hover:text-foreground text-sm">
                  企业列表
                </Link>
              </li>
              <li>
                <Link href="/requirements" className="text-muted-foreground hover:text-foreground text-sm">
                  需求列表
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-4">帮助中心</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground text-sm">
                  常见问题
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground text-sm">
                  使用指南
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-4">法律</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground text-sm">
                  服务条款
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground text-sm">
                  隐私政策
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-muted-foreground text-xs">
          <p>© 2024 厂务自动化 版权所有 | ICP备案号：xxx</p>
        </div>
      </div>
    </footer>
  )
}
