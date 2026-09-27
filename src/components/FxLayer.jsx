import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../lib/motion';

/*
  Site-wide Hulk-inspired effects (original canvas / CSS art):
   • Smash anywhere — clicking empty space leaves a cracked impact crater with a
     shockwave, sparks and a small thud.
   • Gamma spark trail — fast cursor movement throws off green sparks (mouse only).
   • Rage vignette — scrolling fast makes the screen edges glow green.
   • Easter egg — type S-M-A-S-H to trigger a "GAMMA OVERLOAD".
  The canvas only animates while something is alive, so it costs nothing at rest.
  Not rendered at all when animations are off (lib/motion.js).
*/

const IGNORE = 'a, button, input, textarea, select, label, summary, iframe, [role="button"], .hero, [data-no-impact]';

function crackPaths(x, y, scale) {
  const n = 7 + Math.floor(Math.random() * 4);
  return Array.from({ length: n }, (_, i) => {
    const pts = [[x, y]];
    let a = (i / n) * Math.PI * 2 + Math.random() * 0.5;
    let px = x;
    let py = y;
    const segs = 3 + Math.floor(Math.random() * 3);
    for (let s = 0; s < segs; s++) {
      a += (Math.random() - 0.5) * 0.9;
      const len = (10 + Math.random() * 22) * scale;
      px += Math.cos(a) * len;
      py += Math.sin(a) * len;
      pts.push([px, py]);
    }
    return pts;
  });
}

