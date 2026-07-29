import 'server-only'

import sanitizeHtml from 'sanitize-html'

const ALLOWED_TAGS = [
  ...sanitizeHtml.defaults.allowedTags,
  'img',
  'figure',
  'figcaption',
  'video',
  'source',
  'iframe',
]

export function sanitizeRichTextHtml(value?: string) {
  if (!value) return ''
  return sanitizeHtml(value, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: {
      a: ['href', 'name', 'target', 'rel'],
      img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
      video: ['src', 'controls', 'poster', 'width', 'height'],
      source: ['src', 'type'],
      iframe: ['src', 'title', 'allow', 'allowfullscreen', 'loading', 'width', 'height'],
      th: ['colspan', 'rowspan', 'style'],
      td: ['colspan', 'rowspan', 'style'],
      p: ['style'],
      h2: ['style'],
      h3: ['style'],
    },
    allowedStyles: {
      '*': {
        'text-align': [/^(left|center|right)$/],
      },
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    allowedSchemesByTag: { img: ['http', 'https', 'data'] },
    allowedIframeHostnames: ['www.youtube.com', 'youtube.com', 'player.vimeo.com'],
  })
}

export function plainTextFromRichText(value?: string) {
  if (!value) return ''
  return sanitizeHtml(value, {
    allowedTags: [],
    allowedAttributes: {},
    textFilter: (text) => `${text} `,
  }).replace(/\s+/g, ' ').trim()
}
