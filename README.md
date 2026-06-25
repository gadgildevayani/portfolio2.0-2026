# Devayani Gadgil — Bento Portfolio

Single-page bento portfolio built with Vite, React, Framer Motion, and Tailwind CSS v4. Inter throughout.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
```

## Layout

CSS grid bento (`.bento` in `src/index.css`), per the Figma wireframe:

- **Profile** (warm yellow, tall left) — hanging ID badge with strap + clip; swings toward the cursor on mouse move with spring physics, settles back on leave (`src/components/IDBadge.jsx`)
- **Tagline** (sage) — headline with a marker-stroke highlight on "intelligent systems"
- **LinkedIn** (brand blue) — whole card links out, arrow chip top-right
- **Beyond work** (neutral) — slow crossfade photo carousel from `funstuff/` (`PhotoCarousel.jsx`)
- **Resume** (coral) — mini resume document; tilts and lifts on hover; links to the Drive resume
- **Scroll down** (lavender) — circular "SCROLL DOWN" text orbiting a still arrow, 24s rotation (`ScrollBadge.jsx`)

Below: four `Project 1–4` placeholder cards (`#projects`) and a footer with copyright + LinkedIn / Email / Resume.

Breakpoints: 1-column < 700px, 2-column 700–1023px, full wireframe grid ≥ 1024px.

## Motion

Cards stagger-fade on load (0.07s stagger, 0.6s ease-out). Hovers are 0.2s with no bounce. Signature motions: the badge swing (spring, ±9°) and the scroll-badge rotation (linear, continuous). `prefers-reduced-motion` collapses all of it.

## Asset notes

- **No resume preview image exists in `assets/`** — the resume card renders a styled HTML mini-document (real resume content) instead. Drop a real screenshot at e.g. `public/assets/images/resume-preview.png` and swap it into `ResumeDoc` in `src/App.jsx` if preferred.
- Badge photo: `devayani-circle.png`. Carousel: 9 photos from `assets/images/funstuff/`.
- Images are served from `public/assets/images/` (copied from the repo-root `assets/`).
