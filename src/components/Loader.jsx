import { useCallback, useEffect, useRef, useState } from 'react';
import { event } from '../data/event';
import { paletteAt } from '../lib/rage';
import { prefersReducedMotion } from '../lib/motion';

/*
  Intro — "Fusion" (~4.6 s, skippable with the button or Esc). All canvas, original art.
    0.0s  atoms (nucleus + orbiting electrons) fade in across the screen, calm steel
    0.45s atoms spiral into the centre one by one, leaving energy trails; each one
          sparks as it fuses and the colour charges steel → purple → gamma green
    2.75s the gamma particle is formed: green core, three orbit rings, a γ glyph;
          it pulses faster and starts to shake
    3.5s  it explodes: shockwave rings, debris, cracks, one soft flash — and the
          blast punches an expanding hole that opens onto the main page
    4.6s  intro removed
  Reduced motion: still atoms cross-fade into the formed gamma particle, then a
  plain fade to the page — no movement, shake, flash or explosion.
  Plays on every visit; add ?nointro to the URL to skip it.
*/

const T = { converge: 450, formed: 2750, explode: 3500, open: 950, end: 4600 };

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeIn = (p) => p * p * p;
const easeInOut = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
const rgba = ([r, g, b], a) => `rgba(${r},${g},${b},${a})`;
const GAMMA = [124, 255, 0];
const GLOW = [57, 255, 20];

// Radial fractures around the blast point (drawn in a 100×100 box, sliced to cover).
const RADIAL_CRACKS = Array.from({ length: 11 }, (_, i) => {
  const a = (i / 11) * Math.PI * 2 + 0.25;
  const k = i % 3;
  let x = 50 + Math.cos(a) * (5 + k);
  let y = 50 + Math.sin(a) * (4 + k);
  let d = `M${x.toFixed(1)} ${y.toFixed(1)}`;
  let branch = '';
  for (let s = 1; s <= 6; s++) {
    const len = 3 + s * 2.4;
    const jitter = (s % 2 ? 0.4 : -0.35) * (i % 2 ? 1 : -1);
    x += Math.cos(a + jitter) * len * 1.4;
    y += Math.sin(a + jitter) * len;
    d += ` L${x.toFixed(1)} ${y.toFixed(1)}`;
    if (s === 3) {
      const b = a + (i % 2 ? 0.9 : -0.9);
      branch = ` M${x.toFixed(1)} ${y.toFixed(1)} l${(Math.cos(b) * 7).toFixed(1)} ${(Math.sin(b) * 4.5).toFixed(1)} l${(Math.cos(b + 0.4) * 5).toFixed(1)} ${(Math.sin(b + 0.4) * 3).toFixed(1)}`;
    }
  }
  return d + branch;
});

/** One atom: glow, nucleus (protons/neutrons) and 2–3 tilted electron orbits. */
function drawAtom(c, x, y, size, col, alpha, t, a) {
  c.globalCompositeOperation = 'lighter';
  c.fillStyle = rgba(col, 0.12 * alpha);
  c.beginPath();
  c.arc(x, y, size * 0.75, 0, Math.PI * 2);
  c.fill();

  c.lineWidth = 1;
  for (let j = 0; j < a.orbits; j++) {
    const rot = a.tilt + (j * Math.PI) / a.orbits;
    const rx = size;
    const ry = size * 0.36;
    c.strokeStyle = rgba(col, 0.35 * alpha);
    c.beginPath();
    c.ellipse(x, y, rx, ry, rot, 0, Math.PI * 2);
    c.stroke();
    const e = a.phase + j * 2.1 + (t / 1000) * a.orbitSpeed * (j % 2 ? 1 : -1);
    const ex = Math.cos(e) * rx;
    const ey = Math.sin(e) * ry;
    const px = x + ex * Math.cos(rot) - ey * Math.sin(rot);
    const py = y + ex * Math.sin(rot) + ey * Math.cos(rot);
    c.fillStyle = rgba([235, 245, 255], 0.9 * alpha);
    c.beginPath();
    c.arc(px, py, Math.max(1, size * 0.07), 0, Math.PI * 2);
    c.fill();
  }

  c.globalCompositeOperation = 'source-over';
  const n = size * 0.15;
  for (let k = 0; k < a.nucleons; k++) {
    const ang = (k / a.nucleons) * Math.PI * 2 + a.phase;
    c.fillStyle = k % 2 ? rgba([230, 236, 245], alpha) : rgba(col, alpha);
    c.beginPath();
    c.arc(x + Math.cos(ang) * n * 0.8, y + Math.sin(ang) * n * 0.8, n, 0, Math.PI * 2);
    c.fill();
  }
}

