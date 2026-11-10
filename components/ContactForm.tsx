'use client'

import { useState, type FormEvent } from 'react'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

export default function ContactForm({ defaultSubject = '' }: { defaultSubject?: string }) {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [feedback, setFeedback] = useState<string>('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const payload = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      phone: String(data.get('phone') ?? ''),
      subject: String(data.get('subject') ?? ''),
      message: String(data.get('message') ?? ''),
    }

    setStatus('sending')
    setFeedback('')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = (await response.json()) as { success?: boolean; error?: string }
      if (!response.ok || !result.success) {
        setStatus('error')
        setFeedback(result.error ?? 'Mesaj gönderilemedi. Lütfen tekrar deneyin.')
        return
      }
      setStatus('success')
      setFeedback('Mesajınız alındı. En kısa sürede size dönüş yapacağız.')
      form.reset()
    } catch {
      setStatus('error')
      setFeedback('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label-text">
            Ad Soyad *
          </label>
          <input id="name" name="name" type="text" required className="input-field" />
        </div>
        <div>
          <label htmlFor="email" className="label-text">
            E-posta *
          </label>
          <input id="email" name="email" type="email" required className="input-field" />
        </div>
        <div>
          <label htmlFor="phone" className="label-text">
            Telefon
          </label>
          <input id="phone" name="phone" type="tel" className="input-field" />
        </div>
        <div>
          <label htmlFor="subject" className="label-text">
            Konu
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            defaultValue={defaultSubject}
            className="input-field"
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="label-text">
          Mesajınız *
        </label>
        <textarea id="message" name="message" rows={6} required className="input-field" />
      </div>

      <button type="submit" disabled={status === 'sending'} className="btn-primary disabled:opacity-60">
        {status === 'sending' ? 'Gönderiliyor…' : 'Mesajı Gönder'}
      </button>

      {feedback && (
        <p
          role="status"
          className={`text-sm ${status === 'success' ? 'text-emerald-400' : 'text-red-400'}`}
        >
          {feedback}
        </p>
      )}
    </form>
  )
}