import React, { useEffect, useMemo, useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useAnimationFrame, useSpring } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import projectsData from '../data/projects.json'
import { normalizeProjects, buildCategories } from '../utils/projectModel'
import YouTubeShowcase from '../sections/YouTubeShowcase'



const categorySortOrder = [
  'BROCHURE','CORPORATE DECKS','WEBSITE PAGE','APP DESIGNS','SOCIAL MEDIA POSTS',
  'VISITING CARDS','LOGO DESIGNS','EMAILERS','ANALYTICS',
  'BRANDING & IDENTITY','WEB & DIGITAL','MARKETING & CAMPAIGNS','PRINT DESIGN'
]

function formatCategoryLabel(category = '') {
  const known = {
    'BROCHURE': 'Brochure','CORPORATE DECKS': 'Corporate Decks',
    'ANALYTICS': 'Analytics','EMAILERS': 'Emailers',
    'BRANDING & IDENTITY': 'Branding','LOGO DESIGNS': 'Logo Design',
    'SOCIAL MEDIA POSTS': 'Social Media','VISITING CARDS': 'Visiting Cards',
    'WEBSITE PAGE': 'Website Page','WEB & DIGITAL': 'Digital',
    'MARKETING & CAMPAIGNS': 'Marketing','PRINT DESIGN': 'Print Design',
    'APP DESIGNS': 'App Designs'
  }
  return known[category] || category.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
}

