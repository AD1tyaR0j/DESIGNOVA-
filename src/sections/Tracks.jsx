import { useEffect, useRef, useState } from 'react';
import { m } from 'framer-motion';
import { tracks, confirmed } from '../data/event';
import Section from '../components/Section';
import HudFrame from '../components/HudFrame';

// One jagged fracture across the card, drawn when the card charges up.
const FRACTURE = 'M0 62 L18 55 L24 63 L41 48 L47 57 L63 40 L70 49 L86 33 L100 38';

function TrackCard({ track, i, stage }) {
  const ref = useRef(null);
  const [charged, setCharged] = useState(false);

  // Touch screens have no hover: charge the card when it reaches mid-screen instead.
  useEffect(() => {
    if (window.matchMedia('(hover: hover)').matches) return;
    const io = new IntersectionObserver(([e]) => setCharged(e.isIntersecting), { rootMargin: '-40% 0px -40% 0px' });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <m.li
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      className="cq"
    >
      <HudFrame stage={stage} className="track-card group h-full overflow-hidden p-6 sm:p-7" data-charged={charged} data-cursor>
        <span className="track-energy" aria-hidden="true" />
        <svg className="track-fracture pointer-events-none absolute inset-x-0 top-1/3 h-1/3 w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d={FRACTURE} fill="none" stroke="#7CFF00" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="cq-row relative">
          <div className="flex items-center gap-3 lg:w-auto">
            <span className="grid h-14 w-14 shrink-0 place-items-center border border-accent/60 font-mono text-sm text-accent-text transition-colors group-hover:border-gamma group-hover:text-gamma">
              {track.code}
            </span>
          </div>
          <div>
            <h3 className="font-display text-2xl font-bold uppercase leading-tight text-ink sm:text-3xl" style={{ fontStretch: '85%' }}>
              {track.title}
            </h3>
            {track.stone && (
              <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-gamma/70">{track.stone}</p>
            )}
            <p className="mt-2 leading-relaxed text-ink/85">{track.text}</p>
            {track.tags && track.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {track.tags.map(tag => (
                  <span key={tag} className="rounded border border-gamma/30 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-gamma/80">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <p className="track-meter mt-4 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent-text" aria-hidden="true">
              Charge
              <span className="relative h-1.5 flex-1 overflow-hidden bg-white/10">
                <span className="track-meter-fill absolute inset-y-0 left-0 w-full origin-left bg-gamma" />
              </span>
            </p>
          </div>
        </div>
      </HudFrame>
    </m.li>
  );
}

export default function Tracks({ stage, index }) {
  return (
    <Section
      id="tracks"
      stage={stage}
      index={index}
      eyebrow="Tracks // Choose your problem space"
      title="Design tracks"
      provisional={!confirmed.tracks}
      intro="Pick a track, define the user, and design the transformation. Problem statements are revealed at the opening ceremony."
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tracks.map((t, i) => (
          <TrackCard key={t.code} track={t} i={i} stage={stage} />
        ))}
      </ul>
    </Section>
  );
}
