import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Magnetic from './Magnetic'

const brandLogo = "/logo.png"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { label: 'Work Gallery', id: 'work' },
    { label: 'Success Stories', id: 'client-success-stories' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' }
  ]

  useEffect(() => {
    let rafId = null
    const handleScroll = () => {
      if (rafId) return
      rafId = window.requestAnimationFrame(() => {
        rafId = null
        setScrolled(window.scrollY > 50)
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', handleScroll)
    }
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
    window.addEventListener('resize', handleScroll, { passive: true })

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
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? 'py-3 bg-black/50 backdrop-blur-3xl border-b border-white/10 shadow-2xl' : 'py-5 bg-black/20 backdrop-blur-md border-b border-white/10 shadow-lg'
      }`}
      style={{ willChange: 'transform' }}
      onClick={(e) => {
        // Close mobile menu if clicking a nav target
        if ((e.target.closest('a') || e.target.closest('button[data-nav-target]')) && mobileMenuOpen) {
          setMobileMenuOpen(false)
        }
      }}
    >
      <div className="main-container flex items-center justify-between">
        <a href="#hero" onClick={(event) => handleNavClick(event, 'hero')} className="flex items-center gap-2 group flex-shrink-0">
          <img src={brandLogo} alt="Brand9 Studio Logo" className="h-10 sm:h-12 lg:h-14 w-auto" decoding="async" fetchpriority="high" />
        </a>

        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => (
            <Magnetic key={item.id} strength={0.2}>
              <a
                href={`#${item.id}`}
                onClick={(event) => handleNavClick(event, item.id)}
                className={`relative text-xs lg:text-sm tracking-wider uppercase transition-all duration-300 font-inter py-2 px-2 ${
                  activeSection === item.id ? 'text-brand-lime' : 'text-brand-smoke hover:text-brand-lime'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="nav-active-indicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute -bottom-1 left-2 right-2 h-[2px] bg-brand-lime"
                  />
                )}
              </a>
            </Magnetic>
          ))}
          <Magnetic strength={0.4}>
            <a
              href="https://www.brand9studio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 lg:px-5 py-2 border border-brand-lime/40 text-brand-lime font-outfit font-bold text-xs lg:text-sm rounded-lg hover:bg-brand-lime/10 hover:border-brand-lime/80 hover:text-brand-lime active:scale-95 transition-all duration-300 shadow-lg block"
            >
              WEBSITE
            </a>
          </Magnetic>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center cursor-pointer relative active:scale-90 transition-transform"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="stroke-white stroke-[2]">
              <motion.line
                x1="4" y1="6" x2="20" y2="6"
                animate={mobileMenuOpen ? { x1: 5, y1: 5, x2: 19, y2: 19 } : { x1: 4, y1: 6, x2: 20, y2: 6 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              />
              <motion.line
                x1="4" y1="12" x2="16" y2="12"
                animate={mobileMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="stroke-brand-lime"
              />
              <motion.line
                x1="4" y1="18" x2="20" y2="18"
                animate={mobileMenuOpen ? { x1: 5, y1: 19, x2: 19, y2: 5 } : { x1: 4, y1: 18, x2: 20, y2: 18 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ opacity: 1, height: 'auto', clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ opacity: 0, height: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`md:hidden overflow-hidden pointer-events-auto ${scrolled ? 'bg-black/50 backdrop-blur-xl border-b border-white/10' : 'bg-black/70 backdrop-blur-lg border-b border-white/10'}`}
          >
            <div className="px-4 sm:px-6 py-2 flex flex-col pointer-events-auto gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  data-nav-target="true"
                  onPointerUp={(e) => handleMobileNavClick(e, item.id)}
                  onTouchEnd={(e) => handleMobileNavClick(e, item.id)}
                  onClick={(e) => handleMobileNavClick(e, item.id)}
                  className={`min-h-10 sm:min-h-12 w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-300 font-inter text-xs sm:text-sm tracking-wider uppercase flex items-center cursor-pointer select-none touch-manipulation active:bg-brand-lime/20 pointer-events-auto text-left ${
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
                className="min-h-10 sm:min-h-12 mx-2 sm:mx-4 my-2 px-4 sm:px-5 py-2 sm:py-3 border border-brand-lime/40 text-brand-lime font-outfit font-bold text-xs sm:text-sm rounded-lg hover:bg-brand-lime/10 hover:border-brand-lime/80 active:bg-brand-lime/20 transition-all duration-300 text-center cursor-pointer select-none touch-manipulation pointer-events-auto"
              >
                WEBSITE
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
