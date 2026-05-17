import { motion, AnimatePresence } from 'framer-motion'
import { Target, Zap, TrendingUp } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function About() {
  const stats = [
    { icon: <Zap className="text-brand-lime" />, label: "Creative Exp.", value: "10+ Years" },
    { icon: <TrendingUp className="text-brand-lime" />, label: "Digital Marketing", value: "14+ Years" },
    { icon: <Target className="text-brand-lime" />, label: "Client Satisfaction", value: "100%" },
  ]

  const quotes = [
    "Design meets strategy and creativity meets business growth.",
    "Every pixel tells a story of innovation and purpose.",
    "We transform visions into visual experiences that drive results.",
    "Clean design, bold strategy, unstoppable growth.",
    "Your brand deserves more than design—it deserves a digital revolution.",
    "Creativity without strategy is just art. Strategy without creativity is just business. We do both.",
  ]

  const [currentQuote, setCurrentQuote] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 5000) // Change quote every 5 seconds
    return () => clearInterval(interval)
  }, [quotes.length])

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="main-container">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-brand-lime font-mono text-xs uppercase tracking-[0.4em] mb-4 block">Our Philosophy</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 sm:mb-8 text-white leading-tight">
              WE DON'T JUST CREATE DESIGNS, <br />
              <span className="text-brand-lime italic">WE CREATE DIGITAL SUCCESS.</span>
            </h2>
            
            <p className="text-brand-smoke text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed">
              Brand9Studio is a creative design and digital solutions powerhouse. We help brands build a modern, 
              trusted, and growth-ready identity. We blend clean design, smart strategy, and a strong digital 
              presence to create visuals that make your brand stand out and communicate with absolute clarity.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
              {stats.map((stat, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="premium-card p-4 sm:p-6 border border-white/10 hover:border-brand-lime/30 transition-all duration-300 group"
                >
                  <div className="mb-3 sm:mb-4 transform group-hover:scale-110 transition-transform">{stat.icon}</div>
                  <p className="text-xl sm:text-2xl font-black text-white">{stat.value}</p>
                  <p className="text-[9px] sm:text-[10px] text-brand-smoke uppercase tracking-widest mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="aspect-square relative w-full h-full overflow-visible">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuote}
                  initial={{ opacity: 0, y: 15, rotateZ: -1 }}
                  animate={{ opacity: 1, y: 0, rotateZ: 0 }}
                  exit={{ opacity: 0, y: -15, rotateZ: 1 }}
                  transition={{ 
                    duration: 0.55,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="absolute inset-0 aspect-square premium-card border border-white/10 overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-brand-lime/5 group-hover:bg-brand-lime/10 transition-colors duration-500" />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-10 lg:p-12"
                  >
                    <p className="text-center font-outfit text-base sm:text-xl lg:text-2xl font-medium text-white italic leading-relaxed">
                      "{quotes[currentQuote]}"
                    </p>
                    <motion.div 
                      className="flex justify-center gap-2 mt-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      {quotes.map((_, i) => (
                        <motion.button
                          key={i}
                          onClick={() => setCurrentQuote(i)}
                          whileHover={{ scale: 1.3 }}
                          whileTap={{ scale: 0.9 }}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            i === currentQuote ? 'bg-brand-lime w-6' : 'bg-white/20 hover:bg-white/40'
                          }`}
                          aria-label={`Quote ${i + 1}`}
                        />
                      ))}
                    </motion.div>
                  </motion.div>
                  
                  {/* Animated Decorative elements */}
                  <motion.div 
                    className="absolute top-0 left-0 w-20 h-[1px] bg-brand-lime"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    style={{ originX: 0 }}
                  />
                  <motion.div 
                    className="absolute top-0 left-0 w-[1px] h-20 bg-brand-lime"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.15, duration: 0.6 }}
                    style={{ originY: 0 }}
                  />
                  <motion.div 
                    className="absolute bottom-0 right-0 w-20 h-[1px] bg-brand-lime"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    style={{ originX: 1 }}
                  />
                  <motion.div 
                    className="absolute bottom-0 right-0 w-[1px] h-20 bg-brand-lime"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.25, duration: 0.6 }}
                    style={{ originY: 1 }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-lime/20 blur-3xl rounded-full pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
