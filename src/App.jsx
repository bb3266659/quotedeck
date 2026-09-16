import { useCallback, useMemo, useState } from 'react'
import Header from './components/Header'
import QuoteForm from './components/QuoteForm'
import Dashboard from './pages/Dashboard'
import Playback from './pages/Playback'
import Settings from './pages/Settings'
import { useQuotes } from './hooks/useQuotes'
import { useTheme } from './hooks/useTheme'
import { getQuoteOfTheDay, shuffle } from './utils/qotd'

export default function App() {
  const store = useQuotes()
  const { theme, setTheme, themes } = useTheme()

  const [route, setRoute] = useState('home')
  const [playlist, setPlaylist] = useState([])
  const [zen, setZen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const qotd = useMemo(() => getQuoteOfTheDay(store.quotes), [store.quotes])

  const startPlayback = useCallback((list, { random = true } = {}) => {
    if (!list.length) return
    const ids = list.map(q => q.id)
    setPlaylist(random ? shuffle(ids) : ids)
    setRoute('play')
  }, [])

  const openNew = () => {
    setEditing(null)
    setFormOpen(true)
  }

  const openEdit = quote => {
    setEditing(quote)
    setFormOpen(true)
  }

  const handleSubmit = data => {
    if (editing) store.updateQuote(editing.id, data)
    else store.addQuote(data)
    setFormOpen(false)
    setEditing(null)
  }

  const handleDelete = id => {
    if (window.confirm('ลบคำคมนี้ใช่ไหม? การลบไม่สามารถย้อนกลับได้')) store.deleteQuote(id)
  }

  return (
    <div className="min-h-full">
      {!zen && (
        <Header
          route={route}
          onNavigate={setRoute}
          theme={theme}
          themes={themes}
          onTheme={setTheme}
        />
      )}

      <main className={zen ? '' : 'mx-auto max-w-3xl px-4 pb-28 pt-5'}>
        {route === 'home' && (
          <Dashboard
            quotes={store.quotes}
            allTags={store.allTags}
            stats={store.stats}
            qotd={qotd}
            onPlay={startPlayback}
            onEdit={openEdit}
            onDelete={handleDelete}
            onToggleFav={store.toggleFavorite}
            onAdd={openNew}
          />
        )}

        {route === 'play' && (
          <Playback
            quotes={store.quotes}
            ids={playlist}
            zen={zen}
            setZen={setZen}
            onExit={() => {
              setZen(false)
              setRoute('home')
            }}
            onEdit={openEdit}
            onDelete={handleDelete}
            onToggleFav={store.toggleFavorite}
            onViewed={store.markViewed}
          />
        )}

        {route === 'settings' && (
          <Settings
            quotes={store.quotes}
            setQuotes={store.setQuotes}
            theme={theme}
            setTheme={setTheme}
            themes={themes}
            stats={store.stats}
          />
        )}
      </main>

      {!zen && route !== 'play' && (
        <button
          onClick={openNew}
          aria-label="เพิ่มคำคมใหม่"
          className="fixed bottom-6 right-6 z-30 h-14 w-14 rounded-2xl bg-accent text-3xl leading-none text-accent-ink shadow-card transition active:scale-95"
        >
          +
        </button>
      )}

      {formOpen && (
        <QuoteForm
          initial={editing}
          onSubmit={handleSubmit}
          onClose={() => {
            setFormOpen(false)
            setEditing(null)
          }}
        />
      )}
    </div>
  )
}