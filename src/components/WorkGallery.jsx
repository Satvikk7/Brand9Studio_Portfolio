import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import projectsData from '../data/projects.json'
import { normalizeProjects, buildCategories } from '../utils/projectModel'

const categoryColors = {
  'BROCHURE': 'from-orange-500/20 to-amber-600/20',
  'BRANDING & IDENTITY': 'from-violet-500/20 to-violet-600/20',
  'WEB & DIGITAL': 'from-cyan-500/20 to-blue-600/20',
  'MARKETING & CAMPAIGNS': 'from-pink-500/20 to-rose-600/20',
  'PRINT DESIGN': 'from-amber-500/20 to-orange-600/20'
}

const categoryBadges = {
  'BROCHURE': 'bg-orange-500/30 text-orange-300',
  'BRANDING & IDENTITY': 'bg-violet-500/30 text-violet-300',
  'WEB & DIGITAL': 'bg-cyan-500/30 text-cyan-300',
  'MARKETING & CAMPAIGNS': 'bg-pink-500/30 text-pink-300',
  'PRINT DESIGN': 'bg-amber-500/30 text-amber-300'
}

function formatCategoryLabel(category = '') {
  const known = {
    'BROCHURE': 'Brochure',
    'ANALYTICS': 'Analytics',
    'EMAILERS': 'Emailers',
    'BRANDING & IDENTITY': 'Branding',
    'WEB & DIGITAL': 'Digital',
    'MARKETING & CAMPAIGNS': 'Marketing',
    'PRINT DESIGN': 'Print Design'
  }

  return known[category] || category
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function ProjectCard({ project, index, onOpenProject }) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  }

  const imageCount = project.images?.length || 1
  const colorClass = categoryColors[project.category] || 'from-brand-lime/20 to-green-600/20'

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
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
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
            loading="lazy"
            decoding="async"
          />
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
}

function FilterButton({ category, isActive, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
        isActive
          ? 'bg-brand-lime text-black shadow-lg shadow-brand-lime/40'
          : 'bg-white/5 border border-white/15 text-white/70 hover:border-brand-lime/60 hover:text-white hover:bg-white/8'
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

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'ALL') {
      return normalizedProjects
    }
    return normalizedProjects.filter((project) => project.category === activeCategory)
  }, [activeCategory, normalizedProjects])

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

      <div className="max-w-7xl mx-auto px-6 relative z-10">
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

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 sm:mt-24 pt-12 sm:pt-16 border-t border-white/10 text-center px-4"
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
