import { motion } from 'framer-motion'
import afterEffectsIcon from '../assets/icons/Adobe After Effects.png'
import premiereProIcon from '../assets/icons/Adobe Premiere Pro.png'
import xdIcon from '../assets/icons/Adobe Xd.png'
import photoshopIcon from '../assets/icons/Adobe Photoshop.png'
import illustratorIcon from '../assets/icons/Adobe Illustrator.png'
import figmaIcon from '../assets/icons/Figma.png'
import canvaIcon from '../assets/icons/Canva.png'
import sketchIcon from '../assets/icons/Sketch.png'
import picsartIcon from '../assets/icons/Picsart.png'
import cutoutIcon from '../assets/icons/Edits app.png'
import capcutIcon from '../assets/icons/CapCut.png'

const styles = `
  @keyframes marquee-lr {
    0% {
      transform: translateX(-50%);
    }
    100% {
      transform: translateX(0);
    }
  }
  
  .marquee {
    overflow: hidden;
  }
  
  .marquee-track {
    display: flex;
    gap: 2rem;
    animation: marquee-lr 20s linear infinite;
    width: fit-content;
    will-change: transform;
  }
  
  @media (max-width: 640px) {
    .marquee-track {
      gap: 2rem;
    }
  }
`

const tools = [
  { name: 'After Effects', icon: afterEffectsIcon },
  { name: 'Premiere Pro', icon: premiereProIcon },
  { name: 'Adobe XD', icon: xdIcon },
  { name: 'Photoshop', icon: photoshopIcon },
  { name: 'Illustrator', icon: illustratorIcon },
  { name: 'Figma', icon: figmaIcon },
  { name: 'Canva', icon: canvaIcon },
  { name: 'Sketch', icon: sketchIcon },
  { name: 'PicsArt', icon: picsartIcon },
  { name: 'Edits', icon: cutoutIcon },
  { name: 'CapCut', icon: capcutIcon },
]

function ToolItem({ name, icon }) {
  return (
    <div className="flex w-[132px] shrink-0 flex-col items-center gap-3 sm:w-[148px]">
      <div className="flex h-[88px] w-[88px] items-center justify-center rounded-2xl border border-white/10 bg-transparent backdrop-blur-sm sm:h-[104px] sm:w-[104px]">
        <img
          src={icon}
          alt=""
          aria-hidden="true"
          className="h-14 w-14 object-contain sm:h-16 sm:w-16"
          draggable="false"
          decoding="async"
          loading="lazy"
        />
      </div>
      <span className="text-[0.78rem] font-semibold tracking-[0.24em] text-white/40 sm:text-sm">
        {name}
      </span>
    </div>
  )
}

export default function CreativeToolsBar() {
  const doubledTools = [...tools, ...tools]
  
  return (
    <section
      aria-label="Tools used by the company"
      className="relative overflow-hidden border-y border-white/5 bg-transparent py-8 sm:py-10"
      style={{ contain: 'layout paint' }}
    >
      <style>{styles}</style>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 sm:mb-10"
      >
        <p className="text-brand-lime text-[10px] sm:text-xs font-bold uppercase tracking-[0.28em] mb-4">Creative Arsenal</p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight mb-4 font-outfit">
          Tools we <span className="bg-gradient-to-r from-brand-lime to-brand-orange bg-clip-text text-transparent">use</span>
        </h2>
      </motion.div>
      
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent sm:w-24" />

      <div className="marquee px-6 sm:px-10">
        <div className="marquee-track">
          {doubledTools.map((tool, index) => (
            <ToolItem key={`${tool.name}-${index}`} name={tool.name} icon={tool.icon} />
          ))}
        </div>
      </div>
    </section>
  )
}
