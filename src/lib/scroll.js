import { gsap } from './gsap'

// Smooth-scroll to a section by id ("skills", "projects", ...) or to the top.
export function scrollToSection(id) {
  gsap.to(window, {
    duration: 1.4,
    ease: 'power3.inOut',
    scrollTo: { y: id === 'top' ? 0 : `#${id}`, autoKill: true },
  })
}
