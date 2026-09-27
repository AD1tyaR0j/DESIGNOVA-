import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion, subscribe } from '../lib/rage';

const FINE = '(hover: hover) and (pointer: fine)';
const HOVERABLE = 'a, button, [role="button"], summary, label, [data-cursor]';

/**
 * Glowing gamma orb cursor. Mouse/trackpad only — never on touch.
 * Grows and turns green as the page transforms; charges up over links/buttons.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(() => typeof window !== 'undefined' && window.matchMedia(FINE).matches);
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia(FINE);
    const onChange = () => setEnabled(mq.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    const reduced = prefersReducedMotion();
    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;
    let base = 10;
    let hover = false;
    let down = false;
    let shown = false;

    const render = () => {
      raf = 0;
      const k = reduced ? 1 : 0.22;
      rx += (x - rx) * k;
      ry += (y - ry) * k;
      const ringSize = hover ? 46 : base * 2.6;
      const dotSize = down ? base * 0.7 : hover ? 6 : base;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${x - dotSize / 2}px, ${y - dotSize / 2}px, 0)`;
        dot.current.style.width = dot.current.style.height = `${dotSize}px`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx - ringSize / 2}px, ${ry - ringSize / 2}px, 0)`;
        ring.current.style.width = ring.current.style.height = `${ringSize}px`;
        ring.current.dataset.hover = hover ? 'true' : 'false';
      }
      if (Math.abs(x - rx) > 0.3 || Math.abs(y - ry) > 0.3) raf = requestAnimationFrame(render);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    const onMove = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      x = e.clientX;
      y = e.clientY;
      if (!shown) {
        shown = true;
        rx = x;
        ry = y;
        root.classList.add('has-orb-cursor');
        dot.current.style.opacity = ring.current.style.opacity = '1';
      }
      kick();
    };
    const onOver = (e) => {
      const next = Boolean(e.target.closest?.(HOVERABLE));
      if (next !== hover) {
        hover = next;
        kick();
      }
    };
    const onDown = () => {
      down = true;
      kick();
    };
    const onUp = () => {
      down = false;
      kick();
    };
    const onLeave = () => {
      shown = false;
      root.classList.remove('has-orb-cursor');
      if (dot.current) dot.current.style.opacity = ring.current.style.opacity = '0';
    };
    const unsub = subscribe(({ rage }) => {
      base = 8 + rage * 8;
      kick();
    });

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      unsub();
      root.classList.remove('has-orb-cursor');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div
        ref={dot}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[400] rounded-full opacity-0"
        style={{
          background: 'rgb(var(--accent))',
          boxShadow: '0 0 calc(6px + var(--rage) * 16px) rgb(var(--glow)), 0 0 2px #fff',
          transition: 'opacity .2s, width .15s, height .15s',
        }}
      />
      <div ref={ring} aria-hidden="true" className="orb-ring pointer-events-none fixed left-0 top-0 z-[399] rounded-full opacity-0" />
      <style>{`
        .orb-ring {
          border: 1.5px solid rgb(var(--accent) / .7);
          transition: opacity .2s, width .2s, height .2s, background-color .2s, border-color .2s;
        }
        .orb-ring[data-hover='true'] {
          border-color: #7CFF00;
          background: rgb(124 255 0 / .12);
          box-shadow: 0 0 18px rgb(57 255 20 / .6), inset 0 0 12px rgb(57 255 20 / .4);
          animation: pulse-glow 1.2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
