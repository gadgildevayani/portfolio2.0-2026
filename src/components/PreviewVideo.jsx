import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

// Looping, muted preview (browsers pause muted autoplay video while it's off
// screen). Reduced-motion users get the first frame.
export default function PreviewVideo({ src, className = 'project-card__preview' }) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const video = ref.current
    if (reduceMotion) video.pause()
    else video.play().catch(() => {})
  }, [reduceMotion])

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      autoPlay={!reduceMotion}
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  )
}
