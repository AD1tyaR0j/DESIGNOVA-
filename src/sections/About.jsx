import { m } from 'framer-motion';
import { about, event, confirmed } from '../data/event';
import { END, START, splitDuration, statusAt, useNow } from '../lib/time';
import Section from '../components/Section';
import HudFrame from '../components/HudFrame';

function Countdown() {
  const now = useNow(1000);
  const status = statusAt(now);
  const parts = splitDuration(START - now);
  const units = [
    ['Days', parts.days],
    ['Hours', parts.hours],
    ['Minutes', parts.minutes],
    ['Seconds', parts.seconds],
  ];

  return (
    <HudFrame stage={0.15} className="p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="eyebrow">Countdown to ignition</p>
        <p className="font-mono text-xs text-muted">
          Start: {event.dateLabel}, {event.timeLabel.split('–')[0].trim()} IST
          {!confirmed.date && <span className="ml-2 text-[#ffd166]">(provisional)</span>}
        </p>
      </div>

      {status === 'upcoming' && (
        <div role="timer" aria-live="off" aria-label={`${parts.days} days, ${parts.hours} hours, ${parts.minutes} minutes until DESIGNOVA starts`}>
          <ol className="mt-6 grid grid-cols-4 gap-2 sm:gap-4">
            {units.map(([label, value]) => (
              <li key={label} className="border border-accent/30 bg-void/60 px-1 py-4 text-center sm:py-6">
                <span className="block font-display text-3xl font-extrabold tabular-nums text-ink xs:text-4xl sm:text-6xl" style={{ fontStretch: '80%' }}>
                  {String(value).padStart(2, '0')}
                </span>
                <span className="mt-1 block font-mono text-[0.65rem] uppercase tracking-[0.15em] text-accent-text sm:text-xs">{label}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {status === 'live' && (
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-3 bg-gamma px-4 py-2 font-display text-3xl font-black uppercase text-void sm:text-5xl">
            <span className="h-3 w-3 animate-pulse rounded-full bg-void" aria-hidden="true" />
            Live
          </span>
          <p className="text-ink">
            DESIGNOVA is happening now. Ends in {splitDuration(END - now).hours}h {splitDuration(END - now).minutes}m.
          </p>
        </div>
      )}

      {status === 'complete' && (
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <span className="border-2 border-gamma px-4 py-2 font-display text-3xl font-black uppercase text-gamma sm:text-5xl">Complete</span>
          <p className="text-ink">Transformation complete. Thank you to every designer who took part.</p>
        </div>
      )}
    </HudFrame>
  );
}

export default function About({ stage, index }) {
  return (
    <Section id="about" stage={stage} index={index} eyebrow="Brief // What is this?" title={about.heading} intro={about.intro}>
      {/* Backdrop image - lowered/aligned to top so head is clearly visible without clicking */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <img
          src="/images/about-bg.jpg"
          alt=""
          className="h-full w-full object-cover object-top opacity-55 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/30 opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/60 via-transparent to-void/60" />
      </div>

      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {about.steps.map((s, i) => (
          <m.li
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <HudFrame className="h-full p-6" hazard={i === 3}>
              <span className="font-mono text-xs text-accent-text">PHASE {String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-2 font-display text-2xl font-bold uppercase text-ink" style={{ fontStretch: '85%' }}>
                {s.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/85">{s.text}</p>
            </HudFrame>
          </m.li>
        ))}
      </ol>

      <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <h3 className="font-display text-3xl font-bold uppercase text-heading sm:text-4xl" style={{ fontStretch: '85%' }}>
            {about.whyHeading}
          </h3>
          <ul className="mt-5 space-y-4">
            {about.why.map((w) => (
              <li key={w} className="flex gap-3 leading-relaxed text-ink/90">
                <span className="mt-2 h-2 w-2 shrink-0 bg-accent" aria-hidden="true" />
                {w}
              </li>
            ))}
          </ul>
          <p className="mt-6 border-l-2 border-accent/60 pl-4 text-sm leading-relaxed text-ink/85">
            <strong className="font-semibold text-ink">Who can join:</strong> {event.eligibility}
          </p>
        </div>
        <Countdown />
      </div>
    </Section>
  );
}
