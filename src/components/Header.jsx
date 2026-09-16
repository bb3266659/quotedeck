import ThemeSwitcher from './ThemeSwitcher'

export default function Header({ route, onNavigate, theme, themes, onTheme }) {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center gap-2 px-4 py-3">
        <button onClick={() => onNavigate('home')} className="mr-auto flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent font-quote text-2xl leading-none text-accent-ink">”</span>
          <span className="text-lg font-semibold tracking-tight">QuoteDeck</span>
        </button>

        <ThemeSwitcher theme={theme} themes={themes} onChange={onTheme} />

        <button
          onClick={() => onNavigate(route === 'settings' ? 'home' : 'settings')}
          aria-label="ตั้งค่า"
          className="grid h-9 w-9 place-items-center rounded-xl border border-line bg-surface text-sm transition hover:bg-surface2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.2.5.66.87 1.2.99H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
      </div>
    </header>
  )
}