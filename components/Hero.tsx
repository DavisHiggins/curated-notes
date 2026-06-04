'use client'

import { useEffect, useRef } from 'react'

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const curatedRef = useRef<HTMLSpanElement>(null)
  const notesRef = useRef<HTMLSpanElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const titleWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let ctx: { revert: () => void } | undefined
    let cancelled = false

    ;(async () => {
      const gsapModule = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      if (cancelled) return

      const gsap = gsapModule.default ?? gsapModule.gsap
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        if (prefersReduced) {
          gsap.set(
            [
              eyebrowRef.current,
              curatedRef.current,
              notesRef.current,
              subtitleRef.current,
              scrollRef.current,
            ],
            { opacity: 1, x: 0, y: 0 }
          )
          return
        }

        const tl = gsap.timeline()

        tl.from(eyebrowRef.current, {
          opacity: 0,
          y: 12,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.2,
        })
          .from(
            curatedRef.current,
            { x: -120, opacity: 0, duration: 1, ease: 'power3.out' },
            0.3
          )
          .from(
            notesRef.current,
            { x: 120, opacity: 0, duration: 1, ease: 'power3.out' },
            0.4
          )
          .from(
            subtitleRef.current,
            { opacity: 0, y: 16, duration: 0.8, ease: 'power2.out' },
            0.6
          )
          .from(
            scrollRef.current,
            { opacity: 0, duration: 0.8, ease: 'power2.out' },
            1
          )

        // ScrollTrigger hero exit — cinematic push-away
        gsap.to(titleWrapRef.current, {
          scale: 0.96,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }, rootRef)
    })()

    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [])

  return (
    <section
      ref={rootRef}
      className="relative flex items-center"
      style={{ minHeight: '100dvh' }}
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10">
        <div ref={titleWrapRef} className="max-w-[920px]" style={{ marginLeft: '2%' }}>
          <p
            ref={eyebrowRef}
            className="font-body"
            style={{
              fontSize: 10,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--gold-dim)',
              marginBottom: 24,
            }}
          >
            notes.davishiggins.com
          </p>

          <h1
            className="font-display"
            style={{ margin: 0, lineHeight: 0.9, fontWeight: 800 }}
          >
            <span
              ref={curatedRef}
              className="block"
              style={{
                fontSize: 'clamp(72px, 11vw, 160px)',
                color: '#fff',
                fontWeight: 800,
              }}
            >
              CURATED
            </span>
            <span
              ref={notesRef}
              className="block"
              style={{
                fontSize: 'clamp(72px, 11vw, 160px)',
                color: 'var(--gold)',
                fontStyle: 'italic',
                fontWeight: 800,
              }}
            >
              NOTES
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="font-body"
            style={{
              marginTop: 28,
              fontSize: 16,
              lineHeight: 1.6,
              color: 'var(--text-muted)',
              maxWidth: 480,
            }}
          >
            Thinking out loud on data science, AI, and building.
          </p>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="scroll-indicator absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ bottom: 36, color: 'var(--text-muted)' }}
        aria-hidden
      >
        <span
          className="font-body"
          style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase' }}
        >
          Scroll
        </span>
        <span style={{ fontSize: 16, lineHeight: 1 }}>↓</span>
      </div>
    </section>
  )
}
