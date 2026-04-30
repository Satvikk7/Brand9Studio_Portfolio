import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

export default function Testimonials() {
  const testimonials = [
    {
      name: "Mira Tiwari",
      role: "Founder of Maison Mira",
      content: "When we started our boutique as a startup, Brand 9 Studio supported us at every step. From brand identity to design and marketing guidance, their team played a key role in helping our business grow. We're truly grateful for their support and highly recommend them.",
      image: "M"
    },
    {
      name: "Vini Mishra",
      role: "Founder of RankEnhance",
      content: "Working with Brand 9 Studio was a great experience for RankEnhance Brand Promotions. Their designs are strategic, modern, and perfectly aligned with our brand vision. The team is professional, reliable, and delivers on time. Highly recommended for brands looking to elevate their visual identity.",
      image: "V"
    },
    {
      name: "Aditi Rajan",
      role: "Founder of Reflections by aditirajan",
      content: "Brand9Studio did an excellent job on my portfolio website. They were highly accommodating with changes, flexible with schedules to connect in my time zone, kept me in the loop throughout, and delivered everything on time. Prices are affordable too. What else one could ask for ! Superb.",
      image: "A"
    },
    {
      name: "Dr. Anuj Mudgal",
      role: "Doctor",
      content: "I'm extremely satisfied with the branding work done by Brand9Studio. The logo and complete brand kit reflect professionalism and clarity, exactly what I was looking for. Their understanding of design, attention to detail, and smooth coordination made the entire process effortless.",
      image: "D"
    },
    {
      name: "Neeraj Singh",
      role: "International Trade Solutions",
      content: "Brand9Studio delivered exceptional design work with a perfect balance of creativity and professionalism. The designs were modern, well-structured, and aligned exactly with my requirements. Their attention to detail and understanding of brand aesthetics truly stand out. I highly recommend Brand9Studio for quality design solutions.",
      image: "N"
    }
  ]

  return (
    <section id="testimonials" className="py-24 bg-brand-gray/30">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16"
        >
          <span className="text-brand-lime font-mono text-xs uppercase tracking-[0.4em] mb-4 block">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
            TRUSTED BY <span className="text-brand-lime">VISIONARIES.</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-6 sm:p-8 lg:p-10 text-left border-white/5 relative group w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.33%-1.34rem)]"
            >
              <Quote size={32} className="text-brand-lime/20 absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 group-hover:text-brand-lime/40 transition-colors" />
              
              <p className="text-brand-smoke italic mb-6 sm:mb-8 leading-relaxed relative z-10 text-xs sm:text-sm">
                "{t.content}"
              </p>
              
              <div className="flex items-center gap-3 sm:gap-4 mt-auto">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-brand-lime flex items-center justify-center text-black font-black text-lg sm:text-xl flex-shrink-0">
                  {t.image}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-white font-bold uppercase text-xs sm:text-sm truncate">{t.name}</h4>
                  <p className="text-brand-lime text-[9px] sm:text-[10px] font-bold uppercase tracking-widest truncate">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
