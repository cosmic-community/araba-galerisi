import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-8xl font-semibold text-accent">404</p>
      <h1 className="mt-4 font-display text-3xl font-semibold uppercase tracking-wide text-white">
        Sayfa Bulunamadı
      </h1>
      <p className="mt-3 max-w-md text-zinc-400">
        Aradığınız sayfa taşınmış veya kaldırılmış olabilir.
      </p>
      <div className="mt-8 flex gap-4">
        <Link href="/" className="btn-primary">
          Ana Sayfa
        </Link>
        <Link href="/araclar" className="btn-ghost">
          Araçlar
        </Link>
      </div>
    </div>
  )
}