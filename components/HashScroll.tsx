'use client'

import { useEffect } from 'react'

type LenisLike = {
  scrollTo: (target: string | number | HTMLElement, opts?: { offset?: number }) => void
}

/**
 * When the home page loads with a hash (e.g. /#all-notes from the note-page
 * back link), scroll to that section instead of the top. Uses the Lenis
 * instance when available so the motion stays smooth.
 */
export function HashScroll() {
  useEffect(() => {
    if (window.location.hash !== '#all-notes') return
    const el = document.getElementById('all-notes')
    if (!el) return

    const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis

    const run = () => {
      if (lenis) {
        lenis.scrollTo(el, { offset: -90 })
      } else {
        const y = el.getBoundingClientRect().top + window.scrollY - 90
        window.scrollTo(0, y)
      }
    }

    // Wait for layout to settle, then scroll (twice, in case fonts shift layout).
    const t1 = setTimeout(run, 120)
    const t2 = setTimeout(run, 420)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return null
}
