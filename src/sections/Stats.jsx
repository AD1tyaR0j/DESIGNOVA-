import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { stats } from '../data/event';
import { prefersReducedMotion } from '../lib/rage';

function CountUp({ value, display, suffix = '', prefix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) {
      setN(value);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const dur = 1400;
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  const done = n === value;
  return (
    <span ref={ref} className="tabular-nums">
      {/* screen readers get the final value, not every intermediate number */}
      <span aria-hidden="true">
        {prefix}
        {done && display ? display : n.toLocaleString('en-IN')}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {display ?? value.toLocaleString('en-IN')}
        {suffix}
      </span>
    </span>
  );
}

export default function Stats({ stage }) {
  return (
    <section aria-label="DESIGNOVA in numbers" className="relative border-y border-accent/25 bg-panel/80 py-12" style={{ '--stage': stage }}>
      <div className="hazard-bar absolute inset-x-0 top-0 opacity-50" aria-hidden="true" />
      <dl className="container-site grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col-reverse text-center lg:border-l lg:border-accent/25 lg:first:border-l-0">
            <dt className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-accent-text sm:text-xs">{s.label}</dt>
            <dd className="stat-num font-display text-5xl font-black text-ink sm:text-6xl" style={{ fontStretch: '90%', textShadow: '0 0 calc(var(--rage) * 30px) rgb(var(--glow) / .5)' }}>
              <CountUp {...s} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
