'use client'

import { motion } from 'framer-motion'
import { tagStyle, formatDate } from '@/lib/tags'

export function NoteIntro({
  title,
  tag,
  date,
  readTime,
}: {
  title: string
  tag: string
  date: string
  readTime: string
}) {
  const pill = tagStyle(tag)
  const ease = [0.22, 1, 0.36, 1] as const

  return (
    <div>
      {/* Meta row */}
      <motion.div
        className="flex flex-wrap items-center gap-3 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease }}
      >
        <span
          className="font-ui"
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: pill.text,
            background: pill.bg,
            padding: '5px 12px',
            borderRadius: 999,
          }}
        >
          {tag}
        </span>
        <span className="font-ui" style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>
          {formatDate(date)}
        </span>
        <span style={{ color: 'var(--text-dim)' }}>·</span>
        <span className="font-ui" style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>
          {readTime}
        </span>
      </motion.div>

      {/* Title */}
      <motion.h1
        className="font-display"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        style={{
          fontSize: 'clamp(32px, 5vw, 56px)',
          fontWeight: 800,
          color: 'var(--text)',
          lineHeight: 1.05,
          maxWidth: 680,
          margin: 0,
        }}
      >
        {title}
      </motion.h1>

      {/* Horizontal rule grows from left */}
      <motion.hr
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease }}
        style={{
          border: 'none',
          borderTop: '1px solid rgba(201,168,76,0.18)',
          margin: '32px 0',
          transformOrigin: 'left',
        }}
      />
    </div>
  )
}
