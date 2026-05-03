import { motion, useMotionValue, useScroll, useSpring } from 'framer-motion'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import CaseStudies from './sections/CaseStudies'
import Services from './sections/Services'
import Testimonials from './sections/Testimonials'
import About from './sections/About'
import ClientLogos from './components/ClientLogos'
import Contact from './sections/Contact'
import Footer from './components/Footer'

function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

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
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60" />

        <div className="absolute inset-0 portfolio-wave-bg opacity-45" />

        <motion.div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[70vw] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full portfolio-cursor-glow blur-3xl mix-blend-screen"
          style={{ x: cursorX, y: cursorY }}
          animate={{ scale: [1, 1.06, 1], opacity: [0.16, 0.22, 0.16] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          aria-hidden="true"
          className="absolute -left-1/4 top-[-12%] h-[60vw] w-[60vw] rounded-full portfolio-wave-orb blur-3xl mix-blend-screen"
          animate={{ x: [0, 42, 0], y: [0, 28, 0], rotate: [0, 10, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          aria-hidden="true"
          className="absolute right-[-18%] bottom-[-18%] h-[64vw] w-[64vw] rounded-full portfolio-wave-orb-alt blur-3xl mix-blend-screen"
          animate={{ x: [0, -36, 0], y: [0, -24, 0], rotate: [0, -12, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.14)_52%,rgba(5,5,5,0.72)_100%)]" />
      </div>
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-lime z-50 origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <Projects />
        <CaseStudies />
        <Services />
        <Testimonials />
        <About />
        <ClientLogos />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
