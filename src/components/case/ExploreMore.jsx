import { useLocation } from 'react-router-dom'
import ProjectCard from '../home/ProjectCard.jsx'
import { PROJECTS } from '../../data/site.js'

// End of a case study: the other homepage projects (Tabfolio's "Explore more").
export default function ExploreMore() {
  const { pathname } = useLocation()
  const others = PROJECTS.filter((p) => p.href !== pathname)
  if (!others.length) return null

  return (
    <section className="explore" aria-labelledby="explore-heading">
      <h2 id="explore-heading" className="explore__heading">
        Explore more
      </h2>
      <div className="explore__grid">
        {others.map((p) => (
          <ProjectCard key={p.id} project={p} compact />
        ))}
      </div>
    </section>
  )
}
