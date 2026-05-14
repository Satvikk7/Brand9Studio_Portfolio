import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false)
  const [isText, setIsText] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [hasPointer, setHasPointer] = useState(false)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring physics for smooth movement
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  useEffect(() => {
    // Check if device has a fine pointer (mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)')
    setHasPointer(mediaQuery.matches)
    
    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true)
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      
      const target = e.target
      const computedCursor = window.getComputedStyle(target).cursor
      const tagName = target.tagName.toLowerCase()
      
      const isClickable = 
        target.closest('button') || 
        target.closest('a') || 
        target.closest('[role="button"]') ||
        computedCursor === 'pointer'
      
      const isHeroElement = !!target.closest('#hero')
      
      const isTextElement = 
        !isHeroElement && (
          ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'li', 'label', 'input', 'textarea'].includes(tagName) ||
          computedCursor === 'text'
        )
      
      setIsPointer(!!isClickable)
      setIsText(!!isTextElement && !isClickable)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    if (mediaQuery.matches) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mousedown', handleMouseDown)
      window.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('mouseleave', handleMouseLeave)
      document.addEventListener('mouseenter', handleMouseEnter)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [mouseX, mouseY, isVisible])

  if (!hasPointer) return null

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      style={{
        x,
        y,
        translateX: '-5%',
        translateY: '-5%',
      }}
    >
      {/* Primary Cursor Body */}
      <motion.svg
        width="28"
        height="28"
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
}
