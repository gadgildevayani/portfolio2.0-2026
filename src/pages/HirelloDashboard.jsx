import {
  AnnotatedShot,
  CaseBody,
  CaseHero,
  CaseSection,
  Compare,
  LayoutSketch,
  NotesBelowFigure,
  SoloNote,
} from '../components/case/CaseParts.jsx'
import { PROJECTS } from '../data/site.js'

// Hero reuses the project card's gradient and preview video.
const CARD = PROJECTS.find((p) => p.id === 'hirello-dashboard')

const META = {
  role: 'Founding Product Designer',
  team: (
    <>
      Solo
      <br />
      (working directly with both founders)
    </>
  ),
  company: 'Hirello.ai',
  tools: [
    { name: 'Figma', icon: '/assets/icons/tools/figma.svg' },
    { name: 'Claude', icon: '/assets/icons/tools/claude.svg' },
    { name: 'ChatGPT', icon: '/assets/icons/tools/chatgpt.svg' },
  ],
  timeline: '2025–2026',
  status: 'Shipped',
}

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'starting-point', label: 'The Starting Point' },
  { id: 'research', label: 'User Research' },
  { id: 'decision-01', label: 'Design Decision 01' },
  { id: 'decision-02', label: 'Design Decision 02' },
  { id: 'decision-03', label: 'Design Decision 03' },
  { id: 'outcome', label: 'Outcome & Reflection' },
]

