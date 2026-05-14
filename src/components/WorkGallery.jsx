import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import projectsData from '../data/projects.json'
import { normalizeProjects, buildCategories } from '../utils/projectModel'

const categoryColors = {
  'BROCHURE': 'from-orange-500/20 to-amber-600/20',
  'BRANDING & IDENTITY': 'from-violet-500/20 to-violet-600/20',
  'LOGO DESIGNS': 'from-brand-lime/20 to-emerald-500/20',
  'SOCIAL MEDIA POSTS': 'from-fuchsia-500/20 to-cyan-500/20',
  'VISITING CARDS': 'from-sky-500/20 to-indigo-500/20',
  'WEBSITE PAGE': 'from-blue-500/20 to-violet-600/20',
  'WEB & DIGITAL': 'from-cyan-500/20 to-blue-600/20',
  'MARKETING & CAMPAIGNS': 'from-pink-500/20 to-rose-600/20',
  'PRINT DESIGN': 'from-amber-500/20 to-orange-600/20'
}

const categoryBadges = {
  'BROCHURE': 'bg-orange-500/30 text-orange-300',
  'BRANDING & IDENTITY': 'bg-violet-500/30 text-violet-300',
  'LOGO DESIGNS': 'bg-emerald-500/30 text-emerald-300',
  'SOCIAL MEDIA POSTS': 'bg-fuchsia-500/30 text-fuchsia-300',
  'VISITING CARDS': 'bg-sky-500/30 text-sky-300',
  'WEBSITE PAGE': 'bg-blue-500/30 text-blue-300',
  'WEB & DIGITAL': 'bg-cyan-500/30 text-cyan-300',
  'MARKETING & CAMPAIGNS': 'bg-pink-500/30 text-pink-300',
  'PRINT DESIGN': 'bg-amber-500/30 text-amber-300'
}

const categorySortOrder = [
  'BROCHURE',
  'CORPORATE DESKS',
  'WEBSITE PAGE',
  'SOCIAL MEDIA POSTS',
  'VISITING CARDS',
  'LOGO DESIGNS',
  'EMAILERS',
  'ANALYTICS',
  'BRANDING & IDENTITY',
  'WEB & DIGITAL',
  'MARKETING & CAMPAIGNS',
  'PRINT DESIGN'
]

