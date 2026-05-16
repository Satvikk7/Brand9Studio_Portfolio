import { useState, useEffect } from 'react'
import { motion, useMotionValue, useScroll, useSpring, AnimatePresence, useTransform } from 'framer-motion'
import { Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BrandingPage from './pages/BrandingPage'
import ReelsPage from './pages/ReelsPage'
import SocialMediaPage from './pages/SocialMediaPage'
import DigitalMarketingPage from './pages/DigitalMarketingPage'
import WebDesignPage from './pages/WebDesignPage'
import ContentWritingPage from './pages/ContentWritingPage'
import ProjectPage from './pages/ProjectPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsOfServicePage from './pages/TermsOfServicePage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import Preloader from './components/Preloader'
import ScrollProgress from './components/ScrollProgress'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const { scrollYProgress } = useScroll()

  // Parallax offsets
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 150])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2400)
    return () => clearTimeout(timer)
  }, [])

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  
  const location = useLocation()
  
  useEffect(() => {
    // If we are returning to the Home page and explicitly restoring scroll position,
    // do not force scroll to top. Let HomePage.jsx handle the restoration.
    if (location.pathname === '/' && location.state?.scrollY !== undefined) {
      return;
    }

    // Force scroll to top when route changes
    window.scrollTo(0, 0)
    
    const forceScroll = () => {
      window.scrollTo(0, 0)
      if (window.location.hash && location.pathname === '/') {
        window.history.replaceState(null, null, window.location.pathname)
      }
    }

    // Multiple attempts to ensure it sticks
    forceScroll()
    requestAnimationFrame(forceScroll)
    const timer = setTimeout(forceScroll, 50)
    
    return () => clearTimeout(timer)
  }, [location.pathname])

  useEffect(() => {
    const handlePointerMove = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 180
      const y = (event.clientY / window.innerHeight - 0.5) * 180

      cursorX.set(x)
      cursorY.set(y)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })

    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [cursorX, cursorY])

  return (
    <div className="bg-brand-dark min-h-screen relative isolate overflow-hidden">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" />}
      </AnimatePresence>

      <CustomCursor />
      <ScrollProgress />
      
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60" />

        <div className="absolute inset-0 portfolio-wave-bg opacity-45" />

        <motion.div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[70vw] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full portfolio-cursor-glow blur-3xl mix-blend-screen"
          style={{ x: cursorX, y: cursorY, transform: 'translateZ(0)', willChange: 'transform, opacity' }}
          animate={{ scale: [1, 1.06, 1], opacity: [0.16, 0.22, 0.16] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          aria-hidden="true"
          className="absolute -left-1/4 top-[-12%] h-[60vw] w-[60vw] rounded-full portfolio-wave-orb blur-3xl mix-blend-screen"
          style={{ y: y1, transform: 'translateZ(0)', willChange: 'transform, opacity' }}
          animate={{ x: [0, 42, 0], rotate: [0, 10, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          aria-hidden="true"
          className="absolute right-[-18%] bottom-[-18%] h-[64vw] w-[64vw] rounded-full portfolio-wave-orb-alt blur-3xl mix-blend-screen"
          style={{ y: y2, transform: 'translateZ(0)', willChange: 'transform, opacity' }}
          animate={{ x: [0, -36, 0], rotate: [0, -12, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          aria-hidden="true"
          className="absolute left-[10%] top-[40%] h-[40vw] w-[40vw] rounded-full bg-brand-lime/5 blur-3xl mix-blend-screen"
          style={{ y: y3, transform: 'translateZ(0)', willChange: 'transform, opacity' }}
          animate={{ x: [0, 20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.14)_52%,rgba(5,5,5,0.72)_100%)]" />
      </div>
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-lime z-50 origin-left"
        style={{ scaleX }}
      />

      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/branding" element={<BrandingPage />} />
          <Route path="/reels" element={<ReelsPage />} />
          <Route path="/social-media" element={<SocialMediaPage />} />
          <Route path="/digital-marketing" element={<DigitalMarketingPage />} />
          <Route path="/web-design" element={<WebDesignPage />} />
          <Route path="/content-writing" element={<ContentWritingPage />} />
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
