/* ==========================================================================
   DESIGNOVA 2026 — ALL SITE CONTENT LIVES IN THIS ONE FILE
   --------------------------------------------------------------------------
   Edit text, dates, tracks, prizes, schedule, FAQs and members here.
   Components read from this file only.

   • Anything still unconfirmed is marked  // TODO confirm
   • Flip the matching flag in `confirmed` to `true` once real details are in;
     while a flag is `false` that section shows a small "PROVISIONAL" tag.
   • Image paths are relative to /public. File names are lowercase and
     case-sensitive (Vercel/Linux hosting will not find "Venue.JPG").
   ========================================================================== */

export const confirmed = {
  date: true,
  teamSize: true,
  tracks: true,
  prizes: true,
  schedule: true,
  judging: false, // TODO confirm
  committee: true,
  faqs: false, // TODO confirm
};

export const event = {
  name: 'DESIGNOVA',
  year: '2026',
  type: 'Designathon',
  tagline: 'Design. Innovate. Transform.',
  organiser: 'IEEE GUSB Computer Society',
  organiserLong:
    'IEEE Galgotias University Student Branch (GUSB) Computer Society, Galgotias University',
  presentsLine: 'IEEE GUSB Computer Society presents',

  // Times are ISO 8601 with the IST offset (+05:30). The countdown, the LIVE /
  // COMPLETE badges and the schedule "NOW" marker are all driven by these.
  start: '2026-09-28T14:00:00+05:30',
  end: '2026-09-28T18:00:00+05:30',
  reportingTime: '14:00 IST',
  dateLabel: '28 September 2026',
  timeLabel: '14:00 – 18:00 IST',

  teamSize: { min: 2, max: 3, label: '2–3 members' },
  durationHours: 4,
  fee: 'To Be Announced', // TODO confirm — e.g. 'Free' or '₹200 per team'

  registration: {
    // Put the live link here (Unstop, Google Form, etc.). While it is empty the
    // Register buttons show "Registration opens soon" instead of navigating.
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSdMvxr6sKXv3dZgRuOl37qYIlXev3YXhepXWWnfOsmlJDfqXg/viewform',
    comingSoonText: 'Registration opens soon — follow IEEE GUSB for the announcement.',
  },

  eligibility:
    'Students from all years and disciplines who are into technology, design, creativity, innovation and problem-solving.',

  contact: {
    email: 'ieeegusb@galgotiasuniversity.edu.in',
    people: [
      { name: 'Jitansh Binwal', phone: '+91 78951 80806' },
      { name: 'Rudra Pratap Singh', phone: '+91 93107 95416' },
    ],
  },
};

/* ----------------------------------------------------------------- About */
export const about = {
  heading: 'What is a designathon?',
  intro:
    'A designathon is a hackathon for designers and problem-solvers. Instead of shipping production code, teams take a real-world problem and design a user-centred digital solution — then pitch it to a panel of judges.',
  steps: [
    { label: 'Research', text: 'Understand the problem and the people who live with it.' },
    { label: 'Wireframe', text: 'Map flows and structure before any pixels are polished.' },
    { label: 'Prototype', text: 'Build a high-fidelity, clickable prototype (Figma or similar).' },
    { label: 'Pitch', text: 'Present the journey from problem to solution to the judges.' },
  ],
  whyHeading: 'Why DESIGNOVA?',
  why: [
    'Every great product starts as a quiet idea. DESIGNOVA is where that idea transforms into something powerful.',
    'No code required — you are judged on UX, visual design and how well you tell the story.',
    'Mentors, judges and peers from every discipline, in one room, for one day.',
  ],
};

/* ----------------------------------------------------------------- Stats */
// `value` is counted up on scroll. `prefix`/`suffix` wrap the number.
// Use `display` to show text instead of a counted number (e.g. '2–4').
export const stats = [
  { label: 'Design tracks', value: 6 }, // keep in sync with `tracks` below
  { label: 'Team size', value: 3, display: '2–3' },
  { label: 'Hours of transformation', value: 4, display: '4.5' },
  { label: 'Event date', value: 0, display: '28 Sep', suffix: ' 2026' },
];

