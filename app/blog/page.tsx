import type { Metadata } from 'next'
import PostCard from '@/components/PostCard'
import CategoryFilter from '@/components/CategoryFilter'
import { getCategories, getPosts } from '@/lib/cosmic'

export const metadata: Metadata = {
  title: 'Blog | Araba Galerisi',
  description: 'Otomobil dünyasından haberler, incelemeler ve ipuçları.',
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const raw = await searchParams
  const kategoriParam = raw.kategori
  const activeSlug = Array.isArray(kategoriParam) ? (kategoriParam[0] ?? '') : (kategoriParam ?? '')

  const [posts, categories] = await Promise.all([getPosts(), getCategories()])

  const visible = activeSlug
    ? posts.filter((post) => post.metadata?.category?.slug === activeSlug)
    : posts

  return (
    <div className="container-page py-12">
      <div className="mb-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent-light">
          Haberler
        </p>
        <h1 className="font-display text-4xl font-semibold uppercase tracking-wide text-white md:text-5xl">
          Blog &amp; Haberler
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-400">
          Otomobil dünyasındaki son gelişmeler, incelemeler ve alım rehberleri.
        </p>
      </div>

      <CategoryFilter categories={categories} activeSlug={activeSlug} />

      {visible.length === 0 ? (
        <div className="card mt-8 p-12 text-center">
          <p className="text-lg text-white">Bu kategoride henüz yazı yok.</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}