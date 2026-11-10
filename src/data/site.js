export const SITE = {
  name: 'Devayani Gadgil',
  tagline: 'I’m a product designer. I research, design, and prototype how people interact with AI.',
  portrait: '/assets/images/profile-photo.webp',
  email: 'gadgil.devayani@gmail.com',
  resumeUrl: 'https://drive.google.com/file/d/1Oqvzi-TPwVeI0iCgSwk3mBoWpR1DGkjg/view?usp=sharing',
  linkedinUrl: 'https://www.linkedin.com/in/devayanigadgil/',
}

// Tabs beneath the hero. Tabs with a `path` are routes (so they can be linked
// to directly; the hero lives in the shared layout and never re-renders on
// switch). Tabs with an `href` are external links.
export const TABS = [
  { label: 'Projects', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Resume', path: '/resume' },
  { label: 'LinkedIn', href: SITE.linkedinUrl }, // external: opens the profile
]

// Homepage selected work. `href` stays null until each case study page exists.
// `gradient` fills the card; `media` is the framed preview inset on top of it.
const IMG = '/assets/images'

export const PROJECTS = [
  {
    id: 'hirello-onboarding',
    title: 'What Should an AI Assistant Ask Before It Can Help?',
    eyebrow: 'Hirello.ai',
    href: '/hirello-onboarding',
    gradient: `${IMG}/projectcards/gradients/purple-pink.png`,
    media: { type: 'video', src: `${IMG}/hirello/hirello-onboarding-card.mp4` },
  },
  {
    id: 'hirello-dashboard',
    title: 'How Do You Bring Clarity to a Feature-Heavy AI Dashboard?',
    eyebrow: 'Hirello.ai',
    href: '/hirello-dashboard',
    gradient: `${IMG}/projectcards/gradients/purple-blue.png`,
    media: { type: 'video', src: `${IMG}/hirello/hirello-dashboard-card.mp4` },
  },
  {
    id: 'wander-vr',
    title: 'How a VR study revealed emotional connection as a key UX driver',
    eyebrow: 'UMBC',
    href: '/vrusabilitystudy',
    gradient: `${IMG}/projectcards/gradients/multicolor.png`,
    media: {
      type: 'image',
      src: `${IMG}/vrusabilitystudy/arvr-panel.png`,
      alt: 'Researchers observing a participant during a VR usability session',
    },
  },
]

// About tab: photo carousel (left) and intro copy (right). Photos crop from the
// top unless `position` (CSS object-position) says otherwise.
const FUN = '/assets/images/funstuff/web'

export const ABOUT = {
  greeting: 'Hi, I’m Devayani.',
  headline:
    'A product designer and researcher curious about where technology is headed and how it will shape our everyday lives.',
  paragraphs: [
    'I come from a computer science background, but I’ve always been more curious about how people interact with technology.',
    'That curiosity led me to study Human-Centered Computing and eventually into product design, where I enjoy working through the details of how an experience should look, feel, and behave.',
    'I’m particularly interested in human–AI interaction and the evolving relationship between people and intelligent systems. Lately, I’ve also been exploring human–robot interaction and what designing for physical, intelligent systems might look like.',
    'Outside of work, I love exploring new places, painting, and capturing little moments through photography.',
  ],
  photos: [
    { src: `${FUN}/california.jpg`, caption: 'postcard from San Francisco', alt: 'Devayani on a steep San Francisco street lined with houses' },
    { src: `${FUN}/fall.jpg`, caption: 'my favorite kind of fall day', position: 'center bottom', alt: 'Devayani under bright orange autumn trees with leaves covering the ground' },
    { src: `${FUN}/painting.jpg`, caption: 'one quiet afternoon at home', position: 'center 55%', alt: 'A small seascape painting on an easel beside pink tulips' },
    { src: `${FUN}/rockarch.jpg`, caption: 'always looking for places like this', alt: 'A natural rock arch framing turquoise water and green trees' },
    { src: `${FUN}/yosemite2.jpg`, caption: 'a very happy me in Yosemite', alt: 'Devayani sitting on a rock wall with Yosemite Valley behind her' },
    { src: `${FUN}/watewrfall.jpg`, caption: 'where the water glowed', alt: 'A river winding through a tall green forest' },
    { src: `${FUN}/waterloo.jpg`, caption: 'the kind of view I stop for', alt: 'An orange autumn tree beside a bright blue lake' },
  ],
}

// Resume tab (content from Devayani_Gadgil_Resume.pdf)
export const RESUME = {
  experience: [
    {
      role: 'Founding Product Designer',
      company: 'Hirello.ai',
      dates: 'Aug 2025 – Jul 2026',
      location: 'Remote',
      icon: 'sparkle',
      summary:
        'Owned product design from concept to MVP for an AI career coaching platform. Designed core onboarding, dashboard, and AI-assisted experiences, using user research to inform product direction and establishing the design system.',
    },
    {
      role: 'UX Designer',
      company: 'University of Maryland, Baltimore County',
      dates: 'Apr 2024 – May 2025',
      location: 'Baltimore, MD',
      icon: 'cap',
      summary:
        'Redesigned study-abroad workflows and led the migration to a new administration platform, reducing processing time by 30% and saving 15+ staff hours each week.',
    },
    {
      role: 'UX Research Intern',
      company: 'LePal.ai',
      dates: 'Jul 2024 – Dec 2024',
      location: 'Remote',
      icon: 'heart',
      summary:
        'Conducted mixed-methods research for an AI wellness app, combining 10 interviews, 50+ surveys, and usability testing to identify pain points and inform MVP features.',
    },
    {
      role: 'UI/UX Designer',
      company: 'Inquizity',
      dates: 'Jun 2022 – May 2023',
      location: 'Mumbai, India',
      icon: 'stack',
      summary:
        'Redesigned inventory and planning workflows for a B2B supply-chain platform, simplifying complex interfaces for enterprise users.',
    },
  ],
  tools: [
    { name: 'Figma', use: 'UI design, design systems', icon: 'figma' },
    { name: 'Claude Code', use: 'Code-based prototyping', icon: 'claude' },
    { name: 'Cursor', use: 'Front-end development, prototyping', icon: 'cursor' },
    { name: 'Framer', use: 'Web design, development', icon: 'framer' },
    { name: 'Miro', use: 'Brainstorming, collaboration', icon: 'miro' },
    { name: 'Jira', use: 'Project management', icon: 'jira' },
  ],
  skills: [
    {
      group: 'Design',
      items: [
        'Interaction Design',
        'Human–AI Interaction',
        'Motion Design',
        'User Flows',
        'Storyboarding',
        'Sketching',
        'Wireframing',
        'Low-Fidelity Prototyping',
        'High-Fidelity Prototyping',
        'Design Systems',
        'Information Architecture',
        'Accessibility/WCAG',
      ],
    },
    {
      group: 'Research',
      items: [
        'User Interviews',
        'Usability Testing',
        'Surveys',
        'Mixed-Methods Research',
        'Journey Mapping',
        'A/B Testing',
        'Heuristic Evaluation',
        'Competitive Analysis',
      ],
    },
    { group: 'Technical', items: ['HTML', 'CSS', 'JavaScript', 'React'] },
    {
      group: 'Methods',
      items: [
        'User-Centered Design',
        'Design Thinking',
        'Data-Driven Design',
        'Stakeholder Communication',
        'Cross-Functional Collaboration',
        'Agile/Scrum',
      ],
    },
  ],
  education: [
    {
      degree: 'Master of Science, Human-Centered Computing',
      school: 'University of Maryland, Baltimore County',
      dates: 'Aug 2023 – May 2025',
    },
    {
      degree: 'Bachelor of Science, Computer Science',
      school: 'University of Mumbai, India',
      dates: 'Jun 2019 – May 2022',
    },
  ],
}
