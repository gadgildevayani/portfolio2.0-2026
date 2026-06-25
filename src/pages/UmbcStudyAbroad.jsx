import { motion } from 'framer-motion'
import { CasePage, NextFooter } from '../components/case.jsx'
import { Stagger, Up, item } from '../components/motion.jsx'

const IMG = '/assets/images/umbcstudyabroad'
const AMBER = '#ffe2b1'
const AMBER_TEXT = '#b9791f'

/* Shared type + spacing tokens (Inter only) — consistent with the other case studies */
const H2 = 'text-[1.75rem] leading-[1.3] font-medium! text-[#33333f] md:text-[2rem]'
const BODY = 'text-[1.0625rem] leading-[1.8] text-[#44444c]'
const SECTION = 'mt-24 md:mt-32'
const LEAD = 'mt-6'
const STACK = 'mt-5'
const MEDIA = 'mt-10'

/* Hero tokens — tag pills + TL;DR bento */
const PILL = 'inline-flex items-center rounded-full border border-[#d8d8dd] bg-white px-5 py-2 text-[14px] text-[#33333f]'
const CARD = 'flex min-h-[190px] items-center rounded-2xl p-8 md:p-9'
const CARDTEXT = 'text-[1.0625rem] leading-[1.6] text-[#50505a]'

/* Rounded media frame — image (reveals as it scrolls in) */
function Shot({ src, alt, className = '', imgClass = '' }) {
  return (
    <motion.div variants={item} className={`overflow-hidden rounded-2xl ${className}`}>
      <img src={src} alt={alt} loading="lazy" decoding="async" className={`block w-full ${imgClass}`} />
    </motion.div>
  )
}

/* Staff before/after framed image with a red (classic) or green (admin) label */
function StaffFrame({ kind, src, alt }) {
  const before = kind === 'before'
  return (
    <motion.div variants={item} className="overflow-hidden rounded-2xl border border-[#ececf0] shadow-[0_10px_40px_-18px_rgba(0,0,0,0.18)]">
      <div
        className="flex items-center gap-2 px-5 py-3 text-[11px] font-bold tracking-[0.12em] uppercase"
        style={
          before
            ? { backgroundColor: '#fee2e2', color: '#991b1b' }
            : { backgroundColor: '#d1fae5', color: '#065f46' }
        }
      >
        <span>{before ? '✕' : '✓'}</span>
        {before ? 'Before · Classic View' : 'After · Admin Console'}
      </div>
      <img src={src} alt={alt} loading="lazy" decoding="async" className="block w-full border-t border-[#f0f0f3]" />
    </motion.div>
  )
}

/* A single document sheet for the "before" stack */
function DocSheet({ style }) {
  return (
    <div
      className="absolute flex h-[130px] w-[100px] flex-col gap-2.5 rounded-lg border border-[#d7dee6] bg-white p-3.5 shadow-[0_6px_16px_-8px_rgba(0,0,0,0.15)]"
      style={style}
    >
      <span className="h-1.5 w-3/4 rounded-full bg-[#cfe3f5]" />
      <span className="h-1.5 w-2/3 rounded-full bg-[#cfe3f5]" />
      <span className="h-1.5 w-3/4 rounded-full bg-[#cfe3f5]" />
      <span className="h-1.5 w-1/2 rounded-full bg-[#cfe3f5]" />
    </div>
  )
}

