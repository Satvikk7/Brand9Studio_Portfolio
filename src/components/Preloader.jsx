import { motion } from 'framer-motion'

export default function Preloader() {
  const brandWords = ["CLEAN", "STRATEGIC", "POWERFUL", "BRAND9"]
  
  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
      className="fixed inset-0 z-[10000] bg-brand-dark flex items-center justify-center overflow-hidden"
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Text Sequence */}
        <div className="h-12 overflow-hidden mb-4">
          <motion.div
            animate={{ y: [0, -48, -96, -144] }}
            transition={{ 
              duration: 2, 
              times: [0, 0.3, 0.6, 0.9],
              ease: "easeInOut",
              repeat: 0
            }}
            className="flex flex-col items-center"
          >
            {brandWords.map((word, i) => (
              <span key={i} className="text-4xl font-black text-white h-12 flex items-center tracking-tighter">
                {word}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Loading Bar */}
        <div className="w-48 h-[2px] bg-white/10 relative overflow-hidden rounded-full">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 bg-brand-lime"
          />
        </div>
        
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-lime/10 blur-[100px] rounded-full" />
      </div>
    </motion.div>
  )
}
