import type { CosmicFile, StockTone } from '@/types'

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

export function toNumber(field: unknown): number {
  if (typeof field === 'number') return Number.isFinite(field) ? field : 0
  const parsed = parseFloat(getMetafieldValue(field).replace(',', '.'))
  return Number.isNaN(parsed) ? 0 : parsed
}

export function isTrue(field: unknown): boolean {
  if (field === true) return true
  return getMetafieldValue(field).toLowerCase() === 'true'
}

export function formatPrice(value: unknown): string {
  const n = toNumber(value)
  if (n <= 0) return 'Fiyat için arayın'
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    maximumFractionDigits: 0,
  }).format(n)
}

export function formatNumber(value: unknown): string {
  return new Intl.NumberFormat('tr-TR').format(toNumber(value))
}

export function formatMileage(value: unknown): string {
  const raw = getMetafieldValue(value)
  if (raw === '') return ''
  return `${formatNumber(value)} km`
}

export function formatDate(value: string | undefined): string {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function stripHtml(value: string): string {
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/[#*_`>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function excerpt(value: string | undefined, length: number): string {
  if (!value) return ''
  const text = stripHtml(value)
  return text.length > length ? `${text.slice(0, length).trimEnd()}…` : text
}

export function isHtml(value: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test(value)
}

export function imgUrl(file: CosmicFile | undefined, params: string): string {
  if (!file || !file.imgix_url) return ''
  return `${file.imgix_url}?${params}&auto=format,compress`
}

export function stockInfo(value: unknown): { label: string; tone: StockTone } {
  const label = getMetafieldValue(value) || 'Stokta'
  const lower = label.toLocaleLowerCase('tr')
  if (lower.includes('yok') || lower.includes('sat')) return { label, tone: 'sold' }
  if (lower.includes('rezerv')) return { label, tone: 'reserved' }
  return { label, tone: 'available' }
}

export function stockBadgeClass(tone: StockTone): string {
  if (tone === 'sold') return 'bg-zinc-700/80 text-zinc-200'
  if (tone === 'reserved') return 'bg-amber-500/90 text-black'
  return 'bg-emerald-500/90 text-black'
}

export function uniqueSorted(values: string[]): string[] {
  return Array.from(new Set(values.filter((v) => v !== ''))).sort((a, b) => a.localeCompare(b, 'tr'))
}