import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../sections/Hero'
import ShowcaseWalls from '../sections/ShowcaseWalls'
import Projects from '../sections/Projects'
import CaseStudies from '../sections/CaseStudies'
import Testimonials from '../sections/Testimonials'
import About from '../sections/About'
import CreativeToolsBar from '../sections/CreativeToolsBar'
import Contact from '../sections/Contact'
import Footer from '../components/Footer'

export default function HomePage() {
  const location = useLocation()

  useEffect(() => {
    const scrollY = location.state?.scrollY
    if (typeof scrollY !== 'number') return

    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: scrollY, behavior: 'auto' })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [location.state])

  return (
    <>
      <main>
        <Hero />
        <ShowcaseWalls />
        <Projects />
        <CaseStudies />
        <Testimonials />
        <About />
        <CreativeToolsBar />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
