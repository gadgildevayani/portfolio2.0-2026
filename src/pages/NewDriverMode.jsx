import { motion } from 'framer-motion'
import { CasePage, NextFooter } from '../components/case.jsx'
import { Stagger, Up, item } from '../components/motion.jsx'

const IMG = '/assets/images/autoux'
const NAVY = '#191C1E'

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
function Shot({ src, alt, className = '' }) {
  return (
    <motion.div variants={item} className={`overflow-hidden rounded-2xl ${className}`}>
      <img src={src} alt={alt} loading="lazy" decoding="async" className="block w-full" />
    </motion.div>
  )
}

/* Highway-merge state — navy label panel paired with a HUD screen */
function HudCard({ state, title, desc, src, alt }) {
  return (
    <motion.div variants={item} className="grid overflow-hidden rounded-2xl md:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
      <div className="flex flex-col justify-center gap-5 p-8 md:p-10" style={{ backgroundColor: NAVY }}>
        <p className="text-2xl font-medium! leading-snug text-white">
          {state}
          <br />
          {title}
        </p>
        <p className="text-[0.95rem] leading-relaxed text-white/65">{desc}</p>
      </div>
      <img src={src} alt={alt} loading="lazy" decoding="async" className="block w-full" />
    </motion.div>
  )
}

