import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const imageModules = import.meta.glob('/used photos/**/*.{png,jpg,jpeg,webp,avif,svg}', {
  eager: true,
  import: 'default'
})

const projectCatalog = [
  {
    folder: 'Calendar Envelop Design',
    title: 'Calendar Envelope Design',
    intro: 'Branded envelope concepts designed to support seasonal calendar distribution and premium presentation.',
    accent: 'text-orange-500',
    color: 'bg-orange-500/10'
  },
  {
    folder: 'Calendar Report Design',
    title: 'Calendar Report Design',
    intro: 'Structured calendar-report layouts with a clean hierarchy, readable content flow, and a polished corporate look.',
    accent: 'text-blue-500',
    color: 'bg-blue-500/10'
  },
  {
    folder: 'Corporate Presentations',
    title: 'Corporate Presentations',
    intro: 'Presentation visuals created for business storytelling, strategy communication, and stakeholder-ready decks.',
    accent: 'text-purple-500',
    color: 'bg-purple-500/10'
  },
  {
    folder: 'Danglers Designs',
    title: 'Dangler Designs',
    intro: 'Promotional dangler creatives built for in-store visibility, campaign messaging, and high-impact branding.',
    accent: 'text-green-500',
    color: 'bg-green-500/10'
  },
  {
    folder: 'Dashboard (Web Portal)',
    title: 'Dashboard Web Portal',
    intro: 'Dashboard UI concepts focused on clarity, data visibility, and a smooth analytics experience.',
    accent: 'text-cyan-500',
    color: 'bg-cyan-500/10'
  },
  {
    folder: 'Emailers',
    title: 'Emailer Campaigns',
    intro: 'Email campaign creatives designed for engagement, brand consistency, and strong visual hierarchy.',
    accent: 'text-pink-500',
    color: 'bg-pink-500/10'
  },
  {
    folder: 'EUP (Loyalty Program)Web Portal',
    title: 'EUP Loyalty Portal',
    intro: 'Loyalty platform UI explorations shaped around retention, rewards visibility, and simple user journeys.',
    accent: 'text-yellow-500',
    color: 'bg-yellow-500/10'
  },
  {
    folder: 'Flyer Design',
    title: 'Flyer Design',
    intro: 'Impactful flyer layouts created for promotions, event visibility, and quick-read communication.',
    accent: 'text-indigo-500',
    color: 'bg-indigo-500/10'
  },
  {
    folder: 'ID Cards',
    title: 'ID Card Design',
    intro: 'Professional identity card layouts with clear information structure and brand-aligned styling.',
    accent: 'text-red-500',
    color: 'bg-red-500/10'
  },
  {
    folder: 'Invitation Cards',
    title: 'Invitation Card Design',
    intro: 'Invitation concepts balancing visual elegance with event-specific communication and print readiness.',
    accent: 'text-teal-500',
    color: 'bg-teal-500/10'
  },
  {
    folder: 'Letterhead Design',
    title: 'Letterhead Design',
    intro: 'Corporate letterhead systems created for formal communication and consistent documentation.',
    accent: 'text-lime-500',
    color: 'bg-lime-500/10'
  },
  {
    folder: 'Logo designs',
    title: 'Logo Design System',
    intro: 'Identity mark explorations covering symbol, typography, and the visual language of a brand.',
    accent: 'text-violet-500',
    color: 'bg-violet-500/10'
  },
  {
    folder: 'Magazines Covers',
    title: 'Magazine Cover Design',
    intro: 'Cover visuals made to attract attention, communicate theme, and support editorial branding.',
    accent: 'text-amber-500',
    color: 'bg-amber-500/10'
  },
  {
    folder: 'Mobile App Designs',
    title: 'Mobile App Design',
    intro: 'Mobile UI concepts centered on intuitive flow, interface clarity, and modern app presentation.',
    accent: 'text-emerald-500',
    color: 'bg-emerald-500/10'
  },
  {
    folder: 'Social Media Creatives',
    title: 'Social Media Creatives',
    intro: 'Campaign-ready social visuals built for platform engagement and consistent brand presence.',
    accent: 'text-sky-500',
    color: 'bg-sky-500/10'
  },
  {
    folder: 'Style Guide (Web Portal)',
    title: 'Style Guide Web Portal',
    intro: 'Reusable UI guidelines for portal components, typography, spacing, and color behavior.',
    accent: 'text-fuchsia-500',
    color: 'bg-fuchsia-500/10'
  },
  {
    folder: 'Visiting Cards',
    title: 'Visiting Card Design',
    intro: 'Business card concepts aligned with professional identity and practical print usage.',
    accent: 'text-rose-500',
    color: 'bg-rose-500/10'
  },
  {
    folder: 'Website Design',
    title: 'Website Design',
    intro: 'Website visuals shaped around conversion, brand tone, and strong user experience.',
    accent: 'text-brand-lime',
    color: 'bg-brand-lime/10'
  }
]

