import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../lib/motion';

// Crack paths in a 100×100 box, each starting from its own corner.
// Later sections get more of them (cracks accumulate as the page transforms).
const CRACKS = [
  { corner: 'tr', d: 'M100 4 L84 14 L88 24 L70 36 L74 46 L58 56' },
  { corner: 'bl', d: 'M0 96 L16 84 L12 74 L30 64 L26 54 L42 46' },
  { corner: 'br', d: 'M96 100 L84 86 L90 74 L76 64 L80 50' },
  { corner: 'tl', d: 'M8 8 L20 22 L14 32 L28 42 L24 56' },
  { corner: 'tr', d: 'M100 4 L92 26 L98 38 L86 52' },
  { corner: 'bl', d: 'M0 96 L22 90 L32 94 L46 84' },
];

const POS = {
  tl: 'left-0 top-0',
  tr: 'right-0 top-0',
  bl: 'left-0 bottom-0',
  br: 'right-0 bottom-0',
};

function Cracks({ count, active }) {
  if (count <= 0) return null;
  const used = CRACKS.slice(0, count);
  const corners = [...new Set(used.map((c) => c.corner))];
  return corners.map((corner) => (
    <svg
      key={corner}
      className={`pointer-events-none absolute h-20 w-20 sm:h-28 sm:w-28 ${POS[corner]} ${active ? 'is-drawn' : ''}`}
      style={{ zIndex: -1 }} // behind content, above the frame fill
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      {used.map((c, i) =>
        c.corner === corner ? (
          <path
            key={i}
            d={c.d}
            pathLength="1"
            className="crack-path"
            fill="none"
            stroke="rgb(var(--accent))"
            strokeWidth="1.6"
            strokeLinejoin="bevel"
            style={{ animationDelay: `${i * 0.12}s`, opacity: 0.7 }}
          />
        ) : null,
      )}
    </svg>
  ));
}

/**
 * Angular sci-fi frame with hazard stripes, corner ticks and optional cracks.
 * `stage` (0–1) sets how cracked the frame is; cracks draw in once in view.
 */
export default function HudFrame({
  as: Tag = 'div',
  stage = 0,
  cracks,
  hazard = true,
  cut = 16,
  className = '',
  children,
  style,
  ...rest
}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const count = cracks ?? Math.round(stage * 4);

  useEffect(() => {
    if (!ref.current || !('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  // Gamma spotlight follows the cursor across the card, and the card tilts toward it
  // (mouse / trackpad only; off when animations are off).
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      el.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
      el.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
      el.style.setProperty('--tx', `${((0.5 - y) * 6).toFixed(2)}deg`);
      el.style.setProperty('--ty', `${((x - 0.5) * 8).toFixed(2)}deg`);
    };
    const leave = () => {
      el.style.setProperty('--tx', '0deg');
      el.style.setProperty('--ty', '0deg');
    };
    el.addEventListener('pointermove', move, { passive: true });
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <Tag ref={ref} className={`hud ${inView ? 'is-on' : ''} ${className}`} style={{ '--cut': `${cut}px`, ...style }} {...rest}>
      <span className="hud-edge" aria-hidden="true" />
      <span className="hud-fill" aria-hidden="true" />
      <span className="hud-spot" aria-hidden="true" />
      <span className="hud-sweep" aria-hidden="true" />
      {hazard && <span className="hud-hazard" aria-hidden="true" />}
      <span className="hud-tick tl" aria-hidden="true" />
      <span className="hud-tick br" aria-hidden="true" />
      <Cracks count={count} active={inView} />
      {children}
    </Tag>
  );
}
