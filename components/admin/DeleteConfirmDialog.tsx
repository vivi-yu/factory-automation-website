'use client'

import { X, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DeleteConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  title: string
  description: string
}

export default function DeleteConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
}: DeleteConfirmDialogProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm">
        {/* Dialog 头部 */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <AlertTriangle size={20} className="text-red-600" />
            {title}
          </h2>
          <button
            onClick={() => onOpenChange(false)}
            className="p-1 hover:bg-muted rounded transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Dialog 内容 */}
        <div className="p-6">
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {/* Dialog 底部 */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-border bg-muted/20">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            取消
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm()
              onOpenChange(false)
            }}
          >
            删除
          </Button>
        </div>
      </div>
    </div>
  )
}
