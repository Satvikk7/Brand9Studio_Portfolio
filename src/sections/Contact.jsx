import { motion } from 'framer-motion'
import { MessageSquare, Mail, Instagram, Linkedin, ArrowRight } from 'lucide-react'

export default function Contact() {
  const socials = [
    { icon: <Instagram size={20} />, label: "Instagram", link: "https://instagram.com/brand9studio" },
    { icon: <Linkedin size={20} />, label: "LinkedIn", link: "https://linkedin.com/company/brand9studio" },
    { icon: <MessageSquare size={20} />, label: "WhatsApp", link: "https://wa.me/message/brand9studio" },
  ]

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-lime font-mono text-xs uppercase tracking-[0.4em] mb-4 block">Get in Touch</span>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase">
              LET'S BUILD <br />
              <span className="text-brand-lime italic">SOMETHING BIG.</span>
            </h2>
            
            <p className="text-brand-smoke text-lg mb-12 leading-relaxed max-w-md">
              Ready to take your brand to the next level? Contact us today for a free growth consultation.
            </p>

            <div className="space-y-6">
              <a href="mailto:hello@brand9studio.com" className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-lime group-hover:bg-brand-lime transition-all duration-500">
                  <Mail className="text-white group-hover:text-black transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] text-brand-smoke uppercase tracking-widest mb-1">Email Us</p>
                  <p className="text-xl font-bold text-white group-hover:text-brand-lime transition-colors">hello@brand9studio.com</p>
                </div>
              </a>

              <div className="pt-8 flex gap-4">
                {socials.map((social, i) => (
                  <a
                    key={i}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-white hover:bg-brand-lime hover:text-black transition-all hover:-translate-y-1"
                    title={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-8 md:p-12 border-white/5 relative"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-brand-smoke uppercase tracking-widest ml-1">Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-black/50 border border-white/10 px-6 py-4 text-white focus:outline-none focus:border-brand-lime transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-brand-smoke uppercase tracking-widest ml-1">Email</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full bg-black/50 border border-white/10 px-6 py-4 text-white focus:outline-none focus:border-brand-lime transition-colors"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-brand-smoke uppercase tracking-widest ml-1">Service Required</label>
                <select className="w-full bg-black/50 border border-white/10 px-6 py-4 text-white focus:outline-none focus:border-brand-lime transition-colors appearance-none">
                  <option>Branding</option>
                  <option>Digital Marketing</option>
                  <option>Web Design</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-brand-smoke uppercase tracking-widest ml-1">Message</label>
                <textarea 
                  rows={4}
                  placeholder="Tell us about your brand..."
                  className="w-full bg-black/50 border border-white/10 px-6 py-4 text-white focus:outline-none focus:border-brand-lime transition-colors resize-none"
                ></textarea>
              </div>

              <button className="w-full py-5 bg-brand-lime text-black font-outfit font-black uppercase tracking-[0.2em] text-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group">
                Send Message <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
