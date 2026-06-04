'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 py-4"
      style={{
        background: 'rgba(5,7,11,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <a href="/" className="flex items-center gap-3" data-cursor="pointer" aria-label="Curated Notes home">
        <span
          className="flex items-center justify-center rounded-lg overflow-hidden"
          style={{
            width: 40,
            height: 40,
            background: '#fff',
          }}
        >
          <Image
            src="/dh-logo.png"
            alt="Davis Higgins logo"
            width={32}
            height={32}
            style={{ objectFit: 'contain' }}
            priority
          />
        </span>
        <span className="flex flex-col leading-none">
          <span
            className="font-display"
            style={{
              color: 'var(--gold)',
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: '0.02em',
            }}
          >
            DAVIS HIGGINS
          </span>
          <span
            className="font-body"
            style={{ color: 'var(--text-muted)', fontSize: 11, marginTop: 2 }}
          >
            Curated Notes
          </span>
        </span>
      </a>

      <motion.a
        href="https://davishiggins.com"
        className="font-body group inline-flex items-center gap-1"
        style={{ color: 'var(--text-muted)', fontSize: 13 }}
        whileHover={{ x: -3 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        data-cursor="pointer"
      >
        <span aria-hidden>←</span>
        <span className="border-b border-transparent transition-colors group-hover:border-[var(--gold)] group-hover:text-[var(--gold)]">
          davishiggins.com
        </span>
      </motion.a>
    </header>
  )
}
