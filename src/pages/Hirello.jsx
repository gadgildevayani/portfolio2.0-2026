import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { CasePage, NextFooter } from '../components/case.jsx'
import { Stagger, Up, item } from '../components/motion.jsx'

const IMG = '/assets/images/hirello'

/* Rounded media frame — image (reveals as it scrolls in) */
function Shot({ src, alt, className = '' }) {
  return (
    <motion.div variants={item} className={`overflow-hidden rounded-2xl border border-[#ececf0] ${className}`}>
      <img src={src} alt={alt} loading="lazy" decoding="async" className="block w-full" />
    </motion.div>
  )
}

/* Rounded media frame — looping video that plays once it scrolls into view */
function Clip({ src, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {})
        else el.pause()
      },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <motion.div variants={item} className={`overflow-hidden rounded-2xl border border-[#ececf0] ${className}`}>
      <video ref={ref} className="block w-full" loop muted playsInline controls preload="metadata">
        <source src={src} type="video/mp4" />
      </video>
    </motion.div>
  )
}

/* Shared type + spacing tokens (Inter only) */
const H2 = 'text-[1.75rem] leading-[1.3] font-medium! text-[#33333f] md:text-[2rem]'
const BODY = 'text-[1.0625rem] leading-[1.8] text-[#44444c]'
const SECTION = 'mt-24 md:mt-32' // gap between major sections
const LEAD = 'mt-6' // heading → first paragraph
const STACK = 'mt-5' // paragraph → paragraph
const MEDIA = 'mt-10' // text ↔ image / blue box

/* Hero tokens — tag pills + TL;DR bento */
const PILL = 'inline-flex items-center rounded-full border border-[#d8d8dd] bg-white px-5 py-2 text-[14px] text-[#33333f]'
const CARD = 'flex min-h-[190px] items-center rounded-2xl p-8 md:p-9'
const CARDTEXT = 'text-[1.0625rem] leading-[1.6] text-[#50505a]'

