import { NextResponse } from 'next/server'

interface ContactPayload {
  name?: unknown
  email?: unknown
  phone?: unknown
  subject?: unknown
  message?: unknown
}

function asText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

export async function POST(request: Request): Promise<NextResponse> {
  let body: ContactPayload
  try {
    body = (await request.json()) as ContactPayload
  } catch {
    return NextResponse.json({ error: 'Geçersiz istek.' }, { status: 400 })
  }

  const name = asText(body.name)
  const email = asText(body.email)
  const phone = asText(body.phone)
  const subject = asText(body.subject)
  const message = asText(body.message)

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Lütfen zorunlu alanları doldurun.' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Geçerli bir e-posta adresi girin.' }, { status: 400 })
  }

  // Connect an e-mail provider (e.g. Resend) here to forward submissions.
  console.log('Yeni iletişim mesajı:', { name, email, phone, subject, message })

  return NextResponse.json({ success: true })
}