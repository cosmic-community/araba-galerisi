import { createBucketClient } from '@cosmicjs/sdk'
import { getCosmic } from '@/lib/cosmic-preview'
import type { Car, Category, Post, Review, SiteSettings } from '@/types'

export { getMetafieldValue } from '@/lib/utils'

// Write client (mutations only). Page reads go through getCosmic() for draft preview support.
export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

const BASE_PROPS: string[] = ['id', 'slug', 'title', 'type', 'metadata', 'created_at', 'modified_at']
const POST_PROPS: string[] = [...BASE_PROPS, 'content']

function createdAtValue(item: { created_at?: string | null }): number {
  const time = item.created_at ? Date.parse(item.created_at) : NaN
  return Number.isNaN(time) ? 0 : time
}

export async function getCars(): Promise<Car[]> {
  try {
    const { cosmic: client, previewToken } = await getCosmic()
    const query = client.objects.find({ type: 'cars' }).props(BASE_PROPS).depth(1)
    const { objects } = previewToken ? await query.status('any') : await query
    return (objects as Car[]).sort((a, b) => createdAtValue(b) - createdAtValue(a))
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Araçlar yüklenemedi')
  }
}

export async function getCarBySlug(slug: string): Promise<Car | null> {
  try {
    const { cosmic: client, previewToken } = await getCosmic()
    const query = client.objects.findOne({ type: 'cars', slug }).props(BASE_PROPS).depth(1)
    const { object } = previewToken ? await query.status('any') : await query
    return object ? (object as Car) : null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Araç yüklenemedi')
  }
}

function reviewDateValue(review: Review): number {
  const raw = review.metadata?.review_date || review.created_at
  const time = raw ? Date.parse(String(raw)) : NaN
  return Number.isNaN(time) ? 0 : time
}

export async function getReviews(): Promise<Review[]> {
  try {
    const { cosmic: client, previewToken } = await getCosmic()
    const query = client.objects.find({ type: 'reviews' }).props(BASE_PROPS).depth(1)
    const { objects } = previewToken ? await query.status('any') : await query
    return (objects as Review[]).sort((a, b) => reviewDateValue(b) - reviewDateValue(a))
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Yorumlar yüklenemedi')
  }
}

export async function getReviewsByCar(carId: string): Promise<Review[]> {
  try {
    const { cosmic: client, previewToken } = await getCosmic()
    const query = client.objects
      .find({ type: 'reviews', 'metadata.car': carId })
      .props(BASE_PROPS)
      .depth(1)
    const { objects } = previewToken ? await query.status('any') : await query
    return (objects as Review[]).sort((a, b) => reviewDateValue(b) - reviewDateValue(a))
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Araç yorumları yüklenemedi')
  }
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const { cosmic: client, previewToken } = await getCosmic()
    const query = client.objects.find({ type: 'site-settings' }).props(BASE_PROPS).depth(1)
    const { objects } = previewToken ? await query.status('any') : await query
    const list = objects as SiteSettings[]
    return list[0] ?? null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Site ayarları yüklenemedi')
  }
}

export async function getPosts(): Promise<Post[]> {
  try {
    const { cosmic: client, previewToken } = await getCosmic()
    const query = client.objects.find({ type: 'posts' }).props(POST_PROPS).depth(1)
    const { objects } = previewToken ? await query.status('any') : await query
    return (objects as Post[]).sort((a, b) => createdAtValue(b) - createdAtValue(a))
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Yazılar yüklenemedi')
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const { cosmic: client, previewToken } = await getCosmic()
    const query = client.objects.findOne({ type: 'posts', slug }).props(POST_PROPS).depth(1)
    const { object } = previewToken ? await query.status('any') : await query
    return object ? (object as Post) : null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Yazı yüklenemedi')
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const { cosmic: client, previewToken } = await getCosmic()
    const query = client.objects.find({ type: 'categories' }).props(BASE_PROPS).depth(1)
    const { objects } = previewToken ? await query.status('any') : await query
    return objects as Category[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Kategoriler yüklenemedi')
  }
}