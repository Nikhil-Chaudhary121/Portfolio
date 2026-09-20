import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import Mask from './Mask'
import { about, personal } from '../data'

export default function About() {
  const frame = useRef(null)
  const media = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // The portrait is uncovered from the bottom, then drifts slightly as you scroll
      gsap.fromTo(
        frame.current,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.4,
          ease: 'power4.inOut',
          scrollTrigger: { trigger: frame.current, start: 'top 80%', once: true },
        }
      )
      gsap.fromTo(
        media.current,
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: 'none',
          scrollTrigger: { trigger: frame.current, start: 'top bottom', end: 'bottom top', scrub: true },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="about">
      <div className="about-grid">
        <div className="about-frame" ref={frame}>
          {about.image ? (
            <img ref={media} src={about.image} alt={`Portrait of ${personal.name}`} draggable="false" />
          ) : (
            <div ref={media} className="about-placeholder" aria-hidden="true">
              <span>{personal.initials}</span>
            </div>
          )}
        </div>

        <div className="about-body">
          <h2 className="about-title">
            <Mask inView>{about.heading}</Mask>
          </h2>

          <div className="about-text">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <dl className="stats">
            {about.stats.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>

          {about.timeline && about.timeline.length > 0 && (
            <ol className="timeline">
              {about.timeline.map((t) => (
                <li key={t.year + t.title}>
                  <span className="tl-year">{t.year}</span>
                  <span className="tl-title">{t.title}</span>
                  <span className="tl-place">{t.place}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  )
}
