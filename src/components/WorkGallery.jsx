import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import projectsData from '../data/projects.json'
import { normalizeProjects, buildCategories } from '../utils/projectModel'
import YouTubeShowcase from '../sections/YouTubeShowcase'

const categoryColors = {
  'BROCHURE': 'from-orange-500/20 to-amber-600/20',
  'CORPORATE DECKS': 'from-slate-500/20 to-slate-600/20',
  'BRANDING & IDENTITY': 'from-violet-500/20 to-violet-600/20',
  'LOGO DESIGNS': 'from-brand-lime/20 to-emerald-500/20',
  'SOCIAL MEDIA POSTS': 'from-fuchsia-500/20 to-cyan-500/20',
  'VISITING CARDS': 'from-sky-500/20 to-indigo-500/20',
  'WEBSITE PAGE': 'from-blue-500/20 to-violet-600/20',
  'WEB & DIGITAL': 'from-cyan-500/20 to-blue-600/20',
  'MARKETING & CAMPAIGNS': 'from-pink-500/20 to-rose-600/20',
  'PRINT DESIGN': 'from-amber-500/20 to-orange-600/20',
  'APP DESIGNS': 'from-teal-500/20 to-emerald-600/20'
}

const categoryBadges = {
  'BROCHURE': 'bg-orange-500/30 text-orange-300',
  'CORPORATE DECKS': 'bg-slate-500/30 text-slate-300',
  'BRANDING & IDENTITY': 'bg-violet-500/30 text-violet-300',
  'LOGO DESIGNS': 'bg-emerald-500/30 text-emerald-300',
  'SOCIAL MEDIA POSTS': 'bg-fuchsia-500/30 text-fuchsia-300',
  'VISITING CARDS': 'bg-sky-500/30 text-sky-300',
  'WEBSITE PAGE': 'bg-blue-500/30 text-blue-300',
  'WEB & DIGITAL': 'bg-cyan-500/30 text-cyan-300',
  'MARKETING & CAMPAIGNS': 'bg-pink-500/30 text-pink-300',
  'PRINT DESIGN': 'bg-amber-500/30 text-amber-300',
  'APP DESIGNS': 'bg-teal-500/30 text-teal-300'
}

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

/* ─── Image Wall Showcase ─── */
function ImageWallShowcase({ projects }) {
  const allImages = useMemo(() => {
    const imgs = []
    projects.forEach(p => {
      ;(p.images || []).forEach(img => {
        if (!/\.pdf$/i.test(img)) imgs.push({ src: img, alt: p.title })
      })
    })
    return imgs
  }, [projects])

  if (allImages.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Flex wrap with flex-start — 4 per row, left aligned for easy additions */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'flex-start' }}>
        {allImages.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.04, zIndex: 10 }}
            className="relative rounded-xl overflow-hidden border border-white/10 hover:border-white/25 transition-colors duration-300 group"
            style={{
              width: 'calc(25% - 12px)',
              minWidth: '220px',
              aspectRatio: '4 / 5',
              flexShrink: 0,
              position: 'relative',
              background: '#050505',
              boxShadow: '0 10px 30px -10px rgba(204,255,0,0.15)',
            }}
          >
            {/* Blurred ambient background to fill space beautifully without cropping the main image */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img
                src={img.src}
                alt=""
                className="w-full h-full object-cover opacity-50 blur-xl sm:blur-2xl scale-125 transition-transform duration-700 group-hover:scale-150"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/80" />
            </div>

            {/* Gradient border ring — brand-lime arc, premium glow border */}
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 'inherit',
                padding: '1px',
                background: 'linear-gradient(135deg, rgba(204,255,0,0.5) 0%, rgba(204,255,0,0.1) 50%, rgba(204,255,0,0.3) 100%)',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                zIndex: 4,
                pointerEvents: 'none',
              }}
            />

            {/* Top-edge light highlight strip */}
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 0,
                left: '20%',
                right: '20%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(204,255,0,0.6), transparent)',
                zIndex: 5,
                pointerEvents: 'none',
              }}
            />

            {/* Uncropped Main Image - Fully visible, centered, floating over ambient background */}
            <div className="absolute inset-0 p-3 sm:p-4 flex items-center justify-center z-10 pointer-events-none">
              <img
                src={img.src}
                alt={img.alt}
                className="max-w-full max-h-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                style={{ filter: 'drop-shadow(0 20px 13px rgba(0, 0, 0, 0.5)) drop-shadow(0 8px 5px rgba(0, 0, 0, 0.4))' }}
                loading="lazy"
                decoding="async"
                draggable="false"
              />
            </div>
            
            {/* Subtle vignette overlay — dark corners for depth */}
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)',
                zIndex: 3,
                pointerEvents: 'none',
              }}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

