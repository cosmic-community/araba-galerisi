'use client'

import { useState } from 'react'
import type { CosmicFile } from '@/types'

interface ImageGalleryProps {
  images: CosmicFile[]
  alt: string
}

export default function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [index, setIndex] = useState<number>(0)

  if (!images || images.length === 0) {
    return (
      <div className="flex aspect-[16/10] items-center justify-center rounded-2xl border border-white/10 bg-ink-800 text-6xl">
        🚗
      </div>
    )
  }

  const current = images[index] ?? images[0]
  if (!current) return null

  const prev = (): void => setIndex((i) => (i - 1 + images.length) % images.length)
  const next = (): void => setIndex((i) => (i + 1) % images.length)

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-ink-800">
        <img
          src={`${current.imgix_url}?w=1800&h=1125&fit=crop&auto=format,compress`}
          alt={`${alt} - görsel ${index + 1}`}
          width={900}
          height={560}
          className="h-full w-full object-cover"
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Önceki görsel"
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-xl text-white hover:bg-accent"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Sonraki görsel"
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-xl text-white hover:bg-accent"
            >
              ›
            </button>
            <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
              {index + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.map((image, i) => (
            <button
              key={image.imgix_url}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Görsel ${i + 1}`}
              className={`aspect-[3/2] overflow-hidden rounded-lg border-2 transition ${
                i === index ? 'border-accent' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={`${image.imgix_url}?w=300&h=200&fit=crop&auto=format,compress`}
                alt={`${alt} küçük görsel ${i + 1}`}
                width={150}
                height={100}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}