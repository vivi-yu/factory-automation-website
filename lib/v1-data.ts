export type V1Category = {
  id: string
  name: string
  description: string
  image: string
  sort: number
  status: 'visible' | 'hidden'
}

export type V1Company = {
  id: string
  logo: string
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

export type V1Demand = {
  id: string
  companyId: string
  title: string
  type: string
  content: string
  publishedAt: string
  sort: number
  status: 'active' | 'offline'
}

export type V1Message = {
  id: string
  name: string
  phone: string
  company: string
  content: string
  source: string
  submittedAt: string
  status: 'pending' | 'contacted'
}

export const v1Categories: V1Category[] = [
  { id: 'brand-owner', name: '终端企业', description: '终端应用企业与制造业项目方，持续释放自动化升级、采购和合作需求。', image: '/categories-manufacturing.png', sort: 100, status: 'visible' },
  { id: 'automation', name: '自动化企业', description: '系统集成、机器人、控制、视觉检测和数字化工厂服务商。', image: '/categories-automation.png', sort: 200, status: 'visible' },
  { id: 'supplier', name: '供应商', description: '核心部件、耗材、标准件、传动件和工业品供应资源。', image: '/categories-suppliers.png', sort: 300, status: 'visible' },
  { id: 'talent', name: '人力资源', description: '工程师、技师、调试团队、运维人员和项目交付人才资源。', image: '/categories-hr.png', sort: 400, status: 'visible' },
  { id: 'support', name: '配套服务', description: '物流、检测、认证、法务、财税、场地和项目协同服务。', image: '/categories-support.png', sort: 500, status: 'visible' },
  { id: 'industrial-software', name: '工业软件', description: 'MES、SCADA、数据采集、能耗管理和工业 AI 软件服务。', image: '/features-banner-new.png', sort: 600, status: 'hidden' },
]

export const v1Companies: V1Company[] = [
  { id: 'bmw', logo: 'BM', name: '宝马智能制造基地', categoryId: 'brand-owner', sort: 100, featured: true, intro: '面向整车装配、检测和物流环节持续寻找自动化协作伙伴，重点关注柔性装配、视觉检测、AGV 物流、MES 数据采集与工艺改善。', businessTags: ['整车制造', '产线升级', '质量检测'], serviceScope: ['汽车总装', '焊装车间', '视觉防错', '智能物流'], images: ['/categories-manufacturing.png', '/hero-automation.png', '/companies-network.png'], province: '辽宁', city: '沈阳', status: 'visible', updatedAt: '2026-07-01' },
  { id: 'byd', logo: 'BY', name: '比亚迪动力工厂', categoryId: 'brand-owner', sort: 200, featured: true, intro: '围绕新能源电池与整车制造建设自动化供应链资源库，优先对接具备稳定交付能力的设备、工装和测试方案企业。', businessTags: ['新能源', '电池制造', '自动装配'], serviceScope: ['电池 PACK', '自动测试', '工装夹具', '机器人上下料'], images: ['/features-automation.png', '/categories-manufacturing.png', '/requirements-tech.png'], province: '广东', city: '深圳', status: 'visible', updatedAt: '2026-06-28' },
  { id: 'saic', logo: 'SA', name: '上汽智能工厂', categoryId: 'brand-owner', sort: 300, featured: true, intro: '关注汽车零部件柔性制造、仓储配送和质量追溯，希望平台协助筛选成熟供应商与项目合作资源。', businessTags: ['汽车零部件', '仓储配送', '质量追溯'], serviceScope: ['柔性制造', '仓储自动化', '追溯系统', '工位改造'], images: ['/categories-manufacturing.png', '/requirements-banner.png'], province: '上海', city: '嘉定', status: 'visible', updatedAt: '2026-06-24' },
  { id: 'catl', logo: '宁', name: '宁德时代装备需求库', categoryId: 'brand-owner', sort: 400, featured: true, intro: '聚焦电池制造装备、检测设备和产线节拍提升，适合具备新能源案例的自动化资源对接。', businessTags: ['电池装备', '检测设备', '节拍提升'], serviceScope: ['电芯产线', 'PACK 装配', '设备联网', '安全检测'], images: ['/categories-manufacturing.png', '/features-automation.png'], province: '福建', city: '宁德', status: 'visible', updatedAt: '2026-06-21' },
  { id: 'bosch-terminal', logo: 'BO', name: '博世汽车零部件工厂', categoryId: 'brand-owner', sort: 500, featured: true, intro: '围绕汽车零部件装配、测试和追溯建设自动化资源库，持续寻找成熟设备和技术服务伙伴。', businessTags: ['汽车零部件', '装配测试', '追溯系统'], serviceScope: ['装配线改造', '测试设备', '质量追溯', '工艺优化'], images: ['/categories-manufacturing.png', '/companies-network.png'], province: '江苏', city: '无锡', status: 'visible', updatedAt: '2026-06-20' },
  { id: 'abb', logo: 'AB', name: 'ABB 工业自动化', categoryId: 'automation', sort: 100, featured: true, intro: '提供机器人工作站、运动控制和数字化工厂自动化方案，服务汽车、电子、金属加工和物流等场景。', businessTags: ['机器人', '运动控制', '系统集成'], serviceScope: ['机器人工作站', '运动控制', '产线集成', '数字化改造'], images: ['/categories-automation.png', '/features-banner-new.png', '/hero-banner-new.png'], website: 'https://example.com', province: '上海', city: '浦东', status: 'visible', updatedAt: '2026-07-02' },
  { id: 'siemens', logo: 'SI', name: '西门子数字工业服务', categoryId: 'automation', sort: 200, featured: true, intro: '面向工厂自动化、数字化制造和工业软件提供解决方案，可对接控制系统、MES、能源管理和数据采集项目。', businessTags: ['PLC', 'MES', '数字孪生'], serviceScope: ['PLC 控制', '工业软件', 'MES', '数据采集'], images: ['/hero-automation.png', '/categories-automation.png', '/companies-network.png'], province: '北京', city: '朝阳', status: 'visible', updatedAt: '2026-06-30' },
  { id: 'visionlab', logo: 'VL', name: '维森视觉检测科技', categoryId: 'automation', sort: 300, featured: true, intro: '专注机器视觉检测、缺陷识别和尺寸测量，支持非标设备企业与终端工厂快速导入视觉方案。', businessTags: ['机器视觉', '缺陷检测', '尺寸测量'], serviceScope: ['视觉检测', '光源选型', '算法调试', '设备集成'], images: ['/requirements-tech.png', '/features-automation.png'], province: '江苏', city: '苏州', status: 'visible', updatedAt: '2026-06-22' },
  { id: 'robotix', logo: 'RX', name: '锐控机器人集成', categoryId: 'automation', sort: 400, featured: true, intro: '提供搬运、码垛、焊接和上下料机器人工作站方案，支持方案设计、安装调试和售后服务。', businessTags: ['机器人集成', '焊接工作站', '上下料'], serviceScope: ['方案设计', '安装调试', '工艺优化', '售后维护'], images: ['/categories-automation.png', '/hero-automation.png'], province: '广东', city: '东莞', status: 'visible', updatedAt: '2026-06-19' },
  { id: 'motion-control', logo: 'MC', name: '迈控运动控制科技', categoryId: 'automation', sort: 500, featured: true, intro: '面向自动化设备企业提供运动控制、伺服调试和整线控制系统开发服务。', businessTags: ['运动控制', '伺服调试', '控制系统'], serviceScope: ['运动控制', '伺服选型', '电气调试', '系统开发'], images: ['/features-banner-new.png', '/categories-automation.png'], province: '浙江', city: '宁波', status: 'visible', updatedAt: '2026-06-18' },
  { id: 'bearing-supply', logo: '轴', name: '华东精密轴承供应链', categoryId: 'supplier', sort: 100, featured: true, intro: '为自动化设备企业提供标准件、传动件和备品备件供应，可支持选型、替代、批量供货和紧急备件响应。', businessTags: ['轴承', '导轨', '传动件'], serviceScope: ['轴承选型', '传动件供应', '备品备件', '快速交付'], images: ['/categories-suppliers.png', '/requirements-banner.png', '/requirements-tech.png'], province: '江苏', city: '苏州', status: 'visible', updatedAt: '2026-07-03' },
  { id: 'cable-supply', logo: '缆', name: '工业线缆连接件中心', categoryId: 'supplier', sort: 200, featured: true, intro: '供应工业线缆、连接器、拖链与传感器配套产品，适用于机器人、输送线、机床和检测设备场景。', businessTags: ['线缆', '接插件', '拖链系统'], serviceScope: ['工业线缆', '接插件', '拖链', '传感器配套'], images: ['/categories-suppliers.png', '/features-automation.png', '/companies-network.png'], province: '浙江', city: '杭州', status: 'visible', updatedAt: '2026-06-26' },
  { id: 'sensor-supply', logo: 'SE', name: '华南传感器供应中心', categoryId: 'supplier', sort: 300, featured: true, intro: '提供光电、接近、压力、位移等工业传感器选型和批量供应。', businessTags: ['传感器', '选型服务', '批量供应'], serviceScope: ['光电传感器', '压力传感器', '位移检测', '替代选型'], images: ['/categories-suppliers.png', '/requirements-tech.png'], province: '广东', city: '深圳', status: 'visible', updatedAt: '2026-06-25' },
  { id: 'pneumatic-supply', logo: 'PN', name: '气动元件集采平台', categoryId: 'supplier', sort: 400, featured: true, intro: '面向非标设备和自动化产线提供气缸、阀岛、接头、真空元件等供应。', businessTags: ['气动元件', '阀岛', '真空吸附'], serviceScope: ['气缸供应', '阀岛选型', '真空元件', '备件交付'], images: ['/requirements-banner.png', '/categories-suppliers.png'], province: '上海', city: '松江', status: 'visible', updatedAt: '2026-06-24' },
  { id: 'aluminum-profile', logo: 'AL', name: '工业铝型材配套商', categoryId: 'supplier', sort: 500, featured: true, intro: '提供工业铝型材、机架、防护罩和输送线结构件加工服务。', businessTags: ['铝型材', '机架加工', '防护罩'], serviceScope: ['型材供应', '机架加工', '结构设计', '现场安装'], images: ['/categories-suppliers.png', '/companies-network.png'], province: '江苏', city: '昆山', status: 'visible', updatedAt: '2026-06-23' },
  { id: 'plc-engineer', logo: 'PLC', name: 'PLC 工程师交付团队', categoryId: 'talent', sort: 100, featured: true, intro: '提供 PLC 编程、现场调试、设备改造和短期项目支援，覆盖西门子、三菱、欧姆龙等常用控制平台。', businessTags: ['PLC 编程', '现场调试', '项目外包'], serviceScope: ['PLC 编程', 'HMI 组态', '现场调试', '项目驻场'], images: ['/categories-hr.png', '/hero-automation.png', '/features-banner-new.png'], province: '山东', city: '青岛', status: 'visible', updatedAt: '2026-07-01' },
  { id: 'robot-talent', logo: '机', name: '机器人调试人才库', categoryId: 'talent', sort: 200, featured: true, intro: '对接机器人安装、调试、节拍优化和售后运维人才，适配焊接、搬运、码垛、上下料等应用场景。', businessTags: ['机器人调试', '离线编程', '焊接应用'], serviceScope: ['机器人调试', '离线编程', '焊接工艺', '售后运维'], images: ['/categories-hr.png', '/features-automation.png', '/requirements-tech.png'], province: '安徽', city: '合肥', status: 'visible', updatedAt: '2026-06-25' },
  { id: 'vision-engineer', logo: 'VE', name: '视觉工程师协作团队', categoryId: 'talent', sort: 300, featured: true, intro: '提供视觉项目驻场、算法调试、光源选型和验收支持。', businessTags: ['视觉工程师', '算法调试', '驻场支持'], serviceScope: ['视觉调试', '光源选型', '算法优化', '项目验收'], images: ['/categories-hr.png', '/requirements-tech.png'], province: '江苏', city: '苏州', status: 'visible', updatedAt: '2026-06-24' },
  { id: 'electrical-team', logo: 'ET', name: '电气调试外包团队', categoryId: 'talent', sort: 400, featured: true, intro: '服务非标设备企业，提供电气安装、接线、调试和项目交付人员。', businessTags: ['电气调试', '现场接线', '项目交付'], serviceScope: ['电气安装', '现场接线', '调试支援', '交付驻场'], images: ['/categories-hr.png', '/hero-automation.png'], province: '浙江', city: '嘉兴', status: 'visible', updatedAt: '2026-06-23' },
  { id: 'maintenance-team', logo: 'MT', name: '自动化运维服务团队', categoryId: 'talent', sort: 500, featured: true, intro: '面向工厂产线提供设备巡检、故障排查、备件更换和长期运维服务。', businessTags: ['设备运维', '故障排查', '巡检服务'], serviceScope: ['设备巡检', '故障处理', '备件更换', '长期运维'], images: ['/categories-hr.png', '/companies-network.png'], province: '上海', city: '浦东', status: 'visible', updatedAt: '2026-06-22' },
  { id: 'industrial-logistics', logo: '物', name: '工业物流协同服务', categoryId: 'support', sort: 100, featured: true, intro: '提供自动化设备运输、仓储、吊装与工厂搬迁配套服务，支持项目现场勘察、运输方案与安装协同。', businessTags: ['物流', '仓储', '设备搬迁'], serviceScope: ['设备运输', '仓储配送', '吊装搬迁', '项目协同'], images: ['/categories-support.png', '/contact-banner.png', '/companies-network.png'], province: '上海', city: '嘉定', status: 'visible', updatedAt: '2026-07-02' },
  { id: 'inspection-service', logo: '检', name: '工业检测与认证服务', categoryId: 'support', sort: 200, featured: true, intro: '为设备出厂、项目验收和安全合规提供检测认证服务，帮助企业降低交付风险。', businessTags: ['检测', '认证', '安全评估'], serviceScope: ['设备检测', '项目验收', '安全评估', '合规咨询'], images: ['/categories-support.png', '/requirements-banner.png'], province: '天津', city: '滨海', status: 'visible', updatedAt: '2026-06-29' },
  { id: 'factory-cleaning', logo: 'FC', name: '工厂保洁与设施服务', categoryId: 'support', sort: 300, featured: true, intro: '提供工厂保洁、设备清洁、设施巡检和生产辅助服务。', businessTags: ['工厂保洁', '设施服务', '辅助外包'], serviceScope: ['车间保洁', '设备清洁', '设施巡检', '辅助用工'], images: ['/categories-support.png', '/contact-banner.png'], province: '江苏', city: '苏州', status: 'visible', updatedAt: '2026-06-28' },
  { id: 'industrial-finance', logo: 'IF', name: '设备租赁与融资服务', categoryId: 'support', sort: 400, featured: true, intro: '围绕自动化设备采购提供租赁、分期、保险和资金方案咨询。', businessTags: ['设备租赁', '融资服务', '保险咨询'], serviceScope: ['设备租赁', '分期方案', '保险咨询', '资金服务'], images: ['/categories-support.png', '/companies-network.png'], province: '上海', city: '黄浦', status: 'visible', updatedAt: '2026-06-27' },
  { id: 'project-consulting', logo: 'PC', name: '自动化项目咨询服务', categoryId: 'support', sort: 500, featured: true, intro: '协助企业做自动化改造方案评估、供应商筛选和项目过程管理。', businessTags: ['项目咨询', '方案评估', '供应商筛选'], serviceScope: ['需求梳理', '方案评估', '供应商筛选', '项目管理'], images: ['/categories-support.png', '/features-banner-new.png'], province: '北京', city: '海淀', status: 'visible', updatedAt: '2026-06-26' },
  { id: 'mescloud', logo: 'ME', name: '云工厂 MES 服务商', categoryId: 'industrial-software', sort: 100, featured: true, intro: '提供轻量化 MES、设备联网、生产看板和追溯系统，适合中小制造企业低成本启动数字化改造。', businessTags: ['MES', '设备联网', '生产看板'], serviceScope: ['工单管理', '设备数据采集', '质量追溯', '生产看板'], images: ['/features-banner-new.png', '/companies-network.png', '/hero-automation.png'], province: '浙江', city: '宁波', status: 'hidden', updatedAt: '2026-06-27' },
]

export const v1DemandTypes = ['招聘', '采购', '项目合作', '寻找供应商', '其它']

export const v1Demands: V1Demand[] = [
  { id: 'demand-assembly-line', companyId: 'bmw', title: '寻找总装线柔性拧紧与视觉检测方案', type: '项目合作', content: '计划升级总装线关键工位，需要对接具备汽车行业案例的自动化集成商，覆盖拧紧数据采集、视觉防错和节拍优化。', publishedAt: '2026-07-03', sort: 100, status: 'active' },
  { id: 'demand-battery-pack', companyId: 'byd', title: '采购电池 PACK 自动测试与输送设备', type: '采购', content: '需要匹配电池 PACK 自动测试、扫码追溯、输送缓存及上下料设备供应商，要求支持现场调试和售后服务。', publishedAt: '2026-07-02', sort: 200, status: 'active' },
  { id: 'demand-plc-team', companyId: 'siemens', title: '招募 PLC 与 MES 项目实施合作团队', type: '招聘', content: '寻找熟悉 PLC、工业网络与 MES 对接的项目团队，参与多地工厂数字化改造交付。', publishedAt: '2026-07-01', sort: 300, status: 'active' },
  { id: 'demand-spares', companyId: 'bearing-supply', title: '征集自动化设备备件长期采购需求', type: '寻找供应商', content: '面向设备商和工厂建立备件清单，提供轴承、导轨、传动件、气动元件等常用物料稳定供应。', publishedAt: '2026-06-30', sort: 400, status: 'active' },
  { id: 'demand-robot-welding', companyId: 'robotix', title: '寻找机器人焊接工作站合作项目', type: '项目合作', content: '希望对接有焊接自动化改造计划的终端工厂，提供机器人工作站方案与现场调试服务。', publishedAt: '2026-06-29', sort: 500, status: 'active' },
  { id: 'demand-sensor-bulk', companyId: 'sensor-supply', title: '承接传感器替代选型与批量供应', type: '采购', content: '可为设备企业提供常用传感器替代选型、样品测试和批量交付服务。', publishedAt: '2026-06-28', sort: 600, status: 'active' },
  { id: 'demand-vision-support', companyId: 'vision-engineer', title: '视觉检测项目驻场调试人员招募', type: '招聘', content: '寻找有工业视觉项目经验的工程师，支持光源调试、算法参数优化和现场验收。', publishedAt: '2026-06-27', sort: 700, status: 'active' },
  { id: 'demand-logistics-install', companyId: 'industrial-logistics', title: '自动化设备搬迁与吊装协同服务', type: '项目合作', content: '为设备商和终端工厂提供设备运输、吊装、进场协调和安装辅助服务。', publishedAt: '2026-06-26', sort: 800, status: 'active' },
  { id: 'demand-plc-retrofit', companyId: 'plc-engineer', title: '老旧产线 PLC 改造项目合作', type: '项目合作', content: '承接老旧设备控制系统升级、HMI 组态、现场调试和资料整理。', publishedAt: '2026-06-25', sort: 900, status: 'active' },
  { id: 'demand-al-profile', companyId: 'aluminum-profile', title: '非标设备机架与防护罩加工配套', type: '寻找供应商', content: '提供工业铝型材机架、防护罩、围栏和输送线结构件加工交付。', publishedAt: '2026-06-24', sort: 1000, status: 'active' },
  { id: 'demand-maintenance', companyId: 'maintenance-team', title: '工厂自动化设备长期运维需求', type: '其它', content: '为连续生产工厂提供设备巡检、故障排查、备件更换和周期维护服务。', publishedAt: '2026-06-23', sort: 1100, status: 'active' },
  { id: 'demand-consulting', companyId: 'project-consulting', title: '自动化改造前期方案评估服务', type: '项目合作', content: '协助终端企业梳理产线自动化改造需求，筛选供应商并控制项目风险。', publishedAt: '2026-06-22', sort: 1200, status: 'active' },
  { id: 'demand-mes', companyId: 'mescloud', title: '寻找中小工厂设备联网试点项目', type: '项目合作', content: '希望对接有生产看板、设备数据采集、质量追溯需求的工厂，平台客服可协助整理初步需求。', publishedAt: '2026-06-28', sort: 500, status: 'offline' },
]

export const v1Messages: V1Message[] = [
  { id: 'msg-1', name: '张先生', phone: '138****1024', company: '瑞达制造', content: '想了解自动化产线改造供应商资源，希望客服协助对接。', source: '首页', submittedAt: '2026-07-04 10:18', status: 'pending' },
  { id: 'msg-2', name: '李女士', phone: '139****6620', company: '华东设备', content: '希望加入供应商目录，并了解首页推荐展示规则。', source: '企业详情', submittedAt: '2026-07-03 16:40', status: 'contacted' },
  { id: 'msg-3', name: '王工', phone: '136****5318', company: '启新科技', content: '需要临时 PLC 调试人员，想让平台帮忙匹配项目团队。', source: '需求详情', submittedAt: '2026-07-03 09:25', status: 'pending' },
]


export type V1News = {
  id: string
  title: string
  summary: string
  date: string
  image: string
  content: string[]
}

export const v1News: V1News[] = [
  {
    id: 'news-1',
    title: '自动化改造需求持续增长',
    summary: '终端企业对柔性制造、质量追溯和设备联网的需求持续提升，带动产业链资源协同。',
    date: '2026-07-06',
    image: '/features-automation.png',
    content: ['随着制造企业对交付效率和稳定品质的要求提升，自动化改造正在从单点设备升级转向整线协同。', '终端企业更关注成熟案例、交付团队和后续运维能力，平台型资源目录可以帮助企业更快完成初步筛选。'],
  },
  {
    id: 'news-2',
    title: '供应链协同提升交付效率',
    summary: '供应商、技术服务和配套资源的透明展示，有助于降低项目沟通成本。',
    date: '2026-07-04',
    image: '/companies-network.png',
    content: ['自动化项目往往涉及设备、控制、电气、结构件、物流和现场服务等多个环节。', '通过分类展示供应商和配套服务，可以让项目方更快找到适合的合作资源。'],
  },
  {
    id: 'news-3',
    title: '技术服务成为项目落地关键',
    summary: 'PLC、视觉、机器人调试等技术服务正在成为自动化项目交付中的重要支撑。',
    date: '2026-07-02',
    image: '/requirements-tech.png',
    content: ['越来越多企业在项目执行阶段需要灵活的技术服务团队，尤其是现场调试、视觉优化和机器人节拍提升。', '平台把人力资源和技术服务资源纳入统一目录，可以提升项目交付弹性。'],
  },
  {
    id: 'news-4',
    title: '厂务资源平台帮助企业扩大合作半径',
    summary: '通过线上目录展示和客服撮合，企业可以获得更多潜在合作机会。',
    date: '2026-06-30',
    image: '/hero-automation.png',
    content: ['对中小型供应商来说，被更多终端企业和集成商发现，是获取项目机会的重要前提。', '资源平台可以将企业资料、主营业务、服务范围和最新需求集中展示，让合作线索更清晰。'],
  },
]

export function getV1News(id: string) {
  return v1News.find((item) => item.id === id)
}
export const v1Stats = [
  { label: '入驻企业', value: '260+' },
  { label: '公开需求', value: '1,200+' },
  { label: '资源分类', value: String(v1Categories.filter((item) => item.status === 'visible').length) },
]

export function getVisibleCategories() {
  return v1Categories.filter((category) => category.status === 'visible').sort((a, b) => a.sort - b.sort)
}

export function getV1Category(id: string) {
  return v1Categories.find((category) => category.id === id)
}

export function getV1Company(id: string) {
  return v1Companies.find((company) => company.id === id && company.status === 'visible')
}

export function getV1Demand(id: string) {
  return v1Demands.find((demand) => demand.id === id && demand.status === 'active')
}

export function getCompanyCategory(company: V1Company) {
  return getV1Category(company.categoryId)
}

export function getCompanyName(companyId: string) {
  return v1Companies.find((company) => company.id === companyId)?.name || '平台录入企业'
}

export function getV1CompanyDemands(companyId: string) {
  return v1Demands
    .filter((demand) => demand.companyId === companyId && demand.status === 'active')
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.sort - b.sort)
}

