import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const secret = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
  if (!process.env.CMS_REVALIDATE_SECRET || secret !== process.env.CMS_REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  revalidateTag('cms', 'max')
  return NextResponse.json({ revalidated: true })
}
