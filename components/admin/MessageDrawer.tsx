'use client'

import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Message {
  id: string
  name: string
  phone: string
  company: string
  content: string
  source: string
  submittedAt: string
  contactStatus: string
}

interface MessageDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  message: Message | null
}

export default function MessageDrawer({
  open,
  onOpenChange,
  message,
}: MessageDrawerProps) {
  if (!open || !message) return null

  return (
    <>
      {/* 背景遮罩 */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={() => onOpenChange(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-xl z-50 overflow-y-auto">
        {/* Drawer 头部 */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-white">
          <h2 className="text-lg font-semibold text-foreground">留言详情</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="p-1 hover:bg-muted rounded transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer 内容 */}
        <div className="p-6 space-y-6">
          {/* 基本信息 */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              基本信息
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">姓名</p>
                <p className="text-sm text-foreground font-medium mt-1">
                  {message.name}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">电话</p>
                <p className="text-sm text-foreground font-medium mt-1">
                  {message.phone}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">公司</p>
                <p className="text-sm text-foreground font-medium mt-1">
                  {message.company}
                </p>
              </div>
            </div>
          </div>

          {/* 留言信息 */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              留言内容
            </h3>
            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-foreground leading-relaxed">
                {message.content}
              </p>
            </div>
          </div>

          {/* 提交信息 */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              提交信息
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">来源页面</p>
                <p className="text-sm text-foreground font-medium mt-1">
                  {message.source}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">提交时间</p>
                <p className="text-sm text-foreground font-medium mt-1">
                  {message.submittedAt}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">联系状态</p>
                <span
                  className={`inline-block text-xs px-2.5 py-1 rounded font-medium mt-1 ${
                    message.contactStatus === '已联系'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-orange-100 text-orange-700'
                  }`}
                >
                  {message.contactStatus}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer 底部 */}
        <div className="p-6 border-t border-border bg-muted/20 sticky bottom-0">
          <Button
            className="w-full"
            variant={
              message.contactStatus === '已联系' ? 'outline' : 'default'
            }
          >
            {message.contactStatus === '已联系'
              ? '已标记为已联系'
              : '标记为已联系'}
          </Button>
        </div>
      </div>
    </>
  )
}
