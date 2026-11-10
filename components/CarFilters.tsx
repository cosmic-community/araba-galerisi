import Link from 'next/link'

interface CarFiltersProps {
  brands: string[]
  fuels: string[]
  years: number[]
  values: {
    marka: string
    yakit: string
    minFiyat: string
    maxFiyat: string
    yil: string
    sirala: string
  }
}

export default function CarFilters({ brands, fuels, years, values }: CarFiltersProps) {
  return (
    <form method="get" action="/araclar" className="card p-5 md:p-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <div>
          <label htmlFor="marka" className="label-text">
            Marka
          </label>
          <select id="marka" name="marka" defaultValue={values.marka} className="input-field">
            <option value="">Tümü</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="yakit" className="label-text">
            Yakıt Türü
          </label>
          <select id="yakit" name="yakit" defaultValue={values.yakit} className="input-field">
            <option value="">Tümü</option>
            {fuels.map((fuel) => (
              <option key={fuel} value={fuel}>
                {fuel}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="yil" className="label-text">
            Yıl
          </label>
          <select id="yil" name="yil" defaultValue={values.yil} className="input-field">
            <option value="">Tümü</option>
            {years.map((year) => (
              <option key={year} value={String(year)}>
                {year} ve üzeri
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="minFiyat" className="label-text">
            Min. Fiyat (₺)
          </label>
          <input
            id="minFiyat"
            name="minFiyat"
            type="number"
            min="0"
            placeholder="0"
            defaultValue={values.minFiyat}
            className="input-field"
          />
        </div>

        <div>
          <label htmlFor="maxFiyat" className="label-text">
            Maks. Fiyat (₺)
          </label>
          <input
            id="maxFiyat"
            name="maxFiyat"
            type="number"
            min="0"
            placeholder="Sınırsız"
            defaultValue={values.maxFiyat}
            className="input-field"
          />
        </div>

        <div>
          <label htmlFor="sirala" className="label-text">
            Sırala
          </label>
          <select id="sirala" name="sirala" defaultValue={values.sirala} className="input-field">
            <option value="">En Yeni</option>
            <option value="fiyat-artan">Fiyat (Artan)</option>
            <option value="fiyat-azalan">Fiyat (Azalan)</option>
            <option value="yil-yeni">Yıl (Yeni → Eski)</option>
            <option value="yil-eski">Yıl (Eski → Yeni)</option>
          </select>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button type="submit" className="btn-primary">
          Filtrele
        </button>
        <Link href="/araclar" className="btn-ghost">
          Temizle
        </Link>
      </div>
    </form>
  )
}