import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ChevronDown, ExternalLink, Play, X } from 'lucide-react'

const imageModules = import.meta.glob('/used photos/**/*.{png,jpg,jpeg,webp,avif,svg}', {
  eager: true,
  import: 'default'
})

const projectCatalog = [
  {
    folder: 'Logo designs',
    title: 'Logo Design System',
    category: 'BRANDING & IDENTITY',
    intro: 'Identity mark explorations covering symbol, typography, and the visual language of a brand.',
    accent: 'from-violet-500/40 to-violet-600/40',
    accentText: 'text-violet-400'
  },
  {
    folder: 'Visiting Cards',
    title: 'Visiting Card Design',
    category: 'BRANDING & IDENTITY',
    intro: 'Business card concepts aligned with professional identity and practical print usage.',
    accent: 'from-rose-500/40 to-rose-600/40',
    accentText: 'text-rose-400'
  },
  {
    folder: 'Letterhead Design',
    title: 'Letterhead Design',
    category: 'BRANDING & IDENTITY',
    intro: 'Corporate letterhead systems created for formal communication and consistent documentation.',
    accent: 'from-lime-500/40 to-lime-600/40',
    accentText: 'text-lime-400'
  },
  {
    folder: 'ID Cards',
    title: 'ID Card Design',
    category: 'BRANDING & IDENTITY',
    intro: 'Professional identity card layouts with clear information structure and brand-aligned styling.',
    accent: 'from-red-500/40 to-red-600/40',
    accentText: 'text-red-400'
  },
  {
    folder: 'Website Design',
    title: 'Website Design',
    category: 'WEB & DIGITAL',
    intro: 'Website visuals shaped around conversion, brand tone, and strong user experience.',
    accent: 'from-brand-lime/40 to-green-600/40',
    accentText: 'text-brand-lime'
  },
  {
    folder: 'Dashboard (Web Portal)',
    title: 'Dashboard Web Portal',
    category: 'WEB & DIGITAL',
    intro: 'Dashboard UI concepts focused on clarity, data visibility, and a smooth analytics experience.',
    accent: 'from-cyan-500/40 to-blue-600/40',
    accentText: 'text-cyan-400'
  },
  {
    folder: 'Style Guide (Web Portal)',
    title: 'Style Guide Portal',
    category: 'WEB & DIGITAL',
    intro: 'Reusable UI guidelines for portal components, typography, spacing, and color behavior.',
    accent: 'from-fuchsia-500/40 to-pink-600/40',
    accentText: 'text-fuchsia-400'
  },
  {
    folder: 'EUP (Loyalty Program)Web Portal',
    title: 'EUP Loyalty Portal',
    category: 'WEB & DIGITAL',
    intro: 'Loyalty platform UI explorations shaped around retention, rewards visibility, and simple user journeys.',
    accent: 'from-yellow-500/40 to-orange-600/40',
    accentText: 'text-yellow-400'
  },
  {
    folder: 'Mobile App Designs',
    title: 'Mobile App Design',
    category: 'WEB & DIGITAL',
    intro: 'Mobile UI concepts centered on intuitive flow, interface clarity, and modern app presentation.',
    accent: 'from-emerald-500/40 to-teal-600/40',
    accentText: 'text-emerald-400'
  },
  {
    folder: 'Corporate Presentations',
    title: 'Corporate Presentations',
    category: 'MARKETING & CAMPAIGNS',
    intro: 'Presentation visuals created for business storytelling, strategy communication, and stakeholder-ready decks.',
    accent: 'from-purple-500/40 to-indigo-600/40',
    accentText: 'text-purple-400'
  },
  {
    folder: 'Emailers',
    title: 'Emailer Campaigns',
    category: 'MARKETING & CAMPAIGNS',
    intro: 'Email campaign creatives designed for engagement, brand consistency, and strong visual hierarchy.',
    accent: 'from-pink-500/40 to-rose-600/40',
    accentText: 'text-pink-400'
  },
  {
    folder: 'Social Media Creatives',
    title: 'Social Media Creatives',
    category: 'MARKETING & CAMPAIGNS',
    intro: 'Campaign-ready social visuals built for platform engagement and consistent brand presence.',
    accent: 'from-sky-500/40 to-blue-600/40',
    accentText: 'text-sky-400'
  },
  {
    folder: 'Flyer Design',
    title: 'Flyer Design',
    category: 'MARKETING & CAMPAIGNS',
    intro: 'Impactful flyer layouts created for promotions, event visibility, and quick-read communication.',
    accent: 'from-indigo-500/40 to-purple-600/40',
    accentText: 'text-indigo-400'
  },
  {
    folder: 'Danglers Designs',
    title: 'Dangler Designs',
    category: 'MARKETING & CAMPAIGNS',
    intro: 'Promotional dangler creatives built for in-store visibility, campaign messaging, and high-impact branding.',
    accent: 'from-green-500/40 to-emerald-600/40',
    accentText: 'text-green-400'
  },
  {
    folder: 'Calendar Envelop Design',
    title: 'Calendar Envelope Design',
    category: 'PRINT DESIGN',
    intro: 'Branded envelope concepts designed to support seasonal calendar distribution and premium presentation.',
    accent: 'from-orange-500/40 to-amber-600/40',
    accentText: 'text-orange-400'
  },
  {
    folder: 'Calendar Report Design',
    title: 'Calendar Report Design',
    category: 'PRINT DESIGN',
    intro: 'Structured calendar-report layouts with a clean hierarchy, readable content flow, and a polished corporate look.',
    accent: 'from-blue-500/40 to-cyan-600/40',
    accentText: 'text-blue-400'
  },
  {
    folder: 'Invitation Cards',
    title: 'Invitation Card Design',
    category: 'PRINT DESIGN',
    intro: 'Invitation concepts balancing visual elegance with event-specific communication and print readiness.',
    accent: 'from-teal-500/40 to-cyan-600/40',
    accentText: 'text-teal-400'
  },
  {
    folder: 'Magazines Covers',
    title: 'Magazine Cover Design',
    category: 'PRINT DESIGN',
    intro: 'Cover visuals made to attract attention, communicate theme, and support editorial branding.',
    accent: 'from-amber-500/40 to-orange-600/40',
    accentText: 'text-amber-400'
  }
]

