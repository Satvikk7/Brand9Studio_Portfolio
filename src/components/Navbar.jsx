import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRef } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { label: 'Work Gallery', id: 'work' },
    { label: 'Case Studies', id: 'case-studies' },
    { label: 'Services', id: 'services' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' }
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observedIds = ['hero', ...navItems.map((n) => n.id)]
    let rafId = null

    const updateActiveSection = () => {
      if (manualScrollRef.current) return

      const triggerPoint = window.scrollY + 180
      let nextActive = 'hero'

      for (const id of observedIds) {
        const element = document.getElementById(id)
        if (!element) continue

        const top = element.getBoundingClientRect().top + window.scrollY

        if (top <= triggerPoint) {
          nextActive = id
        } else {
          break
        }
      }

      setActiveSection((current) => (current === nextActive ? current : nextActive))
    }

    const handleScroll = () => {
      if (rafId) return
      rafId = window.requestAnimationFrame(() => {
        rafId = null
        updateActiveSection()
      })
    }

    updateActiveSection()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  const manualScrollRef = useRef(false)
  const scrollCancelTimer = useRef(null)
  const mobileNavTapLock = useRef(false)

  const scrollToSection = (id) => {
    const target = document.getElementById(id)
    if (!target) return

    // prevent intersection observer from fighting the programmatic scroll
    manualScrollRef.current = true

    setActiveSection(id)
    // close menu first, then start scroll on next frame to avoid layout interruption
    setMobileMenuOpen(false)

    const offset = 88
    const start = window.scrollY
    const targetTop = target.getBoundingClientRect().top + window.scrollY - offset

    // start smooth scroll after a tick so menu collapse doesn't block the scroll
    setTimeout(() => {
      window.scrollTo({ top: targetTop, behavior: 'smooth' })
    }, 60)

    // clear existing timer
    if (scrollCancelTimer.current) clearTimeout(scrollCancelTimer.current)

    // re-enable observer after expected scroll duration or when close enough
    const distance = Math.abs(targetTop - start)
    const estimated = Math.min(1200, 300 + distance / 2)

    scrollCancelTimer.current = setTimeout(() => {
      manualScrollRef.current = false
      setActiveSection(id)
    }, estimated)
  }

  const handleNavClick = (event, id) => {
    event.preventDefault()
    event.stopPropagation()
    scrollToSection(id)
  }

  const handleMobileNavClick = (event, id) => {
    event.preventDefault()
    event.stopPropagation()

    if (mobileNavTapLock.current) return
    mobileNavTapLock.current = true

    scrollToSection(id)

    window.setTimeout(() => {
      mobileNavTapLock.current = false
    }, 450)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/10 py-4' : 'bg-transparent py-6'
      }`}
      onClick={(e) => {
        // Close mobile menu if clicking a nav target
        if ((e.target.closest('a') || e.target.closest('button[data-nav-target]')) && mobileMenuOpen) {
          setMobileMenuOpen(false)
        }
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <a href="#hero" onClick={(event) => handleNavClick(event, 'hero')} className="flex items-center gap-2 group flex-shrink-0">
          <img src="/logo.png" alt="Brand9 Studio Logo" className="h-8 sm:h-10 w-auto" />
        </a>

        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(event) => handleNavClick(event, item.id)}
              className={`relative text-xs lg:text-sm tracking-wider uppercase transition-colors font-inter ${
                activeSection === item.id ? 'text-brand-lime' : 'text-brand-smoke hover:text-brand-lime'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.span
                  layoutId="nav-active-indicator"
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  className="absolute -bottom-2 left-0 right-0 h-[2px] bg-brand-lime"
                />
              )}
            </a>
          ))}
          <a
            href="https://www.brand9studio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 lg:px-5 py-2 border border-brand-lime/30 text-brand-lime font-outfit font-bold text-xs lg:text-sm rounded-full hover:bg-brand-lime hover:text-black hover:scale-105 active:scale-95 transition-all"
          >
            WEBSITE
          </a>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -mr-2 flex flex-col justify-center gap-1.5 cursor-pointer relative hover:opacity-80 transition-opacity active:scale-95"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <motion.div
              animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 8 : 0 }}
              className="w-6 h-0.5 bg-white origin-left"
            />
            <motion.div
              animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
              className="w-4 h-0.5 bg-brand-lime"
            />
            <motion.div
              animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -8 : 0 }}
              className="w-6 h-0.5 bg-white origin-left"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: mobileMenuOpen ? 1 : 0, height: mobileMenuOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className={`md:hidden overflow-hidden pointer-events-auto ${scrolled ? 'bg-black/80 backdrop-blur-lg' : 'bg-black/90'}`}
      >
        <div className="px-4 sm:px-6 py-2 border-t border-white/10 flex flex-col pointer-events-auto gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              data-nav-target="true"
              onPointerUp={(e) => handleMobileNavClick(e, item.id)}
              onTouchEnd={(e) => handleMobileNavClick(e, item.id)}
              onClick={(e) => handleMobileNavClick(e, item.id)}
              className={`min-h-10 sm:min-h-12 w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all font-inter text-xs sm:text-sm tracking-wider uppercase flex items-center cursor-pointer select-none touch-manipulation active:bg-brand-lime/20 pointer-events-auto text-left ${
                activeSection === item.id
                  ? 'text-brand-lime font-semibold bg-brand-lime/10'
                  : 'text-brand-smoke hover:text-brand-lime hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
          <a
            href="https://www.brand9studio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-10 sm:min-h-12 mx-2 sm:mx-4 my-2 px-4 sm:px-5 py-2 sm:py-3 border border-brand-lime/30 text-brand-lime font-outfit font-bold text-xs sm:text-sm rounded-full hover:bg-brand-lime hover:text-black active:bg-brand-lime active:text-black transition-all text-center cursor-pointer select-none touch-manipulation pointer-events-auto"
          >
            WEBSITE
          </a>
        </div>
      </motion.div>
    </motion.nav>
  )
}
