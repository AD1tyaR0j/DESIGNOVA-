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
  date: false, // TODO confirm
  teamSize: false, // TODO confirm
  tracks: false, // TODO confirm
  prizes: false, // TODO confirm
  schedule: false, // TODO confirm
  judging: false, // TODO confirm
  committee: false, // TODO confirm
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
  start: '2026-11-14T10:00:00+05:30', // TODO confirm
  end: '2026-11-14T18:00:00+05:30', // TODO confirm
  reportingTime: '09:00 IST', // TODO confirm
  dateLabel: '14 November 2026', // TODO confirm — shown on the hero
  timeLabel: '10:00 – 18:00 IST', // TODO confirm

  teamSize: { min: 2, max: 4, label: '2–4 members' }, // TODO confirm
  durationHours: 8, // TODO confirm (end − start)
  fee: 'To Be Announced', // TODO confirm — e.g. 'Free' or '₹200 per team'

  registration: {
    // Put the live link here (Unstop, Google Form, etc.). While it is empty the
    // Register buttons show "Registration opens soon" instead of navigating.
    url: '', // TODO confirm
    comingSoonText: 'Registration opens soon — follow IEEE GUSB for the announcement.',
  },

  eligibility:
    'Students from all years and disciplines who are into technology, design, creativity, innovation and problem-solving.',

  contact: {
    email: 'ieeegusb@galgotiasuniversity.edu.in',
    people: [
      { name: 'Atharav', phone: '+91 78178 93220' },
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
  { label: 'Design tracks', value: 4 }, // keep in sync with `tracks` below
  { label: 'Team size', value: 4, display: '2–4' }, // TODO confirm
  { label: 'Hours of transformation', value: 8 }, // TODO confirm
  { label: 'Past registrations (QuantCraft)', value: 1400, suffix: '+' },
];

/* ---------------------------------------------------------------- Tracks */
// Sample tracks so the layout can be reviewed. TODO confirm
export const tracks = [
  {
    code: 'T-01',
    title: 'HealthTech',
    text: 'Design experiences that make care, wellbeing and health information easier to reach.',
  },
  {
    code: 'T-02',
    title: 'Sustainable Futures',
    text: 'Help people and campuses cut waste, save energy and live more sustainably.',
  },
  {
    code: 'T-03',
    title: 'EdTech & Campus Life',
    text: 'Reimagine how students learn, collaborate and navigate university life.',
  },
  {
    code: 'T-04',
    title: 'Open Innovation',
    text: 'Bring any real-world problem you care about and transform it into a solution.',
  },
];

/* ---------------------------------------------------------------- Prizes */
export const prizes = [
  { place: '1st', title: 'Winner', reward: 'To Be Announced', tier: 'gold' }, // TODO confirm
  { place: '2nd', title: 'First Runner-up', reward: 'To Be Announced', tier: 'silver' },
  { place: '3rd', title: 'Second Runner-up', reward: 'To Be Announced', tier: 'bronze' },
];
export const specialMentions = {
  title: 'Special mentions',
  text: 'Best UX research · Best visual design · Best pitch — details To Be Announced.', // TODO confirm
};
export const goodies = 'Certificates for every participant, plus goodies for winners.'; // TODO confirm

/* -------------------------------------------------------------- Schedule */
// `time` is IST (24h "HH:MM"). The page works out which slot is live on the day.
export const schedule = [
  { time: '09:00', title: 'Reporting & registration', text: 'Collect your badge and find your team table.' },
  { time: '10:00', title: 'Opening ceremony', text: 'Welcome, rules and problem statements revealed.' },
  { time: '10:30', title: 'Research sprint', text: 'Define the user, the problem and the opportunity.' },
  { time: '12:30', title: 'Mentor checkpoint', text: 'Quick feedback on direction and wireframes.' },
  { time: '13:00', title: 'Lunch break', text: 'Refuel.' },
  { time: '14:00', title: 'Prototype build', text: 'High-fidelity prototype takes shape.' },
  { time: '16:00', title: 'Submissions close', text: 'Prototype link and deck submitted.' },
  { time: '16:15', title: 'Pitches & judging', text: 'Each team presents to the panel.' },
  { time: '17:30', title: 'Results & closing', text: 'Winners announced. Transformation complete.' },
]; // TODO confirm

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
// Photos: /public/images/team/<firstname-lastname>.jpg (600×600).
// TODO confirm names, roles and photos.
export const committee = [
  { name: 'Rudra Pratap Singh', role: 'Role TBA', photo: '/images/team/rudra-pratap-singh.jpg' },
  { name: 'Atharav', role: 'Role TBA', photo: '/images/team/atharav.jpg' },
  { name: 'Member Name', role: 'Role TBA', photo: '/images/team/firstname-lastname.jpg' },
  { name: 'Member Name', role: 'Role TBA', photo: '/images/team/firstname-lastname.jpg' },
  { name: 'Member Name', role: 'Role TBA', photo: '/images/team/firstname-lastname.jpg' },
  { name: 'Member Name', role: 'Role TBA', photo: '/images/team/firstname-lastname.jpg' },
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
    a: 'Teams of 2–4 members (to be confirmed). Solo participants can be matched with a team on the day.',
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
    a: 'Email ieeegusb@galgotiasuniversity.edu.in or call Atharav (+91 78178 93220) or Rudra Pratap Singh (+91 93107 95416).',
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
