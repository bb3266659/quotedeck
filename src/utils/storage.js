export const QUOTES_KEY = 'quotedeck.quotes.v1'
export const THEME_KEY = 'quotedeck.theme.v1'
export const APP_NAME = 'QuoteDeck'
export const APP_VERSION = 1

export function uid() {
  if (crypto?.randomUUID) return crypto.randomUUID()
  return 'q_' + Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function parseTags(input) {
  if (Array.isArray(input)) return input.map(t => String(t).trim()).filter(Boolean)
  return String(input || '')
    .split(/[,\n#]/)
    .map(t => t.trim())
    .filter(Boolean)
}

export function normalizeQuote(raw = {}) {
  return {
    id: raw.id || uid(),
    text: String(raw.text || '').trim(),
    author: String(raw.author || '').trim(),
    source: String(raw.source || '').trim(),
    note: String(raw.note || '').trim(),
    tags: parseTags(raw.tags),
    favorite: Boolean(raw.favorite),
    createdAt: raw.createdAt || new Date().toISOString(),
    updatedAt: raw.updatedAt || new Date().toISOString(),
    viewCount: Number(raw.viewCount) || 0
  }
}

export function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch {
    return ''
  }
}