function formatCategoryLabel(category = '') {
  const known = {
    'BROCHURE': 'Brochure',
    'ANALYTICS': 'Analytics',
    'EMAILERS': 'Emailers',
    'BRANDING & IDENTITY': 'Branding',
    'LOGO DESIGNS': 'Logo Design',
    'SOCIAL MEDIA POSTS': 'Social Media',
    'VISITING CARDS': 'Visiting Cards',
    'WEBSITE PAGE': 'Website Page',
    'WEB & DIGITAL': 'Digital',
    'MARKETING & CAMPAIGNS': 'Marketing',
    'PRINT DESIGN': 'Print Design'
  }

  return known[category] || category
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

const ProjectCard = React.memo(React.forwardRef(({ project, index, onOpenProject }, ref) => {
  const containerVariants = {
    hidden: { 
      opacity: 0, 
      y: 40, 
      scale: 0.94,
      filter: 'blur(8px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
        scale: {
          type: "spring",
          stiffness: 100,
          damping: 15,
          delay: index * 0.06
        }
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9, 
      filter: 'blur(10px)',
      transition: { duration: 0.3 } 
    }
  }

  const imageCount = project.images?.length || 1
  const colorClass = categoryColors[project.category] || 'from-brand-lime/20 to-green-600/20'
  const isPdfHero = /\.pdf$/i.test(project.heroImage || '')

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
      className="group h-full"
    >
      <motion.button
        onClick={() => onOpenProject(project)}
        whileHover={{ scale: 1.015, y: -4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        className={`premium-card relative rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br ${colorClass} hover:border-white/25 transition-all duration-300 h-full flex flex-col cursor-pointer w-full`}
      >
        {/* Image Container with Overlay */}
        <div className="relative w-full overflow-hidden bg-black/40 aspect-square sm:aspect-video flex items-center justify-center">
          {isPdfHero ? (
            <>
              {/* Desktop Iframe */}
              <iframe
                src={`${project.heroImage}#view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
                title={`${project.title} PDF preview`}
                className="hidden sm:block w-full h-full pointer-events-none border-0"
              />
              {/* Mobile/Tablet Placeholder */}
              <div className="sm:hidden w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-brand-gray/40 to-black/60 p-6">
                <div className="w-16 h-16 rounded-2xl bg-brand-lime/10 border border-brand-lime/30 flex items-center justify-center mb-3">
                  <span className="text-brand-lime font-black text-xl">PDF</span>
                </div>
                <span className="text-[10px] text-brand-smoke/60 uppercase tracking-[0.2em] font-bold">Document Preview</span>
              </div>
            </>
          ) : (
            <img
              src={project.heroImage}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
              loading="lazy"
              decoding="async"
            />
          )}
          {/* Premium Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Hover CTA Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          >
            <div className="px-4 py-2 rounded-full bg-brand-lime/90 text-black font-bold text-xs sm:text-sm uppercase tracking-widest mb-2">
              View Project
            </div>
            <span className="text-xs text-brand-lime/80 font-mono">{imageCount} Images</span>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4 sm:p-5 flex flex-col gap-3">
          <div className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-white line-clamp-2 group-hover:text-brand-lime transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-brand-smoke/70 line-clamp-1">{project.client}</p>
            {project.projectFolder && (
              <p className="text-[10px] sm:text-xs text-brand-smoke/50 uppercase tracking-[0.16em] line-clamp-1">
                {project.projectFolder}
              </p>
            )}
          </div>

          <p className="text-xs text-brand-smoke/60 line-clamp-2 flex-grow">
            {project.description}
          </p>

          {/* Footer with Category & Year */}
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
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative px-5 sm:px-7 py-2 rounded-xl font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] transition-all duration-500 whitespace-nowrap ${
        isActive
          ? 'bg-brand-lime text-black shadow-xl shadow-brand-lime/20 border border-brand-lime/50'
          : 'bg-white/[0.03] border border-white/10 text-white/50 hover:border-brand-lime/40 hover:text-white hover:bg-white/[0.06]'
      }`}
    >
      {category}
      {isActive && (
        <motion.div
          layoutId="filterUnderline"
          className="absolute inset-0 rounded-full bg-brand-lime/10"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </motion.button>
  )
}

export default function WorkGallery() {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeCategory, setActiveCategory] = useState(location.state?.activeCategory || 'ALL')

  const normalizedProjects = useMemo(
    () => normalizeProjects(projectsData.projects || []),
    []
  )

  const categories = useMemo(
    () => buildCategories(normalizedProjects),
    [normalizedProjects]
  )

  const sortedProjects = useMemo(() => {
    return [...normalizedProjects].sort((a, b) => {
      const categoryIndexA = categorySortOrder.indexOf(a.category)
      const categoryIndexB = categorySortOrder.indexOf(b.category)
      const safeCategoryIndexA = categoryIndexA === -1 ? categorySortOrder.length : categoryIndexA
      const safeCategoryIndexB = categoryIndexB === -1 ? categorySortOrder.length : categoryIndexB

      if (safeCategoryIndexA !== safeCategoryIndexB) {
        return safeCategoryIndexA - safeCategoryIndexB
      }

      return String(a.title).localeCompare(String(b.title))
    })
  }, [normalizedProjects])

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'ALL') {
      return sortedProjects
    }
    return sortedProjects.filter((project) => project.category === activeCategory)
  }, [activeCategory, sortedProjects])

  const handleOpenProject = (project) => {
    navigate(`/project/${project.id}`, {
      state: {
        scrollY: window.scrollY,
        activeCategory
      }
    })
  }

  useEffect(() => {
    const restoredCategory = location.state?.activeCategory
    if (restoredCategory) {
      setActiveCategory(restoredCategory)
    }
  }, [location.state])

  return (
    <section id="work" className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-lime/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="main-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <span className="text-brand-lime font-mono text-xs uppercase tracking-[0.4em] mb-4 block">
            Adaptive Flow
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-tight mb-6">
            WORK <br /> <span className="text-brand-lime">GALLERY.</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-brand-smoke/70 max-w-2xl leading-relaxed">
            Explore premium creative projects showcasing versatile design excellence. Click any project to view the complete image collection in fullscreen.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 sm:mb-16 flex flex-wrap items-center gap-3 sm:gap-4"
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

        {/* Masonry Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 auto-rows-max"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onOpenProject={handleOpenProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center py-16"
          >
            <p className="text-white/60 text-lg">No projects found in this category.</p>
          </motion.div>
        )}

        {/* Footer CTA - Premium Island */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-24 sm:mt-32 p-10 sm:p-16 glass-panel relative overflow-hidden group text-center"
        >
          {/* Subtle Glow Background */}
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
              className="inline-block px-10 py-4 bg-brand-lime text-black font-black uppercase tracking-[0.2em] rounded-xl hover:bg-white transition-all text-xs sm:text-sm shadow-xl shadow-brand-lime/20"
            >
              Start a Project
            </motion.a>
          </div>

          {/* Decorative Corner Elements */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-lime/10 rounded-full blur-2xl group-hover:bg-brand-lime/20 transition-all duration-700" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-brand-orange/10 rounded-full blur-2xl group-hover:bg-brand-orange/20 transition-all duration-700" />
        </motion.div>
      </div>

    </section>
  )
}
