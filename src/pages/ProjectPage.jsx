import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Layers, User } from 'lucide-react'
import projectsData from '../data/projects.json'
import { normalizeProjects } from '../utils/projectModel'

const defaultTheme = {
  primary: 'rgba(196, 239, 71, 0.20)',
  secondary: 'rgba(247, 148, 29, 0.16)'
}

const frameBlueprints = [
  {
    stage: 'Cover Direction',
    focus: 'Introduces the visual language and sets first-impression hierarchy.',
    outcome: 'Establishes a premium identity and narrative tone from the first glance.'
  },
  {
    stage: 'Brand Story Layer',
    focus: 'Builds context with supporting brand messaging, values, and positioning.',
    outcome: 'Improves readability and emotional connection with the target audience.'
  },
  {
    stage: 'Offer & Structure',
    focus: 'Organizes offerings with clear sections, visual anchors, and conversion cues.',
    outcome: 'Enables faster scanning and better decision-making for viewers.'
  },
  {
    stage: 'Closing Communication',
    focus: 'Reinforces trust through concise closure, contact pathways, and call-to-action.',
    outcome: 'Strengthens campaign continuity and supports measurable response.'
  }
]

function buildFrameContent(project, index, totalFrames) {
  const blueprint = frameBlueprints[index] || {
    stage: `Extended Frame ${index + 1}`,
    focus: 'Adds supplementary visuals and supporting narrative continuity.',
    outcome: 'Keeps the design system consistent across longer format presentation assets.'
  }

  const customNarrative = project.frameNarratives?.[index]

  return {
    label: `Frame ${index + 1} / ${totalFrames}`,
    title: customNarrative?.title || blueprint.stage,
    insight: `${project.title} for ${project.client} uses a ${project.category.toLowerCase()}-oriented composition with strong visual rhythm and disciplined spacing.`,
    focus: customNarrative?.focus || blueprint.focus,
    outcome: customNarrative?.detail || blueprint.outcome
  }
}

function getThemeFromImage(src) {
  return new Promise((resolve) => {
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.src = src

    image.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d', { willReadFrequently: true })
        if (!context) {
          resolve(defaultTheme)
          return
        }

        const sampleSize = 48
        canvas.width = sampleSize
        canvas.height = sampleSize
        context.drawImage(image, 0, 0, sampleSize, sampleSize)

        const pixels = context.getImageData(0, 0, sampleSize, sampleSize).data
        let red = 0
        let green = 0
        let blue = 0
        let count = 0

        for (let index = 0; index < pixels.length; index += 4) {
          const alpha = pixels[index + 3]
          if (alpha < 128) continue

          red += pixels[index]
          green += pixels[index + 1]
          blue += pixels[index + 2]
          count += 1
        }

        if (!count) {
          resolve(defaultTheme)
          return
        }

        const averageRed = Math.round(red / count)
        const averageGreen = Math.round(green / count)
        const averageBlue = Math.round(blue / count)

        const brighten = (channel) => Math.min(255, Math.round(channel * 1.2 + 14))
        const darken = (channel) => Math.max(0, Math.round(channel * 0.62))

        resolve({
          primary: `rgba(${brighten(averageRed)}, ${brighten(averageGreen)}, ${brighten(averageBlue)}, 0.28)`,
          secondary: `rgba(${darken(averageBlue)}, ${darken(averageRed)}, ${darken(averageGreen)}, 0.24)`
        })
      } catch {
        resolve(defaultTheme)
      }
    }

    image.onerror = () => resolve(defaultTheme)
  })
}

