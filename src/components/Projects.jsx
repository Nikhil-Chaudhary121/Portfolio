import { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '../lib/gsap'
import { projects } from '../data'

export default function Projects() {
  const pin = useRef(null)
  const [active, setActive] = useState(0)
  const total = projects.length

  useLayoutEffect(() => {
    if (total === 0) return undefined

    const ctx = gsap.context(() => {
      const cards = Array.from(pin.current.querySelectorAll('.project-card'))
      const steps = total - 1

      gsap.set(cards, { transformOrigin: '50% 0%' })
      gsap.set(cards.slice(1), { yPercent: 105 }) // parked below the screen
      if (steps === 0) return

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        onUpdate: () => {
          const idx = Math.round(tl.progress() * steps)
          setActive((prev) => (prev === idx ? prev : idx))
        },
        scrollTrigger: {
          trigger: pin.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * steps}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: { snapTo: 1 / steps, duration: { min: 0.2, max: 0.6 }, delay: 0.08, ease: 'power1.inOut' },
        },
      })

      // Each card rises from the bottom over the previous one, which steps back
      cards.forEach((card, i) => {
        if (i === 0) return
        tl.to(card, { yPercent: 0, duration: 1, ease: 'power2.inOut' }, i - 1)
        tl.to(cards[i - 1], { scale: 0.92, opacity: 0.35, duration: 1, ease: 'power1.inOut' }, i - 1)
      })
    }, pin.current)

    return () => ctx.revert()
  }, [total])

  return (
    <section id="projects" className="projects">
      <div className="projects-pin" ref={pin}>
        <div className="pin-ui">
          <div className="pin-row">
            <h2 className="pin-title">Selected work</h2>
            <span className="pin-count">
              {active + 1} / {total}
            </span>
          </div>
        </div>

        <div className="projects-stage">
          {projects.map((p, i) => (
            <article className="project-card" key={p.title + i} style={{ zIndex: i + 1 }}>
              <div className="project-info">
                <span className="project-year">{p.year}</span>

                <div>
                  <h3 className="project-title">{p.title}</h3>
                  <p className="project-desc">{p.description}</p>
                </div>

                <div className="project-foot">
                  <ul className="tags">
                    {p.tech.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <div className="project-links">
                    {p.live && (
                      <motion.a
                        href={p.live}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-solid"
                        whileHover={{ y: -2 }}
                      >
                        View live
                      </motion.a>
                    )}
                    {p.github && (
                      <motion.a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        className="btn"
                        whileHover={{ y: -2 }}
                      >
                        Source code
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>

              <div className="project-media">
                {p.image ? (
                  <img src={p.image} alt={`${p.title} screenshot`} draggable="false" />
                ) : (
                  <div className="project-placeholder" aria-hidden="true">
                    <span>{p.title}</span>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
