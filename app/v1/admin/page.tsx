'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Building2, CheckCircle2, Edit2, FileText, MessageSquare, Plus, Search, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  getCompanyName,
  getV1Category,
  getVisibleCategories,
  type V1Category,
  type V1Company,
  type V1Demand,
  type V1Message,
  v1Companies,
  v1DemandTypes,
  v1Demands,
  v1Messages,
} from '@/lib/v1-data'

type AdminTab = 'companies' | 'demands' | 'messages'
type EditState =
  | { type: 'category'; item: V1Category }
  | { type: 'company'; item: V1Company }
  | { type: 'demand'; item: V1Demand }
  | { type: 'message'; item: V1Message }
  | null

const tabs: Array<{ id: AdminTab; label: string; icon: typeof Building2; summary: string }> = [
  { id: 'companies', label: '企业管理', icon: Building2, summary: '维护分类、企业资料、企业详情、图片、推荐和 sort 排序' },
  { id: 'demands', label: '需求管理', icon: FileText, summary: '维护所属企业、标题、类型、内容、发布时间和 sort 排序' },
  { id: 'messages', label: '留言管理', icon: MessageSquare, summary: '维护留言信息、来源页面和联系状态' },
]

function companyVisible(company: V1Company) {
  return company.status === 'visible' && getV1Category(company.categoryId)?.status === 'visible'
}

function splitValue(value: FormDataEntryValue | null) {
  return String(value || '').split(/[,，、\n]/).map((item) => item.trim()).filter(Boolean)
}

