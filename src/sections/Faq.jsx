import { useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { faqs, confirmed } from '../data/event';
import Section from '../components/Section';

/**
 * Accordion, one panel open at a time. Headers are <button>s (Enter/Space
 * toggle); Up/Down/Home/End move between headers, per the WAI-ARIA pattern.
 */
export default function Faq({ stage, index }) {
  const [open, setOpen] = useState(0);
  const buttons = useRef([]);

  const onKey = (e, i) => {
    const last = faqs.length - 1;
    const go = { ArrowDown: i === last ? 0 : i + 1, ArrowUp: i === 0 ? last : i - 1, Home: 0, End: last }[e.key];
    if (go === undefined) return;
    e.preventDefault();
    buttons.current[go]?.focus();
  };

  return (
    <Section id="faq" stage={stage} index={index} eyebrow="Intel // Frequently asked" title="FAQ" provisional={!confirmed.faqs}>
      <div className="max-w-3xl border-t border-accent/30">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          const id = `faq-${i}`;
          return (
            <div key={f.q} className="border-b border-accent/30">
              <h3>
                <button
                  ref={(el) => (buttons.current[i] = el)}
                  id={`${id}-q`}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`${id}-a`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-lg font-bold uppercase text-ink hover:text-accent-text sm:text-xl"
                  style={{ fontStretch: '88%' }}
                >
                  <span>{f.q}</span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center border transition-[transform,border-color] duration-300 ${isOpen ? 'rotate-45 border-gamma text-gamma' : 'border-accent/50 text-accent-text'}`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <m.div
                    id={`${id}-a`}
                    role="region"
                    aria-labelledby={`${id}-q`}
                    key="panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="faq-panel mb-6 max-w-2xl py-1 leading-relaxed text-ink/90">{f.a}</p>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
