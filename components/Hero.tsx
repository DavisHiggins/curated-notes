'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

function splitChars(text: string, baseDelay: number, color?: string) {
  return text.split('').map((char, i) => (
    <span
      key={i}
      style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}
    >
      <motion.span
        style={{ display: 'inline-block', color }}
        initial={{ y: '110%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{
          duration: 0.7,
          delay: baseDelay + i * 0.04,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {char === ' ' ? ' ' : char}
      </motion.span>
    </span>
  ))
}

type LenisLike = {
  scrollTo: (
    target: string | number | HTMLElement,
    opts?: { offset?: number }
  ) => void
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const jumpTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis
    if (lenis) lenis.scrollTo(el, { offset: -90 })
    else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let ctx: { revert: () => void } | undefined
    let cancelled = false

    ;(async () => {
      const gsapModule = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      if (cancelled) return
      const gsap = gsapModule.default ?? gsapModule.gsap
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        // Cinematic push-away as the feed scrolls up over the hero.
        gsap.to(contentRef.current, {
          opacity: 0,
          scale: 0.97,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }, sectionRef)
    })()

    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center overflow-hidden"
      style={{ minHeight: '100dvh' }}
    >
      {/* Decorative floating number */}
      <span
        aria-hidden
        className="font-display absolute pointer-events-none select-none"
        style={{
          right: '-2%',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: 'clamp(180px, 22vw, 280px)',
          fontWeight: 800,
          color: 'var(--text)',
          opacity: 0.025,
          lineHeight: 1,
        }}
      >
        01
      </span>

      {/* Ambient pulsing glow behind the title (gold + electric blue) */}
      <div
        aria-hidden
        className="glow-pulse absolute pointer-events-none"
        style={{
          left: '30%',
          top: '50%',
          width: 'min(720px, 70vw)',
          height: 420,
          background:
            'radial-gradient(ellipse at 35% 45%, rgba(201,168,76,0.16) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(0,85,255,0.12) 0%, transparent 62%)',
          filter: 'blur(30px)',
          zIndex: 0,
        }}
      />

      <div
        ref={contentRef}
        className="relative w-full"
        style={{ paddingLeft: '15%', paddingRight: '6%', zIndex: 1 }}
      >
        {/* Decorative shimmer rule + eyebrow */}
        <div className="flex items-center gap-4 mb-7">
          <motion.span
            aria-hidden
            className="rule-shimmer block"
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: 2, borderRadius: 2 }}
          />
          <motion.span
            className="font-ui"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            style={{
              fontSize: 10,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              fontWeight: 500,
            }}
          >
            notes.davishiggins.com
          </motion.span>
        </div>

        <h1
          className="font-display"
          style={{
            margin: 0,
            fontWeight: 800,
            lineHeight: 0.88,
            fontSize: 'clamp(52px, 9vw, 120px)',
          }}
        >
          <span className="block" style={{ color: 'var(--text)' }}>
            {splitChars('CURATED', 0.2)}
          </span>
          <span className="block" style={{ fontStyle: 'italic', color: 'var(--gold)' }}>
            {splitChars('NOTES.', 0.5, 'var(--gold)')}
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.85, ease: 'easeOut' }}
          style={{ marginTop: 28, maxWidth: 480 }}
        >
          <p
            className="font-ui"
            style={{
              fontSize: 16,
              lineHeight: 1.65,
              color: 'var(--text-muted)',
              margin: 0,
            }}
          >
            A public notebook by Davis Higgins. Data science, AI, building, faith,
            and the systems behind the work.
          </p>

          {/* Jump links, left-aligned beneath the text: Featured, then All Notes */}
          <div className="flex flex-wrap items-center gap-3" style={{ marginTop: 22 }}>
            <a
              href="#featured"
              onClick={jumpTo('featured')}
              data-cursor="pointer"
              className="all-notes-btn group inline-flex items-center gap-2.5"
            >
              <span
                className="font-ui"
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                Featured
              </span>
              <motion.span
                aria-hidden
                className="inline-block"
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                style={{ fontSize: 14, lineHeight: 1 }}
              >
                ↓
              </motion.span>
            </a>

            <a
              href="#all-notes"
              onClick={jumpTo('all-notes')}
              data-cursor="pointer"
              className="all-notes-btn group inline-flex items-center gap-2.5"
            >
              <span
                className="font-ui"
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                All Notes
              </span>
              <motion.span
                aria-hidden
                className="inline-block"
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut', delay: 0.2 }}
                style={{ fontSize: 14, lineHeight: 1 }}
              >
                ↓
              </motion.span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator, bottom-left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.1 }}
        className="absolute flex flex-col items-center gap-3"
        style={{ left: '50%', transform: 'translateX(-50%)', bottom: 40, zIndex: 1 }}
        aria-hidden
      >
        <span
          className="font-ui"
          style={{
            fontSize: 9,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}
        >
          Scroll
        </span>
        <span
          className="scroll-line"
          style={{
            width: 1,
            height: 40,
            background: 'linear-gradient(180deg, var(--gold) 0%, var(--blue) 100%)',
            opacity: 0.6,
          }}
        />
      </motion.div>
    </section>
  )
}
