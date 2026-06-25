import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { CasePage, NextFooter } from '../components/case.jsx'
import { Stagger, Up, item } from '../components/motion.jsx'

const IMG = '/assets/images/vrusabilitystudy'
const PINK = '#ffddfb'

/* Shared type + spacing tokens (Inter only) — consistent with the other case studies */
const H2 = 'text-[1.75rem] leading-[1.3] font-medium! text-[#33333f] md:text-[2rem]'
const BODY = 'text-[1.0625rem] leading-[1.8] text-[#44444c]'
const SECTION = 'mt-24 md:mt-32'
const LEAD = 'mt-6'
const STACK = 'mt-5'
const MEDIA = 'mt-10'
const PINKBODY = 'text-[1.0625rem] leading-[1.8] text-[#4a4048]'

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

/* Looping video that plays once it scrolls into view */
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
    <motion.div variants={item} className={`flex justify-center ${className}`}>
      <div className="overflow-hidden rounded-2xl">
        <video ref={ref} className="block max-h-[640px] w-auto" loop muted playsInline controls preload="metadata">
          <source src={src} type="video/mp4" />
        </video>
      </div>
    </motion.div>
  )
}

export default function VrUsabilityStudy() {
  return (
    <CasePage>
      <div className="wrap-content">
        <div className="pt-28 pb-40 md:pt-40">
          {/* Header */}
          <Stagger as="header">
            <Stagger as="div" className="flex flex-wrap gap-3">
              <Up as="span" className={PILL}>HCI Research</Up>
              <Up as="span" className={PILL}>Usability Study</Up>
              <Up as="span" className={PILL}>Virtual Reality</Up>
            </Stagger>
            <Up as="h1" className="mt-8 max-w-4xl text-[2.5rem] leading-[1.25] font-medium! text-[#33333f] md:mt-10 md:text-[3rem]">
              How a VR study revealed emotional connection as a key UX driver
            </Up>
          </Stagger>

          {/* TL;DR */}
          <Stagger className="mt-14 md:mt-20">
            <Up className="flex items-center gap-4">
              <span className="text-[17px] font-medium text-[#33333f]">TL;DR</span>
              <span className="h-px flex-1 bg-[#e4e4e9]" />
            </Up>
            <Stagger as="div" className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-6">
              <Up className={`${CARD} sm:col-span-2`} style={{ backgroundColor: '#f9dbef' }}>
                <p className={CARDTEXT}>
                  Conducted a moderated usability study of Wander VR on Meta Quest 3 with 3 participants
                </p>
              </Up>
              <Up className={`${CARD} sm:col-span-2`} style={{ backgroundColor: '#e7ecfb' }}>
                <p className={CARDTEXT}>
                  Combined SUS, SSQ, and moderated interviews to evaluate both usability and emotional experience
                </p>
              </Up>
              <Up className={`${CARD} sm:col-span-2`} style={{ backgroundColor: '#fbe6a6' }}>
                <p className={CARDTEXT}>
                  SUS score of 63.75, below average with 3/3 users reporting disorientation
                </p>
              </Up>
              <Up className={`${CARD} sm:col-span-2`} style={{ backgroundColor: '#e7ecfb' }}>
                <p className={CARDTEXT}>
                  Discovered that emotional connection and personal relevance can override interface friction entirely
                </p>
              </Up>
              <Up className={`${CARD} sm:col-span-2`} style={{ backgroundColor: '#c8ecce' }}>
                <p className={CARDTEXT}>
                  One participant found her hometown, recognized her own house, and forgot the task she was supposed to complete
                </p>
              </Up>
              <Up className={`${CARD} sm:col-span-2`} style={{ backgroundColor: '#e7ecfb' }}>
                <p className={CARDTEXT}>
                  5 design recommendations spanning onboarding, haptics, UI placement, transitions, and personalization
                </p>
              </Up>
            </Stagger>
          </Stagger>

          {/* Hook */}
          <Stagger className={SECTION}>
            <Up as="h2" className={H2}>She recognized her own house.</Up>
            <Up as="p" className={`${LEAD} max-w-4xl ${BODY}`}>
              P3 was an international student. Task 2 asked participants to search for somewhere personally meaningful to them. She searched for her hometown in India.
            </Up>
            <Up as="p" className={`${STACK} max-w-4xl ${BODY}`}>We weren't prepared for what happened next.</Up>
            <Up as="p" className={`${STACK} max-w-4xl ${BODY}`}>
              <span className="highlight-yellow">
                "This is my home... woww amazing. I don't know when this picture was clicked, but if my dog was outside then you could have seen my dog."
              </span>
            </Up>
            <Up as="p" className={`${STACK} max-w-4xl ${BODY}`}>
              She started looking for her dog. The task was forgotten. She just wanted to explore.
            </Up>
            <Up as="p" className={`${STACK} max-w-4xl ${BODY}`}>
              It was one of those moments where you stop taking notes and just watch.
            </Up>
          </Stagger>

          {/* Why this study */}
          <Stagger className={SECTION}>
            <Up as="h2" className={H2}>Why this study</Up>
            <Up as="p" className={`${LEAD} max-w-4xl ${BODY}`}>
              Most usability research in VR focuses on task completion and error rates. But spatial, immersive systems create experiences that are fundamentally different from screen-based interfaces. They affect users physically, emotionally, and spatially in ways that standard metrics don't capture.
            </Up>
            <Shot src={`${IMG}/wanderapp.png`} alt="Wander VR — the virtual travel app evaluated in this study" className={MEDIA} />
            <Up className={`${MEDIA} rounded-2xl p-8 md:p-12`} style={{ backgroundColor: PINK }}>
              <p className={PINKBODY}>
                The research question: can we evaluate VR usability and emotional engagement together, and what does that combination reveal that either method alone would miss?
              </p>
            </Up>
          </Stagger>

          {/* Method */}
          <Stagger className={SECTION}>
            <Up as="h2" className={H2}>Method</Up>
            <Up className={`${LEAD} max-w-4xl space-y-2`}>
              <p className={BODY}><span className="font-medium text-[#33333f]">Platform:</span> Meta Quest 3</p>
              <p className={BODY}><span className="font-medium text-[#33333f]">Application:</span> Wander VR, a virtual travel app that lets users explore real-world locations in 360°</p>
              <p className={BODY}><span className="font-medium text-[#33333f]">Participants:</span> 3 users with varying levels of VR familiarity</p>
            </Up>
            <Shot src={`${IMG}/arvr-panel.png`} alt="The VR study setup — Meta Quest 3 and the testing environment" className={`${MEDIA} mx-auto max-w-[720px]`} />
            <Up as="p" className={`${MEDIA} max-w-4xl ${BODY}`}>Three methods, each measuring something different:</Up>
            <Up className={`${STACK} max-w-4xl space-y-4`}>
              <p className={BODY}>
                <span className="font-medium text-[#33333f]">SUS (System Usability Scale)</span>: a standardized 10-item questionnaire measuring perceived usability. Gives a comparable benchmark score (industry average: 68). Used here to establish an objective usability baseline.
              </p>
              <p className={BODY}>
                <span className="font-medium text-[#33333f]">SSQ (Simulator Sickness Questionnaire)</span>: measures motion discomfort across nausea, oculomotor, and disorientation subscales. Critical for VR specifically, where physical comfort is part of the experience in a way it isn't for screen-based interfaces.
              </p>
              <p className={BODY}>
                <span className="font-medium text-[#33333f]">Moderated interviews</span>: post-task conversation exploring what participants felt, not just what they did. This is where the emotional data came from.
              </p>
            </Up>
            <Up className={`${MEDIA} rounded-2xl p-8 md:p-12`} style={{ backgroundColor: PINK }}>
              <p className={`font-medium text-[#33333f]`}>Core tasks:</p>
              <ol className="mt-3 list-decimal space-y-1.5 pl-5 marker:text-[#a9819f]">
                <li className={PINKBODY}>Select a location directly from the map</li>
                <li className={PINKBODY}>Find somewhere personally meaningful</li>
                <li className={PINKBODY}>Use random teleportation to explore</li>
              </ol>
              <p className={`mt-6 ${PINKBODY}`}>
                Task 2 was deliberately open-ended. That openness is what made the P3 moment possible.
              </p>
            </Up>
          </Stagger>

          {/* What we found */}
          <Stagger className={SECTION}>
            <Up as="h2" className={H2}>What we found</Up>
            <Up className={`${LEAD} max-w-4xl space-y-6`}>
              <div>
                <p className="font-medium text-[#33333f]">SUS score: 63.75</p>
                <p className={`mt-1 ${BODY}`}>Wander VR scored 63.75, below average, indicating meaningful usability gaps that affect the core experience.</p>
              </div>
              <div>
                <p className="font-medium text-[#33333f]">SSQ findings: motion discomfort present</p>
                <p className={`mt-1 ${BODY}`}>All three participants reported some level of discomfort, primarily disorientation and oculomotor strain. Teleportation transitions were the primary trigger.</p>
              </div>
              <div>
                <p className="font-medium text-[#33333f]">3/3 users felt disoriented</p>
              </div>
            </Up>

            <Up as="p" className="mt-12 text-xl font-medium! text-[#33333f]">Key usability issues identified:</Up>
            <Stagger as="div" className="mt-6 space-y-5">
              <motion.div variants={item} className="rounded-2xl p-8 md:p-10" style={{ backgroundColor: PINK }}>
                <p className={PINKBODY}>
                  <span className="font-medium text-[#33333f]">Difficult navigation</span>: the map interface lacked zoom, pointers were unstable, and selecting locations required more precision than the interface reliably supported.
                </p>
                <p className={`mt-3 ${PINKBODY} italic`}>"The map... lacked details. I could only choose a location and go there."</p>
              </motion.div>
              <motion.div variants={item} className="rounded-2xl p-8 md:p-10" style={{ backgroundColor: PINK }}>
                <p className={PINKBODY}>
                  <span className="font-medium text-[#33333f]">Lack of spatial context</span>: after teleportation, users had no clear indication of where they were or how to orient themselves. The transition was abrupt and left no anchor.
                </p>
              </motion.div>
              <motion.div variants={item} className="rounded-2xl p-8 md:p-10" style={{ backgroundColor: PINK }}>
                <p className={PINKBODY}>
                  <span className="font-medium text-[#33333f]">UI proximity</span>: interface elements defaulted too close to the user's face, creating cognitive fatigue and making certain actions physically uncomfortable.
                </p>
                <p className={`mt-3 ${PINKBODY} italic`}>"The search window is on my face, it's hard to remove it."</p>
              </motion.div>
            </Stagger>
          </Stagger>

          {/* The turning point */}
          <Stagger className={SECTION}>
            <Up as="h2" className={H2}>The turning point</Up>
            <Up as="p" className={`${LEAD} max-w-4xl ${BODY}`}>Task 2 was the moment that reframed everything.</Up>
            <Up as="p" className={`${STACK} max-w-4xl ${BODY}`}>
              P3 searched for her hometown. She found it. She recognized her own house. She stopped completing the task and started exploring, looking for her dog in a Google Street View image she'd never seen before.
            </Up>
            <Clip src={`${IMG}/arvr-video.mp4`} className={MEDIA} />
            <Up as="p" className={`${MEDIA} max-w-4xl ${BODY}`}>
              The usability issues didn't go away. The map was still confusing. The interface was still too close. But none of it mattered because the emotional pull of the content was stronger than every friction point in the system.
            </Up>
            <Up as="p" className={`${STACK} max-w-4xl ${BODY}`}>
              This wasn't unique to P3. All three participants showed heightened engagement during Task 2 compared to Tasks 1 and 3. Personal relevance changed the experience in ways the interface alone couldn't.
            </Up>
          </Stagger>

          {/* Usability alone */}
          <Stagger className={SECTION}>
            <Up as="h2" className={H2}>Usability alone does not define VR experience.</Up>
            <Up as="p" className={`${LEAD} max-w-4xl ${BODY}`}>
              In immersive spatial systems, emotional connection and personal relevance can override interface friction entirely. A user who is emotionally engaged will tolerate and sometimes not even notice usability issues that would derail them in a neutral context.
            </Up>
            <Up as="p" className={`${STACK} max-w-4xl ${BODY}`}>
              This has significant design implications: optimizing purely for usability metrics in VR misses a meaningful lever.{' '}
              <span className="highlight-yellow">The question isn't only "can users do it?", it's "does the experience mean something to them?"</span>
            </Up>
          </Stagger>

          {/* Design recommendations */}
          <Stagger className={SECTION}>
            <Up as="h2" className={H2}>Design recommendations</Up>
            <Stagger as="div" className={`${LEAD} space-y-6`}>
              <motion.div variants={item} className="rounded-2xl p-8 md:p-12" style={{ backgroundColor: PINK }}>
                <p className="text-xl font-medium! text-[#33333f]">To reduce confusion and disorientation:</p>
                <div className="mt-6 space-y-4">
                  <p className={PINKBODY}>
                    <span className="font-medium text-[#33333f]">Micro-onboarding</span>: a 10-15 second spatial calibration tutorial before the session begins. Establishes orientation before users are dropped into an unfamiliar environment.
                  </p>
                  <p className={PINKBODY}>
                    <span className="font-medium text-[#33333f]">Spatial feedback</span>: haptic confirmation and improved teleportation visuals to help users understand where they've arrived and build spatial confidence.
                  </p>
                  <p className={PINKBODY}>
                    <span className="font-medium text-[#33333f]">UI placement</span>: adjust default window distance to match personal space expectations. Interface elements should never feel like they're inside the user's head.
                  </p>
                </div>
              </motion.div>
              <motion.div variants={item} className="rounded-2xl p-8 md:p-12" style={{ backgroundColor: PINK }}>
                <p className="text-xl font-medium! text-[#33333f]">To support emotional engagement:</p>
                <div className="mt-6 space-y-4">
                  <p className={PINKBODY}>
                    <span className="font-medium text-[#33333f]">Smoother transitions</span>: reduce abrupt camera movements during teleportation to minimize motion sickness and allow emotional presence to build rather than being disrupted.
                  </p>
                  <p className={PINKBODY}>
                    <span className="font-medium text-[#33333f]">Personalization</span>: support saved meaningful locations, the ability to return to places that mattered, and exploration paths built around personal history rather than random discovery.
                  </p>
                </div>
              </motion.div>
            </Stagger>
          </Stagger>

          {/* Reflection */}
          <Stagger className={SECTION}>
            <Up as="h2" className={H2}>Reflection</Up>
            <Up className={`${LEAD} max-w-4xl space-y-5`}>
              <p className={BODY}>
                I went into this study expecting to find usability problems. I found them, and the SUS score confirmed what the sessions showed. But the finding I didn't expect was the one that stayed with me.
              </p>
              <p className={BODY}>
                Watching P3 look for her dog in a street view image of her childhood home in India, that wasn't a usability moment. That was a human moment. And it happened inside a system that scored below average on every objective metric we measured.
              </p>
              <p className={BODY}>
                That gap changed how I think about what we're actually designing when we design digital experiences. Usability is the floor, the minimum bar for an experience to function. But what makes an experience matter is something else: familiarity, personal relevance, emotional resonance. The systems that get this right don't just work well. They mean something.
              </p>
              <p className={BODY}>
                For VR specifically and I think for intelligent systems more broadly, that's the design space worth pursuing.
              </p>
            </Up>
          </Stagger>
        </div>
      </div>

      <NextFooter to="/hirello" title="Designing an AI-powered job search platform — 0 to MVP" />
    </CasePage>
  )
}