export default function HirelloDashboard() {
  return (
    <article className="case case--slate">
      <CaseHero
        eyebrow={CARD.eyebrow}
        title={CARD.title}
        tldr="As Hirello’s founding product designer, I designed an AI career coaching dashboard from the ground up. Insights from 10 user interviews led me to prioritize actionable tasks over progress tracking, resulting in a shipped V2. I later proposed V3 to improve visual clarity and make Hiro’s coaching more approachable."
        media={{ gradient: CARD.gradient, video: CARD.media.src }}
      />

      <CaseBody meta={META} sections={SECTIONS}>
        <CaseSection id="overview" number="01" label="Overview">
          <p>
            As Hirello’s founding product designer, I led the design of its AI career coaching
            dashboard, focusing on creating a clearer, more supportive experience for job seekers
            navigating an already stressful process.
          </p>
          <p>
            User research led us to shift from tracking job-search activity toward helping users
            decide what to do next. I later proposed a more refined direction focused on visual
            clarity, approachable AI interactions, and balancing user needs with business
            priorities.
          </p>
        </CaseSection>

        <CaseSection
          id="starting-point"
          number="02"
          label="The Starting Point"
          title="I explored how to organize the dashboard while giving Hiro a dedicated space."
        >
          <p>
            The dashboard needed to bring together opportunity tracking, prioritized tasks, progress
            metrics, and Hiro, the AI career coach.
          </p>
          <figure className="case-figure">
            <div className="case-frame">
              <img
                className="case-frame__img"
                src="/assets/images/hirello/brainstorming-sketches.png"
                alt="Hand-drawn dashboard sketches: a chat with Hiro beside a priority work list, impact task cards, Hiro as a right-side panel, and a daily check-in with weekly challenges"
                loading="lazy"
              />
            </div>
          </figure>
          <p>
            Through early sketches, I explored different layouts, including placing Hiro on either
            side of the dashboard. One of the founders preferred placing Hiro on the right, but I
            felt this made the assistant look like a secondary chatbot. I advocated for the
            left-side layout to give Hiro a more prominent, consistent presence. After discussing
            both directions, we aligned on the left.
          </p>
          <Compare
            label="Two layout explorations for Hiro's panel"
            items={[
              {
                eyebrow: 'Exploration A',
                title: 'Hiro on the left',
                children: (
                  <LayoutSketch hiro="left" label="Wireframe with Hiro's panel down the left side of the dashboard" />
                ),
              },
              {
                eyebrow: 'Exploration B',
                title: 'Hiro on the right',
                children: (
                  <LayoutSketch hiro="right" label="Wireframe with Hiro's panel down the right side of the dashboard" />
                ),
              },
            ]}
          />
          <h3 className="case-section__subtitle">Dashboard V1</h3>
          <NotesBelowFigure
            overlap
            src="/assets/images/hirello/dashboard1.png"
            alt="Dashboard V1: Hiro's panel on the left with a welcome message and chat input, beside the career journey, today's prioritized work, an activity KPI chart, probability of getting hired, and an opportunity pipeline"
            notes={[
              {
                text: 'I wanted Hiro to have a consistent presence, rather than appearing only when users opened a chat.',
                tone: 'sky',
                tilt: -3,
              },
            ]}
          />
        </CaseSection>

        <CaseSection
          id="research"
          number="03"
          label="User Research"
          title="Users didn’t need another job-search tracker. They needed help figuring out what to do next."
        >
          <p>
            After V1, we conducted 10 user interviews to understand how people managed their job
            searches.
          </p>
          <p>
            The interviews revealed a gap between tracking activity and knowing what to prioritize,
            which challenged our initial dashboard direction.
          </p>
          <SoloNote title="Design opportunity:" tone="cornflower" tilt={5} align="end">
            Move the dashboard from tracking activity to helping users decide what to do next.
          </SoloNote>
        </CaseSection>

        <CaseSection
          id="decision-01"
          number="04"
          label="Design Decision 01"
          title="I shifted the dashboard’s focus from tracking progress to helping users prioritize their next steps."
        >
          <p>
            Based on the interviews, I restructured the dashboard around a prioritized worklist,
            organizing recommended tasks into daily, weekly, and monthly goals.
          </p>
          <p>
            Rather than expecting users to interpret multiple metrics and decide what to do next, I
            made actionable tasks more prominent while keeping opportunity tracking and progress
            information accessible.
          </p>
          <h3 className="case-section__subtitle">Dashboard V2 (shipped)</h3>
          <AnnotatedShot
            src="/assets/images/hirello/dashboard2.png"
            alt="Shipped Dashboard V2: Hiro's panel on the left; an opportunity pipeline and today's prioritized work list with impact scores in the middle; the goal, hiring probability chart and activity metrics on the right"
            notes={[
              {
                title: 'Prioritized worklist',
                at: { x: 32.9, y: 53.5 },
                label: { x: 31.5, y: 112, align: 'center' },
              },
              {
                title: 'Opportunity pipeline',
                at: { x: 31.4, y: 14 },
                label: { x: 31.4, y: -12, align: 'center' },
              },
              {
                title: 'Supporting metrics',
                at: { x: 88.1, y: 97.1 },
                label: { x: 100, y: 112, align: 'end' },
                line: { x: 88.1 },
              },
            ]}
          />
          <ul className="case-points">
            <li>
              <strong>Prioritized worklist:</strong> Recommended tasks organized by timeframe.
            </li>
            <li>
              <strong>Opportunity pipeline:</strong> Keeps job-search opportunities visible.
            </li>
            <li>
              <strong>Supporting metrics:</strong> Progress information remains accessible without
              being the main focus.
            </li>
          </ul>
        </CaseSection>

        <CaseSection
          id="decision-02"
          number="05"
          label="Design Decision 02"
          title="I explored a calmer visual direction to make the dashboard feel less overwhelming."
        >
          <p>
            Although V2 introduced clearer task prioritization, I felt its dense layout, strong
            colors, and competing visual elements still made the experience feel overwhelming.
          </p>
          <p>
            One constraint remained: the founders wanted the real-time opportunity pipeline at the
            top because they considered it a key product differentiator. I retained its prominent
            placement while refining the surrounding interface.
          </p>
          <h3 className="case-section__subtitle">Dashboard V3 (proposed)</h3>
          <ul className="case-points">
            <li>
              <strong>Softer visual language:</strong> Pastel colors, lighter surfaces, and more
              restrained accents.
            </li>
            <li>
              <strong>Less redundancy:</strong> Removed the separate Today’s Progress section because
              task completion was already visible in the worklist.
            </li>
            <li>
              <strong>Clearer hierarchy:</strong> Reduced the visual weight of supporting information
              in the right column.
            </li>
            <li>
              <strong>Business requirement:</strong> Kept the real-time opportunity pipeline
              prominent while making recommended tasks easier to identify.
            </li>
          </ul>
          <NotesBelowFigure
            overlap
            src="/assets/images/hirello/dashboard3.png"
            alt="Proposed Dashboard V3: a soft blue Hiro panel with suggested prompts on the left; a greeting, pastel opportunity pipeline cards and today's prioritized work in the middle; the goal, weekly progress and a networking nudge on the right"
            notes={[
              {
                title: 'Design tradeoff:',
                text: 'The pipeline needed to remain prominent for the business, but I didn’t want it to compete with the actions users came to the dashboard to complete.',
                tone: 'aqua',
                tilt: -4,
              },
            ]}
          />
        </CaseSection>

        <CaseSection
          id="decision-03"
          number="06"
          label="Design Decision 03"
          title="I gave Hiro a stronger presence and made its guidance more approachable."
        >
          <p>
            I wanted Hiro to feel like the central career coach, not just another chatbot sitting
            beside the dashboard.
          </p>
          <p>
            In V3, I refined Hiro’s dedicated space, introduced more supportive and action-oriented
            language, and added clearly clickable conversation starters to encourage interaction.
          </p>
          <p>
            I also made the guidance more contextual, helping users understand what to focus on next
            rather than simply presenting tasks and metrics.
          </p>
          <Compare
            label="Hiro's panel in V2 compared with V3"
            items={[
              {
                eyebrow: 'V2 / Shipped',
                title: 'Task-oriented assistant',
                children: (
                  <img
                    className="compare__shot"
                    src="/assets/images/hirello/hiro-v2.png"
                    alt="V2 Hiro panel: a welcome-back message listing three tasks to complete and a reminder that the resume module is in progress"
                    loading="lazy"
                  />
                ),
              },
              {
                eyebrow: 'V3 / Proposed',
                white: true,
                title: 'Contextual career coach',
                children: (
                  <img
                    className="compare__shot"
                    src="/assets/images/hirello/hiro-v3.png"
                    alt="V3 Hiro panel on a soft blue background: a message that the job market is competitive with a suggestion to start with the resume, three conversation starter buttons, and an Ask Hiro anything input"
                    loading="lazy"
                  />
                ),
              },
            ]}
          />
          <p className="media-note">Illustrative returning-user copy</p>
        </CaseSection>

        <CaseSection
          id="outcome"
          number="07"
          label="Outcome & Reflection"
          title="We shipped a more action-oriented dashboard, and I explored how to make the experience more supportive."
        >
          <p>
            V2 was selected by the founders and shipped with a greater emphasis on prioritized tasks,
            informed by our user research.
          </p>
          <p>
            I later proposed V3 to explore a calmer visual language, clearer information hierarchy,
            and a more approachable coaching experience with Hiro.
          </p>
          <p>
            <strong>What I’d explore next:</strong> Testing V3 with users to understand whether the
            revised hierarchy helps them identify their next steps and whether Hiro’s increased
            visibility encourages meaningful interaction.
          </p>
        </CaseSection>
      </CaseBody>
    </article>
  )
}
