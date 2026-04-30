import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Layers3, Target } from 'lucide-react'

export const caseStudies = [
  {
    id: 'calendar-campaign-system',
    title: 'Calendar Campaign System',
    folder: 'Calendar Report Design',
    summary: 'A coordinated calendar-led communication system that connected report design, envelope graphics, and campaign delivery into one branded experience.',
    challenge: 'The layout needed to feel premium while still remaining clear for multiple print touchpoints.',
    approach: 'Built a consistent visual grid, unified typography, and a repeatable cover-to-insert format across assets.',
    outcome: 'Created a cohesive presentation system that can be reused across seasonal campaigns and stakeholder communications.',
    icon: Sparkles
  },
  {
    id: 'digital-portal-interface-suite',
    title: 'Digital Portal Interface Suite',
    folder: 'Dashboard (Web Portal)',
    summary: 'A digital product UI direction spanning dashboard screens, style guidance, and loyalty portal concepts.',
    challenge: 'The screens had to communicate complex information without visual overload.',
    approach: 'Used strong hierarchy, modular cards, and restrained color accents to keep the interface readable.',
    outcome: 'Delivered a cleaner product language that can scale across portal states and future modules.',
    icon: Layers3
  },
  {
    id: 'brand-identity-toolkit',
    title: 'Brand Identity Toolkit',
    folder: 'Logo designs',
    summary: 'A foundational identity toolkit covering logos, business cards, letterheads, and supporting collateral.',
    challenge: 'Each asset needed to feel consistent while still working independently across print and digital formats.',
    approach: 'Defined a sharp identity system with aligned spacing, color rules, and a unified editorial tone.',
    outcome: 'Established a flexible brand toolkit that supports both day-to-day use and high-impact client presentation.',
    icon: Target
  }
]

export const latestCaseStudy = caseStudies[caseStudies.length - 1]

function highlightCaseStudy(studyId) {
  const target = document.getElementById(`case-study-${studyId}`)
  if (!target) return

  target.scrollIntoView({ behavior: 'smooth', block: 'center' })
  window.dispatchEvent(new CustomEvent('highlight-case-study', { detail: { studyId } }))
}

export default function CaseStudies() {
  const [activeStudyId, setActiveStudyId] = useState(null)

  useEffect(() => {
    let timeoutId = null

    const handleHighlight = (event) => {
      const studyId = event.detail?.studyId
      if (!studyId) return

      setActiveStudyId(studyId)
      window.clearTimeout(timeoutId)
      timeoutId = window.setTimeout(() => setActiveStudyId(null), 2000)
    }

    window.addEventListener('highlight-case-study', handleHighlight)

    return () => {
      window.removeEventListener('highlight-case-study', handleHighlight)
      window.clearTimeout(timeoutId)
    }
  }, [])

  return (
    <section id="case-studies" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-lime font-mono text-xs uppercase tracking-[0.4em] mb-4 block">Storytelling</span>
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
              CASE <br /> <span className="text-brand-lime">STUDIES.</span>
            </h2>
          </motion.div>

          <p className="max-w-2xl text-brand-smoke text-base md:text-lg leading-relaxed">
            Deeper narratives for selected projects: what the challenge was, how the work was approached, and what the delivery achieved.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => {
            const Icon = study.icon
            const isActive = activeStudyId === study.id

            return (
              <motion.article
                id={`case-study-${study.id}`}
                key={study.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={`bg-brand-gray border transition-all duration-500 p-8 rounded-[1.75rem] ${
                  isActive
                    ? 'border-brand-lime shadow-[0_0_0_1px_rgba(164,255,78,0.35),0_0_40px_rgba(164,255,78,0.18)] scale-[1.01]'
                    : 'border-white/5 hover:border-brand-lime/30'
                }`}
              >
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-brand-smoke">
                    {study.folder}
                  </span>
                  <div className="w-12 h-12 rounded-full bg-brand-lime/10 border border-brand-lime/20 flex items-center justify-center">
                    <Icon size={18} className="text-brand-lime" />
                  </div>
                </div>

                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
                  {study.title}
                </h3>
                <p className="text-brand-smoke leading-relaxed mb-6">
                  {study.summary}
                </p>

                <div className="space-y-5 text-sm">
                  <div>
                    <p className="text-brand-lime font-bold uppercase tracking-widest text-[10px] mb-2">Challenge</p>
                    <p className="text-brand-smoke leading-relaxed">{study.challenge}</p>
                  </div>
                  <div>
                    <p className="text-brand-lime font-bold uppercase tracking-widest text-[10px] mb-2">Approach</p>
                    <p className="text-brand-smoke leading-relaxed">{study.approach}</p>
                  </div>
                  <div>
                    <p className="text-brand-lime font-bold uppercase tracking-widest text-[10px] mb-2">Outcome</p>
                    <p className="text-brand-smoke leading-relaxed">{study.outcome}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => highlightCaseStudy(study.id)}
                  className="mt-8 flex items-center gap-3 text-white font-bold text-xs uppercase tracking-widest group/button"
                >
                  Explore Story
                  <ArrowRight size={15} className="text-brand-lime transition-transform group-hover/button:translate-x-1" />
                </button>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
