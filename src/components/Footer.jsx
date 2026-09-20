import { personal } from '../data'
import { scrollToSection } from '../lib/scroll'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-row">
        <p className="footer-status">{personal.status}</p>

        <ul className="footer-links">
          {personal.socials.map((s) => (
            <li key={s.label}>
              <a href={s.url} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            </li>
          ))}
          {personal.resume && (
            <li>
              <a href={personal.resume} target="_blank" rel="noreferrer">
                Resume
              </a>
            </li>
          )}
        </ul>

        <button className="footer-top" onClick={() => scrollToSection('top')}>
          Back to top
        </button>
      </div>

      <p className="footer-name" aria-hidden="true">
        {personal.name}
      </p>

      <div className="footer-base">
        <span>
          &copy; {new Date().getFullYear()} {personal.name}
        </span>
        <span>Built with React, GSAP and Framer Motion</span>
      </div>
    </footer>
  )
}
