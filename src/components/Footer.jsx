const brandLogo = "/logo.png"

export default function Footer() {
  return (
    <footer className="py-8 sm:py-12 border-t border-white/5 relative z-10">
      <div className="main-container flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-8 premium-card rounded-xl py-6 sm:py-8">
        <div className="flex flex-col items-center sm:items-start gap-2">
          <div className="flex items-center gap-2 mb-2">
            <img src={brandLogo} alt="Brand9 Studio Logo" className="h-8 sm:h-10 w-auto" />
          </div>
          <p className="text-brand-smoke text-[10px] uppercase tracking-widest text-center sm:text-left">
            © {new Date().getFullYear()} Brand9Studio. All rights reserved.
          </p>
        </div>

        <div className="flex gap-4 sm:gap-8 text-center sm:text-left">
          <a href="#" className="text-brand-smoke hover:text-brand-lime text-[10px] font-bold uppercase tracking-widest transition-colors duration-300">Privacy Policy</a>
          <a href="#" className="text-brand-smoke hover:text-brand-lime text-[10px] font-bold uppercase tracking-widest transition-colors duration-300">Terms of Service</a>
        </div>
        
        <div className="text-brand-smoke text-[10px] uppercase tracking-widest text-center">
          Innovating <span className="text-brand-lime">Identity.</span>
        </div>
      </div>
    </footer>
  )
}
