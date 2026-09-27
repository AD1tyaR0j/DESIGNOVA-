import { useEffect, useRef } from 'react';
import { event, media, venue, confirmed } from '../data/event';
import GammaField from '../components/GammaField';
import { Picture } from '../components/Img';
import RegisterButton from '../components/RegisterButton';
import { prefersReducedMotion } from '../lib/motion';

/** Wordmark shown until designova-logo.png is supplied: chrome steel with a blue edge-glow. */
function Wordmark() {
  return (
    <span className="hero-wordmark block font-display uppercase leading-[0.9]" aria-hidden="true">
      {event.name}
    </span>
  );
}

// One ECG beat, repeated; the strip scrolls slowly (calm Banner heartbeat).
const BEAT = 'l40 0 l6 -6 l6 6 l6 0 l4 10 l6 -46 l6 52 l5 -16 l7 0 l12 0 l8 -8 l8 8 l86 0'; // 200 units wide
const ECG = `M0 40 ${Array.from({ length: 4 }, () => BEAT).join(' ')}`;

// Electric arcs that crackle off the logo edges (viewBox 0 0 1000 300, logo sits in the middle).
const ARCS = [
  { d: 'M95 150 L60 128 L72 118 L30 92 L44 84 L8 60', delay: '0s' },
  { d: 'M905 140 L942 120 L930 108 L970 86 L958 76 L996 50', delay: '1.7s' },
  { d: 'M300 262 L284 290 L300 292 L286 300', delay: '3.1s' },
  { d: 'M690 40 L706 14 L692 12 L710 0', delay: '2.4s' },
  { d: 'M120 210 L80 232 L92 242 L52 268', delay: '4.2s' },
  { d: 'M880 220 L920 246 L906 254 L948 282', delay: '0.9s' },
];

/** Entrance: children with data-in="n" rise in one after another once revealed. */
const inDelay = (n) => ({ '--d': `${0.12 + n * 0.12}s` });

