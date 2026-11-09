import { Outlet } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Footer from '../components/home/Footer.jsx'
import FooterGarden from '../components/home/FooterGarden.jsx'
import TabNav from '../components/home/TabNav.jsx'
import ExploreMore from '../components/case/ExploreMore.jsx'

/*
 * Shell for case-study pages: the homepage's nav (Projects as a back link),
 * then the case, "Explore more" (the other projects), footer and garden.
 */
export default function CaseLayout() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="site">
        <header className="site__header">
          <TabNav back="/" />
        </header>
        <main className="site__main site__main--case">
          <Outlet />
          <ExploreMore />
        </main>
        <Footer />
        <FooterGarden />
      </div>
    </MotionConfig>
  )
}
