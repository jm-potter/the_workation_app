import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface:  '#0F172A',
        card:     '#1E293B',
        card2:    '#263548',
        border:   '#334155',
        muted:    '#94A3B8',
        dim:      '#64748B',
      },
    },
  },
  plugins: [],
}
export default config
