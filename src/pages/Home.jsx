import { motion } from 'framer-motion'
import IDBadge from '../components/IDBadge.jsx'
import CopyEmailPill from '../components/CopyEmailPill.jsx'
import PhotoCarousel from '../components/PhotoCarousel.jsx'
import ScrollBadge from '../components/ScrollBadge.jsx'
import Projects from '../components/Projects.jsx'

const LINKEDIN_URL = 'https://www.linkedin.com/in/devayanigadgil/'
const RESUME_URL =
  'https://drive.google.com/file/d/15c8sAwP7FUvn9Kxu87iALXVjyg96ToDo/view?usp=sharing'
const EMAIL = 'gadgil.devayani@gmail.com'

const EASE = [0.22, 1, 0.36, 1]

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

function Card({ area, className = '', children, ...rest }) {
  return (
    <motion.div
      variants={cardVariants}
      className={`card ${area} ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------------ */

function ResumeDoc() {
  return (
    <div className="resume-doc" aria-hidden="true">
      <h4>DEVAYANI GADGIL</h4>
      <p className="doc-meta">
        Troy, MI · gadgil.devayani@gmail.com · LinkedIn · Portfolio
      </p>
      <p className="doc-h">SKILLS</p>
      <p className="doc-line">
        <strong>Design &amp; Research:</strong> Figma, FigJam, Adobe XD, Miro,
        Wireframing, Prototyping, High-Fidelity UI, Design Systems, User
        Interviews, Usability Testing, Heuristic Evaluation, Information
        Architecture, WCAG/Accessibility
      </p>
      <p className="doc-line">
        <strong>Technical:</strong> HTML, CSS, JavaScript (React), Claude Code,
        Cursor
      </p>
      <p className="doc-h">WORK EXPERIENCE</p>
      <p className="doc-line">
        <strong>AI Product Designer · Hirello.ai</strong> — Designed 20+
        high-fidelity screens and a 40-component design system in Figma for a
        B2C AI SaaS platform. Prototyped 3 core AI-driven features to validate
        product-market fit with beta users.
      </p>
      <p className="doc-line">
        <strong>UX Research Assistant · UMBC</strong> — Led full-cycle platform
        migration to a new Admin Console, reducing processing time by 30%.
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------------ */

export default function Home() {
  return (
    <>
      <main className="mx-auto w-full max-w-[1320px] px-5 pt-6 pb-16 md:px-8 lg:pt-6">
        {/* Bento */}
        <motion.section
          className="bento"
          variants={gridVariants}
          initial="hidden"
          animate="show"
          aria-label="Introduction"
        >
          {/* Profile — hanging ID badge */}
          <Card
            area="area-profile"
            className="card-hover min-h-[580px] bg-(--card-yellow) px-6 pb-8 md:min-h-0"
          >
            <IDBadge />
            {/* copy-email sticker — sits in the empty space below the badge,
                pointer-events-none wrapper so it never steals the badge's swing zone */}
            <div className="pointer-events-none absolute inset-x-0 bottom-9 flex justify-center md:bottom-11">
              <CopyEmailPill />
            </div>
          </Card>

          {/* Tagline */}
          <Card
            area="area-tagline"
            className="flex min-h-[210px] items-center bg-(--card-sage) px-7 py-8 md:px-10"
          >
            <h1 className="text-[clamp(24px,3.2vw,46px)] leading-[1.28] font-normal text-[#236626]">
              I design <span className="marker marker-reveal">intelligent systems</span>{' '}
              that simplify complex workflows.
            </h1>
          </Card>

          {/* LinkedIn */}
          <motion.a
            variants={cardVariants}
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Devayani Gadgil on LinkedIn (opens in a new tab)"
            className="card area-linkedin flex min-h-[190px] flex-col bg-(--card-blue) p-6 md:p-7"
          >
            <div className="flex items-start justify-between">
              <p className="text-[19px] font-bold text-white">LinkedIn</p>
              <span className="arrow-chip bg-white/18 text-white">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </span>
            </div>
            <div className="flex flex-1 items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="h-20 w-20 fill-white lg:h-[104px] lg:w-[104px]"
                aria-hidden="true"
              >
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
              </svg>
            </div>
          </motion.a>

          {/* Beyond work — photo carousel */}
          <Card area="area-beyond" className="card-hover min-h-[230px] bg-(--card-neutral)">
            <PhotoCarousel />
          </Card>

          {/* Resume */}
          <motion.a
            variants={cardVariants}
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View resume (opens in a new tab)"
            className="card area-resume block min-h-[230px] bg-(--card-coral)"
          >
            <div className="flex h-full items-start justify-between gap-4 p-6 md:p-7">
              <div className="shrink-0">
                <p className="text-[19px] font-bold text-[#fff7f2]">Resume</p>
                <span className="arrow-chip mt-4 bg-white/20 text-[#fff7f2]">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </span>
              </div>
              {/* manila folder, paper peeking out — pulled further out on hover */}
              <div className="folder self-end">
                <div className="folder-back" />
                <ResumeDoc />
                <div className="folder-front" />
              </div>
            </div>
          </motion.a>

          {/* Scroll down */}
          <Card area="area-scroll" className="bg-(--card-lavender)">
            <a
              href="#projects"
              aria-label="Scroll down to projects"
              className="flex h-full min-h-[210px] w-full items-center justify-center"
            >
              <ScrollBadge />
            </a>
          </Card>
        </motion.section>

        {/* Projects — flip cards */}
        <Projects />
      </main>

      {/* Footer */}
      <footer className="mx-auto w-full max-w-[1200px] px-5 pb-10 md:px-8">
        <div className="flex flex-col items-start justify-between gap-4 border-t border-[#1b1a17]/10 pt-7 md:flex-row md:items-center">
          <p className="text-[13.5px] text-(--muted)">
            © 2026 Devayani Gadgil · Michigan, United States
          </p>
          <div className="flex gap-6 text-[14px] font-semibold">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-(--card-blue)"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="transition-colors duration-200 hover:text-(--card-blue)"
            >
              Email
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-(--card-blue)"
            >
              Resume
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