/* Student application illustration — scattered forms → one logical flow */
function AppIllustration() {
  return (
    <motion.div variants={item} className="rounded-2xl border border-[#ececf0] bg-white px-6 py-14 md:px-12">
      <div className="flex flex-col items-center justify-center gap-12 md:flex-row md:gap-20">
        {/* Before */}
        <div className="flex flex-col items-center gap-7">
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#9aa0aa] uppercase">Before</span>
          <div className="relative h-[160px] w-[200px]">
            <DocSheet style={{ left: 30, top: 18, transform: 'rotate(-9deg)', zIndex: 1 }} />
            <DocSheet style={{ left: 60, top: 12, transform: 'rotate(5deg)', zIndex: 2 }} />
            <DocSheet style={{ left: 90, top: 16, transform: 'rotate(-1deg)', zIndex: 3 }} />
          </div>
          <p className="text-sm text-[#8a8a93]">Multiple forms, duplicated fields</p>
        </div>

        {/* Arrow */}
        <svg className="rotate-90 md:rotate-0" width="56" height="24" viewBox="0 0 56 24" fill="none" aria-hidden="true">
          <path d="M3 12H50" stroke="#e6a33e" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M42 5L52 12L42 19" stroke="#e6a33e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {/* After */}
        <div className="flex flex-col items-center gap-7">
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: AMBER_TEXT }}>
            After
          </span>
          <div className="flex h-[160px] w-[140px] flex-col gap-3 rounded-xl border border-[#ececf0] bg-white p-4 shadow-[0_14px_36px_-14px_rgba(0,0,0,0.2)]">
            <div className="h-7 w-full rounded-md" style={{ backgroundColor: AMBER }} />
            <span className="h-2.5 w-full rounded-full bg-[#eef0f3]" />
            <span className="h-2.5 w-5/6 rounded-full bg-[#eef0f3]" />
            <span className="h-2.5 w-full rounded-full bg-[#eef0f3]" />
            <span className="h-2.5 w-2/3 rounded-full bg-[#eef0f3]" />
          </div>
          <p className="text-sm font-medium" style={{ color: AMBER_TEXT }}>
            One logical flow, no redundancy
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function UmbcStudyAbroad() {
  return (
    <CasePage>
      <div className="wrap-content">
        <div className="pt-28 pb-40 md:pt-40">
          {/* Header */}
          <Stagger as="header">
            <Stagger as="div" className="flex flex-wrap gap-3">
              <Up as="span" className={PILL}>Service Design</Up>
              <Up as="span" className={PILL}>Higher Ed</Up>
              <Up as="span" className={PILL}>Enterprise UX</Up>
            </Stagger>
            <Up as="h1" className="mt-8 max-w-4xl text-[2.5rem] leading-[1.25] font-medium! text-[#33333f] md:mt-10 md:text-[3rem]">
              Redesigning a study abroad system within platform constraints
            </Up>
          </Stagger>

          {/* TL;DR */}
          <Stagger className="mt-14 md:mt-20">
            <Up className="flex items-center gap-4">
              <span className="text-[17px] font-medium text-[#33333f]">TL;DR</span>
              <span className="h-px flex-1 bg-[#e4e4e9]" />
            </Up>
            <Stagger as="div" className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-6">
              <Up className={`${CARD} sm:col-span-2`} style={{ backgroundColor: '#fbe3b2' }}>
                <p className={CARDTEXT}>
                  A study abroad system used by 200+ students and multiple staff members had never been intentionally designed, only inherited
                </p>
              </Up>
              <Up className={`${CARD} sm:col-span-2`} style={{ backgroundColor: '#dce9fb' }}>
                <p className={CARDTEXT}>
                  Researched both sides: surveyed students, directly interviewed staff, identified the same structural breakdowns from both ends
                </p>
              </Up>
              <Up className={`${CARD} sm:col-span-2`} style={{ backgroundColor: '#f3c9c0' }}>
                <p className={CARDTEXT}>
                  Worked entirely within Terra Dotta's rigid legacy platform, no new interfaces, no new software
                </p>
              </Up>
              <Up className={`${CARD} sm:col-span-2`} style={{ backgroundColor: '#dce9fb' }}>
                <p className={CARDTEXT}>
                  Consolidated scattered multi-form student applications into one logical flow
                </p>
              </Up>
              <Up className={`${CARD} sm:col-span-2`} style={{ backgroundColor: '#dce9fb' }}>
                <p className={CARDTEXT}>
                  Rebuilt the staff admin console for at-a-glance status and eliminated hours of manual reporting
                </p>
              </Up>
              <Up className={`${CARD} sm:col-span-2`} style={{ backgroundColor: '#c9db95' }}>
                <div className="space-y-2">
                  <p className={CARDTEXT}>15+ hours saved per week</p>
                  <p className={CARDTEXT}>30% faster processing</p>
                  <p className={CARDTEXT}>New standalone site at <span className="italic">goabroad.umbc.edu</span></p>
                </div>
              </Up>
            </Stagger>
          </Stagger>

          {/* Nobody designed it */}
          <Stagger className={SECTION}>
            <Up as="h2" className={H2}>Nobody had ever designed this system. They'd only inherited it.</Up>
            <Up className={`${LEAD} max-w-4xl space-y-5`}>
              <p className={BODY}>
                When I joined UMBC's Study Abroad Office, the system was functional. Students could submit applications. Staff could find them. But the process was confusing for students and exhausting for staff and nobody could quite explain why.
              </p>
              <p className={BODY}>
                The answer turned out to be simple: the system had never been configured intentionally. It had been set up once, years ago, and everyone since had worked around its limitations rather than addressing them. There was no design behind it. Just accumulated workarounds. That was the real problem and it meant the solution wasn't a redesign. It was a first design.
              </p>
            </Up>
          </Stagger>

          {/* The constraint */}
          <Stagger className={SECTION}>
            <Up as="h2" className={H2}>The constraint: Terra Dotta</Up>
            <Up className={`${LEAD} rounded-2xl p-8 md:p-12`} style={{ backgroundColor: AMBER }}>
              <p className="text-[1.0625rem] leading-[1.8] text-[#4a4536]">
                Everything had to happen within Terra Dotta, a legacy SaaS platform used by hundreds of universities for study abroad management. Fixed UI patterns, limited customization, rigid workflows. No ability to redesign the interface from scratch.
              </p>
            </Up>
            <Up as="p" className={`${MEDIA} max-w-4xl ${BODY}`}>
              This constraint shaped every decision.{' '}
              <span className="highlight-ice">
                The question was never "what should this look like?" It was "what can we configure, restructure, and reorganize within what already exists?"
              </span>
            </Up>
            <Up as="p" className={`${STACK} max-w-4xl ${BODY}`}>
              Working within Terra Dotta meant the design impact had to come from structure and information architecture, not visual design. That turned out to be exactly where the real problems were.
            </Up>
          </Stagger>

          {/* Understanding both sides */}
          <Stagger className={SECTION}>
            <Up as="h2" className={H2}>Understanding both sides</Up>
            <Up as="p" className={`${LEAD} max-w-4xl ${BODY}`}>
              Before making any changes, I analyzed the problem from both ends: students trying to apply, and staff trying to manage those applications. Different users, same structural breakdown. The system was making both sides work harder than necessary.
            </Up>
          </Stagger>

          {/* Survey columns */}
          <Stagger className={SECTION}>
            <Up as="h2" className={H2}>200+ students surveyed · Staff directly interviewed · 10 validating responses</Up>
            <Stagger as="div" className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              <motion.div variants={item} className="flex flex-col rounded-2xl p-8 md:p-10" style={{ backgroundColor: AMBER }}>
                <p className="text-xl font-medium! text-[#33333f]">Students experienced unclear and repetitive workflows:</p>
                <ul className="mt-5 list-disc space-y-3 pl-5 marker:text-[#b9791f]">
                  <li className="text-[1.0625rem] leading-[1.7] text-[#4a4536]">No clear next step after starting an application</li>
                  <li className="text-[1.0625rem] leading-[1.7] text-[#4a4536]">Confusing instructions with no context</li>
                  <li className="text-[1.0625rem] leading-[1.7] text-[#4a4536]">Repeated data entry across multiple forms</li>
                </ul>
                <p className="mt-8 text-[1.0625rem] leading-relaxed text-[#5b5440] italic">
                  "I had to input the same information multiple times while filling the application."
                </p>
              </motion.div>
              <motion.div variants={item} className="flex flex-col rounded-2xl p-8 md:p-10" style={{ backgroundColor: AMBER }}>
                <p className="text-xl font-medium! text-[#33333f]">Staff workflows were fragmented and manual:</p>
                <ul className="mt-5 list-disc space-y-3 pl-5 marker:text-[#b9791f]">
                  <li className="text-[1.0625rem] leading-[1.7] text-[#4a4536]">Switching between 3+ system views to track one student</li>
                  <li className="text-[1.0625rem] leading-[1.7] text-[#4a4536]">Outdated and irrelevant fields cluttering every view</li>
                  <li className="text-[1.0625rem] leading-[1.7] text-[#4a4536]">Manual exports required for basic reporting that should be automatic</li>
                </ul>
                <p className="mt-8 text-[1.0625rem] leading-relaxed text-[#5b5440] italic">
                  "It takes so long just to find a single student's application status."
                </p>
              </motion.div>
            </Stagger>
          </Stagger>

          {/* The problem */}
          <Stagger className={SECTION}>
            <Up as="h2" className={H2}>The problem wasn't the interface. It was the structure behind it.</Up>
            <Up as="p" className={`${LEAD} max-w-4xl ${BODY}`}>
              Nobody had ever sat down and decided: what information does a student actually need at each step? What does a staff member need to see at a glance? What fields are redundant? What reports should be automatic?
            </Up>
            <Up as="p" className={`${STACK} max-w-4xl ${BODY}`}>
              These questions had never been asked so nobody had answered them. The system just accumulated complexity over time until both sides adapted to it rather than the other way around.
            </Up>
            <Up as="p" className={`${STACK} max-w-4xl ${BODY}`}>
              <span className="highlight-ice">
                The insight that changed the approach: fixing the visual design wouldn't solve anything. Fixing the structure would.
              </span>
            </Up>
          </Stagger>

          {/* Student application: before & after */}
          <Stagger className={SECTION}>
            <Up as="h2" className={H2}>Student application: before and after</Up>
            <Up as="p" className={`${LEAD} max-w-4xl ${BODY}`}>
              The student application was spread across multiple disconnected forms, with duplicated fields appearing across different steps. A student applying for a program had to enter the same information multiple times with no indication of progress or what came next. The restructured flow consolidated everything into a single logical sequence: one form, one path, no redundancy. Each step had a clear purpose and a clear next action.
            </Up>
            <div className={MEDIA}>
              <AppIllustration />
            </div>
          </Stagger>

          {/* Staff admin console: before & after */}
          <Stagger className={SECTION}>
            <Up as="h2" className={H2}>Staff admin console: before and after</Up>
            <Up as="p" className={`${LEAD} max-w-4xl ${BODY}`}>
              The Classic View was the default Terra Dotta interface: visually overwhelming, no hierarchy, no way to prioritize. Staff had to manually scan through every application to find what they needed. The rebuilt Admin Console surfaces what matters immediately: current application status at a glance, real-time search, immediate priorities visible without any drilling down. Staff could now see what needed attention without switching between multiple views.
            </Up>
            <Stagger as="div" className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
              <StaffFrame kind="before" src={`${IMG}/terradotta1.png`} alt="Classic View — the default Terra Dotta interface, before redesign" />
              <StaffFrame kind="after" src={`${IMG}/terradotta3.png`} alt="Admin Console — rebuilt for at-a-glance status, after redesign" />
              <StaffFrame kind="before" src={`${IMG}/terradotta4.png`} alt="Classic View — cluttered list view, before redesign" />
              <StaffFrame kind="after" src={`${IMG}/terradotta2.png`} alt="Admin Console — prioritized list view, after redesign" />
            </Stagger>
          </Stagger>

          {/* Zero Entry Report */}
          <Stagger className={SECTION}>
            <Up as="h2" className={H2}>The Zero Entry Report</Up>
            <Up as="p" className={`${LEAD} max-w-4xl ${BODY}`}>
              <span className="highlight-ice">
                Before this project, generating a list of current applicants required staff to manually configure report parameters from scratch every single time: selecting fields, setting filters, exporting to Excel, then interpreting the results. This happened weekly, sometimes more.
              </span>
            </Up>
            <Up as="p" className={`${STACK} max-w-4xl ${BODY}`}>
              By correctly configuring the Applicant Report inside Terra Dotta, this entire process became automatic. Staff open the report, the data is already filtered and organized. No setup. No Excel. No waiting.
            </Up>
            <Shot src={`${IMG}/terradotta5.png`} alt="The Zero Entry Report — applicant data automatically filtered and organized" className={`${MEDIA} border border-[#ececf0]`} />
          </Stagger>

          {/* Standalone home */}
          <Stagger className={SECTION}>
            <Up as="h2" className={H2}>A standalone home for Study Abroad</Up>
            <Up className={`${LEAD} max-w-4xl space-y-5`}>
              <p className={BODY}>
                Before this project, all study abroad information lived on a single UMBC webpage, a dense paragraph with a few links buried in the university site. Students had no clear starting point, no way to browse programs, no sense of what the process actually involved.
              </p>
              <p className={BODY}>
                Using Terra Dotta's Site Builder, I designed and built a full standalone website giving the office a proper presence that students could actually navigate from the very beginning of their interest, not just when they were ready to apply.
              </p>
            </Up>
            <Shot src={`${IMG}/goabroadsite.png`} alt="The standalone goabroad.umbc.edu website" className={MEDIA} />
          </Stagger>

          {/* Impact */}
          <Stagger className={SECTION}>
            <Up as="h2" className={H2}>Impact</Up>
            <Up className={`${LEAD} rounded-2xl p-8 md:p-12`} style={{ backgroundColor: AMBER }}>
              <div className="space-y-5">
                <p className="text-[1.0625rem] leading-relaxed text-[#4a4536]">200+ students supported through clearer application flows</p>
                <p className="text-[1.0625rem] leading-relaxed text-[#4a4536]">15+ hours saved per week by eliminating manual reporting and streamlining staff workflows</p>
                <p className="text-[1.0625rem] leading-relaxed text-[#4a4536]">30% faster processing through structural simplification</p>
                <p className="text-[1.0625rem] leading-relaxed text-[#4a4536]">One live website at goabroad.umbc.edu, a new entry point for every prospective study abroad student at UMBC</p>
              </div>
            </Up>
          </Stagger>

          {/* Reflection */}
          <Stagger className={SECTION}>
            <Up as="h2" className={H2}>Reflection</Up>
            <Up as="p" className={`${LEAD} max-w-4xl ${BODY}`}>
              <span className="highlight-ice">
                This project taught me something I didn't expect: the most impactful design decisions aren't always visible ones.
              </span>
            </Up>
            <Up as="p" className={`${STACK} max-w-4xl ${BODY}`}>
              Nobody sees a reconfigured report structure. Nobody notices that a form no longer asks for the same information twice. But students move through the application without getting stuck, and staff get back 15 hours a week they were spending on work that should have been automatic.
            </Up>
            <Up as="p" className={`${STACK} max-w-4xl ${BODY}`}>
              Design isn't always about building something new. Sometimes it's about understanding a system well enough to make it work the way it was always supposed to.
            </Up>
          </Stagger>
        </div>
      </div>

      <NextFooter to="/vrusabilitystudy" title="Emotional connection as a key UX driver in VR navigation" />
    </CasePage>
  )
}
