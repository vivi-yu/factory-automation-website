import 'server-only'

import { cache } from 'react'
import { directusAsset, readItems, readSingleton } from './client.server'
import { DEFAULT_SITE_CONFIG } from './site-defaults'
import { plainTextFromRichText, sanitizeRichTextHtml } from './rich-text.server'
import type { Banner, Category, CmsData, Company, Demand, News, PageSeoKey, SeoConfig, SiteConfig, SiteFeature, SiteLink } from './types'
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
  title?: string
  excerpt?: string
  content?: string
}
type BannerRow = {
  id: number
  image?: FileRelation
  factory_alt_text?: string
}
type SeoPageRow = {
  page_key: string
  translations?: Array<{ title?: string; keywords?: string; description?: string }>
}
type SiteTranslationRow = {
  site_name?: string
  company_address?: string
  quote_button_text?: string
  default_meta_title?: string
  default_meta_keywords?: string
  default_meta_description?: string
  factory_footer_description?: string
  factory_contact_eyebrow?: string
  factory_contact_title?: string
  factory_contact_description?: string
  factory_contact_form_title?: string
  factory_contact_form_description?: string
  factory_home_features_title?: string
  factory_home_features?: unknown
  factory_home_demands_title?: string
  factory_home_demands_description?: string
  factory_home_demands_link_text?: string
  factory_home_news_title?: string
  factory_home_news_link_text?: string
  factory_companies_title?: string
  factory_companies_description?: string
  factory_companies_all_label?: string
  factory_demands_title?: string
  factory_demands_description?: string
  factory_news_title?: string
  factory_news_description?: string
  factory_search_eyebrow?: string
  factory_search_title?: string
  factory_search_description?: string
  factory_search_companies_title?: string
  factory_search_demands_title?: string
  factory_search_companies_empty?: string
  factory_search_demands_empty?: string
  factory_company_match_title?: string
  factory_company_match_description?: string
}
type SiteRow = {
  site_title?: string
  logo?: FileRelation
  footer_logo?: FileRelation
  favicon?: FileRelation
  site_name_display_enabled?: boolean
  theme_primary?: string
  theme_primary_dark?: string
  theme_secondary?: string
  theme_accent?: string
  theme_bg_page?: string
  theme_bg_card?: string
  theme_text_body?: string
  theme_border?: string
  theme_bg_muted?: string
  factory_theme_bg_page?: string
  factory_theme_bg_panel?: string
  factory_theme_bg_accent?: string
  font_family?: string
  header_background_color?: string
  header_background_opacity?: number
  header_text_color?: string
  header_hover_text_color?: string
  quote_button_enabled?: boolean
  header_navigation_links?: unknown
  footer_background_color?: string
  footer_text_color?: string
  footer_link_color?: string
  email?: string
  phone?: string
  quick_links?: unknown
  factory_contact_qr?: FileRelation
  factory_contact_banner?: FileRelation
  translations?: SiteTranslationRow[]
}

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

function jsonList(value: unknown): unknown[] {
  if (Array.isArray(value)) return value
  if (typeof value !== 'string') return []
  try {
    const parsed: unknown = JSON.parse(value)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function text(value: unknown, fallback: string) {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

function siteLinks(value: unknown, fallback: SiteLink[]): SiteLink[] {
  const links = jsonList(value).flatMap((item) => {
    if (!item || typeof item !== 'object') return []
    const row = item as Record<string, unknown>
    if (row.enabled === false) return []
    const href = text(row.href, '')
    const label = text(row.label_zh, text(row.label, text(row.label_en, '')))
    if (!href || !label || /^javascript:/i.test(href)) return []
    return [{ label, href, sort: typeof row.sort === 'number' ? row.sort : 1 }]
  })
  return links.length > 0
    ? links.sort((a, b) => a.sort - b.sort).map(({ label, href }) => ({ label, href }))
    : fallback
}

function siteFeatures(value: unknown): SiteFeature[] {
  return jsonList(value).flatMap((item) => {
    if (!item || typeof item !== 'object') return []
    const row = item as Record<string, unknown>
    const title = text(row.title, '')
    const description = text(row.description, '')
    if (!title) return []
    return [{ icon: text(row.icon, 'factory'), title, description }]
  })
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
    sort: row.sort ?? 1,
    status: 'visible',
  }))
}

