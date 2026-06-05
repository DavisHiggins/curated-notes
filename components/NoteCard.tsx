'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import type { Note } from '@/lib/notes'
import { tagStyle, formatDate } from '@/lib/tags'

export function NoteCard({ note, index }: { note: Note; index: number }) {
  const pill = tagStyle(note.tag)
  const innerRef = useRef<HTMLDivElement>(null)
  const number = String(index + 1).padStart(2, '0')

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = innerRef.current
    if (!el) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left - rect.width / 2) / rect.width) * 8
    const y = ((e.clientY - rect.top - rect.height / 2) / rect.height) * 4
    el.style.transform = `translate(${x}px, ${y}px)`
  }

  const handleMouseLeave = () => {
    if (innerRef.current) innerRef.current.style.transform = 'translate(0px, 0px)'
  }

  return (
    <motion.a
      href={`/notes/${note.slug}`}
      className="group block"
      data-cursor="pointer"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ x: 6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={innerRef}
        className="relative overflow-hidden transition-[background,border-color,box-shadow] duration-300 group-hover:bg-[var(--bg-card-hover)] group-hover:border-[var(--border-hover)] group-hover:shadow-[0_0_32px_rgba(201,168,76,0.09),0_0_56px_rgba(0,85,255,0.07)]"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 14,
          padding: '28px 32px',
          transitionTimingFunction: 'ease',
        }}
      >
        {/* gold left border, scales in on hover */}
        <span
          className="absolute left-0 top-0 bottom-0 origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100"
          style={{
            width: 3,
            background: 'linear-gradient(180deg, var(--gold) 0%, var(--blue) 100%)',
          }}
          aria-hidden
        />

        {/* note number */}
        <span
          aria-hidden
          className="font-display absolute pointer-events-none select-none"
          style={{
            top: 14,
            right: 22,
            fontSize: 'clamp(36px, 4vw, 52px)',
            fontWeight: 700,
            color: 'var(--text)',
            opacity: 0.06,
            lineHeight: 1,
          }}
        >
          {number}
        </span>

        <div className="flex items-center justify-between gap-4 mb-4 pr-12">
          <div className="flex items-center gap-3">
            <span
              className="font-ui"
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: pill.text,
                background: pill.bg,
                padding: '4px 10px',
                borderRadius: 999,
              }}
            >
              {note.tag}
            </span>
            <span style={{ color: 'var(--text-dim)' }}>·</span>
            <span
              className="font-ui"
              style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}
            >
              {note.readTime}
            </span>
          </div>
          <span
            className="font-ui"
            style={{ fontSize: 12, color: 'var(--text-dim)', fontWeight: 500 }}
          >
            {formatDate(note.date)}
          </span>
        </div>

        <h3
          className="font-display"
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: 'var(--text)',
            lineHeight: 1.25,
            margin: 0,
          }}
        >
          {note.title}
        </h3>

        <p
          className="font-ui"
          style={{
            marginTop: 10,
            fontSize: 15,
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
          className="flex items-center gap-1.5 mt-5 font-ui"
          style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 600 }}
        >
          <span className="read-excerpt">Read excerpt</span>
          <motion.span aria-hidden className="inline-block" variants={{}}>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </motion.span>
        </div>
      </div>
    </motion.a>
  )
}
