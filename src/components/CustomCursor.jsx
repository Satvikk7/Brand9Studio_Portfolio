import { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false)
  const [isText, setIsText] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [hasPointer, setHasPointer] = useState(false)

  // Direct MotionValues — set synchronously inside pointermove, zero latency
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Visibility as MotionValue: avoids a React re-render on every enter/leave
  const opacity = useMotionValue(0)

  // Near-zero-latency spring: stiffness 500/damping 28/mass 0.5 closely tracks the pointer
  const springConfig = { stiffness: 500, damping: 28, mass: 0.5 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  // Refs for hover-state detection loop — avoids stale closure issues
  const lastTargetRef = useRef(null)
  const hoverRafRef = useRef(null)
  const pendingTargetRef = useRef(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)')
    setHasPointer(mediaQuery.matches)
    if (!mediaQuery.matches) return

    // ─── Hover-state detection (RAF-throttled: reads DOM, can be one frame behind) ───
    const processHoverState = () => {
      hoverRafRef.current = null
      const target = pendingTargetRef.current
      if (!target || target === lastTargetRef.current) return
      lastTargetRef.current = target

      const tagName = target.tagName ? target.tagName.toLowerCase() : ''

      const isClickable =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('input[type="submit"]') ||
        target.closest('input[type="button"]')

      if (isClickable) {
        setIsPointer(true)
        setIsText(false)
        return
      }

      const isHeroElement = !!target.closest('#hero')
      const isTextElement =
        !isHeroElement &&
        ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'li', 'label', 'input', 'textarea'].includes(tagName)

      if (isTextElement) {
        setIsPointer(false)
        setIsText(true)
        return
      }

      // Fallback: getComputedStyle only on target change (already one per new element)
      try {
        const computedCursor = window.getComputedStyle(target).cursor
        if (computedCursor === 'pointer') {
          setIsPointer(true)
          setIsText(false)
        } else if (computedCursor === 'text' && !isHeroElement) {
          setIsPointer(false)
          setIsText(true)
        } else {
          setIsPointer(false)
          setIsText(false)
        }
      } catch {
        setIsPointer(false)
        setIsText(false)
      }
    }

    // ─── Position tracking: DIRECT set, no RAF, no throttle ───
    // useMotionValue.set() is synchronous but off the React render tree —
    // calling it here gives the lowest possible latency before the spring takes over.
    const handlePointerMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      opacity.set(1)

      // Queue hover-state detection in next frame (DOM reads are cheap but deferred)
      pendingTargetRef.current = e.target
      if (!hoverRafRef.current) {
        hoverRafRef.current = window.requestAnimationFrame(processHoverState)
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => opacity.set(0)
    const handleMouseEnter = () => opacity.set(1)

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown, { passive: true })
    window.addEventListener('mouseup', handleMouseUp, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true })

    return () => {
      if (hoverRafRef.current) window.cancelAnimationFrame(hoverRafRef.current)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mouseX, mouseY, opacity])

  if (!hasPointer) return null

  const cursorContent = (
    <motion.div
      className="fixed top-0 left-0 z-[99999] pointer-events-none mix-blend-difference"
      style={{
        x,
        y,
        opacity,
        translateX: '-5%',
        translateY: '-5%',
        willChange: 'transform, opacity',
      }}
    >
      {/* Primary Cursor Body */}
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          scale: isClicking ? 0.8 : isPointer ? 1.4 : isText ? 1.1 : 1,
          rotate: isText ? 0 : -120,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {isText ? (
          // I-Beam (Text Cursor)
          <path
            d="M12 5V19M9 5H15M9 19H15"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ) : (
          // Arrowhead
          <path
            d="M3 3L21 12L3 21L7 12L3 3Z"
            fill={isPointer ? "#C4EF47" : "#FFFFFF"}
            stroke="#C4EF47"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        )}
      </motion.svg>

      {/* Outer Ring for hover effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-brand-lime/30"
        animate={{
          scale: isPointer ? 2.5 : 0,
          opacity: isPointer ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )

  return typeof document !== 'undefined' ? createPortal(cursorContent, document.body) : null
}
