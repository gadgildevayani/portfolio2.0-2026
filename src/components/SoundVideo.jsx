import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const ICONS = {
  play: <path d="M8 5.5v13l10-6.5-10-6.5z" fill="currentColor" stroke="none" />,
  pause: <path d="M9 6v12M15 6v12" />,
  soundOn: (
    <>
      <path d="M4 9.5h3l4.5-4v13L7 14.5H4z" fill="currentColor" />
      <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" />
    </>
  ),
  soundOff: (
    <>
      <path d="M4 9.5h3l4.5-4v13L7 14.5H4z" fill="currentColor" />
      <path d="M16 9.5l5 5M21 9.5l-5 5" />
    </>
  ),
}

function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {ICONS[name]}
    </svg>
  )
}

// Looping video that starts muted, with play/pause, a seek slider and a
// sound toggle.
// Reduced-motion users start paused and can press play themselves.
export default function SoundVideo({ src, label, className }) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const [playing, setPlaying] = useState(!reduceMotion)
  const [muted, setMuted] = useState(true)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const video = ref.current
    if (reduceMotion) {
      video.pause()
      setPlaying(false)
    } else {
      video.play().catch(() => setPlaying(false))
    }
  }, [reduceMotion])

  const togglePlay = () => {
    const video = ref.current
    if (video.paused) video.play().catch(() => {})
    else video.pause()
  }

  const seek = (e) => {
    const video = ref.current
    video.currentTime = Number(e.target.value)
    setTime(video.currentTime)
  }

  const toggleSound = () => {
    const video = ref.current
    video.muted = !video.muted
    setMuted(video.muted)
    if (!video.muted && video.paused) video.play().catch(() => {})
  }

  return (
    <div className="sound-video">
      <video
        ref={ref}
        className={className}
        src={src}
        autoPlay={!reduceMotion}
        muted
        loop
        playsInline
        preload="auto"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
      />
      <div className="sound-video__controls">
        <button type="button" onClick={togglePlay} aria-label={playing ? 'Pause video' : 'Play video'}>
          <Icon name={playing ? 'pause' : 'play'} />
        </button>
        <input
          className="sound-video__seek"
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={Math.min(time, duration || 0)}
          onChange={seek}
          aria-label="Seek"
          aria-valuetext={`${Math.round(time)} of ${Math.round(duration)} seconds`}
          style={{ '--progress': `${duration ? (time / duration) * 100 : 0}%` }}
        />
        <button
          type="button"
          onClick={toggleSound}
          aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
          aria-pressed={!muted}
        >
          <Icon name={muted ? 'soundOff' : 'soundOn'} />
        </button>
      </div>
    </div>
  )
}
