import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ChevronDown, CheckCircle2, TrendingUp, Lightbulb, Target } from 'lucide-react'

// ─── Brand accent (shared across all stories) ───────────────────────────────
const ACCENT = '#C4EF47' // brand-lime

// ─── Data ────────────────────────────────────────────────────────────────────
const stories = [
  {
    id: '01',
    client: 'DIGIMAC ONE SOLUTION',
    services: 'CRM | AI Automation | Custom IT Solutions',
    logo: '/clients/digimac-logo.png',
    logoBg: 'linear-gradient(135deg, #0a1628 0%, #0d2040 100%)',
    clientNeed:
      'The client needed to communicate complex technology solutions in a simple, professional and business-focused way while establishing a strong digital presence.',
    whatWeDid:
      'We managed creative design and social media to clearly communicate CRM, AI Automation and Custom IT Solutions. We also helped grow the brand\'s followers and developed a premium, professional social media presence that strengthened credibility and trust while supporting potential lead generation.',
    benefits: [
      'Clearer positioning of technology solutions',
      'Professional and consistent social media presence',
      'Easy-to-understand communication of complex services',
      'Stronger brand credibility and digital visibility',
    ],
    impact:
      'Helped position the company\'s technology offerings not simply as services, but as practical business solutions.',
  },
  {
    id: '02',
    client: 'WETLANDS',
    services: 'Semi-Government Project | Creative Communication',
    logo: '/clients/wetlands-logo.png',
    logoBg: 'linear-gradient(135deg, #ffffff 0%, #f0f4f8 100%)',
    clientNeed:
      'The project required professional, clear and visually engaging communication across reports, envelopes, brochures and other required creative materials.',
    whatWeDid:
      'We developed creative communication and visual assets aligned with the project\'s requirements and professional standards.',
    benefits: [
      'More professional project presentation',
      'Clearer visual communication of information',
      'Consistent creative language',
      'Stronger public-facing communication',
    ],
    impact:
      'Made important project information easier to communicate through a credible, professional and consistent visual identity.',
  },
  {
    id: '03',
    client: 'RANKENHANCE',
    services: 'Digital Marketing Agency | Website + Creative Communication',
    logo: '/clients/rankenhance-logo.png',
    logoBg: 'linear-gradient(135deg, #06152e 0%, #0a2046 100%)',
    clientNeed:
      'The agency needed a stronger digital presence to professionally showcase its digital marketing capabilities.',
    whatWeDid:
      'We developed the website along with simple, easy-to-understand and impactful creatives. Clear messaging and strong content helped communicate their services effectively. We also supported consistent social media communication to build organic reach, followers and potential client interest.',
    benefits: [
      'Professional business website',
      'Stronger presentation of services and capabilities',
      'Better first impression for prospects',
      'Stronger digital foundation to support business enquiries',
    ],
    impact:
      'Established a strong digital touchpoint for the agency to present its expertise and engage potential clients.',
  },
  {
    id: '04',
    client: 'FABB CREATION',
    services: 'Fashion & Clothing Brand | Social Media',
    logo: '/clients/fabb-creation-logo.png',
    logoBg: 'linear-gradient(135deg, #1f0d10 0%, #2e1218 100%)',
    clientNeed:
      'The brand needed to establish itself on social media and build a consistent digital presence.',
    whatWeDid:
      'We set up the social media presence and developed presentable, engaging product creatives to strengthen the brand\'s online communication.',
    benefits: [
      'Established social media presence',
      'Consistent visual communication',
      'Professional product presentation',
      'Strong foundation for future audience building',
    ],
    impact:
      'Helped move the brand from a traditional presence to a more visible and structured digital presence.',
  },
  {
    id: '05',
    client: 'FLYTSHIRTS',
    services: 'Clothing Brand | Built From Scratch',
    logo: '/clients/Fly tshirts.png',
    logoBg: 'linear-gradient(135deg, #0d1020 0%, #161a35 100%)',
    clientNeed:
      'The brand needed to establish its complete digital presence from the ground up.',
    whatWeDid:
      'Despite being one of our lower-budget projects, we built a stable and presentable website within the client\'s budget and established its social media presence. Since the client wanted to grow organically without relying on paid marketing, we focused on creating a strong digital foundation capable of supporting long-term organic growth.',
    benefits: [
      'Complete digital foundation',
      'Professional and functional website',
      'Structured social media presence',
      'Platform for building organic visibility',
      'Scalable foundation for future digital marketing',
    ],
    impact:
      'Turned an early-stage business idea into a market-ready brand with a complete digital foundation.',
  },
  {
    id: '06',
    client: 'PARVEESHAK',
    services: 'AI Camera Solutions | Testimonial Video Production',
    logo: '/clients/parveeshak-logo.png',
    logoBg: 'linear-gradient(135deg, #ffffff 0%, #f0f4f8 100%)',
    clientNeed:
      'The client needed to demonstrate the value of its AI camera solutions through authentic customer experiences.',
    whatWeDid:
      'We handled high-quality customer testimonial video shoots and professional editing to clearly showcase the product value and customer experience.',
    benefits: [
      'Authentic customer testimonial content',
      'Stronger social proof',
      'Greater credibility for the product',
      'Trust-building content for prospects and sales conversations',
    ],
    impact:
      'Helped communicate product value through real customer experiences rather than just product claims.',
  },
  {
    id: '07',
    client: 'DR. ANUJ MUDGAL CLINIC',
    services: 'Healthcare | Complete Branding',
    logo: '/clients/dr-anuj-mudgal-logo.png',
    logoBg: 'linear-gradient(135deg, #091a1a 0%, #0d2626 100%)',
    clientNeed:
      'The clinic needed a professional, trustworthy and consistent brand identity.',
    whatWeDid:
      'We developed the clinic\'s professional branding and visual communication, helping establish a stronger identity and build trust among patients in a smaller-city market.',
    benefits: [
      'Professional brand identity',
      'Consistent patient-facing communication',
      'Stronger first impression',
      'Recognizable clinic identity',
      'Stronger foundation for patient trust',
    ],
    impact:
      'Helped establish the clinic as a professional and trustworthy healthcare brand.',
  },
  {
    id: '08',
    client: 'LAVISTA PARK FAMILY DENTISTRY',
    services: 'Healthcare | Google Ads',
    logo: '/clients/lavista-park-logo.png',
    logoBg: 'linear-gradient(135deg, #09121e 0%, #0e1c2e 100%)',
    clientNeed:
      'The clinic needed to reach potential patients actively searching for dental services on Google.',
    whatWeDid:
      'We strategically managed Google Ads campaigns to reach relevant, high-intent audiences and support the generation of better-quality, qualified leads.',
    benefits: [
      'Visibility among high-intent audiences',
      'Direct digital reach to potential patients',
      'Measurable customer acquisition channel',
      'Opportunity to generate patient enquiries',
    ],
    impact:
      'Placed the clinic in front of people who were actively searching for dental services and closer to taking action.',
  },
  {
    id: '09',
    client: 'SUNNO AUR SEEKHO',
    services: 'Education Content | YouTube + Social Media',
    logo: '/clients/sunno-aur-seekho-logo.png',
    logoBg: 'linear-gradient(135deg, #1a1000 0%, #2a1c00 100%)',
    clientNeed:
      'The brand needed to consistently build and distribute educational content across digital platforms.',
    whatWeDid:
      'We managed and organically grew the YouTube channel and social media presence, taking the channel close to monetization.',
    benefits: [
      'Structured YouTube presence',
      'Consistent social media communication',
      'Wider distribution of educational content',
      'Growing digital audience base',
      'Stronger overall brand visibility',
    ],
    impact:
      'Helped transform educational expertise into a consistent digital content ecosystem with a growing audience.',
  },
  {
    id: '10',
    client: 'INDIAN POLYMER',
    services: 'B2B Rubber Products | Complete Digital Ecosystem',
    logo: '/clients/indian-polymer-logo.png',
    logoBg: 'linear-gradient(135deg, #100a1a 0%, #1c102e 100%)',
    clientNeed:
      'The traditional B2B business needed a professional digital presence and stronger online visibility to reach broader markets.',
    whatWeDid:
      'We handled the website, SEO, brochure, social media and multiple creative requirements. This helped the business present itself more effectively to international markets, reach a global audience and create opportunities for international business.',
    benefits: [
      'Professional business website',
      'Improved online discoverability through SEO',
      'Stronger B2B brand presentation',
      'Professional brochure for sales communication',
      'Consistent social media presence',
      'Multiple digital touchpoints for prospective buyers',
    ],
    impact:
      'Built a connected website + SEO + social media + sales collateral ecosystem to support international visibility and B2B business development.',
  },
]

