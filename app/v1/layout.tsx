import { V1ThemeProvider } from '@/components/v1/V1ThemeProvider'

export default function V1Layout({ children }: { children: React.ReactNode }) {
  return <V1ThemeProvider>{children}</V1ThemeProvider>
}
