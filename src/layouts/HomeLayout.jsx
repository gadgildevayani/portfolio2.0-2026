import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import GradientBackground from '../components/home/GradientBackground.jsx'
import Hero from '../components/home/Hero.jsx'
import TabNav from '../components/home/TabNav.jsx'
import Footer from '../components/home/Footer.jsx'
import FooterGarden from '../components/home/FooterGarden.jsx'

const EASE = [0.22, 1, 0.36, 1]

const panel = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.32, ease: EASE } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.16, ease: 'easeIn' } },
}

/*
 * Persistent shell for the homepage tabs: gradient, nav, hero and footer stay
 * mounted; only the tab panel swaps (with a short crossfade) on route change.
 */
export default function HomeLayout() {
  const location = useLocation()
  const outlet = useOutlet()

  return (
    <MotionConfig reducedMotion="user">
      <div className="site">
        <GradientBackground />
        <header className="site__header">
          <TabNav />
        </header>
        <main className="site__main">
          <Hero />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={location.pathname} className="tab-panel" {...panel}>
              {outlet}
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
        <FooterGarden />
      </div>
    </MotionConfig>
  )
}
