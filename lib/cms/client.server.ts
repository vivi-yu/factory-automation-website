import 'server-only'

const revalidate = Math.max(0, Number(process.env.CMS_REVALIDATE_SECONDS || 60))

export const DIRECTUS_IMAGE_PRESETS = {
  banner: 'factory-banner',
  bannerMobile: 'factory-banner-mobile',
  thumbnail: 'factory-thumbnail',
  content: 'factory-content',
} as const

type DirectusImagePreset = typeof DIRECTUS_IMAGE_PRESETS[keyof typeof DIRECTUS_IMAGE_PRESETS]

export function directusAsset(id?: string | null, preset?: DirectusImagePreset) {
  const baseUrl = (process.env.DIRECTUS_PUBLIC_URL || process.env.DIRECTUS_URL)?.replace(/\/$/, '')
  if (!baseUrl || !id) return ''
  const assetUrl = `${baseUrl}/assets/${encodeURIComponent(id)}`
  return preset ? `${assetUrl}?key=${encodeURIComponent(preset)}` : assetUrl
}

export async function readItems<T>(collection: string, params: URLSearchParams): Promise<T[]> {
  const baseUrl = process.env.DIRECTUS_URL?.replace(/\/$/, '')
  if (!baseUrl) throw new Error('DIRECTUS_URL is not configured')

  const response = await fetch(`${baseUrl}/items/${collection}?${params}`, {
    headers: { Accept: 'application/json' },
    next: { revalidate, tags: ['cms', `cms:${collection}`] },
    signal: AbortSignal.timeout(10_000),
  })

  if (!response.ok) {
    throw new Error(`Directus ${collection} read failed with ${response.status}`)
  }

  const body = (await response.json()) as { data?: T[] }
  return Array.isArray(body.data) ? body.data : []
}

export async function readSingleton<T>(collection: string, params: URLSearchParams): Promise<T | null> {
  const baseUrl = process.env.DIRECTUS_URL?.replace(/\/$/, '')
  if (!baseUrl) throw new Error('DIRECTUS_URL is not configured')

  const response = await fetch(`${baseUrl}/items/${collection}?${params}`, {
    headers: { Accept: 'application/json' },
    next: { revalidate, tags: ['cms', `cms:${collection}`] },
    signal: AbortSignal.timeout(10_000),
  })

  if (!response.ok) {
    throw new Error(`Directus ${collection} read failed with ${response.status}`)
  }

  const body = (await response.json()) as { data?: T }
  return body.data && typeof body.data === 'object' ? body.data : null
}
