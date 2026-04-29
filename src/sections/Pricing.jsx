import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function Pricing() {
  const packages = [
    {
      name: "Starter",
      price: "₹24,999",
      features: ["Brand Identity", "Social Media Setup", "Basic Designs", "Growth Strategy"],
      btn: "Choose Starter"
    },
    {
      name: "Growth",
      price: "₹49,999",
      features: ["Complete Branding", "Content Creation", "Performance Marketing", "Website Design", "Priority Support"],
      btn: "Choose Growth",
      featured: true
    },
    {
      name: "Custom",
      price: "Talk to Us",
      features: ["Tailored Solutions", "Enterprise Scale", "Long-term Partnership", "Dedicated Manager"],
      btn: "Contact for Quote"
    }
  ]

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-brand-lime font-mono text-xs uppercase tracking-[0.4em] mb-4 block">Pricing</span>
          <h2 className="text-5xl font-black text-white uppercase tracking-tighter">
            READY TO <span className="text-brand-lime">INVEST IN GROWTH?</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-10 border transition-all duration-500 relative ${
                pkg.featured 
                  ? 'bg-brand-lime border-brand-lime text-black scale-105 z-10' 
                  : 'bg-brand-gray border-white/5 text-white hover:border-brand-lime/30'
              }`}
            >
              {pkg.featured && (
                <div className="absolute top-0 right-0 bg-black text-brand-lime text-[8px] font-black uppercase tracking-widest px-4 py-1">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-black uppercase mb-2 tracking-tight">{pkg.name}</h3>
              <p className={`text-3xl font-black mb-8 ${pkg.featured ? 'text-black' : 'text-brand-lime'}`}>
                {pkg.price}
              </p>
              
              <ul className="space-y-4 mb-10">
                {pkg.features.map((feat, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm font-medium">
                    <Check size={16} className={pkg.featured ? 'text-black' : 'text-brand-lime'} />
                    {feat}
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-4 text-xs font-black uppercase tracking-widest transition-all ${
                pkg.featured 
                  ? 'bg-black text-white hover:scale-105' 
                  : 'bg-brand-lime text-black hover:scale-105'
              }`}>
                {pkg.btn}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
