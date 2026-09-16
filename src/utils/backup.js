import { APP_NAME, APP_VERSION, normalizeQuote } from './storage'

export function exportQuotes(quotes) {
  const payload = {
    app: APP_NAME,
    version: APP_VERSION,
    exportedAt: new Date().toISOString(),
    count: quotes.length,
    quotes
  }
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `quotedeck-backup-${new Date().toISOString().slice(0, 10)}.json`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export function readBackupFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('อ่านไฟล์ไม่สำเร็จ'))
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result))
        const list = Array.isArray(data) ? data : data.quotes
        if (!Array.isArray(list)) throw new Error('รูปแบบไฟล์ไม่ถูกต้อง')
        resolve(list.map(normalizeQuote).filter(q => q.text))
      } catch (e) {
        reject(new Error('ไฟล์นี้ไม่ใช่ไฟล์สำรองของ QuoteDeck'))
      }
    }
    reader.readAsText(file)
  })
}

/** รวมข้อมูลแบบไม่ให้ซ้ำ (ดูจาก id และข้อความ) */
export function mergeQuotes(current, incoming) {
  const seenId = new Set(current.map(q => q.id))
  const seenText = new Set(current.map(q => q.text.trim().toLowerCase()))
  const added = incoming.filter(q => !seenId.has(q.id) && !seenText.has(q.text.trim().toLowerCase()))
  return { merged: [...added, ...current], addedCount: added.length }
}