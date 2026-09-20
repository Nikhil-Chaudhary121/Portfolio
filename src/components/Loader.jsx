import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { personal } from '../data'

const ease = [0.76, 0, 0.24, 1]
const DURATION = 2600

export default function Loader({ onComplete }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let raf
    let timer
    let cancelled = false
    const start = performance.now()

    const tick = (now) => {
      const t = Math.min((now - start) / DURATION, 1)
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
        return
      }
      const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve()
      fontsReady.then(() => {
        if (!cancelled) timer = setTimeout(onComplete, 450)
      })
    }

    raf = requestAnimationFrame(tick)
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div
      className="loader"
      initial={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: 1, ease, delay: 0.1 } }}
    >
      <motion.div className="loader-inner" exit={{ opacity: 0, transition: { duration: 0.35 } }}>
        <div className="loader-top">
          <span>Portfolio</span>
          <span>{new Date().getFullYear()}</span>
        </div>

        <div className="loader-center">
          <h1 className="loader-word" aria-label={personal.name}>
            {personal.name.split('').map((ch, i) => (
              <span className="loader-letter" key={i} aria-hidden="true">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.9, ease, delay: 0.15 + i * 0.07 }}
                >
                  {ch === ' ' ? '\u00A0' : ch}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            className="loader-role"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            {personal.role}
          </motion.p>
        </div>

        <div className="loader-bottom">
          <span>Loading</span>
          <span className="loader-count">{String(count).padStart(3, '0')}</span>
        </div>
      </motion.div>
      <div className="loader-bar" style={{ transform: `scaleX(${count / 100})` }} />
    </motion.div>
  )
}
