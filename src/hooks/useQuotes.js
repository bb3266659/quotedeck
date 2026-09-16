import { useCallback, useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { QUOTES_KEY, normalizeQuote } from '../utils/storage'

export function useQuotes() {
  const [quotes, setQuotes] = useLocalStorage(QUOTES_KEY, [])

  const addQuote = useCallback(data => {
    const q = normalizeQuote(data)
    setQuotes(prev => [q, ...prev])
    return q
  }, [setQuotes])

  const updateQuote = useCallback((id, patch) => {
    setQuotes(prev => prev.map(q => (q.id === id ? { ...q, ...patch, updatedAt: new Date().toISOString() } : q)))
  }, [setQuotes])

  const deleteQuote = useCallback(id => {
    setQuotes(prev => prev.filter(q => q.id !== id))
  }, [setQuotes])

  const toggleFavorite = useCallback(id => {
    setQuotes(prev => prev.map(q => (q.id === id ? { ...q, favorite: !q.favorite } : q)))
  }, [setQuotes])

  const markViewed = useCallback(id => {
    setQuotes(prev => prev.map(q => (q.id === id ? { ...q, viewCount: (q.viewCount || 0) + 1, lastViewedAt: new Date().toISOString() } : q)))
  }, [setQuotes])

  const allTags = useMemo(() => {
    const map = new Map()
    quotes.forEach(q => q.tags.forEach(t => map.set(t, (map.get(t) || 0) + 1)))
    return [...map.entries()].sort((a, b) => b[1] - a[1]).map(([tag, count]) => ({ tag, count }))
  }, [quotes])

  const stats = useMemo(() => ({
    total: quotes.length,
    favorites: quotes.filter(q => q.favorite).length,
    tags: allTags.length
  }), [quotes, allTags])

  return { quotes, setQuotes, addQuote, updateQuote, deleteQuote, toggleFavorite, markViewed, allTags, stats }
}