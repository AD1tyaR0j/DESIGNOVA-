import { useEffect, useRef } from 'react';
import { getRage, prefersReducedMotion } from '../lib/rage';

/**
 * Rising gamma particles on a <canvas>. Speed, brightness and colour follow
 * the rage engine: slow grey-blue motes at the top of the page, a fast green
 * surge at the bottom.
 *
 * Interactive (when `interactive` is set):
 *  • cursor gravity — particles near the pointer swirl into orbit around it,
 *    brighten and link to it with energy lines;
 *  • click / tap — a shockwave blasts nearby particles outward with a spark burst.
 *
 *  • Pauses when scrolled off-screen or when the tab is hidden.
 *  • Reduced motion: one static frame, no animation, no interaction.
 *  • No shadowBlur; additive blending gives the glow cheaply.
 */
export default function GammaField({ className = '', density = 1, boost = 0, interactive = false }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    const reduced = prefersReducedMotion();
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    let parts = [];
    let sparks = [];
    let waves = [];
    let raf = 0;
    let visible = true;
    let last = 0;
    const pointer = { x: 0, y: 0, active: false };
    const R = coarse ? 120 : 170; // cursor gravity radius

    const spawn = (anywhere) => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 10,
      r: 0.6 + Math.random() * 1.8,
      v: 0.25 + Math.random() * 0.9,
      drift: (Math.random() - 0.5) * 0.3,
      phase: Math.random() * Math.PI * 2,
      vx: 0,
      vy: 0,
      heat: 0,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.round(Math.min(140, (w * h) / 11000) * density * (coarse ? 0.55 : 1));
      parts = Array.from({ length: target }, () => spawn(true));
    };

    const draw = (dt) => {
      const { rage, palette } = getRage();
      const r = Math.min(1, rage + boost);
      const [cr, cg, cb] = palette.accent;
      const speed = 0.35 + r * 2.2;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      for (const p of parts) {
        // cursor gravity: pull in + swirl, so particles orbit the pointer
        if (pointer.active) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const d = Math.hypot(dx, dy) || 1;
          if (d < R) {
            const f = (1 - d / R) * 0.55 * dt;
            p.vx += ((dx / d) * 0.45 + (-dy / d) * 0.9) * f;
            p.vy += ((dy / d) * 0.45 + (dx / d) * 0.9) * f;
            p.heat = Math.min(1, p.heat + 0.08 * dt);
            // energy link to the cursor
            ctx.strokeStyle = `rgba(124,255,0,${(1 - d / R) * 0.28})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
          }
        }
        p.vx *= Math.pow(0.93, dt);
        p.vy *= Math.pow(0.93, dt);
        p.heat *= Math.pow(0.97, dt);
        p.x += p.drift * dt + p.vx * dt;
        p.y += -p.v * speed * dt + p.vy * dt;
        p.phase += 0.02 * dt;
        if (p.y < -20 || p.y > h + 30 || p.x < -20 || p.x > w + 20) Object.assign(p, spawn(false));

        // slow shimmer (well under 3 flashes per second); "heat" = energised by the cursor
        const a = Math.min(1, (0.25 + 0.35 * r) * (0.6 + 0.4 * Math.sin(p.phase)) + p.heat * 0.6);
        const size = p.r * (1 + r * 0.8 + p.heat * 1.2);
        // heated particles shift toward gamma green
        const mr = Math.round(cr + (124 - cr) * p.heat);
        const mg = Math.round(cg + (255 - cg) * p.heat);
        const mb = Math.round(cb * (1 - p.heat));
        ctx.fillStyle = `rgba(${mr},${mg},${mb},${a * 0.25})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${mr},${mg},${mb},${a})`;
        ctx.fillRect(p.x - size / 2, p.y - size / 2, size, size);
      }

      // click shockwaves
      waves = waves.filter((wv) => wv.life > 0);
      for (const wv of waves) {
        wv.r += 9 * dt;
        wv.life -= 0.035 * dt;
        ctx.strokeStyle = `rgba(124,255,0,${Math.max(0, wv.life) * 0.9})`;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(wv.x, wv.y, wv.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = `rgba(57,255,20,${Math.max(0, wv.life) * 0.25})`;
        ctx.lineWidth = 10;
        ctx.stroke();
      }
      // spark bursts
      sparks = sparks.filter((s) => s.life > 0);
      for (const s of sparks) {
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        s.vx *= Math.pow(0.95, dt);
        s.vy *= Math.pow(0.95, dt);
        s.life -= s.decay * dt;
        ctx.fillStyle = s.white ? `rgba(235,255,225,${Math.max(0, s.life)})` : `rgba(124,255,0,${Math.max(0, s.life)})`;
        ctx.fillRect(s.x - s.size / 2, s.y - s.size / 2, s.size, s.size);
      }

      // soft glow at the cursor
      if (pointer.active) {
        const g = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, R * 0.6);
        g.addColorStop(0, 'rgba(57,255,20,0.14)');
        g.addColorStop(1, 'rgba(57,255,20,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, R * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
    };

    const loop = (t) => {
      const dt = last ? Math.min(3, (t - last) / 16.67) : 1;
      last = t;
      draw(dt);
      raf = requestAnimationFrame(loop);
    };
    const play = () => {
      if (reduced || raf || !visible || document.hidden) return;
      last = 0;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    resize();
    draw(1);

    const ro = 'ResizeObserver' in window ? new ResizeObserver(() => { resize(); draw(1); }) : null;
    ro?.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) play();
      else stop();
    });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : play());
    document.addEventListener('visibilitychange', onVis);

    // ---- interaction (listens on the section, since the canvas ignores pointer events) ----
    const host = canvas.parentElement;
    const local = (e) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMove = (e) => {
      const p = local(e);
      pointer.x = p.x;
      pointer.y = p.y;
      pointer.active = true;
    };
    const onLeave = () => (pointer.active = false);
    const onDown = (e) => {
      // buttons and links have their own effects
      if (e.target.closest?.('a, button')) return;
      const { x, y } = local(e);
      waves.push({ x, y, r: 6, life: 1 });
      for (const p of parts) {
        const dx = p.x - x;
        const dy = p.y - y;
        const d = Math.hypot(dx, dy) || 1;
        if (d < 280) {
          const f = (1 - d / 280) * 11;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
          p.heat = 1;
        }
      }
      for (let i = 0; i < 42; i++) {
        const a = Math.random() * Math.PI * 2;
        const v = 2 + Math.random() * 9;
        sparks.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 1, decay: 0.02 + Math.random() * 0.03, size: 1.2 + Math.random() * 2.2, white: Math.random() < 0.3 });
      }
      if (coarse) setTimeout(onLeave, 600); // touch: no hover afterwards
    };
    const bind = interactive && !reduced && host;
    if (bind) {
      host.addEventListener('pointermove', onMove, { passive: true });
      host.addEventListener('pointerleave', onLeave);
      host.addEventListener('pointerdown', onDown, { passive: true });
    }
    play();

    return () => {
      stop();
      ro?.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      if (bind) {
        host.removeEventListener('pointermove', onMove);
        host.removeEventListener('pointerleave', onLeave);
        host.removeEventListener('pointerdown', onDown);
      }
    };
  }, [density, boost, interactive]);

  return <canvas ref={ref} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />;
}
