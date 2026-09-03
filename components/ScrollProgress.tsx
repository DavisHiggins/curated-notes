'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Vertical twin of ReadingProgress, used on the feed page in place of the
 * native scrollbar. Same spring, same gradient, same glow — rotated so it
 * fills top to bottom, and inset to the middle 60% of the viewport.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: '20%',
        bottom: '20%',
        right: 0,
        width: 2,
        zIndex: 100,
        background: 'linear-gradient(180deg, #C9A84C 0%, #E4C06E 45%, #0055FF 100%)',
        boxShadow: '0 0 12px rgba(0,85,255,0.4)',
        transformOrigin: 'top',
        scaleY,
      }}
      aria-hidden
    />
  )
}
