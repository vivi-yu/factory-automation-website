import { V1HomePage } from '@/components/v1/V1HomePage'
import { getPageMetadata } from '@/lib/cms/metadata.server'

export const generateMetadata = () => getPageMetadata('home')

export default function Home() {
  return <V1HomePage />
}
