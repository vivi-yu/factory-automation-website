import type { Category, CmsData, Company, Demand } from './types'

export function getCategory(data: CmsData, id: string) {
  return data.categories.find((item) => item.id === id)
}

export function getCompany(data: CmsData, id: string) {
  return data.companies.find((item) => item.id === id)
}

export function getDemand(data: CmsData, id: string) {
  return data.demands.find((item) => item.id === id)
}

export function getCompanyName(data: CmsData, companyId: string) {
  return getCompany(data, companyId)?.name || '平台录入企业'
}

export function getCompanyDemands(data: CmsData, companyId: string) {
  return data.demands.filter((item) => item.companyId === companyId)
}

export function searchResources(data: CmsData, query: string) {
  const keyword = query.trim().toLowerCase()
  const includes = (values: string[]) => !keyword || values.some((value) => value.toLowerCase().includes(keyword))
  return {
    companies: data.companies.filter((company) => includes([
      company.name,
      getCategory(data, company.categoryId)?.name || '',
      company.province,
      company.city,
      company.intro,
      ...company.businessTags,
      ...company.serviceScope,
    ])),
    demands: data.demands.filter((demand) => includes([
      demand.title,
      getCompanyName(data, demand.companyId),
      demand.type,
      demand.content,
    ])),
  }
}

export function relatedCompanies(data: CmsData, company: Company, limit = 2) {
  return data.companies.filter((item) => item.categoryId === company.categoryId && item.id !== company.id).slice(0, limit)
}

export function categoryCompanies(data: CmsData, category: Category) {
  return data.companies.filter((item) => item.categoryId === category.id).sort((a, b) => a.sort - b.sort)
}

export function latestDemands(demands: Demand[], limit?: number) {
  const sorted = [...demands].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.sort - b.sort)
  return typeof limit === 'number' ? sorted.slice(0, limit) : sorted
}
