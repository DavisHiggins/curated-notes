'use client'

import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'

export type NavNote = { slug: string; title: string; tag: string }

export function NoteNav({
  notes,
  featuredSlugs,
  currentSlug,
}: {
  notes: NavNote[]
  featuredSlugs: string[]
  currentSlug: string
}) {
  const params = useSearchParams()
  const from = params.get('from') || 'all'

  // Build the ordered list for the section the reader came from.
  let list: NavNote[]
  if (from === 'featured') {
    list = featuredSlugs
      .map((s) => notes.find((n) => n.slug === s))
      .filter((n): n is NavNote => Boolean(n))
  } else if (from === 'all') {
    list = notes
  } else {
    list = notes.filter((n) => n.tag === from)
  }

  let idx = list.findIndex((n) => n.slug === currentSlug)
  // Fallback if the note is not part of that section (e.g. a direct visit).
  if (idx === -1) {
    list = notes
    idx = notes.findIndex((n) => n.slug === currentSlug)
  }

  const prev = idx > 0 ? list[idx - 1] : null
  const next = idx >= 0 && idx < list.length - 1 ? list[idx + 1] : null
  const fromQ = `?from=${encodeURIComponent(from)}`

  return (
    <nav
      className="flex items-stretch justify-between gap-4 mt-16 pt-10"
      style={{ borderTop: '1px solid rgba(201,168,76,0.15)' }}
      aria-label="Note navigation"
    >
      {/* Left: Previous (only when not the first note in the section) */}
      <div className="flex">
        {prev ? (
          <a
            href={`/notes/${prev.slug}${fromQ}`}
            data-cursor="pointer"
            className="note-nav-btn group"
          >
            <motion.span
              aria-hidden
              className="inline-block"
              style={{ fontSize: 18, color: 'var(--gold)', lineHeight: 1 }}
              animate={{ x: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            >
              ←
            </motion.span>
            <span className="flex flex-col text-left min-w-0">
              <span
                className="font-ui"
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                }}
              >
                Previous
              </span>
              <span
                className="font-ui truncate"
                style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 3 }}
              >
                {prev.title}
              </span>
            </span>
          </a>
        ) : null}
      </div>

      {/* Right: Next Note, or Return at the end of the section */}
      <div className="flex justify-end">
        {next ? (
          <a
            href={`/notes/${next.slug}${fromQ}`}
            data-cursor="pointer"
            className="note-nav-btn group"
          >
            <span className="flex flex-col text-right min-w-0">
              <span
                className="font-ui"
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                }}
              >
                Next Note
              </span>
              <span
                className="font-ui truncate"
                style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 3 }}
              >
                {next.title}
              </span>
            </span>
            <motion.span
              aria-hidden
              className="inline-block"
              style={{ fontSize: 18, color: 'var(--gold)', lineHeight: 1 }}
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            >
              →
            </motion.span>
          </a>
        ) : (
          <a
            href="/#all-notes"
            data-cursor="pointer"
            className="note-nav-btn group"
          >
            <span
              className="font-ui"
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
              }}
            >
              Return
            </span>
            <motion.span
              aria-hidden
              className="inline-block"
              style={{ fontSize: 17, color: 'var(--gold)', lineHeight: 1 }}
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            >
              ↑
            </motion.span>
          </a>
        )}
      </div>
    </nav>
  )
}
