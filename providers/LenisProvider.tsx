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
        // Higher lerp tracks the wheel more tightly and settles quickly,
        // so there is little drift after the user stops scrolling.
        lerp: 0.14,
        wheelMultiplier: 1,
        smoothWheel: true,
        touchMultiplier: 1.6,
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
