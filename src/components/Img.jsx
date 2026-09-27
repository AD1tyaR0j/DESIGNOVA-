import { freshVariant, hasAsset } from '../lib/assets';

/** <picture> with WebP (full + ~820px) when available, original file as fallback. */
export function Picture({ src, alt, width, height, sizes = '100vw', eager = false, className = '', fallback, ...rest }) {
  if (!hasAsset(src)) return fallback ?? <AssetPlaceholder src={src} size={`${width}×${height}`} alt={alt} />;
  const base = src.replace(/\.[a-z]+$/i, '');
  const full = freshVariant(src, `${base}.webp`);
  const small = freshVariant(src, `${base}-820.webp`);
  const srcSet = [small && `${small} 820w`, full && `${full} ${width}w`].filter(Boolean).join(', ');
  return (
    <picture>
      {srcSet && <source type="image/webp" srcSet={srcSet} sizes={sizes} />}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? 'eager' : 'lazy'}
        decoding={eager ? 'sync' : 'async'}
        className={className}
        {...rest}
      />
    </picture>
  );
}

/** Labelled HUD placeholder shown until the organisers drop the real file in /public. */
export function AssetPlaceholder({ src, size, alt, className = '' }) {
  return (
    <div
      role="img"
      aria-label={alt ? `${alt} (image coming soon)` : 'Image coming soon'}
      className={`relative flex h-full w-full flex-col items-center justify-center gap-2 overflow-hidden bg-panel2 p-4 text-center ${className}`}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgb(var(--accent) / .12) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--accent) / .12) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />
      <div className="hazard-bar absolute inset-x-0 top-0 opacity-70" aria-hidden="true" />
      <span className="relative font-mono text-[0.7rem] uppercase tracking-[0.2em] text-accent-text">Asset pending</span>
      <span className="relative break-all font-mono text-xs text-ink sm:text-sm">public{src}</span>
      {size && <span className="relative font-mono text-[0.7rem] text-muted">{size}</span>}
    </div>
  );
}

/**
 * <img> that lazy-loads by default and falls back to a placeholder (or a custom
 * `fallback`) when the file is not in /public yet.
 */
export default function Img({ src, alt, width, height, size, eager = false, className = '', fallback, ...rest }) {
  if (!hasAsset(src)) {
    return fallback ?? <AssetPlaceholder src={src} size={size ?? (width && height ? `${width}×${height}` : '')} alt={alt} />;
  }
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
      {...rest}
    />
  );
}
