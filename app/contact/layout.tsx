import { getPageMetadata } from '@/lib/cms/metadata.server'

export const generateMetadata = () => getPageMetadata('contact')

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
