import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import { getSiteSettings } from '@/lib/cosmic'

export const metadata: Metadata = {
  title: 'İletişim | Araba Galerisi',
  description: 'Bizimle iletişime geçin: adres, telefon, e-posta ve iletişim formu.',
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const raw = await searchParams
  const konu = raw.konu
  const defaultSubject = Array.isArray(konu) ? (konu[0] ?? '') : (konu ?? '')
  const settings = await getSiteSettings()
  const meta = settings?.metadata

  const items: { icon: string; label: string; value: string; href?: string }[] = []
  if (meta?.address) items.push({ icon: '📍', label: 'Adres', value: meta.address })
  if (meta?.phone)
    items.push({
      icon: '📞',
      label: 'Telefon',
      value: meta.phone,
      href: `tel:${meta.phone.replace(/\s+/g, '')}`,
    })
  if (meta?.email)
    items.push({ icon: '✉️', label: 'E-posta', value: meta.email, href: `mailto:${meta.email}` })
  if (meta?.working_hours)
    items.push({ icon: '🕒', label: 'Çalışma Saatleri', value: meta.working_hours })

  return (
    <div className="container-page py-12">
      <div className="mb-12 max-w-3xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent-light">
          Bize Yazın
        </p>
        <h1 className="font-display text-4xl font-semibold uppercase tracking-wide text-white md:text-5xl">
          İletişim
        </h1>
        <p className="mt-3 text-zinc-400">
          Sorularınız, test sürüşü talepleriniz veya takas teklifleriniz için bize ulaşın.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-2">
          {items.length === 0 && (
            <p className="text-sm text-zinc-400">İletişim bilgileri yakında eklenecek.</p>
          )}
          {items.map((item) => (
            <div key={item.label} className="card flex items-start gap-4 p-5">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="text-xs uppercase tracking-wider text-zinc-500">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="text-white hover:text-accent-light">
                    {item.value}
                  </a>
                ) : (
                  <p className="whitespace-pre-line text-white">{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="card p-6 md:p-8 lg:col-span-3">
          <h2 className="mb-6 font-display text-2xl font-semibold uppercase tracking-wide text-white">
            İletişim Formu
          </h2>
          <ContactForm defaultSubject={defaultSubject} />
        </div>
      </div>
    </div>
  )
}