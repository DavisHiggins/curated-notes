export type TagName = 'Projects' | 'Learning' | 'Systems' | 'Perspective'

export const TAG_COLORS: Record<string, string> = {
  Projects: '#3B82F6',
  Learning: '#10B981',
  Systems: '#8B5CF6',
  Perspective: '#F59E0B',
}

export function tagColor(tag: string): string {
  return TAG_COLORS[tag] ?? '#C9A84C'
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
