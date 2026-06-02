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
    <section id="hero" className="relative min-h-screen w-full flex items-center py-20 sm:py-24 lg:py-28 overflow-hidden bg-transparent" style={{ contain: 'layout paint' }}>
      <div className="main-container relative z-10 will-change-gpu w-full">
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
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black leading-[0.9] mb-6 sm:mb-8 text-white uppercase tracking-tighter">
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
                We help brands stand out with strategic design, bold visuals, and digital experiences built to create impact and drive growth.
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
                type="button"
                onClick={openLatestCaseStudy}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                variants={{
                  initial: { scale: 1, y: 0 },
                  hover: { scale: 1.02, y: -4 },
                  tap: { scale: 0.98, y: 0 }
                }}
                className="mt-8 w-full lg:hidden premium-card border border-white/10 p-2 text-left shadow-2xl relative group overflow-hidden rounded-2xl flex flex-col"
                aria-label={`Open latest case study ${latestCaseStudy.title}`}
              >
                <div className="w-full bg-[#080808] relative overflow-hidden flex flex-col rounded-xl border border-white/5">
                  {/* Top Image Section - Uncropped */}
                  <div className="w-full relative overflow-hidden bg-black flex items-center justify-center px-4 pt-6 pb-2">
                    <motion.img 
                      variants={{
                        initial: { scale: 1 },
                        hover: { scale: 1.04 }
                      }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      src="/projects/hero-case-study.png" 
                      alt="Case Study" 
                      className="w-full h-auto object-contain drop-shadow-2xl relative z-10" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent h-12 bottom-0 top-auto z-20"></div>
                  </div>
                  
                  {/* Bottom Content Section - Uncompromised */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col bg-[#080808] relative z-30">
                    <p className="text-[10px] font-mono text-brand-lime mb-3 tracking-widest uppercase flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-lime animate-pulse"></span>
                      Latest Case Study
                    </p>
                    <h3 className="text-xl sm:text-2xl font-black text-white leading-tight mb-2">{latestCaseStudy.title}</h3>
                    <p className="text-brand-smoke text-xs sm:text-sm leading-relaxed">{latestCaseStudy.summary}</p>
                    
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                      <p className="text-brand-smoke text-[10px] font-bold uppercase tracking-[0.2em]">{latestCaseStudy.folder}</p>
                      <motion.div
                        variants={{
                          initial: { x: -5, opacity: 0.7 },
                          hover: { x: 0, opacity: 1, backgroundColor: "rgba(196,239,71,0.2)" }
                        }}
                        className="w-8 h-8 rounded-full bg-brand-lime/10 flex items-center justify-center border border-brand-lime/20"
                      >
                        <ArrowUpRight size={14} className="text-brand-lime" />
                      </motion.div>
                    </div>
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
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                variants={{
                  initial: { scale: 1, y: 0, boxShadow: "0 20px 50px rgba(0,0,0,0.6)" },
                  hover: { scale: 1.02, y: -8, boxShadow: "0 30px 60px rgba(196,239,71,0.15)" },
                  tap: { scale: 0.98, y: 0 }
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="w-full max-w-[420px] xl:max-w-[480px] premium-card border border-white/10 p-2 sm:p-3 text-left overflow-hidden relative group rounded-2xl md:rounded-3xl flex flex-col"
                aria-label={`Open latest case study ${latestCaseStudy.title}`}
              >
                <div className="w-full bg-[#080808] relative overflow-hidden flex flex-col rounded-xl md:rounded-2xl h-full border border-white/5">
                  
                  {/* Top Image Section - Uncropped */}
                  <div className="w-full relative overflow-hidden bg-black flex items-center justify-center px-6 pt-8 pb-4">
                    <motion.div
                      className="absolute inset-0 bg-brand-lime/20 blur-[60px] rounded-full opacity-0"
                      variants={{ initial: { opacity: 0 }, hover: { opacity: 0.5 } }}
                      transition={{ duration: 0.8 }}
                    />
                    <motion.img 
                      variants={{
                        initial: { scale: 1 },
                        hover: { scale: 1.04 }
                      }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      src="/projects/hero-case-study.png" 
                      alt="Case Study" 
                      className="w-full h-auto object-contain relative z-10 drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]" 
                    />
                    {/* Seamless blend gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent h-16 bottom-0 top-auto z-20"></div>
                  </div>
                  
                  {/* Bottom Content Section - Uncompromised */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between bg-[#080808] relative z-30">
                    <div>
                      <p className="text-[10px] sm:text-xs font-mono text-brand-lime mb-3 tracking-widest uppercase flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-lime animate-pulse shadow-[0_0_8px_#C4EF47]"></span>
                        Latest Case Study
                      </p>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-3 tracking-tight">{latestCaseStudy.title}</h3>
                      <p className="text-brand-smoke text-xs sm:text-sm leading-relaxed font-outfit">{latestCaseStudy.summary}</p>
                    </div>
                    
                    <div className="flex items-end justify-between mt-8 pt-6 border-t border-white/5">
                      <p className="text-brand-smoke text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em]">
                        {latestCaseStudy.folder}
                      </p>
                      <motion.div
                        variants={{
                          initial: { x: -10, opacity: 0.5, backgroundColor: "rgba(255,255,255,0.05)" },
                          hover: { x: 0, opacity: 1, backgroundColor: "rgba(196,239,71,0.2)", borderColor: "rgba(196,239,71,0.4)" }
                        }}
                        transition={{ duration: 0.3 }}
                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-md"
                      >
                        <ArrowUpRight size={16} className="text-brand-lime" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.button>

              {/* Floating Stat Badges with elegant spring hover and reactive glows */}
              <div className="absolute top-6 sm:top-8 lg:top-12 -right-4 sm:-right-6 lg:-right-8 flex flex-col gap-3 sm:gap-4 z-20">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.05 }}
                  className="premium-card p-3 sm:p-4 px-4 sm:px-6 border border-white/10 text-sm sm:text-base cursor-pointer transition-colors duration-300"
                  style={{ willChange: 'transform' }}
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
                  whileHover={{ scale: 1.05 }}
                  className="premium-card p-3 sm:p-4 px-4 sm:px-6 border border-white/10 text-sm sm:text-base hidden sm:block cursor-pointer transition-colors duration-300"
                  style={{ willChange: 'transform' }}
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
      <div className="absolute bottom-12 sm:bottom-16 lg:bottom-20 right-0 opacity-[0.02] pointer-events-none select-none overflow-hidden z-0">
        <h2 className="text-[12rem] sm:text-[16rem] md:text-[20rem] font-black leading-none translate-y-0">BRAND9</h2>
      </div>
    </section>
  )
}
