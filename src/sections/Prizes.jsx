import { m } from 'framer-motion';
import { prizes, specialMentions, goodies, confirmed } from '../data/event';
import Section from '../components/Section';
import HudFrame from '../components/HudFrame';

const TIER = {
  gold: { color: '#7CFF00', label: 'Gamma tier' },
  silver: { color: '#39FF14', label: 'Apex tier' },
  bronze: { color: '#A3FF2E', label: 'Titan tier' },
};

/** Hulk-theme prize emblems tailored for each tier. */
function HulkEmblem({ tierKey, color, first }) {
  const filterId = `hulk-glow-${tierKey}`;
  const gradId = `hulk-grad-${tierKey}`;
  const bgGlowId = `hulk-bg-glow-${tierKey}`;

  if (tierKey === 'gold') {
    // GAMMA TIER (1st Place): Supreme Hulk Smash Fist + Gamma Radiation Trefoil + Explosive Ground Shatter
    return (
      <svg
        className={`prize-crater mx-auto ${first ? 'h-32 w-32 sm:h-36 sm:w-36' : 'h-28 w-28'}`}
        viewBox="0 0 140 140"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id={bgGlowId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.4" />
            <stop offset="55%" stopColor={color} stopOpacity="0.1" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={gradId} x1="70" y1="28" x2="70" y2="118" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Pulsing Gamma Corona Background */}
        <circle cx="70" cy="70" r="62" fill={`url(#${bgGlowId})`} />
        <circle cx="70" cy="70" r="58" stroke={color} strokeWidth="1.5" strokeDasharray="5 7" opacity="0.5" />
        <circle cx="70" cy="70" r="66" stroke={color} strokeWidth="0.75" opacity="0.3" />

        {/* Gamma Radiation Trefoil Hazard Blades Framing Fist */}
        <g opacity="0.45" filter={`url(#${filterId})`}>
          <path d="M 88 38 A 54 54 0 0 0 118 64 L 97 64 A 32 32 0 0 1 78 48 Z" fill={color} />
          <path d="M 84 98 A 54 54 0 0 0 56 98 L 62 78 A 32 32 0 0 1 78 78 Z" fill={color} />
          <path d="M 22 64 A 54 54 0 0 0 52 38 L 62 48 A 32 32 0 0 1 43 64 Z" fill={color} />
        </g>

        {/* Devastating Seismic Smash Fractures (Radial Ground Shatter) */}
        <g stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" filter={`url(#${filterId})`}>
          <path d="M 70 8 L 68 20 L 73 28" />
          <path d="M 132 70 L 120 66 L 112 72" />
          <path d="M 8 70 L 20 74 L 28 68" />
          <path d="M 116 116 L 105 106 L 98 111" />
          <path d="M 24 116 L 35 106 L 42 111" />
          <path d="M 114 26 L 104 35 L 98 31" />
          <path d="M 26 26 L 36 35 L 42 31" />
        </g>

        {/* Crackling Gamma Radiation Lightning */}
        <path d="M 28 42 L 20 52 L 30 52 L 22 64" fill="none" stroke={color} strokeWidth="2.2" filter={`url(#${filterId})`} />
        <path d="M 112 42 L 120 52 L 110 52 L 118 64" fill="none" stroke={color} strokeWidth="2.2" filter={`url(#${filterId})`} />

        {/* Hulk Smash Fist Silhouette */}
        <path
          d="M 52 118 C 50 104 46 93 40 85 C 35 77 33 69 37 61 C 39 55 44 51 49 49 C 50 43 54 37 60 36 C 64 33 69 31 75 32 C 81 31 87 34 90 38 C 95 40 98 45 98 51 C 103 55 105 63 103 71 C 101 79 97 87 94 95 C 91 103 89 111 88 118 Z"
          fill={`url(#${gradId})`}
          stroke={color}
          strokeWidth="2.6"
          strokeLinejoin="round"
          filter={`url(#${filterId})`}
        />

        {/* Giant Hulk Knuckles Ridge */}
        <path d="M 47 55 C 48 49 52 45 58 46 C 61 47 63 50 64 54" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 64 47 C 66 39 72 36 79 37 C 83 38 85 42 86 46" fill="none" stroke={color} strokeWidth="2.8" strokeLinecap="round" />
        <path d="M 86 43 C 89 38 94 39 98 43 C 101 46 101 50 99 54" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 99 51 C 102 49 106 52 107 57 C 108 63 104 68 101 70" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" />

        {/* Finger Separation Grooves */}
        <path d="M 64 53 L 63 71" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.9" />
        <path d="M 86 47 L 85 69" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.9" />
        <path d="M 99 55 L 97 73" stroke={color} strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />

        {/* Clenched Finger Pads */}
        <path d="M 53 65 C 56 67 61 67 64 65" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 67 63 C 73 66 79 66 84 63" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
        <path d="M 87 64 C 91 66 94 66 97 64" stroke={color} strokeWidth="1.8" strokeLinecap="round" />

        {/* Locked Hulk Thumb */}
        <path
          d="M 41 69 C 40 77 44 83 51 84 C 59 85 69 84 75 78 C 78 75 77 69 72 68 C 65 67 55 68 49 70"
          fill={`url(#${gradId})`}
          stroke={color}
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <path d="M 67 71 C 70 72 71 75 69 77" stroke={color} strokeWidth="1.8" strokeLinecap="round" />

        {/* Muscular Forearm / Searing Gamma Veins */}
        <path d="M 59 87 C 60 95 59 105 57 115" stroke={color} strokeWidth="1.8" strokeLinecap="round" opacity="0.75" />
        <path d="M 73 83 C 75 93 76 103 77 115" stroke={color} strokeWidth="2.2" strokeLinecap="round" opacity="0.9" />
        <path d="M 85 85 C 85 93 84 103 83 115" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />

        {/* Pulsing Gamma Energy Vein */}
        <path d="M 74 88 L 68 95 L 71 102 L 67 109" stroke={color} strokeWidth="1.6" strokeLinecap="round" filter={`url(#${filterId})`} />

        {/* Impact Singularity Core */}
        <circle cx="70" cy="56" r="3.5" fill={color} filter={`url(#${filterId})`} />
        <circle cx="70" cy="56" r="1.5" fill="#ffffff" />
      </svg>
    );
  }

  if (tierKey === 'silver') {
    // APEX TIER (2nd Place): Apex Rage Gauntlet + Kinetic Shockwave Arcs + Energy Shards
    return (
      <svg
        className="prize-crater mx-auto h-28 w-28"
        viewBox="0 0 140 140"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id={bgGlowId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="60%" stopColor={color} stopOpacity="0.06" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={gradId} x1="50" y1="30" x2="90" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.08" />
          </linearGradient>
        </defs>

        {/* Ambient Glow & Cyber Reticle */}
        <circle cx="70" cy="70" r="56" fill={`url(#${bgGlowId})`} />
        <circle cx="70" cy="70" r="54" stroke={color} strokeWidth="1.2" strokeDasharray="3 5" opacity="0.4" />
        <circle cx="70" cy="70" r="62" stroke={color} strokeWidth="0.8" opacity="0.2" />

        {/* Kinetic Shockwave Arcs */}
        <path d="M 24 50 A 55 55 0 0 1 50 24" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.75" filter={`url(#${filterId})`} />
        <path d="M 90 24 A 55 55 0 0 1 116 50" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.75" filter={`url(#${filterId})`} />
        <path d="M 20 86 A 55 55 0 0 0 46 116" stroke={color} strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
        <path d="M 94 116 A 55 55 0 0 0 120 86" stroke={color} strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />

        {/* Apex Angular Energy Shards */}
        <g stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.7">
          <path d="M 70 12 L 70 24" />
          <path d="M 124 64 L 110 68 L 104 62" />
          <path d="M 16 64 L 30 68 L 36 62" />
          <path d="M 112 104 L 100 98" />
          <path d="M 28 104 L 40 98" />
        </g>

        {/* Apex Lightning Spikes */}
        <path d="M 34 38 L 26 48 L 36 48 L 30 60" fill="none" stroke={color} strokeWidth="1.8" filter={`url(#${filterId})`} />
        <path d="M 106 38 L 114 48 L 104 48 L 110 60" fill="none" stroke={color} strokeWidth="1.8" filter={`url(#${filterId})`} />

        {/* Hulk Fist */}
        <path
          d="M 52 118 C 50 106 46 95 40 86 C 35 78 34 70 38 61 C 40 55 45 52 50 50 C 51 44 55 38 61 37 C 65 34 70 32 76 33 C 82 32 88 35 91 39 C 96 41 99 46 99 52 C 104 57 105 65 103 72 C 101 80 97 88 94 96 C 91 104 89 112 88 118 Z"
          fill={`url(#${gradId})`}
          stroke={color}
          strokeWidth="2.2"
          strokeLinejoin="round"
          filter={`url(#${filterId})`}
        />

        {/* Knuckle Crests */}
        <path d="M 48 56 C 49 50 53 46 59 47 C 62 48 64 51 65 55" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
        <path d="M 65 48 C 67 40 73 37 80 38 C 84 39 86 43 87 47" fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
        <path d="M 87 44 C 90 39 95 40 99 44 C 102 47 102 51 100 55" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
        <path d="M 100 52 C 103 50 107 53 108 58 C 109 64 105 69 102 71" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" />

        {/* Finger Grooves */}
        <path d="M 65 54 L 64 72" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.9" />
        <path d="M 87 48 L 86 70" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.9" />
        <path d="M 100 56 L 98 74" stroke={color} strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />

        {/* Finger Pads */}
        <path d="M 54 66 C 57 68 61 68 64 66" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 68 64 C 74 67 80 67 85 64" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M 88 65 C 92 67 95 67 98 65" stroke={color} strokeWidth="1.8" strokeLinecap="round" />

        {/* Locked Thumb */}
        <path
          d="M 42 70 C 41 78 45 84 52 85 C 60 86 70 85 76 79 C 79 76 78 70 73 69 C 66 68 56 69 50 71"
          fill={`url(#${gradId})`}
          stroke={color}
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path d="M 68 72 C 71 73 72 76 70 78" stroke={color} strokeWidth="1.6" strokeLinecap="round" />

        {/* Forearm & Tendons */}
        <path d="M 60 88 C 61 96 60 106 58 116" stroke={color} strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
        <path d="M 74 84 C 76 94 77 104 78 116" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        <path d="M 86 86 C 86 94 85 104 84 116" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />

        {/* Apex Chevron Badge */}
        <path d="M 62 124 L 70 118 L 78 124" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" filter={`url(#${filterId})`} />
      </svg>
    );
  }

  // TITAN TIER (3rd Place): Heavy Seismic Bedrock Slam + Hexagon HUD + Tectonic Cracks
  return (
    <svg
      className="prize-crater mx-auto h-28 w-28"
      viewBox="0 0 140 140"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id={bgGlowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="60%" stopColor={color} stopOpacity="0.06" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={gradId} x1="70" y1="30" x2="70" y2="115" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.08" />
        </linearGradient>
      </defs>

      {/* Ambient Glow & Heavy Tectonic Hexagon */}
      <circle cx="70" cy="70" r="56" fill={`url(#${bgGlowId})`} />
      <polygon points="70,16 116,42 116,98 70,124 24,98 24,42" stroke={color} strokeWidth="1.2" strokeDasharray="4 6" opacity="0.4" fill="none" />
      <circle cx="70" cy="70" r="60" stroke={color} strokeWidth="0.8" opacity="0.25" />

      {/* Heavy Seismic Crater Faultlines */}
      <g stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" filter={`url(#${filterId})`}>
        <path d="M 70 120 L 70 134" />
        <path d="M 70 14 L 70 26" />
        <path d="M 16 70 L 28 70" />
        <path d="M 112 70 L 124 70" />
        <path d="M 32 32 L 42 42" />
        <path d="M 108 32 L 98 42" />
        <path d="M 32 108 L 42 98" />
        <path d="M 108 108 L 98 98" />
      </g>

      {/* Tectonic Bedrock Plates */}
      <g stroke={color} strokeWidth="1.2" opacity="0.45">
        <path d="M 28 54 L 38 60 L 32 72 L 20 66" fill="none" />
        <path d="M 112 54 L 102 60 L 108 72 L 120 66" fill="none" />
      </g>

      {/* Hulk Fist Silhouette */}
      <path
        d="M 52 118 C 50 105 46 94 40 85 C 35 77 33 69 37 61 C 39 55 44 51 49 49 C 50 43 54 37 60 36 C 64 33 69 31 75 32 C 81 31 87 34 90 38 C 95 40 98 45 98 51 C 103 55 105 63 103 71 C 101 79 97 87 94 95 C 91 103 89 111 88 118 Z"
        fill={`url(#${gradId})`}
        stroke={color}
        strokeWidth="2.2"
        strokeLinejoin="round"
        filter={`url(#${filterId})`}
      />

      {/* Knuckle Ridge */}
      <path d="M 48 55 C 49 49 53 45 59 46 C 62 47 64 50 65 54" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M 65 47 C 67 39 73 36 80 37 C 84 38 86 42 87 46" fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M 87 43 C 90 38 95 39 99 43 C 102 46 102 50 100 54" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M 100 51 C 103 49 107 52 108 57 C 109 63 105 68 102 70" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" />

      {/* Finger Separations */}
      <path d="M 65 53 L 64 71" stroke={color} strokeWidth="1.9" strokeLinecap="round" opacity="0.85" />
      <path d="M 87 47 L 86 69" stroke={color} strokeWidth="1.9" strokeLinecap="round" opacity="0.85" />
      <path d="M 100 55 L 98 73" stroke={color} strokeWidth="1.7" strokeLinecap="round" opacity="0.8" />

      {/* Clenched Finger Pads */}
      <path d="M 54 65 C 57 67 61 67 64 65" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 68 63 C 74 66 80 66 85 63" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M 88 64 C 92 66 95 66 98 64" stroke={color} strokeWidth="1.8" strokeLinecap="round" />

      {/* Locked Thumb */}
      <path
        d="M 42 69 C 41 77 45 83 52 84 C 60 85 70 84 76 78 C 79 75 78 69 73 68 C 66 67 56 68 50 70"
        fill={`url(#${gradId})`}
        stroke={color}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M 68 71 C 71 72 72 75 70 77" stroke={color} strokeWidth="1.6" strokeLinecap="round" />

      {/* Forearm & Tendons */}
      <path d="M 60 87 C 61 95 60 105 58 115" stroke={color} strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
      <path d="M 74 83 C 76 93 77 103 78 115" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <path d="M 86 85 C 86 93 85 103 84 115" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />

      {/* Titan Crosshairs Core */}
      <circle cx="70" cy="56" r="3" fill={color} filter={`url(#${filterId})`} />
    </svg>
  );
}

export default function Prizes({ stage, index }) {
  // Desktop order puts 1st place in the middle (2nd · 1st · 3rd)
  const order = ['md:order-2', 'md:order-1', 'md:order-3'];
  return (
    <Section id="prizes" stage={stage} index={index} eyebrow="Rewards // Impact assessment" title="Prizes" provisional={!confirmed.prizes}>
      <ul className="grid items-end gap-5 md:grid-cols-3">
        {prizes.map((p, i) => {
          const tier = TIER[p.tier] ?? TIER.gold;
          const first = i === 0;
          return (
            <m.li
              key={p.place}
              className={order[i] ?? ''}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
            >
              <HudFrame
                stage={stage}
                className={`prize-card overflow-hidden px-6 pb-8 text-center ${first ? 'pt-10 md:pt-14' : 'pt-8'}`}
                style={{ '--tier': tier.color }}
                data-cursor
              >
                <span className="prize-ring" aria-hidden="true" />
                <HulkEmblem tierKey={p.tier} color={tier.color} first={first} />
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em]" style={{ color: tier.color }}>
                  {tier.label}
                </p>
                <h3 className="mt-1 font-display font-black uppercase leading-none text-ink" style={{ fontStretch: '95%' }}>
                  <span className={`block ${first ? 'text-7xl sm:text-8xl' : 'text-6xl sm:text-7xl'}`} style={{ color: tier.color, textShadow: `0 0 24px ${tier.color}55` }}>
                    {p.place}
                  </span>
                  <span className="mt-2 block text-xl sm:text-2xl">{p.title}</span>
                </h3>
                <p
                  className={`mt-4 font-display font-black tabular-nums leading-none ${first ? 'text-5xl sm:text-6xl' : 'text-4xl sm:text-5xl'}`}
                  style={{ color: tier.color, textShadow: `0 0 28px ${tier.color}88` }}
                >
                  {p.reward}
                </p>
              </HudFrame>
            </m.li>
          );
        })}
      </ul>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <HudFrame className="p-6" hazard={false}>
          <h3 className="font-display text-xl font-bold uppercase text-heading" style={{ fontStretch: '85%' }}>
            {specialMentions.title}
          </h3>
          <p className="mt-2 text-ink/90">{specialMentions.text}</p>
        </HudFrame>
        <HudFrame className="p-6" hazard={false}>
          <h3 className="font-display text-xl font-bold uppercase text-heading" style={{ fontStretch: '85%' }}>
            Goodies
          </h3>
          <p className="mt-2 text-ink/90">{goodies}</p>
        </HudFrame>
      </div>
    </Section>
  );
}
