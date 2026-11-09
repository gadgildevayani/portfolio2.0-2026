import { Link } from 'react-router-dom'

/*
 * Hero call-to-action. On hover/focus the button widens to reveal an icon
 * (Tabfolio pattern): the primary spins in a star, the secondary pops in a
 * dark chip. Icons are the SVGs in /assets/images, recoloured via CSS mask.
 */
// `to` links to a page in the site; `href` to anything else.
export default function HeroButton({ variant = 'primary', icon, href, to, children, ...rest }) {
  const content = (
    <>
      <span className="hero-btn__label">{children}</span>
      <span className="hero-btn__reveal" aria-hidden="true">
        <span className="hero-btn__icon" style={{ '--icon': `url(${icon})` }} />
      </span>
    </>
  )
  const className = `hero-btn hero-btn--${variant}`
  return to ? (
    <Link className={className} to={to} {...rest}>
      {content}
    </Link>
  ) : (
    <a className={className} href={href} {...rest}>
      {content}
    </a>
  )
}