/** The gamma particle: glow, white-hot core, three spinning orbit rings with electrons, γ glyph. */
function drawCore(c, x, y, r, t, alpha = 1) {
  if (r <= 0.5) return;
  c.globalCompositeOperation = 'lighter';
  const g = c.createRadialGradient(x, y, 0, x, y, r * 5);
  g.addColorStop(0, rgba(GLOW, 0.55 * alpha));
  g.addColorStop(0.35, rgba(GLOW, 0.18 * alpha));
  g.addColorStop(1, rgba(GLOW, 0));
  c.fillStyle = g;
  c.beginPath();
  c.arc(x, y, r * 5, 0, Math.PI * 2);
  c.fill();

  c.lineWidth = Math.max(1.2, r * 0.07);
  for (let j = 0; j < 3; j++) {
    const rot = (j * Math.PI) / 3 + t / 900;
    c.strokeStyle = rgba(GAMMA, 0.7 * alpha);
    c.beginPath();
    c.ellipse(x, y, r * 2.3, r * 0.75, rot, 0, Math.PI * 2);
    c.stroke();
    const e = t / 260 + j * 2.1;
    const ex = Math.cos(e) * r * 2.3;
    const ey = Math.sin(e) * r * 0.75;
    c.fillStyle = rgba([240, 255, 230], alpha);
    c.beginPath();
    c.arc(x + ex * Math.cos(rot) - ey * Math.sin(rot), y + ex * Math.sin(rot) + ey * Math.cos(rot), Math.max(1.5, r * 0.1), 0, Math.PI * 2);
    c.fill();
  }

  c.globalCompositeOperation = 'source-over';
  const core = c.createRadialGradient(x, y, 0, x, y, r);
  core.addColorStop(0, rgba([255, 255, 255], alpha));
  core.addColorStop(0.45, rgba([200, 255, 140], alpha));
  core.addColorStop(1, rgba(GAMMA, alpha));
  c.fillStyle = core;
  c.beginPath();
  c.arc(x, y, r, 0, Math.PI * 2);
  c.fill();
  if (r > 12) {
    c.fillStyle = rgba([5, 20, 5], 0.85 * alpha);
    c.font = `700 ${Math.round(r * 1.25)}px Saira, 'Arial Narrow', sans-serif`;
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillText('γ', x, y + r * 0.08);
  }
}

