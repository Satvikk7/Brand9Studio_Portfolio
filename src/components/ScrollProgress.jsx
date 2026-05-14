import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useLocation } from 'react-router-dom'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const location = useLocation()

  // On project pages, shift up to avoid overlapping the "Back to Gallery" button
  const isProjectPage = location.pathname.startsWith('/project/')
  const bottomClass = isProjectPage ? 'bottom-24 sm:bottom-28' : 'bottom-8'

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`fixed right-4 sm:right-8 z-[100] ${bottomClass} transition-[bottom] duration-300`}
    >
      <button 
        onClick={scrollToTop}
        className="relative w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center group"
      >
        {/* Radial Progress SVG */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
          <circle
            cx="28"
            cy="28"
            r="24"
            className="stroke-white/10 fill-none"
            strokeWidth="2"
          />
          <motion.circle
            cx="28"
            cy="28"
            r="24"
            className="stroke-brand-lime fill-none"
            strokeWidth="2"
            strokeDasharray="0 1"
            style={{ pathLength }}
          />
        </svg>

        {/* Center Island */}
        <div className="absolute inset-1.5 sm:inset-2 bg-brand-dark/40 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-brand-lime/20 group-hover:border-brand-lime/40">
          <ArrowUp size={14} className="sm:hidden text-white group-hover:text-brand-lime group-hover:-translate-y-1 transition-all" />
          <ArrowUp size={18} className="hidden sm:block text-white group-hover:text-brand-lime group-hover:-translate-y-1 transition-all" />
        </div>
      </button>
    </motion.div>
  )
}
