import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Magnetic({ children, strength = 0.5 }) {
  const ref = useRef(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 150, damping: 15, mass: 0.1 })
  const y = useSpring(rawY, { stiffness: 150, damping: 15, mass: 0.1 })

  let rafId = null

  const handleMouseMove = (e) => {
    if (rafId) return
    rafId = window.requestAnimationFrame(() => {
      rafId = null
      if (!ref.current) return
      const { clientX, clientY } = e
      const { width, height, left, top } = ref.current.getBoundingClientRect()
      rawX.set((clientX - (left + width / 2)) * strength)
      rawY.set((clientY - (top + height / 2)) * strength)
    })
  }

  const handleMouseLeave = () => {
    if (rafId) window.cancelAnimationFrame(rafId)
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
    >
      {children}
    </motion.div>
  )
}
