import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { createFooterFlowers } from '../../lib/footerFlowers.js'

// Decorative band of flowers under the footer; blooms when scrolled into view.
export default function FooterGarden() {
  const hostRef = useRef(null)
  const svgRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(
    () => createFooterFlowers(svgRef.current, hostRef.current, { reduceMotion }),
    [reduceMotion],
  )

  return (
    <div ref={hostRef} className="footer-garden" aria-hidden="true">
      <svg
        ref={svgRef}
        className="footer-garden__svg"
        viewBox="0 0 1440 600"
        preserveAspectRatio="xMidYMax slice"
      />
    </div>
  )
}
