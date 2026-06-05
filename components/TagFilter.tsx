'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Note } from '@/lib/notes'
import { TAG_ORDER } from '@/lib/tags'
import { NoteCard } from './NoteCard'

export function TagFilter({
  notes,
  excludeSlug,
}: {
  notes: Note[]
  excludeSlug?: string
}) {
  const [active, setActive] = useState<string>('all')

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: notes.length }
    for (const n of notes) map[n.tag] = (map[n.tag] ?? 0) + 1
    return map
  }, [notes])

  const pills = useMemo(
    () => ['all', ...TAG_ORDER.filter((t) => (counts[t] ?? 0) > 0)],
    [counts]
  )

  const gridNotes = useMemo(() => {
    const base = excludeSlug ? notes.filter((n) => n.slug !== excludeSlug) : notes
    return active === 'all' ? base : base.filter((n) => n.tag === active)
  }, [active, notes, excludeSlug])

  const label = (t: string) => (t === 'all' ? 'All' : t)

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-3 mb-14">
        {pills.map((tag) => {
          const isActive = active === tag
          const count = counts[tag] ?? 0
          return (
            <motion.button
              key={tag}
              type="button"
              onClick={() => setActive(tag)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              data-cursor="pointer"
              aria-pressed={isActive}
              className="font-ui inline-flex items-center gap-1.5 transition-colors duration-200"
              style={{
                fontSize: 13,
                fontWeight: isActive ? 700 : 500,
                padding: '8px 20px',
                borderRadius: 999,
                background: isActive ? 'var(--gold)' : 'transparent',
                color: isActive ? '#06080F' : 'var(--text-muted)',
                border: isActive
                  ? '1px solid var(--gold)'
                  : '1px solid rgba(255,255,255,0.1)',
                boxShadow: isActive
                  ? '0 0 16px rgba(201,168,76,0.4), 0 0 38px rgba(0,85,255,0.18), inset 0 1px 0 rgba(255,255,255,0.1)'
                  : 'none',
              }}
            >
              <span>{label(tag)}</span>
              <span style={{ fontSize: 11, opacity: isActive ? 0.7 : 0.55 }}>
                ({count})
              </span>
            </motion.button>
          )
        })}
      </div>

      <motion.div
        layout
        className={
          active === 'all'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch'
            : 'flex flex-col gap-5 max-w-[700px] mx-auto'
        }
      >
        <AnimatePresence mode="popLayout">
          {gridNotes.map((note, i) => (
            <motion.div
              key={note.slug}
              layout
              className={active === 'all' ? 'h-full' : ''}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <NoteCard note={note} index={i} grid={active === 'all'} from={active} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