function FusionCanvas({ reduced, readout }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const c = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let cx = 0;
    let cy = 0;
    let diag = 0;
    let unit = 1;
    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = W / 2;
      cy = H / 2;
      diag = Math.hypot(W, H);
      unit = clamp(Math.min(W, H) / 820, 0.8, 1.2);
    };
    resize();

    const rnd = (a, b) => a + Math.random() * (b - a);
    const N = W * H < 520000 ? 16 : 26;
    const atoms = Array.from({ length: N }, (_, i) => {
      // random spot on screen, away from the centre
      let x;
      let y;
      do {
        x = rnd(0.06, 0.94) * W;
        y = rnd(0.1, 0.9) * H;
      } while (Math.hypot(x - cx, y - cy) < Math.min(W, H) * 0.22);
      return {
        r0: Math.hypot(x - cx, y - cy),
        ang: Math.atan2(y - cy, x - cx),
        spin: rnd(0.7, 1.4) * (i % 2 ? 1 : -1),
        start: T.converge + (i / N) * 1500 + rnd(0, 180),
        dur: rnd(900, 1250),
        size: rnd(13, 24),
        orbitSpeed: rnd(2.5, 4.5),
        tilt: rnd(0, Math.PI),
        orbits: i % 3 ? 3 : 2,
        nucleons: 3 + (i % 3),
        phase: rnd(0, Math.PI * 2),
        fused: false,
        trail: [],
      };
    });
    let sparks = [];
    let debris = null;
    let fused = 0;

    const burst = (x, y, n, speed, col) => {
      for (let i = 0; i < n; i++) {
        const a = rnd(0, Math.PI * 2);
        const v = rnd(0.3, 1) * speed;
        sparks.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 1, decay: rnd(0.03, 0.06), size: rnd(1, 2.4), col });
      }
    };

    // ---------- reduced motion: two still frames joined by a cross-fade ----------
    // Frame A: the atoms, scattered and calm. Frame B: the gamma particle they formed.
    // Only opacity changes — nothing moves, shakes, flashes or explodes.
    if (reduced) {
      const frameA = document.createElement('canvas');
      const frameB = document.createElement('canvas');
      const paint = () => {
        resize();
        for (const [cv, draw] of [
          [frameA, (g) => atoms.forEach((a) => drawAtom(g, cx + Math.cos(a.ang) * a.r0, cy + Math.sin(a.ang) * a.r0, a.size * unit, paletteAt(0).accent, 0.9, 0, a))],
          [frameB, (g) => drawCore(g, cx, cy, 34 * unit, 0)],
        ]) {
          cv.width = canvas.width;
          cv.height = canvas.height;
          const g = cv.getContext('2d');
          g.setTransform(dpr, 0, 0, dpr, 0, 0);
          draw(g);
        }
      };
      paint();
      window.addEventListener('resize', paint);
      const t0 = performance.now();
      let raf = 0;
      const fade = (now) => {
        const mix = clamp((now - t0 - 1000) / 700);
        c.setTransform(1, 0, 0, 1, 0, 0);
        c.globalCompositeOperation = 'source-over';
        c.globalAlpha = 1;
        c.fillStyle = '#050505';
        c.fillRect(0, 0, canvas.width, canvas.height);
        c.globalAlpha = 1 - mix;
        c.drawImage(frameA, 0, 0);
        c.globalAlpha = mix;
        c.drawImage(frameB, 0, 0);
        c.globalAlpha = 1;
        c.setTransform(dpr, 0, 0, dpr, 0, 0);
        if (mix < 1) raf = requestAnimationFrame(fade);
      };
      raf = requestAnimationFrame(fade);
      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', paint);
      };
    }

    // ---------- full animation ----------
    window.addEventListener('resize', resize);
    const t0 = performance.now();
    let raf = 0;
    let last = t0;
    c.fillStyle = '#050505';
    c.fillRect(0, 0, W, H);

    const frame = (now) => {
      const t = now - t0;
      const dt = Math.min(3, (now - last) / 16.67);
      last = now;
      const k = clamp(t / T.formed);
      const col = paletteAt(k * 0.5).accent;

      if (t < T.explode) {
        // --- fusion ---
        c.globalCompositeOperation = 'source-over';
        c.fillStyle = '#050505';
        c.fillRect(0, 0, W, H);

        const energy = fused / N;
        let coreR = (3 + 30 * energy) * unit;
        let jx = 0;
        let jy = 0;
        if (t > T.formed) {
          const q = clamp((t - T.formed) / (T.explode - T.formed));
          const hz = 1 + 1.8 * q; // pulse stays under 3 Hz
          coreR *= 1 + 0.1 * Math.sin((t / 1000) * hz * Math.PI * 2);
          jx = (Math.random() - 0.5) * 5 * q;
          jy = (Math.random() - 0.5) * 5 * q;
        }

        for (const a of atoms) {
          if (a.fused) continue;
          const p = clamp((t - a.start) / a.dur);
          if (p >= 1) {
            a.fused = true;
            fused++;
            burst(cx, cy, 10, 3.5 * unit, col);
            continue;
          }
          const e = easeIn(p);
          const r = a.r0 * (1 - e);
          const th = a.ang + a.spin * e * 1.3;
          const alpha = clamp(t / 500) * (1 - e * 0.35);
          const x = cx + Math.cos(th) * r;
          const y = cy + Math.sin(th) * r;
          // energy trail: last few positions, fading out
          if (p > 0) {
            a.trail.push(x, y);
            if (a.trail.length > 28) a.trail.splice(0, 2);
            c.globalCompositeOperation = 'lighter';
            c.lineCap = 'round';
            for (let i = 2; i < a.trail.length; i += 2) {
              const f = i / a.trail.length;
              c.strokeStyle = rgba(col, 0.45 * f * alpha);
              c.lineWidth = Math.max(1, a.size * unit * 0.35 * f * (1 - 0.6 * e));
              c.beginPath();
              c.moveTo(a.trail[i - 2], a.trail[i - 1]);
              c.lineTo(a.trail[i], a.trail[i + 1]);
              c.stroke();
            }
          }
          drawAtom(c, x, y, a.size * unit * (1 - 0.65 * e), col, alpha, t * (1 + 2 * k), a);
        }

        if (fused > 0) drawCore(c, cx + jx, cy + jy, coreR, t, clamp(0.4 + energy));
        if (readout.current) readout.current.textContent = `${String(Math.round(energy * 100)).padStart(3, '0')}%`;
      } else {
        // --- explosion + portal opening onto the page ---
        const te = t - T.explode;
        if (!debris) {
          debris = Array.from({ length: 260 }, () => {
            const a = rnd(0, Math.PI * 2);
            const v = rnd(3, 17) * unit;
            return { x: cx, y: cy, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 1, decay: rnd(0.018, 0.04), size: rnd(1.2, 3.4), white: Math.random() < 0.3 };
          });
          if (readout.current) readout.current.textContent = '100%';
        }
        c.globalCompositeOperation = 'source-over';
        c.clearRect(0, 0, W, H);
        c.fillStyle = '#050505';
        c.fillRect(0, 0, W, H);

        // the hole: soft-edged circle cut out of the dark field
        const q = clamp((te - 60) / T.open);
        const R = diag * 0.62 * easeInOut(q);
        if (R > 1) {
          c.globalCompositeOperation = 'destination-out';
          const hole = c.createRadialGradient(cx, cy, Math.max(0, R - 60 * unit), cx, cy, R);
          hole.addColorStop(0, 'rgba(0,0,0,1)');
          hole.addColorStop(1, 'rgba(0,0,0,0)');
          c.fillStyle = hole;
          c.beginPath();
          c.arc(cx, cy, R, 0, Math.PI * 2);
          c.fill();
        }

        c.globalCompositeOperation = 'lighter';
        // bright bloom where the particle was
        const bloom = clamp(1 - te / 450);
        if (bloom > 0) {
          const br = 40 * unit * (1 + te / 60);
          const bg = c.createRadialGradient(cx, cy, 0, cx, cy, br);
          bg.addColorStop(0, rgba([255, 255, 255], bloom));
          bg.addColorStop(0.25, rgba(GAMMA, 0.8 * bloom));
          bg.addColorStop(1, rgba(GLOW, 0));
          c.fillStyle = bg;
          c.beginPath();
          c.arc(cx, cy, br, 0, Math.PI * 2);
          c.fill();
        }
        // shockwave rings
        for (const [delay, speed, w] of [[0, 2.2, 4], [110, 1.6, 2]]) {
          const tr = te - delay;
          if (tr <= 0) continue;
          const rr = tr * speed * unit;
          const a = clamp(1 - rr / (diag * 0.7));
          if (a <= 0) continue;
          c.strokeStyle = rgba(GAMMA, 0.85 * a);
          c.lineWidth = w;
          c.beginPath();
          c.arc(cx, cy, rr, 0, Math.PI * 2);
          c.stroke();
          c.strokeStyle = rgba(GLOW, 0.25 * a);
          c.lineWidth = w * 5;
          c.stroke();
        }
        // debris
        for (const d of debris) {
          if (d.life <= 0) continue;
          d.x += d.vx * dt;
          d.y += d.vy * dt;
          d.vx *= 0.985;
          d.vy *= 0.985;
          d.life -= d.decay * dt;
          c.fillStyle = d.white ? `rgba(240,255,230,${d.life})` : rgba(GAMMA, d.life);
          c.fillRect(d.x - d.size / 2, d.y - d.size / 2, d.size, d.size);
        }
        // one soft flash (single pulse, well under the 3-per-second limit)
        const flash = clamp(0.3 * (1 - te / 260));
        if (flash > 0) {
          c.fillStyle = rgba(GLOW, flash);
          c.fillRect(0, 0, W, H);
        }
      }

      // fusion sparks
      c.globalCompositeOperation = 'lighter';
      sparks = sparks.filter((s) => s.life > 0);
      for (const s of sparks) {
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        s.life -= s.decay * dt;
        c.fillStyle = rgba(s.col, Math.max(0, s.life));
        c.fillRect(s.x - s.size / 2, s.y - s.size / 2, s.size, s.size);
      }
      c.globalCompositeOperation = 'source-over';

      if (t < T.end) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [reduced, readout]);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}