async function readCompanies(): Promise<Company[]> {
  const rows = await readItems<CompanyRow>('factory_companies', new URLSearchParams({
    fields: 'id,slug,name,logo,logo_text,category_id.slug,is_featured,intro,business_tags,service_scope,website,province,city,images.file_id,sort,date_updated',
    sort: 'sort',
    limit: '-1',
  }))
  return rows.map((row) => {
    const introHtml = sanitizeRichTextHtml(row.intro)
    return {
      directusId: row.id,
      id: row.slug,
      logo: row.logo_text || row.name.slice(0, 2),
      logoImage: directusAsset(fileId(row.logo)),
      name: row.name,
      categoryId: relationValue(row.category_id, 'slug'),
      sort: row.sort ?? 1,
      featured: Boolean(row.is_featured),
      intro: plainTextFromRichText(introHtml),
      introHtml,
      businessTags: stringList(row.business_tags),
      serviceScope: stringList(row.service_scope),
      images: (row.images || []).map((item) => directusAsset(fileId(item.file_id))).filter(Boolean),
      website: row.website,
      province: row.province || '',
      city: row.city || '',
      status: 'visible' as const,
      updatedAt: row.date_updated?.slice(0, 10) || '',
    }
  })
}

async function readDemands(): Promise<Demand[]> {
  const rows = await readItems<DemandRow>('factory_demands', new URLSearchParams({
    fields: 'id,slug,company_id.slug,demand_type_id.name,title,content,date_published,sort',
    sort: '-date_published,sort',
    limit: '-1',
  }))
  return rows.map((row) => {
    const contentHtml = sanitizeRichTextHtml(row.content)
    return {
      directusId: row.id,
      id: row.slug,
      companyId: relationValue(row.company_id, 'slug'),
      title: row.title,
      type: relationValue(row.demand_type_id, 'name'),
      content: plainTextFromRichText(contentHtml),
      contentHtml,
      publishedAt: row.date_published?.slice(0, 10) || '',
      sort: row.sort ?? 1,
      status: 'active' as const,
    }
  })
}

async function readNews(): Promise<News[]> {
  const rows = await readItems<ArticleRow>('articles', new URLSearchParams({
    fields: 'slug,image,date_published,title,excerpt,content',
    sort: '-date_published',
    limit: '-1',
  }))
  return rows.flatMap((row) => {
    if (!row.title) return []
    return [{
      id: row.slug,
      title: row.title,
      summary: row.excerpt || '',
      date: row.date_published?.slice(0, 10) || '',
      image: directusAsset(fileId(row.image)) || '/features-automation.png',
      contentHtml: sanitizeRichTextHtml(row.content),
    }]
  })
}

async function readBanners(): Promise<Banner[]> {
  const rows = await readItems<BannerRow>('banners', new URLSearchParams({
    fields: 'id,image,factory_alt_text',
    sort: 'sort',
    limit: '-1',
  }))
  return rows.flatMap((row) => {
    const image = directusAsset(fileId(row.image))
    return image ? [{
      id: String(row.id),
      image,
      alt: text(row.factory_alt_text, '产业资源对接平台横幅'),
    }] : []
  })
}

async function readPageSeo(): Promise<Partial<Record<PageSeoKey, SeoConfig>>> {
  const rows = await readItems<SeoPageRow>('seo_pages', new URLSearchParams({
    fields: 'page_key,translations.title,translations.keywords,translations.description',
    'deep[translations][_filter][languages_code][_eq]': 'zh-CN',
    limit: '-1',
  }))
  const keys = new Set<PageSeoKey>(['home', 'companies', 'demands', 'news', 'contact', 'search'])
  const result: Partial<Record<PageSeoKey, SeoConfig>> = {}
  for (const row of rows) {
    if (!keys.has(row.page_key as PageSeoKey)) continue
    const translation = row.translations?.[0]
    if (!translation?.title) continue
    result[row.page_key as PageSeoKey] = {
      title: translation.title,
      description: translation.description || '',
      keywords: translation.keywords || '',
    }
  }
  return result
}

