# Devayani Gadgil — Portfolio

Vite + React + Framer Motion. Homepage in Manrope; the existing case-study pages still use Inter.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
```

## Homepage structure

The homepage is a persistent shell: gradient, nav and hero stay mounted while only the panel beneath them changes. Each tab is a client-side route, so tabs can be linked to directly.

| Route       | Tab       | Component                     |
| ----------- | --------- | ----------------------------- |
| `/`         | Projects  | `src/tabs/ProjectsTab.jsx`    |
| `/about`    | About     | `src/tabs/InfoTabs.jsx`       |
| `/resume`   | Resume    | `src/tabs/InfoTabs.jsx`       |
| `/linkedin` | Linkedin  | `src/tabs/InfoTabs.jsx`       |

- `src/layouts/HomeLayout.jsx`: shell + tab-panel crossfade (`AnimatePresence`)
- `src/components/home/`: `Hero`, `HeroButton` (hover reveals an icon), `TabNav` (sliding white pill, arrow-key focus), `GradientBackground`
- `src/lib/waveGradient.js`: WebGL2 port of the Framer "Wave Gradient" shader
- `src/data/site.js`: copy, links, tab list and the three featured projects (set `href` when a case study exists)
- `src/index.css`: tokens and all homepage styles

Case-study routes (`/hirello`, `/vrusabilitystudy`, `/umbcstudyabroad`, `/newdrivermode`) are unchanged.

## Motion

Reduced-motion users get a still gradient frame, no pill slide or panel movement, and instant button reveals.
