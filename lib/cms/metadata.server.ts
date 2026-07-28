import 'server-only'

import type { Metadata } from 'next'
import { getCmsData } from './data.server'
import type { PageSeoKey } from './types'

type MetadataOverrides = {
  title?: string
  description?: string
}

export async function getPageMetadata(pageKey: PageSeoKey, overrides: MetadataOverrides = {}): Promise<Metadata> {
  const { pageSeo, site } = await getCmsData()
  const seo = pageSeo[pageKey] || site.seo
  return {
    title: overrides.title || seo.title,
    description: overrides.description || seo.description,
    keywords: seo.keywords.split(/[,，]/).map((item) => item.trim()).filter(Boolean),
  }
}
