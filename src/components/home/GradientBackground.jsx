import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { createWaveGradient } from '../../lib/waveGradient.js'

// Overrides for GradientWave.js's property controls — the instance values
// Tabfolio uses (the file's own defaults are the saturated Framer preset).
const OVERRIDES = {
  colors: ['#D7A9EB', '#FFFFFF', '#C0D8ED', '#FFFFFF'],
  seed: 65,
  waveSpeed: 1.88,
  waveFreqX: 6,
  waveFreqY: 6,
  waveAngle: -10,
  waveAmplitude: 0.5,
  maskSoftness: 2,
  blendAmount: 0.68,
}

export default function GradientBackground() {
  const canvasRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const [fallback, setFallback] = useState(false)

  useEffect(() => {
    const destroy = createWaveGradient(canvasRef.current, {
      ...OVERRIDES,
      animate: !reduceMotion,
    })
    if (!destroy) {
      setFallback(true)
      return
    }
    return destroy
  }, [reduceMotion])

  return (
    <div className={`aurora${fallback ? ' aurora--fallback' : ''}`} aria-hidden="true">
      <canvas ref={canvasRef} className="aurora__canvas" />
    </div>
  )
}
