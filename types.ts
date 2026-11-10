export interface CosmicFile {
  url: string
  imgix_url: string
}

interface CosmicObjectBase {
  id: string
  slug: string
  title: string
  content?: string
  created_at: string
  modified_at: string
}

export interface Car extends CosmicObjectBase {
  type: 'cars'
  metadata: {
    brand?: unknown
    model?: unknown
    year?: number | string
    price?: number | string
    fuel_type?: unknown
    transmission?: unknown
    engine?: unknown
    horsepower?: number | string
    mileage?: number | string
    body_type?: unknown
    description?: string
    featured_image?: CosmicFile
    gallery?: CosmicFile[]
    stock_status?: unknown
    featured?: boolean | string
  }
}

export interface Review extends CosmicObjectBase {
  type: 'reviews'
  metadata: {
    reviewer_name?: string
    rating?: number | string
    comment?: string
    car?: Car
    review_date?: string
  }
}

export interface SiteSettings extends CosmicObjectBase {
  type: 'site-settings'
  metadata: {
    hero_title?: string
    hero_subtitle?: string
    hero_image?: CosmicFile
    about_content?: string
    phone?: string
    email?: string
    address?: string
    working_hours?: string
  }
}

export interface Category extends CosmicObjectBase {
  type: 'categories'
  metadata: {
    name?: string
    description?: string
  }
}

export interface Post extends CosmicObjectBase {
  type: 'posts'
  metadata: {
    content?: string
    featured_image?: CosmicFile
    category?: Category
  }
}

export type StockTone = 'available' | 'reserved' | 'sold'