/* ─── Premium Painting Block Card ─── */
const PaintingCard = React.memo(({ project, index, onOpenProject, rowHeight }) => {
  const isPdfHero = /\.pdf$/i.test(project.heroImage || '')
  const [isTapped, setIsTapped] = useState(false)
  
  // High-performance height matching. Alternate rows use slightly staggered heights for organic rhythm.
  // The widths resolve dynamically based on the native aspect ratio of each original mockup (0% cropping).
  const cardHeight = rowHeight || (index % 2 === 0 ? 'h-[180px] sm:h-[270px]' : 'h-[210px] sm:h-[320px]')

  const tapTimerRef = React.useRef(null)

  const handleClick = (e) => {
    e.stopPropagation()
    if (isTapped) {
      if (tapTimerRef.current) clearTimeout(tapTimerRef.current)
      setIsTapped(false)
      onOpenProject(project)
    } else {
      setIsTapped(true)
      tapTimerRef.current = setTimeout(() => setIsTapped(false), 2500)
    }
  }

  return (
    <div 
      className={`relative ${cardHeight} w-auto flex-shrink-0 overflow-hidden border-r border-white/10 group cursor-pointer bg-[#050505]`}
      onClick={handleClick}
    >
      {/* Interactive Hover Backdrop Blend */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-brand-lime/10 via-transparent to-brand-orange/10 z-10 pointer-events-none" />

      {/* Main Showcase Image Wrapper - Locks height, lets width expand/contract dynamically to avoid crop */}
      <div className="h-full w-auto relative pointer-events-none">
        {isPdfHero ? (
          <div className="h-full w-[200px] flex flex-col items-center justify-center bg-gradient-to-br from-brand-dark to-[#050505] p-6">
            <div className="w-12 h-12 rounded-2xl bg-brand-lime/10 border border-brand-lime/30 flex items-center justify-center mb-3">
              <span className="text-brand-lime font-black text-base">PDF</span>
            </div>
            <span className="text-[8px] text-brand-smoke/50 uppercase tracking-[0.2em] font-bold">Document</span>
          </div>
        ) : (
          <img 
            src={project.heroImage} 
            alt={project.title}
            className="h-full w-auto object-contain block transition-transform duration-[800ms] ease-out group-hover:scale-[1.03] select-none"
            loading="eager"
            decoding="async"
            draggable="false"
          />
        )}
      </div>

      {/* Smooth Dark Vignette Shadow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-20 transition-opacity duration-300 opacity-70 group-hover:opacity-85 pointer-events-none" />

      {/* Minimal premium hover title overlay (Slides up on hover) */}
      <div className="absolute inset-x-0 bottom-0 p-5 z-30 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-col gap-1 pointer-events-none max-w-full">
        <span className="inline-block w-fit text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded bg-brand-lime text-black mb-1">
          {formatCategoryLabel(project.category)}
        </span>
        <h4 className="text-[10px] sm:text-xs font-extrabold text-white leading-tight uppercase tracking-wider group-hover:text-brand-lime transition-colors duration-300 line-clamp-1">
          {project.title}
        </h4>
        <p className="text-[9px] sm:text-[10px] text-brand-smoke/60 line-clamp-1">{project.client}</p>
      </div>

      {/* Interactive Micro Glow Accents */}
      <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-brand-lime/20 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Two-Tap 'View Project' Overlay — pointer-events-auto so second tap reliably fires */}
      <AnimatePresence>
        {isTapped && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClick}
            className="absolute inset-0 z-40 bg-black/60 backdrop-blur-[8px] flex items-center justify-center cursor-pointer"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-brand-lime text-black font-black uppercase tracking-[0.2em] px-6 py-3 rounded-full text-[10px] sm:text-xs shadow-[0_0_30px_rgba(196,239,71,0.4)] flex items-center gap-2 pointer-events-none"
            >
              <span>View Project</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

/* ─── Endless Infinite Painting Row ─── */
function InfinitePaintingRow({ projects, speed = -0.6, onOpenProject, rowHeight }) {
  const containerRef = useRef(null)
  const contentRef = useRef(null)
  const [contentWidth, setContentWidth] = useState(0)

  // Use a REF for isDragging to avoid stale closure inside useAnimationFrame
  const isDraggingRef = useRef(false)
  const lastTimestampRef = useRef(null)

  const x = useMotionValue(0)
  const speedMultiplier = useSpring(1, { stiffness: 80, damping: 20 })

  const baseProjects = useMemo(() => {
    if (projects.length === 0) return []
    let list = [...projects]
    while (list.length < 10) {
      list = [...list, ...projects]
    }
    return list
  }, [projects])

  const duplicatedProjects = useMemo(() => {
    return [...baseProjects, ...baseProjects, ...baseProjects, ...baseProjects]
  }, [baseProjects])

  useEffect(() => {
    if (contentRef.current && baseProjects.length > 0) {
      const rafId = window.requestAnimationFrame(() => {
        if (contentRef.current) {
          const w = contentRef.current.scrollWidth / 4
          setContentWidth(w)
          if (x.get() === 0) x.set(-2 * w)
        }
      })
      return () => window.cancelAnimationFrame(rafId)
    }
  }, [baseProjects, projects])

  useAnimationFrame((time) => {
    if (contentWidth === 0) return

    // ── FIX 1: Tab-visibility catch-up prevention ──
    // Clamp delta to max 100ms so a tab-switch pause never causes a huge jump
    const delta = lastTimestampRef.current === null
      ? 16
      : Math.min(time - lastTimestampRef.current, 100)
    lastTimestampRef.current = time

    if (!isDraggingRef.current) {
      const pixelsPerMs = speed / 16 // normalize speed to pixels-per-ms
      const currentSpeed = pixelsPerMs * delta * speedMultiplier.get()
      let currentX = x.get() + currentSpeed

      // ── FIX 2: Seamless boundary wrap ──
      if (currentX <= -3 * contentWidth) {
        currentX += contentWidth
      } else if (currentX >= -contentWidth) {
        currentX -= contentWidth
      }

      // ── FIX 3: Float drift prevention ──
      // Periodically snap x into the safe -3w..-w window to prevent precision loss
      if (currentX < -4 * contentWidth || currentX > 0) {
        currentX = -2 * contentWidth
      }

      x.set(currentX)
    }
  })

  return (
    <div 
      ref={containerRef} 
      className="w-full overflow-hidden select-none touch-pan-y cursor-grab active:cursor-grabbing border-b border-white/10"
      style={{ contain: 'layout paint', willChange: 'transform' }}
    >
      <motion.div
        ref={contentRef}
        className="flex flex-nowrap"
        style={{ x }}
        drag="x"
        dragElastic={0}
        dragMomentum={true}
        onDragStart={() => {
          isDraggingRef.current = true
          speedMultiplier.set(0)
        }}
        onDragEnd={(event, info) => {
          isDraggingRef.current = false
          // Reset timestamp so the first frame after drag doesn't accumulate
          lastTimestampRef.current = null
          const velocity = info.velocity.x * 0.005
          if (Math.sign(velocity) === Math.sign(speed)) {
             speedMultiplier.set(1 + Math.abs(velocity))
          }
          setTimeout(() => speedMultiplier.set(1), 50)
        }}
        onHoverStart={() => speedMultiplier.set(0)}
        onHoverEnd={() => {
          if (!isDraggingRef.current) speedMultiplier.set(1)
        }}
      >
        {duplicatedProjects.map((project, idx) => (
          <PaintingCard 
            key={`${project.id}-${idx}`}
            project={project}
            index={idx}
            onOpenProject={onOpenProject}
            rowHeight={rowHeight}
          />
        ))}
      </motion.div>
    </div>
  )
}

/* ─── Stated Category Filter Button ─── */
function FilterButton({ category, isActive, onClick }) {
  return (
    <motion.button 
      onClick={onClick} 
      whileHover={{ scale: 1.04 }} 
      whileTap={{ scale: 0.96 }}
      className={`relative px-4 sm:px-7 py-2.5 rounded-xl font-bold text-[9px] sm:text-xs uppercase tracking-[0.2em] transition-all duration-500 whitespace-nowrap cursor-pointer ${
        isActive
          ? 'bg-brand-lime text-black shadow-xl shadow-brand-lime/20 border border-brand-lime/50'
          : 'bg-white/[0.03] border border-white/10 text-white/50 hover:border-brand-lime/40 hover:text-white hover:bg-white/[0.06]'
      }`}
    >
      {category}
      {isActive && (
        <motion.div 
          layoutId="filterUnderline" 
          className="absolute inset-0 rounded-full bg-brand-lime/10 pointer-events-none"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }} 
        />
      )}
    </motion.button>
  )
}

/* ─── Category Grid Card ─── */
const CategoryCard = React.memo(({ project, index, onOpenProject }) => {
  const isPdfHero = /\.pdf$/i.test(project.heroImage || '')
  const [isTapped, setIsTapped] = useState(false)

  const tapTimerRef = React.useRef(null)

  const handleClick = (e) => {
    e.stopPropagation()
    if (isTapped) {
      if (tapTimerRef.current) clearTimeout(tapTimerRef.current)
      setIsTapped(false)
      onOpenProject(project)
    } else {
      setIsTapped(true)
      tapTimerRef.current = setTimeout(() => setIsTapped(false), 2500)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: 'easeOut' } }}
      className="w-full sm:w-[45%] lg:w-[30%] min-w-0 sm:min-w-[280px] aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 group cursor-pointer bg-[#050505] relative shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:border-brand-lime/30 hover:shadow-[0_25px_50px_rgba(196,239,71,0.06)] transition-all duration-500"
      onClick={handleClick}
    >
      {/* Hover Backdrop Overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-brand-lime/10 via-transparent to-brand-orange/5 z-10 pointer-events-none" />

      {/* Mockup Container */}
      <div className="w-full h-full relative p-6 sm:p-8 flex items-center justify-center pointer-events-none">
        {isPdfHero ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-brand-dark to-[#050505] p-6 rounded-xl border border-white/5">
            <div className="w-14 h-14 rounded-2xl bg-brand-lime/10 border border-brand-lime/30 flex items-center justify-center mb-3">
              <span className="text-brand-lime font-black text-lg">PDF</span>
            </div>
            <span className="text-[10px] text-brand-smoke/50 uppercase tracking-[0.25em] font-bold">Document</span>
          </div>
        ) : (
          <img 
            src={project.heroImage} 
            alt={project.title}
            className="max-w-full max-h-full object-contain block transition-transform duration-700 ease-out group-hover:scale-105 select-none"
            loading="eager"
            decoding="async"
            draggable="false"
          />
        )}
      </div>

      {/* Smooth Shadow Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-20 transition-opacity duration-300 opacity-80 group-hover:opacity-90 pointer-events-none" />

      {/* Floating Details Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-6 z-30 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-col gap-1 pointer-events-none">
        <span className="inline-block w-fit text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-brand-lime text-black mb-1">
          {formatCategoryLabel(project.category)}
        </span>
        <div className="flex items-center justify-between">
          <h4 className="text-xs sm:text-sm font-extrabold text-white leading-tight uppercase tracking-wider group-hover:text-brand-lime transition-colors duration-300 line-clamp-1">
            {project.title}
          </h4>
          <span className="text-brand-lime opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-x-2 group-hover:translate-x-0 transition-transform duration-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </span>
        </div>
        <p className="text-[10px] text-brand-smoke/60 line-clamp-1">{project.client}</p>
      </div>

      {/* Premium Micro Glow Border */}
      <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-brand-lime/20 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Two-Tap 'View Project' Overlay — pointer-events-auto so second tap reliably fires */}
      <AnimatePresence>
        {isTapped && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClick}
            className="absolute inset-0 z-40 bg-black/60 backdrop-blur-[8px] flex items-center justify-center cursor-pointer"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-brand-lime text-black font-black uppercase tracking-[0.2em] px-6 py-3 rounded-full text-xs shadow-[0_0_30px_rgba(196,239,71,0.4)] flex items-center gap-2 pointer-events-none"
            >
              <span>View Project</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
})

