import Link from 'next/link'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  actionHref?: string
  actionLabel?: string
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  actionHref,
  actionLabel,
}: SectionHeadingProps) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent-light">
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-3xl font-semibold uppercase tracking-wide text-white md:text-4xl">
          {title}
        </h2>
        {subtitle && <p className="mt-2 max-w-xl text-zinc-400">{subtitle}</p>}
      </div>
      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="text-sm font-semibold uppercase tracking-wider text-accent-light hover:text-white"
        >
          {actionLabel} →
        </Link>
      )}
    </div>
  )
}