export type Category = {
  id: string
  name: string
  description: string
  image: string
  sort: number
  status: 'visible' | 'hidden'
}

export type Company = {
  directusId?: number
  id: string
  logo: string
  logoImage?: string
  name: string
  categoryId: string
  sort: number
  featured: boolean
  intro: string
  introHtml: string
  businessTags: string[]
  serviceScope: string[]
  thumbnailImage?: string
  images: string[]
  website?: string
  province: string
  city: string
  status: 'visible' | 'hidden'
  updatedAt: string
}

export type Demand = {
  directusId?: number
  id: string
  companyId: string
  title: string
  type: string
  content: string
  contentHtml: string
  publishedAt: string
  sort: number
  status: 'active' | 'offline'
}

export type News = {
  id: string
  title: string
  summary: string
  date: string
  image: string
  thumbnailImage: string
  contentHtml: string
}

export type Banner = {
  id: string
  image: string
  mobileImage: string
  alt: string
}

export type PageSeoKey = 'home' | 'companies' | 'demands' | 'news' | 'contact' | 'search'

export type SeoConfig = {
  title: string
  description: string
  keywords: string
}

export type SiteLink = {
  label: string
  href: string
}

export type SiteFeature = {
  icon: string
  title: string
  description: string
}

export type SiteTheme = {
  primary: string
  primaryDark: string
  secondary: string
  accent: string
  pageBackground: string
  cardBackground: string
  bodyText: string
  border: string
  mutedBackground: string
  innerPageBackground: string
  innerPanelBackground: string
  innerAccentBackground: string
  headerBackground: string
  headerOpacity: number
  headerText: string
  headerHoverText: string
  footerBackground: string
  footerText: string
  footerLink: string
  fontFamily: string
}

export type SiteConfig = {
  name: string
  showName: boolean
  logo: string
  footerLogo: string
  favicon: string
  navigation: SiteLink[]
  quickLinks: SiteLink[]
  showContactButton: boolean
  contactButtonText: string
  footerDescription: string
  phone: string
  email: string
  address: string
  contactQr: string
  contactBanner: string
  contactEyebrow: string
  contactTitle: string
  contactDescription: string
  contactFormTitle: string
  contactFormDescription: string
  homeFeaturesTitle: string
  homeFeatures: SiteFeature[]
  copy: {
    home: {
      demandsTitle: string
      demandsDescription: string
      demandsLinkText: string
      newsTitle: string
      newsLinkText: string
    }
    companies: { title: string; description: string; allLabel: string }
    demands: { title: string; description: string }
    news: { title: string; description: string }
    search: {
      eyebrow: string
      title: string
      description: string
      companiesTitle: string
      demandsTitle: string
      companiesEmpty: string
      demandsEmpty: string
    }
    companyDetail: { matchTitle: string; matchDescription: string }
  }
  theme: SiteTheme
  seo: SeoConfig
}

export type CmsData = {
  site: SiteConfig
  pageSeo: Partial<Record<PageSeoKey, SeoConfig>>
  categories: Category[]
  companies: Company[]
  demands: Demand[]
  news: News[]
  banners: Banner[]
}
