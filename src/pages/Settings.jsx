import { useRef, useState } from 'react'
import { exportQuotes, mergeQuotes, readBackupFile } from '../utils/backup'
import { SAMPLE_QUOTES } from '../utils/seed'
import { useInstallPrompt } from '../hooks/useInstallPrompt'

export default function Settings({ quotes, setQuotes, theme, setTheme, themes, stats }) {
  const fileRef = useRef(null)
  const [msg, setMsg] = useState(null)
  const { canInstall, install } = useInstallPrompt()

  const handleImport = async e => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const incoming = await readBackupFile(file)
      const mode = window.confirm(
        `พบ ${incoming.length} คำคมในไฟล์\n\nกด "ตกลง" = รวมกับข้อมูลเดิม\nกด "ยกเลิก" = แทนที่ข้อมูลเดิมทั้งหมด`
      )
      if (mode) {
        const { merged, addedCount } = mergeQuotes(quotes, incoming)
        setQuotes(merged)
        setMsg({ type: 'ok', text: `นำเข้าสำเร็จ เพิ่มใหม่ ${addedCount} รายการ` })
      } else {
        setQuotes(incoming)
        setMsg({ type: 'ok', text: `แทนที่ข้อมูลด้วย ${incoming.length} รายการแล้ว` })
      }
    } catch (err) {
      setMsg({ type: 'err', text: err.message })
    } finally {
      e.target.value = ''
    }
  }

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-semibold">ตั้งค่า</h1>

      {msg && (
        <p className={`rounded-2xl border p-3 text-sm ${msg.type === 'ok' ? 'border-line bg-surface' : 'border-red-400 bg-surface text-red-500'}`}>
          {msg.text}
        </p>
      )}

      <Section title="ธีม" desc="เลือกโทนสีที่สบายตาที่สุดสำหรับคุณ">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {themes.map(t => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`rounded-2xl border p-3 text-left transition ${t.id === theme ? 'border-accent ring-2 ring-accent/30' : 'border-line'}`}
            >
              <div className="mb-2 flex h-10 items-center justify-center rounded-xl" style={{ background: t.color }}>
                <span className="h-5 w-5 rounded-full" style={{ background: t.swatch[1] }} />
              </div>
              <p className="text-sm">{t.name}</p>
            </button>
          ))}
        </div>
      </Section>

      <Section title="ข้อมูลของฉัน" desc={`มีทั้งหมด ${stats.total} คำคม · ถูกใจ ${stats.favorites} · ${stats.tags} แท็ก`}>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => exportQuotes(quotes)} className="rounded-xl bg-accent px-4 py-2.5 text-sm text-accent-ink">⬇ Export เป็นไฟล์ JSON</button>
          <button onClick={() => fileRef.current?.click()} className="rounded-xl border border-line bg-surface px-4 py-2.5 text-sm">⬆ Import จากไฟล์</button>
          <input ref={fileRef} type="file" accept="application/json,.json" onChange={handleImport} className="hidden" />
        </div>
        <p className="mt-3 text-xs text-muted">
          ข้อมูลถูกเก็บไว้ในเครื่องของคุณเท่านั้น (localStorage) แนะนำให้ Export เก็บไว้เป็นระยะ เผื่อเปลี่ยนเครื่องหรือล้างข้อมูลเบราว์เซอร์
        </p>
      </Section>

      <Section title="เริ่มต้นใช้งาน" desc="ยังไม่รู้จะเริ่มยังไง? ลองโหลดตัวอย่างคำคมมาดูก่อนได้">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              const { merged, addedCount } = mergeQuotes(quotes, SAMPLE_QUOTES)
              setQuotes(merged)
              setMsg({ type: 'ok', text: `เพิ่มคำคมตัวอย่าง ${addedCount} รายการแล้ว` })
            }}
            className="rounded-xl border border-line bg-surface px-4 py-2.5 text-sm"
          >
            โหลดคำคมตัวอย่าง
          </button>
          {canInstall && (
            <button onClick={install} className="rounded-xl border border-line bg-surface px-4 py-2.5 text-sm">📲 ติดตั้งแอปลงเครื่อง</button>
          )}
          <button
            onClick={() => {
              if (window.confirm('ลบคำคมทั้งหมดถาวร? แนะนำให้ Export เก็บไว้ก่อน')) {
                setQuotes([])
                setMsg({ type: 'ok', text: 'ล้างข้อมูลทั้งหมดแล้ว' })
              }
            }}
            className="rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-red-500"
          >
            ล้างข้อมูลทั้งหมด
          </button>
        </div>
      </Section>

      <Section title="คีย์ลัด (บนคอมพิวเตอร์)">
        <ul className="space-y-1 text-sm text-muted">
          <li><b className="text-ink">← / →</b> เปลี่ยนคำคม</li>
          <li><b className="text-ink">Space</b> พลิกการ์ด</li>
          <li><b className="text-ink">Esc</b> ออกจาก Zen Mode / กลับหน้าแรก</li>
        </ul>
      </Section>

      <p className="pb-6 text-center text-xs text-muted">QuoteDeck v1.0.0 · ทำงานออฟไลน์ได้ผ่าน Service Worker</p>
    </div>
  )
}

function Section({ title, desc, children }) {
  return (
    <section className="rounded-3xl border border-line bg-surface p-5">
      <h2 className="font-semibold">{title}</h2>
      {desc && <p className="mb-4 mt-1 text-sm text-muted">{desc}</p>}
      {children}
    </section>
  )
}