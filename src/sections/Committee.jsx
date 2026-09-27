import { useState } from 'react';
import { committee, confirmed } from '../data/event';
import Section from '../components/Section';
import { hasAsset } from '../lib/assets';

const initials = (name) =>
  name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

/**
 * Flip card: front = subject file (name/role), back = photo.
 * It's a real <button> with aria-pressed, so click, tap, Enter and Space all work.
 * Reduced motion swaps the 3D flip for a cross-fade (see CSS below).
 */
function FlipCard({ person, i }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <li>
      <button
        type="button"
        className="flip group relative block aspect-[4/5] w-full text-left"
        aria-pressed={flipped}
        onClick={() => setFlipped((f) => !f)}
      >
        <span className="sr-only">
          {person.name}, {person.role}. {flipped ? 'Showing photo. Press to show details.' : 'Press to show photo.'}
        </span>
        <span className="flip-inner" data-flipped={flipped} aria-hidden="true">
          {/* front */}
          <span className="flip-face flex flex-col justify-between border border-accent/40 bg-panel p-5">
            <span className="flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent-text">
              <span>File {String(i + 1).padStart(3, '0')}</span>
              <span className="h-2 w-10" style={{ background: 'repeating-linear-gradient(-45deg, rgb(var(--accent)) 0 4px, transparent 4px 8px)' }} />
            </span>
            <span className="grid flex-1 place-items-center">
              <span className="grid h-24 w-24 place-items-center border-2 border-accent/70 font-display text-4xl font-black text-ink sm:h-28 sm:w-28" style={{ fontStretch: '90%' }}>
                {initials(person.name)}
              </span>
            </span>
            <span>
              <span className="block font-display text-xl font-bold uppercase leading-tight text-ink sm:text-2xl" style={{ fontStretch: '88%' }}>
                {person.name}
              </span>
              <span className="mt-1 block text-sm text-ink/85">{person.role}</span>
              <span className="mt-3 block font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent-text">Tap to reveal ▸</span>
            </span>
          </span>
          {/* back */}
          <span className="flip-face flip-back block overflow-hidden border border-gamma/70 bg-panel">
            {hasAsset(person.photo) ? (
              <img src={person.photo} alt="" width="600" height="600" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            ) : (
              // span-only placeholder: a <button> may not contain block elements
              <span className="flex h-full flex-col items-center justify-center gap-2 p-4 pb-20 text-center">
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-accent-text">Photo pending</span>
                <span className="break-all font-mono text-xs text-ink">public{person.photo}</span>
                <span className="font-mono text-[0.7rem] text-muted">600×600</span>
              </span>
            )}
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-void via-void/80 to-transparent p-4 pt-10">
              <span className="block font-display text-lg font-bold uppercase text-ink" style={{ fontStretch: '88%' }}>
                {person.name}
              </span>
              <span className="block text-sm text-ink/85">{person.role}</span>
            </span>
          </span>
        </span>
      </button>
    </li>
  );
}

export default function Committee({ stage, index }) {
  return (
    <Section
      id="team"
      stage={stage}
      index={index}
      eyebrow="Personnel // Lab crew"
      title="Organising committee"
      provisional={!confirmed.committee}
      intro="The people behind DESIGNOVA. Tap or press a card to reveal the face behind the file."
    >
      <ul className="grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {committee.map((p, i) => (
          <FlipCard key={`${p.name}-${i}`} person={p} i={i} />
        ))}
      </ul>
      <style>{`
        .flip { perspective: 1200px; -webkit-perspective: 1200px; }
        .flip-inner {
          position: absolute; inset: 0; display: block;
          transform-style: preserve-3d; -webkit-transform-style: preserve-3d;
          transition: transform .6s cubic-bezier(.3,.7,.2,1);
        }
        .flip-inner[data-flipped='true'] { transform: rotateY(180deg); }
        .flip-face {
          position: absolute; inset: 0;
          backface-visibility: hidden; -webkit-backface-visibility: hidden;
        }
        .flip-back { transform: rotateY(180deg); }
        .flip:hover .flip-face { border-color: #7CFF00; }
        .flip:focus-visible { outline: 2px solid #7CFF00; outline-offset: 4px; }
        html.rm .flip-inner, html.rm .flip-inner[data-flipped='true'] { transform: none; }
        html.rm .flip-back { transform: none; opacity: 0; transition: opacity .2s !important; }
        html.rm .flip-inner[data-flipped='true'] .flip-back { opacity: 1; }
      `}</style>
    </Section>
  );
}
