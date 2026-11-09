import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { SITE, TABS } from '../../data/site.js'

// Tab links sit at the bottom of the page, so bring the reader back up to the
// hero as the panel swaps (tab switches otherwise keep scroll position).
function scrollToTop() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
}

// Click to copy the address (Tabfolio pattern); falls back to mailto when the
// clipboard isn't available.
function CopyEmail() {
  const [copied, setCopied] = useState(false)
  const timer = useRef()

  useEffect(() => () => clearTimeout(timer.current), [])

  const onClick = async (e) => {
    if (!navigator.clipboard) return
    e.preventDefault()
    try {
      await navigator.clipboard.writeText(SITE.email)
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 1600)
    } catch {
      window.location.href = `mailto:${SITE.email}`
    }
  }

  return (
    <a className="footer__link footer__copy" href={`mailto:${SITE.email}`} onClick={onClick}>
      {SITE.email}
      <span className={`footer__copied${copied ? ' is-visible' : ''}`} aria-hidden="true">
        Copied!
      </span>
      <span className="sr-only" role="status">
        {copied ? 'Email address copied' : ''}
      </span>
    </a>
  )
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__about">
          <div className="footer__id">
            <img className="footer__photo" src={SITE.portrait} alt="" width="31" height="31" />
            <p className="footer__name">{SITE.name}</p>
          </div>
          <p className="footer__tagline">Thanks for stopping by. Feel free to reach out!</p>
        </div>

        <nav className="footer__col" aria-label="Footer">
          <p className="footer__heading">Links</p>
          <ul className="footer__list">
            {/* Pages only; LinkedIn sits under Contact */}
            {TABS.filter((tab) => tab.path).map((tab) => (
              <li key={tab.path}>
                <Link className="footer__link" to={tab.path} onClick={scrollToTop}>
                  {tab.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__col">
          <p className="footer__heading">Contact</p>
          <ul className="footer__list">
            <li>
              <CopyEmail />
            </li>
            <li>
              <a className="footer__link" href={SITE.linkedinUrl} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
