import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Preloader({ onComplete }) {
  const brandWords = ["CLEAN", "STRATEGIC", "POWERFUL", "BRAND9"]
  const [showOnlyNine, setShowOnlyNine] = useState(false)
  const [isZooming, setIsZooming] = useState(false)

  useEffect(() => {
    // Elegant vertical roll completes at 1.6s.
    // Settle for a brief 150ms beat (at 1.75s) to read "BRAND9", then start GPU-accelerated glide
    const timer1 = setTimeout(() => {
      setShowOnlyNine(true)
    }, 1750)

    // Butter-smooth 350ms decoupled glide finishes (at 2.1s), locking logo in dead center
    const timer2 = setTimeout(() => {
      setIsZooming(true)
    }, 2100)

    // Complete preloading once the hyper-speed 0.5s zoom finishes (at 2.6s)
    const timer3 = setTimeout(() => {
      onComplete()
    }, 2600)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-[10000] overflow-hidden pointer-events-none select-none">
      {/* SVG Mask Background - reveals website through the expanding circular hole in the absolute center (50%, 50%) */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <mask id="preloader-mask">
            {/* Solid white canvas (everything is visible/dark by default) */}
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {/* Black circle (transparent hole) centered exactly at (50%, 50%) */}
            <motion.circle
              cx="50%"
              cy="50%"
              r="10"
              fill="black"
              style={{ transformOrigin: '50% 50%', willChange: 'transform' }}
              initial={{ scale: 0 }}
              animate={isZooming ? { scale: 300 } : { scale: 0 }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }} // Hyper-drive 0.5s GPU zoom
            />
          </mask>
        </defs>
        {/* The solid dark preloader background masked by our zooming hole */}
        <rect x="0" y="0" width="100%" height="100%" fill="#050505" mask="url(#preloader-mask)" />
      </svg>

      {/* Content Layer */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        {!showOnlyNine ? (
          /* Step 1: Restored Vertical Slot Roll - Using your custom studio9 PNG logo directly! */
          <div className="relative flex flex-col items-center">
            <div className="h-12 overflow-hidden mb-4">
              <motion.div
                style={{ willChange: 'transform' }}
                animate={{ y: [0, -48, -96, -144] }}
                transition={{ 
                  duration: 1.6, // Premium stately 1.6s slot roll
                  times: [0, 0.33, 0.66, 1.0],
                  ease: ["easeInOut", "easeInOut", "easeInOut"],
                  repeat: 0
                }}
                className="flex flex-col items-center"
              >
                <span className="text-4xl font-black text-white h-12 flex items-center tracking-tighter">
                  CLEAN
                </span>
                <span className="text-4xl font-black text-white h-12 flex items-center tracking-tighter">
                  STRATEGIC
                </span>
                <span className="text-4xl font-black text-white h-12 flex items-center tracking-tighter">
                  POWERFUL
                </span>
                <span className="text-4xl font-black text-white h-12 flex items-center tracking-tighter">
                  <span className="mr-2">BRAND</span>
                  {/* Your premium custom lime studio9 logo! */}
                  <img 
                    src="/studio9.png" 
                    alt="9" 
                    className="h-10 w-auto inline-block align-middle" 
                    style={{ verticalAlign: 'middle', willChange: 'transform' }}
                  />
                </span>
              </motion.div>
            </div>

            {/* Progress Bar synchronized with roll */}
            <div className="w-48 h-[2px] bg-white/10 relative overflow-hidden rounded-full">
              <motion.div
                style={{ willChange: 'transform' }}
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 1.6, ease: "easeInOut" }} // Synchronized with 1.6s slot roll
                className="absolute inset-0 bg-brand-lime"
              />
            </div>
          </div>
        ) : (
          /* Step 2: Symmetrical Portal Zoom - Old words are 100% GONE from DOM! */
          <div className="relative flex items-center justify-center text-4xl sm:text-5xl font-black tracking-tighter">
            {/* "BRAND" text: Fades out and glides left using 100% GPU-accelerated transforms (no layout reflow) */}
            <motion.span
              style={{ willChange: 'transform, opacity' }}
              initial={{ opacity: 1, x: 0 }}
              animate={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }} // Elegant 350ms fade
              className="text-white whitespace-nowrap mr-2 inline-block"
            >
              BRAND
            </motion.span>

            {/* Your premium custom lime logo: centered exactly at (50%, 50%), zooms through its center hole using 100% GPU translation */}
            <motion.img
              src="/studio9.png"
              alt="9"
              className="h-12 w-auto inline-block align-middle"
              style={{ 
                transformOrigin: '50% 51%', // Absolute geometric center of the number 9 loop hole
                display: 'inline-block',
                verticalAlign: 'middle',
                willChange: 'transform, opacity'
              }}
              initial={{ x: 0, scale: 1 }}
              animate={
                isZooming 
                  ? { x: '-2.0em', scale: 95, opacity: [1, 1, 0] } // Locks the centering GPU translate during colossal scale zoom
                  : { x: '-2.0em', scale: 1.15 } // Glides smoothly to absolute center in a pure GPU space
              }
              transition={
                isZooming
                  ? { duration: 0.5, ease: [0.76, 0, 0.24, 1], opacity: { times: [0, 0.6, 1], duration: 0.5 } } // Hyper-drive 0.5s zoom
                  : { duration: 0.35, ease: [0.76, 0, 0.24, 1] } // Butter-smooth custom cubic-bezier 350ms glide
              }
            />
          </div>
        )}
      </div>

      {/* Subtle Background Glow - Fades out before zoom */}
      <motion.div 
        animate={showOnlyNine ? { opacity: 0 } : { opacity: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-lime/10 blur-[100px] rounded-full pointer-events-none" 
      />
    </div>
  )
}
