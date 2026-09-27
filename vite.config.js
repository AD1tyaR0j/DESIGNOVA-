import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

// Browser floor: Safari 15 / iOS 15, Chrome & Edge 90, Firefox 90.
// cssTarget keeps esbuild from stripping -webkit- prefixes and @supports
// fallbacks that Safari 15 still needs when CSS is minified.
const targets = ['es2020', 'chrome90', 'edge90', 'firefox90', 'safari15', 'ios15'];

const LOGO = '/images/designova-logo.png';

/**
 * Exposes `virtual:public-files`:
 *  • default export: a Set of every file path in /public (e.g. "/images/venue.jpg").
 *    Components use it to show a labelled placeholder instead of requesting an
 *    image that has not been supplied yet. Matching is case-sensitive, like
 *    Linux hosting (Vercel); files with uppercase names trigger a warning.
 *  • `webpVerified`: for an image X.png with a sidecar X.webp-source.txt, true
 *    only if the sidecar holds X.png's SHA-1, i.e. the X.webp / X-820.webp
 *    copies were made from *this* PNG. Replace the PNG and the stale WebPs are
 *    ignored automatically. No sidecar = WebPs are trusted.
 */
function publicFiles() {
  const id = 'virtual:public-files';
  const resolved = '\0' + id;
  let publicDir = '';
  let logger;
  const warned = new Set();

  const walk = (dir) =>
    fs.existsSync(dir)
      ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
          const full = path.join(dir, d.name);
          return d.isDirectory() ? walk(full) : [full];
        })
      : [];
  const abs = (p) => path.join(publicDir, p);
  const sha1 = (p) => crypto.createHash('sha1').update(fs.readFileSync(abs(p))).digest('hex');

  function webpVerified(src) {
    if (!fs.existsSync(abs(src))) return false;
    const sidecar = src.replace(/\.[a-z]+$/i, '.webp-source.txt');
    if (!fs.existsSync(abs(sidecar))) return true;
    const ok = fs.readFileSync(abs(sidecar), 'utf8').trim() === sha1(src);
    if (!ok && !warned.has(src)) {
      warned.add(src);
      logger?.warn(`\n[designova] ${src.slice(1)} changed, so its old WebP copies are ignored. Export new ones and delete public${sidecar} (see README).`);
    }
    return ok;
  }

  return {
    name: 'designova-public-files',
    configResolved(config) {
      publicDir = config.publicDir;
      logger = config.logger;
    },
    resolveId(source) {
      if (source === id) return resolved;
    },
    load(moduleId) {
      if (moduleId !== resolved) return;
      const files = walk(publicDir).map((f) => '/' + path.relative(publicDir, f).split(path.sep).join('/'));
      files
        .filter((f) => /[A-Z]/.test(path.basename(f)) && !/\.(txt|md)$/i.test(f))
        .forEach((f) => logger.warn(`[designova] public${f}: use a lowercase file name, the site looks for lowercase names only.`));
      const verified = Object.fromEntries(files.filter((f) => /\.(png|jpe?g)$/i.test(f)).map((f) => [f, webpVerified(f)]));
      return `export default new Set(${JSON.stringify(files)});\nexport const webpVerified = ${JSON.stringify(verified)};`;
    },
    // Preload the hero logo (the LCP image) using the same rules as <Picture> in src/components/Img.jsx.
    transformIndexHtml() {
      if (!webpVerified(LOGO)) return [];
      const base = LOGO.replace(/\.png$/, '');
      const set = [
        fs.existsSync(abs(`${base}-820.webp`)) && `${base}-820.webp 820w`,
        fs.existsSync(abs(`${base}.webp`)) && `${base}.webp 1629w`,
      ].filter(Boolean);
      if (!set.length) return [];
      return [
        {
          tag: 'link',
          attrs: { rel: 'preload', as: 'image', type: 'image/webp', imagesrcset: set.join(', '), imagesizes: '(max-width: 890px) 92vw, 820px', fetchpriority: 'high' },
          injectTo: 'head',
        },
      ];
    },
    configureServer(server) {
      const refresh = (file) => {
        if (!path.resolve(file).startsWith(path.resolve(publicDir))) return;
        const mod = server.moduleGraph.getModuleById(resolved);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: 'full-reload' });
      };
      server.watcher.on('add', refresh);
      server.watcher.on('unlink', refresh);
      server.watcher.on('change', refresh);
    },
  };
}

export default defineConfig({
  plugins: [react(), publicFiles()],
  build: {
    target: targets,
    cssTarget: targets.slice(1),
    assetsInlineLimit: 2048,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
});
