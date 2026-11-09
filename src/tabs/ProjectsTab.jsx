import ProjectCard from '../components/home/ProjectCard.jsx'
import { PROJECTS } from '../data/site.js'

export default function ProjectsTab() {
  return (
    <section aria-label="Selected work">
      <div className="project-grid">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  )
}
