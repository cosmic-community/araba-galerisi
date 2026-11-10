import Link from 'next/link'
import type { Category } from '@/types'
import { getMetafieldValue } from '@/lib/utils'

interface CategoryFilterProps {
  categories: Category[]
  activeSlug: string
}

export default function CategoryFilter({ categories, activeSlug }: CategoryFilterProps) {
  if (!categories || categories.length === 0) return null

  const base = 'rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition'
  const active = 'border-accent bg-accent text-white'
  const idle = 'border-white/15 text-zinc-300 hover:border-accent hover:text-white'

  return (
    <div className="flex flex-wrap gap-3">
      <Link href="/blog" className={`${base} ${activeSlug === '' ? active : idle}`}>
        Tümü
      </Link>
      {categories.map((category) => {
        const name = getMetafieldValue(category.metadata?.name) || category.title
        return (
          <Link
            key={category.id}
            href={`/blog?kategori=${category.slug}`}
            className={`${base} ${activeSlug === category.slug ? active : idle}`}
          >
            {name}
          </Link>
        )
      })}
    </div>
  )
}