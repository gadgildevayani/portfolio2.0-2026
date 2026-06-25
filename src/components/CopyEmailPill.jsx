import { useState, useRef, useEffect } from 'react'

const EMAIL = 'gadgil.devayani@gmail.com'

/**
 * Small utility "sticker" inside the yellow hero card. Copies the email to the
 * clipboard and confirms inline — no toast, no alert. Keyboard-operable
 * (it's a real <button>, so Enter/Space work for free).
 *
 * The tooltip shows on hover/focus via CSS (group-hover / group-focus-within).
 * After a copy we set `dismissed`, which forces it hidden (!important beats the
 * group-hover variant) until the pointer/focus leaves and returns.
 */
export default function CopyEmailPill() {
  const [copied, setCopied] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const suppressTip = copied || dismissed

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
    } catch {
      // older / insecure-context fallback
      const ta = document.createElement('textarea')
      ta.value = EMAIL
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setDismissed(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 1800)
  }

  const resetDismiss = () => setDismissed(false)

  return (
    <div
      className="group relative"
      onMouseLeave={resetDismiss}
    >
      {/* tooltip — supplementary only; the icon + label already explain the action */}
      <span
        role="tooltip"
        className={`pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 -translate-y-1 whitespace-nowrap rounded-md bg-[#2c2925] px-2.5 py-1 text-[11.5px] font-medium text-white opacity-0 shadow-sm transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 ${
          suppressTip ? '!-translate-y-1 !opacity-0' : ''
        }`}
      >
        Click to copy
        <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-[#2c2925]" />
      </span>

      <button
        type="button"
        onClick={copy}
        onBlur={resetDismiss}
        aria-label="Copy email address"
        className="pointer-events-auto flex items-center gap-2.5 rounded-full border border-[#1b1a17]/10 bg-[#fffdf7] px-4.5 py-2.5 text-[13.5px] font-medium text-(--ink) shadow-[0_2px_8px_rgba(94,70,10,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(94,70,10,0.2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--card-blue)"
      >
        {copied ? (
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 text-[#236626]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 text-(--muted)"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="9" y="9" width="11" height="11" rx="2" />
            <path d="M5 15V5a2 2 0 0 1 2-2h10" />
          </svg>
        )}
        <span>{copied ? 'Email copied' : EMAIL}</span>
      </button>
    </div>
  )
}
