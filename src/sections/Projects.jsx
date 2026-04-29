import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Filter } from 'lucide-react'

export default function Projects() {
  const [filter, setFilter] = useState('All')

  const categories = ['All', 'Branding', 'Social & Print', 'Digital/UI', 'Web Design']

  const allProjects = [
    {
      title: "Maison Mira",
      category: "Branding",
      desc: "Full brand identity and strategic design for a boutique startup.",
      color: "bg-orange-500/10",
      accent: "text-orange-500"
    },
    {
      title: "RankEnhance",
      category: "Social & Print",
      desc: "Strategic and modern designs aligned with brand vision for growth.",
      color: "bg-blue-500/10",
      accent: "text-blue-500"
    },
    {
      title: "Reflections by Aditirajan",
      category: "Web Design",
      desc: "Professional portfolio website building a unique digital presence.",
      color: "bg-purple-500/10",
      accent: "text-purple-500"
    },
    {
      title: "Digital Dashboard",
      category: "Digital/UI",
      desc: "Custom analytics dashboard for performance tracking and insights.",
      color: "bg-green-500/10",
      accent: "text-green-500"
    },
  ]

  const filteredProjects = filter === 'All' 
    ? allProjects 
    : allProjects.filter(p => p.category === filter)

  return (
    <section id="work" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-lime font-mono text-xs uppercase tracking-[0.4em] mb-4 block">Portfolio</span>
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
              FEATURED <br /> <span className="text-brand-lime">PROJECTS.</span>
            </h2>
          </motion.div>
          
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all ${
                  filter === cat 
                    ? 'bg-brand-lime text-black border-brand-lime' 
                    : 'bg-transparent text-brand-smoke border-white/10 hover:border-brand-lime/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="group relative overflow-hidden bg-brand-gray border border-white/5 hover:border-brand-lime/30 transition-all duration-700 p-8 md:p-12"
              >
                <div className="flex flex-col md:flex-row gap-12 items-center">
                  <div className="w-full md:w-1/2 aspect-video bg-black overflow-hidden relative">
                    <div className={`absolute inset-0 ${project.color} opacity-40 group-hover:opacity-60 transition-opacity`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-black text-white/10 group-hover:text-brand-lime/20 transition-colors uppercase tracking-widest">
                        {project.title.split(' ')[0]}
                      </span>
                    </div>
                    <div className="absolute top-6 left-6 px-4 py-1 bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest">
                      {project.category}
                    </div>
                  </div>

                  <div className="w-full md:w-1/2">
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-6 group-hover:text-brand-lime transition-colors uppercase">
                      {project.title}
                    </h3>
                    <p className="text-brand-smoke text-lg mb-8 leading-relaxed">
                      {project.desc}
                    </p>
                    
                    <motion.button
                      whileHover={{ x: 10 }}
                      className="flex items-center gap-3 text-white font-bold text-sm uppercase tracking-widest"
                    >
                      Explore Case Study <ExternalLink size={16} className="text-brand-lime" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
