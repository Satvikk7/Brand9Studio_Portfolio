import { motion } from 'framer-motion'
import { Figma, Palette, Code2, Zap } from 'lucide-react'

export default function SoftwareTools() {
  const tools = [
    { icon: <Figma size={32} className="text-brand-lime" />, name: "Figma" },
    { icon: <Palette size={32} className="text-brand-lime" />, name: "Adobe XD" },
    { icon: <Code2 size={32} className="text-brand-lime" />, name: "Web Dev" },
    { icon: <Zap size={32} className="text-brand-lime" />, name: "Spline" },
  ]

  return (
    <section id="tools" className="py-8 sm:py-12 bg-black overflow-hidden border-y border-white/5 relative">
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-r from-black to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-l from-black to-transparent" />
      </div>
      
      <motion.div 
        className="flex gap-12 sm:gap-24 whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...tools, ...tools, ...tools].map((tool, i) => (
          <div 
            key={i} 
            className="flex flex-col items-center gap-3 min-w-max"
          >
            <div className="p-4 sm:p-6 rounded-xl bg-black/40 border border-white/10 hover:border-brand-lime/40 transition-colors cursor-default group">
              {tool.icon}
            </div>
            <span className="text-white/40 text-[10px] sm:text-xs font-bold uppercase tracking-widest group-hover:text-brand-lime transition-colors">
              {tool.name}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