const STATUS = {
  dormant: ['Dormant', undefined],
  fusing: ['Fusing', '#7CFF00'],
  formed: ['Gamma particle formed', '#7CFF00'],
  critical: ['Critical — releasing', '#7CFF00'],
};

export default function Loader({ onDone, onReveal }) {
  const reduced = prefersReducedMotion();
  const [phase, setPhase] = useState('dormant'); // dormant → fusing → formed → critical → exit
  const [exiting, setExiting] = useState(false);
  const readout = useRef(null);
  const doneRef = useRef(false);

  const finish = useCallback(
    (fade = true) => {
      if (doneRef.current) return;
      doneRef.current = true;
      onReveal?.();
      if (!fade) return onDone();
      setExiting(true);
      setTimeout(onDone, 300);
    },
    [onDone, onReveal],
  );

  useEffect(() => {
    const timers = reduced
      ? [setTimeout(() => setPhase('formed'), 1400), setTimeout(finish, 3800)]
      : [
          setTimeout(() => setPhase('fusing'), T.converge),
          setTimeout(() => setPhase('formed'), T.formed),
          setTimeout(() => setPhase('critical'), T.explode),
          // the hero starts its entrance as the blast opens the page
          setTimeout(() => onReveal?.(), T.explode + 120),
          // the blast has already opened the page — remove the overlay without a fade
          setTimeout(() => finish(false), T.end),
        ];
    const onKey = (e) => e.key === 'Escape' && finish();
    window.addEventListener('keydown', onKey);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('keydown', onKey);
    };
  }, [finish, reduced, onReveal]);

  const exploded = phase === 'critical';
  const [label, color] = STATUS[phase];

  return (
    <div
      className={`fixed inset-0 z-[300] overflow-hidden ${exploded ? '' : 'bg-void'} ${exploded && !reduced ? 'is-shaking' : ''}`}
      style={{ opacity: exiting ? 0 : 1, transition: 'opacity 300ms ease' }}
      role="dialog"
      aria-modal="true"
      aria-label={`${event.name} ${event.year} intro`}
    >
      <FusionCanvas reduced={reduced} readout={readout} />

      {/* cracks from the blast, fading as the page opens */}
      {exploded && (
        <svg
          className="is-drawn fusion-cracks pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {RADIAL_CRACKS.map((d, i) => (
            <path key={i} d={d} pathLength="1" className="crack-path" fill="none" stroke="#7CFF00" strokeWidth="0.13" strokeLinejoin="bevel" style={{ animationDuration: '0.45s' }} />
          ))}
        </svg>
      )}

      <div className="fusion-hud pointer-events-none" data-hidden={exploded} aria-hidden="true">
        <div className="absolute left-4 top-4 font-mono text-[0.7rem] uppercase leading-relaxed tracking-[0.18em] text-steel sm:left-8 sm:top-8">
          <div>Subject: IDEA-2026</div>
          <div>
            Status: <span style={{ color }}>{label}</span>
          </div>
        </div>
        {!reduced && (
          <div className="absolute bottom-6 left-4 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-steel sm:bottom-9 sm:left-8">
            Fusion <span ref={readout} className="text-ink">000%</span>
          </div>
        )}
        <p className="absolute inset-x-0 top-[18%] px-4 text-center font-mono text-xs uppercase tracking-[0.3em] text-steel sm:text-sm">
          {event.presentsLine}
        </p>
        <p
          className="absolute inset-x-0 top-[calc(50%+90px)] text-center font-mono text-[0.7rem] uppercase tracking-[0.3em] text-gamma transition-opacity duration-300 sm:text-xs"
          style={{ opacity: phase === 'formed' ? 1 : 0 }}
        >
          <span className="normal-case">γ</span> · Gamma particle formed
        </p>
      </div>

      <button
        type="button"
        onClick={() => finish()}
        className="absolute bottom-5 right-5 z-10 min-h-[44px] border border-steel/60 bg-void/80 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-ink hover:border-gamma hover:text-gamma sm:bottom-8 sm:right-8"
        style={{ opacity: exploded ? 0 : 1, transition: 'opacity .2s' }}
      >
        Skip intro <span aria-hidden="true">▸▸</span>
      </button>

      <style>{`
        .fusion-hud { position: absolute; inset: 0; transition: opacity .25s ease; }
        .fusion-hud[data-hidden='true'] { opacity: 0; }
        .fusion-cracks { filter: drop-shadow(0 0 4px #39FF14); animation: cracks-out .6s ease-in .2s forwards; }
        @keyframes cracks-out { to { opacity: 0; } }
      `}</style>
    </div>
  );
}
