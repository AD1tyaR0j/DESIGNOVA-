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
    problemStatements: [
      {
        id: 'PS-01',
        title: 'The 60-Second Campus',
        subtitle: 'You have 60 seconds. Find what you need.',
        context: 'Students constantly switch between portals, notices, PDFs, WhatsApp groups and university platforms to find basic information.',
        challenge: 'Design a digital experience that enables a student to discover and act upon critical campus information within 60 seconds or less.',
        constraint: 'You cannot simply combine every existing portal into one dashboard. You must rethink how information is organized and discovered.',
        targetUser: 'University students constantly navigating fragmented campus notifications, lecture updates, and administrative channels.',
        deliverables: [
          'High-velocity contextual discovery flow prioritizing urgent, time-sensitive campus info',
          'Rethought information architecture that eliminates multi-portal switching',
          'Single-tap actions for time-critical student tasks (room shifts, deadline alerts, forms)',
          'Glanceable mobile UI engineered for speed, low cognitive friction, and instant clarity'
        ],
        focus: ['Information Architecture', 'Discovery Speed', 'Cognitive Load Reduction'],
        difficulty: 'Level 3 // Core Challenge',
        expectedOutput: 'Interactive Mobile Prototype + Discovery Architecture Diagram + Design Rationale'
      },
      {
        id: 'PS-02',
        title: 'Survive Your First Week',
        subtitle: 'Zero-Knowledge First-Year Campus Orientation & Onboarding',
        context: 'Design a digital experience for a student entering university for the first time. The student needs to find classrooms, understand schedules, discover facilities, meet people, access academic information and understand campus processes.',
        challenge: 'Create an interface that helps a first-year student become independently functional within their first week.',
        constraint: 'Assume the student knows nothing about the campus ecosystem. You cannot rely on pre-existing knowledge of buildings, acronyms, or administrative hierarchies.',
        targetUser: 'Incoming freshers, first-year undergraduate and postgraduate students, and campus newcomers.',
        deliverables: [
          'First-week progressive onboarding journey (day-by-day revelation of critical daily necessities)',
          'Intuitive classroom finder & campus facilities wayfinding guide',
          'Schedule decoder & academic process guide (clarifying credits, portals, and attendance rules)',
          'Peer networking & student community discovery touchpoints'
        ],
        focus: ['First-Year Onboarding', 'Zero-Knowledge UX', 'Spatial Wayfinding', 'Process Simplification'],
        difficulty: 'Level 3 // Core Challenge',
        expectedOutput: 'Interactive Mobile Prototype + 7-Day Onboarding Architecture + User Journey Map'
      },
      {
        id: 'PS-03',
        title: 'The Deadline War',
        subtitle: 'Urgent vs. Important Attention Orchestration',
        context: 'Assignments, examinations, attendance requirements, registrations and events compete for a student\'s attention.',
        challenge: 'Design an interface that helps students distinguish between urgent, important, upcoming and irrelevant information.',
        targetUser: 'Undergraduate and graduate students balancing heavy coursework, exam dates, attendance thresholds, and extracurricular deadlines.',
        deliverables: [
          'Visual priority matrix separating critical academic risks from low-urgency noise',
          'Temporal timeline view highlighting cascading and overlapping deadlines',
          'Smart attendance threshold alert system with proactive recovery suggestions',
          'Calm, anxiety-reducing notification center and action-oriented triage workflow'
        ],
        focus: ['Attention Hierarchy', 'Temporal Visualization', 'Anxiety-Reducing UI'],
        difficulty: 'Level 4 // Advanced',
        expectedOutput: 'Interactive Prioritization Interface + Notification Hierarchy Spec + User Flow'
      },
      {
        id: 'PS-04',
        title: 'One Task, Zero Confusion',
        subtitle: 'Radical Simplification of Complex University Bureaucracy',
        context: 'Choose one complicated university task—for example registration, examination form submission, leave application or event registration.',
        challenge: 'Redesign the complete experience so that a first-time user can complete it without external assistance.',
        targetUser: 'First-year college students, transfer students, and non-technical campus members.',
        deliverables: [
          'End-to-end task flow redesign of one high-friction campus bureaucratic process',
          'Zero-jargon, step-by-step guided wizard with contextual inline validation and error prevention',
          'Transparent status tracker with real-time approvals and SLA milestones',
          'Self-sufficient experience eliminating the need for helpdesk queries or peer guidance'
        ],
        focus: ['Workflow Simplification', 'Error Prevention', 'Self-Sufficient UX'],
        difficulty: 'Level 3 // Practical Design',
        expectedOutput: 'Multi-Step Guided Prototype + Error State Matrix + Task Journey Map'
      },
      {
        id: 'PS-05',
        title: 'Design for the Overloaded',
        subtitle: 'Limited & Fragmented Attention Under Extreme Multi-Tasking',
        context: 'A student is simultaneously attending class, receiving notifications, checking an assignment deadline and trying to locate a room.',
        challenge: 'Design an interface that remains understandable when the user\'s attention is limited and fragmented.',
        targetUser: 'Busy students navigating fast-paced campus environments with fragmented focus and divided attention.',
        deliverables: [
          'Micro-glanceable interface optimized for 2-to-3 second divided attention spans',
          'Context-aware ambient mode (auto-sensing active lecture vs transit vs immediate urgency)',
          'Single-thumb ergonomic controls and high-contrast spatial wayfinding cues',
          'Graceful state resumption allowing users to pick up interrupted flows instantly'
        ],
        focus: ['Fragmented Attention Design', 'Glanceability', 'Ambient Context Awareness'],
        difficulty: 'Level 4 // Cognitive UI',
        expectedOutput: 'Glanceable Interface Spec + Context Switching States + Mobile Interaction Kit'
      }
    ]
  },
  {
    code: 'T-02',
    title: 'UX Research',
    stone: 'Space Stone',
    text: 'Navigate dimensions of user behavior. Teleport beyond assumptions to discover insights that reshape the user journey.',
    tags: ['User Testing', 'Research'],
    problemStatements: [
      {
        id: 'PS-01',
        title: 'The Problem Behind the Problem',
        subtitle: 'Deconstructing Surface Complaints into Root Systemic Causes',
        context: 'Students constantly complain: "The canteen is bad." "The portal is confusing." "The Wi-Fi doesn\'t work." "The process takes too long."',
        challenge: 'Select one common complaint and discover the real underlying problem beneath the surface symptom.',
        targetUser: 'Students and campus community members whose complaints are frequently dismissed or misdiagnosed by superficial fixes.',
        deliverables: [
          'Qualitative field inquiry comparing superficial complaints vs. real underlying blockers',
          '5-Whys Root Cause Analysis mapping where the current system actually breaks down',
          'Problem reframing manifesto converting the complaint into an actionable design opportunity',
          'User empathy map highlighting the emotional impact of the root friction'
        ],
        focus: ['Root Cause Discovery', 'Problem Reframing', 'Deep Qualitative Inquiry'],
        difficulty: 'Level 3 // Investigative UX Research',
        expectedOutput: 'Problem Reframing Deck + 5-Whys Root Cause Map + Field Interview Findings'
      },
      {
        id: 'PS-02',
        title: 'The Unreported Problem',
        subtitle: 'Discovering Normalized Campus Frictions & Hidden Unmet Needs',
        context: 'Some problems are so common that students stop complaining about them and simply normalize them as inevitable realities.',
        challenge: 'Discover a campus problem that users have normalized rather than reported.',
        researchQuestions: [
          'Who experiences it?',
          'How frequently does it happen?',
          'Why does it happen?',
          'Why hasn\'t it been solved yet?',
          'What is the actual unmet need?'
        ],
        targetUser: 'Campus cohorts living with normalized daily frictions they no longer actively report.',
        deliverables: [
          'Observational field research documenting an unvoiced, normalized campus problem',
          'Evidence-backed answers answering all 5 Mandatory Research Proof Questions',
          'Frequency & severity metrics proving the collective footprint of the issue',
          'Actionable Unmet Need definition establishing what users actually require rather than what they tolerate'
        ],
        focus: ['Normalized Friction', 'Unmet Needs Discovery', 'Behavioral Fieldwork'],
        difficulty: 'Level 4 // Advanced Field Research',
        expectedOutput: 'Research Synthesis Deck + 5-Question Evidence Matrix + Unmet Need Specification'
      },
      {
        id: 'PS-03',
        title: 'Follow the Student',
        subtitle: 'Ethnographic Shadowing & End-to-End Journey Mapping',
        context: 'Choose one meaningful campus journey: Hostel → Classroom → Canteen → Library → Hostel, or another significant daily university routine.',
        challenge: 'Shadow and research the journey to identify moments of friction, frustration, confusion, and opportunity across physical and digital touchpoints.',
        targetUser: 'Students navigating high-friction multi-touchpoint university journeys.',
        deliverables: [
          'End-to-end Service & Experience Journey Map of the selected student route',
          'Emotional delta timeline identifying peak moments of delay, stress, and confusion',
          'Cross-channel touchpoint analysis (physical spaces, portals, signage, social groups)',
          'Prioritized opportunity matrix highlighting high-impact design intervention zones'
        ],
        focus: ['Ethnographic Shadowing', 'Touchpoint Analysis', 'Service Journey Mapping'],
        difficulty: 'Level 3 // Core Research',
        expectedOutput: 'Comprehensive Journey Map + Shadowing Notes/Evidence Log + Friction Audit'
      },
      {
        id: 'PS-04',
        title: 'The 5-Minute Problem',
        subtitle: 'Quantifying Collective Lost Time in Campus Routines',
        context: 'Find something that students collectively spend unnecessary time doing—waiting, searching, navigating, repeating information, filling forms, or performing a physical task.',
        challenge: 'Quantify the problem with measurable metrics and rigorously investigate the systemic causes behind this lost time.',
        targetUser: 'Large campus cohorts subjected to repetitive delays and redundant steps.',
        deliverables: [
          'Quantitative time-loss audit calculating aggregate campus student-hours lost per semester',
          'Detailed task flow diagram pinpointing bottlenecks, dead-ends, and wait states',
          'Time-and-motion observational study across representative student samples',
          'Lean process re-architecture proposal eliminating the 5-minute overhead'
        ],
        focus: ['Quantitative UX', 'Time-and-Motion Study', 'Bottleneck Optimization'],
        difficulty: 'Level 3 // Analytical UX',
        expectedOutput: 'Time-Audit Metrics Report + Bottleneck Flowchart + Optimization Blueprint'
      },
      {
        id: 'PS-05',
        title: 'What Students Say vs What They Do',
        subtitle: 'Behavioral Contradictions & Observational Opportunity Discovery',
        context: 'Users don\'t always behave the way they describe. Surveys alone often mislead teams because stated preferences regularly conflict with observed human action.',
        challenge: 'Identify one campus experience where stated preferences and observed behavior differ, investigate why, and convert the contradiction into a design opportunity.',
        note: 'This is particularly strong for a UX Research competition because teams cannot simply rely on an online survey; real observational evidence is required.',
        targetUser: 'Students exhibiting cognitive dissonance or behavioral workarounds contrary to standard rules or survey answers.',
        deliverables: [
          'Contrast Matrix detailing stated student claims vs. actual observed behaviors',
          'Observational field inquiry synthesis (contextual observation, behavioral logs, interviews)',
          'Behavioral psychology breakdown explaining the contradiction (convenience, peer norms, cognitive load)',
          'Breakthrough design opportunity brief converting the friction into a solution'
        ],
        focus: ['Behavioral Observation', 'Dissonance Analysis', 'Non-Survey Methodologies'],
        difficulty: 'Level 4 // Cognitive Research',
        expectedOutput: 'Stated-vs-Observed Matrix + Field Observation Log + Design Opportunity Brief'
      }
    ]
  },
  {
    code: 'T-03',
    title: 'Brand Identity',
    stone: 'Reality Stone',
    text: 'Bend reality to your vision. Build brand worlds that reshape how people perceive and connect with products.',
    tags: ['Branding', 'Identity'],
    problemStatements: [
      {
        id: 'PS-01',
        title: 'Build the Next Campus Movement',
        subtitle: 'Cross-Disciplinary Grassroots Identity & Culture Architecture',
        context: 'Create the identity of a new student-led movement designed to bring together students from different disciplines.',
        challenge: 'Build a brand that can attract students who have different interests, backgrounds, and motivations across engineering, design, arts, business, and sciences.',
        targetUser: 'Diverse university student bodies spanning disparate academic tribes, clubs, and cultural backgrounds.',
        deliverables: [
          'Movement brand manifesto, foundational ethos, and conversational tone of voice',
          'Dynamic master logomark and adaptive iconographic system',
          'Cross-disciplinary sub-culture visual codes (engineering, creative, business wings)',
          'Guerilla launch campaign collateral (stickers, apparel badges, social teasers)'
        ],
        focus: ['Grassroots Movement Building', 'Cross-Disciplinary Appeal', 'Cultural Resonance'],
        difficulty: 'Level 3 // Core Brand Identity',
        expectedOutput: 'Brand Identity Guide + Manifesto + Cross-Media Collateral Mockups'
      },
      {
        id: 'PS-02',
        title: 'The Brand Recruitment Challenge',
        subtitle: 'Purpose-Driven Conversion: Why It Exists → Why It Matters → Why Join',
        context: 'Imagine a university initiative with an important mission but extremely low student participation.',
        challenge: 'Reposition the initiative and create a new identity capable of making students understand: WHY IT EXISTS → WHY IT MATTERS → WHY THEY SHOULD JOIN.',
        targetUser: 'Apathetic or disengaged students needing a compelling narrative hook to participate.',
        deliverables: [
          'Value-proposition positioning framework solving the 3-stage conversion funnel (Exists → Matters → Join)',
          'Energetic, youth-centric visual identity overhaul (typography, vibrant palette, imagery direction)',
          'High-impact student recruitment campaign rollout (digital reels/carousels, standees, flyers)',
          'Social proof and peer-to-peer engagement touchpoint strategy'
        ],
        focus: ['Strategic Repositioning', 'Recruitment Conversion Funnel', 'Emotional Clarity'],
        difficulty: 'Level 4 // Strategic Branding',
        expectedOutput: 'Strategic Repositioning Deck + Visual Identity Overhaul + Recruitment Campaign Spec'
      },
      {
        id: 'PS-03',
        title: 'One Brand, 100 Personalities',
        subtitle: 'Scalable Master-Brand vs. Sub-Event Architecture',
        context: 'Create an identity system for a university-wide event that contains multiple competitions, workshops, communities and activities.',
        challenge: 'Design a brand that maintains a recognizable master identity while allowing individual sub-events to develop their own personalities.',
        note: 'This tests whether participants understand scalable brand systems and visual governance, not just standalone logos.',
        targetUser: 'Multi-layered university fest/summit attendees, sub-event leads, and workshop hosts.',
        deliverables: [
          'Cohesive Master-Brand governance architecture (grid, anchor marks, typographic hierarchy)',
          '4 distinct sub-event identity variants demonstrating flexible visual grammar',
          'Color, pattern, and token allocation rules for competing activity tracks',
          'Universal stage signage, digital schedule badges, and ticket tier system'
        ],
        focus: ['Brand System Architecture', 'Sub-Brand Flexibility', 'Master-Identity Governance'],
        difficulty: 'Level 4 // Systemic Branding',
        expectedOutput: 'Master Brand Guidelines + Sub-Event Extension Matrix + Environmental Mockups'
      },
      {
        id: 'PS-04',
        title: 'From Unknown to Unmissable',
        subtitle: 'Cross-Channel Campus Presence Transformation',
        context: 'A hypothetical student organization has excellent work but almost no recognition.',
        challenge: 'Create its complete identity and communication language to transform it from an unknown organization into a recognizable campus presence.',
        constraint: 'The identity must work cohesively across: (1) Social media, (2) Posters, (3) Merchandise, (4) Digital interfaces, and (5) Physical campus spaces.',
        targetUser: 'Broad student population, campus visitors, industry sponsors, and peer societies.',
        deliverables: [
          'Complete visual language (logotype, glyph set, bespoke typography pairings, color palette)',
          'High-visibility physical poster and billboard spatial takeover system',
          'Striking student merchandise identity (hoodies, tote bags, lanyard pins, laptop decals)',
          'Dynamic social media kit (announcement grids, speaker spotlight frames, story templates)'
        ],
        focus: ['Omnipresent Recognition', 'Cross-Media Scalability', 'Physical & Digital Cohesion'],
        difficulty: 'Level 3 // Multi-Channel Design',
        expectedOutput: 'Complete Brand Toolkit + 5-Medium Application Showcase + Physical Mockups'
      },
      {
        id: 'PS-05',
        title: 'The Rebrand with a Catch',
        subtitle: 'Strategic Trade-Off: Familiarity vs. Radical Reinvention',
        context: 'Take a hypothetical university initiative whose existing identity is outdated.',
        challenge: 'Rebrand it for a younger generation without completely losing its existing credibility.',
        note: 'This creates a genuine strategic trade-off: Familiarity vs. Reinvention. Teams must justify which legacy brand equities to retain and which to modernize.',
        targetUser: 'Incoming Gen-Z/Gen-Alpha freshmen as well as senior faculty, legacy partners, and alumni.',
        deliverables: [
          'Strategic equity audit detailing retained legacy brand assets vs. retired obsolete tropes',
          'Modernized evolutionary brand identity bridging heritage with contemporary youth culture',
          '"Before vs. After" brand transition narrative and rollout timeline',
          'Dual-audience stakeholder alignment guide (faculty credibility vs. student appeal)'
        ],
        focus: ['Strategic Brand Evolution', 'Heritage vs Modernity', 'Equities Preservation'],
        difficulty: 'Level 5 // Brand Strategy Masterclass',
        expectedOutput: 'Evolutionary Brand Guide + Heritage Equity Audit + Before/After Rollout Deck'
      }
    ]
  },
  {
    code: 'T-04',
    title: 'Product Design',
    stone: 'Soul Stone',
    text: 'Connect with the soul of the user. Design products with empathy, purpose, and an experience that truly resonates.',
    tags: ['End-to-End', 'Systems'],
    problemStatements: [
      {
        id: 'PS-01',
        title: 'The Hostel Survival Tool',
        subtitle: 'Compact, Affordable Hardware for High-Density Living',
        context: 'Hostel students regularly deal with limited space, shared infrastructure, charging problems, storage, organization and everyday inconveniences.',
        challenge: 'Design a physical product that solves one recurring hostel problem.',
        constraint: 'The product must be: (1) Portable, (2) Affordable, (3) Manufacturable, and (4) Usable in a typical hostel environment.',
        targetUser: 'Hostel residents coping with cramped bunk arrangements, limited wall outlets, and shared utility spaces.',
        deliverables: [
          'Physical form-factor design specification & orthographic CAD drawings',
          'Ergonomic interaction breakdown (folding, mounting, stowing mechanisms)',
          'Material selection & Bill of Materials (BOM) targeting realistic student budget constraints',
          'Contextual in-room rendering demonstrating real-world hostel usage'
        ],
        focus: ['Compact Spatial Optimization', 'Design for Manufacturing (DFM)', 'Student Affordability'],
        difficulty: 'Level 3 // Industrial Design',
        expectedOutput: 'Physical Product Concept + 3D Renderings/Drawings + Material & Cost Breakdown'
      },
      {
        id: 'PS-02',
        title: 'Carry Your Campus',
        subtitle: 'Rethinking Everyday Mobility & Essential Access',
        context: 'Students carry laptops, books, chargers, bottles, ID cards and personal belongings throughout the day across sprawling campus grounds.',
        challenge: 'Rethink how a student carries and accesses their everyday essentials while moving between multiple campus locations.',
        constraint: 'You cannot simply design another backpack. You must fundamentally rethink the carrying architecture and rapid access mechanics.',
        targetUser: 'Highly mobile commuters, day scholars, and lab-hopping students transitioning between classes, libraries, and canteens.',
        deliverables: [
          'Novel carrying architecture specification (modular wear, quick-detach slings, adaptive load distribution)',
          'Split-second accessibility mapping (fetching ID card, charger, or tablet on the move)',
          'Ergonomic weight distribution and postural health study',
          'Weather-resistant material & durable hardware closure specifications'
        ],
        focus: ['Mobile Ergonomics', 'Rapid Item Retrieval', 'Modular Carry Architecture'],
        difficulty: 'Level 4 // Wearable / Soft-Goods Product Design',
        expectedOutput: 'Carrying Concept Prototype + Access Mechanics Flowchart + Ergonomic Spec Sheet'
      },
      {
        id: 'PS-03',
        title: 'The 5-Minute Fix',
        subtitle: 'Physical Hardware Intervention for Lost Campus Minutes',
        context: 'Identify a physical activity on campus that repeatedly wastes time. Examples include finding seating, charging devices, organizing belongings, accessing shared facilities, or managing classroom equipment.',
        challenge: 'Design a physical product that can reduce that friction dramatically.',
        targetUser: 'Students and instructors whose focus is repeatedly derailed by physical friction points during transit or lectures.',
        deliverables: [
          'Problem observation & time-loss audit documenting the specific physical bottleneck',
          'Functional product design blueprint engineered for rapid deployment (<30s setup)',
          'Mechanical breakdown (hinges, quick-release clamps, universal interfaces)',
          'Comparative user journey showing friction time before vs. after the product intervention'
        ],
        focus: ['Mechanical Friction Reduction', 'Rapid Deployment', 'Utility Hardware'],
        difficulty: 'Level 3 // Functional Product Design',
        expectedOutput: 'Mechanism Drawings + User Journey Delta + Functional Prototype Spec'
      },
      {
        id: 'PS-04',
        title: 'Design with Less',
        subtitle: 'Resource Conservation Without Experience Compromise',
        context: 'Choose one campus activity that unnecessarily consumes material, energy or water.',
        challenge: 'Design a physical intervention/product that reduces resource consumption without making the experience significantly worse for users.',
        targetUser: 'Campus facilities, dining halls, washrooms, print labs, or dormitories where resource waste is prevalent.',
        deliverables: [
          'Resource consumption audit identifying quantifiable waste baselines (liters/kWh/paper per week)',
          'Passive or active physical intervention design that cuts resource use by >40%',
          'User psychology & behavioral nudging architecture ensuring zero perceived hardship',
          'Circular lifecycle analysis (cradle-to-cradle material sourcing and recycling path)'
        ],
        focus: ['Sustainable Product Design', 'Resource Conservation', 'Behavioral Nudging'],
        difficulty: 'Level 4 // Circular Hardware Design',
        expectedOutput: 'Eco-Intervention Design + Resource Impact Calculation + Product Life-Cycle Spec'
      },
      {
        id: 'PS-05',
        title: 'Design for the Person You Didn\'t Notice',
        subtitle: 'Inclusive Hardware for Overlooked Campus Needs',
        context: 'Campus products are often designed around an "average" able-bodied user, ignoring individuals with diverse physical needs.',
        challenge: 'Identify a group whose physical needs are poorly addressed by existing campus infrastructure and design a product specifically for them.',
        note: 'Competitive Requirement: Participants must demonstrate the user\'s physical interaction with the prototype.',
        targetUser: 'Campus members with mobility impairments, temporary injuries, neurodivergent physical sensitivities, or non-standard ergonomic requirements.',
        deliverables: [
          'Empathy & anthropometric measurement audit for the specific target user group',
          'High-accessibility physical product solution bridging infrastructural campus gaps',
          'Comprehensive physical interaction walkthrough demonstrating ergonomic reach, grip, and posture',
          'Universal design compliance assessment (ADA/Universal Design benchmarks)'
        ],
        focus: ['Inclusive Product Design', 'Anthropometric Ergonomics', 'Assistive Technology'],
        difficulty: 'Level 4 // Inclusive Ergonomics',
        expectedOutput: 'Physical Ergonomic Model + Interaction Walkthrough Boards + User Testing Validation'
      }
    ]
  },
  {
    code: 'T-05',
    title: 'Motion Design',
    stone: 'Time Stone',
    text: 'Manipulate time itself. Craft animations and transitions that guide users through temporal experiences with precision.',
    tags: ['Animation', 'Interaction'],
    problemStatements: [
      {
        id: 'PS-01',
        title: 'Make the Boring Unmissable',
        subtitle: 'Transforming Dull Campus Bureaucracy into High-Impact Motion',
        context: 'Students routinely ignore administrative information, compliance circulars, fee deadlines, and academic notices because they are dull walls of text.',
        challenge: 'Take one genuinely boring or complicated campus communication and transform it into a motion experience that captures attention without sacrificing clarity.',
        targetUser: 'Students prone to missing critical administrative deadlines due to text fatigue and banner blindness.',
        deliverables: [
          'Dynamic kinetic typography & motion graphic piece delivering the critical message (<20s)',
          'Visual hierarchy breakdown ensuring key dates, action buttons, and penalties are unmistakable',
          'Multi-format responsive motion layout (Instagram vertical reels, campus digital kiosks, mobile pop-ups)',
          'Micro-interaction animation spec for the immediate call-to-action button'
        ],
        focus: ['Kinetic Typography', 'Information Clarity', 'Overcoming Banner Blindness'],
        difficulty: 'Level 3 // Motion Storytelling',
        expectedOutput: 'Motion Video / Prototype + Storyboard Breakdown + Kinetic Type Spec'
      },
      {
        id: 'PS-02',
        title: '30 Seconds to Understand',
        subtitle: 'Micro-Explanation Motion Engine: What → Why → When → How → Next',
        context: 'Choose a complex university process (e.g. credit transfer, degree audit, hostel allocation, examination registration, or grievance escalation).',
        challenge: 'Explain the complete process in 30 seconds or less using motion. The audience must effortlessly understand: WHAT → WHY → WHEN → HOW → WHAT NEXT.',
        targetUser: 'Time-crunched students seeking instant, confusion-free comprehension of multi-step procedures.',
        deliverables: [
          '30-second rapid explainer animation adhering strictly to the 5-stage comprehension funnel',
          'Metaphor-driven visual grammar simplifying bureaucratic hurdles',
          'Timing and pacing chart synchronized to kinetic visual cues with zero cognitive lag',
          'Interactive prototype or synchronized audio-visual video export'
        ],
        focus: ['High-Efficiency Explainer', 'Motion Pacing', 'Cognitive Simplification'],
        difficulty: 'Level 4 // Rapid Motion Communication',
        expectedOutput: '30-Second Motion Explainer + 5-Stage Storyboard + Motion Timing Chart'
      },
      {
        id: 'PS-03',
        title: 'Motion That Teaches',
        subtitle: 'Pedagogical Visual Storytelling Over Text-Heavy Explanations',
        context: 'Choose something students frequently misunderstand (e.g. grading curves, CGPA calculations, elective prerequisites, attendance shortage math, or campus security protocols).',
        challenge: 'Create an animated experience that teaches the concept through visual storytelling rather than relying primarily on text.',
        targetUser: 'Students confused by abstract mathematical formulas, complex policy jargon, or opaque academic rules.',
        deliverables: [
          'Narrative motion sequence transforming abstract rules into tangible physical/visual metaphors',
          'Step-by-step visual revelation mechanics (morphing charts, visual scaling, state transitions)',
          'Audio/visual choreography keeping student cognitive engagement elevated throughout',
          'Interactive or video-based learning asset suitable for orientation or onboarding'
        ],
        focus: ['Educational Motion Design', 'Visual Metaphors', 'Non-Verbal Pedagogy'],
        difficulty: 'Level 4 // Visual Pedagogy',
        expectedOutput: 'Animated Educational Experience + Visual Metaphor Deck + Script & Storyboards'
      },
      {
        id: 'PS-04',
        title: 'Design the Feeling',
        subtitle: 'Brand Personality Choreography Through Transitions, Feedback & Timing',
        context: 'A product isn\'t experienced only through functionality; transitions, feedback and timing affect how it feels.',
        challenge: 'Create a motion language for a hypothetical digital product that communicates a specific personality: Calm / Energetic / Trustworthy / Futuristic / Playful. Participants must demonstrate how the same motion system works across multiple interactions.',
        targetUser: 'Digital product users whose emotional connection and trust are shaped by subtle micro-interactions and transitions.',
        deliverables: [
          'Chosen personality manifesto and mathematical motion physics spec (damping, mass, stiffness, bezier curves)',
          'Interactive demo of 4+ UI touchpoints executing the unified motion personality (button press, drawer slide, list reorder, modal reveal)',
          'Side-by-side behavioral comparison showing why this timing evokes the target feeling',
          'Exported Lottie/Rive or CSS/Web Animations spec tokens'
        ],
        focus: ['Emotional Motion Design', 'Easing & Physics Choreography', 'Interaction Personality'],
        difficulty: 'Level 4 // Interaction Choreography',
        expectedOutput: 'Interactive Motion Kit + Easing Token Library + Personality Motion Manifesto'
      },
      {
        id: 'PS-05',
        title: 'The Motion System',
        subtitle: 'Unified 7-State Reusable Design System Motion Grammar',
        context: 'Design a reusable motion system for a digital product that forms one coherent motion language across all operational states.',
        challenge: 'Make all seven mandatory states feel like parts of one coherent, harmonious, predictable motion language.',
        requiredStatesTitle: '7 MANDATORY SYSTEM STATES // MUST FORM ONE COHERENT LANGUAGE:',
        requiredStates: [
          'Entry animation',
          'Navigation transition',
          'Loading state',
          'Success state',
          'Error state',
          'Micro-interaction',
          'Empty state'
        ],
        targetUser: 'Design systems engineers, frontend developers, and product teams needing standardized kinetic tokens.',
        deliverables: [
          'Standardized Motion Token Architecture (Duration tiers: Micro 150ms, Macro 350ms; Easing curves)',
          'High-fidelity interactive prototype demonstrating all 7 canonical states in action',
          'Motion cohesion matrix showing shared physics principles (momentum, overshoot, opacity curve)',
          'Developer handoff specification (cubic-bezier values, spring parameters, reduced-motion fallbacks)'
        ],
        focus: ['Systematic Motion Architecture', 'Design System Governance', 'State Cohesion'],
        difficulty: 'Level 5 // Motion System Architecture',
        expectedOutput: 'Interactive 7-State Component Showcase + Motion Token Specification + Handoff Doc'
      }
    ]
  },
  {
    code: 'T-06',
    title: 'Design Systems',
    stone: 'Mind Stone',
    text: 'Achieve cosmic-level intelligence. Build scalable design systems that bring order to the multiverse of components.',
    tags: ['Tokens', 'Scalability'],
    problemStatements: [
      {
        id: 'PS-01',
        title: 'The University Design OS',
        subtitle: 'Foundations → Components → Patterns → Templates → Documentation',
        context: 'Imagine that every student-facing digital service in a university must eventually use the same design foundation.',
        challenge: 'Create the foundational design system capable of powering that ecosystem. It must systematically cover all five tiers of systemic architecture: Foundations → Components → Patterns → Templates → Documentation.',
        requiredStatesTitle: '5 MANDATORY ECOSYSTEM TIERS TO COVER:',
        requiredStates: [
          'Foundations (Tokens, Grid, Type, Color)',
          'Components (Buttons, Inputs, Cards)',
          'Patterns (Auth Flows, Search, Filters)',
          'Templates (Dashboards, Course Catalogs)',
          'Documentation (Usage Guidelines, Governance)'
        ],
        targetUser: 'University digital services teams, student developers, and departmental portals across the campus.',
        deliverables: [
          'Comprehensive design token architecture (color scales, typography ramps, spatial elevation)',
          'Core component library specification with interactive state variants (default, hover, focus, disabled)',
          'Standardized UX patterns & page layout templates for campus digital services',
          'Living documentation portal guide detailing design system contribution and governance rules'
        ],
        focus: ['Design System Architecture', 'Scalable Component Library', 'System Documentation'],
        difficulty: 'Level 4 // Ecosystem Foundation',
        expectedOutput: 'Design System Token Library + Component Kit + Architecture Documentation'
      },
      {
        id: 'PS-02',
        title: '50 Clubs, One System',
        subtitle: 'Balancing Global Consistency with Autonomous Identity',
        context: 'Imagine 50 university clubs each building their own digital presence—ranging from robotics and debate to cultural dance and sports committees.',
        challenge: 'Create a system that provides consistency while allowing every club to maintain its own identity.',
        note: 'Core Architecture Dilemma: How much should be standardized—and how much should remain flexible? Participants must establish clear governance boundaries between shared infrastructure and custom branding.',
        targetUser: '50+ autonomous student societies, club leaders, event organizers, and student members.',
        deliverables: [
          'Multi-tenant theming architecture with customizable brand accent tokens',
          'Standardization vs. Flexibility governance matrix (defining locked infrastructure vs. themeable surfaces)',
          'Interactive prototype demonstrating the same system adapted for 3 contrasting clubs (e.g. Robotics, Cultural Arts, Sports)',
          'Self-serve club onboarding kit and component adaptation manual'
        ],
        focus: ['Multi-Tenant Theming', 'System Governance', 'Brand Customization'],
        difficulty: 'Level 4 // Theming & Governance',
        expectedOutput: 'Theming Framework Blueprint + 3 Club Implementation Demos + Governance Matrix'
      },
      {
        id: 'PS-03',
        title: 'Design Once, Scale Everywhere',
        subtitle: 'Cross-Form Factor Responsive Component Architecture',
        context: 'Students and faculty interact with university tools across erratic environments—from mobile phones on the campus shuttle to tablets in lecture halls and multi-monitor setups in computer labs.',
        challenge: 'Create a component system that works across Mobile → Tablet → Desktop and across at least three different products. Participants must demonstrate how the same underlying component adapts to different contexts.',
        note: 'Competitive Mandate: Demonstrate how the exact same underlying component family morphs across Mobile → Tablet → Desktop across at least 3 distinct product interfaces.',
        targetUser: 'Cross-device campus users navigating erratic network speeds, varying screen real-estate, and differing input modalities (touch vs pointer).',
        deliverables: [
          'Adaptive responsive component blueprint demonstrating polymorphic layouts across 3 breakpoints',
          'Live context adaptations for 3 distinct campus products (e.g. Attendance Tracker, Event Schedule, Grade Portal)',
          'Breakpoint token matrix detailing dynamic spacing, touch targets, and typography scaling',
          'Ergonomic interaction guide for pointer vs. touch affordances'
        ],
        focus: ['Adaptive Layouts', 'Cross-Device Modularity', 'Contextual Morphing'],
        difficulty: 'Level 4 // Responsive Architecture',
        expectedOutput: 'Multi-Device Component Showcase + Breakpoint Matrix + Context Adaptation Specs'
      },
      {
        id: 'PS-04',
        title: 'The Accessibility-First System',
        subtitle: 'Inclusive Component Architecture Engineered from Day Zero',
        context: 'Too many campus tools treat accessibility as an afterthought or a compliance checklist item rather than an essential foundation.',
        challenge: 'Build accessibility directly into the foundations of the system. Participants must demonstrate accessible implementations across all eight essential UI dimensions.',
        requiredStatesTitle: '8 MANDATORY ACCESSIBLE DEMONSTRATIONS:',
        requiredStates: [
          'Forms',
          'Buttons',
          'Navigation',
          'Typography',
          'Color',
          'Focus states',
          'Error states',
          'Interactive components'
        ],
        targetUser: 'Students and faculty with visual, motor, auditory, or cognitive impairments, as well as keyboard-only navigators.',
        deliverables: [
          'APCA / WCAG 2.2 AAA compliant color ramps with tested background contrast ratios',
          'Visible focus ring architecture and logical keyboard tab-order traversal specs',
          'Accessible form error and validation announcement patterns (ARIA live regions, error summaries)',
          'Component accessibility audit matrix covering all 8 required demonstrations'
        ],
        focus: ['Accessibility by Default (a11y)', 'WCAG 2.2 Compliance', 'Focus & Screen-Reader States'],
        difficulty: 'Level 4 // Inclusive Architecture',
        expectedOutput: 'Accessible Component Primitives + ARIA State Specification + a11y Audit Report'
      },
      {
        id: 'PS-05',
        title: 'Break Your Own System',
        subtitle: 'The Experimental Stress-Test: Deliberate Extremes & Evolutionary Limits',
        context: 'This is the most experimental challenge. Build a design system and then deliberately stress-test it.',
        challenge: 'Your system must handle three completely different products without becoming inconsistent. Participants must identify: Where does the system break, and how should the system evolve?',
        constraint: 'Stress-Test Mandate: You must push your system to extreme edge cases across 3 wildly diverse products and identify structural failure points and necessary evolutionary changes.',
        note: 'Post-Mortem Requirement: Explicitly identify: (1) Where does the system break? and (2) How should the system evolve?',
        targetUser: 'Design system engineers, product architects exploring structural limits and tech debt resilience.',
        deliverables: [
          'Design system stress-tested across 3 radically different products (e.g. High-Density Telemetry Tool, Creative Student Showcase, Minimalist Reading Portal)',
          'System Breakdown Audit: Documented component fractures, token collisions, and layout edge cases',
          'Evolutionary Architecture Blueprint: Structural adaptations, polymorphic primitives, and new token layers',
          'Lessons learned & design system roadmap documenting failure points and recovery paths'
        ],
        focus: ['Extreme Stress Testing', 'System Evolution', 'Edge-Case Resilience', 'Design Debt Post-Mortem'],
        difficulty: 'Level 5 // Experimental Stress Engineering',
        expectedOutput: 'Stress-Test Post-Mortem + 3 Product Implementations + Evolutionary Roadmap'
      }
    ]
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
