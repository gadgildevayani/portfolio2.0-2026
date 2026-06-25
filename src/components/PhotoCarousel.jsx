import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const PHOTOS = [
  'sunset.jpeg',
  'yosemite.jpeg',
  'kayaking.jpeg',
  'california.jpeg',
  'philadelphia.jpeg',
  'oceandrawing.jpeg',
  'nyc.jpeg',
  'seedlings.jpeg',
  'rockarch.jpeg',
  'ramen.jpeg',
  'watermelondrawing.jpeg',
].map((f) => `/assets/images/funstuff/${f}`)

/* Slow crossfade through personal photos — a window, not a slideshow. */
export default function PhotoCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % PHOTOS.length), 3400)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="absolute inset-0">
      <AnimatePresence initial={false}>
        <motion.img
          key={index}
          src={PHOTOS[index]}
          alt="Personal photo — life beyond work"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        />
      </AnimatePresence>
      <div className="absolute right-4 bottom-4 flex gap-1.5">
        {PHOTOS.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? 'w-4 bg-white/95' : 'w-1.5 bg-white/45'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
