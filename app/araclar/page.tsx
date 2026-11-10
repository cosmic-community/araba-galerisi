import type { Metadata } from 'next'
import CarCard from '@/components/CarCard'
import CarFilters from '@/components/CarFilters'
import { getCars } from '@/lib/cosmic'
import { getMetafieldValue, toNumber, uniqueSorted } from '@/lib/utils'
import type { Car } from '@/types'

export const metadata: Metadata = {
  title: 'Araçlar | Araba Galerisi',
  description: 'Marka, fiyat, yakıt türü ve yıla göre araçlarımızı filtreleyin.',
}

type RawParams = Record<string, string | string[] | undefined>

function first(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? ''
  return value ?? ''
}

function sortCars(cars: Car[], sort: string): Car[] {
  const list = [...cars]
  switch (sort) {
    case 'fiyat-artan':
      return list.sort((a, b) => toNumber(a.metadata?.price) - toNumber(b.metadata?.price))
    case 'fiyat-azalan':
      return list.sort((a, b) => toNumber(b.metadata?.price) - toNumber(a.metadata?.price))
    case 'yil-yeni':
      return list.sort((a, b) => toNumber(b.metadata?.year) - toNumber(a.metadata?.year))
    case 'yil-eski':
      return list.sort((a, b) => toNumber(a.metadata?.year) - toNumber(b.metadata?.year))
    default:
      return list
  }
}

export default async function CarsPage({ searchParams }: { searchParams: Promise<RawParams> }) {
  const raw = await searchParams
  const values = {
    marka: first(raw.marka),
    yakit: first(raw.yakit),
    minFiyat: first(raw.minFiyat),
    maxFiyat: first(raw.maxFiyat),
    yil: first(raw.yil),
    sirala: first(raw.sirala),
  }

  const cars = await getCars()

  const brands = uniqueSorted(cars.map((c) => getMetafieldValue(c.metadata?.brand)))
  const fuels = uniqueSorted(cars.map((c) => getMetafieldValue(c.metadata?.fuel_type)))
  const years = Array.from(
    new Set(cars.map((c) => toNumber(c.metadata?.year)).filter((y) => y > 0))
  ).sort((a, b) => b - a)

  const minPrice = toNumber(values.minFiyat)
  const maxPrice = toNumber(values.maxFiyat)
  const minYear = toNumber(values.yil)

  const filtered = cars.filter((car) => {
    const m = car.metadata
    if (values.marka && getMetafieldValue(m?.brand) !== values.marka) return false
    if (values.yakit && getMetafieldValue(m?.fuel_type) !== values.yakit) return false
    const price = toNumber(m?.price)
    if (minPrice > 0 && price < minPrice) return false
    if (maxPrice > 0 && price > maxPrice) return false
    if (minYear > 0 && toNumber(m?.year) < minYear) return false
    return true
  })

  const result = sortCars(filtered, values.sirala)

  return (
    <div className="container-page py-12">
      <div className="mb-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent-light">
          Envanter
        </p>
        <h1 className="font-display text-4xl font-semibold uppercase tracking-wide text-white md:text-5xl">
          Araçlarımız
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-400">
          Size en uygun aracı bulmak için filtreleri kullanın.
        </p>
      </div>

      <CarFilters brands={brands} fuels={fuels} years={years} values={values} />

      <p className="mb-6 mt-8 text-sm text-zinc-400">
        <span className="font-semibold text-white">{result.length}</span> araç bulundu
      </p>

      {result.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-lg text-white">Aramanıza uygun araç bulunamadı.</p>
          <p className="mt-2 text-sm text-zinc-400">Lütfen filtreleri değiştirerek tekrar deneyin.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {result.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  )
}