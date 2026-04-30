import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { latestCaseStudy } from './CaseStudies'

export default function Hero() {
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

  const openLatestCaseStudy = () => {
    const target = document.getElementById('case-studies')
    if (!target) return

    const offset = 88
    const targetTop = target.getBoundingClientRect().top + window.scrollY - offset

    window.scrollTo({
      top: targetTop,
      behavior: 'smooth'
    })

    window.dispatchEvent(new CustomEvent('highlight-case-study', { detail: { studyId: latestCaseStudy.id } }))
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-12 h-[1px] bg-brand-lime" />
                <span className="text-brand-lime font-inter text-xs tracking-[0.3em] uppercase">Innovating Identity</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] mb-8 text-white">
                BUILD A <br />
                <span className="text-gradient">GROWTH-READY</span> <br />
                IDENTITY.
              </h1>
              
              <p className="text-brand-smoke text-base sm:text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
                A creative design and digital solutions studio helping brands stand out 
                through clean design, smart strategy, and powerful digital presence.
              </p>
              
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <motion.a
                  href="/Brand9Studio%20Portfolio.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Brand9Studio_Portfolio.pdf"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-brand-lime text-black font-outfit font-black text-xs sm:text-sm uppercase tracking-widest rounded-none btn-shimmer"
                >
                  Download Portfolio
                </motion.a>
                
                <motion.a
                  href="#contact"
                  onClick={(event) => scrollToSection(event, 'contact')}
                  whileHover={{ x: 5 }}
                  className="px-6 sm:px-8 py-3 sm:py-4 border border-white/20 text-white font-inter text-xs sm:text-sm uppercase tracking-widest hover:border-brand-lime/50 flex items-center justify-center sm:justify-start gap-2"
                >
                  Start a Project <ArrowUpRight size={16} sm:size={18} className="text-brand-lime" />
                </motion.a>
              </div>

              <motion.button
                type="button"
                onClick={openLatestCaseStudy}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                whileTap={{ scale: 0.99 }}
                className="mt-8 w-full lg:hidden rounded-2xl border border-white/10 bg-brand-gray/80 p-3 sm:p-4 text-left"
                aria-label={`Open latest case study ${latestCaseStudy.title}`}
              >
                <div className="relative rounded-xl bg-black overflow-hidden min-h-[200px] sm:min-h-[240px] p-4 sm:p-6">
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-lime/20 to-transparent opacity-50" />
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
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <motion.button
                type="button"
                onClick={openLatestCaseStudy}
                whileHover={{ rotate: 0, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full max-w-[450px] aspect-[450/550] bg-brand-gray border border-white/10 p-4 rotate-3 hover:rotate-0 transition-transform duration-700 group text-left"
                aria-label={`Open latest case study ${latestCaseStudy.title}`}
              >
                <div className="w-full h-full bg-black relative overflow-hidden flex flex-col">
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-lime/20 to-transparent opacity-50" />
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
              
              {/* Floating Stat Badges */}
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 lg:-top-8 lg:-right-8 flex flex-col gap-3 sm:gap-4">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="glass-panel p-3 sm:p-4 px-4 sm:px-6 border border-white/10 bg-black/40 backdrop-blur-sm text-sm sm:text-base"
                >
                  <div className="flex items-baseline gap-2 sm:gap-3">
                    <p className="text-2xl sm:text-3xl font-black text-white">9+</p>
                    <span className="text-[10px] sm:text-[11px] text-brand-smoke uppercase tracking-wider">Years</span>
                  </div>
                  <p className="text-[9px] sm:text-[11px] text-brand-lime mt-1 font-bold">Creative industry experience</p>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                  className="glass-panel p-3 sm:p-4 px-4 sm:px-6 border border-white/10 bg-black/35 backdrop-blur-sm text-sm sm:text-base hidden sm:block"
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
