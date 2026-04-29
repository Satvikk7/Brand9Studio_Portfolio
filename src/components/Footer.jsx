export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2 mb-2">
            <img src="/logo.png" alt="Brand9 Studio Logo" className="h-6 w-auto" />
          </div>
          <p className="text-brand-smoke text-[10px] uppercase tracking-widest">
            © {new Date().getFullYear()} Brand9Studio. All rights reserved.
          </p>
        </div>

        <div className="flex gap-8">
          <a href="#" className="text-brand-smoke hover:text-brand-lime text-[10px] font-bold uppercase tracking-widest transition-colors">Privacy Policy</a>
          <a href="#" className="text-brand-smoke hover:text-brand-lime text-[10px] font-bold uppercase tracking-widest transition-colors">Terms of Service</a>
        </div>
        
        <div className="text-brand-smoke text-[10px] uppercase tracking-widest">
          Innovating <span className="text-brand-lime">Identity.</span>
        </div>
      </div>
    </footer>
  )
}
