import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { formatDate } from '../utils/storage'
import { shuffle } from '../utils/qotd'

const AUTOPLAY_MS = 9000

export default function Playback({ quotes, ids, zen, setZen, onExit, onEdit, onDelete, onToggleFav, onViewed }) {
  const [order, setOrder] = useState(ids)
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [auto, setAuto] = useState(false)
  const touchX = useRef(null)

  useEffect(() => setOrder(ids), [ids])

  const list = useMemo(
    () => order.map(id => quotes.find(q => q.id === id)).filter(Boolean),
    [order, quotes]
  )

  const current = list[Math.min(index, list.length - 1)]

  const next = useCallback(() => {
    setFlipped(false)
    setIndex(i => (list.length ? (i + 1) % list.length : 0))
  }, [list.length])

  const prev = useCallback(() => {
    setFlipped(false)
    setIndex(i => (list.length ? (i - 1 + list.length) % list.length : 0))
  }, [list.length])

  useEffect(() => {
    if (current) onViewed(current.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.id])

  useEffect(() => {
    if (!auto) return
    const t = setInterval(next, AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [auto, next])

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === ' ') { e.preventDefault(); setFlipped(f => !f) }
      else if (e.key === 'Escape') zen ? setZen(false) : onExit()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, zen, setZen, onExit])

  if (!current) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted">ไม่มีคำคมให้เล่น</p>
        <button onClick={onExit} className="mt-4 rounded-xl bg-accent px-5 py-2.5 text-sm text-accent-ink">กลับหน้าแรก</button>
      </div>
    )
  }

  const onTouchStart = e => (touchX.current = e.changedTouches[0].clientX)
  const onTouchEnd = e => {
    if (touchX.current == null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 60) (dx < 0 ? next : prev)()
    touchX.current = null
  }

  return (
    <div className={zen ? 'fixed inset-0 z-40 flex flex-col bg-bg p-4' : 'flex flex-col'}>
      <div className="mb-3 flex items-center gap-2 text-xs text-muted">
        <button onClick={onExit} className="rounded-lg border border-line bg-surface px-3 py-1.5">← ออก</button>
        <span className="ml-auto">{index + 1} / {list.length}</span>
      </div>

      <div className="mb-4 h-1 w-full overflow-hidden rounded-full bg-surface2">
        <div className="h-full bg-accent transition-all duration-300" style={{ width: `${((index + 1) / list.length) * 100}%` }} />
      </div>

      <div
        className="flip-scene flex-1"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          onClick={() => setFlipped(f => !f)}
          className={`flip-card relative min-h-[60vh] w-full cursor-pointer ${flipped ? 'is-flipped' : ''}`}
        >
          {/* หน้า: ข้อความคำคม */}
          <div className="flip-face absolute inset-0 flex flex-col justify-center rounded-3xl border border-line bg-surface p-8 shadow-card">
            <span className="mb-4 font-quote text-5xl leading-none text-accent opacity-25">“</span>
            <blockquote className="font-quote text-2xl leading-relaxed sm:text-3xl">{current.text}</blockquote>
            <p className="mt-8 text-center text-xs text-muted">แตะการ์ดเพื่อดูรายละเอียด</p>
          </div>

          {/* หลัง: รายละเอียด */}
          <div className="flip-face flip-back absolute inset-0 flex flex-col justify-center rounded-3xl border border-line bg-surface2 p-8">
            <p className="text-xs uppercase tracking-widest text-muted">รายละเอียด</p>
            <p className="mt-3 text-xl font-semibold">{current.author || 'ไม่ระบุผู้พูด'}</p>
            {current.source && <p className="mt-1 text-sm italic text-muted">{current.source}</p>}
            {current.note && <p className="mt-5 rounded-2xl bg-surface p-4 text-sm leading-relaxed">📝 {current.note}</p>}
            {current.tags.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-1.5">
                {current.tags.map(t => (
                  <span key={t} className="rounded-full bg-surface px-2.5 py-1 text-xs text-muted">#{t}</span>
                ))}
              </div>
            )}
            <p className="mt-6 text-xs text-muted">เก็บเมื่อ {formatDate(current.createdAt)} · อ่านแล้ว {current.viewCount || 0} ครั้ง</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button onClick={prev} className="rounded-2xl border border-line bg-surface px-5 py-3">←</button>
        <button onClick={next} className="flex-1 rounded-2xl bg-accent py-3 text-sm font-medium text-accent-ink transition active:scale-95">ถัดไป →</button>
        <button onClick={() => onToggleFav(current.id)} className="rounded-2xl border border-line bg-surface px-4 py-3">
          {current.favorite ? '★' : '☆'}
        </button>
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-center gap-1 text-xs text-muted">
        <Tool onClick={() => setZen(z => !z)}>{zen ? '🙈 ออกจาก Zen' : '👁 Zen Mode'}</Tool>
        <Tool onClick={() => setAuto(a => !a)}>{auto ? '⏸ หยุดเล่นอัตโนมัติ' : '▶ เล่นอัตโนมัติ'}</Tool>
        <Tool onClick={() => { setOrder(o => shuffle(o)); setIndex(0); setFlipped(false) }}>🔀 สลับลำดับ</Tool>
        <Tool onClick={() => onEdit(current)}>✏️ แก้ไข</Tool>
        <Tool onClick={() => onDelete(current.id)}>🗑 ลบ</Tool>
      </div>
    </div>
  )
}

function Tool({ onClick, children }) {
  return (
    <button onClick={onClick} className="rounded-xl px-3 py-2 transition hover:bg-surface2">
      {children}
    </button>
  )
}