import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { personal } from '../data'
import { scrollToSection } from '../lib/scroll'

const links = [
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ ready }) {
  const [open, setOpen] = useState(false)

  const go = (e, id) => {
    e.preventDefault()
    if (open) {
      setOpen(false)
      setTimeout(() => scrollToSection(id), 450)
    } else {
      scrollToSection(id)
    }
  }

  return (
    <>
      <motion.header
        className="nav"
        initial={{ opacity: 0, y: -24 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: -24 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <a href="#top" className="nav-logo" onClick={(e) => go(e, 'top')} aria-label="Back to top">
          {personal.initials}
        </a>

        <nav aria-label="Primary">
          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="nav-link" onClick={(e) => go(e, l.id)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className="nav-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul>
              {links.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.3 + i * 0.07, duration: 0.6 } }}
                >
                  <a href={`#${l.id}`} onClick={(e) => go(e, l.id)}>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
