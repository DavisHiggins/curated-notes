'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import type { Note } from '@/lib/notes'
import { NoteCard } from './NoteCard'

const TAGS = ['All', 'Projects', 'Learning', 'Systems', 'Perspective'] as const
type Filter = (typeof TAGS)[number]

export function TagFilter({ notes }: { notes: Note[] }) {
  const [active, setActive] = useState<Filter>('All')

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: notes.length }
    for (const n of notes) {
      map[n.tag] = (map[n.tag] ?? 0) + 1
    }
    return map
  }, [notes])

  const filtered = useMemo(
    () => (active === 'All' ? notes : notes.filter((n) => n.tag === active)),
    [active, notes]
  )

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-2.5 mb-12">
        {TAGS.map((tag) => {
          const isActive = active === tag
          const count = counts[tag] ?? 0
          return (
            <motion.button
              key={tag}
              type="button"
              onClick={() => setActive(tag)}
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              data-cursor="pointer"
              aria-pressed={isActive}
              className="font-display inline-flex items-center gap-1.5 transition-colors duration-200"
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.04em',
                padding: '8px 16px',
                borderRadius: 999,
                background: isActive ? 'var(--gold)' : 'transparent',
                color: isActive ? '#05070b' : 'var(--text-muted)',
                border: isActive
                  ? '1px solid var(--gold)'
                  : '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <span>{tag}</span>
              <span
                style={{
                  fontSize: 10,
                  opacity: isActive ? 0.7 : 0.5,
                }}
              >
                {count}
              </span>
            </motion.button>
          )
        })}
      </div>

      <div className="flex flex-col gap-5 max-w-[680px] mx-auto">
        {filtered.map((note, i) => (
          <NoteCard key={note.slug} note={note} index={i} />
        ))}
      </div>
    </div>
  )
}
