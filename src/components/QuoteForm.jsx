import { useEffect, useState } from 'react'
import { parseTags } from '../utils/storage'

export default function QuoteForm({ initial, onSubmit, onClose }) {
  const [text, setText] = useState(initial?.text || '')
  const [author, setAuthor] = useState(initial?.author || '')
  const [source, setSource] = useState(initial?.source || '')
  const [note, setNote] = useState(initial?.note || '')
  const [tags, setTags] = useState((initial?.tags || []).join(', '))

  useEffect(() => {
    const onKey = e => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const submit = e => {
    e.preventDefault()
    if (!text.trim()) return
    onSubmit({ text, author, source, note, tags: parseTags(tags) })
  }

  const field = 'w-full rounded-xl border border-line bg-bg px-3 py-2 outline-none transition focus:border-accent'

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4" onMouseDown={onClose}>
      <form
        onSubmit={submit}
        onMouseDown={e => e.stopPropagation()}
        className="fade-in max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-line bg-surface p-5 shadow-card sm:rounded-3xl"
      >
        <div className="mb-4 flex items-center">
          <h2 className="text-lg font-semibold">{initial ? 'แก้ไขคำคม' : 'เพิ่มคำคมใหม่'}</h2>
          <button type="button" onClick={onClose} className="ml-auto rounded-lg px-2 py-1 text-muted hover:bg-surface2">✕</button>
        </div>

        <label className="mb-3 block text-sm">
          <span className="mb-1 block text-muted">ข้อความ *</span>
          <textarea value={text} onChange={e => setText(e.target.value)} rows={4} autoFocus required placeholder="วางคำคมที่เจอมา…" className={`${field} font-quote text-lg`} />
        </label>

        <div className="mb-3 grid gap-3 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-1 block text-muted">ผู้พูด</span>
            <input value={author} onChange={e => setAuthor(e.target.value)} placeholder="เช่น James Clear" className={field} />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-muted">ที่มา</span>
            <input value={source} onChange={e => setSource(e.target.value)} placeholder="เช่น Atomic Habits" className={field} />
          </label>
        </div>

        <label className="mb-3 block text-sm">
          <span className="mb-1 block text-muted">แท็ก (คั่นด้วยจุลภาค)</span>
          <input value={tags} onChange={e => setTags(e.target.value)} placeholder="แรงบันดาลใจ, ชีวิต, work" className={field} />
        </label>

        <label className="mb-5 block text-sm">
          <span className="mb-1 block text-muted">โน้ตของเรา (ไม่บังคับ)</span>
          <textarea value={note} onChange={e => setNote(e.target.value)} rows={2} placeholder="ทำไมประโยคนี้ถึงโดน…" className={field} />
        </label>

        <div className="flex gap-2">
          <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-line py-2.5 text-sm">ยกเลิก</button>
          <button type="submit" className="flex-1 rounded-xl bg-accent py-2.5 text-sm font-medium text-accent-ink transition active:scale-95">
            {initial ? 'บันทึกการแก้ไข' : 'บันทึก'}
          </button>
        </div>
      </form>
    </div>
  )
}