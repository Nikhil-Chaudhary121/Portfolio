import { motion } from 'framer-motion'

// Reveals its content by sliding it up out of a clipped line.
// active  : play when true (used to wait for the loader)
// inView  : play when scrolled into view instead
export default function Mask({ children, delay = 0, duration = 1.1, active = true, inView = false, className = '' }) {
  const trigger = inView
    ? { whileInView: { y: '0%' }, viewport: { once: true, margin: '0px 0px -12% 0px' } }
    : { animate: { y: active ? '0%' : '110%' } }

  return (
    <span className={`mask ${className}`}>
      <motion.span
        className="mask-inner"
        initial={{ y: '110%' }}
        transition={{ duration, delay, ease: [0.76, 0, 0.24, 1] }}
        {...trigger}
      >
        {children}
      </motion.span>
    </span>
  )
}