// ─── Animations ───────────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const slideLeftVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

const slideRightVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

const expandVariants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: { height: 'auto', opacity: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

// ─── Story Card ───────────────────────────────────────────────────────────────
function StoryCard({ story, index }) {
  const [expanded, setExpanded] = useState(index === 0) // First story open by default
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      variants={fadeUpVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm"
      style={{ contain: 'layout paint' }}
    >
      {/* Gradient accent line top */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)` }}
      />

      {/* ── Header (always visible) ── */}
      <button
        type="button"
        onClick={() => setExpanded(prev => !prev)}
        className="w-full text-left group"
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-4 sm:gap-6 p-6 sm:p-8 lg:p-10">
          {/* Story number */}
          <span
            className="font-mono text-3xl sm:text-4xl font-black tracking-tighter flex-shrink-0 select-none"
            style={{ color: ACCENT, opacity: 0.35 }}
          >
            {story.id}
          </span>

          {/* Logo */}
          <div className="w-24 sm:w-32 h-14 sm:h-16 flex-shrink-0 flex items-center justify-center">
            {story.logo ? (
              <img
                src={story.logo}
                alt={`${story.client} logo`}
                className="max-w-full max-h-full object-contain"
                loading="lazy"
                decoding="async"
              />
            ) : (
              // Placeholder shown when logo is not yet provided
              <div
                className="w-full h-full rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-1"
                style={{ borderColor: `${ACCENT}40`, background: story.logoBg }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: `${ACCENT}99` }}>
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span
                  className="font-mono text-[8px] uppercase tracking-widest leading-none"
                  style={{ color: `${ACCENT}80` }}
                >
                  Logo
                </span>
              </div>
            )}
          </div>

          {/* Title block */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-black text-base sm:text-lg lg:text-xl uppercase tracking-tight truncate">
              {story.client}
            </h3>
            <p
              className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] mt-1"
              style={{ color: ACCENT }}
            >
              {story.services}
            </p>
          </div>

          {/* Chevron */}
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/25 transition-colors duration-200"
          >
            <ChevronDown size={16} className="text-white/50 group-hover:text-white/80 transition-colors duration-200" />
          </motion.div>
        </div>
      </button>

      {/* ── Expandable body ── */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="body"
            variants={expandVariants}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            style={{ overflow: 'hidden' }}
          >
            <div className="px-6 sm:px-8 lg:px-10 pb-8 sm:pb-10 lg:pb-12">
              {/* Divider */}
              <div className="w-full h-px bg-white/[0.06] mb-8" />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Left column */}
                <div className="space-y-8">
                  {/* Client Need */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb size={14} style={{ color: ACCENT }} />
                      <span
                        className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold"
                        style={{ color: ACCENT }}
                      >
                        Client Need
                      </span>
                    </div>
                    <p className="text-brand-smoke/85 text-sm leading-relaxed">{story.clientNeed}</p>
                  </div>

                  {/* What Brand9Studio Did */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Target size={14} style={{ color: ACCENT }} />
                      <span
                        className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold"
                        style={{ color: ACCENT }}
                      >
                        What Brand9Studio Did
                      </span>
                    </div>
                    <p className="text-brand-smoke/85 text-sm leading-relaxed">{story.whatWeDid}</p>
                  </div>
                </div>

                {/* Right column */}
                <div className="space-y-8">
                  {/* Client Benefits */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle2 size={14} style={{ color: ACCENT }} />
                      <span
                        className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold"
                        style={{ color: ACCENT }}
                      >
                        Client Benefits
                      </span>
                    </div>
                    <ul className="space-y-3">
                      {story.benefits.map((benefit, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.08 + i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          className="flex items-start gap-3 text-sm text-brand-smoke/85"
                        >
                          <span
                            className="mt-[5px] w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: ACCENT }}
                          />
                          {benefit}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Business Impact */}
                  <div
                    className="rounded-xl p-5 border"
                    style={{
                      background: `${ACCENT}12`,
                      borderColor: `${ACCENT}30`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp size={14} style={{ color: ACCENT }} />
                      <span
                        className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold"
                        style={{ color: ACCENT }}
                      >
                        Business Impact
                      </span>
                    </div>
                    <p className="text-white/90 text-sm leading-relaxed font-medium">{story.impact}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Section Header ────────────────────────────────────────────────────────────
function SectionHeader() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="mb-16 sm:mb-20 lg:mb-24"
    >
      <motion.span
        variants={fadeUpVariants}
        className="text-brand-lime font-mono text-xs uppercase tracking-[0.4em] mb-4 block"
      >
        Client Success Stories
      </motion.span>

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-16">
        <motion.div variants={slideLeftVariants} className="flex-1">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-black text-white uppercase tracking-tighter leading-[0.95] max-w-2xl">
            OUR CLIENT{' '}
            <span className="text-brand-lime relative inline-block">
              SUCCESS
              {/* Animated underline */}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-1 left-0 right-0 h-[3px] bg-brand-lime origin-left"
              />
            </span>{' '}
            STORIES
          </h2>
        </motion.div>

        <motion.div variants={slideRightVariants} className="lg:max-w-md">
          <p className="text-brand-smoke/70 text-sm sm:text-base leading-relaxed">
            From branding and websites to social media, SEO, paid advertising and content production,
            we work with businesses across industries to solve specific business and communication challenges.
          </p>
          <p className="text-brand-smoke/60 text-sm leading-relaxed mt-3">
            Here are some of the brands and businesses we have helped build, strengthen and grow.
          </p>
        </motion.div>
      </div>

      {/* Decorative separator */}
      <motion.div
        variants={fadeUpVariants}
        className="mt-10 sm:mt-12 h-px w-full"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(188,255,0,0.25), transparent)' }}
      />
    </motion.div>
  )
}

// ─── What Clients Get ─────────────────────────────────────────────────────────
const services = [
  {
    keyword: 'BUILD',
    items: 'Branding • Websites • Social Media',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    keyword: 'GROW',
    items: 'SEO • Google Ads • Content Marketing',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
  {
    keyword: 'CREATE',
    items: 'Creative Design • Video Production • Brand Communication',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
  },
  {
    keyword: 'ESTABLISH',
    items: 'Digital Presence • Organic Growth • Online Visibility',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    keyword: 'SUPPORT',
    items: 'Business Communication • Sales Collateral • Digital Strategy',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
]

const challenges = [
  'Some businesses need to build a brand.',
  'Some need to establish their digital presence.',
  'Some need better visibility and leads.',
  'Some need stronger content and communication.',
  'And some need to build their entire digital foundation from scratch.',
]

function WhatClientsGet() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="mt-20 sm:mt-28 lg:mt-36">

      {/* ── Top divider with label ── */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={inView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="h-px w-full origin-left mb-12 sm:mb-16"
        style={{ background: 'linear-gradient(90deg, #C4EF47, transparent)' }}
      />

      {/* ── Section headline ── */}
      <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-20 mb-14 sm:mb-18">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1"
        >
          <span className="text-brand-lime font-mono text-xs uppercase tracking-[0.4em] mb-4 block">One Partner</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black text-white uppercase tracking-tighter leading-[0.95]">
            WHAT OUR CLIENTS GET WITH{' '}
            <span className="text-brand-lime">BRAND9STUDIO</span>
          </h2>
        </motion.div>

        {/* Challenge list */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="lg:max-w-[420px] w-full"
        >
          <p className="text-brand-smoke/60 text-xs font-mono uppercase tracking-[0.25em] mb-5">
            We understand that every business has a different challenge.
          </p>
          <ul className="space-y-3">
            {challenges.map((c, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-3 text-sm text-brand-smoke/75 leading-relaxed"
              >
                <span className="mt-[7px] w-1 h-1 rounded-full bg-brand-lime flex-shrink-0" />
                {c}
              </motion.li>
            ))}
          </ul>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-6 text-sm text-white/80 font-semibold leading-relaxed"
          >
            Our role is to identify the need and build the right solution around it.
          </motion.p>
        </motion.div>
      </div>

      {/* ── Services grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 mb-14 sm:mb-20">
        {services.map((svc, i) => (
          <motion.div
            key={svc.keyword}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group relative rounded-xl border border-white/[0.07] bg-white/[0.025] p-5 sm:p-6 overflow-hidden cursor-default transition-all duration-300 hover:border-brand-lime/30 hover:bg-white/[0.04]"
          >
            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at top left, rgba(196,239,71,0.06) 0%, transparent 70%)' }}
            />
            {/* Top accent */}
            <div className="absolute top-0 left-4 right-4 h-[1px] bg-brand-lime/0 group-hover:bg-brand-lime/40 transition-colors duration-400" />

            <div className="text-brand-lime mb-3 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
              {svc.icon}
            </div>
            <h3 className="text-brand-lime font-black text-lg tracking-tight mb-2">{svc.keyword}</h3>
            <p className="text-brand-smoke/60 text-xs leading-relaxed">{svc.items}</p>
          </motion.div>
        ))}
      </div>

      {/* ── Flow diagram ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 lg:p-10 mb-10 sm:mb-14"
      >
        {/* ONE PARTNER headline */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="inline-block font-mono text-[10px] uppercase tracking-[0.45em] text-brand-lime/70 mb-3">The Brand9Studio Promise</span>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white uppercase tracking-tighter">
            ONE PARTNER.{' '}
            <span className="text-brand-lime">MULTIPLE DIGITAL SOLUTIONS.</span>
          </h3>
          <p className="text-brand-smoke/60 text-sm mt-3 max-w-xl mx-auto leading-relaxed">
            From building a brand from scratch to strengthening an established business, Brand9Studio brings strategy, creativity and execution together.
          </p>
        </div>

        {/* Flow steps */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0">
          {[
            { label: 'Your Business\nChallenge', sub: 'The Problem' },
            { label: 'Brand9Studio\nSolution', sub: 'Strategy + Execution', highlight: true },
            { label: 'Business\nImpact', sub: 'The Result' },
          ].map((step, i) => (
            <div key={i} className="flex flex-col sm:flex-row items-center w-full sm:w-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.65 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`relative rounded-xl px-5 py-4 text-center w-full sm:w-44 border ${
                  step.highlight
                    ? 'bg-brand-lime/10 border-brand-lime/40'
                    : 'bg-white/[0.03] border-white/[0.07]'
                }`}
              >
                <p className={`font-black text-sm uppercase tracking-tight whitespace-pre-line leading-snug ${
                  step.highlight ? 'text-brand-lime' : 'text-white'
                }`}>{step.label}</p>
                <p className="font-mono text-[9px] uppercase tracking-widest mt-1.5 text-brand-smoke/50">{step.sub}</p>
              </motion.div>
              {i < 2 && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={inView ? { opacity: 1, scaleX: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.75 + i * 0.12 }}
                  className="hidden sm:flex items-center justify-center w-10 flex-shrink-0 origin-left"
                >
                  <svg width="28" height="12" viewBox="0 0 28 12" fill="none">
                    <path d="M0 6h24M20 1l6 5-6 5" stroke="#C4EF47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                  </svg>
                </motion.div>
              )}
              {i < 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.8 + i * 0.12 }}
                  className="sm:hidden flex items-center justify-center h-6 flex-shrink-0"
                >
                  <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
                    <path d="M6 0v16M1 12l5 6 5-6" stroke="#C4EF47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                  </svg>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Closing statement ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center"
      >
        <p className="text-brand-smoke/50 text-sm leading-relaxed mb-2">
          We don't just make businesses look better online.
        </p>
        <p className="text-white font-black text-lg sm:text-xl lg:text-2xl uppercase tracking-tight">
          We help them{' '}
          <span className="text-brand-lime">show up better</span>,{' '}
          <span className="text-brand-lime">communicate better</span>{' '}and{' '}
          <span className="text-brand-lime">grow better.</span>
        </p>
      </motion.div>

    </div>
  )
}

// ─── Main Section ──────────────────────────────────────────────────────────────
export default function ClientSuccessStories() {
  return (
    <section
      id="client-success-stories"
      className="py-24 sm:py-32 relative overflow-hidden"
      style={{ contain: 'layout paint' }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(188,255,0,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="main-container relative z-10">
        <SectionHeader />

        {/* Story cards list */}
        <div className="space-y-4 sm:space-y-5">
          {stories.map((story, index) => (
            <StoryCard key={story.id} story={story} index={index} />
          ))}
        </div>

        <WhatClientsGet />
      </div>
    </section>
  )
}
