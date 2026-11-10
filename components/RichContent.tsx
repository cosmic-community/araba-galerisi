import { isHtml } from '@/lib/utils'

export default function RichContent({ content }: { content: string }) {
  if (!content) return null

  if (isHtml(content)) {
    return (
      <div
        className="prose prose-invert max-w-none prose-headings:font-display prose-headings:uppercase prose-a:text-accent-light prose-img:rounded-xl"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    )
  }

  const paragraphs = content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter((p) => p !== '')

  return (
    <div className="prose prose-invert max-w-none">
      {paragraphs.map((paragraph, i) => (
        <p key={i} className="whitespace-pre-line">
          {paragraph}
        </p>
      ))}
    </div>
  )
}