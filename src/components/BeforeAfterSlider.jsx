import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function BeforeAfterSlider({ 
  beforeImage = "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1200", 
  afterImage = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
  beforeLabel = "Original",
  afterLabel = "Growth-Ready"
}) {
  const containerRef = useRef(null)
  
  // High-performance motion value for the slider coordinate
  const progressVal = useMotionValue(50)
  
  // Premium spring physics for liquid comparisons
  const springProgress = useSpring(progressVal, {
    stiffness: 120,
    damping: 22,
    mass: 0.3
  })
  
  // Transform spring progress to CSS properties
  const beforeWidth = useTransform(springProgress, (val) => `${val}%`)
  const handleLeft = useTransform(springProgress, (val) => `${val}%`)

  const handleMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const clientX = e.clientX || e.touches?.[0]?.clientX
    if (clientX === undefined) return
    
    const x = (clientX - rect.left) / rect.width
    progressVal.set(Math.max(0, Math.min(100, x * 100)))
  }

  const handleMouseLeave = () => {
    // Elegant floating recoil back to exact center when mouse departs
    progressVal.set(50)
  }

  return (
    <div 
      ref={containerRef}
      className="relative aspect-video rounded-2xl overflow-hidden cursor-ew-resize select-none premium-card border border-white/10 group will-change-transform"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* After Image (Base) */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${afterImage})` }}
      />
      <div className="absolute bottom-4 right-4 bg-brand-lime text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest z-20 shadow-md">
        {afterLabel}
      </div>

      {/* Before Image (Overlay) */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center overflow-hidden"
        style={{ 
          backgroundImage: `url(${beforeImage})`,
          width: beforeWidth
        }}
      >
        <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest min-w-max shadow-md">
          {beforeLabel}
        </div>
      </motion.div>

      {/* Slider Handle with premium vertical line glow */}
      <motion.div 
        className="absolute inset-y-0 z-30 pointer-events-none"
        style={{ left: handleLeft }}
      >
        <div className="absolute inset-y-0 -left-[1px] w-[2px] bg-white group-hover:bg-brand-lime transition-colors duration-300 shadow-[0_0_15px_rgba(196,239,71,0.6)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
          <div className="flex gap-1">
            <div className="w-[2px] h-3 bg-brand-dark/20 rounded-full" />
            <div className="w-[2px] h-3 bg-brand-dark/20 rounded-full" />
          </div>
        </div>
      </motion.div>
      
      {/* Hover Instruction */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <span className="bg-black/60 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full text-xs font-bold text-white uppercase tracking-widest shadow-2xl">
          Slide to compare
        </span>
      </div>
    </div>
  )
}
