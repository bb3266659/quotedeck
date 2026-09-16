import { formatDate } from '../utils/storage'

export default function QuoteCard({ quote, onPlay, onEdit, onDelete, onToggleFav }) {
  return (
    <article className="group rounded-2xl border border-line bg-surface p-4 transition hover:shadow-card">
      <p onClick={() => onPlay(quote)} className="cursor-pointer font-quote text-lg leading-snug">
        {quote.text}
      </p>

      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
        {quote.author && <span>— {quote.author}</span>}
        {quote.source && <span className="italic">({quote.source})</span>}
        <span className="ml-auto">{formatDate(quote.createdAt)}</span>
      </div>

      {quote.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {quote.tags.map(t => (
            <span key={t} className="rounded-full bg-surface2 px-2.5 py-1 text-xs text-muted">#{t}</span>
          ))}
        </div>
      )}

      <div className="mt-3 flex gap-1 border-t border-line pt-3 text-sm">
        <button onClick={() => onToggleFav(quote.id)} className="rounded-lg px-2 py-1 transition hover:bg-surface2" aria-label="ถูกใจ">
          {quote.favorite ? '★' : '☆'}
        </button>
        <button onClick={() => onPlay(quote)} className="rounded-lg px-2 py-1 text-muted transition hover:bg-surface2">อ่าน</button>
        <button onClick={() => onEdit(quote)} className="rounded-lg px-2 py-1 text-muted transition hover:bg-surface2">แก้ไข</button>
        <button onClick={() => onDelete(quote.id)} className="ml-auto rounded-lg px-2 py-1 text-muted transition hover:bg-surface2">ลบ</button>
      </div>
    </article>
  )
}