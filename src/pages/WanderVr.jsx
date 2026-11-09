import {
  CaseBody,
  CaseHero,
  CaseSection,
  PolaroidScatter,
  SoloNote,
} from '../components/case/CaseParts.jsx'
import SoundVideo from '../components/SoundVideo.jsx'
import { PROJECTS } from '../data/site.js'

// Hero reuses the project card's gradient and image.
const CARD = PROJECTS.find((p) => p.id === 'wander-vr')

const META = {
  items: [
    { label: 'Role', value: 'UX Researcher' },
    { label: 'Project type', value: 'Academic research' },
    {
      label: 'Team',
      value: (
        <>
          Devayani Gadgil
          <br />
          Indu R
          <br />
          Gargi Khanvilkar
        </>
      ),
    },
    { label: 'Methods', value: 'SUS · SSQ · Moderated usability testing · Interviews' },
    { label: 'Platform', value: 'Meta Quest 3' },
  ],
}

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'question', label: 'The Research Question' },
  { id: 'approach', label: 'Research Approach' },
  { id: 'findings', label: 'Research Findings' },
  { id: 'unexpected', label: 'An Unexpected Finding' },
  { id: 'recommendations', label: 'Design Recommendations' },
  { id: 'reflection', label: 'Reflection' },
]

const RECOMMENDATIONS = [
  {
    num: '01',
    title: 'Introduce brief spatial onboarding',
    text: 'A short orientation tutorial could help first-time users understand navigation and controls before entering an unfamiliar environment.',
  },
  {
    num: '02',
    title: 'Improve spatial feedback',
    text: 'Clearer teleportation cues and haptic confirmation could help users understand when and where they have moved.',
  },
  {
    num: '03',
    title: 'Adjust interface placement',
    text: 'Positioning UI elements at a more comfortable distance could reduce visual strain and make interactions easier.',
  },
  {
    num: '04',
    title: 'Make transitions smoother',
    text: 'Reducing abrupt movement during teleportation could help minimize disorientation and preserve immersion.',
  },
  {
    num: '05',
    title: 'Support personally meaningful exploration',
    text: 'Allowing users to save and revisit meaningful locations could encourage more personal, emotionally engaging experiences.',
  },
]

