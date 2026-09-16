/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        surface2: 'var(--surface-2)',
        ink: 'var(--text)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
        'accent-ink': 'var(--accent-ink)',
        line: 'var(--border)'
      },
      fontFamily: {
        sans: ['"IBM Plex Sans Thai"', 'system-ui', 'sans-serif'],
        quote: ['"Playfair Display"', '"IBM Plex Sans Thai"', 'serif']
      },
      boxShadow: { card: '0 10px 30px -12px rgba(0,0,0,.25)' }
    }
  },
  plugins: []
}