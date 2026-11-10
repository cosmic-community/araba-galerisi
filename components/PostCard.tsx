import Link from 'next/link'
import type { Post } from '@/types'
import { excerpt, formatDate, getMetafieldValue, imgUrl } from '@/lib/utils'

export default function PostCard({ post }: { post: Post }) {
  const image = imgUrl(post.metadata?.featured_image, 'w=1200&h=750&fit=crop')
  const category = post.metadata?.category
  const categoryName = category ? getMetafieldValue(category.metadata?.name) || category.title : ''
  const summary = excerpt(post.metadata?.content ?? post.content, 130)

  return (
    <Link href={`/blog/${post.slug}`} className="card group flex h-full flex-col hover:-translate-y-1 hover:border-accent/60">
      <div className="relative aspect-[8/5] overflow-hidden bg-ink-700">
        {image ? (
          <img
            src={image}
            alt={post.title}
            width={600}
            height={375}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl">📰</div>
        )}
        {categoryName && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
            {categoryName}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs text-zinc-500">{formatDate(post.created_at)}</p>
        <h3 className="mt-2 font-display text-xl font-medium uppercase tracking-wide text-white">
          {post.title}
        </h3>
        {summary && <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">{summary}</p>}
        <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-accent-light group-hover:text-white">
          Devamını Oku →
        </span>
      </div>
    </Link>
  )
}