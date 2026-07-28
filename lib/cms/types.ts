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
  businessTags: string[]
  serviceScope: string[]
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
  content: string[]
}

export type Banner = {
  id: string
  image: string
  alt: string
}

export type CmsData = {
  categories: Category[]
  companies: Company[]
  demands: Demand[]
  news: News[]
  banners: Banner[]
}
