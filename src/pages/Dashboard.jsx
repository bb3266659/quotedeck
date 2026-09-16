import { useMemo, useState } from 'react'
import QuoteOfTheDay from '../components/QuoteOfTheDay'
import QuoteCard from '../components/QuoteCard'
import EmptyState from '../components/EmptyState'

export default function Dashboard({ quotes, allTags, stats, qotd, onPlay, onEdit, onDelete, onToggleFav, onAdd }) {
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState('all')
  const [favOnly, setFavOnly] = useState(false)

  const filtered = useMemo(() => {
    const s = query.trim().toLowerCase()
    return quotes.filter(q => {
      if (favOnly && !q.favorite) return false
      if (tag !== 'all' && !q.tags.includes(tag)) return false
      if (!s) return true
      return (
        q.text.toLowerCase().includes(s) ||
        q.author.toLowerCase().includes(s) ||
        q.tags.join(' ').toLowerCase().includes(s)
      )
    })
  }, [quotes, query, tag, favOnly])

  if (!quotes.length) {
    return (
      <EmptyState
        title="ยังไม่มีคำคมในคลัง"
        description="เจอประโยคดีๆ ที่ไหนก็เก็บไว้ที่นี่ แล้วค่อยกลับมาอ่านทบทวนแบบ flashcard"
        actionLabel="+ เพิ่มคำคมแรก"
        onAction={onAdd}
      />
    )
  }

  return (
    <div className="space-y-5">
      <QuoteOfTheDay quote={qotd} onOpen={q => onPlay([q], { random: false })} />

      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          ['ทั้งหมด', stats.total],
          ['ถูกใจ', stats.favorites],
          ['แท็ก', stats.tags]
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-line bg-surface py-3">
            <p className="text-xl font-semibold">{value}</p>
            <p className="text-xs text-muted">{label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onPlay(filtered)}
          className="flex-1 rounded-2xl bg-accent py-3 text-sm font-medium text-accent-ink transition active:scale-95"
        >
          ▶ เล่นแบบสุ่ม ({filtered.length})
        </button>
        <button
          onClick={() => onPlay(filtered, { random: false })}
          className="rounded-2xl border border-line bg-surface px-4 text-sm"
        >
          เรียงตามลำดับ
        </button>
      </div>

      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="ค้นหาคำคม ผู้พูด หรือแท็ก…"
        className="w-full rounded-2xl border border-line bg-surface px-4 py-3 text-sm outline-none transition focus:border-accent"
      />

      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        <Chip active={tag === 'all' && !favOnly} onClick={() => { setTag('all'); setFavOnly(false) }}>ทั้งหมด</Chip>
        <Chip active={favOnly} onClick={() => setFavOnly(v => !v)}>★ ถูกใจ</Chip>
        {allTags.map(({ tag: t, count }) => (
          <Chip key={t} active={tag === t} onClick={() => setTag(tag === t ? 'all' : t)}>
            #{t} <span className="opacity-60">{count}</span>
          </Chip>
        ))}
      </div>

      <div className="grid gap-3">
        {filtered.map(q => (
          <QuoteCard
            key={q.id}
            quote={q}
            onPlay={one => onPlay([one], { random: false })}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleFav={onToggleFav}
          />
        ))}
        {!filtered.length && <p className="py-10 text-center text-sm text-muted">ไม่พบคำคมที่ตรงกับเงื่อนไข</p>}
      </div>
    </div>
  )
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs transition ${
        active ? 'border-accent bg-accent text-accent-ink' : 'border-line bg-surface text-muted'
      }`}
    >
      {children}
    </button>
  )
}