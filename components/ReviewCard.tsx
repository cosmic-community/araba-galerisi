import type { Review } from '@/types'
import { formatDate, toNumber } from '@/lib/utils'

export default function ReviewCard({ review }: { review: Review }) {
  const m = review.metadata
  const rating = Math.max(0, Math.min(5, Math.round(toNumber(m?.rating))))
  const name = m?.reviewer_name || review.title
  const date = formatDate(m?.review_date)
  const carTitle = m?.car?.title

  return (
    <div className="card flex h-full flex-col p-6">
      <div className="mb-4 flex text-lg" aria-label={`${rating} / 5 puan`}>
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={i < rating ? 'text-amber-400' : 'text-zinc-700'}>
            ★
          </span>
        ))}
      </div>
      <p className="flex-1 leading-relaxed text-zinc-300">“{m?.comment ?? ''}”</p>
      <div className="mt-5 border-t border-white/10 pt-4">
        <p className="font-semibold text-white">{name}</p>
        <p className="text-xs text-zinc-500">
          {[carTitle, date].filter((part): part is string => Boolean(part)).join(' • ')}
        </p>
      </div>
    </div>
  )
}