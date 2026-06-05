'use client'

import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Route transition: a thin gold bar sweeps left-to-right then out on each
 * navigation, while the page content fades in. Keyed on pathname.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Gold sweep bar, replays on every route change via keyed remount. */}
      <motion.div
        key={`bar-${pathname}`}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'var(--gold)',
          transformOrigin: 'left',
          zIndex: 200,
          pointerEvents: 'none',
        }}
        initial={{ scaleX: 0 }}
        animate={{
          scaleX: [0, 1, 1, 0],
          transformOrigin: ['left', 'left', 'right', 'right'],
        }}
        transition={{ duration: 0.55, times: [0, 0.45, 0.55, 1], ease: 'easeInOut' }}
      />
    </>
  )
}
