import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { latestCaseStudy } from './CaseStudies'

export default function Hero() {
  const highlightTimerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (highlightTimerRef.current) {
        window.clearTimeout(highlightTimerRef.current)
      }
    }
  }, [])

  const scrollToSection = (event, id) => {
    event.preventDefault()

    const target = document.getElementById(id)
    if (!target) return

    const offset = 88
    const targetTop = target.getBoundingClientRect().top + window.scrollY - offset

    window.scrollTo({
      top: targetTop,
      behavior: 'smooth'
    })
  }

  const exploreWorkGallery = (event) => {
    scrollToSection(event, 'work')
  }

  const openLatestCaseStudy = () => {
    const target = document.getElementById('case-studies')
    if (!target) return

    const offset = 88
    const start = window.scrollY
    const targetTop = target.getBoundingClientRect().top + window.scrollY - offset
    const distance = Math.abs(targetTop - start)
    const highlightDelay = Math.min(1200, 250 + distance / 2.2)

    window.scrollTo({
      top: targetTop,
      behavior: 'smooth'
    })

    if (highlightTimerRef.current) {
      window.clearTimeout(highlightTimerRef.current)
    }

    highlightTimerRef.current = window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent('highlight-case-study', { detail: { studyId: latestCaseStudy.id } }))
    }, highlightDelay)
  }

  // Parent and child variants for staggered entrance choreography
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  }

  return (
    <section id="hero" className="relative min-h-screen lg:h-screen flex items-center pt-20 overflow-hidden">
      <div className="main-container relative z-10 will-change-gpu">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 text-left">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
                <span className="w-12 h-[1px] bg-brand-lime" />
                <span className="text-brand-lime font-inter text-xs tracking-[0.3em] uppercase">Innovating Identity</span>
              </motion.div>

              {/* Title line mask transitions for ultra-premium look */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] mb-8 text-white uppercase tracking-tighter">
                <div className="overflow-hidden block py-1">
                  <motion.span 
                    className="inline-block"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  >
                    BUILD A
                  </motion.span>
                </div>
                <div className="overflow-hidden block py-1 text-brand-lime">
                  <motion.span 
                    className="inline-block"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
                  >
                    GROWTH-READY
                  </motion.span>
                </div>
                <div className="overflow-hidden block py-1">
                  <motion.span 
                    className="inline-block"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
                  >
                    IDENTITY.
                  </motion.span>
                </div>
              </h1>

              <motion.p 
                variants={itemVariants} 
                className="text-brand-smoke text-base sm:text-lg md:text-xl max-w-xl mb-10 leading-relaxed font-outfit"
              >
                A creative design and digital solutions studio helping brands stand out
                through clean design, smart strategy, and powerful digital presence.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-start">
                <motion.a
                  href="#work"
                  onClick={exploreWorkGallery}
                  whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(196,239,71,0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="px-6 sm:px-8 py-3 sm:py-4 premium-btn text-black font-outfit font-black text-xs sm:text-sm uppercase tracking-widest rounded-lg shadow-lg block text-center"
                >
                  Explore Work Gallery
                </motion.a>

                <motion.a
                  href="#contact"
                  onClick={(event) => scrollToSection(event, 'contact')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="px-6 sm:px-8 py-3 sm:py-4 border border-white/20 text-white font-inter text-xs sm:text-sm uppercase tracking-widest hover:border-brand-lime hover:bg-brand-lime/5 flex items-center justify-center sm:justify-start gap-2 transition-all duration-300 rounded-lg group/btn text-center"
                >
                  Start a Project 
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-block text-brand-lime"
                  >
                    <ArrowUpRight size={16} />
                  </motion.span>
                </motion.a>
              </motion.div>

              <motion.button
                variants={itemVariants}
                type="button"
                onClick={openLatestCaseStudy}
                whileTap={{ scale: 0.98 }}
                className="mt-8 w-full lg:hidden rounded-xl border border-white/10 premium-card p-3 sm:p-4 text-left hover:border-white/20 transition-all duration-300"
                aria-label={`Open latest case study ${latestCaseStudy.title}`}
              >
                <div className="relative rounded-xl bg-black overflow-hidden min-h-[200px] sm:min-h-[240px] p-4 sm:p-6">
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-lime/30 to-transparent opacity-40" />
                  <div className="relative z-10">
                    <p className="text-[10px] font-mono text-brand-lime mb-2 tracking-widest uppercase">Latest Case Study</p>
                    <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">{latestCaseStudy.title}</h3>
                    <p className="text-brand-smoke text-xs sm:text-sm mt-2 line-clamp-3">{latestCaseStudy.summary}</p>
                    <p className="text-brand-lime text-[10px] mt-3 font-bold uppercase tracking-[0.25em]">{latestCaseStudy.folder}</p>
                  </div>
                </div>
              </motion.button>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, rotate: 0, y: 30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.35 }}
              className="relative"
            >
              <motion.button
                type="button"
                onClick={openLatestCaseStudy}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-full max-w-[450px] aspect-[450/550] premium-card border border-white/10 p-4 transition-all duration-700 group text-left shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:shadow-[0_25px_60px_rgba(196,239,71,0.1)]"
                aria-label={`Open latest case study ${latestCaseStudy.title}`}
              >
                <div className="w-full h-full bg-black relative overflow-hidden flex flex-col">
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-lime/30 to-transparent opacity-40" />
                  <div className="absolute bottom-6 sm:bottom-8 lg:bottom-10 left-6 sm:left-8 lg:left-10 right-6 sm:right-8 lg:right-10">
                    <p className="text-[10px] sm:text-xs font-mono text-brand-lime mb-2 tracking-widest uppercase">Latest Case Study</p>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">{latestCaseStudy.title}</h3>
                    <p className="text-brand-smoke text-xs sm:text-sm mt-2">{latestCaseStudy.summary}</p>
                    <p className="text-brand-lime text-[10px] sm:text-[11px] mt-2 sm:mt-3 font-bold uppercase tracking-[0.25em]">
                      {latestCaseStudy.folder}
                    </p>
                  </div>
                </div>
              </motion.button>

              {/* Floating Stat Badges with elegant spring hover and reactive glows */}
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 lg:-top-8 lg:-right-8 flex flex-col gap-3 sm:gap-4">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.05, borderColor: "rgba(196,239,71,0.5)", boxShadow: "0 10px 25px -5px rgba(196,239,71,0.15)" }}
                  className="premium-card p-3 sm:p-4 px-4 sm:px-6 border border-white/10 text-sm sm:text-base cursor-pointer transition-all duration-300"
                >
                  <div className="flex items-baseline gap-2 sm:gap-3">
                    <p className="text-2xl sm:text-3xl font-black text-white">10+</p>
                    <span className="text-[10px] sm:text-[11px] text-brand-smoke uppercase tracking-wider">Years</span>
                  </div>
                  <p className="text-[9px] sm:text-[11px] text-brand-lime mt-1 font-bold">Creative industry experience</p>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                  whileHover={{ scale: 1.05, borderColor: "rgba(196,239,71,0.5)", boxShadow: "0 10px 25px -5px rgba(196,239,71,0.15)" }}
                  className="premium-card p-3 sm:p-4 px-4 sm:px-6 border border-white/10 text-sm sm:text-base hidden sm:block cursor-pointer transition-all duration-300"
                >
                  <div className="flex items-baseline gap-2 sm:gap-3">
                    <p className="text-2xl sm:text-3xl font-black text-white">14+</p>
                    <span className="text-[10px] sm:text-[11px] text-brand-smoke uppercase tracking-wider">Years</span>
                  </div>
                  <p className="text-[9px] sm:text-[11px] text-brand-lime mt-1 font-bold">Digital marketing experience</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background Decorative Text */}
      <div className="absolute bottom-0 right-0 opacity-[0.02] pointer-events-none select-none overflow-hidden">
        <h2 className="text-[20rem] font-black leading-none translate-y-1/3">BRAND9</h2>
      </div>
    </section>
  )
}
