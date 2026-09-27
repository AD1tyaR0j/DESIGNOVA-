/* ==========================================================================
   Motion preference — one place that decides whether animations run.

   Default: follow the device (prefers-reduced-motion). Windows turns this on
   when Settings → Accessibility → Visual effects → "Animation effects" is off,
   which many people have without knowing. So visitors can override it with
   the "Animations" switch in the header (or the button on the calm intro);
   the choice is remembered in this browser.

   While motion is reduced, <html> gets the class "rm" and CSS/JS switch to
   the calm versions: no particles, shake, shockwaves, explosion or 3D flips.
   ========================================================================== */

const KEY = 'designova-motion'; // 'full' | 'reduced' | (unset = follow device)
const QUERY = '(prefers-reduced-motion: reduce)';

export const deviceReducesMotion = () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches;

function choice() {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function prefersReducedMotion() {
  const c = choice();
  if (c === 'full') return false;
  if (c === 'reduced') return true;
  return deviceReducesMotion();
}

/** Put the `rm` class on <html> before first paint (called from main.jsx). */
export function applyMotionClass() {
  document.documentElement.classList.toggle('rm', prefersReducedMotion());
}

/**
 * Save the visitor's choice and reload from the top, so every effect —
 * including the intro — restarts in the chosen mode.
 */
export function setMotion(full) {
  try {
    localStorage.setItem(KEY, full ? 'full' : 'reduced');
  } catch {
    /* storage blocked: the reload below still shows the default */
  }
  window.location.href = window.location.pathname;
}