const ProjectCard = React.memo(React.forwardRef(({ project, index, onOpenProject }, ref) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.94, filter: 'blur(8px)' },
    visible: {
      opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
      transition: { duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1],
        scale: { type: 'spring', stiffness: 100, damping: 15, delay: index * 0.06 } }
    },
    exit: { opacity: 0, scale: 0.9, filter: 'blur(10px)', transition: { duration: 0.3 } }
  }
  const imageCount = project.images?.length || 1
  const colorClass = categoryColors[project.category] || 'from-brand-lime/20 to-green-600/20'
  const isPdfHero = /\.pdf$/i.test(project.heroImage || '')

  return (
    <motion.div ref={ref} variants={containerVariants} initial="hidden" animate="visible" exit="exit" layout
      style={{ willChange: 'transform, opacity, filter', transform: 'translateZ(0)' }} className="group h-full">
      <motion.button onClick={() => onOpenProject(project)} whileHover={{ scale: 1.015, y: -4 }} whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        className={`premium-card relative rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br ${colorClass} hover:border-white/25 transition-all duration-300 h-full flex flex-col cursor-pointer w-full`}>
        <div className="relative w-full overflow-hidden bg-black/40 aspect-square sm:aspect-video flex items-center justify-center">
          {isPdfHero ? (
            <>
              <iframe src={`${project.heroImage}#view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
                title={`${project.title} PDF preview`} className="hidden sm:block w-full h-full pointer-events-none border-0" />
              <div className="sm:hidden w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-brand-gray/40 to-black/60 p-6">
                <div className="w-16 h-16 rounded-2xl bg-brand-lime/10 border border-brand-lime/30 flex items-center justify-center mb-3">
                  <span className="text-brand-lime font-black text-xl">PDF</span>
                </div>
                <span className="text-[10px] text-brand-smoke/60 uppercase tracking-[0.2em] font-bold">Document Preview</span>
              </div>
            </>
          ) : (
            <img src={project.heroImage} alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
              loading="lazy" decoding="async" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <motion.div initial={{ opacity: 0, y: 10 }} whileHover={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="px-4 py-2 rounded-full bg-brand-lime/90 text-black font-bold text-xs sm:text-sm uppercase tracking-widest mb-2">
              {project.isCategoryLink ? 'View Collection' : 'View Project'}
            </div>
            <span className="text-xs text-brand-lime/80 font-mono">
              {project.isCategoryLink ? 'Special Showcase' : `${imageCount} Images`}
            </span>
          </motion.div>
        </div>
        <div className="flex-1 p-4 sm:p-5 flex flex-col gap-3">
          <div className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-white line-clamp-2 group-hover:text-brand-lime transition-colors duration-300">{project.title}</h3>
            <p className="text-xs sm:text-sm text-brand-smoke/70 line-clamp-1">{project.client}</p>
            {project.projectFolder && (
              <p className="text-[10px] sm:text-xs text-brand-smoke/50 uppercase tracking-[0.16em] line-clamp-1">{project.projectFolder}</p>
            )}
          </div>
          <p className="text-xs text-brand-smoke/60 line-clamp-2 flex-grow">{project.description}</p>
          <div className="flex items-center justify-between gap-2 mt-auto pt-3 border-t border-white/8">
            <span className={`inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full ${categoryBadges[project.category] || 'bg-brand-lime/30 text-brand-lime'}`}>
              {formatCategoryLabel(project.category)}
            </span>
            <span className="text-[10px] text-brand-smoke/40 font-mono">{project.year}</span>
          </div>
        </div>
      </motion.button>
    </motion.div>
  )
}))

function FilterButton({ category, isActive, onClick }) {
  return (
    <motion.button onClick={onClick} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
      className={`relative px-5 sm:px-7 py-2 rounded-xl font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] transition-all duration-500 whitespace-nowrap ${
        isActive
          ? 'bg-brand-lime text-black shadow-xl shadow-brand-lime/20 border border-brand-lime/50'
          : 'bg-white/[0.03] border border-white/10 text-white/50 hover:border-brand-lime/40 hover:text-white hover:bg-white/[0.06]'
      }`}>
      {category}
      {isActive && (
        <motion.div layoutId="filterUnderline" className="absolute inset-0 rounded-full bg-brand-lime/10"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
      )}
    </motion.button>
  )
}

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

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'ALL') return sortedProjects
    return sortedProjects.filter(p => p.category === activeCategory)
  }, [activeCategory, sortedProjects])

  const socialMediaProjects = useMemo(
    () => sortedProjects.filter(p => p.category === 'SOCIAL MEDIA POSTS'),
    [sortedProjects]
  )
  
  const logoDesignProjects = useMemo(
    () => sortedProjects.filter(p => p.category === 'LOGO DESIGNS'),
    [sortedProjects]
  )

  const normalProjects = useMemo(() => {
    const base = filteredProjects.filter(p => p.category !== 'SOCIAL MEDIA POSTS' && p.category !== 'LOGO DESIGNS')
    
    if (activeCategory === 'ALL') {
      const links = []
      if (socialMediaProjects.length > 0) {
        links.push({
          id: 'social-category-link',
          isCategoryLink: true,
          title: 'Social Media Collection',
          client: 'Brand9Studio Showcase',
          category: 'SOCIAL MEDIA POSTS',
          projectFolder: 'Full Gallery',
          heroImage: socialMediaProjects[0]?.heroImage || socialMediaProjects[0]?.images?.[0] || '',
          description: 'Explore a curated collection of high-engagement social media posts spanning multiple industries and campaigns.',
          year: '2026',
          images: socialMediaProjects[0]?.images || []
        })
      }
      if (logoDesignProjects.length > 0) {
        links.push({
          id: 'logo-category-link',
          isCategoryLink: true,
          title: 'Logo Design Archive',
          client: 'Brand9Studio Showcase',
          category: 'LOGO DESIGNS',
          projectFolder: 'Full Gallery',
          heroImage: logoDesignProjects[0]?.heroImage || logoDesignProjects[0]?.images?.[0] || '',
          description: 'Discover an archive of premium, minimal, and highly scalable logo marks and brand emblems.',
          year: '2026',
          images: logoDesignProjects[0]?.images || []
        })
      }
      return [...base, ...links]
    }
    
    return base
  }, [filteredProjects, activeCategory, socialMediaProjects, logoDesignProjects])

  const isSocialOnly = activeCategory === 'SOCIAL MEDIA POSTS'
  const isLogoOnly = activeCategory === 'LOGO DESIGNS'
  const isSpecialOnly = isSocialOnly || isLogoOnly

  const handleOpenProject = (project) => {
    if (project.isCategoryLink) {
      setActiveCategory(project.category)
      return
    }
    navigate(`/project/${project.id}`, { state: { scrollY: window.scrollY, activeCategory } })
  }

  useEffect(() => {
    const restoredCategory = location.state?.activeCategory
    if (restoredCategory) setActiveCategory(restoredCategory)
  }, [location.state])

  return (
    <section id="work" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-lime/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="main-container relative z-10">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12 sm:mb-16">
          <span className="text-brand-lime font-mono text-xs uppercase tracking-[0.4em] mb-4 block">Adaptive Flow</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-tight mb-6">
            WORK <br /> <span className="text-brand-lime">GALLERY.</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-brand-smoke/70 max-w-2xl leading-relaxed">
            Explore premium creative projects showcasing versatile design excellence. Click any project to view the complete image collection in fullscreen.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 sm:mb-16 flex flex-wrap items-center gap-3 sm:gap-4">
          {categories.map((category) => (
            <FilterButton key={category} category={category} isActive={activeCategory === category}
              onClick={() => setActiveCategory(category)} />
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {isSocialOnly && (
            <motion.div key="social-wall" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
              <ImageWallShowcase projects={socialMediaProjects} />
            </motion.div>
          )}
          {isLogoOnly && (
            <motion.div key="logo-wall" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
              <ImageWallShowcase projects={logoDesignProjects} />
            </motion.div>
          )}
        </AnimatePresence>

        {!isSpecialOnly && (
          <motion.div layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 auto-rows-max">
            <AnimatePresence mode="popLayout">
              {normalProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} onOpenProject={handleOpenProject} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}



        {!isSpecialOnly && normalProjects.length === 0 && activeCategory !== 'ALL' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="text-center py-16">
            <p className="text-white/60 text-lg">No projects found in this category.</p>
          </motion.div>
        )}

        <YouTubeShowcase />

        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mt-24 sm:mt-32 p-10 sm:p-16 glass-panel relative overflow-hidden group text-center">
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
            <motion.a href="#contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="inline-block px-10 py-4 bg-brand-lime text-black font-black uppercase tracking-[0.2em] rounded-xl hover:bg-white transition-all text-xs sm:text-sm shadow-xl shadow-brand-lime/20">
              Start a Project
            </motion.a>
          </div>
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-lime/10 rounded-full blur-2xl group-hover:bg-brand-lime/20 transition-all duration-700" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-brand-orange/10 rounded-full blur-2xl group-hover:bg-brand-orange/20 transition-all duration-700" />
        </motion.div>
      </div>
    </section>
  )
}
