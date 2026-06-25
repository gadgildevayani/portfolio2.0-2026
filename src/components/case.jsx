import { useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import '../casestudy.css'

const LINKEDIN_URL = 'https://www.linkedin.com/in/devayanigadgil/'
const RESUME_URL =
  'https://drive.google.com/file/d/15c8sAwP7FUvn9Kxu87iALXVjyg96ToDo/view?usp=sharing'

/* Navigation — back button far left, page links far right (no About) */
export function CaseNav() {
  const navigate = useNavigate()
  const goBack = () => {
    if (window.history.length > 2) navigate(-1)
    else navigate('/')
  }
  const link =
    'px-3 py-1.5 text-[14px] font-normal text-[#6b7280]! transition-colors duration-200 hover:text-[#1d1d1f]!'

  return (
    <header className="sticky top-0 z-50 border-b border-[#1d1d1f]/10 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1080px] items-center justify-between px-6 py-3">
        <button
          type="button"
          onClick={goBack}
          className="group inline-flex items-center gap-2 text-[14px] font-normal text-[#6b7280] transition-colors duration-200 hover:text-[#1d1d1f]"
          aria-label="Go back"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M19 12H5M11 18l-6-6 6-6" />
          </svg>
          Back
        </button>
        <nav className="flex items-center gap-0.5 sm:gap-1">
          <Link to="/" className={link}>
            Home
          </Link>
          <Link to="/#projects" className={link}>
            Projects
          </Link>
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className={link}>
            Resume
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={link}>
            LinkedIn
          </a>
        </nav>
      </div>
    </header>
  )
}

/* Page shell — scroll reset + white background + .cs scope */
export function CasePage({ children }) {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return (
    <MotionConfig reducedMotion="user">
      <div className="cs min-h-screen bg-white">
        <CaseNav />
        {children}
      </div>
    </MotionConfig>
  )
}

/* Dark "Next Case Study" footer — ported from the originals */
export function NextFooter({ to, title }) {
  return (
    <footer className="border-t border-[#1d1d1f]/10 bg-white py-16 md:py-20">
      <div className="mx-auto flex max-w-[1080px] flex-col items-start justify-between gap-12 px-6 md:flex-row md:items-center">
        <div className="space-y-4">
          <span className="text-[12px] font-medium tracking-[0.08em] text-[#888]">
            Next Case Study
          </span>
          <h2 className="serif max-w-xl text-xl leading-snug font-medium! text-[#33333f] md:text-2xl">
            {title}
          </h2>
        </div>
        <Link
          to={to}
          className="group flex items-center gap-3 rounded-full bg-[#1d1d1f] px-8 py-4 text-sm font-medium text-white! transition-transform hover:scale-105"
        >
          View Project{' '}
          <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </footer>
  )
}
