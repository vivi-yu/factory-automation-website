import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'contacted' | 'not-contacted'
  children: React.ReactNode
}

export function StatusBadge({ status, children }: StatusBadgeProps) {
  const getStyles = () => {
    switch (status) {
      case 'active':
      case 'contacted':
        return 'bg-green-100 text-green-700'
      case 'inactive':
      case 'not-contacted':
        return 'bg-orange-100 text-orange-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <span className={cn('inline-block px-2.5 py-1 rounded text-xs font-medium', getStyles())}>
      {children}
    </span>
  )
}
