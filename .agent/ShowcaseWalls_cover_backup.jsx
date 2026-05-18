import { motion } from 'framer-motion'

const walls = [
  '/showcase/1.jpg',
  '/showcase/2.jpg',
  '/showcase/3.jpg',
  '/showcase/4.jpg',
  '/showcase/5.jpg'
]

export default function ShowcaseWalls() {
  return (
    <section id="showcase-walls" className="relative bg-black overflow-hidden">
      {walls.map((src, index) => (
        <div
          key={index}
          className="h-screen w-full relative overflow-hidden bg-black border-b border-white/[0.04]"
        >
          {/* Edge-to-edge animated image wrapper (strictly full-screen object-cover) */}
          <motion.div
            initial={{ scale: 1.05, opacity: 0.9 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.0, ease: [0.215, 0.61, 0.355, 1] }}
            className="w-full h-full"
          >
            <img
              src={src}
              alt={`Showcase Wall ${index + 1}`}
              className="w-full h-full object-cover select-none"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </div>
      ))}
    </section>
  )
}
