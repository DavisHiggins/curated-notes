'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'

// Tints a dark logo to gold.
const GOLD_FILTER =
  'brightness(0) saturate(100%) invert(74%) sepia(45%) saturate(600%) hue-rotate(5deg) brightness(95%)'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 60)
  })

  return (
    <motion.header
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 py-3.5"
      style={{
        background: scrolled ? 'rgba(6,8,15,0.88)' : 'rgba(6,8,15,0)',
        backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
        borderBottom: scrolled
          ? '1px solid rgba(201,168,76,0.12)'
          : '1px solid rgba(201,168,76,0)',
        transition:
          'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
      }}
    >
      <a
        href="/"
        className="group flex items-center gap-3.5"
        data-cursor="pointer"
        aria-label="Curated Notes home"
      >
        {/* TODO: Replace with SVG for draw-on animation. Only a PNG logo is
            provided, so a static gold-tinted image is used (see Section 10). */}
        <Image
          src="/cnoteslogo.png"
          alt="Davis Higgins logo"
          width={52}
          height={52}
          priority
          className="transition-transform duration-300 group-hover:scale-[1.04]"
          style={{
            height: 'clamp(38px, 6vw, 52px)',
            width: 'auto',
            filter: GOLD_FILTER,
          }}
        />

        <span
          aria-hidden
          style={{
            width: 1,
            height: 26,
            background: 'rgba(201,168,76,0.3)',
          }}
        />

        <span className="flex flex-col leading-none">
          <span
            className="font-ui"
            style={{
              color: 'var(--text)',
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              borderBottom: scrolled
                ? '1px solid rgba(201,168,76,0.2)'
                : '1px solid transparent',
              paddingBottom: 2,
              transition: 'border-color 0.4s ease',
            }}
          >
            DAVIS HIGGINS
          </span>
          <span
            className="font-ui"
            style={{
              color: 'var(--text-muted)',
              fontWeight: 400,
              fontSize: 11,
              letterSpacing: '0.08em',
              marginTop: 3,
            }}
          >
            Curated Notes
          </span>
        </span>
      </a>

      <motion.a
        href="https://davishiggins.com"
        className="font-ui group inline-flex items-center gap-1.5"
        style={{ color: 'var(--text-muted)', fontSize: 12, fontWeight: 500 }}
        whileHover={{ x: -2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        data-cursor="pointer"
      >
        <motion.span aria-hidden whileHover={{ x: -4 }} className="inline-block">
          ←
        </motion.span>
        <span className="transition-colors duration-200 group-hover:text-[var(--gold)]">
          davishiggins.com
        </span>
      </motion.a>
    </motion.header>
  )
}
