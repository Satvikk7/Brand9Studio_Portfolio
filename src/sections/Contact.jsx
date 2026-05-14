import { motion } from 'framer-motion'
import { MessageSquare, Mail, Instagram, Linkedin, ArrowRight, Facebook } from 'lucide-react'

export default function Contact() {
  const socials = [
    { icon: <Instagram size={20} />, label: 'Instagram', link: 'https://instagram.com/brand9studio' },
    { icon: <Linkedin size={20} />, label: 'LinkedIn', link: 'https://linkedin.com/company/brand9studio' },
    { icon: <Facebook size={20} />, label: 'Facebook', link: 'https://www.facebook.com/people/Brand9Studio/61584349220080/?rdid=EIrgieF6o5OfEVxG&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1C9HJ2SP5m%2F' },
    { icon: <MessageSquare size={20} />, label: 'WhatsApp', link: 'https://wa.me/919667733182' },
  ]

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="main-container">
        <div className="grid lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-lime font-mono text-xs uppercase tracking-[0.4em] mb-4 block">Get in Touch</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6 sm:mb-8 tracking-tighter uppercase">
              LET'S BUILD <br />
              <span className="text-brand-lime italic">SOMETHING BIG.</span>
            </h2>

            <p className="text-brand-smoke text-sm sm:text-base md:text-lg mb-8 sm:mb-12 leading-relaxed max-w-md">
              Ready to take your brand to the next level? Contact us today for a free growth consultation.
            </p>

            <div className="space-y-6">
              <a href="mailto:support@brand9studio.com" className="flex items-center gap-6 group">
                <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-lime/60 group-hover:bg-brand-lime/10 transition-all duration-300 flex-shrink-0">
                  <Mail size={20} className="text-white group-hover:text-brand-lime transition-colors" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] sm:text-[10px] text-brand-smoke uppercase tracking-widest mb-1">Email Us</p>
                  <p className="text-base sm:text-lg lg:text-xl font-bold text-white group-hover:text-brand-lime transition-colors truncate">support@brand9studio.com</p>
                </div>
              </a>

              <div className="pt-8 flex gap-4">
                {socials.map((social, i) => (
                  <a
                    key={i}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-brand-lime/40 hover:text-brand-lime transition-all duration-300"
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
            className="premium-card p-8 md:p-12 border-white/5 relative"
          >
            <form className="space-y-4 sm:space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] sm:text-[10px] font-bold text-brand-smoke uppercase tracking-widest ml-1">Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-black/30 border border-white/10 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-white placeholder-white/30 focus:outline-none focus:border-brand-lime/60 focus:bg-black/50 transition-all duration-300 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] sm:text-[10px] font-bold text-brand-smoke uppercase tracking-widest ml-1">Email</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-black/30 border border-white/10 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-white placeholder-white/30 focus:outline-none focus:border-brand-lime/60 focus:bg-black/50 transition-all duration-300 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] sm:text-[10px] font-bold text-brand-smoke uppercase tracking-widest ml-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="w-full bg-black/30 border border-white/10 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-white placeholder-white/30 focus:outline-none focus:border-brand-lime/60 focus:bg-black/50 transition-all duration-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] sm:text-[10px] font-bold text-brand-smoke uppercase tracking-widest ml-1">Service Required</label>
                <select className="w-full bg-black/30 border border-white/10 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-white focus:outline-none focus:border-brand-lime/60 focus:bg-black/50 transition-all duration-300 rounded-lg appearance-none">
                  <option>Branding & Creative Design</option>
                  <option>Reels, Videos & Photography</option>
                  <option>Social Media Management & Marketing</option>
                  <option>Performance Marketing (Google & Meta Ads)</option>
                  <option>Website Design & Development</option>
                  <option>Content Writing & Creative Copy</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] sm:text-[10px] font-bold text-brand-smoke uppercase tracking-widest ml-1">Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your brand..."
                  className="w-full bg-black/30 border border-white/10 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-white placeholder-white/30 focus:outline-none focus:border-brand-lime/60 focus:bg-black/50 transition-all duration-300 resize-none rounded-lg"
                ></textarea>
              </div>

              <button className="w-full py-3 sm:py-5 premium-btn text-black font-outfit font-black uppercase tracking-[0.2em] text-xs sm:text-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 sm:gap-3 group rounded-lg">
                Send Message <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
