import { useRef, useState, useEffect, useCallback, useMemo, memo } from 'react'
import { motion, useReducedMotion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

// cards that have already played their reveal — persists for the session so the
// entrance never replays on scroll-back or re-render
const revealedCards = new Set()

const EASE = [0.22, 1, 0.36, 1]
const HOVER_DELAY = 150 // ms — deliberate hover before a flip
const FLIP_SPRING = { type: 'spring', stiffness: 140, damping: 24, mass: 1 }

const PROJECTS = [
  {
    id: 'hirello',
    title: 'Hirello.ai',
    desc: 'Designing an AI-powered job search platform — 0 to MVP',
    tags: ['AI Product Design', 'UX Strategy', 'B2C SaaS'],
    img: '/assets/images/projectcards/hirello-panel.png',
    to: '/hirello',
    back: {
      blocks: [
        {
          label: 'Problem',
          body: 'Build an AI job-hunt platform from a 60+ page founder vision document. Not just a tracker, but a system that actively guides users with personalized plans based on their profile and needs.',
        },
        {
          label: 'Solution',
          body: "Designed an action-first experience where the platform analyzes each user's profile and surfaces one prioritized next step at a time, reducing decision fatigue in an inherently overwhelming process.",
        },
      ],
      stats: [
        '60+ page vision doc → structured platform',
        '20+ screens shipped',
        '10 users interviewed',
        '1 product pivot',
      ],
    },
    theme: {
      bg: '#c4d1fb',
      fg: '#37489c',
      sub: '#4d5da8',
      tagText: '#41509e',
      tagBorder: 'rgba(58, 78, 163, 0.32)',
    },
  },
  {
    id: 'newdriver',
    title: 'New Driver Mode',
    desc: 'An AI copilot that knows when to guide and when to step back',
    tags: ['Automotive UX', 'HMI', 'Systems Design'],
    img: '/assets/images/projectcards/autoux-panel.png',
    to: '/newdrivermode',
    back: {
      blocks: [
        {
          label: 'Problem',
          body: 'New drivers struggle with anxiety, not lack of knowledge, yet every automotive AI system is built for experienced drivers.',
        },
        {
          label: 'Solution',
          body: 'A multimodal guidance system with a HUD for highway merging (including deliberate silence) and step-by-step parking with haptic feedback. It speaks only when needed and steps back as confidence builds.',
        },
      ],
    },
    theme: {
      bg: '#26262b',
      fg: '#f4f2ec',
      sub: '#b6b3aa',
      tagText: '#e6e4dc',
      tagBorder: 'rgba(244, 242, 236, 0.30)',
    },
  },
  {
    id: 'wander',
    title: 'Wander VR',
    desc: 'Emotional connection as a key UX driver in VR navigation',
    tags: ['UX Research', 'Mixed Reality', 'Meta Quest 3'],
    img: '/assets/images/projectcards/arvr-panel.png',
    to: '/vrusabilitystudy',
    back: {
      blocks: [
        {
          label: 'Method',
          body: 'Evaluated Wander VR on Meta Quest 3 with 3 users, combining SUS, SSQ, and moderated interviews to assess both task completion and emotional/physical experience.',
        },
        {
          label: 'Insight',
          body: 'Despite a below-average SUS score of 63.75 (3/3 users disoriented), emotional connection, like one user recognizing her hometown on the map, drove deeper engagement than the interface itself supported.',
        },
      ],
    },
    theme: {
      bg: '#ec6691',
      fg: '#ffffff',
      sub: 'rgba(255, 255, 255, 0.9)',
      tagText: '#ffffff',
      tagBorder: 'rgba(255, 255, 255, 0.5)',
      frameBg: 'transparent',
    },
  },
  {
    id: 'umbc',
    title: 'UMBC Study Abroad',
    desc: 'Redesigning a university study abroad system within platform constraints',
    tags: ['Service Design', 'Higher Education', 'Enterprise UX'],
    img: '/assets/images/projectcards/umbc-panel.png',
    to: '/umbcstudyabroad',
    back: {
      blocks: [
        {
          label: 'Problem',
          body: 'A legacy study abroad system nobody had ever designed, only inherited: confusing application flows for students, fragmented manual workflows for staff, all locked inside a rigid third-party platform.',
        },
        {
          label: 'Solution',
          body: "Without redesigning the interface, restructured application flows into one logical path, rebuilt the staff admin console, and configured automated reporting that eliminated recurring manual work, plus a new standalone study abroad site built on the platform's own tools.",
        },
      ],
      stats: [
        '200+ students surveyed',
        '15+ hrs saved / week',
        '30% faster processing',
        'New site at goabroad.umbc.edu',
      ],
    },
    theme: {
      bg: '#ccd69d',
      fg: '#353f24',
      sub: '#5f6943',
      tagText: '#46502e',
      tagBorder: 'rgba(53, 63, 36, 0.30)',
      frameBg: 'transparent',
    },
  },
]

/* -------------------------------------------------------------------------
   Hover/flip gating: active only when the section is being explored —
   70%+ visible (robust for tall sections), not mid-scroll (re-armed 200ms
   after scrolling stops), and on a hover/fine-pointer device.
------------------------------------------------------------------------- */
function useInteractionEnabled(ref) {
  const [inView, setInView] = useState(false)
  const [scrolling, setScrolling] = useState(false)
  const [canHover, setCanHover] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setCanHover(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        const denom = Math.min(e.boundingClientRect.height, window.innerHeight) || 1
        setInView(e.intersectionRect.height / denom >= 0.7)
      },
      { threshold: [0, 0.25, 0.5, 0.7, 0.9, 1] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref])

  useEffect(() => {
    let t
    const onScroll = () => {
      setScrolling(true)
      clearTimeout(t)
      t = setTimeout(() => setScrolling(false), 200)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(t)
    }
  }, [])

  return inView && !scrolling && canHover
}

