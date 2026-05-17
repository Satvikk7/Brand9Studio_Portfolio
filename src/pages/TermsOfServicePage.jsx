import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Footer from '../components/Footer'

export default function TermsOfServicePage() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bg-brand-dark min-h-screen text-white pt-24 pb-0 flex flex-col">
      
      <main className="flex-1 main-container max-w-4xl py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight mb-4">
              Terms & <span className="text-brand-lime">Conditions</span>
            </h1>
            <p className="text-brand-smoke/70 text-sm tracking-widest uppercase font-bold">
              Effective Date: 5 Nov 2025
            </p>
          </div>

          <div className="prose prose-invert prose-brand max-w-none text-brand-smoke space-y-8 text-sm sm:text-base leading-relaxed">
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 uppercase tracking-widest">1. Company Information</h2>
              <p><strong>Brand Name:</strong> Brand9Studio<br />
              <strong>Website:</strong> <a href="https://www.brand9studio.com" target="_blank" rel="noopener noreferrer" className="text-brand-lime hover:underline font-bold">www.brand9studio.com</a><br />
              <strong>Email:</strong> support@brand9studio.com<br />
              <strong>Phone:</strong> +91 9667733182</p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 uppercase tracking-widest">2. Services Offered</h2>
              <p>Brand9Studio provides services including Digital Marketing, Social Media Marketing, Performance Marketing, Branding & Creative Design, Website Design & Development, SEO, Advertising Campaign Management, Content Creation, Marketing Consultation, and Training & Workshops.</p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 uppercase tracking-widest">3. User Responsibilities</h2>
              <p>Users agree to provide accurate information, avoid unlawful activities, not copy or misuse company content, and maintain confidentiality of credentials and communications.</p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 uppercase tracking-widest">4. Payments & Billing</h2>
              <p>Payments must be made as per invoices or agreements. Advance payments may be required. Delayed payments may result in service suspension. Payments are generally non-refundable unless agreed otherwise in writing.</p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 uppercase tracking-widest">5. Project Timelines</h2>
              <p>Project timelines depend on approvals, content submission, and scope changes. Brand9Studio is not responsible for delays caused by client-side or third-party issues.</p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 uppercase tracking-widest">6. Revisions & Changes</h2>
              <p>Limited revisions may be included depending on project scope. Additional revisions or redesign requests may incur extra charges.</p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 uppercase tracking-widest">7. Intellectual Property</h2>
              <p>All designs and deliverables remain property of Brand9Studio until full payment is received. Completed work may be showcased in portfolios and case studies.</p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 uppercase tracking-widest">8. Third-Party Platforms</h2>
              <p>Services may involve platforms such as Google Ads, Meta, YouTube, Shopify, WordPress, and others. Brand9Studio is not responsible for platform outages or policy changes.</p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 uppercase tracking-widest">9. Limitation of Liability</h2>
              <p>Brand9Studio shall not be liable for indirect losses, data loss, business interruption, or advertising performance fluctuations.</p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 uppercase tracking-widest">10. Confidentiality</h2>
              <p>Client information shared during projects will be treated confidentially except where disclosure is required by law.</p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 uppercase tracking-widest">11. Cancellation & Termination</h2>
              <p>Either party may terminate services with written notice. Payments for completed work remain payable.</p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 uppercase tracking-widest">12. Website Usage</h2>
              <p>Users must not attempt unauthorized access, introduce malicious code, or misuse website content.</p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 uppercase tracking-widest">13. Disclaimer</h2>
              <p>Brand9Studio does not guarantee specific rankings, sales, leads, or ROI outcomes unless explicitly agreed in writing.</p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 uppercase tracking-widest">14. Governing Law</h2>
              <p>These Terms & Conditions are governed under the laws of India and subject to the jurisdiction of courts in Delhi.</p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 uppercase tracking-widest">15. Changes to Terms</h2>
              <p>Brand9Studio reserves the right to update these Terms & Conditions at any time without prior notice.</p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 uppercase tracking-widest">16. Contact Us</h2>
              <p><strong>Brand9Studio</strong><br />
              Website: <a href="https://www.brand9studio.com" target="_blank" rel="noopener noreferrer" className="text-brand-lime hover:underline font-bold">www.brand9studio.com</a><br />
              Email: support@brand9studio.com<br />
              Phone: +91 9667733182</p>
            </section>
          </div>
        </motion.div>
      </main>

      <button
        type="button"
        onClick={() => navigate('/', { state: { scrollY: location.state?.scrollY ?? 0 } })}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 inline-flex items-center gap-2 px-4 sm:px-5 py-3 rounded-full border border-brand-lime/30 bg-black/70 backdrop-blur-xl text-brand-lime text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-lg shadow-black/30 hover:bg-brand-lime/10 hover:border-brand-lime/60 hover:text-brand-lime transition-all duration-300"
      >
        <ArrowLeft size={16} /> Go Back
      </button>

      <Footer />
    </div>
  )
}