export default function V1AdminPage() {
  const [active, setActive] = useState<AdminTab>('companies')
  const [categories, setCategories] = useState<V1Category[]>(getVisibleCategories())
  const [companies, setCompanies] = useState<V1Company[]>(v1Companies.filter(companyVisible))
  const [demands, setDemands] = useState<V1Demand[]>(v1Demands.filter((demand) => demand.status === 'active' && companies.some((company) => company.id === demand.companyId)))
  const [messages, setMessages] = useState<V1Message[]>(v1Messages)
  const [editState, setEditState] = useState<EditState>(null)
  const [query, setQuery] = useState('')

  const activeTab = useMemo(() => tabs.find((tab) => tab.id === active) || tabs[0], [active])
  const categoryMap = useMemo(() => new Map(categories.map((category) => [category.id, category])), [categories])
  const keyword = query.trim().toLowerCase()
  const pendingCount = messages.filter((message) => message.status === 'pending').length

  const sortedCategories = categories.slice().sort((a, b) => a.sort - b.sort)
  const sortedCompanies = companies
    .filter((company) => !keyword || [company.name, company.province, company.city, categoryMap.get(company.categoryId)?.name || '', company.intro, ...company.businessTags].some((value) => value.toLowerCase().includes(keyword)))
    .slice().sort((a, b) => a.sort - b.sort)
  const sortedDemands = demands
    .filter((demand) => !keyword || [demand.title, demand.type, demand.content, getCompanyName(demand.companyId)].some((value) => value.toLowerCase().includes(keyword)))
    .slice().sort((a, b) => a.sort - b.sort)
  const filteredMessages = messages.filter((message) => !keyword || [message.name, message.phone, message.company, message.content, message.source].some((value) => value.toLowerCase().includes(keyword)))

  function addCurrent() {
    if (active === 'companies') {
      const category = sortedCategories[0]
      if (!category) return
      const item: V1Company = {
        id: `company-${Date.now()}`,
        logo: 'PU',
        name: '新增企业',
        categoryId: category.id,
        sort: (sortedCompanies.at(-1)?.sort || 0) + 100,
        featured: true,
        intro: '请填写企业介绍，用于前台企业详情展示。',
        businessTags: ['主营业务'],
        serviceScope: ['服务范围'],
        images: ['/companies-network.png'],
        website: '',
        province: '上海',
        city: '嘉定',
        status: 'visible',
        updatedAt: '2026-07-08',
      }
      setCompanies((current) => [...current, item])
      setEditState({ type: 'company', item })
    }

    if (active === 'demands') {
      const company = sortedCompanies[0]
      if (!company) return
      const item: V1Demand = {
        id: `demand-${Date.now()}`,
        companyId: company.id,
        title: '新增需求',
        type: v1DemandTypes[0],
        content: '请填写需求内容，用于前台需求详情展示。',
        publishedAt: '2026-07-08',
        sort: (sortedDemands.at(-1)?.sort || 0) + 100,
        status: 'active',
      }
      setDemands((current) => [...current, item])
      setEditState({ type: 'demand', item })
    }

    if (active === 'messages') {
      const item: V1Message = {
        id: `message-${Date.now()}`,
        name: '新留言',
        phone: '13800000000',
        company: '公司名称',
        content: '留言内容',
        source: '后台新增',
        submittedAt: '2026-07-08 10:00',
        status: 'pending',
      }
      setMessages((current) => [item, ...current])
      setEditState({ type: 'message', item })
    }
  }

  function saveEdit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!editState) return
    const form = new FormData(event.currentTarget)

    if (editState.type === 'category') {
      const next: V1Category = {
        ...editState.item,
        name: String(form.get('name') || '').trim() || '未命名分类',
        description: String(form.get('description') || '').trim(),
        image: String(form.get('image') || '').trim() || '/companies-network.png',
        sort: Number(form.get('sort')) || 0,
        status: String(form.get('status')) as V1Category['status'],
      }
      setCategories((current) => current.map((item) => (item.id === next.id ? next : item)).filter((item) => item.status === 'visible'))
    }

    if (editState.type === 'company') {
      const next: V1Company = {
        ...editState.item,
        logo: String(form.get('logo') || '').trim() || 'PU',
        name: String(form.get('name') || '').trim() || '未命名企业',
        categoryId: String(form.get('categoryId') || editState.item.categoryId),
        sort: Number(form.get('sort')) || 0,
        featured: form.get('featured') === 'on',
        intro: String(form.get('intro') || '').trim(),
        businessTags: splitValue(form.get('businessTags')),
        serviceScope: splitValue(form.get('serviceScope')),
        images: splitValue(form.get('images')),
        website: String(form.get('website') || '').trim(),
        province: String(form.get('province') || '').trim(),
        city: String(form.get('city') || '').trim(),
        status: String(form.get('status')) as V1Company['status'],
        updatedAt: String(form.get('updatedAt') || '').trim() || '2026-07-08',
      }
      setCompanies((current) => current.map((item) => (item.id === next.id ? next : item)).filter((item) => item.status === 'visible'))
    }

    if (editState.type === 'demand') {
      const next: V1Demand = {
        ...editState.item,
        companyId: String(form.get('companyId') || editState.item.companyId),
        title: String(form.get('title') || '').trim() || '未命名需求',
        type: String(form.get('type') || v1DemandTypes[0]),
        content: String(form.get('content') || '').trim(),
        publishedAt: String(form.get('publishedAt') || '').trim() || '2026-07-08',
        sort: Number(form.get('sort')) || 0,
        status: String(form.get('status')) as V1Demand['status'],
      }
      setDemands((current) => current.map((item) => (item.id === next.id ? next : item)).filter((item) => item.status === 'active'))
    }

    if (editState.type === 'message') {
      const next: V1Message = {
        ...editState.item,
        name: String(form.get('name') || '').trim(),
        phone: String(form.get('phone') || '').trim(),
        company: String(form.get('company') || '').trim(),
        content: String(form.get('content') || '').trim(),
        source: String(form.get('source') || '').trim(),
        submittedAt: String(form.get('submittedAt') || '').trim(),
        status: String(form.get('status')) as V1Message['status'],
      }
      setMessages((current) => current.map((item) => (item.id === next.id ? next : item)))
    }

    setEditState(null)
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/40 bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 md:px-6">
          <div>
            <p className="text-sm font-medium text-primary">V1 后台</p>
            <h1 className="mt-1 text-2xl font-bold">PU 厂务资源平台后台</h1>
          </div>
          <Link href="/v1" className="rounded-lg border border-border/60 px-4 py-2 text-sm font-medium hover:border-primary">返回前台</Link>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:grid-cols-[280px_1fr] md:px-6">
        <aside className="space-y-3">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const selected = active === tab.id
            return (
              <button key={tab.id} type="button" onClick={() => { setActive(tab.id); setQuery('') }} className={`w-full rounded-lg border p-4 text-left transition ${selected ? 'border-primary bg-primary/10 shadow-sm' : 'border-border/50 bg-card hover:border-primary'}`}>
                <div className="flex items-center gap-3">
                  <span className={`flex size-10 items-center justify-center rounded-lg ${selected ? 'bg-gradient-to-br from-primary to-accent text-white' : 'bg-muted text-muted-foreground'}`}><Icon className="size-5" /></span>
                  <div><p className="font-semibold">{tab.label}</p><p className="mt-1 text-xs text-muted-foreground">{tab.summary}</p></div>
                </div>
              </button>
            )
          })}
          <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 text-sm text-orange-800">未处理留言：<strong>{pendingCount}</strong></div>
        </aside>

        <section className="min-w-0 rounded-lg border border-border/40 bg-card p-6 shadow-sm">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div><p className="text-sm font-medium text-primary">{activeTab.label}</p><h2 className="mt-1 text-2xl font-bold">{activeTab.summary}</h2></div>
            <div className="flex gap-2">
              <div className="relative min-w-0 flex-1 lg:w-72"><Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索" className="h-10 w-full rounded-lg border border-border/60 bg-background pl-9 pr-3 text-sm outline-none focus:border-primary" /></div>
              <Button onClick={addCurrent} className="gap-2 bg-gradient-to-r from-primary to-accent text-white hover:opacity-90"><Plus className="size-4" />新增</Button>
            </div>
          </div>

          {active === 'companies' ? (
            <div className="space-y-6">
              <div className="rounded-lg border border-border/40 bg-background p-4">
                <div className="mb-3 flex items-center justify-between"><h3 className="font-bold">分类管理</h3><Button variant="outline" size="sm" className="gap-1 border-border/60 hover:border-primary" onClick={() => setCategories((current) => [...current, { id: `category-${Date.now()}`, name: '新增分类', description: '新增分类说明', image: '/companies-network.png', sort: (sortedCategories.at(-1)?.sort || 0) + 100, status: 'visible' }])}><Plus className="size-4" />新增分类</Button></div>
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {sortedCategories.map((category) => <div key={category.id} className="flex items-center justify-between rounded-lg border border-border/50 bg-card p-3"><div><p className="font-medium">{category.name}</p><p className="text-xs text-muted-foreground">sort {category.sort}</p></div><div className="flex gap-1"><Button variant="ghost" size="sm" onClick={() => setEditState({ type: 'category', item: category })}><Edit2 className="size-4" /></Button><Button variant="ghost" size="sm" className="text-destructive" onClick={() => setCategories((current) => current.filter((item) => item.id !== category.id))}><Trash2 className="size-4" /></Button></div></div>)}
                </div>
              </div>
              <CompanyTable companies={sortedCompanies} categoryMap={categoryMap} onEdit={(item) => setEditState({ type: 'company', item })} onDelete={(id) => setCompanies((current) => current.filter((item) => item.id !== id))} />
            </div>
          ) : null}

          {active === 'demands' ? <DemandTable demands={sortedDemands} onEdit={(item) => setEditState({ type: 'demand', item })} onDelete={(id) => setDemands((current) => current.filter((item) => item.id !== id))} /> : null}
          {active === 'messages' ? <MessageTable messages={filteredMessages} onEdit={(item) => setEditState({ type: 'message', item })} onContact={(id) => setMessages((current) => current.map((item) => (item.id === id ? { ...item, status: 'contacted' } : item)))} onDelete={(id) => setMessages((current) => current.filter((item) => item.id !== id))} /> : null}
        </section>
      </div>

      {editState ? <EditDialog editState={editState} categories={sortedCategories} companies={sortedCompanies} onClose={() => setEditState(null)} onSave={saveEdit} /> : null}
    </main>
  )
}

