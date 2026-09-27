import publicFiles, { webpVerified } from 'virtual:public-files';

/** True if the file exists in /public (exact, case-sensitive path like "/images/venue.jpg"). */
export const hasAsset = (src) => Boolean(src) && publicFiles.has(src);

/**
 * A WebP copy next to an image (e.g. designova-logo.webp, designova-logo-820.webp)
 * is used only if it was made from the current original — checked by content hash
 * at build time (see vite.config.js) — so replacing the PNG never shows a stale logo.
 */
export function freshVariant(src, variant) {
  return hasAsset(variant) && webpVerified[src] !== false ? variant : null;
}
