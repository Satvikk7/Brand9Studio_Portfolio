import { motion } from 'framer-motion'
import { ArrowLeft, Megaphone, Sparkles } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

const socialServices = [
  'Social Media Strategy',
  'Content Creation',
  'Copywriting & Captions',
  'Social Media Calendars',
  'Page Management',
  'Community Management',
  'Performance Marketing (Ads)',
  'Analytics & Reporting',
  'Platform Coverage'
]

export default function SocialMediaPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleBackHome = () => {
    navigate('/', {
      state: {
        scrollY: location.state?.scrollY ?? 0
      }
    })
  }

  return (
    <section className="min-h-screen pt-28 pb-16 sm:pb-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-8 sm:space-y-10">
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
                <Sparkles size={14} /> Social Media Management & Marketing
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white tracking-tight leading-tight uppercase">
                Social Media Management & Marketing
              </h1>

              <p className="mt-5 text-sm sm:text-base lg:text-lg text-brand-smoke/90 leading-relaxed max-w-4xl">
                We help your brand show up where people already spend their time. From planning and content creation
                to publishing, engagement, and paid growth, we manage social channels with a steady balance of
                creativity, consistency, and performance.
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
              What we focus on
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              Social channels that look active, feel relevant, and convert.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-brand-smoke leading-relaxed">
              We shape a content system that builds awareness, keeps your page consistent, and turns attention into
              measurable engagement.
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
              {socialServices.map((service) => (
                <div
                  key={service}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-white transition-transform duration-300 hover:-translate-y-0.5 hover:border-brand-lime/40"
                >
                  <Megaphone size={18} className="text-brand-lime shrink-0" />
                  <span className="text-sm sm:text-base font-medium">{service}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleBackHome}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 inline-flex items-center gap-2 px-4 sm:px-5 py-3 rounded-full border border-brand-lime/30 bg-black/70 backdrop-blur-xl text-brand-lime text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-lg shadow-black/30 hover:bg-brand-lime/10 hover:border-brand-lime/60 hover:text-brand-lime transition-all duration-300"
      >
        <ArrowLeft size={16} /> Back to gallery
      </button>
    </section>
  )
}
