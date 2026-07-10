'use client'

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface RequirementDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: () => Promise<void> | void
}

export function RequirementDialog({ open, onOpenChange, onSubmit }: RequirementDialogProps) {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await onSubmit()
      onOpenChange(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>新增需求</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">需求标题</label>
            <input
              type="text"
              placeholder="请输入需求标题"
              className="mt-1 w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">企业名称</label>
            <Link href="/admin/companies" className="mt-1 flex items-center justify-between rounded-lg border border-dashed border-primary/30 bg-primary/5 px-3 py-2 text-xs text-primary hover:border-primary hover:bg-primary/10"><span>没有找到企业？</span><span className="font-medium">去企业管理新增</span></Link>
            <input
              type="text"
              placeholder="请输入企业名称"
              className="mt-1 w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">需求类型</label>
            <select className="mt-1 w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary">
              <option>采购</option>
              <option>合作</option>
              <option>招聘</option>
              <option>项目</option>
              <option>人才</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">需求描述</label>
            <textarea
              placeholder="请输入需求描述"
              rows={3}
              className="mt-1 w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? '保存中...' : '保存'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


