import { motion } from 'framer-motion'
import { Target, Zap, TrendingUp } from 'lucide-react'

export default function About() {
  const stats = [
    { icon: <Zap className="text-brand-lime" />, label: "Creative Exp.", value: "9+ Years" },
    { icon: <TrendingUp className="text-brand-lime" />, label: "Digital Marketing", value: "14+ Years" },
    { icon: <Target className="text-brand-lime" />, label: "Client Satisfaction", value: "100%" },
  ]

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-brand-lime font-mono text-xs uppercase tracking-[0.4em] mb-4 block">Our Philosophy</span>
            <h2 className="text-4xl md:text-5xl font-black mb-8 text-white leading-tight">
              WE DON'T JUST CREATE DESIGNS, <br />
              <span className="text-brand-lime italic">WE CREATE DIGITAL SUCCESS.</span>
            </h2>
            
            <p className="text-brand-smoke text-lg mb-8 leading-relaxed">
              Brand9Studio is a creative design and digital solutions powerhouse. We help brands build a modern, 
              trusted, and growth-ready identity. We blend clean design, smart strategy, and a strong digital 
              presence to create visuals that make your brand stand out and communicate with absolute clarity.
            </p>

            <div className="grid sm:grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="glass-panel p-6 border-white/5 hover:border-brand-lime/20 transition-all group">
                  <div className="mb-4 transform group-hover:scale-110 transition-transform">{stat.icon}</div>
                  <p className="text-2xl font-black text-white">{stat.value}</p>
                  <p className="text-[10px] text-brand-smoke uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square bg-brand-gray border border-white/10 overflow-hidden group">
              <div className="absolute inset-0 bg-brand-lime/5 group-hover:bg-brand-lime/10 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <p className="text-center font-outfit text-2xl font-medium text-white italic leading-relaxed">
                  "Design meets strategy and creativity meets business growth."
                </p>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-20 h-[1px] bg-brand-lime" />
              <div className="absolute top-0 left-0 w-[1px] h-20 bg-brand-lime" />
              <div className="absolute bottom-0 right-0 w-20 h-[1px] bg-brand-lime" />
              <div className="absolute bottom-0 right-0 w-[1px] h-20 bg-brand-lime" />
            </div>
            
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-lime/20 blur-3xl rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
