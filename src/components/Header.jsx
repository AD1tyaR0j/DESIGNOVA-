import { useEffect, useRef, useState } from 'react';
import { event, nav } from '../data/event';
import { subscribe } from '../lib/rage';
import { prefersReducedMotion, setMotion } from '../lib/motion';
import { audioAvailable, setMuted, useMuted } from '../lib/audio';
import RegisterButton from './RegisterButton';

/** Scroll-progress bar styled as a gamma energy meter with a live readout. */
function GammaMeter() {
  const bar = useRef(null);
  const readout = useRef(null);
  useEffect(
    () =>
      subscribe(({ progress }) => {
        if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
        if (readout.current) readout.current.textContent = `${String(Math.round(progress * 100)).padStart(3, '0')}%`;
      }),
    [],
  );
  return (
    <>
      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/5" aria-hidden="true">
        <div
          ref={bar}
          className="h-full origin-left bg-accent"
          style={{ transform: 'scaleX(0)', boxShadow: '0 0 calc(4px + var(--rage) * 14px) rgb(var(--glow))' }}
        />
      </div>
      <span className="hidden font-mono text-xs tracking-widest text-accent-text xl:inline" aria-hidden="true">
        γ <span ref={readout}>000%</span>
      </span>
    </>
  );
}

function SoundToggle() {
  const muted = useMuted();
  if (!audioAvailable) return null;
  return (
    <button
      type="button"
      onClick={() => setMuted(!muted)}
      aria-pressed={!muted}
      aria-label={muted ? 'Sound off. Turn sound on' : 'Sound on. Turn sound off'}
      className="grid h-11 w-11 place-items-center border border-accent/50 text-accent-text hover:bg-accent/15"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M4 9h4l5-4v14l-5-4H4z" />
        {muted ? <path d="M17 9l5 6M22 9l-5 6" /> : <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" />}
      </svg>
    </button>
  );
}

/** Animations on/off — overrides the device's reduced-motion setting for this browser. */
function MotionToggle() {
  const on = !prefersReducedMotion();
  return (
    <button
      type="button"
      onClick={() => setMotion(!on)}
      aria-pressed={on}
      title={on ? 'Turn animations off' : 'Turn animations on'}
      className={`flex h-11 items-center gap-2 border px-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] ${
        on ? 'border-accent/50 text-accent-text hover:bg-accent/15' : 'border-gamma text-gamma hover:bg-gamma/10'
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M13 3L5 14h6l-1 7 8-11h-6z" />
        {!on && <path d="M3 3l18 18" />}
      </svg>
      <span className="sr-only xs:not-sr-only">Animations {on ? 'on' : 'off'}</span>
    </button>
  );
}

export default function Header() {
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuBtn = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => subscribe(({ progress }) => setScrolled(progress > 0.005)), []);

  // Highlight the section in view
  useEffect(() => {
    const els = nav.map((n) => document.getElementById(n.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => io.observe(el));
    const onTop = () => window.scrollY < window.innerHeight * 0.4 && setActive('');
    window.addEventListener('scroll', onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onTop);
    };
  }, []);

  // Mobile menu: Esc closes, focus moves in and back, scroll lock fallback for no-:has()
  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open);
    if (!open) return;
    menuRef.current?.querySelector('a')?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1280 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const linkCls = (id) =>
    `relative px-2 py-2 font-mono text-[0.75rem] uppercase tracking-[0.14em] transition-colors ${
      active === id ? 'text-accent-text' : 'text-ink/80 hover:text-ink'
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-[background-color,border-color] duration-300 ${
        scrolled || open ? 'border-b border-accent/20 bg-void/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
      style={{ WebkitBackdropFilter: scrolled || open ? 'blur(12px)' : undefined }}
    >
      <div className="container-site flex h-16 items-center justify-between gap-3">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="font-display text-xl font-extrabold uppercase tracking-wide text-ink" style={{ fontStretch: '85%' }}>
            {event.name}
          </span>{' '}
          <span className="font-mono text-xs text-accent-text">{event.year}</span>
          <span className="sr-only"> — back to top</span>
        </a>

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center">
            {nav.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className={linkCls(n.id)} aria-current={active === n.id ? 'true' : undefined}>
                  {n.label}
                  {active === n.id && <span className="absolute inset-x-2 -bottom-0.5 h-0.5 bg-accent" aria-hidden="true" />}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <GammaMeter />
          <MotionToggle />
          <SoundToggle />
          <RegisterButton compact className="hidden sm:inline-flex" />
          <button
            ref={menuBtn}
            type="button"
            className="grid h-11 w-11 place-items-center border border-accent/50 text-ink xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 6h18M3 12h18M3 18h12" />}
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        data-open={open}
        hidden={!open}
        className="h-[calc(100vh-4rem)] overflow-y-auto border-t border-accent/20 bg-void xl:hidden"
      >
        <nav aria-label="Mobile" className="container-site py-6">
          <ul className="grid gap-1">
            {nav.map((n, i) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 border-b border-white/5 py-3.5 font-display text-2xl font-bold uppercase text-ink"
                  style={{ fontStretch: '85%' }}
                  aria-current={active === n.id ? 'true' : undefined}
                >
                  <span className="font-mono text-xs text-accent-text">{String(i + 1).padStart(2, '0')}</span>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <RegisterButton className="mt-8 w-full" />
        </nav>
      </div>
    </header>
  );
}
