import { useRef } from 'react'
import { motion, useSpring } from 'framer-motion'

/**
 * Hanging ID badge.
 *
 * Entrance (plays once): the lanyard falls from above, the strap goes taut
 * with one subtle vertical settle, and the momentum carries the badge into a
 * full pendulum swing — left, right, left — its amplitude decaying smoothly
 * to rest. Apple-ish: gravity on the way down, an even pendulum period, and a
 * gentle ease so nothing snaps.
 *
 * The entrance lives on the OUTER element; the cursor-follow tilt lives on the
 * INNER element (a spring), so the two never fight for the transform.
 */
export default function IDBadge() {
  const zoneRef = useRef(null)
  const rotate = useSpring(0, { stiffness: 70, damping: 11, mass: 1 })

  const onMouseMove = (e) => {
    const rect = zoneRef.current.getBoundingClientRect()
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
    rotate.set(Math.max(-9, Math.min(9, dx * 10)))
  }

  return (
    <div
      ref={zoneRef}
      className="flex h-full w-full flex-col items-center"
      onMouseMove={onMouseMove}
      onMouseLeave={() => rotate.set(0)}
    >
      {/* Entrance: a soft fall that decelerates into place, then a gentle,
          softly-damped pendulum settle — no bounce, nothing springy. */}
      <motion.div
        className="flex flex-col items-center"
        style={{ transformOrigin: 'top center' }}
        initial={{ y: -560, rotate: 0 }}
        animate={{
          y: [-560, 0],
          rotate: [0, -5, 3, -1.6, 0.7, 0],
        }}
        transition={{
          y: {
            delay: 0.35,
            duration: 1.15,
            ease: [0.16, 1, 0.3, 1],
          },
          rotate: {
            delay: 1.3,
            duration: 2.4,
            times: [0, 0.22, 0.45, 0.68, 0.86, 1],
            ease: 'easeInOut',
          },
        }}
      >
        {/* Cursor-follow tilt (spring), composes on top of the entrance */}
        <motion.div
          className="flex flex-col items-center"
          style={{ rotate, transformOrigin: 'top center' }}
        >
          {/* strap */}
          <div className="h-20 w-2.5 rounded-b-sm bg-[#3a3631]/85 md:h-24 lg:h-[160px] lg:w-3" />
          {/* clip */}
          <div className="-mt-px flex h-7 w-12 items-start justify-center rounded-[7px] bg-[#2c2925] pt-[7px] shadow-[0_2px_4px_rgba(27,26,23,0.25)] lg:h-8 lg:w-14 lg:pt-[8px]">
            <div className="h-[7px] w-7 rounded-full bg-(--card-yellow) lg:w-8" />
          </div>
          {/* badge — soft outer frame around an inner white card, like the mock */}
          <div className="mt-2 w-[238px] rounded-[20px] bg-[#f3f1ec] p-2 shadow-[0_18px_36px_rgba(94,70,10,0.22)] md:w-[256px] lg:mt-2.5 lg:w-[306px] lg:rounded-[26px] lg:p-2.5">
            <div className="rounded-[14px] bg-white px-5 pt-7 pb-5 lg:rounded-[18px] lg:px-6 lg:pt-9 lg:pb-6">
              <img
                src="/assets/images/devayani-circle.png"
                alt="Devayani Gadgil"
                className="mx-auto h-[104px] w-[104px] rounded-full object-cover lg:h-[136px] lg:w-[136px]"
              />
              <div className="mt-6 text-left lg:mt-9">
                <p className="text-[14.5px] leading-[1.45] font-medium text-(--ink) lg:text-[17px]">
                  Hi, I&rsquo;m Devayani{' '}
                  <span role="img" aria-label="wave">
                    👋
                  </span>
                </p>
                <p className="mt-1.5 text-[14.5px] leading-[1.45] font-medium text-(--ink) lg:mt-2 lg:text-[17px]">
                  Currently building AI copilots, dashboards, and scalable
                  product systems.
                </p>
                <p className="mt-3 text-[11px] text-(--muted) lg:mt-4 lg:text-[12.5px]">
                  Product Designer @ Hirello.ai
                </p>
                <div className="mt-6 border-t border-[#1b1a17]/10 pt-3.5 lg:mt-9 lg:pt-4">
                  <p className="text-[11px] text-(--muted) lg:text-[12.5px]">
                    Michigan, United States
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
