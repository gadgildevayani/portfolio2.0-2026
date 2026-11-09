import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import HomeLayout from './layouts/HomeLayout.jsx'
import CaseLayout from './layouts/CaseLayout.jsx'
import ProjectsTab from './tabs/ProjectsTab.jsx'
import { AboutTab, ResumeTab } from './tabs/InfoTabs.jsx'
import HirelloOnboarding from './pages/HirelloOnboarding.jsx'
import HirelloDashboard from './pages/HirelloDashboard.jsx'
import WanderVr from './pages/WanderVr.jsx'
import { TABS } from './data/site.js'

const TAB_PATHS = new Set(TABS.filter((t) => t.path).map((t) => t.path))

function ScrollManager() {
  const { pathname, hash } = useLocation()
  const prevPath = useRef(pathname)
  useEffect(() => {
    const from = prevPath.current
    prevPath.current = pathname
    // Switching homepage tabs keeps the reader where they are
    if (TAB_PATHS.has(from) && TAB_PATHS.has(pathname) && !hash) return
    if (hash) {
      // let the target render, then scroll to it
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route element={<HomeLayout />}>
          <Route index element={<ProjectsTab />} />
          <Route path="about" element={<AboutTab />} />
          <Route path="resume" element={<ResumeTab />} />
        </Route>
        <Route element={<CaseLayout />}>
          <Route path="hirello-onboarding" element={<HirelloOnboarding />} />
          <Route path="hirello-dashboard" element={<HirelloDashboard />} />
          <Route path="vrusabilitystudy" element={<WanderVr />} />
        </Route>
        {/* Old portfolio URLs */}
        <Route path="/hirello" element={<Navigate to="/hirello-onboarding" replace />} />
        <Route path="/wander-vr" element={<Navigate to="/vrusabilitystudy" replace />} />
        <Route path="/newdrivermode" element={<Navigate to="/" replace />} />
        <Route path="/umbcstudyabroad" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
