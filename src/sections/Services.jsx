import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Palette, Play, Share2, BarChart3, Globe, PenTool } from 'lucide-react'
import Magnetic from '../components/Magnetic'

export default function Services() {
  const navigate = useNavigate()

  const handleServiceClick = (path) => {
    navigate(path, {
      state: {
        scrollY: window.scrollY
      }
    })
  }

  const services = [
    {
      title: "Branding",
      desc: "Logos, Identity, and complete brand systems that resonate.",
      icon: <Palette size={32} />,
      size: "lg:col-span-2",
    },
    {
      title: "Reels & Videos",
      desc: "Performance-driven creative content.",
      icon: <Play size={32} />,
      size: "lg:col-span-1",
    },
    {
      title: "Social Media",
      desc: "Strategic management and growth.",
      icon: <Share2 size={32} />,
      size: "lg:col-span-1",
    },
    {
      title: "Digital Marketing",
      desc: "Performance marketing that drives measurable ROI and brand authority.",
      icon: <BarChart3 size={32} />,
      size: "lg:col-span-2",
    },
    {
      title: "Web Design",
      desc: "Modern, responsive, and optimized websites.",
      icon: <Globe size={32} />,
      size: "lg:col-span-1",
    },
    {
      title: "Content Writing",
      desc: "Clear, persuasive copy that communicates brand values effectively.",
      icon: <PenTool size={32} />,
      size: "lg:col-span-2",
    },
  ]

  return (
    <section id="services" className="py-24 bg-brand-gray/50 relative overflow-hidden" style={{ contain: 'layout paint' }}>
      <div className="main-container will-change-gpu">
        <div className="mb-16 sm:mb-20 text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-brand-lime font-mono text-xs uppercase tracking-[0.4em] mb-4 block">Our Solutions</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter">
              HOW WE HELP <span className="text-brand-lime">YOU GROW.</span>
            </h2>
          </motion.div>
        </div>

        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1
              }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {services.map((service, i) => {
            const isBranding = service.title === 'Branding'
            const isReels = service.title === 'Reels & Videos'
            const isSocialMedia = service.title === 'Social Media'
            const isDigitalMarketing = service.title === 'Digital Marketing'
            const isWebDesign = service.title === 'Web Design'
            const isContentWriting = service.title === 'Content Writing'

            const cardClasses =
              'premium-card p-6 sm:p-8 lg:p-10 relative group overflow-hidden block text-left w-full h-full border border-white/5'

            const content = (
              <>
                {/* Magnetic Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-lime/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="text-brand-lime mb-5 sm:mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 origin-left flex items-center">
                    {service.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-white mb-3 sm:mb-4 uppercase tracking-tight group-hover:text-brand-lime transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-brand-smoke leading-relaxed text-xs sm:text-sm lg:text-base flex-grow">
                    {service.desc}
                  </p>

                  <div className="mt-8 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 duration-300 flex items-center gap-2 text-brand-lime text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                    Explore Solution <span>→</span>
                  </div>
                </div>
              </>
            )

            return (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                  }
                }}
                className={`relative ${service.size}`}
              >
                <Magnetic strength={0.1}>
                  {isBranding || isReels || isSocialMedia || isDigitalMarketing || isWebDesign || isContentWriting ? (
                    <button
                      onClick={() => handleServiceClick(isBranding ? '/branding' : isReels ? '/reels' : isSocialMedia ? '/social-media' : isDigitalMarketing ? '/digital-marketing' : isWebDesign ? '/web-design' : '/content-writing')}
                      className={cardClasses}
                      data-cursor="hover"
                    >
                      {content}
                    </button>
                  ) : (
                    <div className={cardClasses}>{content}</div>
                  )}
                </Magnetic>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
