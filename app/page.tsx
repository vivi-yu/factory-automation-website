import { V1HomePage } from '@/components/v1/V1HomePage'
import { V1ThemeProvider } from '@/components/v1/V1ThemeProvider'

export default function Home() {
  return (
    <V1ThemeProvider>
      <V1HomePage />
    </V1ThemeProvider>
  )
}
