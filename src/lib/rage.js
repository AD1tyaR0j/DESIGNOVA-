/* ==========================================================================
   RAGE ENGINE
   One number, `rage` (0 → 1), follows scroll progress through the page.
   It is written to CSS custom properties on <html> so every component can
   read it, and broadcast to canvas/cursor code via subscribe().

   Colours are interpolated here in JS rather than with CSS color-mix() or
   registered @property, because Safari 15 supports neither.
   ========================================================================== */
import { prefersReducedMotion } from './motion';

// Colour stops (RGB). Banner → unstable → Hulk.
const STOPS = [
  { t: 0, accent: [143, 163, 184], text: [168, 186, 204], heading: [143, 178, 201], glow: [61, 169, 255] },
  { t: 0.22, accent: [160, 32, 240], text: [201, 160, 255], heading: [79, 195, 247], glow: [138, 43, 226] },
  { t: 0.5, accent: [124, 255, 0], text: [124, 255, 0], heading: [79, 195, 247], glow: [57, 255, 20] },
  { t: 1, accent: [124, 255, 0], text: [124, 255, 0], heading: [79, 195, 247], glow: [57, 255, 20] },
];

const lerp = (a, b, t) => a + (b - a) * t;
const mix = (a, b, t) => a.map((v, i) => Math.round(lerp(v, b[i], t)));

export function paletteAt(r) {
  let i = 0;
  while (i < STOPS.length - 2 && r > STOPS[i + 1].t) i++;
  const a = STOPS[i];
  const b = STOPS[i + 1];
  const t = Math.min(1, Math.max(0, (r - a.t) / (b.t - a.t)));
  // ease so the colour change feels like a surge, not a linear fade
  const e = t * t * (3 - 2 * t);
  return {
    accent: mix(a.accent, b.accent, e),
    text: mix(a.text, b.text, e),
    heading: mix(a.heading, b.heading, e),
    glow: mix(a.glow, b.glow, e),
  };
}

// Device setting + the visitor's override from the header switch (see lib/motion.js).
export { prefersReducedMotion };

const state = { rage: 0, progress: 0, palette: paletteAt(0) };
const listeners = new Set();

export const getRage = () => state;

export function subscribe(fn) {
  listeners.add(fn);
  fn(state);
  return () => listeners.delete(fn);
}

let started = false;
let frame = 0;
let lastWritten = -1;

function compute() {
  frame = 0;
  const doc = document.documentElement;
  const max = Math.max(1, doc.scrollHeight - window.innerHeight);
  const progress = Math.min(1, Math.max(0, window.scrollY / max));
  // Reduced motion: no continuous blend — snap to three calm stages.
  const rage = prefersReducedMotion() ? (progress < 0.2 ? 0 : progress < 0.55 ? 0.5 : 1) : progress;

  state.progress = progress;
  if (Math.abs(rage - lastWritten) > 0.002 || rage === 0 || rage === 1) {
    lastWritten = rage;
    state.rage = rage;
    state.palette = paletteAt(rage);
    const p = state.palette;
    const s = doc.style;
    s.setProperty('--rage', rage.toFixed(3));
    s.setProperty('--accent', p.accent.join(' '));
    s.setProperty('--accent-text', p.text.join(' '));
    s.setProperty('--heading', p.heading.join(' '));
    s.setProperty('--glow', p.glow.join(' '));
  }
  listeners.forEach((fn) => fn(state));
}

const schedule = () => {
  if (!frame) frame = requestAnimationFrame(compute);
};

export function startRage() {
  if (started) return;
  started = true;
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener?.('change', schedule);
  if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(document.body);
  compute();
}

/** Static per-section "stage" → heading width/weight. Later sections are heavier and wider. */
export function headingAxes(stage) {
  const s = Math.min(1, Math.max(0, stage));
  return {
    '--hw': Math.round(300 + 600 * s),
    '--hs': `${Math.round(62 + 48 * s)}%`,
    '--hs-sm': `${Math.round(62 + 30 * s)}%`,
  };
}
