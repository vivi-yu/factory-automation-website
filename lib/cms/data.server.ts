import 'server-only'

import { cache } from 'react'
import { directusAsset, readItems } from './client.server'
import type { Banner, Category, CmsData, Company, Demand, News } from './types'
import { developmentFixtures } from '@/lib/dev-fixtures'

type Relation<T> = T | number | string | null
type FileRelation = string | { id?: string } | null | undefined

type CategoryRow = { id: number; slug: string; name: string; description?: string; image?: FileRelation; sort?: number }
type CompanyRow = {
  id: number
  slug: string
  name: string
  logo?: FileRelation
  logo_text?: string
  category_id: Relation<{ slug?: string }>
  is_featured?: boolean
  intro?: string
  business_tags?: unknown
  service_scope?: unknown
  website?: string
  province?: string
  city?: string
  images?: Array<{ file_id?: FileRelation }>
  sort?: number
  date_updated?: string
}
type DemandRow = {
  id: number
  slug: string
  company_id: Relation<{ slug?: string }>
  demand_type_id: Relation<{ name?: string }>
  title: string
  content?: string
  date_published?: string
  sort?: number
}
type ArticleRow = {
  slug: string
  image?: FileRelation
  date_published?: string
  translations?: Array<{ title?: string; excerpt?: string; content?: string }>
}
type BannerRow = { id: number; image?: FileRelation }

function fileId(value: FileRelation) {
  return typeof value === 'string' ? value : value?.id
}

function relationValue<T extends Record<string, unknown>>(value: Relation<T>, key: keyof T) {
  return value && typeof value === 'object' ? String(value[key] || '') : ''
}

function stringList(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === 'string')
  if (typeof value !== 'string') return []
  try {
    const parsed: unknown = JSON.parse(value)
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : []
  } catch {
    return value.split(',').map((item) => item.trim()).filter(Boolean)
  }
}

function textParagraphs(value?: string): string[] {
  if (!value) return []
  const plain = value.replace(/<\/?[^>]+>/g, '\n').replace(/&nbsp;/g, ' ').trim()
  return plain.split(/\n+/).map((item) => item.trim()).filter(Boolean)
}

async function readCategories(): Promise<Category[]> {
  const rows = await readItems<CategoryRow>('factory_categories', new URLSearchParams({
    fields: 'id,slug,name,description,image,sort',
    sort: 'sort',
    limit: '-1',
  }))
  return rows.map((row) => ({
    id: row.slug,
    name: row.name,
    description: row.description || '',
    image: directusAsset(fileId(row.image)) || '/companies-network.png',
    sort: row.sort ?? 100,
    status: 'visible',
  }))
}

async function readCompanies(): Promise<Company[]> {
  const rows = await readItems<CompanyRow>('factory_companies', new URLSearchParams({
    fields: 'id,slug,name,logo,logo_text,category_id.slug,is_featured,intro,business_tags,service_scope,website,province,city,images.file_id,sort,date_updated',
    sort: 'sort',
    limit: '-1',
  }))
  return rows.map((row) => ({
    directusId: row.id,
    id: row.slug,
    logo: row.logo_text || row.name.slice(0, 2),
    logoImage: directusAsset(fileId(row.logo)),
    name: row.name,
    categoryId: relationValue(row.category_id, 'slug'),
    sort: row.sort ?? 100,
    featured: Boolean(row.is_featured),
    intro: row.intro || '',
    businessTags: stringList(row.business_tags),
    serviceScope: stringList(row.service_scope),
    images: (row.images || []).map((item) => directusAsset(fileId(item.file_id))).filter(Boolean),
    website: row.website,
    province: row.province || '',
    city: row.city || '',
    status: 'visible',
    updatedAt: row.date_updated?.slice(0, 10) || '',
  }))
}

async function readDemands(): Promise<Demand[]> {
  const rows = await readItems<DemandRow>('factory_demands', new URLSearchParams({
    fields: 'id,slug,company_id.slug,demand_type_id.name,title,content,date_published,sort',
    sort: '-date_published,sort',
    limit: '-1',
  }))
  return rows.map((row) => ({
    directusId: row.id,
    id: row.slug,
    companyId: relationValue(row.company_id, 'slug'),
    title: row.title,
    type: relationValue(row.demand_type_id, 'name'),
    content: row.content || '',
    publishedAt: row.date_published?.slice(0, 10) || '',
    sort: row.sort ?? 100,
    status: 'active',
  }))
}

async function readNews(): Promise<News[]> {
  const rows = await readItems<ArticleRow>('articles', new URLSearchParams({
    fields: 'slug,image,date_published,translations.title,translations.excerpt,translations.content',
    'deep[translations][_filter][languages_code][_eq]': 'zh-CN',
    sort: '-date_published',
    limit: '-1',
  }))
  return rows.flatMap((row) => {
    const translation = row.translations?.[0]
    if (!translation?.title) return []
    return [{
      id: row.slug,
      title: translation.title,
      summary: translation.excerpt || '',
      date: row.date_published?.slice(0, 10) || '',
      image: directusAsset(fileId(row.image)) || '/features-automation.png',
      content: textParagraphs(translation.content),
    }]
  })
}

async function readBanners(): Promise<Banner[]> {
  const rows = await readItems<BannerRow>('banners', new URLSearchParams({
    fields: 'id,image',
    sort: 'sort',
    limit: '-1',
  }))
  return rows.flatMap((row) => {
    const image = directusAsset(fileId(row.image))
    return image ? [{ id: String(row.id), image, alt: '产业资源对接平台横幅' }] : []
  })
}

function fixtureData(): CmsData {
  return developmentFixtures
}

export const getCmsData = cache(async (): Promise<CmsData> => {
  if (!process.env.DIRECTUS_URL && process.env.NODE_ENV !== 'production') return fixtureData()

  try {
    const [categories, companies, demands, news, banners] = await Promise.all([
      readCategories(),
      readCompanies(),
      readDemands(),
      readNews(),
      readBanners(),
    ])
    return { categories, companies, demands, news, banners }
  } catch (error) {
    if (process.env.NODE_ENV === 'production') throw error
    console.warn('[cms] Directus unavailable; using development fixtures:', error)
    return fixtureData()
  }
})
