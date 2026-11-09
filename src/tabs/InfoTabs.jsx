import { ABOUT, RESUME, SITE } from '../data/site.js'
import PhotoCarousel from '../components/home/PhotoCarousel.jsx'

// Panels for the non-project tabs.

export function AboutTab() {
  return (
    <section className="about" aria-label="About">
      <PhotoCarousel photos={ABOUT.photos} label="Photos from outside of work" />
      <div className="about__text">
        <h2 className="about__heading">
          {ABOUT.greeting}
          <br />
          <span className="about__heading-muted">{ABOUT.headline}</span>
        </h2>
        <div className="about__body">
          {ABOUT.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  )
}

// Line icons standing in for company logos in the experience list.
const JOB_ICONS = {
  sparkle: (
    <>
      <path d="M10 4.5l1.6 4.4c.2.5.6.9 1.1 1.1l4.3 1.5-4.3 1.6c-.5.2-.9.6-1.1 1.1L10 18.5l-1.6-4.3c-.2-.5-.6-.9-1.1-1.1L3 11.5l4.3-1.5c.5-.2.9-.6 1.1-1.1z" />
      <circle cx="18" cy="5" r="1.6" />
    </>
  ),
  cap: (
    <>
      <path d="M2.5 9.5 12 5l9.5 4.5L12 14z" />
      <path d="M6.5 11.5v4c1.4 1.6 3.4 2.5 5.5 2.5s4.1-.9 5.5-2.5v-4" />
      <path d="M21.5 9.5v4.5" />
    </>
  ),
  heart: (
    <>
      <path d="M12 19.5s-8-4.6-8-10.2A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 8 2.3c0 5.6-8 10.2-8 10.2z" />
      <path d="M4.5 12.5h4l1.5-2.5 2.5 4.5 1.5-2h5.5" />
    </>
  ),
  stack: (
    <>
      <path d="M5 9.5C5 6.5 8 5 12 5s7 1.5 7 4.5z" />
      <path d="M4.5 12.5h15M4.5 15.5h15M5.5 18.5h13" />
    </>
  ),
}

// Tabfolio's resume layout: experience, tools, skills, education, each
// section split by a hairline. Jobs get line icons instead of company logos.
export function ResumeTab() {
  return (
    <div className="resume">
      <section className="resume__section" aria-labelledby="resume-experience">
        <h2 id="resume-experience" className="resume__heading">
          Experience <span>shaping my practice</span>
        </h2>
        <ol className="resume-jobs">
          {RESUME.experience.map((job) => (
            <li key={job.company} className="resume-jobs__item">
              <svg className="resume-jobs__icon" viewBox="0 0 24 24" aria-hidden="true">
                {JOB_ICONS[job.icon]}
              </svg>
              <div>
                <h3 className="resume-jobs__title">
                  {job.role} <span className="resume-jobs__at">@</span> {job.company}
                </h3>
                <p className="resume__meta">
                  {job.dates}
                  <span aria-hidden="true">·</span>
                  {job.location}
                </p>
                <p className="resume-jobs__summary">{job.summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="resume__section" aria-labelledby="resume-tools">
        <h2 id="resume-tools" className="resume__heading">
          Tools <span>powering my work</span>
        </h2>
        <ul className="resume-tools">
          {RESUME.tools.map((tool) => (
            <li key={tool.name} className="resume-tools__item">
              <span className="resume-tools__icon">
                <img src={`/assets/icons/tools/${tool.icon}.svg`} alt="" width="24" height="24" />
              </span>
              <span>
                <span className="resume-tools__name">{tool.name}</span>
                <span className="resume__meta">{tool.use}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="resume__section" aria-labelledby="resume-skills">
        <h2 id="resume-skills" className="resume__heading">
          Skills
        </h2>
        <div className="resume-skills">
          {RESUME.skills.map((group) => (
            <div key={group.group} className="resume-skills__group">
              <h3 className="resume-skills__title">{group.group}</h3>
              <ul className="resume-skills__chips">
                {group.items.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="resume__section" aria-labelledby="resume-education">
        <h2 id="resume-education" className="resume__heading">
          Education
        </h2>
        <ul className="resume-rows">
          {RESUME.education.map((ed) => (
            <li key={ed.degree}>
              <h3 className="resume-rows__title">{ed.degree}</h3>
              <p className="resume__meta">
                {ed.dates}
                <span aria-hidden="true">·</span>
                {ed.school}
              </p>
            </li>
          ))}
        </ul>
        <a className="resume__pdf" href={SITE.resumeUrl} target="_blank" rel="noopener noreferrer">
          Download resume (PDF)
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M5 11 11 5M6 5h5v5" />
          </svg>
        </a>
      </section>
    </div>
  )
}
