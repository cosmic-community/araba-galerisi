import Link from 'next/link'
import type { Car } from '@/types'
import {
  formatMileage,
  formatPrice,
  getMetafieldValue,
  imgUrl,
  stockBadgeClass,
  stockInfo,
} from '@/lib/utils'

export default function CarCard({ car }: { car: Car }) {
  const m = car.metadata
  const image = imgUrl(m?.featured_image, 'w=1200&h=800&fit=crop')
  const brand = getMetafieldValue(m?.brand)
  const stock = stockInfo(m?.stock_status)
  const year = getMetafieldValue(m?.year)
  const fuel = getMetafieldValue(m?.fuel_type)
  const mileage = formatMileage(m?.mileage)
  const chips: string[] = [year, fuel, mileage].filter((chip) => chip !== '')

  return (
    <Link href={`/araclar/${car.slug}`} className="card group block hover:-translate-y-1 hover:border-accent/60">
      <div className="relative aspect-[3/2] overflow-hidden bg-ink-700">
        {image ? (
          <img
            src={image}
            alt={car.title}
            width={600}
            height={400}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl">🚗</div>
        )}
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${stockBadgeClass(stock.tone)}`}
        >
          {stock.label}
        </span>
      </div>
      <div className="p-5">
        {brand && (
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-light">{brand}</p>
        )}
        <h3 className="mt-1 font-display text-xl font-medium uppercase tracking-wide text-white">
          {car.title}
        </h3>
        {chips.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-md border border-white/10 bg-ink-900 px-2.5 py-1 text-xs text-zinc-300"
              >
                {chip}
              </span>
            ))}
          </div>
        )}
        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
          <p className="font-display text-2xl font-semibold text-white">{formatPrice(m?.price)}</p>
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-light group-hover:text-white">
            İncele →
          </span>
        </div>
      </div>
    </Link>
  )
}