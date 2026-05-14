import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function BeforeAfterSlider({ 
  beforeImage = "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1200", 
  afterImage = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
  beforeLabel = "Original",
  afterLabel = "Growth-Ready"
}) {
  const [sliderPos, setSliderPos] = useState(50)
  const containerRef = useRef(null)

  const handleMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX || e.touches?.[0]?.clientX) - rect.left) / rect.width
    setSliderPos(Math.max(0, Math.min(100, x * 100)))
  }

  return (
    <div 
      ref={containerRef}
      className="relative aspect-video rounded-2xl overflow-hidden cursor-ew-resize select-none premium-card border border-white/10 group"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {/* After Image (Base) */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${afterImage})` }}
      />
      <div className="absolute bottom-4 right-4 bg-brand-lime text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest z-20">
        {afterLabel}
      </div>

      {/* Before Image (Overlay) */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center overflow-hidden"
        style={{ 
          backgroundImage: `url(${beforeImage})`,
          width: `${sliderPos}%`
        }}
      >
        <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest min-w-max">
          {beforeLabel}
        </div>
      </motion.div>

      {/* Slider Handle */}
      <div 
        className="absolute inset-y-0 z-30"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute inset-y-0 -left-[1px] w-[2px] bg-white group-hover:bg-brand-lime transition-colors duration-300 shadow-[0_0_15px_rgba(196,239,71,0.5)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-2xl">
          <div className="flex gap-1">
            <div className="w-[2px] h-3 bg-brand-dark/20 rounded-full" />
            <div className="w-[2px] h-3 bg-brand-dark/20 rounded-full" />
          </div>
        </div>
      </div>
      
      {/* Hover Instruction */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <span className="bg-black/60 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full text-xs font-bold text-white uppercase tracking-widest">
          Slide to compare
        </span>
      </div>
    </div>
  )
}
