'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CooperationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CooperationDialog({
  open,
  onOpenChange,
}: CooperationDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    content: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!open) return null

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = '姓名不能为空'
    if (!formData.phone.trim()) newErrors.phone = '电话不能为空'
    if (!formData.company.trim()) newErrors.company = '公司名称不能为空'
    if (!formData.content.trim()) newErrors.content = '合作内容不能为空'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setLoading(true)
    try {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSubmitted(true)
      setTimeout(() => {
        onOpenChange(false)
        setSubmitted(false)
        setFormData({ name: '', phone: '', company: '', content: '' })
      }, 2000)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Dialog 头部 */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-white">
          <h2 className="text-lg font-semibold text-foreground">
            提交合作需求
          </h2>
          <button
            onClick={() => onOpenChange(false)}
            className="p-1 hover:bg-muted rounded transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Dialog 内容 */}
        {!submitted ? (
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                姓名 <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="请输入您的姓名"
              />
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                电话 <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="请输入您的电话号码"
              />
              {errors.phone && (
                <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                公司名称 <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="请输入公司名称"
              />
              {errors.company && (
                <p className="text-sm text-red-600 mt-1">{errors.company}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                合作内容 <span className="text-red-600">*</span>
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => handleChange('content', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                placeholder="请详细说明您的合作意向"
                rows={4}
              />
              {errors.content && (
                <p className="text-sm text-red-600 mt-1">{errors.content}</p>
              )}
            </div>
          </div>
        ) : (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                提交成功
              </h3>
              <p className="text-sm text-muted-foreground">
                感谢您的提交，客服会尽快联系您。
              </p>
            </div>
          </div>
        )}

        {/* Dialog 底部 */}
        {!submitted && (
          <div className="flex items-center justify-end gap-3 p-6 border-t border-border bg-muted/20 sticky bottom-0">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              取消
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? '提交中...' : '提交'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
