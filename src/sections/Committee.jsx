import { useEffect, useState } from 'react';
import { committee, confirmed } from '../data/event';
import Section from '../components/Section';
import HudFrame from '../components/HudFrame';
import { hasAsset } from '../lib/assets';

const initials = (name) =>
  name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

function FlipCommitteeCard({ person, i, stage }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`card-flip-container group relative w-[300px] sm:w-[340px] h-[470px] shrink-0 cursor-pointer ${isFlipped ? 'is-flipped' : ''}`}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped((f) => !f)}
      role="button"
      tabIndex={0}
      aria-label={`${person.name} committee details`}
    >
      {/* Static 2D hit overlay - guarantees mouse hover NEVER slips off during 3D rotation */}
      <div className="absolute inset-0 z-30 pointer-events-auto" aria-hidden="true" />

      <div className="card-flip-inner pointer-events-none">
        {/* ================= FRONT FACE ================= */}
        <div className="card-face card-face-front flex flex-col justify-between">
          <HudFrame stage={stage} className="h-full w-full p-5 sm:p-6 flex flex-col justify-between" data-cursor>
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 font-mono text-xs text-accent-text">
              <span className="font-bold text-gamma">FILE {String(i + 1).padStart(3, '0')}</span>
              <span
                className="h-2 w-10 opacity-70"
                style={{ background: 'repeating-linear-gradient(-45deg, rgb(var(--accent)) 0 4px, transparent 4px 8px)' }}
              />
            </div>

            {/* Hulk Avatar Showcase */}
            <div className="my-2 grid place-items-center">
              {hasAsset(person.avatar) ? (
                <span className="relative block w-full h-60 sm:h-64 overflow-hidden border-2 border-gamma/70 bg-void/90 p-1 shadow-[0_0_20px_rgba(57,255,20,0.35)] transition-transform duration-300 group-hover:border-gamma">
                  <img src={person.avatar} alt={person.name} loading="eager" decoding="sync" className="h-full w-full object-contain object-center scale-115 sm:scale-125 transition-transform duration-300 group-hover:scale-[1.3]" />
                </span>
              ) : (
                <span
                  className="grid h-36 w-36 place-items-center border-2 border-gamma/70 bg-gamma/10 font-display text-5xl font-black text-ink shadow-[0_0_20px_rgba(57,255,20,0.25)] transition-transform duration-300 group-hover:scale-105 group-hover:border-gamma"
                  style={{ fontStretch: '90%' }}
                >
                  {initials(person.name)}
                </span>
              )}
            </div>

            {/* Name & Role */}
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold uppercase leading-tight text-ink" style={{ fontStretch: '88%' }}>
                {person.name}
              </h3>
              <p className="mt-1 font-mono text-xs text-gamma/80">{person.role}</p>

              <div className="mt-3 flex items-center justify-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-widest text-gamma/70 transition-colors group-hover:text-gamma">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                </svg>
                <span>Hover to flip 3D specs</span>
              </div>
            </div>
          </HudFrame>
        </div>

        {/* ================= BACK FACE ================= */}
        <div className="card-face card-face-back flex flex-col justify-between">
          <HudFrame
            stage={stage}
            className="h-full w-full overflow-hidden border-gamma/70 bg-void/95 p-0 relative"
            style={{ boxShadow: '0 0 24px rgba(57,255,20,0.2)' }}
            data-cursor
          >
            {hasAsset(person.photo) ? (
              <img
                src={person.photo}
                alt={person.name}
                width="600"
                height="600"
                loading="eager"
                decoding="sync"
                className={`h-full w-full object-cover ${person.photoClass || 'object-top'}`}
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-2 p-4 text-center bg-void/90">
                <span className="font-mono text-xs uppercase tracking-widest text-gamma font-bold">Crew File // Active</span>
                <span className="grid h-16 w-16 place-items-center border border-gamma/50 bg-gamma/10 font-display text-2xl font-bold text-gamma">
                  {initials(person.name)}
                </span>
                <span className="font-mono text-[0.7rem] text-muted">IEEE GUSB CS Team</span>
              </div>
            )}

            {/* Gradient Overlay & Info */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-void via-void/85 to-transparent p-5 pt-12">
              <span className="block font-mono text-[0.65rem] uppercase tracking-widest text-gamma font-bold">
                [ COMMITTEE CREW ]
              </span>
              <h3 className="mt-1 font-display text-lg font-bold uppercase text-ink" style={{ fontStretch: '88%' }}>
                {person.name}
              </h3>
              <p className="text-xs text-ink/85">{person.role}</p>
            </div>
          </HudFrame>
        </div>
      </div>
    </div>
  );
}

export default function Committee({ stage, index }) {
  // Preload AND GPU-decode all team member images on mount → 0ms hover latency
  useEffect(() => {
    committee.forEach((p) => {
      if (p.photo) {
        const img = new Image();
        img.src = p.photo;
        img.decode?.().catch(() => {});
      }
      if (p.avatar) {
        const img = new Image();
        img.src = p.avatar;
        img.decode?.().catch(() => {});
      }
    });
  }, []);

  // Duplicate committee to create infinite seamless auto-rotation
  const marqueeCommittee = [...committee, ...committee];

  return (
    <Section
      id="team"
      stage={stage}
      index={index}
      eyebrow="Personnel // Lab crew"
      title="Organising committee"
      provisional={!confirmed.committee}
      intro="The people behind DESIGNOVA."
    >
      {/* Auto-Rotating Marquee Carousel */}
      <div className="marquee-wrapper overflow-hidden py-4 -mx-4 sm:-mx-6 px-4 sm:px-6">
        <div className="marquee-track">
          {marqueeCommittee.map((p, i) => (
            <FlipCommitteeCard key={`${p.name}-${i}`} person={p} i={i} stage={stage} />
          ))}
        </div>
      </div>
    </Section>
  );
}
