# Factory Automation Website

Next.js 前端，内容由共用 Directus 镜像中的 Factory Automation profile 提供。正式页面使用 `/companies`、`/demands`、`/news`、`/search`、`/contact`；旧 `/v1/*` 地址仅保留重定向。

## 本地开发

```bash
cp .env.example .env.local
pnpm install
pnpm dev
```

未配置 `DIRECTUS_URL` 时，开发模式使用少量明确标注的 fixture。生产模式不会回退，Directus 缺失或读取失败会直接报错。

## Directus 契约

- 公开读取：`factory_categories`、`factory_companies`、`factory_company_images`、`factory_demand_types`、`factory_demands`、`articles`。
- 留言写入：浏览器只调用 `POST /api/messages`；该路由用服务端 `DIRECTUS_WRITE_TOKEN` 创建 `factory_messages`。
- `DIRECTUS_WRITE_TOKEN` 必须属于绑定 `Factory Website Writer` policy 的服务用户。该 policy 只允许创建 `name`、`phone`、`company_name`、`content`、`source_page`，并由 Directus 固定写入 `status=pending`；不能读取留言或写入 `internal_note`。
- `DIRECTUS_URL` 是服务端读取地址；`DIRECTUS_PUBLIC_URL` 是浏览器可访问的资源域名。
- Directus 内容更新后可携带 `Authorization: Bearer <CMS_REVALIDATE_SECRET>` 请求 `POST /api/revalidate`。

业务 schema 由 `hexia-admin/scripts/ensure-factory-automation-schema.mjs` 幂等维护；标准部署设置 `SITE_PROFILE=factory-automation`。