const projectMetaByFolder = Object.fromEntries(projectCatalog.map((item) => [item.folder, item]))
const projectOrder = projectCatalog.map((item) => item.folder)

const projects = Object.entries(imageModules).reduce((accumulator, [path, image]) => {
  const folder = path.split('/')[2]
  const fileName = path.split('/').pop() || ''
  const fileBaseName = fileName.replace(/\.[^/.]+$/, '')
  const meta = projectMetaByFolder[folder] || {
    title: folder,
    intro: 'Client work sample grouped from the same design series.',
    accent: 'text-brand-lime',
    color: 'bg-brand-lime/10'
  }

  if (!accumulator[folder]) {
    accumulator[folder] = {
      folder,
      title: meta.title,
      intro: meta.intro,
      accent: meta.accent,
      color: meta.color,
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
    const orderA = projectOrder.indexOf(a.folder)
    const orderB = projectOrder.indexOf(b.folder)

    if (orderA === -1 && orderB === -1) return a.title.localeCompare(b.title)
    if (orderA === -1) return 1
    if (orderB === -1) return -1
    return orderA - orderB
  })

export default function Projects() {
  const [filter, setFilter] = useState('All')

  const categories = ['All', ...groupedProjects.map((project) => project.folder)]

  const visibleProjects =
    filter === 'All' ? groupedProjects : groupedProjects.filter((project) => project.folder === filter)

  return (
    <section id="work" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-lime font-mono text-xs uppercase tracking-[0.4em] mb-4 block">Work Gallery</span>
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
              WORK <br /> <span className="text-brand-lime">GALLERY.</span>
            </h2>
          </motion.div>

          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all ${
                  filter === cat
                    ? 'bg-brand-lime text-black border-brand-lime'
                    : 'bg-transparent text-brand-smoke border-white/10 hover:border-brand-lime/30'
                }`}
              >
                {cat === 'All' ? 'All Work' : projectMetaByFolder[cat]?.title || cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {visibleProjects.map((project) => {
            const [heroImage, ...galleryImages] = project.images
            const sheetImages = project.images

            return (
              <motion.article
                key={project.folder}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="group overflow-hidden rounded-[2rem] border border-white/5 bg-brand-gray/90 shadow-2xl shadow-black/20 hover:border-brand-lime/30 transition-all duration-500"
              >
                <div className="grid gap-8 p-6 md:p-8 lg:p-10">
                  <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div className="max-w-3xl">
                      <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <span className={`text-xs font-bold uppercase tracking-[0.35em] ${project.accent}`}>
                          {project.folder}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-smoke">
                          {project.images.length} asset{project.images.length > 1 ? 's' : ''}
                        </span>
                      </div>
                      <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4 group-hover:text-brand-lime transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-brand-smoke text-base md:text-lg leading-relaxed">
                        {project.intro}
                      </p>
                    </div>

                    <motion.button
                      whileHover={{ x: 10 }}
                      className="flex items-center gap-3 text-white font-bold text-sm uppercase tracking-widest"
                    >
                      View Contact Sheet <ExternalLink size={16} className="text-brand-lime" />
                    </motion.button>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-start">
                    <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-4 md:p-5">
                      <div className="mb-3 flex items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-smoke">
                        <span>Primary Preview</span>
                        <span>{heroImage.name.replace(/-/g, ' ')}</span>
                      </div>
                      <div className="rounded-[1rem] bg-black/40 border border-white/5 p-4">
                        <img
                          src={heroImage.src}
                          alt={`${project.title} preview`}
                          className="w-full h-auto max-h-80 object-contain mx-auto"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 auto-rows-min">
                      {sheetImages.map((image, index) => (
                        <figure
                          key={image.name}
                          className="rounded-[1.35rem] border border-white/10 bg-black/20 p-4 flex flex-col gap-3"
                        >
                          <div className="flex items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-smoke">
                            <span>{String(index + 1).padStart(2, '0')}</span>
                            <span className="truncate">{image.name.replace(/-/g, ' ')}</span>
                          </div>
                          <div className="min-h-36 rounded-[1rem] bg-black/35 border border-white/5 p-3 flex items-center justify-center">
                            <img
                              src={image.src}
                              alt={`${project.title} image ${index + 1}`}
                              className="w-full h-auto max-h-40 object-contain mx-auto"
                              loading="lazy"
                            />
                          </div>
                        </figure>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
