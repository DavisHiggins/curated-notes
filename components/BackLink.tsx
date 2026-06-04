'use client'

import { motion } from 'framer-motion'

export function BackLink() {
  return (
    <motion.a
      href="/"
      className="group inline-flex items-center gap-1.5 font-body"
      style={{ fontSize: 13, color: 'var(--text-muted)' }}
      whileHover={{ x: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      data-cursor="pointer"
    >
      <span aria-hidden>←</span>
      <span className="transition-colors group-hover:text-[var(--gold)]">
        Curated Notes
      </span>
    </motion.a>
  )
}
