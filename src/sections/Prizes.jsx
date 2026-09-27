import { m } from 'framer-motion';
import { prizes, specialMentions, goodies, confirmed } from '../data/event';
import Section from '../components/Section';
import HudFrame from '../components/HudFrame';

const TIER = {
  gold: { color: '#7CFF00', label: 'Gamma tier' },
  silver: { color: '#39FF14', label: 'Apex tier' },
  bronze: { color: '#A3FF2E', label: 'Titan tier' },
};

/** Fist-impact crater: concentric rings + radial fractures (original SVG). */
function Crater({ color }) {
  return (
    <svg className="prize-crater mx-auto h-28 w-28" viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="60" cy="60" r="16" fill={color} opacity=".18" />
      <circle cx="60" cy="60" r="26" fill="none" stroke={color} strokeWidth="1.5" opacity=".7" />
      <circle cx="60" cy="60" r="40" fill="none" stroke={color} strokeWidth="1" strokeDasharray="4 5" opacity=".5" />
      {[0, 50, 110, 160, 215, 270, 320].map((a) => {
        const r = (a * Math.PI) / 180;
        const x1 = 60 + Math.cos(r) * 26;
        const y1 = 60 + Math.sin(r) * 26;
        const x2 = 60 + Math.cos(r + 0.15) * 44;
        const y2 = 60 + Math.sin(r + 0.15) * 44;
        const x3 = 60 + Math.cos(r - 0.05) * 56;
        const y3 = 60 + Math.sin(r - 0.05) * 56;
        return <path key={a} d={`M${x1} ${y1} L${x2} ${y2} L${x3} ${y3}`} fill="none" stroke={color} strokeWidth="1.5" />;
      })}
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
                <Crater color={tier.color} />
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
