import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home.jsx'
import NewDriverMode from './pages/NewDriverMode.jsx'
import Hirello from './pages/Hirello.jsx'
import UmbcStudyAbroad from './pages/UmbcStudyAbroad.jsx'
import VrUsabilityStudy from './pages/VrUsabilityStudy.jsx'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
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
        <Route path="/" element={<Home />} />
        <Route path="/newdrivermode" element={<NewDriverMode />} />
        <Route path="/hirello" element={<Hirello />} />
        <Route path="/umbcstudyabroad" element={<UmbcStudyAbroad />} />
        <Route path="/vrusabilitystudy" element={<VrUsabilityStudy />} />
      </Routes>
    </>
  )
}
