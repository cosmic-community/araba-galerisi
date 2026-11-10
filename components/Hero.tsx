import Link from 'next/link'

interface HeroProps {
  title: string
  subtitle: string
  imageUrl?: string
}

export default function Hero({ title, subtitle, imageUrl }: HeroProps) {
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden bg-ink-900">
      {imageUrl && (
        <img
          src={`${imageUrl}?w=2400&h=1400&fit=crop&auto=format,compress`}
          alt={title}
          width={1200}
          height={700}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950 via-ink-950/80 to-ink-950/20" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink-950 to-transparent" />

      <div className="container-page py-24">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-accent-light">
          Premium Otomobil Galerisi
        </p>
        <h1 className="max-w-3xl font-display text-5xl font-semibold uppercase leading-[1.05] tracking-wide text-white md:text-7xl">
          {title}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-300">{subtitle}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/araclar" className="btn-primary">
            Araçları Keşfet
          </Link>
          <Link href="/iletisim" className="btn-ghost">
            Bize Ulaşın
          </Link>
        </div>
      </div>
    </section>
  )
}