import type { Car } from '@/types'
import { formatMileage, formatNumber, formatPrice, getMetafieldValue } from '@/lib/utils'

export default function SpecsTable({ car }: { car: Car }) {
  const m = car.metadata
  const horsepower = getMetafieldValue(m?.horsepower)

  const specs: { label: string; value: string }[] = [
    { label: 'Marka', value: getMetafieldValue(m?.brand) },
    { label: 'Model', value: getMetafieldValue(m?.model) },
    { label: 'Yıl', value: getMetafieldValue(m?.year) },
    { label: 'Motor', value: getMetafieldValue(m?.engine) },
    { label: 'Beygir Gücü', value: horsepower ? `${formatNumber(m?.horsepower)} HP` : '' },
    { label: 'Şanzıman', value: getMetafieldValue(m?.transmission) },
    { label: 'Yakıt Türü', value: getMetafieldValue(m?.fuel_type) },
    { label: 'Kilometre', value: formatMileage(m?.mileage) },
    { label: 'Kasa Tipi', value: getMetafieldValue(m?.body_type) },
    { label: 'Fiyat', value: formatPrice(m?.price) },
  ].filter((spec) => spec.value !== '')

  if (specs.length === 0) {
    return <p className="text-zinc-400">Teknik özellik bilgisi bulunmuyor.</p>
  }

  return (
    <dl className="grid overflow-hidden rounded-2xl border border-white/10 sm:grid-cols-2">
      {specs.map((spec) => (
        <div
          key={spec.label}
          className="flex items-center justify-between gap-4 border-b border-white/10 bg-ink-800 px-5 py-4 sm:odd:border-r"
        >
          <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            {spec.label}
          </dt>
          <dd className="text-right font-medium text-white">{spec.value}</dd>
        </div>
      ))}
    </dl>
  )
}