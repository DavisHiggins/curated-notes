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
        gold: '#C9A84C',
        'gold-bright': '#E4C06E',
        'gold-deep': '#A07830',
      },
      fontFamily: {
        display: ['var(--font-syne)', 'system-ui', 'sans-serif'],
        ui: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        body: ['var(--font-lora)', 'Georgia', 'serif'],
      },
      typography: {
        invert: {
          css: {
            '--tw-prose-body': 'rgba(242, 239, 233, 0.8)',
            '--tw-prose-headings': '#f2efe9',
            '--tw-prose-links': '#c9a84c',
            '--tw-prose-bold': '#f2efe9',
            '--tw-prose-quotes': 'rgba(242, 239, 233, 0.7)',
            '--tw-prose-quote-borders': '#c9a84c',
            '--tw-prose-hr': 'rgba(201, 168, 76, 0.15)',
            '--tw-prose-bullets': 'rgba(201, 168, 76, 0.5)',
            '--tw-prose-counters': 'rgba(242, 239, 233, 0.45)',
            '--tw-prose-code': '#e4c06e',
            fontFamily: 'var(--font-lora), Georgia, serif',
            fontSize: '17px',
            lineHeight: '1.78',
            maxWidth: '680px',
            'p, li': {
              fontFamily: 'var(--font-lora), Georgia, serif',
            },
            'h2, h3': {
              fontFamily: 'var(--font-syne), system-ui, sans-serif',
              fontWeight: '700',
            },
            a: {
              textDecoration: 'none',
              fontWeight: '500',
            },
            'a:hover': {
              textDecoration: 'underline',
            },
            code: {
              fontFamily:
                'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
              background: 'rgba(201, 168, 76, 0.08)',
              color: '#e4c06e',
              borderRadius: '4px',
              padding: '2px 7px',
              fontWeight: '400',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            blockquote: {
              borderLeftColor: '#c9a84c',
              fontStyle: 'italic',
              color: 'rgba(242, 239, 233, 0.7)',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
