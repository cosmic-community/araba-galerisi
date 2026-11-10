import type { Metadata } from 'next'
import Link from 'next/link'
import RichContent from '@/components/RichContent'
import { getCars, getReviews, getSiteSettings } from '@/lib/cosmic'

export const metadata: Metadata = {
  title: 'Hakkımızda | Araba Galerisi',
  description: 'Araba Galerisi hakkında: hikayemiz, değerlerimiz ve çalışma saatlerimiz.',
}

const VALUES: { icon: string; title: string; text: string }[] = [
  { icon: '🤝', title: 'Güven', text: 'Her satışta dürüstlük ve şeffaflık önceliğimizdir.' },
  { icon: '⚙️', title: 'Kalite', text: 'Yalnızca ekspertizden geçmiş, bakımlı araçları sunarız.' },
  { icon: '🏁', title: 'Tutku', text: 'Otomobil tutkusunu müşterilerimizle paylaşırız.' },
]

export default async function AboutPage() {
  const [settings, cars, reviews] = await Promise.all([getSiteSettings(), getCars(), getReviews()])
  const about = settings?.metadata?.about_content
  const meta = settings?.metadata

  return (
    <div className="container-page py-12">
      <div className="mb-12 max-w-3xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent-light">
          Biz Kimiz
        </p>
        <h1 className="font-display text-4xl font-semibold uppercase tracking-wide text-white md:text-5xl">
          Hakkımızda
        </h1>
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {about ? (
            <RichContent content={about} />
          ) : (
            <p className="leading-relaxed text-zinc-300">
              Araba Galerisi olarak yıllardır seçkin otomobilleri tutkuyla sizlerle buluşturuyoruz.
              Amacımız, her müşterimize güvenilir, şeffaf ve keyifli bir araç alım deneyimi
              sunmaktır.
            </p>
          )}

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="card p-6 text-center">
              <p className="font-display text-4xl font-semibold text-white">{cars.length}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-zinc-400">Araç</p>
            </div>
            <div className="card p-6 text-center">
              <p className="font-display text-4xl font-semibold text-white">{reviews.length}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-zinc-400">Yorum</p>
            </div>
            <div className="card p-6 text-center">
              <p className="font-display text-4xl font-semibold text-white">100%</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-zinc-400">Memnuniyet</p>
            </div>
          </div>
        </div>

        <aside className="card h-fit p-6">
          <h2 className="mb-4 font-display text-xl font-semibold uppercase tracking-wide text-white">
            Bilgiler
          </h2>
          <ul className="space-y-4 text-sm text-zinc-300">
            {meta?.address && (
              <li>
                <span className="block text-xs uppercase tracking-wider text-zinc-500">Adres</span>
                {meta.address}
              </li>
            )}
            {meta?.working_hours && (
              <li>
                <span className="block text-xs uppercase tracking-wider text-zinc-500">
                  Çalışma Saatleri
                </span>
                <span className="whitespace-pre-line">{meta.working_hours}</span>
              </li>
            )}
            {meta?.phone && (
              <li>
                <span className="block text-xs uppercase tracking-wider text-zinc-500">Telefon</span>
                {meta.phone}
              </li>
            )}
            {meta?.email && (
              <li>
                <span className="block text-xs uppercase tracking-wider text-zinc-500">E-posta</span>
                {meta.email}
              </li>
            )}
          </ul>
          <Link href="/iletisim" className="btn-primary mt-6 w-full">
            İletişime Geç
          </Link>
        </aside>
      </div>

      <section className="mt-16 grid gap-6 md:grid-cols-3">
        {VALUES.map((value) => (
          <div key={value.title} className="card p-8">
            <div className="mb-3 text-4xl">{value.icon}</div>
            <h3 className="font-display text-xl font-medium uppercase tracking-wide text-white">
              {value.title}
            </h3>
            <p className="mt-2 text-sm text-zinc-400">{value.text}</p>
          </div>
        ))}
      </section>
    </div>
  )
}