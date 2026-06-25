import { motion } from 'framer-motion'

/* Circular "SCROLL DOWN" text slowly orbiting a still arrow. */
export default function ScrollBadge() {
  return (
    <div className="relative flex h-[124px] w-[124px] items-center justify-center lg:h-[156px] lg:w-[156px]">
      <motion.svg
        viewBox="0 0 100 100"
        className="h-[124px] w-[124px] lg:h-[156px] lg:w-[156px]"
        animate={{ rotate: 360 }}
        transition={{ duration: 24, ease: 'linear', repeat: Infinity }}
        aria-hidden="true"
      >
        <defs>
          <path
            id="scroll-circle"
            d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
          />
        </defs>
        <text
          fill="var(--card-lavender-ink)"
          style={{
            fontSize: '10.5px',
            fontWeight: 700,
            letterSpacing: '1.6px',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {/* textLength pins both repetitions to exactly one lap of the circle */}
          <textPath
            href="#scroll-circle"
            textLength="224"
            lengthAdjust="spacingAndGlyphs"
          >
            SCROLL DOWN ✳ SCROLL DOWN ✳{' '}
          </textPath>
        </text>
      </motion.svg>
      <svg
        viewBox="0 0 24 24"
        className="absolute h-6 w-6"
        fill="none"
        stroke="var(--card-lavender-ink)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 4v16m0 0l-6-6m6 6l6-6" />
      </svg>
    </div>
  )
}
