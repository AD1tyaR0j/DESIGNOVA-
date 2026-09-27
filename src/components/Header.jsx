import { useEffect, useRef, useState } from 'react';
import { event, media, nav } from '../data/event';
import { subscribe } from '../lib/rage';
import { audioAvailable, setMuted, useMuted } from '../lib/audio';
import { Picture } from './Img';
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
        <a href="#top" className="group nav-logo-wrap flex items-center gap-2.5 py-1" aria-label={`${event.name} ${event.year} — back to top`}>
          {/* Ambient energy aura */}
          <span
            className="pointer-events-none absolute -inset-x-2 -inset-y-1 rounded-full opacity-60 blur-md transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(57, 255, 20, 0.45), rgba(124, 255, 0, 0.18) 50%, transparent 75%)',
            }}
            aria-hidden="true"
          />

          {/* Logo container with pulse & shimmer */}
          <span className="relative flex h-8 sm:h-9 w-auto items-center overflow-hidden">
            <Picture
              src={media.logo}
              alt={event.name}
              width="240"
              height="72"
              eager
              className="nav-logo-img h-full w-auto max-w-[140px] sm:max-w-[170px] object-contain transition-transform duration-300 group-hover:scale-105"
              fallback={
                <span className="font-display text-xl font-extrabold uppercase tracking-wide text-ink" style={{ fontStretch: '85%' }}>
                  {event.name}
                </span>
              }
            />
            <span className="nav-logo-shimmer" aria-hidden="true" />
          </span>

          {/* 2026 Year tag */}
          <span className="relative rounded border border-gamma/40 bg-gamma/10 px-1.5 py-0.5 font-mono text-[0.65rem] font-bold tracking-widest text-gamma shadow-[0_0_8px_rgba(57,255,20,0.3)] transition-all duration-300 group-hover:border-gamma group-hover:bg-gamma group-hover:text-void group-hover:shadow-[0_0_12px_#39FF14]">
            {event.year}
          </span>
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
