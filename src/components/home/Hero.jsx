import { useLocation } from 'react-router-dom'
import { SITE } from '../../data/site.js'
import HeroButton from './HeroButton.jsx'

export default function Hero() {
  const onResume = useLocation().pathname === '/resume'
  return (
    <section className="hero" aria-labelledby="hero-name">
      <img
        className="hero__portrait"
        src={SITE.portrait}
        alt="Portrait of Devayani Gadgil"
        width="60"
        height="60"
      />
      <h1 id="hero-name" className="hero__name">
        {SITE.name}
      </h1>
      <p className="hero__tagline">{SITE.tagline}</p>
      <div className="hero__actions">
        {/* On the Resume tab the button offers the PDF instead */}
        {onResume ? (
          <HeroButton
            variant="primary"
            icon="/assets/images/download-simple.svg"
            href={SITE.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download my Resume
          </HeroButton>
        ) : (
          <HeroButton variant="primary" icon="/assets/images/star-four-fill.svg" to="/resume">
            View my Resume
          </HeroButton>
        )}
        <HeroButton
          variant="secondary"
          icon="/assets/images/envelope-simple.svg"
          href={`mailto:${SITE.email}`}
        >
          Email me
        </HeroButton>
      </div>
    </section>
  )
}
