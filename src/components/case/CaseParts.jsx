import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import PreviewVideo from '../PreviewVideo.jsx'

// Building blocks for case-study pages (type and spacing from Tabfolio's case
// study; sections sit in the right column beside the project details and an
// "On this page" nav).

export function CaseHero({ eyebrow, title, tldr, media }) {
  return (
    <header className="case-hero">
      <p className="case-hero__eyebrow">{eyebrow}</p>
      <h1 className="case-hero__title">{title}</h1>
      <div className="case-hero__tldr">
        <p className="case-hero__tldr-label">TL;DR</p>
        <p className="case-hero__tldr-text">{tldr}</p>
      </div>
      {media && <CaseMedia {...media} />}
    </header>
  )
}

// Gradient panel with the framed preview inset, as on the project cards.
// `fit` wraps the panel around the media at its own proportions (not 4:3).
export function CaseMedia({ gradient, video, image, alt = '', fit = false }) {
  return (
    <div
      className={`case-media${fit ? ' case-media--fit' : ''}`}
      style={{ backgroundImage: `url(${gradient})` }}
    >
      <div className="case-media__frame">
        {video ? (
          <PreviewVideo src={video} className="case-media__preview" />
        ) : (
          <img className="case-media__preview" src={image} alt={alt} />
        )}
      </div>
    </div>
  )
}

export function CaseSection({ id, number, label, title, children }) {
  const headingId = `${id}-label`
  return (
    <section id={id} className="case-section" aria-labelledby={headingId}>
      <p id={headingId} className="case-section__label">
        {number} / {label}
      </p>
      {title && <h2 className="case-section__title">{title}</h2>}
      <div className="case-section__text">{children}</div>
    </section>
  )
}

