import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Footer from '../components/Footer'

export default function PrivacyPolicyPage() {
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
              Privacy <span className="text-brand-lime">Policy</span>
            </h1>
            <p className="text-brand-smoke/70 text-sm tracking-widest uppercase font-bold">
              Effective Date: 15 May 2026
            </p>
          </div>

          <div className="prose prose-invert prose-brand max-w-none text-brand-smoke space-y-8 text-sm sm:text-base leading-relaxed">
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 uppercase tracking-widest">Introduction</h2>
              <p>Welcome to Brand9Studio. We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and safeguard your data when you interact with our website, services, advertisements, social media channels, training programs, or communication platforms.</p>
              <p>By using our services, you agree to the terms outlined in this Privacy Policy.</p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 uppercase tracking-widest">1. Information We Collect</h2>
              <ul className="list-disc pl-5 space-y-2 marker:text-brand-lime">
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Company or business name</li>
                <li>Billing information</li>
                <li>Project requirements</li>
                <li>Social media handles</li>
                <li>Advertising account access details (where required)</li>
              </ul>
              <p className="mt-4">Technical information may include IP address, browser type, device information, cookies, and analytics data.</p>
              <p>We may also store communication records including emails, WhatsApp messages, consultations, support queries, and feedback.</p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 uppercase tracking-widest">2. How We Use Your Information</h2>
              <ul className="list-disc pl-5 space-y-2 marker:text-brand-lime">
                <li>Providing digital marketing and creative services</li>
                <li>Managing client projects</li>
                <li>Running advertising campaigns</li>
                <li>Conducting training sessions and workshops</li>
                <li>Processing payments and invoices</li>
                <li>Improving our website and services</li>
                <li>Customer support and communication</li>
                <li>Sending updates and marketing communication</li>
                <li>Analytics and business reporting</li>
                <li>Legal and compliance purposes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 uppercase tracking-widest">3. Sharing of Information</h2>
              <p>We do not sell your personal information. However, we may share data with trusted third parties including advertising platforms, payment processors, CRM tools, hosting providers, analytics platforms, and legal authorities when required by law.</p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 uppercase tracking-widest">4. Cookies & Tracking Technologies</h2>
              <p>We may use cookies, pixels, and tracking technologies to analyze traffic, improve user experience, measure campaign performance, and run remarketing advertisements.</p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 uppercase tracking-widest">5. Data Security</h2>
              <p>We implement reasonable technical and organizational measures to protect your information against unauthorized access, misuse, disclosure, or loss. However, no digital system can guarantee complete security.</p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 uppercase tracking-widest">6. Client Account Access & Confidentiality</h2>
              <p>Clients may voluntarily provide access to advertising platforms, analytics tools, websites, or CMS systems for project execution. Brand9Studio treats all client information and credentials as confidential.</p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 uppercase tracking-widest">7. Third-Party Links</h2>
              <p>Our website or content may contain links to third-party websites or services. We are not responsible for the privacy practices or content of external websites.</p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 uppercase tracking-widest">8. Your Rights</h2>
              <p>You may have rights to access, correct, delete, or withdraw consent for your personal data, depending on applicable laws.</p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 uppercase tracking-widest">9. Data Retention</h2>
              <p>We retain information only as long as necessary for service delivery, legal compliance, dispute resolution, and business operations.</p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 uppercase tracking-widest">10. Children’s Privacy</h2>
              <p>Our services are not directed toward children under the age of 13, and we do not knowingly collect personal information from minors.</p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 uppercase tracking-widest">11. Updates to This Privacy Policy</h2>
              <p>We may update this Privacy Policy periodically. Updated versions will be published with a revised effective date.</p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 uppercase tracking-widest">12. Contact Information</h2>
              <p><strong>Brand9Studio</strong><br />
              Email: support@brand9studio.com<br />
              Phone: +91 9667733182<br />
              Website: <a href="https://www.brand9studio.com" target="_blank" rel="noopener noreferrer" className="text-brand-lime hover:underline font-bold">www.brand9studio.com</a></p>
            </section>

            <div className="mt-12 p-6 rounded-xl border border-white/10 bg-white/5">
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-widest">Disclaimer</h3>
              <p className="text-xs text-brand-smoke/60 leading-relaxed">This Privacy Policy is a general business policy template and may require customization depending on applicable laws, payment gateways, international clients, and operational requirements. For strict legal compliance, consult a qualified legal professional.</p>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
