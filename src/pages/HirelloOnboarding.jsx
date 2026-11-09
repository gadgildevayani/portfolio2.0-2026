import {
  AnnotatedShot,
  CaseBody,
  CaseHero,
  CaseSection,
  CaseVideo,
  ChatSketch,
  Compare,
  FlowDiagram,
  FormSketch,
  MappingTable,
  NoteFigure,
  NotesBelowFigure,
  SoloNote,
} from '../components/case/CaseParts.jsx'
import { PROJECTS } from '../data/site.js'

// Hero uses the project card's gradient with the full onboarding recording.
const CARD = PROJECTS.find((p) => p.id === 'hirello-onboarding')
const ONBOARDING_VIDEO = '/assets/images/hirello/hirello-onboarding-prototype.mp4'

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
  timeline: '3 months',
  status: 'Shipped',
}

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'challenge', label: 'The Design Challenge' },
  { id: 'starting-point', label: 'The Starting Point' },
  { id: 'decision-01', label: 'Design Decision 01' },
  { id: 'decision-02', label: 'Design Decision 02' },
  { id: 'personalization', label: 'Connecting onboarding to AI' },
  { id: 'outcome', label: 'Outcome & Reflection' },
]

export default function HirelloOnboarding() {
  return (
    <article className="case">
      <CaseHero
        eyebrow="Hirello.ai"
        title="What Should an AI Assistant Ask Before It Can Help?"
        tldr="As the founding product designer at Hirello, I designed a four-step onboarding experience for an AI career coaching platform. I simplified how users share their goals, preferences, and job-search challenges, creating a more focused experience that was shipped in the MVP."
        media={{ gradient: CARD.gradient, video: ONBOARDING_VIDEO, fit: true }}
      />

      <CaseBody meta={META} sections={SECTIONS}>
        <CaseSection id="overview" number="01" label="Overview">
          <p>
            Hirello is an AI-powered career coaching platform designed to help job seekers navigate
            their job search through personalized guidance and actionable tasks.
          </p>
          <p>
            As the founding product designer, I joined when the product was still a 60+ page vision
            document. One of my responsibilities was designing how users would first interact with
            Hiro, the AI career coach.
          </p>
        </CaseSection>

        <CaseSection
          id="challenge"
          number="02"
          label="The Design Challenge"
          title="Hiro needed user context to create a personalized job-search plan."
        >
          <p>
            Hirello’s vision was for Hiro to recommend job-search tasks based on each user’s goals,
            experience, preferences, and challenges.
          </p>
          <p>
            My challenge was to design how Hiro would collect that information without making
            onboarding feel like a lengthy assessment or an unnecessary AI conversation.
          </p>
          <FlowDiagram
            label="User context feeds Hiro, which produces a job-search plan"
            steps={[
              { icon: 'user', title: 'User context', note: 'Goals, experience, preferences, challenges' },
              { icon: 'sparkle', title: 'Hiro', note: 'Intended personalization' },
              { icon: 'list', title: 'Job-search plan', note: 'Recommended tasks' },
            ]}
          />
        </CaseSection>

        <CaseSection
          id="starting-point"
          number="03"
          label="The Starting Point"
          title="The original questionnaire was too long and repetitive."
        >
          <p>
            The founders initially proposed a detailed questionnaire to understand users’ career
            goals and job-search challenges. However, many questions overlapped, and users were
            repeatedly asked to rate negatively framed statements about their struggles. We needed a
            way to collect useful context for Hiro without making onboarding feel like an
            assessment.
          </p>
          <NoteFigure
            src="/assets/images/hirello/questions-before.png"
            alt="The original questionnaire: three statements about job-search struggles, each rated on a 1 to 5 scale from low to high"
            note="Repeatedly rating frustrations added unnecessary effort to an already stressful job search."
          />
        </CaseSection>

        <CaseSection
          id="decision-01"
          number="04"
          label="Design Decision 01"
          title="I simplified the questions and changed how users answered them."
        >
          <p>
            I worked with the founders to review the original questionnaire, remove redundant
            questions, consolidate overlapping ones, and simplify the language.
          </p>
          <p>
            The original rating scales focused on how severely users experienced different
            job-search difficulties. I shifted the approach toward identifying which challenges they
            were facing, so that information could eventually help Hiro recommend relevant tasks.
          </p>
          <p>I also wanted to avoid making users repeatedly evaluate their frustrations during onboarding.</p>
          <NotesBelowFigure
            src="/assets/images/hirello/questions-after.svg"
            alt="The redesigned question: “What feels most frustrating about your job search right now?” with nine selectable options such as “Resume feels like a black hole” and “Networking feels awkward”"
            notes={[
              {
                title: 'Why multiselect?',
                text: 'I wanted them to quickly identify what wasn’t working in their job search so Hiro could help.',
                tone: 'lilac',
                tilt: 9,
              },
              {
                title: 'Why ask about frustrations?',
                text: 'Users might not know what solution they need, but they usually know what’s frustrating them.',
                tone: 'periwinkle',
                tilt: 2,
              },
            ]}
          />
        </CaseSection>

        <CaseSection
          id="decision-02"
          number="05"
          label="Design Decision 02"
          title="I chose structured onboarding over a chatbot conversation."
        >
          <p>
            When designing an AI-powered product, the first instinct is often to make the
            interaction conversational. I initially considered the same approach for Hiro’s
            onboarding.
          </p>
          <p>
            However, a long chat would make it difficult for users to track their progress, revisit
            previous answers, or edit information. It would also introduce unnecessary back-and-forth
            for questions that could be answered through simple selections.
          </p>
          <p>
            There was also a technical constraint: Hiro needed to remain in a consistent left-side
            panel throughout the product.
          </p>
          <p>
            I chose a structured, four-step flow where users could complete onboarding efficiently
            while Hiro provided contextual guidance.
          </p>
          <Compare
            label="Initial idea compared with the shipped approach"
            items={[
              {
                eyebrow: 'Initial idea',
                title: 'Conversational onboarding',
                caption: 'Illustration of the initial concept, not an original design artifact.',
                children: (
                  <ChatSketch
                    messages={[
                      { from: 'hiro', text: 'What kind of role are you looking for?' },
                      { from: 'user', text: 'Product Designer' },
                      { from: 'hiro', text: 'What is your experience level?' },
                      { from: 'user', text: 'Mid-level' },
                      { from: 'hiro', text: 'What are your work preferences?' },
                    ]}
                  />
                ),
              },
              {
                eyebrow: 'Shipped approach',
                title: 'Structured onboarding + Hiro',
                caption: 'Simplified illustration of the shipped four-step flow.',
                children: (
                  <FormSketch
                    current={2}
                    question="What role are you looking for?"
                    answer="Product Designer"
                    choiceLabel="Experience level"
                    choices={['Mid-level', 'Senior']}
                    selected="Mid-level"
                  />
                ),
              },
            ]}
          />
          <SoloNote tone="lilac" tilt={-3}>
            Just because a product uses AI doesn’t mean every interaction needs to be a
            conversation.
          </SoloNote>

          <h3 className="case-section__subtitle">How I introduced Hiro in the shipped experience</h3>
          <p>
            Rather than making Hiro ask every question, I kept it visible as a contextual guide that
            explained the purpose of each stage.
          </p>
          <AnnotatedShot
            src="/assets/images/hirello/career-goal.png"
            alt="The shipped Career Goal step: Hiro’s panel on the left explains the step, a four-stage progress bar sits at the top, and the form asks for a target role and experience level, with Back and Continue buttons"
            notes={[
              {
                title: 'Persistent Hiro panel',
                at: { x: 27.5, y: 14 },
                label: { x: 0, y: -12, align: 'start' },
                line: { x: 20 },
              },
              {
                title: 'Visible progress',
                at: { x: 62, y: 19.4 },
                label: { x: 100, y: -12, align: 'end' },
                line: { x: 85 },
              },
              {
                title: 'Editable answers',
                at: { x: 40, y: 87.5 },
                label: { x: 40, y: 112, align: 'center' },
              },
            ]}
          />
        </CaseSection>

        <CaseSection
          id="personalization"
          number="06"
          label="Connecting Onboarding to AI Personalization"
          title="I designed the questions around the context Hiro would need to provide relevant guidance."
        >
          <p>
            The questionnaire collected different types of information, each intended to support the
            AI career coach’s eventual recommendations.
          </p>
          <MappingTable
            caption="Information collected during onboarding and its intended use"
            columns={['Information collected', 'Intended use']}
            rows={[
              ['Resume and experience', 'Understand the user’s professional background'],
              ['Career goals', 'Identify target roles and career direction'],
              ['Work preferences', 'Account for location and work arrangements'],
              ['Job-search challenges', 'Identify areas where users may need support'],
              ['Urgency and availability', 'Inform the scope and pace of a job-search plan'],
            ]}
          />
          <p>
            The product vision was for Hiro to use this information to create personalized
            job-search tasks.
          </p>
        </CaseSection>

        <CaseSection
          id="outcome"
          number="07"
          label="Outcome & Reflection"
          title="We shipped a structured onboarding experience as part of Hirello’s initial product."
        >
          <p>
            The final experience replaced the original assessment-style questionnaire with four
            editable stages and a consistent introduction to Hiro.
          </p>
          <p>
            The project reinforced something I value in interaction design: introducing AI doesn’t
            mean replacing familiar interactions with conversation. The right interaction depends on
            what users are trying to accomplish.
          </p>
          <p>
            <strong>What I’d explore next:</strong> How users understand what Hiro learns from their
            responses, and how they could review or correct that information before it informs
            recommendations.
          </p>
          <CaseVideo
            src={ONBOARDING_VIDEO}
            label="Recording of the shipped four-step onboarding flow, with Hiro guiding each step"
          />
        </CaseSection>
      </CaseBody>
    </article>
  )
}