/* -------------------------------------------------------------------------
   Motion queue: at most one card flipped and at most one animation at a time.
   Switching from A to B settles A fully, then flips B. `setDesired(id|null)`
   records intent; transitions run one at a time behind a lock.
------------------------------------------------------------------------- */
function useFlipQueue(reduce) {
  const FLIP_MS = reduce ? 340 : 660
  const [flippedId, setFlippedId] = useState(null)
  const flippedRef = useRef(null)
  const desiredRef = useRef(null)
  const busyRef = useRef(false)
  const lockRef = useRef()

  const step = useCallback(() => {
    if (busyRef.current) return
    const desired = desiredRef.current
    const cur = flippedRef.current
    if (cur === desired) return
    busyRef.current = true
    // if switching between two cards, first fully settle the current one
    const next = cur !== null && desired !== null ? null : desired
    flippedRef.current = next
    setFlippedId(next)
    clearTimeout(lockRef.current)
    lockRef.current = setTimeout(() => {
      busyRef.current = false
      step()
    }, FLIP_MS + 20)
  }, [FLIP_MS])

  const setDesired = useCallback(
    (id) => {
      desiredRef.current = id
      step()
    },
    [step],
  )

  useEffect(() => () => clearTimeout(lockRef.current), [])
  return { flippedId, setDesired }
}

/* ------------------------------------------------------------------------- */

