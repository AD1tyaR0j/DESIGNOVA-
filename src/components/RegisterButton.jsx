import { useRef, useState } from 'react';
import { event } from '../data/event';
import { prefersReducedMotion } from '../lib/rage';
import { playImpact } from '../lib/audio';

/** Shockwave ring at the click point + short screen shake. Skipped for reduced motion. */
function impactAt() {
  // Screen shake and shockwave ring disabled per user request
}

export default function RegisterButton({ compact = false, className = '', label = 'Register now' }) {
  const [note, setNote] = useState(false);
  const timer = useRef(0);
  const url = event.registration.url;

  const onClick = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    // keyboard "clicks" have no pointer position: use the button centre
    const x = e.clientX || r.left + r.width / 2;
    const y = e.clientY || r.top + r.height / 2;
    impactAt(x, y);
    if (!url) {
      e.preventDefault();
      setNote(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setNote(false), 4000);
    }
  };

  return (
    <span className={`relative inline-flex ${className}`}>
      <a
        href={url || '#register'}
        target={url ? '_blank' : undefined}
        rel={url ? 'noopener noreferrer' : undefined}
        onClick={onClick}
        className={`btn btn-gamma w-full ${compact ? '!min-h-[44px] !px-4 !py-2 !text-xs' : ''}`}
        aria-describedby={note ? 'reg-note' : undefined}
      >
        {compact ? 'Register' : label}
        {url && <span className="sr-only"> (opens in a new tab)</span>}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M13 3L5 14h6l-1 7 8-11h-6z" />
        </svg>
      </a>
      <span
        id="reg-note"
        role="status"
        className={`absolute right-0 top-full z-10 mt-2 w-64 border border-gamma/60 bg-void px-3 py-2 text-left font-mono text-xs leading-relaxed text-ink shadow-lg transition-opacity ${
          note ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        {note ? event.registration.comingSoonText : ''}
      </span>
    </span>
  );
}
