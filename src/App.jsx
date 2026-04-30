import { motion, useScroll, useSpring } from 'framer-motion'
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

  return (
    <div className="bg-brand-dark min-h-screen relative">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid pointer-events-none" />
      <div className="fixed top-[-10%] left-[-10%] blob opacity-50" />
      <div className="fixed bottom-[-10%] right-[-10%] blob opacity-30" />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-lime z-50 origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main>
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
