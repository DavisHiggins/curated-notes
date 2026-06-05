'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import type { Note } from '@/lib/notes'
import { tagStyle, formatDate } from '@/lib/tags'

/**
 * Compact featured card, designed to sit in a three-up row above the feed.
 * Gold base with an electric-blue accent and a magnetic, glowing hover.
 */
export function FeaturedNoteCard({ note, index }: { note: Note; index: number }) {
  const pill = tagStyle(note.tag)
  const innerRef = useRef<HTMLDivElement>(null)
  const number = String(index + 1).padStart(2, '0')

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = innerRef.current
    if (!el) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left - rect.width / 2) / rect.width) * 6
    const y = ((e.clientY - rect.top - rect.height / 2) / rect.height) * 6
    el.style.transform = `translate(${x}px, ${y}px)`
  }
  const handleMouseLeave = () => {
    if (innerRef.current) innerRef.current.style.transform = 'translate(0px, 0px)'
  }

  return (
    <motion.a
      href={`/notes/${note.slug}`}
      className="group block h-full"
      data-cursor="pointer"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={innerRef}
        className="relative overflow-hidden h-full flex flex-col transition-shadow duration-300 group-hover:shadow-[0_0_40px_rgba(201,168,76,0.1),0_0_64px_rgba(0,85,255,0.08)]"
        style={{
          background: 'rgba(201,168,76,0.05)',
          border: '1px solid rgba(201,168,76,0.2)',
          borderLeft: '3px solid var(--gold)',
          borderRadius: 16,
          padding: '26px 26px 24px',
        }}
      >
        {/* slight glimmer sweep */}
        <span
          className="card-shine"
          aria-hidden
          style={{ animationDelay: `${index * 1.6 + 0.6}s` }}
        />

        {/* electric-blue accent sheen on hover */}
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-px scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"
          style={{
            background: 'linear-gradient(90deg, var(--gold) 0%, var(--blue) 100%)',
          }}
        />

        {/* decorative number */}
        <span
          aria-hidden
          className="font-display absolute select-none pointer-events-none"
          style={{
            top: 10,
            right: 16,
            fontSize: 'clamp(48px, 6vw, 72px)',
            fontWeight: 800,
            color: index === 1 ? 'var(--blue)' : 'var(--gold)',
            opacity: 0.1,
            lineHeight: 0.8,
          }}
        >
          {number}
        </span>

        <div className="flex items-center gap-2.5 mb-4 pr-12">
          <span
            className="font-ui"
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              color: pill.text,
              background: pill.bg,
              padding: '4px 10px',
              borderRadius: 999,
            }}
          >
            {note.tag}
          </span>
        </div>

        <h3
          className="font-display"
          style={{
            fontSize: 'clamp(19px, 1.6vw, 23px)',
            fontWeight: 700,
            color: 'var(--text)',
            lineHeight: 1.18,
            margin: 0,
          }}
        >
          {note.title}
        </h3>

        <p
          className="font-ui"
          style={{
            marginTop: 12,
            fontSize: 13.5,
            lineHeight: 1.6,
            color: 'var(--text-muted)',
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            flexGrow: 1,
          }}
        >
          {note.excerpt}
        </p>

        <div className="flex items-center justify-between mt-5">
          <span
            className="font-ui"
            style={{ fontSize: 11, color: 'var(--text-dim)', fontWeight: 500 }}
          >
            {formatDate(note.date)} · {note.readTime}
          </span>
          <span
            className="flex items-center gap-1.5 font-ui"
            style={{ fontSize: 12.5, color: 'var(--gold)', fontWeight: 600 }}
          >
            <span className="read-excerpt">Read excerpt</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </span>
        </div>
      </div>
    </motion.a>
  )
}
