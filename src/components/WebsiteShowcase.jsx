import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const INTERVAL_MS = 2800

/* ─── Individual Side Card (small, blurred) ─── */
const SideCard = React.memo(({ project, onClick, position }) => {
  const isLeft = position === 'left'
  return (
    <motion.div
      onClick={onClick}
      className="relative flex-shrink-0 cursor-pointer group"
      style={{ perspective: 900 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        initial={false}
        animate={{
          rotateY: isLeft ? 10 : -10,
          x: isLeft ? 12 : -12,
          opacity: 0.55,
          scale: 0.88
        }}
        whileHover={{ opacity: 0.82, scale: 0.93, rotateY: 0, x: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-[180px] sm:w-[220px] md:w-[260px] aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <img
          src={project.heroImage}
          alt={project.title}
          className="w-full h-full object-cover block"
          draggable="false"
          loading="lazy"
        />
        {/* Frosted glass name bar */}
        <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-md px-3 py-2">
          <p className="text-white text-[9px] sm:text-[10px] font-extrabold uppercase tracking-[0.15em] truncate">
            {project.title}
          </p>
        </div>
        {/* Side gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isLeft
              ? 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, transparent 60%)'
              : 'linear-gradient(to left, rgba(0,0,0,0.55) 0%, transparent 60%)'
          }}
        />
      </motion.div>
    </motion.div>
  )
})

/* ─── Center Hero Card ─── */
const HeroCard = React.memo(({ project }) => {
  const hasLink = Boolean(project.externalLink)
  const Tag = hasLink ? 'a' : 'div'
  const linkProps = hasLink
    ? { href: project.externalLink, target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <motion.div
      layout
      key={project.id}
      initial={{ opacity: 0, scale: 0.92, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: -18 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 flex-shrink-0 w-[300px] sm:w-[400px] md:w-[520px] lg:w-[600px]"
    >
      <Tag
        {...linkProps}
        className={`block relative group w-full aspect-[16/10] rounded-3xl overflow-hidden border border-white/15 shadow-[0_30px_80px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)] ${hasLink ? 'cursor-pointer' : 'cursor-default'}`}
      >
        {/* Hero Image */}
        <img
          src={project.heroImage}
          alt={project.title}
          className="w-full h-full object-cover block transition-transform duration-[900ms] ease-out group-hover:scale-[1.04] select-none"
          draggable="false"
          loading="eager"
        />

        {/* Premium layered overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-lime/5 via-transparent to-brand-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Top badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-brand-lime text-black text-[9px] font-black uppercase tracking-widest">
            Website Page
          </span>
        </div>

        {/* Bottom info */}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 flex items-end justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-brand-smoke/60 text-[10px] font-semibold uppercase tracking-widest">
              {project.client}
            </p>
            <h3 className="text-white text-base sm:text-xl font-black uppercase tracking-tight leading-tight">
              {project.title}
            </h3>
          </div>
          {hasLink && (
            <motion.div
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-shrink-0 ml-4 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-lime text-black text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(196,239,71,0.5)]"
            >
              Visit Site
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.div>
          )}
        </div>

        {/* Premium glow edge */}
        <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-lime/30 to-transparent" />
      </Tag>
    </motion.div>
  )
})

/* ─── Progress Dots ─── */
const ProgressDots = ({ total, active, onSelect }) => (
  <div className="flex items-center justify-center gap-2.5 mt-8">
    {Array.from({ length: total }).map((_, i) => (
      <button
        key={i}
        onClick={() => onSelect(i)}
        aria-label={`Go to project ${i + 1}`}
        className={`rounded-full transition-all duration-400 cursor-pointer ${i === active
          ? 'w-8 h-2 bg-brand-lime shadow-[0_0_10px_rgba(196,239,71,0.5)]'
          : 'w-2 h-2 bg-white/25 hover:bg-white/50'
          }`}
      />
    ))}
  </div>
)

/* ─── Ticker Progress Bar ─── */
const TickerBar = ({ duration, active, key: keyProp }) => (
  <div className="w-full max-w-[600px] mx-auto mt-5 h-px bg-white/10 relative overflow-hidden rounded-full">
    <AnimatePresence mode="wait">
      {active !== null && (
        <motion.div
          key={keyProp}
          className="absolute left-0 top-0 h-full bg-brand-lime/70 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          exit={{ width: '100%', opacity: 0 }}
          transition={{ duration: duration / 1000, ease: 'linear' }}
        />
      )}
    </AnimatePresence>
  </div>
)

/* ─── Main Website Showcase Carousel ─── */
export default function WebsiteShowcase({ projects }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [tickerKey, setTickerKey] = useState(0)
  const intervalRef = useRef(null)
  const isPausedRef = useRef(false)
  const total = projects.length

  const advance = useCallback(() => {
    setActiveIdx(prev => (prev + 1) % total)
    setTickerKey(k => k + 1)
  }, [total])

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      if (!isPausedRef.current) advance()
    }, INTERVAL_MS)
  }, [advance])

  useEffect(() => {
    startInterval()
    return () => clearInterval(intervalRef.current)
  }, [startInterval])

  const handleSelect = (idx) => {
    setActiveIdx(idx)
    setTickerKey(k => k + 1)
    startInterval()
  }

  const prevProject = projects[(activeIdx - 1 + total) % total]
  const activeProject = projects[activeIdx]
  const nextProject = projects[(activeIdx + 1) % total]

  return (
    <div
      className="relative w-full py-12 px-4"
      onMouseEnter={() => { isPausedRef.current = true }}
      onMouseLeave={() => { isPausedRef.current = false }}
    >
      {/* Ambient glow blob */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(196,239,71,0.04) 0%, transparent 70%)'
        }}
      />

      {/* Three-card stage */}
      <div className="flex items-center justify-center gap-4 sm:gap-6 relative">
        {/* Left side card */}
        <div className="hidden sm:flex">
          <AnimatePresence mode="popLayout">
            <motion.div key={`left-${prevProject.id}`}>
              <SideCard
                project={prevProject}
                onClick={() => handleSelect((activeIdx - 1 + total) % total)}
                position="left"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Center hero */}
        <AnimatePresence mode="popLayout">
          <HeroCard key={`hero-${activeProject.id}`} project={activeProject} />
        </AnimatePresence>

        {/* Right side card */}
        <div className="hidden sm:flex">
          <AnimatePresence mode="popLayout">
            <motion.div key={`right-${nextProject.id}`}>
              <SideCard
                project={nextProject}
                onClick={() => handleSelect((activeIdx + 1) % total)}
                position="right"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress ticker bar */}
      <TickerBar duration={INTERVAL_MS} active={activeIdx} key={`ticker-${tickerKey}`} />

      {/* Dot navigator */}
      <ProgressDots total={total} active={activeIdx} onSelect={handleSelect} />
    </div>
  )
}
