import { motion } from 'framer-motion'

export default function ClientLogos() {
  const clients = ["MAISON MIRA", "RANKENHANCE", "REFLECTIONS", "DR. ANUJ MUDGAL", "INT. TRADE SOLUTIONS"]

  return (
    <div className="py-12 bg-black overflow-hidden border-y border-white/5 relative">
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent" />
      </div>
      
      <motion.div 
        className="flex gap-20 whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...clients, ...clients].map((client, i) => (
          <span 
            key={i} 
            className="text-white/20 text-4xl font-black uppercase tracking-[0.2em] hover:text-brand-lime transition-colors cursor-default"
          >
            {client}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
