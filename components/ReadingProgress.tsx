'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 100,
        background: 'linear-gradient(90deg, #C9A84C 0%, #E4C06E 45%, #0055FF 100%)',
        boxShadow: '0 0 12px rgba(0,85,255,0.4)',
        transformOrigin: 'left',
        scaleX,
      }}
      aria-hidden
    />
  )
}
