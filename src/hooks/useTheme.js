import { useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { THEME_KEY } from '../utils/storage'

export const THEMES = [
  { id: 'light', name: 'Light', color: '#f3f4f6', swatch: ['#ffffff', '#5b21b6'] },
  { id: 'dark', name: 'Dark', color: '#0f1420', swatch: ['#1b2232', '#a78bfa'] },
  { id: 'warm', name: 'Warm', color: '#fdf6e3', swatch: ['#fffdf7', '#b45309'] },
  { id: 'mint', name: 'Mint', color: '#eef7f3', swatch: ['#ffffff', '#0f766e'] }
]

export function useTheme() {
  const [theme, setTheme] = useLocalStorage(THEME_KEY, 'light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    const meta = document.querySelector('meta[name="theme-color"]')
    const found = THEMES.find(t => t.id === theme)
    if (meta && found) meta.setAttribute('content', found.color)
  }, [theme])

  return { theme, setTheme, themes: THEMES }
}