export default function FxLayer() {
  const [enabled] = useState(() => !prefersReducedMotion());
  const canvasRef = useRef(null);
  const vignette = useRef(null);
  const [overload, setOverload] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    const c = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    let W = 0;
    let H = 0;
    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    let sparks = [];
    let impacts = [];
    let raf = 0;
    let last = 0;

    const frame = (now) => {
      const dt = last ? Math.min(3, (now - last) / 16.67) : 1;
      last = now;
      c.clearRect(0, 0, W, H);
      c.globalCompositeOperation = 'lighter';

      impacts = impacts.filter((m) => m.life > 0);
      for (const m of impacts) {
        m.life -= 0.012 * dt;
        m.ring += 7 * dt;
        const a = Math.max(0, m.life);
        // shockwave ring (first half of the impact's life)
        const ra = Math.max(0, 1 - m.ring / 140);
        if (ra > 0) {
          c.strokeStyle = `rgba(124,255,0,${ra * 0.9})`;
          c.lineWidth = 2.5;
          c.beginPath();
          c.arc(m.x, m.y, m.ring, 0, Math.PI * 2);
          c.stroke();
        }
        // crater glow
        const g = c.createRadialGradient(m.x, m.y, 0, m.x, m.y, 34);
        g.addColorStop(0, `rgba(57,255,20,${0.35 * a})`);
        g.addColorStop(1, 'rgba(57,255,20,0)');
        c.fillStyle = g;
        c.beginPath();
        c.arc(m.x, m.y, 34, 0, Math.PI * 2);
        c.fill();
        // cracks grow out quickly, then fade
        const grow = Math.min(1, (1 - m.life) * 6);
        c.strokeStyle = `rgba(124,255,0,${0.85 * a})`;
        c.lineWidth = 1.6;
        c.lineJoin = 'bevel';
        for (const path of m.cracks) {
          const upto = Math.max(1, Math.round(grow * (path.length - 1)));
          c.beginPath();
          c.moveTo(path[0][0], path[0][1]);
          for (let i = 1; i <= upto; i++) c.lineTo(path[i][0], path[i][1]);
          c.stroke();
        }
      }

      sparks = sparks.filter((s) => s.life > 0);
      for (const s of sparks) {
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        s.vy += 0.12 * dt; // a little gravity
        s.vx *= Math.pow(0.96, dt);
        s.life -= s.decay * dt;
        c.fillStyle = s.white ? `rgba(235,255,225,${s.life})` : `rgba(124,255,0,${s.life})`;
        c.fillRect(s.x - s.size / 2, s.y - s.size / 2, s.size, s.size);
      }
      c.globalCompositeOperation = 'source-over';
      raf = sparks.length || impacts.length ? requestAnimationFrame(frame) : 0;
      if (!raf) c.clearRect(0, 0, W, H);
    };
    const kick = () => {
      if (!raf) {
        last = 0;
        raf = requestAnimationFrame(frame);
      }
    };
    const burst = (x, y, n, speed) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const v = (0.4 + Math.random()) * speed;
        sparks.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 1.5, life: 1, decay: 0.02 + Math.random() * 0.03, size: 1.2 + Math.random() * 2, white: Math.random() < 0.3 });
      }
    };

    // ---- smash anywhere ----
    const onDown = (e) => {
      if (e.button !== 0 || e.target.closest?.(IGNORE)) return;
      impacts.push({ x: e.clientX, y: e.clientY, life: 1, ring: 4, cracks: crackPaths(e.clientX, e.clientY, 1) });
      if (impacts.length > 6) impacts.shift();
      burst(e.clientX, e.clientY, 26, 6);
      const shell = document.getElementById('app-shell');
      shell?.classList.remove('is-thud');
      void shell?.offsetWidth;
      shell?.classList.add('is-thud');
      kick();
    };
    // ---- spark trail (mouse only) ----
    let lx = 0;
    let ly = 0;
    const onMove = (e) => {
      if (!fine || e.pointerType !== 'mouse') return;
      const sp = Math.hypot(e.clientX - lx, e.clientY - ly);
      lx = e.clientX;
      ly = e.clientY;
      if (sp > 14) {
        const n = Math.min(3, Math.floor(sp / 14));
        for (let i = 0; i < n; i++) sparks.push({ x: e.clientX, y: e.clientY, vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2, life: 0.9, decay: 0.035 + Math.random() * 0.03, size: 1 + Math.random() * 1.8, white: Math.random() < 0.2 });
        if (sparks.length > 400) sparks.splice(0, sparks.length - 400);
        kick();
      }
    };
    // ---- rage vignette from scroll speed ----
    let lastY = window.scrollY;
    let lastT = performance.now();
    let heat = 0;
    let vraf = 0;
    const cool = () => {
      heat *= 0.92;
      if (vignette.current) vignette.current.style.opacity = heat.toFixed(3);
      vraf = heat > 0.01 ? requestAnimationFrame(cool) : 0;
    };
    const onScroll = () => {
      const now = performance.now();
      const v = Math.abs(window.scrollY - lastY) / Math.max(1, now - lastT); // px per ms
      lastY = window.scrollY;
      lastT = now;
      heat = Math.min(1, Math.max(heat, (v - 1.2) / 4));
      if (!vraf && heat > 0.01) vraf = requestAnimationFrame(cool);
    };
    // ---- easter egg: type "smash" ----
    let typed = '';
    let timer = 0;
    const onKey = (e) => {
      if (e.target.closest?.('input, textarea')) return;
      typed = (typed + (e.key || '').toLowerCase()).slice(-5);
      if (typed === 'smash') {
        typed = '';
        setOverload(true);
        clearTimeout(timer);
        timer = setTimeout(() => setOverload(false), 2600);
        for (let i = 0; i < 5; i++) {
          const x = W * (0.15 + Math.random() * 0.7);
          const y = H * (0.2 + Math.random() * 0.6);
          impacts.push({ x, y, life: 1, ring: 4, cracks: crackPaths(x, y, 2.2) });
          burst(x, y, 30, 8);
        }
        kick();
      }
    };

    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(vraf);
      clearTimeout(timer);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKey);
    };
  }, [enabled]);

  useEffect(() => {
    document.documentElement.classList.toggle('gamma-overload', overload);
  }, [overload]);

  if (!enabled) return null;
  return (
    <>
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[95] h-full w-full" aria-hidden="true" />
      <div ref={vignette} className="rage-vignette pointer-events-none fixed inset-0 z-[94]" style={{ opacity: 0 }} aria-hidden="true" />
      {overload && (
        <div className="overload pointer-events-none fixed inset-0 z-[96] grid place-items-center" role="status">
          <p className="overload-text font-display font-black uppercase">Gamma overload</p>
        </div>
      )}
    </>
  );
}
