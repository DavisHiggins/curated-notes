'use client'

import { motion } from 'framer-motion'
import type { Note } from '@/lib/notes'
import { tagColor, formatDate } from '@/lib/tags'

export function NoteCard({ note, index }: { note: Note; index: number }) {
  const color = tagColor(note.tag)

  return (
    <motion.a
      href={`/notes/${note.slug}`}
      className="group block"
      data-cursor="pointer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ x: 8 }}
    >
      <div
        className="relative transition-colors duration-300"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 14,
          padding: '28px 32px',
        }}
      >
        {/* gold left border on hover */}
        <span
          className="absolute left-0 top-0 bottom-0 origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100"
          style={{
            width: 2,
            background: 'var(--gold)',
            borderTopLeftRadius: 14,
            borderBottomLeftRadius: 14,
          }}
          aria-hidden
        />

        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span
              className="font-display"
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color,
                background: `${color}1A`,
                padding: '4px 10px',
                borderRadius: 999,
              }}
            >
              {note.tag}
            </span>
            <span
              className="font-body"
              style={{ fontSize: 12, color: 'var(--text-muted)' }}
            >
              {note.readTime}
            </span>
          </div>
          <span
            className="font-body"
            style={{ fontSize: 12, color: 'var(--text-dim)' }}
          >
            {formatDate(note.date)}
          </span>
        </div>

        <h3
          className="font-display"
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.25,
            margin: 0,
          }}
        >
          {note.title}
        </h3>

        <p
          className="font-body"
          style={{
            marginTop: 10,
            fontSize: 14,
            lineHeight: 1.6,
            color: 'var(--text-muted)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {note.excerpt}
        </p>

        <div
          className="flex items-center gap-1.5 mt-5 font-body"
          style={{ fontSize: 13, color: 'var(--gold)' }}
        >
          <span>Read note</span>
          <motion.span aria-hidden whileHover={{ x: 5 }} className="inline-block">
            →
          </motion.span>
        </div>
      </div>
    </motion.a>
  )
}
