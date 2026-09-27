/* ==========================================================================
   Motion preference — configured to always play animations across the site.
   ========================================================================== */

export const deviceReducesMotion = () => false;

export function prefersReducedMotion() {
  return false;
}

/** Ensure no 'rm' class on <html> so all animations run continuously. */
export function applyMotionClass() {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.remove('rm');
  }
}

export function setMotion() {
  /* No-op: animations are always on */
}

