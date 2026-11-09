import { useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TABS } from '../../data/site.js'

const PILL_SPRING = { type: 'spring', stiffness: 520, damping: 42, mass: 0.9 }

// `back` (a tab path) is used inside a case study: that tab shows as
// "← Projects" (Tabfolio's back link: no pill, arrow nudges left on hover).
export default function TabNav({ back }) {
  const { pathname } = useLocation()
  const listRef = useRef(null)

  // Arrow / Home / End move focus between tabs; Enter or Space follows the link.
  const onKeyDown = (e) => {
    const links = [...listRef.current.querySelectorAll('a')]
    const i = links.indexOf(document.activeElement)
    if (i === -1) return
    const next = {
      ArrowRight: (i + 1) % links.length,
      ArrowLeft: (i - 1 + links.length) % links.length,
      Home: 0,
      End: links.length - 1,
    }[e.key]
    if (next === undefined) return
    e.preventDefault()
    links[next].focus()
  }

  return (
    <nav className="tab-nav" aria-label="Sections">
      <ul ref={listRef} className="tab-nav__list" onKeyDown={onKeyDown}>
        {TABS.map((tab) => {
          if (tab.href) {
            return (
              <li key={tab.label}>
                <a className="tab-nav__link" href={tab.href} target="_blank" rel="noopener noreferrer">
                  <span className="tab-nav__label">{tab.label}</span>
                </a>
              </li>
            )
          }
          const active = pathname === tab.path
          return (
            <li key={tab.path}>
              <NavLink
                to={tab.path}
                end
                className={`tab-nav__link${active ? ' is-active' : ''}${back === tab.path ? ' is-back' : ''}`}
              >
                {active && (
                  <motion.span
                    layoutId="tab-nav-pill"
                    className="tab-nav__pill"
                    transition={PILL_SPRING}
                  />
                )}
                {back === tab.path && (
                  <svg className="tab-nav__back-icon" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M13 8H3.5M7.5 3.5 3 8l4.5 4.5" />
                  </svg>
                )}
                <span className="tab-nav__label">{tab.label}</span>
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
