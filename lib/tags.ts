/** The five categories. No other category names exist anywhere in the codebase. */
export const TAG_ORDER: string[] = ['Projects', 'Data & AI', 'Business', 'Personal']

type TagStyle = { bg: string; text: string }

export const TAG_STYLES: Record<string, TagStyle> = {
  Projects: { bg: 'rgba(201,168,76,0.12)', text: '#C9A84C' },
  'Data & AI': { bg: 'rgba(228,192,110,0.12)', text: '#E4C06E' },
  Business: { bg: 'rgba(160,120,48,0.16)', text: '#C9A84C' },
  Personal: { bg: 'rgba(212,184,122,0.12)', text: '#D4B87A' },
}

export function tagStyle(tag: string): TagStyle {
  return TAG_STYLES[tag] ?? { bg: 'rgba(201,168,76,0.12)', text: '#C9A84C' }
}

/** Formats an ISO date as "Month YYYY", e.g. "May 2026". */
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
