import { useEffect, useRef, useState, useCallback } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { tracks, confirmed, event } from '../data/event';
import Section from '../components/Section';
import HudFrame from '../components/HudFrame';

// One jagged fracture across the card, drawn when the card charges up.
const FRACTURE = 'M0 62 L18 55 L24 63 L41 48 L47 57 L63 40 L70 49 L86 33 L100 38';

function TrackModal({ track, stage, onClose }) {
  const [queueIndex, setQueueIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const statements = track.problemStatements || [];
  const current = statements[queueIndex] || {};

  const handleNext = useCallback(() => {
    if (statements.length > 0) {
      setQueueIndex((prev) => (prev + 1) % statements.length);
    }
  }, [statements.length]);

  const handlePrev = useCallback(() => {
    if (statements.length > 0) {
      setQueueIndex((prev) => (prev - 1 + statements.length) % statements.length);
    }
  }, [statements.length]);

  // Lock body scroll while modal is open & listen for keyboard shortcuts
  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, handleNext, handlePrev]);

  const handleCopy = () => {
    if (!current.title) return;
    const briefText = `DESIGNOVA 2026 // TRACK: ${track.code} - ${track.title} (${track.stone})
STATEMENT: [${current.id}] ${current.title}
${current.subtitle ? `SUBTITLE: ${current.subtitle}\n` : ''}DIFFICULTY: ${current.difficulty}

${current.context ? `CONTEXT:\n${current.context}\n\n` : ''}CHALLENGE BRIEF:
${current.challenge}

${current.constraint ? `CRITICAL CONSTRAINT:\n${current.constraint}\n\n` : ''}${current.researchQuestions ? `RESEARCH QUESTIONS TO PROVE:\n${current.researchQuestions.map((q, i) => `[?] ${q}`).join('\n')}\n\n` : ''}${current.note ? `SPECIAL NOTE:\n${current.note}\n\n` : ''}${current.requiredStates ? `${current.requiredStatesTitle || 'MANDATORY SPECIFICATION STATES'}:\n${current.requiredStates.map((s, i) => `[${i + 1}] ${s}`).join('\n')}\n\n` : ''}TARGET USERS:
${current.targetUser}

KEY DELIVERABLES:
${current.deliverables?.map((d, i) => `[${i + 1}] ${d}`).join('\n')}

EVALUATION FOCUS:
${current.focus?.join(' · ')}

EXPECTED OUTPUT:
${current.expectedOutput}
`;

    navigator.clipboard?.writeText(briefText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-7 bg-black/92 backdrop-blur-2xl"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${track.title} problem statements`}
    >
      <m.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ type: 'spring', damping: 26, stiffness: 320 }}
        className="relative w-full max-w-6xl h-[94vh] flex flex-col bg-[#07090e] border-2 border-gamma/70 shadow-[0_0_80px_rgba(57,255,20,0.35)] overflow-hidden"
        style={{
          clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Hazard Bar */}
        <div className="hazard-bar opacity-85 w-full shrink-0" aria-hidden="true" />

        {/* Modal Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gamma/25 bg-[#0e111a] px-4 sm:px-6 py-3.5 shrink-0">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-12 sm:w-14 place-items-center border-2 border-gamma bg-gamma/20 font-mono text-sm font-black text-gamma shadow-[0_0_12px_rgba(57,255,20,0.4)]">
              {track.code}
            </span>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="font-display text-xl sm:text-2xl font-black uppercase text-white tracking-wide" style={{ fontStretch: '88%' }}>
                  {track.title}
                </h2>
                {track.stone && (
                  <span className="hidden xs:inline-block rounded border border-gamma/60 bg-gamma/15 px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-widest text-gamma font-bold">
                    {track.stone}
                  </span>
                )}
              </div>
              <p className="font-mono text-xs text-muted">
                PROBLEM QUEUE // <span className="text-gamma font-bold">{statements.length} STATEMENTS ONLINE</span> · USE ARROW KEYS [← →] TO NAVIGATE
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block font-mono text-xs text-muted uppercase tracking-widest">
              [ESC TO CLOSE]
            </span>
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 rounded border-2 border-white/30 bg-white/10 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white transition-all hover:border-gamma hover:bg-gamma hover:text-black hover:shadow-[0_0_20px_rgba(57,255,20,0.6)] active:scale-95 cursor-pointer"
              aria-label="Close modal"
            >
              <span>CLOSE</span>
              <span className="text-sm font-black">✕</span>
            </button>
          </div>
        </div>

        {/* Queue Switcher Bar */}
        <div className="border-b border-white/15 bg-[#090b12] px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 overflow-x-auto py-1 terminal-scroll min-w-0 flex-1">
            <span className="shrink-0 font-mono text-[0.7rem] uppercase tracking-widest text-gamma font-bold mr-1 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-gamma animate-pulse" />
              <span>QUEUE:</span>
            </span>
            {statements.map((s, idx) => {
              const isActive = idx === queueIndex;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setQueueIndex(idx)}
                  className={`group shrink-0 flex items-center gap-2 rounded px-3 py-1.5 font-mono text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'border-2 border-gamma bg-gamma/25 text-white font-bold shadow-[0_0_16px_rgba(57,255,20,0.4)]'
                      : 'border border-white/20 bg-panel text-muted hover:border-gamma/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className={`inline-block h-2 w-2 rounded-full ${isActive ? 'bg-gamma shadow-[0_0_8px_#39ff14]' : 'bg-white/30'}`} />
                  <span className={isActive ? 'text-white font-bold' : ''}>{s.id}</span>
                  <span className="text-[0.72rem] opacity-90 truncate max-w-[130px] sm:max-w-[200px]">
                    · {s.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Prev / Next Controls */}
          <div className="flex items-center gap-1.5 font-mono text-xs shrink-0 pl-2 border-l border-white/10">
            <button
              type="button"
              onClick={handlePrev}
              className="rounded border border-white/20 bg-white/5 px-2.5 sm:px-3 py-1.5 text-ink transition-colors hover:border-gamma hover:text-gamma hover:bg-gamma/10 active:scale-95 cursor-pointer font-bold"
              title="Previous Statement (Left Arrow)"
              aria-label="Previous Statement"
            >
              ← Prev
            </button>
            <span className="px-1.5 text-xs text-gamma font-bold tabular-nums">
              {queueIndex + 1}/{statements.length}
            </span>
            <button
              type="button"
              onClick={handleNext}
              className="rounded border border-white/20 bg-white/5 px-2.5 sm:px-3 py-1.5 text-ink transition-colors hover:border-gamma hover:text-gamma hover:bg-gamma/10 active:scale-95 cursor-pointer font-bold"
              title="Next Statement (Right Arrow)"
              aria-label="Next Statement"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Scrollable Problem Statement Content */}
        <div className="terminal-scroll flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 bg-gradient-to-b from-[#07090e] via-[#090c14] to-[#07090e]">
          <AnimatePresence mode="wait">
            <m.div
              key={current.id || queueIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Title & Metadata Header */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wider">
                  <span className="rounded bg-gamma/20 border-2 border-gamma px-2.5 py-1 text-white font-black shadow-[0_0_12px_rgba(57,255,20,0.3)]">
                    STATEMENT {current.id}
                  </span>
                  <span className="rounded bg-white/10 border border-white/25 px-2.5 py-1 text-white font-bold">
                    {current.difficulty}
                  </span>
                  <span className="rounded bg-accent/15 border border-accent/40 px-2.5 py-1 text-accent-text font-bold">
                    TRACK // {track.code}
                  </span>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight leading-tight" style={{ fontStretch: '86%' }}>
                  {current.title}
                </h3>
                {current.subtitle && (
                  <p className="font-mono text-xs sm:text-base text-gamma font-bold uppercase tracking-widest">
                    // {current.subtitle}
                  </p>
                )}
              </div>

              {/* Real-World Context If Present */}
              {current.context && (
                <div className="rounded-lg border-2 border-white/20 bg-[#101420] p-4 sm:p-5 text-sm sm:text-base text-ink font-mono shadow-md leading-relaxed">
                  <span className="text-gamma font-bold uppercase tracking-wider block mb-1.5 text-xs flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gamma" />
                    <span>PROBLEM CONTEXT & BACKGROUND</span>
                  </span>
                  {current.context}
                </div>
              )}

              {/* Challenge Mission Brief Box */}
              <div className="relative overflow-hidden border-2 border-gamma bg-[#0b1018] p-5 sm:p-7 shadow-[0_0_35px_rgba(57,255,20,0.2)]">
                <div className="absolute top-0 right-0 h-5 w-5 border-t-2 border-r-2 border-gamma" />
                <div className="absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-gamma" />

                <div className="flex items-center gap-2 border-b border-gamma/30 pb-2.5 mb-3.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-gamma animate-ping" />
                  <h4 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-gamma">
                    MISSION CHALLENGE BRIEF
                  </h4>
                </div>
                <p className="leading-relaxed text-white text-base sm:text-xl md:text-2xl font-bold tracking-tight">
                  {current.challenge}
                </p>
              </div>

              {/* Critical Constraint Box If Present */}
              {current.constraint && (
                <div className="rounded-lg border-2 border-amber-500/70 bg-amber-500/15 p-4 sm:p-5 shadow-[0_0_24px_rgba(245,158,11,0.18)]">
                  <div className="flex items-center gap-2 mb-2 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-400">
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-400 animate-pulse" />
                    <span>⚠️ CRITICAL DESIGN CONSTRAINT</span>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed text-amber-100 font-mono font-medium">
                    {current.constraint}
                  </p>
                </div>
              )}

              {/* Research Questions Mandate If Present */}
              {current.researchQuestions && current.researchQuestions.length > 0 && (
                <div className="rounded-lg border-2 border-gamma/60 bg-gamma/15 p-4 sm:p-5 shadow-[0_0_24px_rgba(57,255,20,0.14)]">
                  <div className="flex items-center gap-2 mb-2.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-gamma">
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-gamma animate-pulse" />
                    <span>RESEARCH MANDATE // PARTICIPANTS MUST PROVE:</span>
                  </div>
                  <ul className="grid gap-2.5 sm:grid-cols-2 text-xs sm:text-sm text-white font-mono">
                    {current.researchQuestions.map((q, i) => (
                      <li key={i} className="flex items-start gap-2.5 rounded border border-gamma/30 bg-black/40 p-2.5">
                        <span className="text-gamma font-black shrink-0">[{i + 1}]</span>
                        <span className="font-medium">{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Research Directive Note If Present */}
              {current.note && (
                <div className="rounded-lg border-2 border-cyan-500/50 bg-cyan-500/15 p-4 text-xs sm:text-sm text-cyan-100 font-mono flex items-start gap-3 shadow-md">
                  <span className="text-cyan-300 font-bold shrink-0">[RESEARCH DIRECTIVE]</span>
                  <span className="leading-relaxed font-medium">{current.note}</span>
                </div>
              )}

              {/* Mandatory System States / Demonstrations If Present */}
              {current.requiredStates && current.requiredStates.length > 0 && (
                <div className="rounded-lg border-2 border-purple-500/50 bg-purple-500/15 p-4 sm:p-5 shadow-[0_0_25px_rgba(168,85,247,0.18)]">
                  <div className="flex items-center gap-2 mb-3 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-purple-300">
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-purple-400 animate-pulse" />
                    <span>{current.requiredStatesTitle || 'MANDATORY SYSTEM STATES // MUST FORM ONE COHERENT LANGUAGE:'}</span>
                  </div>
                  <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 text-xs sm:text-sm text-white font-mono">
                    {current.requiredStates.map((state, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 rounded border border-purple-500/40 bg-black/60 px-3.5 py-2.5 shadow-sm">
                        <span className="text-purple-400 font-black shrink-0">0{idx + 1}.</span>
                        <span className="text-purple-100 font-semibold">{state}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Target User & Context */}
              {current.targetUser && (
                <div className="rounded-lg border-2 border-white/15 bg-[#101420] p-4 sm:p-5">
                  <span className="block font-mono text-xs uppercase tracking-widest text-muted mb-1 font-bold">
                    PRIMARY STAKEHOLDERS & TARGET AUDIENCE:
                  </span>
                  <p className="font-mono text-xs sm:text-sm text-white font-medium">
                    {current.targetUser}
                  </p>
                </div>
              )}

              {/* Key Deliverables Checklist */}
              {current.deliverables && current.deliverables.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-accent-text flex items-center gap-2">
                    <span>SPECIFICATION REQUIREMENTS // DELIVERABLES</span>
                    <span className="h-px flex-1 bg-white/15" />
                  </h4>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {current.deliverables.map((d, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 rounded-lg border-2 border-white/15 bg-[#101420] p-3.5 transition-colors hover:border-gamma/60 hover:bg-[#131928]"
                      >
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded border border-gamma bg-gamma/20 font-mono text-xs font-black text-gamma mt-0.5">
                          ✓
                        </span>
                        <span className="text-xs sm:text-sm leading-relaxed text-white font-medium">
                          {d}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Evaluation Focus & Output */}
              <div className="grid gap-3 sm:grid-cols-2 pt-2">
                {current.focus && (
                  <div className="rounded-lg border-2 border-white/15 bg-[#101420] p-4">
                    <span className="block font-mono text-xs uppercase tracking-widest text-muted mb-2 font-bold">
                      CORE EVALUATION CRITERIA:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {current.focus.map((f, i) => (
                        <span key={i} className="rounded border border-gamma/60 bg-gamma/15 px-2.5 py-1 font-mono text-xs uppercase tracking-wider text-gamma font-bold">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {current.expectedOutput && (
                  <div className="rounded-lg border-2 border-white/15 bg-[#101420] p-4">
                    <span className="block font-mono text-xs uppercase tracking-widest text-muted mb-1 font-bold">
                      EXPECTED SUBMISSION FORMAT:
                    </span>
                    <p className="font-mono text-xs sm:text-sm text-white font-medium">
                      {current.expectedOutput}
                    </p>
                  </div>
                )}
              </div>
            </m.div>
          </AnimatePresence>
        </div>

        {/* Modal Bottom Action Footer */}
        <div className="border-t border-gamma/25 bg-[#0e111a] px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-2 rounded border-2 border-white/25 bg-white/10 px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white transition-all hover:border-gamma hover:text-gamma hover:bg-gamma/10 active:scale-95 cursor-pointer"
            >
              <span>{copied ? '✓ COPIED BRIEF' : '📋 COPY BRIEF'}</span>
            </button>
            {copied && (
              <span className="font-mono text-xs text-gamma font-bold animate-pulse">
                Copied to clipboard!
              </span>
            )}
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 rounded border border-white/20 bg-white/5 px-3 py-2.5 font-mono text-xs uppercase tracking-wider text-ink/80 transition-all hover:border-white hover:text-white active:scale-95 cursor-pointer"
            >
              <span>Close Window</span>
              <span>✕</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleNext}
              className="hidden xs:flex items-center gap-1.5 rounded border border-white/20 bg-white/5 px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-white hover:border-gamma hover:text-gamma hover:bg-gamma/10 active:scale-95 cursor-pointer font-bold"
            >
              <span>Next Statement</span>
              <span>→</span>
            </button>

            <a
              href={event.registration?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded border-2 border-gamma bg-gamma px-5 py-2.5 font-mono text-xs font-black uppercase tracking-wider text-black shadow-[0_0_20px_rgba(57,255,20,0.5)] transition-all hover:bg-white hover:border-white hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] active:scale-95 cursor-pointer"
            >
              <span>Register For Event</span>
              <span>⚡</span>
            </a>
          </div>
        </div>
      </m.div>
    </m.div>
  );
}

function TrackCard({ track, i, stage, onSelect }) {
  const ref = useRef(null);
  const [charged, setCharged] = useState(false);

  // Touch screens have no hover: charge the card when it reaches mid-screen instead.
  useEffect(() => {
    if (window.matchMedia('(hover: hover)').matches) return;
    const io = new IntersectionObserver(([e]) => setCharged(e.isIntersecting), { rootMargin: '-40% 0px -40% 0px' });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const statementCount = track.problemStatements?.length || 0;

  return (
    <m.li
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      className="cq"
    >
      <div
        onClick={() => onSelect(track)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect(track);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`Open problem statements queue for ${track.title}`}
        className="h-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gamma"
      >
        <HudFrame
          stage={stage}
          className="track-card group h-full overflow-hidden p-6 sm:p-7 transition-all duration-300 hover:border-gamma hover:shadow-[0_0_30px_rgba(57,255,20,0.22)]"
          data-charged={charged}
          data-cursor
        >
          <span className="track-energy" aria-hidden="true" />
          <svg className="track-fracture pointer-events-none absolute inset-x-0 top-1/3 h-1/3 w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d={FRACTURE} fill="none" stroke="#7CFF00" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </svg>
          <div className="cq-row relative flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center border border-accent/60 font-mono text-sm font-bold text-accent-text transition-colors group-hover:border-gamma group-hover:text-gamma group-hover:bg-gamma/10">
                  {track.code}
                </span>
                <span className="rounded border border-gamma/40 bg-gamma/10 px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-widest text-gamma font-bold">
                  {statementCount} Statements in Queue
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl font-bold uppercase leading-tight text-ink sm:text-3xl transition-colors group-hover:text-gamma" style={{ fontStretch: '85%' }}>
                  {track.title}
                </h3>
                {track.stone && (
                  <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-gamma/80 font-semibold">{track.stone}</p>
                )}
                <p className="mt-2.5 leading-relaxed text-ink/85 text-sm sm:text-base">{track.text}</p>
                {track.tags && track.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {track.tags.map(tag => (
                      <span key={tag} className="rounded border border-gamma/30 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-gamma/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Click to Open Problem Statements Queue Banner */}
            <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-gamma/90 group-hover:text-gamma flex items-center gap-1.5 font-bold">
                <span>⚡ View Problem Queue</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
              </span>
              <span className="rounded bg-white/5 border border-white/15 group-hover:border-gamma/60 px-2 py-0.5 font-mono text-[0.62rem] text-ink/80 group-hover:text-gamma uppercase tracking-wider transition-colors">
                Click to expand
              </span>
            </div>
          </div>
        </HudFrame>
      </div>
    </m.li>
  );
}

export default function Tracks({ stage, index }) {
  const [selectedTrack, setSelectedTrack] = useState(null);

  return (
    <Section
      id="tracks"
      stage={stage}
      index={index}
      eyebrow="Tracks // Choose your problem space"
      title="Design tracks"
      provisional={!confirmed.tracks}
      intro="Select a track to launch its problem statements queue. Explore the challenges, study the deliverables, and register your team."
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tracks.map((t, i) => (
          <TrackCard
            key={t.code}
            track={t}
            i={i}
            stage={stage}
            onSelect={(selected) => setSelectedTrack(selected)}
          />
        ))}
      </ul>

      {/* Full-Screen Pop-up Window for Selected Track Problem Statements Queue */}
      <AnimatePresence>
        {selectedTrack && (
          <TrackModal
            track={selectedTrack}
            stage={stage}
            onClose={() => setSelectedTrack(null)}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}
