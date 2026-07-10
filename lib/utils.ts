import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date, pattern = 'yyyy-MM-dd'): string {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return format(dateObj, pattern, { locale: zhCN })
  } catch {
    return date as string
  }
}
