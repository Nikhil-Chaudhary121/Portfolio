import { useLayoutEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '../lib/gsap'
import Mask from './Mask'
import { personal } from '../data'
import { scrollToSection } from '../lib/scroll'

const fade = (ready, delay) => ({
  initial: { opacity: 0 },
  animate: { opacity: ready ? 1 : 0 },
  transition: { duration: 1, delay },
})

export default function Hero({ ready }) {
  const root = useRef(null)
  const lines = personal.name.split(' ')

  // Scroll: the name drifts up slower than the page and the rest fades out
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.hero-title', {
        yPercent: -22,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero-fade', {
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: '15% top', end: '85% top', scrub: true },
      })
    }, root.current)
    return () => ctx.revert()
  }, [])

  return (
    <section id="top" className="hero" ref={root}>
      <div className="hero-top hero-fade">
        <motion.span {...fade(ready, 0.9)}>{personal.role}</motion.span>
        <motion.span {...fade(ready, 1)}>{personal.location}</motion.span>
      </div>

      <div className="hero-title">
        <h1 className="hero-name">
          {lines.map((line, i) => (
            <Mask key={line + i} active={ready} delay={0.25 + i * 0.12} duration={1.3}>
              {line}
            </Mask>
          ))}
        </h1>
      </div>

      <div className="hero-bottom hero-fade">
        <motion.p className="hero-intro" {...fade(ready, 1.2)}>
          {personal.intro}
        </motion.p>

        <motion.div className="hero-cta" {...fade(ready, 1.35)}>
          <button className="btn btn-solid" onClick={() => scrollToSection('projects')}>
            View my work
          </button>
          <button className="btn" onClick={() => scrollToSection('contact')}>
            Get in touch
          </button>
        </motion.div>

        <motion.div className="scroll-cue" {...fade(ready, 1.6)} aria-hidden="true">
          <span>Scroll</span>
          <i />
        </motion.div>
      </div>
    </section>
  )
}
