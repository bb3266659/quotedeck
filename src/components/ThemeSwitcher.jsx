import { useEffect, useRef, useState } from 'react'

export default function ThemeSwitcher({ theme, themes, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onClick = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const current = themes.find(t => t.id === theme) || themes[0]

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="เปลี่ยนธีม"
        className="flex h-9 items-center gap-2 rounded-xl border border-line bg-surface px-3 text-sm transition hover:bg-surface2"
      >
        <span className="flex">
          <span className="h-4 w-4 rounded-full border border-line" style={{ background: current.swatch[0] }} />
          <span className="-ml-1.5 h-4 w-4 rounded-full border border-line" style={{ background: current.swatch[1] }} />
        </span>
        <span className="hidden sm:inline">{current.name}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-2xl border border-line bg-surface p-1 shadow-card">
          {themes.map(t => (
            <button
              key={t.id}
              onClick={() => {
                onChange(t.id)
                setOpen(false)
              }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition hover:bg-surface2 ${
                t.id === theme ? 'font-semibold text-accent' : ''
              }`}
            >
              <span className="flex">
                <span className="h-4 w-4 rounded-full border border-line" style={{ background: t.swatch[0] }} />
                <span className="-ml-1.5 h-4 w-4 rounded-full border border-line" style={{ background: t.swatch[1] }} />
              </span>
              {t.name}
              {t.id === theme && <span className="ml-auto">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}