function FrontFace({ project, style }) {
  const { fg, sub, tagText, tagBorder, frameBg } = project.theme
  return (
    <div
      className="p-6 md:p-8"
      style={style}
    >
      <div
        className="overflow-hidden"
        style={{ borderRadius: '15px', background: frameBg ?? 'rgba(255,255,255,0.32)' }}
      >
        <img
          src={project.img}
          alt={`${project.title} preview`}
          loading="lazy"
          className="block h-auto w-full"
        />
      </div>
      <h3
        className="mt-7 text-[clamp(19px,1.9vw,23px)] font-semibold tracking-[-0.01em]"
        style={{ color: fg }}
      >
        {project.title}
      </h3>
      <p
        className="mt-2.5 max-w-[40ch] text-[clamp(19px,1.9vw,23px)] leading-snug"
        style={{ color: sub }}
      >
        {project.desc}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border px-3 py-1 text-[12.5px] font-medium"
            style={{ color: tagText, borderColor: tagBorder }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

function BackFace({ project, style }) {
  const { fg, sub, tagText, tagBorder } = project.theme
  const { blocks, stats } = project.back
  return (
    <div className="flex h-full flex-col overflow-hidden p-6 md:p-8" style={style}>
      <h3
        className="shrink-0 text-[clamp(20px,2vw,24px)] font-semibold tracking-[-0.015em]"
        style={{ color: fg }}
      >
        {project.title}
      </h3>

      <div className="mt-4 min-h-0 flex-1 space-y-3.5 overflow-hidden">
        {blocks.map((b) => (
          <div key={b.label}>
            <p
              className="text-[11.5px] font-semibold tracking-[0.14em] uppercase"
              style={{ color: tagText }}
            >
              {b.label}
            </p>
            <p
              className="mt-1.5 text-[clamp(14px,1.4vw,15.5px)] leading-[1.4]"
              style={{ color: sub }}
            >
              {b.body}
            </p>
          </div>
        ))}

        {stats && (
          <div className="pt-0.5">
            {stats.map((s) => (
              <div
                key={s}
                className="border-t py-2 text-[clamp(14px,1.4vw,15.5px)] font-medium"
                style={{ borderColor: tagBorder, color: fg }}
              >
                {s}
              </div>
            ))}
          </div>
        )}
      </div>

      <span
        className="mt-4 inline-flex shrink-0 items-center gap-2 text-[clamp(14.5px,1.4vw,16px)] font-semibold"
        style={{ color: fg }}
      >
        View case study
        <svg
          viewBox="0 0 24 24"
          className="h-[18px] w-[18px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </div>
  )
}

const ProjectCard = memo(function ProjectCard({ project, index, flipped, enabled, reduce, onDesire }) {
  const hoverTimer = useRef()
  // latched reveal — plays a single time when the card first enters view, then
  // stays revealed forever (never replays on later scroll-pasts or re-renders)
  const cardRef = useRef(null)
  const inView = useInView(cardRef, { margin: '-60px' })
  // captured at mount: was this card already revealed earlier this session?
  const wasRevealed = useRef(revealedCards.has(project.id)).current
  const [revealed, setRevealed] = useState(wasRevealed)
  useEffect(() => {
    if (inView && !revealed) {
      revealedCards.add(project.id)
      setRevealed(true)
    }
  }, [inView, revealed, project.id])

  const faceStyle = {
    background: project.theme.bg,
    borderRadius: 'var(--r-card)',
    backfaceVisibility: reduce ? 'visible' : 'hidden',
    WebkitBackfaceVisibility: reduce ? 'visible' : 'hidden',
  }

  const onEnter = () => {
    if (!enabled) return
    clearTimeout(hoverTimer.current)
    hoverTimer.current = setTimeout(() => onDesire(project.id), HOVER_DELAY)
  }
  const onLeave = () => {
    clearTimeout(hoverTimer.current)
    onDesire(null)
  }
  useEffect(() => () => clearTimeout(hoverTimer.current), [])

  return (
    <Link
      ref={cardRef}
      to={project.to}
      aria-label={`${project.title} — ${project.desc}. Open case study.`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={() => onDesire(project.id)}
      onBlur={() => onDesire(null)}
      style={{
        perspective: '1300px',
        borderRadius: 'var(--r-card)',
        transitionDelay: wasRevealed ? '0s' : `${index * 0.1}s`,
      }}
      className={`proj-card block outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a66c2] ${
        revealed ? 'is-in' : ''
      }`}
    >
      <motion.div
        className="relative"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
        animate={
          reduce ? { y: 0 } : { rotateY: flipped ? 180 : 0, y: flipped ? -6 : 0 }
        }
        transition={reduce ? { duration: 0 } : FLIP_SPRING}
      >
        {/* FRONT — defines the card height */}
        <FrontFace
          project={project}
          style={{
            ...faceStyle,
            ...(reduce
              ? { opacity: flipped ? 0 : 1, transition: 'opacity 0.3s ease' }
              : {}),
          }}
        />
        {/* BACK — overlays the front, same box. backface-hidden lives here,
            on the element that carries the rotateY(180), so it hides correctly
            while the card shows its front. */}
        <div
          className="absolute inset-0"
          style={{
            transform: reduce ? 'none' : 'rotateY(180deg)',
            backfaceVisibility: reduce ? 'visible' : 'hidden',
            WebkitBackfaceVisibility: reduce ? 'visible' : 'hidden',
            ...(reduce
              ? { opacity: flipped ? 1 : 0, transition: 'opacity 0.3s ease' }
              : {}),
          }}
        >
          <BackFace project={project} style={{ ...faceStyle, height: '100%' }} />
        </div>
      </motion.div>
    </Link>
  )
})

export default function Projects() {
  const reduce = useReducedMotion()
  const sectionRef = useRef(null)
  const enabled = useInteractionEnabled(sectionRef)
  const { flippedId, setDesired } = useFlipQueue(reduce)

  // two masonry columns — left: Hirello, Wander · right: New Driver Mode, UMBC.
  // memoized so hovering one card never re-creates props for the others.
  const { left, right } = useMemo(() => {
    const items = PROJECTS.map((p, i) => ({ ...p, index: i }))
    return {
      left: items.filter((_, i) => i % 2 === 0),
      right: items.filter((_, i) => i % 2 === 1),
    }
  }, [])

  const renderCard = (p) => (
    <ProjectCard
      key={p.id}
      project={p}
      index={p.index}
      flipped={flippedId === p.id}
      enabled={enabled}
      reduce={reduce}
      onDesire={setDesired}
    />
  )

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="mt-10 scroll-mt-10 md:mt-14"
    >
      <div className="flex flex-col gap-[18px] md:flex-row md:items-start md:gap-[22px]">
        <div className="flex flex-1 flex-col gap-[18px] md:gap-[22px]">
          {left.map(renderCard)}
        </div>
        <div className="flex flex-1 flex-col gap-[18px] md:gap-[22px]">
          {right.map(renderCard)}
        </div>
      </div>
    </section>
  )
}
