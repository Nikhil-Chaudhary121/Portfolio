import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from 'framer-motion'
import { ScrollTrigger } from './lib/gsap'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [loading, setLoading] = useState(true)
  const finishLoading = useCallback(() => setLoading(false), [])

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  // Always start at the top
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  // Lock scrolling while the loader is visible, then recalculate triggers
  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    if (!loading) {
      const id = requestAnimationFrame(() => ScrollTrigger.refresh())
      return () => cancelAnimationFrame(id)
    }
  }, [loading])

  // Recalculate once fonts and images have settled
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    if (document.fonts) document.fonts.ready.then(refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {loading && <Loader key="loader" onComplete={finishLoading} />}
      </AnimatePresence>

      <motion.div className="progress" style={{ scaleX }} />
      <Navbar ready={!loading} />

      <main>
        <Hero ready={!loading} />
        <Skills />
        <Projects />
        <About />
        <Contact />
      </main>

      <Footer />
    </MotionConfig>
  )
}
