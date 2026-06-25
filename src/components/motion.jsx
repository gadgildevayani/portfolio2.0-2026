import { motion } from 'framer-motion'

/* Scroll-reveal motion language for the case study pages.
   Mirrors the homepage: signature ease, a gentle fade + 24px rise,
   orchestrated with staggerChildren so each block reveals in sequence
   as it scrolls into view. Reduced-motion is honoured centrally via the
   <MotionConfig reducedMotion="user"> that wraps every CasePage. */

export const EASE = [0.22, 1, 0.36, 1]

// Leaf reveal — one element fading + rising into place.
export const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

// Orchestrator — reveals its children in a gentle cascade.
export const group = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
}

const VIEWPORT = { once: true, margin: '-80px' }

/* A section (or any element) that orchestrates a staggered reveal of its
   children the first time it scrolls into view. Children carrying the `item`
   variant (or an <Up>) inherit the trigger automatically. */
export function Stagger({ as = 'section', className, style, children, ...rest }) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      style={style}
      variants={group}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      {...rest}
    >
      {children}
    </Comp>
  )
}

/* A single reveal item. Inside a <Stagger> it cascades with its siblings;
   on its own it stays inert (renders normally) rather than hidden. */
export function Up({ as = 'div', className, style, children, ...rest }) {
  const Comp = motion[as]
  return (
    <Comp className={className} style={style} variants={item} {...rest}>
      {children}
    </Comp>
  )
}
