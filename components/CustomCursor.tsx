'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return
    }
    setEnabled(true)

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { x: mouse.x, y: mouse.y }
    let hovering = false
    let raf = 0

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x - 2.5}px, ${mouse.y - 2.5}px, 0)`
      }
    }

    const isInteractive = (el: Element | null): boolean => {
      if (!el) return false
      return Boolean(
        el.closest('a, button, [data-cursor="pointer"], input, textarea, select')
      )
    }

    const onOver = (e: MouseEvent) => {
      hovering = isInteractive(e.target as Element)
    }

    const tick = () => {
      ring.x += (mouse.x - ring.x) * 0.18
      ring.y += (mouse.y - ring.y) * 0.18
      if (ringRef.current) {
        const size = hovering ? 50 : 34
        ringRef.current.style.width = `${size}px`
        ringRef.current.style.height = `${size}px`
        ringRef.current.style.borderColor = hovering
          ? '#0055FF'
          : 'rgba(201,168,76,0.45)'
        ringRef.current.style.boxShadow = hovering
          ? '0 0 14px rgba(0,85,255,0.45)'
          : '0 0 0 rgba(0,85,255,0)'
        ringRef.current.style.transform = `translate3d(${ring.x - size / 2}px, ${
          ring.y - size / 2
        }px, 0)`
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 5,
          height: 5,
          borderRadius: '50%',
          background: '#C9A84C',
          pointerEvents: 'none',
          zIndex: 9997,
          willChange: 'transform',
        }}
        aria-hidden
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 34,
          height: 34,
          borderRadius: '50%',
          border: '1.5px solid rgba(201,168,76,0.45)',
          pointerEvents: 'none',
          zIndex: 9997,
          willChange: 'transform, width, height',
          transition:
            'width 0.18s ease, height 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease',
        }}
        aria-hidden
      />
    </>
  )
}
