import { motion } from 'framer-motion'
import { Palette, Play, Share2, BarChart3, Globe, PenTool } from 'lucide-react'

export default function Services() {
  const services = [
    {
      title: "Branding",
      desc: "Logos, Identity, and complete brand systems that resonate.",
      icon: <Palette size={32} />,
    },
    {
      title: "Reels & Videos",
      desc: "Performance-driven creative content that captures attention.",
      icon: <Play size={32} />,
    },
    {
      title: "Social Media",
      desc: "Strategic management and growth-focused social presence.",
      icon: <Share2 size={32} />,
    },
    {
      title: "Digital Marketing",
      desc: "Performance marketing that drives measurable ROI.",
      icon: <BarChart3 size={32} />,
    },
    {
      title: "Web Design",
      desc: "Modern, responsive, and conversion-optimized websites.",
      icon: <Globe size={32} />,
    },
    {
      title: "Content Writing",
      desc: "Clear, persuasive copy that communicates your brand values.",
      icon: <PenTool size={32} />,
    },
  ]

  return (
    <section id="services" className="py-24 bg-brand-gray/50 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-lime font-mono text-xs uppercase tracking-[0.4em] mb-4 block">Our Solutions</span>
            <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter">
              HOW WE HELP <span className="text-brand-lime">YOU GROW.</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1px bg-white/5 border border-white/5">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-brand-dark p-10 hover:bg-white/[0.02] transition-colors relative group overflow-hidden"
            >
              {/* Hover Effect */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-brand-lime scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              
              <div className="text-brand-lime mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                {service.icon}
              </div>
              <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">{service.title}</h3>
              <p className="text-brand-smoke leading-relaxed text-sm">
                {service.desc}
              </p>
              
              <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-brand-lime text-xs font-bold uppercase tracking-widest">
                Learn More <span>→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