function CompanyTable({ companies, categoryMap, onEdit, onDelete }: { companies: V1Company[]; categoryMap: Map<string, V1Category>; onEdit: (company: V1Company) => void; onDelete: (id: string) => void }) {
  return <div className="overflow-x-auto rounded-lg border border-border/40"><table className="w-full min-w-[1080px] text-sm"><thead className="bg-muted/50"><tr><th className="px-4 py-3 text-left">企业</th><th className="px-4 py-3 text-left">分类</th><th className="px-4 py-3 text-left">城市</th><th className="px-4 py-3 text-left">主营业务</th><th className="px-4 py-3 text-left">sort</th><th className="px-4 py-3 text-left">推荐</th><th className="px-4 py-3 text-right">操作</th></tr></thead><tbody>{companies.map((company) => <tr key={company.id} className="border-t border-border/40"><td className="px-4 py-3 font-medium">{company.name}</td><td className="px-4 py-3 text-muted-foreground">{categoryMap.get(company.categoryId)?.name}</td><td className="px-4 py-3 text-muted-foreground">{company.province} · {company.city}</td><td className="px-4 py-3 text-muted-foreground">{company.businessTags.join(' / ')}</td><td className="px-4 py-3 text-muted-foreground">{company.sort}</td><td className="px-4 py-3">{company.featured ? '是' : '否'}</td><td className="px-4 py-3 text-right"><RowActions onEdit={() => onEdit(company)} onDelete={() => onDelete(company.id)} /></td></tr>)}</tbody></table></div>
}

