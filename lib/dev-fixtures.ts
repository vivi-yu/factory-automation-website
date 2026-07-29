import type { CmsData } from './cms/types'
import { DEFAULT_SITE_CONFIG } from './cms/site-defaults'

export const developmentFixtures: CmsData = {
  site: DEFAULT_SITE_CONFIG,
  pageSeo: {},
  categories: [
    { id: 'brand-owner', name: '终端企业', description: '制造业项目方与终端应用企业。', image: '/categories-manufacturing.png', sort: 1, status: 'visible' },
    { id: 'automation', name: '自动化企业', description: '系统集成、控制、机器人与视觉服务。', image: '/categories-automation.png', sort: 2, status: 'visible' },
    { id: 'supplier', name: '供应商', description: '核心部件、标准件和工业品供应资源。', image: '/categories-suppliers.png', sort: 3, status: 'visible' },
    { id: 'talent', name: '人力资源', description: '工程师、调试与运维人才资源。', image: '/categories-hr.png', sort: 4, status: 'visible' },
    { id: 'support', name: '配套服务', description: '物流、检测、认证和项目协同服务。', image: '/categories-support.png', sort: 5, status: 'visible' },
  ],
  companies: [
    { id: 'demo-integrator', logo: '集', name: '自动化集成服务示例', categoryId: 'automation', sort: 1, featured: true, intro: '本地开发占位数据。配置 Directus 后将显示后台发布的真实企业内容。', introHtml: '<p>本地开发占位数据。配置 Directus 后将显示后台发布的真实企业内容。</p>', businessTags: ['系统集成', '产线改造'], serviceScope: ['方案设计', '安装调试'], images: ['/categories-automation.png'], province: '江苏', city: '苏州', status: 'visible', updatedAt: '2026-07-01' },
    { id: 'demo-supplier', logo: '供', name: '工业品供应服务示例', categoryId: 'supplier', sort: 2, featured: true, intro: '本地开发占位数据。正式环境不会加载此记录。', introHtml: '<p>本地开发占位数据。正式环境不会加载此记录。</p>', businessTags: ['工业品', '备件'], serviceScope: ['选型', '交付'], images: ['/categories-suppliers.png'], province: '上海', city: '上海', status: 'visible', updatedAt: '2026-07-01' },
  ],
  demands: [
    { id: 'demo-demand', companyId: 'demo-integrator', title: '自动化项目合作需求示例', type: '项目合作', content: '这是本地开发占位内容。配置 Directus 后将显示后台发布的真实需求。', contentHtml: '<p>这是本地开发占位内容。配置 Directus 后将显示后台发布的真实需求。</p>', publishedAt: '2026-07-01', sort: 1, status: 'active' },
  ],
  news: [
    { id: 'demo-news', title: '产业资讯内容示例', summary: '配置 Directus 后，后台发布的中文文章会显示在这里。', date: '2026-07-01', image: '/features-automation.png', thumbnailImage: '/features-automation.png', contentHtml: '<p>这是仅用于本地开发的占位文章。</p>' },
  ],
  banners: [
    { id: 'demo-banner-1', image: '/hero-banner-1.png', mobileImage: '/hero-banner-1.png', alt: '产业资源对接平台横幅' },
    { id: 'demo-banner-2', image: '/hero-banner-2.png', mobileImage: '/hero-banner-2.png', alt: '工厂自动化资源平台横幅' },
  ],
}