export default function Hirello() {
  return (
    <CasePage>
      <div className="wrap-content">
        <div className="pt-28 pb-40 md:pt-40">
        {/* Header */}
        <Stagger as="header">
          <Stagger as="div" className="flex flex-wrap gap-3">
            <Up as="span" className={PILL}>Product Design</Up>
            <Up as="span" className={PILL}>UX strategy</Up>
            <Up as="span" className={PILL}>AI/B2C SaaS</Up>
          </Stagger>
          <Up as="h1" className="mt-8 max-w-4xl text-[2.5rem] leading-[1.25] font-medium! text-[#33333f] md:mt-10 md:text-[3rem]">
            Designing an AI-powered job search platform — 0 to MVP
          </Up>
        </Stagger>

        {/* TL;DR */}
        <Stagger className="mt-14 md:mt-20">
          <Up className="flex items-center gap-4">
            <span className="text-[17px] font-medium text-[#33333f]">TL;DR</span>
            <span className="h-px flex-1 bg-[#e4e4e9]" />
          </Up>
          <Stagger as="div" className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-6">
            <Up className={`${CARD} sm:col-span-3`} style={{ backgroundColor: '#3f6fe6' }}>
              <p className="text-[1.0625rem] leading-[1.6] text-white">
                Founding designer on Hirello who translated a 60+ page vision document into a working AI job search platform
              </p>
            </Up>
            <Up className={`${CARD} sm:col-span-3`} style={{ backgroundColor: '#e3e9fc' }}>
              <p className={CARDTEXT}>
                Designed the onboarding flow, dashboard, and AI-powered tools like resume optimizer, Networking &amp; Outreach, Mock Interview, Cover letter generator, etc.
              </p>
            </Up>
            <Up className={`${CARD} sm:col-span-2`} style={{ backgroundColor: '#e3e9fc' }}>
              <p className={CARDTEXT}>
                User research revealed people needed direction, not more data which drove a product pivot
              </p>
            </Up>
            <Up className={`${CARD} sm:col-span-2`} style={{ backgroundColor: '#fbdcc9' }}>
              <p className={CARDTEXT}>
                10 users interviewed, 20+ screens shipped, 1 product pivot driven by research
              </p>
            </Up>
            <Up className={`${CARD} sm:col-span-2`} style={{ backgroundColor: '#e3e9fc' }}>
              <p className={CARDTEXT}>
                Shipped V2 dashboard; independently explored V3 as a more focused design direction
              </p>
            </Up>
          </Stagger>
        </Stagger>

        {/* Vision */}
        <Stagger className={SECTION}>
          <Up as="h2" className={H2}>Hirello had a vision. It didn't have a product.</Up>
          <Up as="p" className={`${LEAD} max-w-4xl ${BODY}`}>
            Hirello set out to build an AI-guided job search coach called "Hiro," backed by a 60+ page founder vision document outlining the concept. What it didn't have yet was a product: no dashboard, no workflows, no interaction patterns. I joined as the founding product designer with one job: turn that vision into something people could actually use.
          </Up>
        </Stagger>

        {/* Exploration */}
        <Stagger className={SECTION}>
          <Up as="h2" className={`max-w-4xl ${H2}`}>
            Before committing to a direction, I explored different ways the system could come together.
          </Up>
          <Up as="p" className={`${LEAD} max-w-4xl ${BODY}`}>
            At this stage, there was no prototype yet. The goal was to define structure, not validate it.
          </Up>
          <Up className={`${MEDIA} rounded-2xl bg-[#D9E3FF] p-8 md:p-10`}>
            <h3 className="text-[15px] font-semibold tracking-wide text-[#33333f]">Key Questions</h3>
            <ul className="mt-5 list-disc space-y-3 pl-5 marker:text-[#9aa0c0]">
              <li className={BODY}>Should Hiro live inside the dashboard or act as a separate layer?</li>
              <li className={BODY}>Should tasks feel like a conversation or a structured list?</li>
              <li className={BODY}>How much guidance is helpful before it becomes overwhelming?</li>
            </ul>
          </Up>
          <Shot src={`${IMG}/brainstorming-sketches.png`} alt="Early brainstorming sketches exploring how the Hirello system could come together" className={MEDIA} />
        </Stagger>

        {/* Onboarding */}
        <Stagger className={SECTION}>
          <Up as="h2" className={H2}>Designing the entry point: onboarding</Up>
          <Up as="p" className={`${LEAD} max-w-4xl ${BODY}`}>
            <span className="highlight-key">Before Hiro could guide anyone, it needed to understand them.</span>{' '}
            The onboarding flow builds a user's profile across four steps (resume, career goals, work preferences, current approach), with Hiro present throughout, explaining why each question matters rather than just asking it.
          </Up>
          <Clip src={`${IMG}/onboarding.mp4`} className={MEDIA} />
          <Up as="p" className={`${MEDIA} max-w-4xl ${BODY}`}>
            This was also where Hiro itself needed to be introduced, not as a feature, but as a presence. Since Hiro would act as the user's copilot throughout the entire product, onboarding had to do double duty: collect information and establish Hiro's voice early, so its guidance felt familiar rather than novel by the time users reached the dashboard and AI tools.
          </Up>
        </Stagger>

        {/* First dashboard */}
        <Stagger className={SECTION}>
          <Up as="h2" className={H2}>The first dashboard prioritized completeness over clarity</Up>
          <Up as="p" className={`${LEAD} max-w-4xl ${BODY}`}>
            V1 brought together every piece of the vision document into one view: pipeline tracking, a health score, prioritized worklist, multiple modules. It looked comprehensive. It looked good.
            <br />
            <span className="highlight-key">It didn't work.</span>
          </Up>
          <Shot src={`${IMG}/dashboard1.png`} alt="V1 of the Hirello dashboard — dense with pipeline tracking, a health score, worklist and multiple modules" className={MEDIA} />
        </Stagger>

        {/* What 10 users told us */}
        <Stagger className={SECTION}>
          <Up as="h2" className={H2}>What 10 users told us</Up>
          <Up className={`${LEAD} rounded-2xl bg-[#D9E3FF] p-8 md:p-10`}>
            <p className={BODY}>
              We interviewed 10 users over 4 weeks. The UI looked good, but the experience didn't land.
            </p>
            <div className="mt-6 space-y-2">
              <p className={`italic ${BODY}`}>"It looks great, but I don't know what to do here."</p>
              <p className={`italic ${BODY}`}>"It feels more like a report than a coach."</p>
            </div>
          </Up>
          <Up as="p" className={`${MEDIA} max-w-4xl ${BODY}`}>
            Users ignored the pipeline view and the health score. They kept returning to one thing: the prioritized worklist.{' '}
            <span className="highlight-key">They didn't need more information. They needed clearer direction.</span>
            <br />
            That single finding changed how the entire dashboard needed to behave.
          </Up>
        </Stagger>

        {/* Redesign — V2 & V3 */}
        <Stagger className={SECTION}>
          <Up as="h2" className={H2}>The dashboard was redesigned to focus on what to do next</Up>
          <Up as="p" className={`${LEAD} max-w-4xl ${BODY}`}>
            The goal shifted: reduce decision-making, surface one clear next step, make progress actionable.
          </Up>
          <Up as="p" className={`${STACK} max-w-4xl ${BODY}`}>
            <span className="highlight-key">V2 shipped.</span> Grouped tasks into modules, improved organization. Easier to navigate, but still required users to make decisions about what mattered most.
          </Up>
          <Shot src={`${IMG}/dashboard2.png`} alt="V2 of the Hirello dashboard — tasks grouped into modules with improved organization" className={MEDIA} />
          <Up as="p" className={`${MEDIA} max-w-4xl ${BODY}`}>
            <span className="highlight-key">V3 was my exploration.</span> Based directly on what users told us, I pushed further: one stronger primary action, reduced visual noise, clearer hierarchy. Faster decisions, lower cognitive load. This wasn't the version that shipped but it's the direction I believe the product should move toward.
          </Up>
          <Shot src={`${IMG}/hirello-panel.png`} alt="V3 exploration — a more focused, action-first Hirello dashboard with one stronger primary action" className={MEDIA} />
        </Stagger>

        {/* AI tools — Cover Letter Generator */}
        <Stagger className={SECTION}>
          <Up as="h2" className={H2}>Designing the AI tools: Cover Letter Generator</Up>
          <Up as="p" className={`${LEAD} max-w-4xl ${BODY}`}>
            <span className="highlight-key">Hiro's job wasn't just to organize tasks, it needed to actively help users produce things.</span>{' '}
            I designed several AI-powered tools across the platform, including a resume optimizer, networking module, and interview preparation module. Out of respect for the startup's confidentiality, this case study focuses on one in detail: the cover letter generator.
          </Up>
          <Up as="p" className={`${STACK} max-w-4xl ${BODY}`}>
            Users select a template style, input role and company details, and generate a draft grounded in their resume and the job description.
          </Up>
          <Shot src={`${IMG}/coverletter1.png`} alt="Cover letter generator — selecting a template style and entering role and company details" className={MEDIA} />
          <Up as="p" className={`${MEDIA} max-w-4xl ${BODY}`}>
            The more interesting design problem was refinement. A first draft is rarely right, so I designed "Refine with Hiro," a set of quick-select prompts (highlight technical skills, shorten by 50%, adjust tone for startup) that{' '}
            <span className="highlight-key">let users iterate without writing a new prompt from scratch every time.</span>{' '}
            This turned a one-shot AI generation into a conversation.
          </Up>
          <Shot src={`${IMG}/coverletter2.png`} alt="Refine with Hiro — quick-select prompts that let users iterate on the cover letter draft" className={MEDIA} />
        </Stagger>

        {/* Impact */}
        <Stagger className={SECTION}>
          <Up as="h2" className={H2}>Impact</Up>
          <Up className={`${LEAD} max-w-4xl space-y-4`}>
            <p className={BODY}>Translated a 60+ page vision document into a structured, working platform</p>
            <p className={BODY}>20+ screens shipped across onboarding, dashboard, and AI tools</p>
            <p className={BODY}>10 users interviewed over 4 weeks, directly shaping the product pivot</p>
            <p className={BODY}>
              Advocated for a calmer, more focused product direction, moving away from overly playful, gamified patterns toward something that felt like genuine guidance
            </p>
          </Up>
        </Stagger>

        {/* Reflection */}
        <Stagger className={SECTION}>
          <Up as="h2" className={H2}>Reflection</Up>
          <Up className={`${LEAD} rounded-2xl bg-[#D9E3FF] p-8 md:p-12`}>
            <p className={`max-w-4xl ${BODY}`}>
              This project changed how I think about product design. Users don't need more features or more data. They need clear direction at the right moment. Designing intelligent systems isn't about showing everything the system knows. It's about helping someone decide what to do next.
            </p>
          </Up>
        </Stagger>
        </div>
      </div>

      <NextFooter
        to="/newdrivermode"
        title="New Driver Mode: An AI copilot that knows when to guide and when to step back"
      />
    </CasePage>
  )
}
