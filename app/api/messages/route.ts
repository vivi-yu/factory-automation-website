import { NextResponse } from 'next/server'
import { z } from 'zod'

const messageSchema = z.object({
  name: z.string().trim().min(1).max(80),
  phone: z.string().trim().min(5).max(40),
  companyName: z.string().trim().min(1).max(160),
  content: z.string().trim().min(10).max(3000),
  sourcePage: z.string().trim().max(200).default('/contact'),
  website: z.string().max(0).optional(),
})

export async function POST(request: Request) {
  const baseUrl = process.env.DIRECTUS_URL?.replace(/\/$/, '')
  const token = process.env.DIRECTUS_WRITE_TOKEN
  if (!baseUrl || !token) {
    return NextResponse.json({ error: '留言服务暂未配置，请稍后再试。' }, { status: 503 })
  }

  let input: z.infer<typeof messageSchema>
  try {
    input = messageSchema.parse(await request.json())
  } catch {
    return NextResponse.json({ error: '请检查必填项和内容长度。' }, { status: 400 })
  }

  if (input.website) return NextResponse.json({ ok: true })

  const response = await fetch(`${baseUrl}/items/factory_messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: input.name,
      phone: input.phone,
      company_name: input.companyName,
      content: input.content,
      source_page: input.sourcePage,
    }),
    cache: 'no-store',
    signal: AbortSignal.timeout(10_000),
  }).catch(() => null)

  if (!response?.ok) {
    return NextResponse.json({ error: '留言提交失败，请稍后再试。' }, { status: 502 })
  }
  return NextResponse.json({ ok: true }, { status: 201 })
}
