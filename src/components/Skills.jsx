import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { skills } from '../data'

function SkillImage({ name, src }) {
  const [failed, setFailed] = useState(!src)
  if (failed) return <span className="skill-fallback">{name.slice(0, 2)}</span>
  return <img src={src} alt={name} draggable="false" onError={() => setFailed(true)} />
}

export default function Skills() {
  const pin = useRef(null)
  const [active, setActive] = useState(0)
  const total = skills.length

  useLayoutEffect(() => {
    if (total === 0) return undefined

    const ctx = gsap.context(() => {
      const track = pin.current.querySelector('.skills-track')
      const inners = Array.from(pin.current.querySelectorAll('.skill-inner'))
      const steps = Math.max(total - 1, 1)

      // Fade and scale each slide by how far it is from the centre of the window
      const render = (progress) => {
        const pos = progress * (total - 1)
        inners.forEach((el, i) => {
          const o = Math.max(0, 1 - Math.abs(i - pos) * 1.25)
          gsap.set(el, { opacity: o, scale: 0.94 + 0.06 * o })
        })
        const idx = Math.round(pos)
        setActive((prev) => (prev === idx ? prev : idx))
      }
      render(0)

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        onUpdate: () => render(tl.progress()),
        scrollTrigger: {
          trigger: pin.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * steps * 0.85}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap:
            total > 1
              ? { snapTo: 1 / (total - 1), duration: { min: 0.2, max: 0.6 }, delay: 0.08, ease: 'power1.inOut' }
              : false,
        },
      })

      // The whole column of slides moves up, one viewport per skill
      tl.to(track, { yPercent: (-100 * (total - 1)) / total })
    }, pin.current)

    return () => ctx.revert()
  }, [total])

  return (
    <section id="skills" className="skills">
      <div className="skills-pin" ref={pin}>
        <div className="pin-ui">
          <div className="pin-row">
            <h2 className="pin-title">Skills</h2>
            <span className="pin-hint">Keep scrolling</span>
          </div>
          <div className="pin-row">
            <span className="pin-count">
              {active + 1} / {total}
            </span>
          </div>
        </div>

        <div className="skill-rail" aria-hidden="true">
          {skills.map((s, i) => (
            <span key={s.name + i} className={`rail-tick ${i === active ? 'on' : ''}`} />
          ))}
        </div>

        <div className="skills-track" style={{ height: `${total * 100}vh` }}>
          {skills.map((s, i) => (
            <div className="skill-slide" key={s.name + i}>
              <div className="skill-inner">
                <div className="skill-text">
                  <span className="skill-cat">{s.category}</span>
                  <h3 className="skill-name">{s.name}</h3>
                  <p className="skill-desc">{s.description}</p>
                </div>
                <div className="skill-visual">
                  <div className="skill-tile">
                    <SkillImage name={s.name} src={s.img} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
