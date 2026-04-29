import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/10 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <img src="/logo.png" alt="Brand9 Studio Logo" className="h-10 w-auto" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {['About', 'Services', 'Work', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-brand-smoke hover:text-brand-lime font-inter text-sm tracking-wider uppercase transition-colors"
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            className="px-6 py-2 bg-brand-lime text-black font-outfit font-bold text-sm rounded-full hover:scale-105 active:scale-95 transition-all"
          >
            GET STARTED
          </a>
        </div>

        {/* Mobile Menu Icon (Simplified for now) */}
        <div className="md:hidden w-6 h-6 flex flex-col justify-center gap-1.5 cursor-pointer">
          <div className="w-full h-0.5 bg-white" />
          <div className="w-2/3 h-0.5 bg-brand-lime" />
          <div className="w-full h-0.5 bg-white" />
        </div>
      </div>
    </motion.nav>
  )
}
