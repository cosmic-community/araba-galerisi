'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LINKS: { href: string; label: string }[] = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/araclar', label: 'Araçlar' },
  { href: '/blog', label: 'Blog' },
  { href: '/hakkimizda', label: 'Hakkımızda' },
  { href: '/iletisim', label: 'İletişim' },
]

export default function Header({ phone }: { phone?: string }) {
  const [open, setOpen] = useState<boolean>(false)
  const pathname = usePathname()

  const isActive = (href: string): boolean =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink-950/90 backdrop-blur">
      <div className="container-page flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="text-2xl">🏎️</span>
          <span className="font-display text-2xl font-semibold uppercase tracking-widest text-white">
            Araba <span className="text-accent">Galerisi</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium uppercase tracking-wider transition ${
                isActive(link.href) ? 'text-accent-light' : 'text-zinc-300 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {phone && (
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="text-sm font-semibold text-white hover:text-accent-light"
            >
              📞 {phone}
            </a>
          )}
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-white md:hidden"
          aria-label="Menüyü aç/kapat"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-ink-900 md:hidden">
          <div className="container-page flex flex-col py-4">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`border-b border-white/5 py-3 text-sm font-medium uppercase tracking-wider ${
                  isActive(link.href) ? 'text-accent-light' : 'text-zinc-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}