export default function WanderVr() {
  return (
    <article className="case case--rose">
      <CaseHero
        eyebrow={CARD.eyebrow}
        title={CARD.title}
        tldr="I conducted a moderated usability study of Wander VR on Meta Quest 3 to understand how people navigate virtual environments and what shapes their experience. Alongside navigation and comfort issues, the study revealed how personally meaningful places could keep participants engaged despite interface friction."
        media={{ gradient: CARD.gradient, image: CARD.media.src, alt: CARD.media.alt }}
      />

      <CaseBody meta={META} sections={SECTIONS}>
        <CaseSection id="overview" number="01" label="Overview">
          <p>
            I conducted a moderated usability study of Wander VR on Meta Quest 3 to understand how
            people navigate virtual environments and what shapes their overall experience.
          </p>
          <p>
            Using usability questionnaires, simulator sickness assessments, and interviews, I
            evaluated the experience with three participants. While the study revealed navigation
            and comfort issues, it also uncovered an unexpected finding: personally meaningful
            content could sometimes outweigh interface friction.
          </p>
        </CaseSection>

        <CaseSection
          id="question"
          number="02"
          label="The Research Question"
          title="I wanted to understand more than whether users could complete tasks in VR."
        >
          <p>
            Unlike traditional screen-based interfaces, VR introduces additional considerations such
            as spatial orientation, physical comfort, and immersion.
          </p>
          <p>
            I wanted to examine how these factors affected the experience alongside usability.
            Specifically, I was interested in whether a technically frustrating interaction could
            still feel meaningful to someone.
          </p>
          <blockquote className="case-question">
            <p className="case-question__label">Research question</p>
            <p className="case-question__text">
              How do usability, physical comfort, and emotional engagement collectively shape the
              experience of exploring places in VR?
            </p>
          </blockquote>
          <figure className="case-figure">
            <div className="case-frame">
              <img
                className="case-frame__img"
                src="/assets/images/vrusabilitystudy/wanderapp-web.jpg"
                alt="Two Wander VR scenes: an Eiffel Tower street view with a Nearby Attractions info panel, and a suburban street with a timeline of years, each with the app's floating toolbar of controls"
                loading="lazy"
              />
            </div>
          </figure>
        </CaseSection>

        <CaseSection
          id="approach"
          number="03"
          label="Research Approach"
          title="I combined usability measures with observation and participant feedback."
        >
          <p>
            I conducted a moderated study with three participants who had varying levels of VR
            familiarity.
          </p>
          <dl className="case-specs">
            <div>
              <dt>Platform</dt>
              <dd>Meta Quest 3</dd>
            </div>
            <div>
              <dt>Application</dt>
              <dd>Wander VR</dd>
            </div>
            <div>
              <dt>Participants</dt>
              <dd>3</dd>
            </div>
            <div>
              <dt>Methods</dt>
              <dd>SUS, SSQ, moderated usability sessions, and interviews</dd>
            </div>
          </dl>
          <p>Each method helped examine a different aspect of the experience:</p>
          <ul className="case-points">
            <li>
              <strong>System Usability Scale (SUS):</strong> Measured participants’ perceived
              usability through a standardized questionnaire.
            </li>
            <li>
              <strong>Simulator Sickness Questionnaire (SSQ):</strong> Captured symptoms of
              discomfort, including nausea, oculomotor strain, and disorientation.
            </li>
            <li>
              <strong>Observation and interviews:</strong> Helped me understand how participants
              navigated, where they struggled, and how they responded emotionally.
            </li>
          </ul>

          <h3 className="case-section__subtitle">Three tasks guided the sessions</h3>
          <PolaroidScatter
            label="Photos from the moderated VR sessions"
            photos={[
              {
                src: '/assets/images/vrusabilitystudy/vr1.jpeg',
                alt: 'A participant stands wearing a Meta Quest 3 headset, gesturing with the controllers while the headset view is cast to a wall screen',
                x: 2.5,
                y: 4,
                w: 28,
                tilt: -7,
              },
              {
                src: '/assets/images/vrusabilitystudy/vr2.jpeg',
                alt: 'Over the shoulder of a participant in the headset, looking at a coastal scene on the wall screen while a researcher takes notes on a laptop',
                x: 21,
                y: 47,
                w: 40,
                tilt: 3,
              },
              {
                src: '/assets/images/vrusabilitystudy/vr3.jpeg',
                alt: 'A participant in a headset stands facing the room while a researcher watches the cast view from a laptop table',
                x: 46,
                y: 2,
                w: 28,
                tilt: 5,
              },
              {
                src: '/assets/images/vrusabilitystudy/vr4.jpeg',
                alt: 'Wide view of the study room: a participant in the headset on the right, researchers seated at laptops, the Wander VR view on the wall screen',
                x: 58,
                y: 40,
                w: 40,
                tilt: -4,
              },
            ]}
          />
          <ol className="task-cards">
            <li>
              <span className="task-cards__num" aria-hidden="true">01</span>
              Select a location directly from the map.
            </li>
            <li>
              <span className="task-cards__num" aria-hidden="true">02</span>
              Find somewhere personally meaningful.
              <span className="task-cards__tag">Open-ended</span>
            </li>
            <li>
              <span className="task-cards__num" aria-hidden="true">03</span>
              Explore using random teleportation.
            </li>
          </ol>
          <p>
            The second task was intentionally open-ended, allowing participants to choose a place
            that mattered to them rather than following a predefined destination.
          </p>
        </CaseSection>

        <CaseSection
          id="findings"
          number="04"
          label="Research Findings"
          title="Participants encountered navigation difficulties and physical discomfort."
        >
          <div className="stat-cards">
            <div className="stat-cards__card">
              <p className="stat-cards__value">63.75</p>
              <p className="stat-cards__label">SUS score</p>
              <p className="stat-cards__text">
                Wander VR received an average SUS score below the commonly used benchmark of
                approximately 68.
              </p>
            </div>
            <div className="stat-cards__card">
              <p className="stat-cards__value">3 of 3</p>
              <p className="stat-cards__label">Reported disorientation</p>
              <p className="stat-cards__text">
                All three participants reported some degree of discomfort, particularly
                disorientation and visual strain.
              </p>
            </div>
          </div>

          <p>Three recurring usability issues stood out.</p>
          <ol className="finding-cards">
            <li>
              <p className="finding-cards__head">
                <span className="finding-cards__num">01</span> Difficult navigation
              </p>
              <p className="finding-cards__text">
                The map lacked sufficient detail and zoom controls. Unstable pointers also made
                selecting locations difficult.
              </p>
              <blockquote className="finding-cards__quote">
                “The map... lacked details. I could only choose a location and go there.”
              </blockquote>
            </li>
            <li>
              <p className="finding-cards__head">
                <span className="finding-cards__num">02</span> Limited spatial orientation
              </p>
              <p className="finding-cards__text">
                After teleportation, participants struggled to understand where they had arrived.
                Abrupt transitions provided little context to help them reorient themselves.
              </p>
            </li>
            <li>
              <p className="finding-cards__head">
                <span className="finding-cards__num">03</span> Uncomfortable UI placement
              </p>
              <p className="finding-cards__text">
                Some interface elements appeared too close to participants’ faces, making them
                distracting and physically uncomfortable.
              </p>
              <blockquote className="finding-cards__quote">
                “The search window is on my face, it’s hard to remove it.”
              </blockquote>
            </li>
          </ol>
          <p>
            These findings pointed to opportunities to improve navigation, spatial feedback, and
            comfort.
          </p>
        </CaseSection>

        <CaseSection
          id="unexpected"
          number="05"
          label="An Unexpected Finding"
          title="One participant recognized her own house and stopped following the task."
        >
          <p>During the second task, participants were asked to explore a personally meaningful location.</p>
          <p>
            One participant, an international student, searched for her hometown in India. As she
            explored, she recognized her own house in the street-view imagery.
          </p>
          <figure className="case-figure">
            <div className="case-frame case-frame--video">
              <SoundVideo
                src="/assets/images/vrusabilitystudy/arvr-video-web.mp4"
                label="Recording of the session: the participant's headset view of her street in India is cast to the wall screen as she explores"
                className="case-frame__video"
              />
            </div>
          </figure>
          <blockquote className="case-pullquote">
            “This is my home... woww amazing. I don’t know when this picture was clicked, but if my
            dog was outside then you could have seen my dog.”
          </blockquote>
          <p>She began looking around for her dog instead of continuing with the task.</p>
          <p>
            What stood out was how quickly the experience changed. Despite the navigation and
            interface issues observed elsewhere in the session, she became absorbed in exploring a
            familiar place.
          </p>

          <h3 className="case-section__subtitle">
            Personal relevance changed how participants engaged with the experience.
          </h3>
          <p>
            This response wasn’t limited to one participant. All three showed greater engagement
            during the personally meaningful exploration task than during the other two tasks.
          </p>
          <p>
            The observation suggested that emotional connection could sometimes make an experience
            compelling despite usability limitations.
          </p>
          <SoloNote title="Key insight:" tone="blush" tilt={-3}>
            Evaluating VR experiences requires looking beyond task completion and usability scores.
            Personal relevance and emotional engagement are also important parts of the experience.
          </SoloNote>
        </CaseSection>

        <CaseSection
          id="recommendations"
          number="06"
          label="Design Recommendations"
          title="I translated the findings into five recommendations for a more comfortable and meaningful VR experience."
        >
          <ol className="rec-groups__list">
            {RECOMMENDATIONS.map((item) => (
              <li key={item.num}>
                <span className="rec-groups__num" aria-hidden="true">
                  {item.num}
                </span>
                <span>
                  <strong>{item.title}</strong>
                  <span className="rec-groups__text">{item.text}</span>
                </span>
              </li>
            ))}
          </ol>
          <p>These were research-informed recommendations, not implemented or validated changes.</p>
        </CaseSection>

        <CaseSection
          id="reflection"
          number="07"
          label="Reflection"
          title="This study changed how I think about evaluating immersive experiences."
        >
          <p>
            I expected to uncover usability issues, and the study revealed several. What surprised
            me was the emotional response during the personally meaningful exploration task.
          </p>
          <p>
            Seeing someone recognize her home and start looking for her dog reminded me that
            people’s experiences aren’t shaped by interfaces alone. The content, context, and
            personal significance of an interaction matter too.
          </p>
          <p>
            The study also reinforced the value of combining quantitative usability measures with
            qualitative observation. The questionnaires helped identify usability and comfort
            concerns, while the sessions revealed something those scores couldn’t fully explain.
          </p>
          <p>
            With only three participants, these findings are exploratory rather than generalizable.
            Given more time, I’d study a larger group and investigate how personal relevance affects
            engagement alongside usability and comfort.
          </p>
          <p>
            <strong>My biggest takeaway:</strong> A good immersive experience needs to be both usable
            and meaningful. Research should help us understand both.
          </p>
        </CaseSection>
      </CaseBody>
    </article>
  )
}
