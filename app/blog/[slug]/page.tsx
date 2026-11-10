// app/blog/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import RichContent from '@/components/RichContent'
import { getPostBySlug } from '@/lib/cosmic'
import { excerpt, formatDate, getMetafieldValue, imgUrl } from '@/lib/utils'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Yazı Bulunamadı | Araba Galerisi' }
  return {
    title: `${post.title} | Araba Galerisi`,
    description: excerpt(post.metadata?.content ?? post.content, 150),
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const category = post.metadata?.category
  const categoryName = category ? getMetafieldValue(category.metadata?.name) || category.title : ''
  const image = imgUrl(post.metadata?.featured_image, 'w=2000&h=1000&fit=crop')
  const body = post.metadata?.content ?? post.content ?? ''

  return (
    <article className="container-page max-w-4xl py-12">
      <meta
        name="cosmic-context"
        content={JSON.stringify({ object_id: post.id, object_type: post.type })}
      />
      <Link href="/blog" className="text-sm text-zinc-400 hover:text-white">
        ← Tüm Yazılar
      </Link>

      <header className="mb-8 mt-6">
        <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
          {categoryName && category && (
            <Link
              href={`/blog?kategori=${category.slug}`}
              className="rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white"
            >
              {categoryName}
            </Link>
          )}
          <span className="text-zinc-500">{formatDate(post.created_at)}</span>
        </div>
        <h1 className="font-display text-4xl font-semibold uppercase leading-tight tracking-wide text-white md:text-5xl">
          {post.title}
        </h1>
      </header>

      {image && (
        <img
          src={image}
          alt={post.title}
          width={1000}
          height={500}
          className="mb-10 aspect-[2/1] w-full rounded-2xl border border-white/10 object-cover"
        />
      )}

      <RichContent content={body} />
    </article>
  )
}