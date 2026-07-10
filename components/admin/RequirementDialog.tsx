'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface RequirementDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editingData?: any
  onSave: (data: any) => void
}

export default function RequirementDialog({
  open,
  onOpenChange,
  editingData,
  onSave,
}: RequirementDialogProps) {
  const [formData, setFormData] = useState({
    title: editingData?.title || '',
    company: editingData?.company || '',
    type: editingData?.type || '采购',
    publishDate: editingData?.publishDate || '',
    status: editingData?.status || '进行中',
    content: '',
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!open) return null

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.title.trim()) newErrors.title = '需求标题不能为空'
    if (!formData.company.trim()) newErrors.company = '企业名称不能为空'
    if (!formData.publishDate) newErrors.publishDate = '发布时间不能为空'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setLoading(true)
    try {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1000))
      onSave(formData)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Dialog 头部 */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-white">
          <h2 className="text-lg font-semibold text-foreground">
            {editingData ? '编辑需求' : '新增需求'}
          </h2>
          <button
            onClick={() => onOpenChange(false)}
            className="p-1 hover:bg-muted rounded transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Dialog 内容 */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              需求标题 <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="请输入需求标题"
            />
            {errors.title && (
              <p className="text-sm text-red-600 mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              企业名称 <span className="text-red-600">*</span>
            </label>
            <Link href="/admin/companies" className="mb-2 flex items-center justify-between rounded-lg border border-dashed border-primary/30 bg-primary/5 px-3 py-2 text-xs text-primary hover:border-primary hover:bg-primary/10"><span>没有找到企业？</span><span className="font-medium">去企业管理新增</span></Link>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="请输入企业名称"
            />
            {errors.company && (
              <p className="text-sm text-red-600 mt-1">{errors.company}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              需求类型 <span className="text-red-600">*</span>
            </label>
            <select
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="采购">采购</option>
              <option value="合作">合作</option>
              <option value="招聘">招聘</option>
              <option value="项目">项目</option>
              <option value="人才">人才</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              发布时间 <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              value={formData.publishDate}
              onChange={(e) => handleChange('publishDate', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            {errors.publishDate && (
              <p className="text-sm text-red-600 mt-1">{errors.publishDate}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              状态 <span className="text-red-600">*</span>
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="进行中">进行中</option>
              <option value="已完成">已完成</option>
              <option value="已取消">已取消</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              需求内容
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => handleChange('content', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              placeholder="请输入需求内容"
              rows={4}
            />
          </div>
        </div>

        {/* Dialog 底部 */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-border bg-muted/20 sticky bottom-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            取消
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? '保存中...' : '保存'}
          </Button>
        </div>
      </div>
    </div>
  )
}