export default function ProjectPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [theme, setTheme] = useState(defaultTheme)

  const projects = useMemo(
    () => normalizeProjects(projectsData.projects || []),
    []
  )

  const project = useMemo(
    () => projects.find((item) => String(item.id) === String(id)),
    [id, projects]
  )

  const handleBackToGallery = () => {
    navigate('/', {
      state: {
        scrollY: location.state?.scrollY ?? 0,
        activeCategory: location.state?.activeCategory ?? 'ALL'
      }
    })
  }

  useEffect(() => {
    if (!project?.heroImage) return

    let mounted = true
    getThemeFromImage(project.heroImage).then((palette) => {
      if (mounted) setTheme(palette)
    })

    return () => {
      mounted = false
    }
  }, [project?.heroImage])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [id])

  if (!project) {
    return (
      <section className="min-h-screen flex items-center justify-center px-6 py-28">
        <div className="max-w-xl w-full rounded-3xl border border-white/10 bg-black/45 backdrop-blur-xl p-8 sm:p-10 text-center">
          <p className="text-brand-smoke uppercase tracking-[0.24em] text-[10px] mb-4">Project</p>
          <h1 className="text-white text-2xl sm:text-3xl font-black mb-3">Project not found</h1>
          <p className="text-brand-smoke text-sm mb-8">The requested project route is unavailable.</p>
          <button
            onClick={handleBackToGallery}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand-lime text-black text-xs sm:text-sm font-black uppercase tracking-widest"
          >
            <ArrowLeft size={16} /> Back to gallery
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen pt-28 pb-16 sm:pb-24 px-4 sm:px-6">
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background: `
            radial-gradient(circle at 20% 15%, ${theme.primary} 0%, transparent 36%),
            radial-gradient(circle at 85% 20%, ${theme.secondary} 0%, transparent 34%),
            radial-gradient(circle at 50% 90%, rgba(255,255,255,0.04) 0%, transparent 26%)
          `
        }}
      />

      <div className="max-w-6xl mx-auto space-y-8 sm:space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-white/10 bg-black/45 backdrop-blur-xl p-4 sm:p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/"
              onClick={(event) => {
                event.preventDefault()
                handleBackToGallery()
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-white text-[11px] sm:text-xs font-bold uppercase tracking-widest hover:border-brand-lime hover:text-brand-lime transition-colors"
            >
              <ArrowLeft size={16} /> Back to gallery
            </Link>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-brand-smoke text-[10px] sm:text-xs uppercase tracking-wider">
                <Layers size={14} /> {project.category}
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-brand-smoke text-[10px] sm:text-xs uppercase tracking-wider">
                <Calendar size={14} /> {project.year}
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-brand-smoke text-[10px] sm:text-xs uppercase tracking-wider">
                <User size={14} /> {project.client}
              </span>
            </div>
          </div>

          <div className="mt-6 sm:mt-8">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.32em] text-brand-lime mb-3">Project Showcase</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {project.title}
            </h1>
            <p className="mt-4 text-sm sm:text-base text-brand-smoke/90 max-w-3xl leading-relaxed">
              {project.description}
            </p>

          </div>
        </motion.div>

        <div className="space-y-5 sm:space-y-7 md:space-y-9">
          {project.images.map((image, index) => {
            const frameContent = buildFrameContent(project, index, project.images.length)
            const reverseLayout = index % 2 === 1

            return (
              <motion.article
                key={image}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3 }}
                className="rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-black/45 backdrop-blur-xl shadow-[0_20px_55px_rgba(0,0,0,0.35)]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-5">
                  <motion.div
                    initial={{ opacity: 0, x: reverseLayout ? 24 : -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className={`p-4 sm:p-5 md:p-6 lg:p-7 lg:col-span-5 border-b lg:border-b-0 border-white/10 ${reverseLayout ? 'lg:order-2 lg:border-l lg:border-l-white/10 lg:border-r-0' : 'lg:border-r lg:border-r-white/10'}`}
                  >
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.24em] text-brand-lime mb-3">
                      {project.projectFolder || project.category}
                    </p>

                    <h2 className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-tight leading-tight mb-4">
                      {frameContent.title}
                    </h2>

                    <div className="space-y-4">
                      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 sm:p-4">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-brand-smoke mb-2">Insight</p>
                        <p className="text-sm sm:text-[15px] text-brand-smoke/90 leading-relaxed">
                          {frameContent.insight}
                        </p>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 sm:p-4">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-brand-smoke mb-2">Focus</p>
                        <p className="text-sm sm:text-[15px] text-brand-smoke/85 leading-relaxed">
                          {frameContent.focus}
                        </p>
                      </div>

                      <div className="rounded-xl border border-brand-lime/20 bg-brand-lime/5 p-3 sm:p-4">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-brand-lime mb-2">Outcome</p>
                        <p className="text-sm sm:text-[15px] text-white/90 leading-relaxed">
                          {frameContent.outcome}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: reverseLayout ? -24 : 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className={`lg:col-span-7 p-3 sm:p-4 md:p-6 ${reverseLayout ? 'lg:order-1' : ''}`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.008 }}
                      transition={{ duration: 0.25 }}
                      className="rounded-xl sm:rounded-2xl border border-white/10 bg-black/40 p-2 sm:p-3 md:p-4 flex justify-center"
                    >
                      <img
                        src={image}
                        alt={`${project.title} asset ${index + 1}`}
                        className="w-auto h-auto max-w-full max-h-[75vh] sm:max-h-[80vh] object-contain rounded-lg sm:rounded-xl"
                        loading={index === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={handleBackToGallery}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 inline-flex items-center gap-2 px-4 sm:px-5 py-3 rounded-full border border-brand-lime/30 bg-black/70 backdrop-blur-xl text-brand-lime text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-lg shadow-black/30 hover:bg-brand-lime/10 hover:border-brand-lime/60 hover:text-brand-lime transition-all duration-300"
      >
        <ArrowLeft size={16} /> Back to gallery
      </button>
    </section>
  )
}