async function readSiteConfig(): Promise<SiteConfig> {
  const row = await readSingleton<SiteRow>('site_settings', new URLSearchParams({
    fields: [
      'site_title', 'logo', 'footer_logo', 'favicon', 'site_name_display_enabled',
      'theme_primary', 'theme_primary_dark', 'theme_secondary', 'theme_accent', 'theme_bg_page', 'theme_bg_card',
      'theme_text_body', 'theme_border', 'theme_bg_muted', 'factory_theme_bg_page',
      'factory_theme_bg_panel', 'factory_theme_bg_accent', 'font_family',
      'header_background_color', 'header_background_opacity', 'header_text_color',
      'header_hover_text_color', 'quote_button_enabled', 'header_navigation_links',
      'footer_background_color', 'footer_text_color', 'footer_link_color', 'email', 'phone',
      'quick_links', 'factory_contact_qr', 'factory_contact_banner',
      'translations.site_name', 'translations.company_address', 'translations.quote_button_text',
      'translations.default_meta_title', 'translations.default_meta_keywords',
      'translations.default_meta_description', 'translations.factory_footer_description',
      'translations.factory_contact_eyebrow', 'translations.factory_contact_title',
      'translations.factory_contact_description', 'translations.factory_contact_form_title',
      'translations.factory_contact_form_description', 'translations.factory_home_features_title',
      'translations.factory_home_features', 'translations.factory_home_demands_title',
      'translations.factory_home_demands_description', 'translations.factory_home_demands_link_text',
      'translations.factory_home_news_title', 'translations.factory_home_news_link_text',
      'translations.factory_companies_title', 'translations.factory_companies_description',
      'translations.factory_companies_all_label', 'translations.factory_demands_title',
      'translations.factory_demands_description', 'translations.factory_news_title',
      'translations.factory_news_description', 'translations.factory_search_eyebrow',
      'translations.factory_search_title', 'translations.factory_search_description',
      'translations.factory_search_companies_title', 'translations.factory_search_demands_title',
      'translations.factory_search_companies_empty', 'translations.factory_search_demands_empty',
      'translations.factory_company_match_title', 'translations.factory_company_match_description',
    ].join(','),
    'deep[translations][_filter][languages_code][_eq]': 'zh-CN',
    limit: '1',
  }))
  if (!row) return DEFAULT_SITE_CONFIG

  const defaults = DEFAULT_SITE_CONFIG
  const translation = row.translations?.[0] || {}
  const logo = directusAsset(fileId(row.logo)) || defaults.logo
  const features = siteFeatures(translation.factory_home_features)
  return {
    name: text(translation.site_name, text(row.site_title, defaults.name)),
    showName: row.site_name_display_enabled ?? defaults.showName,
    logo,
    footerLogo: directusAsset(fileId(row.footer_logo)) || logo,
    favicon: directusAsset(fileId(row.favicon)),
    navigation: siteLinks(row.header_navigation_links, defaults.navigation),
    quickLinks: siteLinks(row.quick_links, defaults.quickLinks),
    showContactButton: row.quote_button_enabled ?? defaults.showContactButton,
    contactButtonText: text(translation.quote_button_text, defaults.contactButtonText),
    footerDescription: text(translation.factory_footer_description, defaults.footerDescription),
    phone: text(row.phone, defaults.phone),
    email: text(row.email, defaults.email),
    address: text(translation.company_address, defaults.address),
    contactQr: directusAsset(fileId(row.factory_contact_qr)) || defaults.contactQr,
    contactBanner: directusAsset(fileId(row.factory_contact_banner)) || defaults.contactBanner,
    contactEyebrow: text(translation.factory_contact_eyebrow, defaults.contactEyebrow),
    contactTitle: text(translation.factory_contact_title, defaults.contactTitle),
    contactDescription: text(translation.factory_contact_description, defaults.contactDescription),
    contactFormTitle: text(translation.factory_contact_form_title, defaults.contactFormTitle),
    contactFormDescription: text(translation.factory_contact_form_description, defaults.contactFormDescription),
    homeFeaturesTitle: text(translation.factory_home_features_title, defaults.homeFeaturesTitle),
    homeFeatures: features.length > 0 ? features : defaults.homeFeatures,
    copy: {
      home: {
        demandsTitle: text(translation.factory_home_demands_title, defaults.copy.home.demandsTitle),
        demandsDescription: text(translation.factory_home_demands_description, defaults.copy.home.demandsDescription),
        demandsLinkText: text(translation.factory_home_demands_link_text, defaults.copy.home.demandsLinkText),
        newsTitle: text(translation.factory_home_news_title, defaults.copy.home.newsTitle),
        newsLinkText: text(translation.factory_home_news_link_text, defaults.copy.home.newsLinkText),
      },
      companies: {
        title: text(translation.factory_companies_title, defaults.copy.companies.title),
        description: text(translation.factory_companies_description, defaults.copy.companies.description),
        allLabel: text(translation.factory_companies_all_label, defaults.copy.companies.allLabel),
      },
      demands: {
        title: text(translation.factory_demands_title, defaults.copy.demands.title),
        description: text(translation.factory_demands_description, defaults.copy.demands.description),
      },
      news: {
        title: text(translation.factory_news_title, defaults.copy.news.title),
        description: text(translation.factory_news_description, defaults.copy.news.description),
      },
      search: {
        eyebrow: text(translation.factory_search_eyebrow, defaults.copy.search.eyebrow),
        title: text(translation.factory_search_title, defaults.copy.search.title),
        description: text(translation.factory_search_description, defaults.copy.search.description),
        companiesTitle: text(translation.factory_search_companies_title, defaults.copy.search.companiesTitle),
        demandsTitle: text(translation.factory_search_demands_title, defaults.copy.search.demandsTitle),
        companiesEmpty: text(translation.factory_search_companies_empty, defaults.copy.search.companiesEmpty),
        demandsEmpty: text(translation.factory_search_demands_empty, defaults.copy.search.demandsEmpty),
      },
      companyDetail: {
        matchTitle: text(translation.factory_company_match_title, defaults.copy.companyDetail.matchTitle),
        matchDescription: text(translation.factory_company_match_description, defaults.copy.companyDetail.matchDescription),
      },
    },
    theme: {
      primary: text(row.theme_primary, defaults.theme.primary),
      primaryDark: text(row.theme_primary_dark, defaults.theme.primaryDark),
      secondary: text(row.theme_secondary, defaults.theme.secondary),
      accent: text(row.theme_accent, defaults.theme.accent),
      pageBackground: text(row.theme_bg_page, defaults.theme.pageBackground),
      cardBackground: text(row.theme_bg_card, defaults.theme.cardBackground),
      bodyText: text(row.theme_text_body, defaults.theme.bodyText),
      border: text(row.theme_border, defaults.theme.border),
      mutedBackground: text(row.theme_bg_muted, defaults.theme.mutedBackground),
      innerPageBackground: text(row.factory_theme_bg_page, defaults.theme.innerPageBackground),
      innerPanelBackground: text(row.factory_theme_bg_panel, defaults.theme.innerPanelBackground),
      innerAccentBackground: text(row.factory_theme_bg_accent, defaults.theme.innerAccentBackground),
      headerBackground: text(row.header_background_color, defaults.theme.headerBackground),
      headerOpacity: Math.min(100, Math.max(0, row.header_background_opacity ?? defaults.theme.headerOpacity)),
      headerText: text(row.header_text_color, defaults.theme.headerText),
      headerHoverText: text(row.header_hover_text_color, defaults.theme.headerHoverText),
      footerBackground: text(row.footer_background_color, defaults.theme.footerBackground),
      footerText: text(row.footer_text_color, defaults.theme.footerText),
      footerLink: text(row.footer_link_color, defaults.theme.footerLink),
      fontFamily: text(row.font_family, defaults.theme.fontFamily),
    },
    seo: {
      title: text(translation.default_meta_title, defaults.seo.title),
      description: text(translation.default_meta_description, defaults.seo.description),
      keywords: text(translation.default_meta_keywords, defaults.seo.keywords),
    },
  }
}

function fixtureData(): CmsData {
  return developmentFixtures
}

export const getCmsData = cache(async (): Promise<CmsData> => {
  if (!process.env.DIRECTUS_URL && process.env.NODE_ENV !== 'production') return fixtureData()

  try {
    const [site, pageSeo, categories, companies, demands, news, banners] = await Promise.all([
      readSiteConfig(),
      readPageSeo(),
      readCategories(),
      readCompanies(),
      readDemands(),
      readNews(),
      readBanners(),
    ])
    return { site, pageSeo, categories, companies, demands, news, banners }
  } catch (error) {
    if (process.env.NODE_ENV === 'production') throw error
    console.warn('[cms] Directus unavailable; using development fixtures:', error)
    return fixtureData()
  }
})
