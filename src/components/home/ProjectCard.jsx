import { Link } from 'react-router-dom'
import PreviewVideo from '../PreviewVideo.jsx'

// Project card: gradient panel with the framed preview, then the caption.
// `compact` (case-study "Explore more") shows just a smaller title.
export default function ProjectCard({ project, compact = false }) {
  const { media } = project
  const body = (
    <>
      <div className="project-card__media">
        {/* zoom layer: gradient + framed preview scale together, clipped by the media box */}
        <div className="project-card__zoom" style={{ backgroundImage: `url(${project.gradient})` }}>
          <div className="project-card__frame">
            {media.type === 'video' ? (
              <PreviewVideo src={media.src} />
            ) : (
              <img className="project-card__preview" src={media.src} alt={media.alt} loading="lazy" />
            )}
          </div>
        </div>
      </div>
      <div className="project-card__caption">
        {!compact && <p className="project-card__eyebrow">{project.eyebrow}</p>}
        <h3 className="project-card__title">{project.title}</h3>
      </div>
    </>
  )

  const className = `project-card${compact ? ' project-card--compact' : ''}`
  return project.href ? (
    <Link to={project.href} className={className}>
      {body}
    </Link>
  ) : (
    <article className={className}>{body}</article>
  )
}
