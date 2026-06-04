import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './providers/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#05070b',
        gold: '#C9A84C',
        blue: '#3B82F6',
        green: '#10B981',
        purple: '#8B5CF6',
        amber: '#F59E0B',
      },
      fontFamily: {
        display: ['var(--font-syne)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      typography: {
        invert: {
          css: {
            '--tw-prose-body': 'rgba(255,255,255,0.78)',
            '--tw-prose-headings': '#f0f0f0',
            '--tw-prose-links': '#C9A84C',
            '--tw-prose-bold': '#f0f0f0',
            '--tw-prose-quotes': 'rgba(255,255,255,0.7)',
            '--tw-prose-quote-borders': 'rgba(201,168,76,0.4)',
            '--tw-prose-hr': 'rgba(201,168,76,0.15)',
            '--tw-prose-bullets': 'rgba(201,168,76,0.5)',
            '--tw-prose-counters': 'rgba(255,255,255,0.4)',
            '--tw-prose-code': '#C9A84C',
            maxWidth: '720px',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