// The section whose top has crossed the upper third of the viewport.
function useActiveSection(sections) {
  const key = sections.map((s) => s.id).join(' ')
  const [active, setActive] = useState(sections[0].id)

  useEffect(() => {
    const ids = key.split(' ')
    const update = () => {
      const line = window.innerHeight / 3
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [key])

  return active
}

// Scrolls to a section (smoothly unless reduced motion) and updates the hash.
function useSectionJump() {
  const reduceMotion = useReducedMotion()
  return (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
    history.replaceState(null, '', `#${id}`)
  }
}

function CaseSectionNav({ sections, active, go }) {
  return (
    <nav className="case-nav" aria-labelledby="case-nav-heading">
      <p id="case-nav-heading" className="case-nav__heading">
        On this page
      </p>
      <ul className="case-nav__list">
        {sections.map(({ id, label }) => {
          const isActive = id === active
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`case-nav__link${isActive ? ' is-active' : ''}`}
                aria-current={isActive ? 'location' : undefined}
                onClick={(e) => go(e, id)}
              >
                {label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

// Role / Team / Tools / Timeline. `tools` are { name, icon } pairs.
// `items` ([{ label, value }]) replaces the standard fields for studies
// that list different details (methods, platform…).
function CaseMeta({ items, role, team, company, tools, timeline, status }) {
  if (items) {
    return (
      <dl className="case-meta">
        {items.map((item) => (
          <div key={item.label} className="case-meta__item">
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    )
  }
  return (
    <dl className="case-meta">
      <div className="case-meta__item">
        <dt>Role</dt>
        <dd>{role}</dd>
      </div>
      <div className="case-meta__item">
        <dt>Team</dt>
        <dd>{team}</dd>
      </div>
      {company && (
        <div className="case-meta__item">
          <dt>Company</dt>
          <dd>{company}</dd>
        </div>
      )}
      <div className="case-meta__item">
        <dt>Tools</dt>
        <dd>
          <ul className="case-tools">
            {tools.map((tool) => (
              <li key={tool.name} className="case-tools__item" title={tool.name}>
                <img src={tool.icon} alt={tool.name} width="22" height="22" />
              </li>
            ))}
          </ul>
        </dd>
      </div>
      <div className="case-meta__item">
        <dt>Timeline</dt>
        <dd>{timeline}</dd>
      </div>
      {status && (
        <div className="case-meta__item">
          <dt>Status</dt>
          <dd>{status}</dd>
        </div>
      )}
    </dl>
  )
}

// Project details and the section nav on the left, sections on the right.
export function CaseBody({ meta, sections, children }) {
  const active = useActiveSection(sections)
  const go = useSectionJump()
  return (
    <div className="case-body">
      <aside className="case-body__rail">
        <div className="case-body__sticky">
          <CaseMeta {...meta} />
          <CaseSectionNav sections={sections} active={active} go={go} />
        </div>
      </aside>
      <div className="case-body__main">{children}</div>
    </div>
  )
}

// Looping video in the purple-grey panel, like the case-study images.
export function CaseVideo({ src, label }) {
  return (
    <figure className="case-figure" aria-label={label}>
      <div className="case-frame">
        <PreviewVideo src={src} className="case-frame__img" />
      </div>
    </figure>
  )
}

// Handwritten sticky note. `tone` picks the paper shade, `tilt` the angle.
export function StickyNote({ title, children, tone = 'lavender', tilt = -17, as: Tag = 'div' }) {
  return (
    <Tag
      className={`sticky-note sticky-note--${tone}`}
      style={{ '--tilt': `${tilt}deg` }}
    >
      <span className="sticky-note__paper">
        {title && <span className="sticky-note__title">{title}</span>}
        {children}
      </span>
    </Tag>
  )
}

// Image with a sticky note stuck over its right edge.
export function NoteFigure({ src, alt, note }) {
  return (
    <figure className="note-figure">
      <div className="case-frame note-figure__frame">
        <img className="case-frame__img" src={src} alt={alt} loading="lazy" />
      </div>
      <StickyNote as="figcaption">{note}</StickyNote>
    </figure>
  )
}

// Image with a row of sticky notes underneath. `notes`: { title, text, tone, tilt }.
// `overlap` pulls the notes up over the panel's bottom edge.
export function NotesBelowFigure({ src, alt, notes, overlap = false }) {
  return (
    <figure className={`notes-below${overlap ? ' notes-below--overlap' : ''}`}>
      <div className="case-frame">
        <img className="case-frame__img" src={src} alt={alt} loading="lazy" />
      </div>
      <figcaption className="notes-below__row">
        {notes.map((n) => (
          <StickyNote key={n.title ?? n.text} title={n.title} tone={n.tone} tilt={n.tilt}>
            {n.text}
          </StickyNote>
        ))}
      </figcaption>
    </figure>
  )
}

// One sticky note on its own, tucked under the content above it.
// `align="end"` pushes the note to the right of the column.
export function SoloNote({ title, children, tone, tilt = -3, align = 'start' }) {
  return (
    <div className={`note-solo${align === 'end' ? ' note-solo--end' : ''}`}>
      <StickyNote title={title} tone={tone} tilt={tilt}>
        {children}
      </StickyNote>
    </div>
  )
}

// Side-by-side comparison cards. Each: { eyebrow, title, children, caption, white }.
export function Compare({ items, label }) {
  return (
    <div className="compare" role="group" aria-label={label}>
      {items.map((item) => (
        <figure
          key={item.title}
          className={`compare__card${item.white ? ' compare__card--white' : ''}`}
        >
          <p className="compare__eyebrow">{item.eyebrow}</p>
          <p className="compare__title">{item.title}</p>
          <div className="compare__body">{item.children}</div>
          {item.caption && <figcaption className="compare__caption">{item.caption}</figcaption>}
        </figure>
      ))}
    </div>
  )
}

// Photos as scattered polaroids on a tinted panel. `photos`:
// { src, alt, x, y, w, tilt } with x / y / w in % of the panel.
export function PolaroidScatter({ photos, label }) {
  return (
    <figure className="polaroids" aria-label={label}>
      {photos.map((p) => (
        <span
          key={p.src}
          className="polaroids__item"
          style={{ '--x': `${p.x}%`, '--y': `${p.y}%`, '--w': `${p.w}%`, '--tilt': `${p.tilt}deg` }}
        >
          <img src={p.src} alt={p.alt} loading="lazy" />
        </span>
      ))}
    </figure>
  )
}

// Wireframe of a dashboard layout with Hiro's panel on the `hiro` side.
export function LayoutSketch({ hiro = 'left', label }) {
  return (
    <div className={`layout-sketch layout-sketch--${hiro}`} role="img" aria-label={label}>
      <span className="layout-sketch__hiro">Hiro</span>
      <span className="layout-sketch__bar" />
      <span className="layout-sketch__wide" />
      <span className="layout-sketch__half" />
      <span className="layout-sketch__small" />
    </div>
  )
}

// Illustrative chat: { from: 'hiro' | 'user', text } messages.
export function ChatSketch({ messages }) {
  return (
    <ol className="chat-sketch">
      {messages.map((m) => (
        <li key={m.text} className={`chat-sketch__msg chat-sketch__msg--${m.from}`}>
          {m.from === 'hiro' && <span className="chat-sketch__who">Hiro</span>}
          {m.text}
        </li>
      ))}
    </ol>
  )
}

// Illustrative structured step: progress pills, a text answer, chip choices.
export function FormSketch({ steps = 4, current = 2, question, answer, choiceLabel, choices, selected }) {
  return (
    <div className="form-sketch">
      <ol className="form-sketch__steps">
        {Array.from({ length: steps }, (_, i) => (
          <li key={i} className={i + 1 === current ? 'is-current' : undefined}>
            {i + 1}
          </li>
        ))}
      </ol>
      <p className="form-sketch__label">{question}</p>
      <p className="form-sketch__input">{answer}</p>
      <p className="form-sketch__label">{choiceLabel}</p>
      <ul className="form-sketch__chips">
        {choices.map((c) => (
          <li key={c} className={c === selected ? 'is-selected' : undefined}>
            {c}
          </li>
        ))}
      </ul>
    </div>
  )
}

// Screenshot with callouts: a dot on each element and a line out to a label
// in the panel's margin.
// `notes`: { title, at: {x, y}, label: {x, y, align}, line?: {x} } in % of the image;
// labels sit outside it (y < 0 or > 100). align: 'start' | 'center' | 'end'.
export function AnnotatedShot({ src, alt, notes }) {
  return (
    <figure className="annotated">
      <div className="case-frame annotated__frame">
        <div className="annotated__shot">
          <img className="case-frame__img" src={src} alt={alt} loading="lazy" />
          <svg className="annotated__lines" aria-hidden="true">
            {notes.map((n) => (
              <g key={n.title}>
                <line
                  x1={`${n.at.x}%`}
                  y1={`${n.at.y}%`}
                  x2={`${n.line?.x ?? n.label.x}%`}
                  y2={`${n.label.y}%`}
                />
                <circle cx={`${n.at.x}%`} cy={`${n.at.y}%`} r="4.5" />
              </g>
            ))}
          </svg>
          {notes.map((n, i) => (
            <span
              key={n.title}
              className={`annotated__label annotated__label--${n.label.align ?? 'center'}`}
              style={{ left: `${n.label.x}%`, top: `${n.label.y}%` }}
            >
              <span className="annotated__label-num" aria-hidden="true">
                {i + 1}
              </span>
              {n.title}
            </span>
          ))}
        </div>
      </div>
    </figure>
  )
}

const ICONS = {
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 20c1.4-3.6 4.2-5.5 7.5-5.5s6.1 1.9 7.5 5.5" />
    </>
  ),
  sparkle: (
    <path d="M12 3.5l1.9 5.3c.2.6.7 1.1 1.3 1.3l5.3 1.9-5.3 1.9c-.6.2-1.1.7-1.3 1.3L12 20.5l-1.9-5.3c-.2-.6-.7-1.1-1.3-1.3L3.5 12l5.3-1.9c.6-.2 1.1-.7 1.3-1.3L12 3.5z" />
  ),
  list: (
    <>
      <path d="M10 6.5h10M10 12h10M10 17.5h10" />
      <path d="M3.5 6.5l1.5 1.5 2.5-3M3.5 12l1.5 1.5 2.5-3M3.5 17.5l1.5 1.5 2.5-3" />
    </>
  ),
}

// Left-to-right flow of labelled steps (stacks on small screens).
export function FlowDiagram({ steps, label }) {
  return (
    <figure className="flow" aria-label={label}>
      <ol className="flow__list">
        {steps.map((step) => (
          <li key={step.title} className="flow__step">
            <svg className="flow__icon" viewBox="0 0 24 24" aria-hidden="true">
              {ICONS[step.icon]}
            </svg>
            <p className="flow__title">{step.title}</p>
            <p className="flow__note">{step.note}</p>
          </li>
        ))}
      </ol>
    </figure>
  )
}

// Two-column table in the purple-grey panel. `rows`: [term, description].
export function MappingTable({ caption, columns, rows }) {
  return (
    <div className="mapping">
      <table className="mapping__table">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c} scope="col">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([term, text]) => (
            <tr key={term}>
              <th scope="row">{term}</th>
              <td>{text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