const projectMetaByFolder = Object.fromEntries(projectCatalog.map((item) => [item.folder, item]))

const projects = Object.entries(imageModules).reduce((accumulator, [path, image]) => {
  const folder = path.split('/')[2]
  const fileName = path.split('/').pop() || ''
  const fileBaseName = fileName.replace(/\.[^/.]+$/, '')
  const meta = projectMetaByFolder[folder] || {
    title: folder,
    category: 'OTHER',
    intro: 'Client work sample.',
    accent: 'from-brand-lime/40 to-green-600/40',
    accentText: 'text-brand-lime'
  }

  if (!accumulator[folder]) {
    accumulator[folder] = {
      folder,
      title: meta.title,
      category: meta.category,
      intro: meta.intro,
      accent: meta.accent,
      accentText: meta.accentText,
      images: []
    }
  }

  accumulator[folder].images.push({
    src: image,
    name: fileBaseName
  })

  return accumulator
}, {})

const groupedProjects = Object.values(projects)
  .map((project) => ({
    ...project,
    images: project.images.sort((a, b) => a.name.localeCompare(b.name))
  }))
  .sort((a, b) => {
    const orderA = projectCatalog.findIndex((item) => item.folder === a.folder)
    const orderB = projectCatalog.findIndex((item) => item.folder === b.folder)

    if (orderA === -1 && orderB === -1) return a.title.localeCompare(b.title)
    if (orderA === -1) return 1
    if (orderB === -1) return -1
    return orderA - orderB
  })

const categoryOrder = ['BRANDING & IDENTITY', 'WEB & DIGITAL', 'MARKETING & CAMPAIGNS', 'PRINT DESIGN']

