import Link from 'next/link'
import type { SiteSettings } from '@/types'

export default function Footer({ settings }: { settings: SiteSettings | null }) {
  const meta = settings?.metadata
  const year = new Date().getFullYear()

  return (
    <footer className="mt-10 border-t border-white/10 bg-ink-900">
      <div className="container-page grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-semibold uppercase tracking-widest text-white">
            🏎️ Araba <span className="text-accent">Galerisi</span>
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-400">
            Seçkin spor ve premium otomobiller. Güvenilir, şeffaf ve keyifli bir araç alım
            deneyimi.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Hızlı Bağlantılar
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/araclar" className="text-zinc-300 hover:text-accent-light">
                Araçlar
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-zinc-300 hover:text-accent-light">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/hakkimizda" className="text-zinc-300 hover:text-accent-light">
                Hakkımızda
              </Link>
            </li>
            <li>
              <Link href="/iletisim" className="text-zinc-300 hover:text-accent-light">
                İletişim
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            İletişim
          </h3>
          <ul className="space-y-2 text-sm text-zinc-300">
            {meta?.address && <li>📍 {meta.address}</li>}
            {meta?.phone && <li>📞 {meta.phone}</li>}
            {meta?.email && <li>✉️ {meta.email}</li>}
            {meta?.working_hours && <li className="whitespace-pre-line">🕒 {meta.working_hours}</li>}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-zinc-500">
        © {year} Araba Galerisi. Tüm hakları saklıdır.
      </div>
    </footer>
  )
}