/* ---------------------------------------------------------------- Tracks */
export const tracks = [
  {
    code: 'T-01',
    title: 'UI Design',
    stone: 'Power Stone',
    text: 'Unleash raw creative force. Craft interfaces that command attention and dominate the visual landscape with unmatched power.',
    tags: ['Visual Design', 'Components'],
  },
  {
    code: 'T-02',
    title: 'UX Research',
    stone: 'Space Stone',
    text: 'Navigate dimensions of user behavior. Teleport beyond assumptions to discover insights that reshape the user journey.',
    tags: ['User Testing', 'Research'],
  },
  {
    code: 'T-03',
    title: 'Brand Identity',
    stone: 'Reality Stone',
    text: 'Bend reality to your vision. Build brand worlds that reshape how people perceive and connect with products.',
    tags: ['Branding', 'Identity'],
  },
  {
    code: 'T-04',
    title: 'Product Design',
    stone: 'Soul Stone',
    text: 'Connect with the soul of the user. Design products with empathy, purpose, and an experience that truly resonates.',
    tags: ['End-to-End', 'Systems'],
  },
  {
    code: 'T-05',
    title: 'Motion Design',
    stone: 'Time Stone',
    text: 'Manipulate time itself. Craft animations and transitions that guide users through temporal experiences with precision.',
    tags: ['Animation', 'Interaction'],
  },
  {
    code: 'T-06',
    title: 'Design Systems',
    stone: 'Mind Stone',
    text: 'Achieve cosmic-level intelligence. Build scalable design systems that bring order to the multiverse of components.',
    tags: ['Tokens', 'Scalability'],
  },
];

/* ---------------------------------------------------------------- Prizes */
export const prizes = [
  { place: '1st', title: 'Winner', reward: '₹3,000', tier: 'gold' },
  { place: '2nd', title: 'First Runner-up', reward: '₹2,000', tier: 'silver' },
  { place: '3rd', title: 'Second Runner-up', reward: '₹1,000', tier: 'bronze' },
];
export const specialMentions = {
  title: 'Special mentions',
  text: 'Best UX research · Best visual design · Best pitch — details To Be Announced.', // TODO confirm
};
export const goodies = 'Certificates for every participant, plus goodies for winners.'; // TODO confirm

/* -------------------------------------------------------------- Schedule */
// `time` is IST (24h "HH:MM"). The page works out which slot is live on the day.
export const schedule = [
  { time: '14:00', slot: '01', title: 'Registration & Team Check-in', text: 'Attendance, team verification, seating (2:00 – 2:15 PM)', emoji: '📋' },
  { time: '14:15', slot: '02', title: 'Opening', text: 'Welcome & IEEE GUSB CS introduction (2:15 – 2:25 PM)', emoji: '🚀' },
  { time: '14:25', slot: '03', title: 'Designathon Briefing', text: 'Rules, tracks, judging criteria (2:25 – 2:35 PM)', emoji: '📜' },
  { time: '14:35', slot: '04', title: 'Challenge Reveal', text: 'Problem statements released (2:35 – 2:45 PM)', emoji: '⚡' },
  { time: '14:45', slot: '05', title: '1. EMPATHIZE', text: 'Research, observation, user needs (2:45 – 3:15 PM)', emoji: '🔍' },
  { time: '15:15', slot: '06', title: '2. DEFINE', text: 'Finalize problem statement (3:15 – 3:35 PM)', emoji: '🎯' },
  { time: '15:35', slot: '07', title: '3. IDEATE', text: 'Brainstorm and select solution (3:35 – 4:05 PM)', emoji: '💡' },
  { time: '16:05', slot: '08', title: '4. Prototype', text: 'Build digital / physical / phygital prototype (4:05 – 5:00 PM)', emoji: '🛠️' },
  { time: '17:00', slot: '09', title: 'Final Submission', text: 'Submit prototype (5:00 – 5:10 PM)', emoji: '⏱️' },
  { time: '17:10', slot: '10', title: 'Team Presentations', text: '3 min presentation + 2 min Q&A (5:10 – 5:45 PM)', emoji: '🎤' },
  { time: '17:45', slot: '11', title: 'Jury Evaluation', text: 'Final scoring (5:45 – 5:55 PM)', emoji: '⚖️' },
  { time: '17:55', slot: '12', title: 'Results & Recognition', text: 'Winner, runner-up & special awards (5:55 – 6:00 PM)', emoji: '🏆' },
];

/* --------------------------------------------------------------- Judging */
// `weight` is the percentage shown on each power bar.
export const judging = [
  { title: 'Problem understanding & research', weight: 20 },
  { title: 'UX & usability', weight: 25 },
  { title: 'Visual design', weight: 20 },
  { title: 'Innovation', weight: 15 },
  { title: 'Prototype quality', weight: 10 },
  { title: 'Presentation', weight: 10 },
]; // TODO confirm

