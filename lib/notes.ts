import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type Note = {
  slug: string
  title: string
  date: string
  tag: string
  excerpt: string
  readTime: string
  relatedProject?: string
  relatedProjectLabel?: string
  content: string
}

/** Slugs shown in the Featured row, in display order. */
export const FEATURED_SLUGS = [
  'propify-breakdown',
  'balancing-everything',
  'faith-christ-relationship',
]

const NOTES_DIR = path.join(process.cwd(), 'content/notes')

export function getAllNotes(): Note[] {
  const files = fs.readdirSync(NOTES_DIR).filter((f) => f.endsWith('.mdx'))
  return files
    .map((file) => {
      const slug = file.replace('.mdx', '')
      const raw = fs.readFileSync(path.join(NOTES_DIR, file), 'utf-8')
      const { data, content } = matter(raw)
      return { slug, content, ...data } as Note
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getNoteBySlug(slug: string): Note | null {
  const filePath = path.join(NOTES_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return { slug, content, ...data } as Note
}