export function getRecommendedCompanies(categoryId: string, limit = 5) {
  return v1Companies
    .filter((company) => company.categoryId === categoryId && company.status === 'visible' && company.featured)
    .sort((a, b) => a.sort - b.sort)
    .slice(0, limit)
}

export function getCategoryCompanies(categoryId: string) {
  return v1Companies
    .filter((company) => company.categoryId === categoryId && company.status === 'visible')
    .sort((a, b) => a.sort - b.sort)
}

export function getLatestDemands(limit?: number) {
  const demands = v1Demands
    .filter((demand) => demand.status === 'active')
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.sort - b.sort)

  return typeof limit === 'number' ? demands.slice(0, limit) : demands
}

export function searchV1Resources(query: string) {
  const keyword = query.trim().toLowerCase()

  if (!keyword) {
    return { companies: v1Companies.filter((company) => company.status === 'visible' && getV1Category(company.categoryId)?.status === 'visible'), demands: getLatestDemands() }
  }

  return {
    companies: v1Companies.filter((company) => {
      const category = getCompanyCategory(company)
      return (
        company.status === 'visible' &&
        [company.name, category?.name || '', company.province, company.city, company.intro, ...company.businessTags, ...company.serviceScope].some((value) =>
          value.toLowerCase().includes(keyword),
        )
      )
    }),
    demands: getLatestDemands().filter((demand) =>
      [demand.title, getCompanyName(demand.companyId), demand.type, demand.content].some((value) => value.toLowerCase().includes(keyword)),
    ),
  }
}




