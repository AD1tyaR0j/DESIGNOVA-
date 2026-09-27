import { useRef } from 'react';
import { m, useInView } from 'framer-motion';
import { judging, confirmed } from '../data/event';
import Section from '../components/Section';
import HudFrame from '../components/HudFrame';

function PowerBar({ title, weight, i, max }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const id = `crit-${i}`;
  return (
    <li ref={ref}>
      <div className="flex items-baseline justify-between gap-4">
        <h3 id={id} className="font-display text-lg font-bold uppercase text-ink sm:text-xl" style={{ fontStretch: '85%' }}>
          {title}
        </h3>
        <span className="font-mono text-lg tabular-nums text-accent-text">{weight}%</span>
      </div>
      <div
        className="power-track relative mt-2 h-5 overflow-hidden border border-accent/40 bg-void"
        role="meter"
        aria-labelledby={id}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={weight}
        aria-valuetext={`${weight} percent of the total score`}
      >
        <m.div
          className="power-fill absolute inset-y-0 left-0 origin-left"
          style={{ width: `${(weight / max) * 100}%` }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: inView ? 1 : 0 }}
          transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
        />
      </div>
    </li>
  );
}

export default function Judging({ stage, index }) {
  const max = Math.max(...judging.map((j) => j.weight));
  const total = judging.reduce((a, j) => a + j.weight, 0);
  return (
    <Section
      id="judging"
      stage={stage}
      index={index}
      eyebrow="Judging // Power readout"
      title="Judging criteria"
      provisional={!confirmed.judging}
      intro="Judges score the whole journey — from how well you understood the problem to how convincingly you pitch the solution."
    >
      <HudFrame stage={stage} className="p-6 sm:p-10">
        <ul className="grid gap-7 md:grid-cols-2 md:gap-x-12">
          {judging.map((j, i) => (
            <PowerBar key={j.title} {...j} i={i} max={max} />
          ))}
        </ul>
        <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-muted">
          Bar length is relative to the heaviest criterion · Total {total}%
        </p>
      </HudFrame>
      <style>{`
        .power-fill {
          background:
            repeating-linear-gradient(90deg, transparent 0 10px, rgb(5 5 5 / .85) 10px 13px),
            linear-gradient(90deg, #1b5e20, #39FF14, #7CFF00);
          box-shadow: 0 0 14px rgb(57 255 20 / .45);
        }
      `}</style>
    </Section>
  );
}
