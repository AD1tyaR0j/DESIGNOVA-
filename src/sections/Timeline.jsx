import { useEffect, useRef, useState } from 'react';
import { schedule, event, confirmed } from '../data/event';
import { subscribe } from '../lib/rage';
import { istMinutes, statusAt, useNow } from '../lib/time';
import Section from '../components/Section';

const toMin = (hhmm) => {
  const [h, mm] = hhmm.split(':').map(Number);
  return h * 60 + mm;
};

/** Index of the slot running right now (only on event day, while live). */
function useCurrentSlot() {
  const now = useNow(30000);
  if (statusAt(now) !== 'live') return -1;
  const mins = istMinutes(now);
  let idx = -1;
  schedule.forEach((s, i) => {
    if (toMin(s.time) <= mins) idx = i;
  });
  return idx;
}

const SEGMENTS = 20;

// Segment colour ramps gamma green (computed here: Safari 15 lacks calc() in rgb()).
const segStyle = (i) => {
  const t = i / (SEGMENTS - 1);
  const c = [Math.round(57 + (124 - 57) * t), 255, Math.round(20 * (1 - t))].join(',');
  return { '--seg': `rgb(${c})`, '--seg-glow': `rgba(57,255,20,${(0.2 + 0.5 * t).toFixed(2)})` };
};

export default function Timeline({ stage, index }) {
  const list = useRef(null);
  const fill = useRef(null);
  const pct = useRef(null);
  const segs = useRef(null);
  const [lit, setLit] = useState(0);
  const current = useCurrentSlot();

  // The rage meter fills as you scroll through the day.
  useEffect(
    () =>
      subscribe(() => {
        const el = list.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const line = window.innerHeight * 0.6;
        const p = Math.min(1, Math.max(0, (line - r.top) / r.height));
        if (fill.current) fill.current.style.transform = `scaleY(${p})`;
        if (pct.current) pct.current.textContent = `${Math.round(p * 100)}%`;
        if (segs.current) {
          const on = Math.round(p * SEGMENTS);
          [...segs.current.children].forEach((s, i) => (s.dataset.on = i < on ? 'true' : 'false'));
        }
        const items = [...el.querySelectorAll('[data-slot]')];
        const n = items.filter((it) => it.offsetTop + 20 <= p * r.height).length;
        setLit((prev) => (prev === n ? prev : n));
      }),
    [],
  );

  return (
    <Section
      id="schedule"
      stage={stage}
      index={index}
      eyebrow={`Schedule // Reporting ${event.reportingTime}`}
      title="Timeline of the day"
      provisional={!confirmed.schedule}
      intro="Every hour the pressure rises. Watch the rage meter fill as the day builds to the final pitch."
    >
      {/* Right side Hulk graphic with balanced transparency & background removal */}
      <div
        className="pointer-events-none absolute right-0 top-1/2 -z-10 h-[85%] max-h-[700px] w-full max-w-[550px] -translate-y-1/2 overflow-hidden opacity-50 mix-blend-screen select-none sm:w-1/2"
        aria-hidden="true"
      >
        <img
          src="/images/timeline-hulk-nobg.png"
          alt=""
          className="h-full w-full object-contain object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-void/40 to-void" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void" />
      </div>

      {/* Block on mobile so the meter can stick while the list scrolls; grid on desktop. */}
      <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-10">
        {/* Rage meter */}
        <div className="sticky top-[64px] z-10 mb-8 lg:top-28 lg:mb-0 lg:self-start">
          <div className="-mx-4 border-y border-accent/30 bg-void/95 px-4 py-3 sm:-mx-6 sm:px-6 lg:mx-0 lg:border lg:p-5" aria-hidden="true">
            <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.2em] text-accent-text">
              <span>Rage meter</span>
              <span ref={pct} className="text-ink">0%</span>
            </div>
            <div ref={segs} className="rage-segs mt-3 grid grid-cols-[repeat(20,1fr)] gap-[3px] lg:mt-5 lg:h-72 lg:grid-cols-1 lg:grid-rows-[repeat(20,1fr)]">
              {Array.from({ length: SEGMENTS }, (_, i) => (
                <span key={i} data-on="false" className="h-3 lg:h-auto" style={segStyle(i)} />
              ))}
            </div>
          </div>
        </div>

        {/* Schedule */}
        <ol ref={list} className="relative ml-2 sm:ml-4">
          <span className="absolute bottom-0 left-0 top-0 w-0.5 bg-white/10" aria-hidden="true" />
          <span className="tl-pulse" aria-hidden="true" />
          <span
            ref={fill}
            className="absolute bottom-0 left-0 top-0 w-0.5 origin-top bg-accent"
            style={{ transform: 'scaleY(0)', boxShadow: '0 0 12px rgb(var(--glow))' }}
            aria-hidden="true"
          />
          {schedule.map((s, i) => {
            const on = i < lit;
            const now = i === current;
            return (
              <li key={s.time + s.title} data-slot className="relative pb-8 pl-8 last:pb-0 sm:pl-12">
                <span
                  className={`absolute -left-[7px] top-1.5 h-4 w-4 rotate-45 border-2 transition-colors duration-300 ${
                    on ? 'border-gamma bg-gamma shadow-[0_0_12px_#39FF14]' : 'border-white/30 bg-void'
                  }`}
                  aria-hidden="true"
                />
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  {s.slot && (
                    <span className="font-mono text-xs font-bold text-gamma/80 border border-gamma/40 px-1.5 py-0.5 rounded">
                      {s.slot}
                    </span>
                  )}
                  <time className={`font-mono text-base sm:text-lg font-bold tabular-nums transition-colors ${on ? 'text-gamma' : 'text-muted'}`}>{s.time} IST</time>
                  <h3 className="font-display text-xl font-bold uppercase text-ink sm:text-2xl" style={{ fontStretch: '85%' }}>
                    {s.emoji && <span className="mr-2 not-uppercase">{s.emoji}</span>}{s.title}
                  </h3>
                  {now && <span className="bg-gamma px-2 py-0.5 font-mono text-xs font-bold uppercase text-void">Now</span>}
                </div>
                <p className="mt-1 text-ink/85">{s.text}</p>
              </li>
            );
          })}
        </ol>
      </div>

      <style>{`
        .rage-segs > span { background: rgb(255 255 255 / .08); transition: background-color .2s, box-shadow .2s; }
        .rage-segs > span[data-on='true'] { background: var(--seg); box-shadow: 0 0 6px var(--seg-glow); }
        @media (min-width: 1024px) {
          .rage-segs { display: flex; flex-direction: column-reverse; }
          .rage-segs > span { flex: 1; }
        }
      `}</style>
    </Section>
  );
}
