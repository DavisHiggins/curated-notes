'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    let lenis: Lenis | undefined
    let cleanup: (() => void) | undefined

    ;(async () => {
      const gsapModule = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      const gsap = gsapModule.default ?? gsapModule.gsap
      gsap.registerPlugin(ScrollTrigger)

      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })

      // Expose for anchor scrolling (e.g. the note-page back link to #all-notes).
      ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis

      // Keep GSAP ScrollTrigger in sync with Lenis smooth scroll.
      lenis.on('scroll', ScrollTrigger.update)

      const ticker = (time: number) => {
        lenis?.raf(time * 1000)
      }
      gsap.ticker.add(ticker)
      gsap.ticker.lagSmoothing(0)

      cleanup = () => {
        gsap.ticker.remove(ticker)
        lenis?.destroy()
      }
    })()

    return () => {
      if (cleanup) cleanup()
      else lenis?.destroy()
    }
  }, [])

  return <>{children}</>
}
