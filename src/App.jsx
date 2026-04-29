import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Projects from './sections/Projects'
import Testimonials from './sections/Testimonials'
import Pricing from './sections/Pricing'
import Contact from './sections/Contact'
import Footer from './components/Footer'
import ClientLogos from './components/ClientLogos'

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
        <ClientLogos />
        <About />
        <Services />
        <Projects />
        <Testimonials />
        <Pricing />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