const categorizedProjects = categoryOrder.reduce((acc, category) => {
  const projects = groupedProjects.filter((p) => p.category === category)
  if (projects.length > 0) {
    acc.push({ category, projects })
  }
  return acc
}, [])

function CarouselArrow({ direction, onClick, disabled }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'left' ? 'Scroll category left' : 'Scroll category right'}
      whileHover={{ scale: disabled ? 1 : 1.1 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`hidden md:flex absolute top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full transition-all ${
        direction === 'left' ? '-left-6' : '-right-6'
      } ${
        disabled
          ? 'text-brand-smoke/30 cursor-not-allowed'
          : 'text-brand-lime hover:bg-brand-lime/10 cursor-pointer'
      }`}
    >
      {direction === 'left' ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
    </motion.button>
  )
}

function ProjectCard({ project, expanded, onToggle, onOpenLightbox }) {
  const descriptionRef = useRef(null)
  const heroImage = project.images[0]
  const detailImages = project.images.slice(1)
  const panelId = `project-panel-${project.folder.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`
  const [shouldShowReadMore, setShouldShowReadMore] = useState(false)
  const [descriptionExpanded, setDescriptionExpanded] = useState(false)

  useEffect(() => {
    const updateReadMoreVisibility = () => {
      const node = descriptionRef.current
      if (!node) return

      setShouldShowReadMore(node.scrollHeight > node.clientHeight + 1)
    }

    updateReadMoreVisibility()
    window.addEventListener('resize', updateReadMoreVisibility)

    return () => window.removeEventListener('resize', updateReadMoreVisibility)
  }, [project.intro])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      layout
      className="relative flex-shrink-0 group w-[calc(100vw-3rem)] max-w-[340px] md:w-[360px]"
    >
      <div
        className={`relative rounded-[1.5rem] overflow-hidden backdrop-blur-md border border-white/10 bg-gradient-to-br ${project.accent} shadow-2xl shadow-black/40 transition-all duration-300 hover:border-white/20 h-full`}
      >
        <div className="relative w-full bg-black/50 flex flex-col">
          <button
            type="button"
            onClick={() => onOpenLightbox(project, 0)}
            className="relative w-full h-[260px] bg-black/50 flex items-center justify-center overflow-hidden cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-brand-lime/70"
            aria-label={`Open ${project.title} in fullscreen`}
          >
            <img
              src={heroImage.src}
              alt={`${project.title} preview`}
              className="w-full h-full object-contain p-4"
              loading="lazy"
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: expanded ? 1 : 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
            >
              <motion.div animate={{ scale: expanded ? 1 : 0.85 }} className="flex flex-col items-center gap-3">
                <motion.div
                  animate={{ scale: expanded ? 1 : 0.95 }}
                  className="p-3 rounded-full bg-brand-lime/20 border border-brand-lime/40"
                >
                  <Play size={24} className="text-brand-lime fill-brand-lime" />
                </motion.div>
                <span className="text-xs text-brand-lime font-mono uppercase tracking-widest">
                  {expanded ? 'Expanded' : 'View Project'}
                </span>
              </motion.div>
            </motion.div>

            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 rounded-full bg-black/50 border border-white/10 text-[10px] font-bold uppercase tracking-[0.25em] text-white/80 backdrop-blur-md">
                {project.images.length} images
              </span>
            </div>
          </button>

          <div className="p-5 space-y-4">
            <div className="space-y-2">
              <div className={`text-[11px] font-bold uppercase tracking-[0.35em] ${project.accentText}`}>
                {project.category}
              </div>
              <h3 className="text-lg font-black text-white uppercase tracking-tight leading-tight">
                {project.title}
              </h3>
            </div>

            <div className="relative min-h-[48px]">
              <p
                ref={descriptionRef}
                className={`text-sm text-brand-smoke leading-relaxed ${descriptionExpanded ? '' : 'line-clamp-2 pr-20'}`}
                aria-expanded={descriptionExpanded}
              >
                {project.intro}
              </p>

              {shouldShowReadMore && !descriptionExpanded && (
                <button
                  type="button"
                  onClick={() => setDescriptionExpanded(true)}
                  className="absolute bottom-0 right-0 translate-y-[1px] px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-lime bg-black/75 rounded-l-full hover:text-white transition-colors"
                  aria-label={`Read more about ${project.title}`}
                >
                  ....read more
                </button>
              )}

              {shouldShowReadMore && descriptionExpanded && (
                <button
                  type="button"
                  onClick={() => setDescriptionExpanded(false)}
                  className="mt-2 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-lime hover:text-white transition-colors"
                  aria-label={`Show less about ${project.title}`}
                >
                  Show less
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 text-[10px] text-brand-smoke/70 uppercase tracking-wider">
              <span className="px-2 py-1 rounded bg-white/5 border border-white/10">Client Work</span>
              <span className="px-2 py-1 rounded bg-white/5 border border-white/10">2025</span>
              <span className="px-2 py-1 rounded bg-white/5 border border-white/10">Design Ready</span>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                type="button"
                onClick={onToggle}
                aria-expanded={expanded}
                aria-controls={panelId}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-lime text-black font-bold text-xs uppercase tracking-[0.28em] hover:bg-white transition-colors"
              >
                {expanded ? 'Hide Project' : 'View Project'}
                <ChevronDown size={14} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
              </motion.button>

              <button
                type="button"
                onClick={() => onOpenLightbox(project, 0)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/80 font-bold text-xs uppercase tracking-[0.28em] hover:border-brand-lime/40 hover:text-white transition-colors"
              >
                Open Sheet
                <ExternalLink size={14} />
              </button>
            </div>
          </div>

          <motion.div
            id={panelId}
            initial={false}
            animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 border-t border-white/10 space-y-4">
              <div className="flex items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-smoke/70">
                <span>Expanded project view</span>
                <span>{project.images.length} files</span>
              </div>

              <button
                type="button"
                onClick={() => onOpenLightbox(project, 0)}
                className="w-full rounded-[1rem] bg-black/40 border border-white/5 p-4 cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-brand-lime/70"
                aria-label={`Open ${project.title} hero image fullscreen`}
              >
                <img
                  src={heroImage.src}
                  alt={`${project.title} expanded preview`}
                  className="w-full h-auto max-h-72 object-contain mx-auto"
                  loading="lazy"
                />
              </button>

              {detailImages.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                  {detailImages.slice(0, 4).map((image, index) => (
                    <button
                      key={image.name}
                      type="button"
                      onClick={() => onOpenLightbox(project, index + 1)}
                      className="rounded-[1rem] bg-black/25 border border-white/10 p-3 flex flex-col gap-2 text-left cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-brand-lime/70"
                      aria-label={`Open ${project.title} image ${index + 2} fullscreen`}
                    >
                      <div className="flex items-center justify-between gap-2 text-[9px] font-bold uppercase tracking-[0.28em] text-brand-smoke/70">
                        <span>{String(index + 2).padStart(2, '0')}</span>
                        <span className="truncate">{image.name.replace(/-/g, ' ')}</span>
                      </div>
                      <div className="min-h-28 rounded-[0.85rem] bg-black/35 border border-white/5 p-2 flex items-center justify-center">
                        <img
                          src={image.src}
                          alt={`${project.title} image ${index + 2}`}
                          className="w-full h-auto max-h-28 object-contain mx-auto"
                          loading="lazy"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

function CategoryCarousel({ categoryData, expandedProject, setExpandedProject, onOpenLightbox }) {
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (scrollRef.current) {
      setCanScrollLeft(scrollRef.current.scrollLeft > 0)
      setCanScrollRight(
        scrollRef.current.scrollLeft < scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 10
      )
    }
  }

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
      setTimeout(checkScroll, 600)
    }
  }

  const handleToggle = (projectFolder) => {
    setExpandedProject((current) => (current === projectFolder ? null : projectFolder))
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-20"
    >
      {/* Category Header */}
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
              {categoryData.category}
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '240px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-[2px] bg-gradient-to-r from-brand-lime to-transparent hidden sm:block"
            />
          </div>
          <p className="text-xs sm:text-sm text-brand-smoke/60 mt-2 uppercase tracking-wider font-mono">
            {categoryData.projects.length} project{categoryData.projects.length > 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative group">
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
          style={{ scrollBehavior: 'smooth', touchAction: 'pan-x' }}
        >
          {categoryData.projects.map((project) => (
            <div key={project.folder} className="snap-start">
              <ProjectCard
                project={project}
                expanded={expandedProject === project.folder}
                onToggle={() => handleToggle(project.folder)}
                onOpenLightbox={onOpenLightbox}
              />
            </div>
          ))}
        </div>

        {/* Carousel Arrows */}
        <CarouselArrow direction="left" onClick={() => scroll('left')} disabled={!canScrollLeft} />
        <CarouselArrow direction="right" onClick={() => scroll('right')} disabled={!canScrollRight} />
      </div>
    </motion.section>
  )
}

export default function Projects() {
  const [expandedProject, setExpandedProject] = useState(null)
  const [lightbox, setLightbox] = useState({ open: false, project: null, index: 0 })

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    if (lightbox.open) {
      document.body.style.overflow = 'hidden'
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (lightbox.open) {
          setLightbox({ open: false, project: null, index: 0 })
        } else {
          setExpandedProject(null)
        }
        return
      }

      if (!lightbox.open || !lightbox.project) return

      if (event.key === 'ArrowLeft') {
        setLightbox((current) => ({
          ...current,
          index: (current.index - 1 + current.project.images.length) % current.project.images.length
        }))
      }

      if (event.key === 'ArrowRight') {
        setLightbox((current) => ({
          ...current,
          index: (current.index + 1) % current.project.images.length
        }))
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [lightbox.open, lightbox.project])

  const openLightbox = (project, index = 0) => {
    setExpandedProject(project.folder)
    setLightbox({ open: true, project, index })
  }

  const closeLightbox = () => setLightbox({ open: false, project: null, index: 0 })

  const moveLightbox = (direction) => {
    if (!lightbox.project) return

    setLightbox((current) => ({
      ...current,
      index:
        direction === 'prev'
          ? (current.index - 1 + current.project.images.length) % current.project.images.length
          : (current.index + 1) % current.project.images.length
    }))
  }

  return (
    <section id="work" className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-lime/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <span className="text-brand-lime font-mono text-xs uppercase tracking-[0.4em] mb-4 block">
            Adaptive Flow
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-tight">
            WORK <br /> <span className="text-brand-lime">GALLERY.</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-brand-smoke/70 mt-6 max-w-2xl leading-relaxed">
            An extensive collection of premium creative assets, seamlessly organized by category. Each project
            showcases meticulous attention to detail and versatile design excellence.
          </p>
        </motion.div>

        {/* Category Carousels */}
        <div className="space-y-32">
          {categorizedProjects.map((categoryData) => (
            <CategoryCarousel
              key={categoryData.category}
              categoryData={categoryData}
              expandedProject={expandedProject}
              setExpandedProject={setExpandedProject}
              onOpenLightbox={openLightbox}
            />
          ))}
        </div>

        {lightbox.open && lightbox.project && (
          <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center px-3 sm:px-4 py-4 sm:py-6 overflow-y-auto">
            <div className="absolute inset-0" onClick={closeLightbox} />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 w-full max-w-6xl max-h-[calc(100vh-32px)] overflow-hidden rounded-lg sm:rounded-2xl lg:rounded-[2rem] border border-white/10 bg-brand-gray/95 shadow-2xl shadow-black/60 flex flex-col"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 border-b border-white/10 flex-shrink-0">
                <div className="min-w-0 flex-1">
                  <p className={`text-[10px] uppercase tracking-[0.35em] ${lightbox.project.accentText}`}>
                    Fullscreen Preview
                  </p>
                  <h3 className="text-base sm:text-lg md:text-xl font-black text-white uppercase tracking-tight truncate">
                    {lightbox.project.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => moveLightbox('prev')}
                    className="p-1.5 sm:p-2 rounded-full bg-white/5 border border-white/10 text-white hover:border-brand-lime/40 hover:text-brand-lime transition-colors hidden sm:flex"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveLightbox('next')}
                    className="p-1.5 sm:p-2 rounded-full bg-white/5 border border-white/10 text-white hover:border-brand-lime/40 hover:text-brand-lime transition-colors hidden sm:flex"
                    aria-label="Next image"
                  >
                    <ChevronRight size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={closeLightbox}
                    className="p-1.5 sm:p-2 rounded-full bg-white/5 border border-white/10 text-white hover:border-brand-lime/40 hover:text-brand-lime transition-colors"
                    aria-label="Close fullscreen preview"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="grid lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.9fr)] gap-0 max-h-[calc(100vh-120px)] flex-1 overflow-hidden">
                <div className="bg-black flex items-center justify-center p-2 sm:p-4 md:p-6 min-h-[250px] sm:min-h-[320px] overflow-auto">
                  <img
                    src={lightbox.project.images[lightbox.index].src}
                    alt={`${lightbox.project.title} fullscreen ${lightbox.index + 1}`}
                    className="max-h-[calc(100vh-180px)] w-auto max-w-full object-contain"
                  />
                </div>

                <div className="border-t lg:border-t-0 lg:border-l border-white/10 p-3 sm:p-4 md:p-6 overflow-y-auto space-y-4 sm:space-y-5">
                  <div className="space-y-2">
                    <div className={`text-[10px] uppercase tracking-[0.35em] ${lightbox.project.accentText}`}>
                      {lightbox.project.category}
                    </div>
                    <p className="text-xs sm:text-sm text-brand-smoke leading-relaxed">{lightbox.project.intro}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm text-white">
                    <div className="rounded-lg sm:rounded-[1rem] bg-white/5 border border-white/10 p-2 sm:p-3">
                      <span className="block text-[10px] uppercase tracking-[0.28em] text-brand-smoke/70">Image</span>
                      <span className="font-bold">{String(lightbox.index + 1).padStart(2, '0')}</span>
                    </div>
                    <div className="rounded-lg sm:rounded-[1rem] bg-white/5 border border-white/10 p-2 sm:p-3">
                      <span className="block text-[10px] uppercase tracking-[0.28em] text-brand-smoke/70">Total</span>
                      <span className="font-bold">{lightbox.project.images.length}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                    {lightbox.project.images.map((image, index) => (
                      <button
                        key={image.name}
                        type="button"
                        onClick={() => setLightbox((current) => ({ ...current, index }))}
                        className={`rounded-lg sm:rounded-[1rem] border p-1.5 sm:p-2 bg-black/30 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-lime/70 ${
                          index === lightbox.index
                            ? 'border-brand-lime/60'
                            : 'border-white/10 hover:border-white/30'
                        }`}
                        aria-label={`Show image ${index + 1} fullscreen`}
                      >
                        <img
                          src={image.src}
                          alt={`${lightbox.project.title} thumbnail ${index + 1}`}
                          className="h-16 sm:h-20 w-full object-contain"
                        />
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-2 sm:hidden pt-2 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => moveLightbox('prev')}
                      className="flex-1 p-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:border-brand-lime/40 hover:text-brand-lime transition-colors"
                      aria-label="Previous image"
                    >
                      ← Prev
                    </button>
                    <button
                      type="button"
                      onClick={() => moveLightbox('next')}
                      className="flex-1 p-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:border-brand-lime/40 hover:text-brand-lime transition-colors"
                      aria-label="Next image"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 pt-16 border-t border-white/10 text-center px-4"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Interested in Working Together?</h3>
          <p className="text-sm sm:text-base text-brand-smoke/60 mb-8">Let's bring your creative vision to life.</p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-6 sm:px-8 py-2 sm:py-3 bg-brand-lime text-black font-bold uppercase tracking-widest rounded-full hover:bg-white transition-all text-xs sm:text-sm"
          >
            Start a Project
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