/* ----------------------------------------------------------------- Venue */
export const venue = {
  name: 'Galgotias University',
  address:
    'Plot No. 2, Yamuna Expressway, opposite Buddha International Circuit, Sector 17A, Greater Noida, Uttar Pradesh 203201',
  // Full address: a short "Galgotias University, Greater Noida" query resolves to a neighbouring campus.
  mapsQuery: 'Galgotias University, Plot No. 2, Yamuna Expressway, Sector 17A, Greater Noida, Uttar Pradesh 203201',
};

/* ------------------------------------------------------------- Committee */
export const committee = [
  { name: 'Ansh Vashisth', role: 'IEEE GUSB Chairperson', avatar: '/images/team/ansh-vashisth-hulk.png', photo: '/images/team/ansh-vashisth.png' },
  { name: 'Kritika Jha', role: 'IEEE GUSB Vice-Chairperson', avatar: '/images/team/kritika-jha-hulk.png', photo: '/images/team/kritika-jha-real.png' },
  { name: 'Mohammad Rahil', role: 'IEEE GUSB Secretary', avatar: '/images/team/mohammad-rahil-hulk.png', photo: '/images/team/mohammad-rahil-real.png', photoClass: 'object-top translate-y-10 scale-95' },
  { name: 'Atharav Singh', role: 'IEEE GUSB Treasurer', avatar: '/images/team/atharav-singh-hulk.png', photo: '/images/team/atharav-singh-real.png' },
  { name: 'Tarun Khushwaha', role: 'IEEE GUSB Techlead', avatar: '/images/team/tarun-khushwaha-hulk.png', photo: '/images/team/tarun-khushwaha-real.png', photoClass: 'object-top translate-y-10 scale-95' },
  { name: 'Jitansh Binwal', role: 'Organizer', avatar: '/images/team/jitansh-binwal-hulk.png', photo: '/images/team/jitansh-binwal-real.png' },
  { name: 'Rudra Pratap Singh', role: 'Organizer', avatar: '/images/team/rudra-pratap-singh-hulk.png', photo: '/images/team/rudra-pratap-singh-real.png' },
];

/* ------------------------------------------------------------------- FAQ */
export const faqs = [
  {
    q: 'Who can take part?',
    a: 'Students from all years and disciplines. If you like technology, design, creativity or solving problems, you are welcome.',
  },
  {
    q: 'Do I need to know how to code?',
    a: 'No. DESIGNOVA is a designathon — you design a solution and build a clickable prototype (for example in Figma). Production code is not expected.',
  },
  {
    q: 'How big can my team be?',
    a: 'Teams of 2–3 members. Solo participants can be matched with a team on the day.',
  },
  {
    q: 'Is there a registration fee?',
    a: 'Fee details will be announced with the registration link.',
  },
  {
    q: 'What should I bring?',
    a: 'A laptop with your design tools installed, a charger and your college ID.',
  },
  {
    q: 'How will we be judged?',
    a: 'On problem understanding and research, UX and usability, visual design, innovation, prototype quality and your presentation. See the judging section for weightings.',
  },
  {
    q: 'Who do I contact with questions?',
    a: 'Email ieeegusb@galgotiasuniversity.edu.in or call Jitansh Binwal (+91 78951 80806) or Rudra Pratap Singh (+91 93107 95416).',
  },
];

/* ----------------------------------------------------------------- Media */
// Supplied by the organisers. Missing images fall back to a labelled HUD
// placeholder, so the site still looks finished before they arrive.
export const media = {
  logo: '/images/designova-logo.png', // transparent PNG, ~1600×500
  partnerLogos: [
    { name: 'Galgotias University', src: '/images/galgotias-logo.png' },
    { name: 'IEEE GUSB', src: '/images/ieee-gusb-logo.png' },
    { name: 'IEEE Computer Society', src: '/images/ieee-cs-logo.png' },
  ],
};

// Optional ambient music + impact SFX (royalty-free, supplied by organisers).
// Set `enabled: true` after dropping the files into /public/audio/.
export const audio = {
  enabled: false,
  ambient: '/audio/ambient.m4a',
  impact: '/audio/impact.m4a', // optional — leave the file out to skip SFX
  volume: 0.35,
};

/* ------------------------------------------------------------ Navigation */
export const nav = [
  { id: 'about', label: 'About' },
  { id: 'tracks', label: 'Tracks' },
  { id: 'prizes', label: 'Prizes' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'judging', label: 'Judging' },
  { id: 'team', label: 'Team' },
  { id: 'faq', label: 'FAQ' },
];