/* ─── Work Gallery Base Showcase ─── */
export default function WorkGallery() {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeCategory, setActiveCategory] = useState(location.state?.activeCategory || 'ALL')

  const normalizedProjects = useMemo(() => normalizeProjects(projectsData.projects || []), [])
  const categories = useMemo(() => buildCategories(normalizedProjects), [normalizedProjects])

  const sortedProjects = useMemo(() => {
    return [...normalizedProjects].sort((a, b) => {
      const ai = categorySortOrder.indexOf(a.category)
      const bi = categorySortOrder.indexOf(b.category)
      const sa = ai === -1 ? categorySortOrder.length : ai
      const sb = bi === -1 ? categorySortOrder.length : bi
      return sa !== sb ? sa - sb : String(a.title).localeCompare(String(b.title))
    })
  }, [normalizedProjects])

  // Filter project lists
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'ALL') return sortedProjects
    return sortedProjects.filter(p => p.category === activeCategory)
  }, [activeCategory, sortedProjects])

  // Segmenting filtered projects into Row 1 and Row 2 for interlocking staggered design
  const row1Projects = useMemo(() => {
    if (filteredProjects.length === 1) return filteredProjects
    return filteredProjects.filter((_, idx) => idx % 2 === 0)
  }, [filteredProjects])

  const row2Projects = useMemo(() => {
    if (filteredProjects.length === 1) return filteredProjects
    return filteredProjects.filter((_, idx) => idx % 2 !== 0)
  }, [filteredProjects])

  const handleOpenProject = (project) => {
    navigate(`/project/${project.id}`, { state: { scrollY: window.scrollY, activeCategory } })
  }

  useEffect(() => {
    const restoredCategory = location.state?.activeCategory
    if (restoredCategory) setActiveCategory(restoredCategory)
  }, [location.state])

  return (
    <section id="work" className="py-32 relative overflow-hidden bg-transparent" style={{ contain: 'layout paint' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-lime/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Main Header Container */}
      <div className="main-container relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} 
          transition={{ duration: 0.6 }} 
          className="mb-12 sm:mb-16"
        >
          <span className="text-brand-lime font-mono text-xs uppercase tracking-[0.4em] mb-4 block">Adaptive Flow</span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-tight mb-6">
            WORK <br /> <span className="text-brand-lime">GALLERY.</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-brand-smoke/70 max-w-2xl leading-relaxed">
            A curated showcase of bold branding, modern design systems, and high-impact digital experiences.
          </p>
        </motion.div>

        {/* Category Filters row */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} 
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10 sm:mb-16 flex flex-wrap items-center gap-2 sm:gap-4"
        >
          {categories.map((category) => (
            <FilterButton 
              key={category} 
              category={category} 
              isActive={activeCategory === category}
              onClick={() => setActiveCategory(category)} 
            />
          ))}
        </motion.div>
      </div>

      {/* Full-bleed Edge-to-Edge Moving Painting Wall OR Stationary Exhibition Wall */}
      <div className="relative overflow-hidden w-full bg-black border-y border-white/10 mt-6 select-none py-4">
        <AnimatePresence mode="wait">
          {activeCategory === 'ALL' ? (
            <motion.div 
              key="moving-wall"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
              className="flex flex-col select-none w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] relative"
            >
              {row1Projects.length > 0 ? (
                <InfinitePaintingRow 
                  projects={row1Projects} 
                  speed={-0.45} 
                  onOpenProject={handleOpenProject} 
                  rowHeight="h-[180px] sm:h-[270px]"
                />
              ) : (
                <div className="text-center py-20 text-white/40 text-sm">
                  No projects found in this category.
                </div>
              )}

              {row2Projects.length > 0 && (
                <InfinitePaintingRow 
                  projects={row2Projects} 
                  speed={0.45} 
                  onOpenProject={handleOpenProject} 
                  rowHeight="h-[210px] sm:h-[320px]"
                />
              )}
            </motion.div>
          ) : (
            <motion.div
              key={`stationary-wall-${activeCategory}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-7xl mx-auto px-6 sm:px-8 py-16 flex flex-wrap justify-center gap-8 sm:gap-10"
            >
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, idx) => (
                  <CategoryCard
                    key={project.id}
                    project={project}
                    index={idx}
                    onOpenProject={handleOpenProject}
                  />
                ))
              ) : (
                <div className="text-center py-20 text-white/40 text-sm w-full">
                  No projects found in this category.
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer / Connect Section */}
      <div className="main-container relative z-10 mt-16 sm:mt-24">
        <YouTubeShowcase />

        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }} 
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} 
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mt-24 sm:mt-32 p-10 sm:p-16 glass-panel relative overflow-hidden group text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-lime/5 via-transparent to-brand-orange/5 opacity-50 pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-lime/10 border border-brand-lime/20 text-brand-lime text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] mb-6">
              Let's Connect
            </span>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight mb-6">
              Interested in <br className="hidden sm:block" />
              <span className="text-brand-lime">Working Together?</span>
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-brand-smoke/70 mb-10 leading-relaxed">
              Let's bring your creative vision to life with precision and strategic design excellence.
            </p>
            <motion.a 
              href="#contact" 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="inline-block px-10 py-4 bg-brand-lime text-black font-black uppercase tracking-[0.2em] rounded-xl hover:bg-white transition-all text-xs sm:text-sm shadow-xl shadow-brand-lime/20 cursor-pointer"
            >
              Start a Project
            </motion.a>
          </div>
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-lime/10 rounded-full blur-2xl group-hover:bg-brand-lime/20 transition-all duration-700 pointer-events-none" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-brand-orange/10 rounded-full blur-2xl group-hover:bg-brand-orange/20 transition-all duration-700 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  )
}