export default function NewDriverMode() {
  return (
    <CasePage>
      <div className="wrap-content">
        <div className="pt-28 pb-40 md:pt-40">
          {/* Header */}
          <Stagger as="header">
            <Stagger as="div" className="flex flex-wrap gap-3">
              <Up as="span" className={PILL}>Automotive UX</Up>
              <Up as="span" className={PILL}>HMI</Up>
              <Up as="span" className={PILL}>Systems Design</Up>
            </Stagger>
            <Up as="h1" className="mt-8 max-w-4xl text-[2.5rem] leading-[1.25] font-medium! text-[#33333f] md:mt-10 md:text-[3rem]">
              New Driver Mode: An AI copilot that knows when to guide and when to step back
            </Up>
          </Stagger>

          {/* TL;DR */}
          <Stagger className="mt-14 md:mt-20">
            <Up className="flex items-center gap-4">
              <span className="text-[17px] font-medium text-[#33333f]">TL;DR</span>
              <span className="h-px flex-1 bg-[#e4e4e9]" />
            </Up>
            <Stagger as="div" className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-6">
              <Up className={`${CARD} sm:col-span-2`} style={{ backgroundColor: NAVY }}>
                <p className="text-[1.0625rem] leading-[1.6] text-white">
                  New drivers struggle with anxiety, not lack of knowledge, yet every automotive AI system is designed for experienced drivers
                </p>
              </Up>
              <Up className={`${CARD} sm:col-span-2`} style={{ backgroundColor: '#e9eaee' }}>
                <p className={CARDTEXT}>
                  Researched real driver anxiety, identifying three consistent themes
                </p>
              </Up>
              <Up className={`${CARD} sm:col-span-2`} style={{ backgroundColor: '#c6e8cb' }}>
                <p className={CARDTEXT}>
                  Designed New Driver Mode, a multimodal HUD, parking, and haptic guidance system that speaks only when needed
                </p>
              </Up>
              <Up className={`${CARD} sm:col-span-2`} style={{ backgroundColor: '#e9eaee' }}>
                <p className={CARDTEXT}>
                  Built around 4 core design principles, including "the absence of instruction is itself a signal"
                </p>
              </Up>
              <Up className={`${CARD} sm:col-span-2`} style={{ backgroundColor: '#c2eefb' }}>
                <p className={CARDTEXT}>
                  Addressed automation bias by designing the system to make itself unnecessary over time
                </p>
              </Up>
              <Up className={`${CARD} sm:col-span-2`} style={{ backgroundColor: '#e9eaee' }}>
                <p className={CARDTEXT}>
                  Conceptual project that establishes the interaction model using sensors already present in modern ADAS vehicles
                </p>
              </Up>
            </Stagger>
          </Stagger>

          {/* Opening hook */}
          <Stagger className={SECTION}>
            <Up as="p" className={BODY}>One Reddit user said it best:</Up>
            <Up as="p" className="mt-4 max-w-4xl text-2xl leading-snug font-medium! text-[#33333f] md:text-[1.875rem]">
              "I literally sweat so much and my heart rate skyrockets whenever it's time to merge."
            </Up>
            <Up as="p" className={`${MEDIA} max-w-4xl ${BODY}`}>
              While automotive companies race to embed AI into vehicles for experienced drivers,{' '}
              <span className="highlight-green">new drivers remain entirely overlooked.</span>
            </Up>
          </Stagger>

          {/* The Problem */}
          <Stagger className={SECTION}>
            <Up as="h2" className={H2}>The Problem</Up>
            <Up as="p" className={`${LEAD} max-w-4xl ${BODY}`}>
              Existing solutions like Ford MyKey and Mercedes MBUX Beginner Mode approach new driver safety through restriction, capping speed and limiting audio volume. These features prioritize control over confidence, leaving the real problem untouched: the anxiety that makes driving dangerous in the first place.
            </Up>
            <Up className={`${MEDIA} rounded-2xl p-10 md:p-14`} style={{ backgroundColor: NAVY }}>
              <p className="text-2xl leading-snug font-medium! text-white md:text-[1.875rem]">
                How might we design an in-car intelligent system that knows when to guide and when to get out of the way?
              </p>
            </Up>
          </Stagger>

          {/* What new drivers actually feel */}
          <Stagger className={SECTION}>
            <Up as="h2" className={H2}>What new drivers actually feel</Up>
            <Up as="p" className={`${LEAD} max-w-4xl ${BODY}`}>
              To understand the problem firsthand, I spent time in communities like r/NewDrivers and r/LearnToDrive, reading hundreds of posts from people actively learning to drive. Three themes emerged consistently.
            </Up>
            <Stagger as="div" className="mt-10 space-y-6">
              {[
                {
                  title: 'Anxiety overrides knowledge.',
                  quote:
                    '"It felt like I forgot everything I learned in the theoretical driving course because I felt so overwhelmed with all the new stimuli."',
                },
                {
                  title: 'Highway merging is the peak anxiety moment.',
                  quote:
                    `"Whenever I'm about to merge, I end up slowing down to a speed I shouldn't, in my panic, and always have to squeeze in by flooring it when there's finally an opening."`,
                },
                {
                  title: 'The gap between knowing and doing.',
                  quote:
                    `"I know how to parallel park, but I've never parallel parked between 2 cars before and I feel quite anxious about attempting it."`,
                },
              ].map((c) => (
                <motion.div key={c.title} variants={item} className="rounded-2xl bg-[#f3f3f5] p-8 md:p-12">
                  <p className="text-xl text-[#33333f]">{c.title}</p>
                  <p className="mt-5 text-lg leading-relaxed text-[#44444c] italic">{c.quote}</p>
                </motion.div>
              ))}
            </Stagger>
          </Stagger>

          {/* What already exists */}
          <Stagger className={SECTION}>
            <Up as="h2" className={H2}>What already exists and what it misses</Up>
            <Up className={`${LEAD} max-w-4xl space-y-4`}>
              <p className={BODY}>Before designing, I looked at what already exists for new drivers.</p>
              <p className={BODY}>
                Ford MyKey restricts speed, limits audio volume, and prevents certain safety features from being disabled. It gives parents control but offers the driver no guidance or support.
              </p>
              <p className={BODY}>
                Mercedes MBUX Beginner Mode caps acceleration and speed. More sophisticated than MyKey but still fundamentally the same approach: restriction, not support.
              </p>
            </Up>
            {/* Table 1 — competitive analysis */}
            <Up className={`${MEDIA} overflow-hidden rounded-2xl border border-[#e6e6ea]`}>
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#e6e6ea]">
                    <th className="px-6 py-4 text-[12px] font-semibold tracking-[0.08em] text-[#8a8a93] uppercase">System</th>
                    <th className="px-6 py-4 text-[12px] font-semibold tracking-[0.08em] text-[#8a8a93] uppercase">Approach</th>
                    <th className="px-6 py-4 text-[12px] font-semibold tracking-[0.08em] text-[#8a8a93] uppercase">What it misses</th>
                  </tr>
                </thead>
                <tbody className="text-[1rem]">
                  <tr className="border-b border-[#eeeef1]">
                    <td className="px-6 py-4 font-medium text-[#33333f]">Ford MyKey</td>
                    <td className="px-6 py-4 text-[#44444c]">Speed and audio restrictions</td>
                    <td className="px-6 py-4 text-[#44444c]">No contextual guidance</td>
                  </tr>
                  <tr className="border-b border-[#eeeef1]">
                    <td className="px-6 py-4 font-medium text-[#33333f]">Mercedes MBUX</td>
                    <td className="px-6 py-4 text-[#44444c]">Acceleration and speed limits</td>
                    <td className="px-6 py-4 text-[#44444c]">No anxiety awareness</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold text-[#33333f]">New Driver Mode</td>
                    <td className="px-6 py-4 font-semibold text-[#33333f]">Adaptive HUD guidance</td>
                    <td className="px-6 py-4 font-semibold text-[#33333f]">Addresses fear, builds confidence</td>
                  </tr>
                </tbody>
              </table>
            </Up>
          </Stagger>

          {/* Design principles */}
          <Stagger className={SECTION}>
            <Up as="h2" className={H2}>Design principles</Up>
            <Up as="p" className={`${LEAD} max-w-4xl ${BODY}`}>
              Both existing systems assume the problem is behavior. Neither addresses the anxiety driving that behavior in the first place.
            </Up>
            <Stagger as="div" className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {[
                'Activate only in high-stress moments, not constantly',
                'Account for fear, not just lack of knowledge',
                'Guidance surfaces automatically based on context',
                'Step back as the driver builds confidence over time',
              ].map((t) => (
                <motion.div key={t} variants={item} className="flex min-h-[120px] items-center rounded-2xl p-8 md:p-10" style={{ backgroundColor: NAVY }}>
                  <p className="text-lg leading-snug font-medium! text-white">{t}</p>
                </motion.div>
              ))}
            </Stagger>
          </Stagger>

          {/* Mapping the system */}
          <Stagger className={SECTION}>
            <Up as="h2" className={H2}>Mapping the system before opening Figma</Up>
            <Up as="p" className={`${LEAD} max-w-4xl ${BODY}`}>
              Before opening Figma, I mapped the complete system logic. The goal was to understand how the AI would behave across every scenario before designing a single screen.
            </Up>
            <Up className={`${STACK} max-w-4xl space-y-4`}>
              <p className={BODY}>
                <span className="font-medium text-[#33333f]">Entry</span>: The driver selects their profile at ignition. New Driver Mode loads automatically with their saved confidence history.
              </p>
              <p className={BODY}>
                <span className="font-medium text-[#33333f]">Monitoring</span>: The system runs silently in the background at all times. It never interrupts unless a trigger condition is met.
              </p>
              <p className={BODY}>
                <span className="font-medium text-[#33333f]">Guidance</span>: Three trigger paths activate contextual guidance: highway merge, parallel parking, and silence when no intervention is needed.
              </p>
            </Up>
            <Shot src={`${IMG}/system-map.svg`} alt="New Driver Mode system map showing entry, monitoring layer, trigger logic and post-drive flow" className={`${MEDIA} bg-white p-6 md:p-10`} />
          </Stagger>

          {/* The Design */}
          <Stagger className={SECTION}>
            <Up as="h2" className={H2}>The Design</Up>
            <Up as="p" className={`${LEAD} max-w-4xl ${BODY}`}>
              Current ADAS systems speak in alerts: beeps, flashes, warnings.{' '}
              <span className="highlight-green">
                This system speaks in guidance: calm, contextual, human. It translates what the car knows into what the driver needs to hear, at exactly the right moment.
              </span>
            </Up>
          </Stagger>

          {/* Profile selection */}
          <Stagger className={SECTION}>
            <Up as="h2" className={H2}>Profile selection</Up>
            <Up className={`${LEAD} max-w-4xl space-y-4`}>
              <p className={BODY}>
                When the driver gets in the car, the first thing they see is a familiar profile selection screen. Reva's profile carries a small New Driver Mode badge. The only visual difference from other profiles. No warnings, no restrictions messaging, no stigma.
              </p>
              <p className={BODY}>
                The mode activates silently the moment she selects her profile. New Driver Mode should feel like support, not surveillance.
              </p>
            </Up>
            <Shot src={`${IMG}/profile-selection.png`} alt="Profile selection screen showing three driver profiles with a New Driver Mode badge on Reva's card" className={MEDIA} />
          </Stagger>

          {/* Highway merge */}
          <Stagger className={SECTION}>
            <Up as="h2" className={H2}>Highway merge — three states</Up>
            <Up as="p" className={`${LEAD} max-w-4xl ${BODY}`}>
              The sequence is built around one research insight: new drivers don't freeze because they lack knowledge. They freeze because anxiety overrides what they know.
            </Up>
            <Stagger as="div" className="mt-10 space-y-6">
              <HudCard
                state="State 01"
                title="System speaks"
                desc="Build speed. Signal left. System is present and guiding."
                src={`${IMG}/HM1.png`}
                alt="HUD showing increase speed and signal left guidance on a highway ramp"
              />
              <HudCard
                state="State 02"
                title="Silence"
                desc="Driver has signaled. System goes quiet. Just a path. The absence of instruction is itself a signal: you're doing it right."
                src={`${IMG}/HM2.png`}
                alt="HUD showing only a curved path arrow with no text — deliberate silence"
              />
              <HudCard
                state="State 03"
                title="System speaks again"
                desc={`Gap opens. Green highlight marks the zone. "Check mirror — merge when ready." The driver makes the final decision.`}
                src={`${IMG}/HM3.png`}
                alt="HUD showing gap detection with a green highlight and check mirror guidance"
              />
            </Stagger>
          </Stagger>

          {/* Parallel parking */}
          <Stagger className={SECTION}>
            <Up as="h2" className={H2}>Parallel parking</Up>
            <Up className={`${LEAD} max-w-4xl space-y-4`}>
              <p className={BODY}>
                Guidance activates automatically when the system detects parking intent through a combination of low speed, turn signal, location context and reverse gear. No additional interaction needed.
              </p>
              <p className={BODY}>
                Step by step instructions and distance indicators appear on the camera feed. A haptic pulse on the steering wheel confirms when the wheel reaches the optimal turning angle, building physical muscle memory without requiring the driver to look away from the camera.
              </p>
              <p className={BODY}>
                Text treatment differs intentionally from the HUD. Infotainment guidance uses a contained text element for maximum readability from the driver's seated position.
              </p>
            </Up>
            <Shot src={`${IMG}/parallel-parking.png`} alt="Parallel parking screen showing infotainment camera overlay with step by step guidance" className={MEDIA} />
          </Stagger>

          {/* Drive Summary */}
          <Stagger className={SECTION}>
            <Up as="h2" className={H2}>Drive Summary</Up>
            <Up className={`${LEAD} max-w-4xl space-y-4`}>
              <p className={BODY}>
                Not a score. Just honest data. Assist events across the last ten drives shown as a simple trend graph. A line that, over time, should trend downward.
              </p>
              <p className={BODY}>
                One quiet amber observation at the bottom: "You needed less guidance this week than last." No celebration. The driver draws their own conclusion.
              </p>
            </Up>
            <Shot src={`${IMG}/drive-summary.png`} alt="Drive summary dashboard showing assist events trend graph and a drive insight" className={MEDIA} />
          </Stagger>

          {/* Technical feasibility */}
          <Stagger className={SECTION}>
            <Up as="h2" className={H2}>Is this technically feasible?</Up>
            <Up as="p" className={`${LEAD} max-w-4xl ${BODY}`}>
              A natural question when designing driver guidance: how does the car actually know when to guide?
            </Up>
            <Up as="p" className={`${STACK} max-w-4xl ${BODY}`}>
              <span className="highlight-green">
                The answer lies in sensors already present in most modern ADAS-equipped vehicles. Blind spot monitoring detects adjacent lane traffic. Radar measures gap distances and speed differentials. GPS knows ramp geometry and parking zones. Steering input sensors detect wheel position and turning angle. Reverse gear activation triggers the parking camera.
              </span>
            </Up>
            <Up as="p" className={`${STACK} max-w-4xl ${BODY}`}>
              This project doesn't propose new hardware. It proposes a UX layer that synthesizes existing sensor data into calm, timely, human-readable guidance for a new driver.
            </Up>
            <Up as="p" className={`${STACK} max-w-4xl text-[1.0625rem] leading-[1.8] text-[#8a8a93] italic`}>
              This is a speculative concept. The goal was to define the interaction model and surface the design questions worth asking, not to propose a production-ready solution.
            </Up>
          </Stagger>

          {/* Edge cases — Table 2 */}
          <Stagger className={SECTION}>
            <Up as="h2" className={H2}>Edge cases considered</Up>
            <Up className={`${LEAD} overflow-hidden rounded-2xl border border-[#e6e6ea]`}>
              <table className="w-full border-collapse text-left align-top text-[1rem]">
                <tbody>
                  <tr className="border-b border-[#eeeef1] align-top">
                    <td className="w-[38%] px-6 py-5 font-semibold text-[#33333f]">Multiple drivers, one car</td>
                    <td className="px-6 py-5 text-[#44444c]">progress is tied to the driver profile, not the vehicle</td>
                  </tr>
                  <tr className="border-b border-[#eeeef1] align-top">
                    <td className="w-[38%] px-6 py-5 font-semibold text-[#33333f]">Returning after a long break</td>
                    <td className="px-6 py-5 text-[#44444c]">the system detects inactivity and offers recalibration rather than assuming prior confidence level</td>
                  </tr>
                  <tr className="border-b border-[#eeeef1] align-top">
                    <td className="w-[38%] px-6 py-5 font-semibold text-[#33333f]">When to stop using the mode</td>
                    <td className="px-6 py-5 text-[#44444c]">guidance reduces over time, but the driver always decides when to turn it off entirely</td>
                  </tr>
                  <tr className="align-top">
                    <td className="w-[38%] px-6 py-5 font-semibold text-[#33333f]">How progress is communicated</td>
                    <td className="px-6 py-5 text-[#44444c]">tracked silently through behavior (less frequent guidance), never through scores or notifications</td>
                  </tr>
                </tbody>
              </table>
            </Up>
          </Stagger>

          {/* Automation bias */}
          <Stagger className={SECTION}>
            <Up as="h2" className={H2}>Designing against automation bias</Up>
            <Up as="p" className={`${LEAD} max-w-4xl ${BODY}`}>
              A concern that came up early: automation bias, the tendency for humans to over-rely on automated systems and lose the ability to perform without them. Aviation has struggled with this for decades, which is why pilots still do manual landings regularly to maintain proficiency.
            </Up>
            <Up as="p" className={`${STACK} max-w-4xl ${BODY}`}>
              <span className="highlight-green">
                New Driver Mode could fall into the same trap. The design addresses this three ways: guidance activates only in high-anxiety moments, not as a constant presence; it steps back progressively as the driver completes scenarios independently; and the Drive Summary makes the reduction in guidance visible over time.
              </span>
            </Up>
            <Up as="p" className={`${STACK} max-w-4xl ${BODY}`}>
              The goal was never to make drivers dependent on the system. It was to build the judgment that makes the system unnecessary.
            </Up>
          </Stagger>

          {/* Business case */}
          <Stagger className={SECTION}>
            <Up as="h2" className={H2}>The business case</Up>
            <Up as="p" className={`${LEAD} max-w-4xl ${BODY}`}>
              <span className="highlight-green">New Driver Mode isn't just a safety feature. It's a purchase decision.</span>
            </Up>
            <Up as="p" className={`${STACK} max-w-4xl ${BODY}`}>
              Parents buying their teenager's first car will actively choose a vehicle that offers intelligent guidance over one that only restricts. The new driver who builds confidence in a particular vehicle becomes a loyal customer for the next 20 years.
            </Up>
          </Stagger>

          {/* Reflection */}
          <Stagger className={SECTION}>
            <Up as="h2" className={H2}>Reflection</Up>
            <Up className={`${LEAD} max-w-4xl space-y-5`}>
              <p className={BODY}>
                This project challenged me in ways I didn't expect. Designing for a high-stakes environment meant every decision had a real consequence, there was no room for decoration. The wrong guidance at the wrong moment isn't just bad UX, it's a safety risk.
              </p>
              <p className={BODY}>
                What made this project personal is that I'm a new driver in the US myself. I had driving experience in India, but the US was a completely different experience and that gave me genuine empathy for the user I was designing for.
              </p>
              <p className={BODY}>
                The most unexpected outcome was how it changed how I observe. Even as a passenger, I found myself watching how drivers interact with their systems, timing how long a highway ramp actually takes, noticing hand movements and eye movements. I became a much more attentive observer. This time I wasn't designing good-looking screens. I was designing a safety experience. That shift changed how I think about design.
              </p>
            </Up>
          </Stagger>
        </div>
      </div>

      <NextFooter to="/umbcstudyabroad" title="Redesigning a study abroad system within platform constraints" />
    </CasePage>
  )
}
