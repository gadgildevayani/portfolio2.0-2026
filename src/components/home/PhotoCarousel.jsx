import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

// Timings measured from Tabfolio's about-page carousel.
const INTERVAL = 6000
const SETTLE = { type: 'spring', duration: 0.8, bounce: 0 }
const DOT = { type: 'spring', duration: 0.3, bounce: 0.25 }

/*
 * Auto-advancing photo carousel: the new photo swaps in at 80% opacity and
 * 98% scale and settles, the caption rises in beneath it, and the active dot
 * stretches into a pill. Pauses while hovered or focused; no autoplay for
 * reduced-motion users (the dots still work).
 */
export default function PhotoCarousel({ photos, label = 'Photos' }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()
  const photo = photos[index]

  // Warm the cache so each swap shows the next photo immediately.
  useEffect(() => {
    photos.forEach(({ src }) => {
      const img = new Image()
      img.src = src
    })
  }, [photos])

  // Re-arms on every change, so picking a dot gives that photo a full turn.
  useEffect(() => {
    if (paused || reduceMotion) return
    const id = setTimeout(() => setIndex((i) => (i + 1) % photos.length), INTERVAL)
    return () => clearTimeout(id)
  }, [index, paused, reduceMotion, photos.length])

  return (
    <figure
      className="carousel"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false)
      }}
    >
      <div className="carousel__frame">
        {/* Own presence scope: the tab panel's initial={false} would otherwise
            stop every new photo from animating in. Old photos leave instantly. */}
        <AnimatePresence initial={false}>
          <motion.img
            key={photo.src}
            className="carousel__img"
            src={photo.src}
            alt={photo.alt}
            style={photo.position ? { objectPosition: photo.position } : undefined}
            initial={{ opacity: 0.8, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 0 } }}
            transition={SETTLE}
          />
        </AnimatePresence>

        <div className="carousel__dots" role="group" aria-label="Choose a photo">
          {photos.map((p, i) => {
            const active = i === index
            return (
              <button
                key={p.src}
                type="button"
                className="carousel__dot-btn"
                aria-label={`Photo ${i + 1} of ${photos.length}: ${p.caption}`}
                aria-current={active || undefined}
                onClick={() => setIndex(i)}
              >
                <motion.span
                  className={`carousel__dot${active ? ' is-active' : ''}`}
                  initial={false}
                  animate={{ width: active ? 21 : 10, height: active ? 13 : 10 }}
                  transition={DOT}
                />
              </button>
            )
          })}
        </div>
      </div>

      <figcaption className="carousel__caption" aria-live={paused ? 'polite' : 'off'}>
        <AnimatePresence initial={false}>
          <motion.span
            key={photo.caption}
            className="carousel__caption-text"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0 } }}
            transition={SETTLE}
          >
            {photo.caption}
          </motion.span>
        </AnimatePresence>
      </figcaption>
    </figure>
  )
}
