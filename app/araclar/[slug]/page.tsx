// app/araclar/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ImageGallery from '@/components/ImageGallery'
import SpecsTable from '@/components/SpecsTable'
import ReviewCard from '@/components/ReviewCard'
import CarCard from '@/components/CarCard'
import { getCarBySlug, getCars, getReviewsByCar, getSiteSettings } from '@/lib/cosmic'
import { formatPrice, getMetafieldValue, stockBadgeClass, stockInfo } from '@/lib/utils'
import type { CosmicFile } from '@/types'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const car = await getCarBySlug(slug)
  if (!car) return { title: 'Araç Bulunamadı | Araba Galerisi' }
  return {
    title: `${car.title} | Araba Galerisi`,
    description: `${car.title} - ${formatPrice(car.metadata?.price)}`,
  }
}

export default async function CarDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const car = await getCarBySlug(slug)
  if (!car) notFound()

  const [reviews, allCars, settings] = await Promise.all([
    getReviewsByCar(car.id),
    getCars(),
    getSiteSettings(),
  ])

  const images: CosmicFile[] = []
  const seen = new Set<string>()
  const candidates: (CosmicFile | undefined)[] = [
    car.metadata?.featured_image,
    ...(car.metadata?.gallery ?? []),
  ]
  for (const file of candidates) {
    if (file && file.imgix_url && !seen.has(file.imgix_url)) {
      seen.add(file.imgix_url)
      images.push(file)
    }
  }

  const stock = stockInfo(car.metadata?.stock_status)
  const brand = getMetafieldValue(car.metadata?.brand)
  const description = car.metadata?.description ?? ''
  const phone = settings?.metadata?.phone

  const others = allCars.filter((c) => c.id !== car.id)
  const sameBrand = others.filter((c) => getMetafieldValue(c.metadata?.brand) === brand && brand !== '')
  const related = [...sameBrand, ...others.filter((c) => !sameBrand.includes(c))].slice(0, 3)

  return (
    <div className="container-page py-10">
      <meta
        name="cosmic-context"
        content={JSON.stringify({ object_id: car.id, object_type: car.type })}
      />
      <nav className="mb-6 text-sm text-zinc-500">
        <Link href="/" className="hover:text-white">
          Ana Sayfa
        </Link>{' '}
        /{' '}
        <Link href="/araclar" className="hover:text-white">
          Araçlar
        </Link>{' '}
        / <span className="text-zinc-300">{car.title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ImageGallery images={images} alt={car.title} />
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card p-6">
            <div className="mb-3 flex items-center gap-3">
              {brand && (
                <span className="text-xs font-semibold uppercase tracking-widest text-accent-light">
                  {brand}
                </span>
              )}
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${stockBadgeClass(stock.tone)}`}
              >
                {stock.label}
              </span>
            </div>
            <h1 className="font-display text-3xl font-semibold uppercase tracking-wide text-white">
              {car.title}
            </h1>
            <p className="mt-4 font-display text-4xl font-semibold text-accent-light">
              {formatPrice(car.metadata?.price)}
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href={`/iletisim?konu=${encodeURIComponent(`${car.title} - Test Sürüşü`)}`}
                className="btn-primary"
              >
                Test Sürüşü Talep Et
              </Link>
              {phone && (
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="btn-ghost">
                  📞 {phone}
                </a>
              )}
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <h2 className="mb-6 font-display text-2xl font-semibold uppercase tracking-wide text-white">
            Teknik Özellikler
          </h2>
          <SpecsTable car={car} />

          {description && (
            <div className="mt-10">
              <h2 className="mb-4 font-display text-2xl font-semibold uppercase tracking-wide text-white">
                Araç Hakkında
              </h2>
              <p className="whitespace-pre-line leading-relaxed text-zinc-300">{description}</p>
            </div>
          )}
        </section>
      </div>

      {reviews.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 font-display text-2xl font-semibold uppercase tracking-wide text-white">
            Müşteri Yorumları
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 font-display text-2xl font-semibold uppercase tracking-wide text-white">
            Benzer Araçlar
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <CarCard key={item.id} car={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}