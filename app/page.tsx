import Link from 'next/link'
import Hero from '@/components/Hero'
import SectionHeading from '@/components/SectionHeading'
import CarCard from '@/components/CarCard'
import ReviewCard from '@/components/ReviewCard'
import PostCard from '@/components/PostCard'
import { getCars, getPosts, getReviews, getSiteSettings } from '@/lib/cosmic'
import { getMetafieldValue, isTrue, toNumber } from '@/lib/utils'

const FEATURES: { icon: string; title: string; text: string }[] = [
  {
    icon: '🛡️',
    title: 'Garantili Araçlar',
    text: 'Tüm araçlarımız detaylı ekspertizden geçer ve garanti güvencesiyle teslim edilir.',
  },
  {
    icon: '🔍',
    title: 'Şeffaf Süreç',
    text: 'Geçmiş, kilometre ve bakım bilgileri eksiksiz ve açık şekilde paylaşılır.',
  },
  {
    icon: '💳',
    title: 'Esnek Finansman',
    text: 'Bütçenize uygun kredi ve takas seçenekleriyle hayalinizdeki araca ulaşın.',
  },
]

export default async function HomePage() {
  const [settings, cars, reviews, posts] = await Promise.all([
    getSiteSettings(),
    getCars(),
    getReviews(),
    getPosts(),
  ])

  const flagged = cars.filter((car) => isTrue(car.metadata?.featured))
  const featuredCars = (flagged.length > 0 ? flagged : cars).slice(0, 6)
  const heroCar = featuredCars[0]
  const heroImage =
    settings?.metadata?.hero_image?.imgix_url ?? heroCar?.metadata?.featured_image?.imgix_url

  const brandCount = new Set(
    cars.map((car) => getMetafieldValue(car.metadata?.brand)).filter((b) => b !== '')
  ).size
  const ratings = reviews.map((r) => toNumber(r.metadata?.rating)).filter((n) => n > 0)
  const avgRating =
    ratings.length > 0 ? (ratings.reduce((sum, n) => sum + n, 0) / ratings.length).toFixed(1) : '5.0'

  const stats: { value: string; label: string }[] = [
    { value: String(cars.length), label: 'Araç' },
    { value: String(brandCount), label: 'Marka' },
    { value: String(reviews.length), label: 'Müşteri Yorumu' },
    { value: avgRating, label: 'Ortalama Puan' },
  ]

  return (
    <>
      <Hero
        title={settings?.metadata?.hero_title || 'Tutkunun Yeni Adresi'}
        subtitle={
          settings?.metadata?.hero_subtitle ||
          'Seçkin spor ve premium otomobillerle tanışın. Hayalinizdeki araç burada sizi bekliyor.'
        }
        imageUrl={heroImage}
      />

      <section className="border-y border-white/10 bg-ink-900">
        <div className="container-page grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-4xl font-semibold text-white">{stat.value}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-zinc-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-20">
        <SectionHeading
          eyebrow="Vitrin"
          title="Öne Çıkan Araçlar"
          subtitle="Galerimizin en çok ilgi gören, özenle seçilmiş modelleri."
          actionHref="/araclar"
          actionLabel="Tüm Araçlar"
        />
        {featuredCars.length === 0 ? (
          <p className="text-zinc-400">Şu anda gösterilecek araç bulunmuyor.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </section>

      <section className="bg-ink-900 py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Neden Biz"
            title="Premium Deneyim, Güvenilir Hizmet"
            subtitle="Araç alım sürecinin her adımında yanınızdayız."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="card p-8 hover:border-accent/60">
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className="font-display text-xl font-medium uppercase tracking-wide text-white">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {reviews.length > 0 && (
        <section className="container-page py-20">
          <SectionHeading
            eyebrow="Referanslar"
            title="Müşterilerimiz Ne Diyor?"
            subtitle="Mutlu müşterilerimizin deneyimleri."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {reviews.slice(0, 3).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>
      )}

      {posts.length > 0 && (
        <section className="bg-ink-900 py-20">
          <div className="container-page">
            <SectionHeading
              eyebrow="Blog"
              title="Otomobil Dünyasından Haberler"
              subtitle="Yeni modeller, ipuçları ve sektör gelişmeleri."
              actionHref="/blog"
              actionLabel="Tüm Yazılar"
            />
            <div className="grid gap-6 md:grid-cols-3">
              {posts.slice(0, 3).map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="container-page py-20">
        <div className="relative overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-ink-800 to-ink-900 p-10 text-center md:p-16">
          <h2 className="font-display text-3xl font-semibold uppercase tracking-wide text-white md:text-5xl">
            Test Sürüşüne Hazır mısınız?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            Bizimle iletişime geçin, size en uygun aracı birlikte bulalım.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/iletisim" className="btn-primary">
              Bize Ulaşın
            </Link>
            <Link href="/araclar" className="btn-ghost">
              Araçları İncele
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}