import { motion } from 'framer-motion';

const walls = [
  { src: '/showcase/1.png', bg: '#171718', fullWidth: true },
  { src: '/showcase/2.png', bg: '#111111', fullWidth: true },
  { src: '/showcase/3.png', bg: '#1A1919', fullWidth: true },
  { src: '/showcase/4.png', bg: '#CACACA', fullWidth: true },
  { src: '/showcase/5.png', bg: '#ADACAC', fullWidth: true },
  { src: '/showcase/6.png', bg: '#000001', fullWidth: true },
];

export default function ShowcaseWalls() {
  return (
    <section id="showcase-walls" className="relative overflow-hidden">
      {walls.map((wall, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="w-full relative"
          style={{ background: wall.bg }}
        >
          {wall.fullWidth ? (
            // Full-width: image already contains its own background
            <img
              src={wall.src}
              alt={`Showcase Wall ${index + 1}`}
              className="w-full h-auto block select-none"
              loading="lazy"
              decoding="async"
            />
          ) : (
            // Contained: centered block with bg color bleeding on sides
            <div className="w-[92%] sm:w-[82%] md:w-[74%] lg:w-[70%] mx-auto">
              <img
                src={wall.src}
                alt={`Showcase Wall ${index + 1}`}
                className="w-full h-auto block select-none"
                loading="lazy"
                decoding="async"
              />
            </div>
          )}
        </motion.div>
      ))}
    </section>
  );
}

