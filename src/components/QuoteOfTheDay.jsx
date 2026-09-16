import { dayKey } from '../utils/qotd'

export default function QuoteOfTheDay({ quote, onOpen }) {
  if (!quote) return null
  const today = new Date().toLocaleDateString('th-TH', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <section className="fade-in relative overflow-hidden rounded-3xl border border-line bg-surface p-6 shadow-card">
      <div className="pointer-events-none absolute -right-6 -top-10 font-quote text-[10rem] leading-none text-accent opacity-10">”</div>
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">คำคมประจำวัน</p>
      <p className="mt-1 text-xs text-muted">{today}</p>
      <blockquote className="mt-4 font-quote text-2xl leading-snug sm:text-3xl">{quote.text}</blockquote>
      {quote.author && <p className="mt-3 text-sm text-muted">— {quote.author}</p>}
      <button
        onClick={() => onOpen(quote)}
        className="mt-5 rounded-xl bg-accent px-4 py-2 text-sm font-medium text-accent-ink transition active:scale-95"
      >
        เปิดอ่านแบบเต็มจอ
      </button>
      <span className="sr-only">{dayKey()}</span>
    </section>
  )
}