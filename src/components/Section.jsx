import { useEffect, useRef, useState } from 'react';
import { headingAxes } from '../lib/rage';

/**
 * Page section with the transforming heading. `stage` (0–1) is the section's
 * position in the story: later sections get heavier, wider headings.
 * On entering view the heading smashes in, shakes, and a crack draws beneath it.
 */
export default function Section({ id, stage = 0, index, eyebrow, title, provisional, intro, className = '', children }) {
  const headingId = `${id}-title`;
  const head = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = head.current;
    if (!el || !('IntersectionObserver' in window)) return setInView(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -15% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <ZoneDivider index={index} stage={stage} />
      <section id={id} aria-labelledby={headingId} className={`relative py-20 sm:py-28 ${className}`} style={headingAxes(stage)}>
        <div className="container-site">
          <header ref={head} className={`sec-head mb-10 max-w-3xl sm:mb-14 ${inView ? 'is-in' : ''}`}>
            <p className="eyebrow sec-eyebrow mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span aria-hidden="true">{String(index).padStart(2, '0')} //</span>
              <span>{eyebrow}</span>
              {provisional && (
                <span className="tag-provisional" title="Details still to be confirmed">
                  <span aria-hidden="true">▲</span> Provisional
                </span>
              )}
            </p>
            <h2 id={headingId} className="h-trans sec-title relative inline-block text-[2.4rem] xs:text-5xl sm:text-6xl lg:text-7xl">
              {title}
            </h2>
            {/* ground crack from the heading's impact */}
            <svg className={`sec-crack block h-5 w-full max-w-md ${inView ? 'is-drawn' : ''}`} viewBox="0 0 400 20" preserveAspectRatio="none" aria-hidden="true">
              <path
                className="crack-path"
                pathLength="1"
                d="M0 6 L60 8 L74 3 L96 12 L130 7 L150 14 L176 6 L210 10 L232 4 L262 12 L300 8 L322 15 L350 6 L400 9"
                fill="none"
                stroke="rgb(var(--accent))"
                strokeWidth="1.5"
                style={{ animationDelay: '.45s' }}
              />
            </svg>
            {intro && <p className="sec-intro mt-4 max-w-2xl text-base leading-relaxed text-ink/90 sm:text-lg">{intro}</p>}
          </header>
          {children}
        </div>
      </section>
    </>
  );
}

/** Animated hazard-stripe band between sections: "radiation zone" readout. */
function ZoneDivider({ index, stage }) {
  return (
    <div className="zone-divider relative flex items-center gap-3 overflow-hidden" aria-hidden="true">
      <span className="zone-stripes h-2 flex-1" />
      <span className="shrink-0 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-accent-text">
        Zone {String(index).padStart(2, '0')} · <span className="normal-case">γ</span> {Math.round(stage * 100)}%
      </span>
      <span className="zone-stripes h-2 flex-1" />
    </div>
  );
}
