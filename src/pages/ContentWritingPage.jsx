import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, FileText, Sparkles } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

const writingServices = [
  'Social Media Captions',
  'Ad Copywriting',
  'Website Content',
  'Landing Page Content',
  'Product Descriptions',
  'Scriptwriting (Reels & Videos)',
  'Email & Newsletter Content',
  'Taglines & Brand Messaging',
  'Blog & Article Writing'
]

export default function ContentWritingPage() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  const handleBackHome = () => {
    navigate('/', {
      state: {
        scrollY: location.state?.scrollY ?? 0
      }
    })
  }

  return (
    <section className="min-h-screen pt-28 pb-16 sm:pb-24 px-4 sm:px-6" style={{ contain: 'layout paint' }}>
      <div className="main-container space-y-8 sm:space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-white/10 bg-black/45 backdrop-blur-xl p-5 sm:p-7 lg:p-10 overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(196,239,71,0.15),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(247,148,29,0.09),transparent_28%)]" />

          <div className="relative z-10 flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-brand-lime text-[10px] sm:text-xs font-bold uppercase tracking-[0.26em] mb-5">
                <Sparkles size={14} /> Content Writing & Creative Copy
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white tracking-tight leading-tight uppercase">
                Content Writing & Creative Copy
              </h1>

              <p className="mt-5 text-sm sm:text-base lg:text-lg text-brand-smoke/90 leading-relaxed max-w-4xl">
                Power-packed words that sell, engage, and tell your brand story with clarity. We craft content that
                strengthens your voice, sharpens your message, and makes people remember your brand. From short
                captions to full-scale campaigns, every piece is written with purpose and impact.
              </p>
            </div>

            <button
              onClick={handleBackHome}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 text-white text-[11px] sm:text-xs font-bold uppercase tracking-widest hover:border-brand-lime hover:text-brand-lime transition-colors cursor-pointer"
            >
              <ArrowLeft size={16} /> Back home
            </button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-4 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 rounded-3xl border border-white/10 bg-black/45 backdrop-blur-xl p-5 sm:p-7"
          >
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-brand-lime mb-4">
              What we write
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              Messaging that sounds sharp, consistent, and conversion-ready.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-brand-smoke leading-relaxed">
              We write with intent across brand touchpoints, balancing strategy, clarity, and personality so your
              message lands with the right audience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 rounded-3xl border border-white/10 bg-black/45 backdrop-blur-xl p-5 sm:p-7"
          >
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-brand-lime mb-5">
              Services included
            </p>

            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              {writingServices.map((service) => (
                <div
                  key={service}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-white transition-transform duration-300 hover:-translate-y-0.5 hover:border-brand-lime/40"
                >
                  <FileText size={18} className="text-brand-lime shrink-0" />
                  <span className="text-sm sm:text-base font-medium">{service}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  )
}