function DemandTable({ demands, onEdit, onDelete }: { demands: V1Demand[]; onEdit: (demand: V1Demand) => void; onDelete: (id: string) => void }) {
  return <div className="space-y-6"><div className="flex flex-wrap gap-2">{v1DemandTypes.map((type) => <span key={type} className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">{type}</span>)}</div><div className="overflow-x-auto rounded-lg border border-border/40"><table className="w-full min-w-[920px] text-sm"><thead className="bg-muted/50"><tr><th className="px-4 py-3 text-left">标题</th><th className="px-4 py-3 text-left">所属企业</th><th className="px-4 py-3 text-left">类型</th><th className="px-4 py-3 text-left">发布时间</th><th className="px-4 py-3 text-left">sort</th><th className="px-4 py-3 text-right">操作</th></tr></thead><tbody>{demands.map((demand) => <tr key={demand.id} className="border-t border-border/40"><td className="px-4 py-3 font-medium">{demand.title}</td><td className="px-4 py-3 text-muted-foreground">{getCompanyName(demand.companyId)}</td><td className="px-4 py-3"><span className="rounded bg-primary/10 px-2 py-1 text-xs text-primary">{demand.type}</span></td><td className="px-4 py-3 text-muted-foreground">{demand.publishedAt}</td><td className="px-4 py-3 text-muted-foreground">{demand.sort}</td><td className="px-4 py-3 text-right"><RowActions onEdit={() => onEdit(demand)} onDelete={() => onDelete(demand.id)} /></td></tr>)}</tbody></table></div></div>
}

function MessageTable({ messages, onEdit, onContact, onDelete }: { messages: V1Message[]; onEdit: (message: V1Message) => void; onContact: (id: string) => void; onDelete: (id: string) => void }) {
  return <div className="overflow-x-auto rounded-lg border border-border/40"><table className="w-full min-w-[920px] text-sm"><thead className="bg-muted/50"><tr><th className="px-4 py-3 text-left">姓名</th><th className="px-4 py-3 text-left">手机</th><th className="px-4 py-3 text-left">公司</th><th className="px-4 py-3 text-left">留言内容</th><th className="px-4 py-3 text-left">来源</th><th className="px-4 py-3 text-left">状态</th><th className="px-4 py-3 text-right">操作</th></tr></thead><tbody>{messages.map((message) => <tr key={message.id} className="border-t border-border/40"><td className="px-4 py-3 font-medium">{message.name}</td><td className="px-4 py-3 text-muted-foreground">{message.phone}</td><td className="px-4 py-3 text-muted-foreground">{message.company}</td><td className="px-4 py-3 text-muted-foreground"><p className="line-clamp-1">{message.content}</p></td><td className="px-4 py-3 text-muted-foreground">{message.source}</td><td className="px-4 py-3"><span className={`rounded px-2 py-1 text-xs ${message.status === 'pending' ? 'bg-orange-50 text-orange-700' : 'bg-green-50 text-green-700'}`}>{message.status === 'pending' ? '未联系' : '已联系'}</span></td><td className="px-4 py-3 text-right"><div className="inline-flex gap-1"><Button variant="ghost" size="sm" onClick={() => onEdit(message)}><Edit2 className="size-4" /></Button><Button variant="ghost" size="sm" onClick={() => onContact(message.id)}><CheckCircle2 className="size-4" /></Button><Button variant="ghost" size="sm" className="text-destructive" onClick={() => onDelete(message.id)}><Trash2 className="size-4" /></Button></div></td></tr>)}</tbody></table></div>
}

function RowActions({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return <div className="inline-flex gap-1"><Button variant="ghost" size="sm" onClick={onEdit}><Edit2 className="size-4" /></Button><Button variant="ghost" size="sm" className="text-destructive" onClick={onDelete}><Trash2 className="size-4" /></Button></div>
}

function EditDialog({ editState, categories, companies, onClose, onSave }: { editState: NonNullable<EditState>; categories: V1Category[]; companies: V1Company[]; onClose: () => void; onSave: (event: React.FormEvent<HTMLFormElement>) => void }) {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"><form onSubmit={onSave} className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-card p-6 shadow-xl"><h3 className="text-xl font-bold">编辑{editState.type === 'category' ? '分类' : editState.type === 'company' ? '企业' : editState.type === 'demand' ? '需求' : '留言'}</h3><div className="mt-5 grid gap-4 md:grid-cols-2">{editState.type === 'category' ? <CategoryFields item={editState.item} /> : null}{editState.type === 'company' ? <CompanyFields item={editState.item} categories={categories} /> : null}{editState.type === 'demand' ? <DemandFields item={editState.item} companies={companies} /> : null}{editState.type === 'message' ? <MessageFields item={editState.item} /> : null}</div><div className="mt-6 flex justify-end gap-2"><Button type="button" variant="outline" onClick={onClose}>取消</Button><Button type="submit" className="bg-gradient-to-r from-primary to-accent text-white hover:opacity-90">保存</Button></div></form></div>
}

function Field({ name, label, defaultValue, type = 'text' }: { name: string; label: string; defaultValue: string; type?: string }) {
  return <label className="block"><span className="mb-2 block text-sm font-medium">{label}</span><input name={name} type={type} defaultValue={defaultValue} className="h-10 w-full rounded-lg border border-border bg-background px-3 outline-none focus:border-primary" /></label>
}
function TextField({ name, label, defaultValue }: { name: string; label: string; defaultValue: string }) {
  return <label className="block md:col-span-2"><span className="mb-2 block text-sm font-medium">{label}</span><textarea name={name} defaultValue={defaultValue} rows={4} className="w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary" /></label>
}
function ImageUploadField({ name, label, currentValue, multiple = false }: { name: string; label: string; currentValue: string; multiple?: boolean }) {
  const images = splitValue(currentValue)
  return <label className="block md:col-span-2"><span className="mb-2 block text-sm font-medium">{label}</span><input type="hidden" name={name} value={currentValue} /><input name={`${name}Upload`} type="file" accept="image/*" multiple={multiple} className="w-full rounded-lg border border-dashed border-primary/40 bg-primary/5 px-3 py-3 text-sm outline-none file:mr-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-primary file:to-accent file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:border-primary" />{images.length ? <div className="mt-3 grid grid-cols-3 gap-3">{images.map((image) => <img key={image} src={image} alt="当前图片预览" className="h-20 w-full rounded-lg border border-border/50 object-cover" />)}</div> : null}<p className="mt-2 text-xs text-muted-foreground">选择本地图片上传，当前演示后台会保留现有图片用于前台展示。</p></label>
}
function CategoryFields({ item }: { item: V1Category }) {
  return <><Field name="name" label="分类名称" defaultValue={item.name} /><Field name="sort" label="sort" type="number" defaultValue={String(item.sort)} /><ImageUploadField name="image" label="上传分类图片" currentValue={item.image} /><label className="block"><span className="mb-2 block text-sm font-medium">状态</span><select name="status" defaultValue={item.status} className="h-10 w-full rounded-lg border border-border bg-background px-3"><option value="visible">显示</option><option value="hidden">隐藏</option></select></label><TextField name="description" label="分类说明" defaultValue={item.description} /></>
}
function CompanyFields({ item, categories }: { item: V1Company; categories: V1Category[] }) {
  return <><Field name="logo" label="企业 LOGO 文本" defaultValue={item.logo} /><Field name="name" label="企业名称" defaultValue={item.name} /><label className="block"><span className="mb-2 block text-sm font-medium">所属分类</span><select name="categoryId" defaultValue={item.categoryId} className="h-10 w-full rounded-lg border border-border bg-background px-3">{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></label><Field name="sort" label="sort" type="number" defaultValue={String(item.sort)} /><Field name="province" label="省份" defaultValue={item.province} /><Field name="city" label="城市" defaultValue={item.city} /><Field name="website" label="官网" defaultValue={item.website || ''} /><Field name="updatedAt" label="更新时间" defaultValue={item.updatedAt} /><TextField name="businessTags" label="主营业务 Tag（逗号或换行分隔）" defaultValue={item.businessTags.join('，')} /><TextField name="serviceScope" label="服务范围（逗号或换行分隔）" defaultValue={item.serviceScope.join('，')} /><ImageUploadField name="images" label="上传企业图片（可多选）" currentValue={item.images.join('\n')} multiple /><TextField name="intro" label="企业简介 / 企业详情" defaultValue={item.intro} /><label className="flex items-center gap-2 text-sm"><input name="featured" type="checkbox" defaultChecked={item.featured} /> 首页推荐</label><label className="block"><span className="mb-2 block text-sm font-medium">状态</span><select name="status" defaultValue={item.status} className="h-10 w-full rounded-lg border border-border bg-background px-3"><option value="visible">显示</option><option value="hidden">隐藏</option></select></label></>
}
function DemandFields({ item, companies }: { item: V1Demand; companies: V1Company[] }) {
  return <><label className="block"><span className="mb-2 block text-sm font-medium">所属企业</span><Link href="/v1/admin" className="mb-2 flex items-center justify-between rounded-lg border border-dashed border-primary/30 bg-primary/5 px-3 py-2 text-xs text-primary transition hover:border-primary hover:bg-primary/10"><span>下拉项没有找到企业？</span><span className="font-medium">去企业管理新增</span></Link><select name="companyId" defaultValue={item.companyId} className="h-10 w-full rounded-lg border border-border bg-background px-3">{companies.map((company) => <option key={company.id} value={company.id}>{company.name}</option>)}</select></label><Field name="title" label="需求标题" defaultValue={item.title} /><label className="block"><span className="mb-2 block text-sm font-medium">需求类型</span><select name="type" defaultValue={item.type} className="h-10 w-full rounded-lg border border-border bg-background px-3">{v1DemandTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select></label><Field name="publishedAt" label="发布时间" defaultValue={item.publishedAt} /><Field name="sort" label="sort" type="number" defaultValue={String(item.sort)} /><label className="block"><span className="mb-2 block text-sm font-medium">状态</span><select name="status" defaultValue={item.status} className="h-10 w-full rounded-lg border border-border bg-background px-3"><option value="active">进行中</option><option value="offline">下架</option></select></label><TextField name="content" label="需求内容 / 详情" defaultValue={item.content} /></>
}
function MessageFields({ item }: { item: V1Message }) {
  return <><Field name="name" label="姓名" defaultValue={item.name} /><Field name="phone" label="手机" defaultValue={item.phone} /><Field name="company" label="公司" defaultValue={item.company} /><Field name="source" label="来源页面" defaultValue={item.source} /><Field name="submittedAt" label="提交时间" defaultValue={item.submittedAt} /><label className="block"><span className="mb-2 block text-sm font-medium">状态</span><select name="status" defaultValue={item.status} className="h-10 w-full rounded-lg border border-border bg-background px-3"><option value="pending">未联系</option><option value="contacted">已联系</option></select></label><TextField name="content" label="留言内容" defaultValue={item.content} /></>
}