export default function Hero({ revealed = true }) {
  const tilt = useRef(null);

  // Mouse-follow 3D tilt on the logo (mouse / trackpad only, not with reduced motion).
  useEffect(() => {
    if (prefersReducedMotion() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const el = tilt.current;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    const step = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.setProperty('--rx', `${(-y * 8).toFixed(2)}deg`);
      el.style.setProperty('--ry', `${(x * 10).toFixed(2)}deg`);
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.001 ? requestAnimationFrame(step) : 0;
    };
    const onMove = (e) => {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
      if (!raf) raf = requestAnimationFrame(step);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className={`hero min-h-screen-safe relative flex items-center overflow-hidden pb-32 pt-24 sm:pt-28 ${revealed ? 'is-revealed' : ''}`}
    >
      {/* Hulk backdrop image with cinematic lighting and blending */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <img
          src="/images/hero-bg.png"
          alt=""
          className="h-full w-full object-cover object-center sm:object-[center_20%] opacity-45 mix-blend-screen transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/35 to-void/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/80 via-transparent to-void/80" />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 40%, rgba(57, 255, 20, 0.08) 0%, transparent 50%, rgba(5, 5, 5, 0.8) 85%)',
          }}
        />
      </div>

      {/* background: faint lab grid, particles, vignette, scanner sweep */}
      <div
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            'linear-gradient(rgb(var(--accent) / .08) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--accent) / .08) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, #000 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, #000 30%, transparent 75%)',
        }}
        aria-hidden="true"
      />
      <GammaField density={1.5} interactive />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 42%, rgb(var(--glow) / .10), transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="hero-scan pointer-events-none absolute inset-x-0 top-0 h-24" aria-hidden="true" />

      {/* HUD corner readouts */}
      <div className="hero-hud pointer-events-none absolute left-4 top-20 hidden font-mono text-[0.7rem] uppercase leading-relaxed tracking-[0.18em] text-steel sm:left-8 sm:top-24 sm:block" aria-hidden="true">
        <div>Subject: IDEA-2026</div>
        <div>
          State: <span className="hero-blink text-gamma">Charged</span>
        </div>
        <div>Containment: Stable</div>
      </div>
      <div className="hero-hud pointer-events-none absolute right-4 top-20 hidden text-right font-mono text-[0.7rem] uppercase leading-relaxed tracking-[0.18em] text-steel sm:right-8 sm:top-24 sm:block" aria-hidden="true">
        <div>Lab: IEEE GUSB CS</div>
        <div>Sector 17A · Greater Noida</div>
        <div>Scroll to transform</div>
      </div>

      <div className="container-site relative text-center">
        <p data-in style={inDelay(0)} className="font-mono text-xs uppercase tracking-[0.28em] text-steel sm:text-sm">
          {event.presentsLine}
        </p>

        <h1 id="hero-title" className="relative mx-auto mt-6 max-w-5xl">
          <span className="sr-only">
            {event.name} {event.year} — {event.type}
          </span>

          {/* energy behind the logo: aura + rotating containment rings */}
          <span className="hero-aura pointer-events-none absolute left-1/2 top-1/2" aria-hidden="true" />
          <svg className="hero-rings pointer-events-none absolute left-1/2 top-1/2" viewBox="0 0 400 400" aria-hidden="true">
            <circle className="ring ring-a" cx="200" cy="200" r="190" pathLength="100" />
            <circle className="ring ring-b" cx="200" cy="200" r="160" pathLength="100" />
            <circle className="ring ring-c" cx="200" cy="200" r="130" pathLength="100" />
          </svg>

          <span ref={tilt} className="hero-tilt relative block">
            <span data-in="logo" style={inDelay(1)} className="hero-logo relative block">
              <span className="hero-float block">
                <Picture
                  src={media.logo}
                  alt=""
                  width="1629"
                  height="487"
                  sizes="(max-width: 890px) 92vw, 820px"
                  eager
                  fetchPriority="high"
                  className="relative mx-auto w-[min(92vw,820px)]"
                  fallback={<Wordmark />}
                />
                {/* electric arcs crackling off the logo */}
                <svg className="hero-arcs pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1000 300" preserveAspectRatio="none" aria-hidden="true">
                  {ARCS.map((a, i) => (
                    <path key={i} d={a.d} style={{ animationDelay: a.delay }} />
                  ))}
                </svg>
              </span>
            </span>
          </span>
        </h1>

        <p
          data-in
          style={inDelay(2)}
          className="mt-3 flex items-center justify-center gap-3 whitespace-nowrap font-mono text-xs uppercase tracking-[0.25em] text-ink/85 sm:text-sm sm:tracking-[0.35em]"
          aria-hidden="true"
        >
          <span className="hidden h-px w-8 bg-steel/60 xs:block" />
          {event.year} · {event.type}
          <span className="hidden h-px w-8 bg-steel/60 xs:block" />
        </p>

        <p
          data-in
          style={{ ...inDelay(3), fontStretch: '88%' }}
          className="tagline-gradient hero-shimmer mx-auto mt-8 max-w-3xl font-display text-3xl font-extrabold uppercase leading-tight xs:text-4xl sm:text-5xl lg:text-6xl"
        >
          {event.tagline}
        </p>

        <dl data-in style={inDelay(4)} className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-3 font-mono text-sm text-ink">
          <div className="flex items-center gap-2">
            <dt className="text-steel">Date</dt>
            <dd>
              {event.dateLabel}
              {!confirmed.date && <span className="ml-2 text-[0.7rem] text-[#ffd166]">(provisional)</span>}
            </dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="text-steel">Time</dt>
            <dd>{event.timeLabel}</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="text-steel">Venue</dt>
            <dd>{venue.name}</dd>
          </div>
        </dl>

        <div data-in style={inDelay(5)} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <span className="cta-pulse relative inline-flex w-full max-w-xs sm:w-auto">
            <RegisterButton className="w-full" />
          </span>
          <a href="#about" className="btn btn-ghost w-full max-w-xs sm:w-auto">
            Read the brief
          </a>
        </div>
      </div>

      {/* heartbeat line along the bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-4 h-16 overflow-hidden opacity-70 sm:bottom-6 sm:h-20" aria-hidden="true">
        <svg className="hero-ecg h-full" viewBox="0 0 1600 80" preserveAspectRatio="none" style={{ width: '200%' }}>
          <path d={ECG} fill="none" stroke="rgb(var(--accent))" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          <path d={ECG} transform="translate(800 0)" fill="none" stroke="rgb(var(--accent))" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      <style>{`
        .hero-wordmark {
          font-size: clamp(3.2rem, 15vw, 11rem);
          font-weight: 800;
          font-stretch: 92%;
          letter-spacing: .02em;
          background: linear-gradient(180deg, #ffffff 0%, #e2ffd0 30%, #7cff00 52%, #eefbf0 58%, #39ff14 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: #7cff00;
          filter: drop-shadow(0 0 1px #7cff00) drop-shadow(0 0 14px rgb(57 255 20 / .45));
        }
        @media (max-width: 420px) { .hero-wordmark { font-stretch: 78%; } }
        .hero-ecg { animation: ecg-scroll 14s linear infinite; }

        /* ---- entrance (starts when the intro blast opens the page) ---- */
        .hero [data-in] { opacity: 0; }
        .hero.is-revealed [data-in] { animation: hero-rise .8s cubic-bezier(.2,.8,.2,1) var(--d, 0s) both; }
        .hero.is-revealed [data-in='logo'] { animation: hero-slam .9s cubic-bezier(.2,1.3,.35,1) var(--d, 0s) both; }
        .hero .hero-hud { opacity: 0; transition: opacity .8s ease 1.1s; }
        .hero.is-revealed .hero-hud { opacity: 1; }
        @keyframes hero-rise {
          from { opacity: 0; transform: translate3d(0, 28px, 0); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes hero-slam {
          0%   { opacity: 0; transform: scale(1.45); filter: brightness(2.2) drop-shadow(0 0 40px #39FF14); }
          60%  { opacity: 1; transform: scale(.97); filter: brightness(1.3) drop-shadow(0 0 24px #39FF14); }
          100% { opacity: 1; transform: none; filter: none; }
        }

        /* ---- logo: tilt (JS sets --rx/--ry), float, aura, rings, arcs ---- */
        .hero-tilt { transform: perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)); transform-style: preserve-3d; }
        .hero-float { animation: hero-float 6s ease-in-out infinite; }
        @keyframes hero-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }

        .hero-aura {
          width: min(80vw, 760px); height: min(40vw, 360px);
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgb(57 255 20 / .30), rgb(124 255 0 / .10) 45%, transparent 70%);
          filter: blur(10px);
          animation: aura-breathe 3.6s ease-in-out infinite;
        }
        @keyframes aura-breathe {
          0%, 100% { opacity: .55; transform: translate(-50%, -50%) scale(.92); }
          50%      { opacity: 1;   transform: translate(-50%, -50%) scale(1.08); }
        }

        .hero-rings { width: min(70vw, 520px); height: min(70vw, 520px); transform: translate(-50%, -50%); opacity: .55; }
        .hero-rings .ring { fill: none; stroke: rgb(124 255 0 / .5); transform-origin: 200px 200px; transform-box: view-box; }
        .hero-rings .ring-a { stroke-width: 1.2; stroke-dasharray: 2 4 18 4; animation: spin 38s linear infinite; }
        .hero-rings .ring-b { stroke-width: 2; stroke-dasharray: 30 8 4 8; stroke: rgb(57 255 20 / .45); animation: spin 26s linear infinite reverse; }
        .hero-rings .ring-c { stroke-width: 1; stroke-dasharray: 1 3; animation: spin 18s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* each arc: two quick crackles, then quiet (≈0.3 flashes/s per arc, all arcs < 3/s) */
        .hero-arcs path {
          fill: none; stroke: #b6ff6b; stroke-width: 2; stroke-linejoin: bevel;
          vector-effect: non-scaling-stroke;
          filter: drop-shadow(0 0 4px #39FF14) drop-shadow(0 0 10px #39FF14);
          opacity: 0;
          animation: arc 5.2s steps(1, end) infinite;
        }
        @keyframes arc {
          0%, 100% { opacity: 0; }
          2%  { opacity: 1; }
          4%  { opacity: 0; }
          6%  { opacity: .8; }
          9%  { opacity: 0; }
        }

        /* ---- ambient ---- */
        .hero-scan {
          background: linear-gradient(180deg, transparent, rgb(124 255 0 / .06) 70%, rgb(124 255 0 / .22) 98%, transparent);
          animation: scan 7s linear infinite;
        }
        @keyframes scan { from { transform: translateY(-100%); } to { transform: translateY(100vh); } }

        .hero-shimmer {
          background-image: linear-gradient(90deg, #7cff00, #39ff14, #ffffff, #a3ff2e, #39ff14, #7cff00);
          background-size: 250% 100%;
        }
        .hero.is-revealed .hero-shimmer { animation: hero-rise .8s cubic-bezier(.2,.8,.2,1) var(--d, 0s) both, shimmer 5s linear 1.4s infinite; }
        @keyframes shimmer { from { background-position: 0% 0; } to { background-position: 250% 0; } }

        .hero-blink { animation: pulse-glow 1.6s ease-in-out infinite; }

        .cta-pulse::before {
          content: ''; position: absolute; inset: -6px; z-index: -1;
          background: #7CFF00; filter: blur(14px); opacity: .35;
          animation: cta-glow 2.2s ease-in-out infinite;
        }
        @keyframes cta-glow { 0%, 100% { opacity: .2; transform: scale(.96); } 50% { opacity: .55; transform: scale(1.04); } }

        /* ---- animations off: everything static and visible ---- */
        html.rm .hero [data-in], html.rm .hero .hero-hud { opacity: 1; animation: none !important; transition: none; }
        html.rm .hero-tilt { transform: none; }
        html.rm .hero-float, html.rm .hero-aura, html.rm .hero-rings .ring, html.rm .hero-scan,
        html.rm .hero-shimmer, html.rm .hero-blink, html.rm .cta-pulse::before, html.rm .hero-ecg { animation: none !important; }
        html.rm .hero-aura { opacity: .7; transform: translate(-50%, -50%); }
        html.rm .hero-arcs, html.rm .hero-scan { display: none; }
      `}</style>
    </section>
  );
}
