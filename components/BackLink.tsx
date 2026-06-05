'use client'

import { motion } from 'framer-motion'

export function BackLink() {
  return (
    <motion.a
      href="/#all-notes"
      className="group inline-flex items-center gap-1.5 font-ui"
      style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}
      data-cursor="pointer"
    >
      <motion.span aria-hidden whileHover={{ x: -5 }} className="inline-block">
        ←
      </motion.span>
      <span className="transition-colors duration-200 group-hover:text-[var(--gold)]">
        Curated Notes
      </span>
    </motion.a>
  )
}
