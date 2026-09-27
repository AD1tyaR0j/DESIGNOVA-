# DESIGNOVA 2026 — website

Website for **DESIGNOVA 2026**, a designathon by the IEEE GUSB Computer Society, Galgotias University.
*Design. Innovate. Transform.*

**Concept: "Transformation" with Gamma Lab HUD frames.** The page starts calm (steel grey-blue, thin
headings, a slow heartbeat) and transforms as you scroll: colours surge through purple to gamma green,
headings get heavier and wider, frames crack, particles speed up. The only green thing at the top is
your logo and the Register button — the idea waiting to transform.

**Interactive hero:** gamma particles swirl into orbit around your cursor and link to it with energy
lines; click or tap anywhere to fire a shockwave. The logo tilts in 3D with the mouse, has containment
rings, a breathing aura and electric arcs, and everything slams in as the intro blast opens the page.

**Hulk FX everywhere** (`src/components/FxLayer.jsx` + the "HULK FX" block at the end of `src/index.css`):
- **Smash anywhere:** click empty space to leave a cracked impact crater with a shockwave and a thud.
- **Spark trail:** green sparks fly off the cursor when it moves fast.
- **Rage vignette:** scrolling fast makes the screen edges glow green.
- **Headings:** they smash in with a shake and a crack beneath them, and glitch on hover.
- **Dividers:** moving hazard-stripe "radiation zone" bands run between sections.
- **Cards:** they power on with a scan, and a gamma spotlight and 3D tilt follow the cursor.
- **Buttons:** an energy shine sweeps across on hover.
- **Timeline:** a gamma pulse travels down the line.
- **Judging:** the power bars have a shine sweep.
- **Committee:** the cards lift and glow on hover.
- **Easter egg:** type **S-M-A-S-H** on the keyboard for a GAMMA OVERLOAD.

**Animations switch:** the header has an "Animations on/off" button. By default the site follows the
device (Windows "Animation effects" off = calm mode); visitors can turn the full experience on, and the
calm intro shows a "Play full animation" button. The choice is remembered per browser.

Built with React 19, Vite 7, Tailwind CSS 3.4 and Framer Motion 12. All effects are original
CSS / SVG / canvas. No Marvel assets, fonts or audio.

---

## 1. Run it

You need **Node.js 20.19 or newer** (<https://nodejs.org>, pick "LTS").

| System  | Do this |
|---------|---------|
| Windows | Double-click **`start.bat`** |
| macOS   | Double-click **`start.command`**. The first time, right-click → Open if macOS warns about it. |
| Linux   | Run `./start.sh` |

The script installs dependencies on first run, then opens <http://localhost:5173>.

Or by hand:

```bash
npm install
npm run dev        # local dev server with live reload
npm run build      # production build → dist/
npm run preview    # serve the built dist/ locally
npm run lint       # ESLint (incl. accessibility rules)
```

The intro plays **on every visit** before the landing page: atoms spiral together and fuse into a
glowing gamma particle, which explodes and blasts open the main page (about 4.6 seconds, all canvas).
Skip it with the button or Esc. To skip it automatically while editing, add `?nointro` to the URL: <http://localhost:5173/?nointro>

---

## 2. Edit the content

**All text, dates and lists live in one file: [`src/data/event.js`](src/data/event.js).**
You should not need to touch any component to update the site.

- Anything unconfirmed is marked `// TODO confirm`.
- At the top is a `confirmed` block. While a flag is `false`, that section shows a small yellow
  **PROVISIONAL** tag. Set it to `true` once the real details are in.
- **Date and time:** set `event.start` / `event.end` as ISO times with the IST offset, e.g.
  `'2026-11-14T10:00:00+05:30'`. These drive the countdown, the **LIVE** / **COMPLETE** states,
  the footer status badge and the "NOW" marker in the schedule. Also update `dateLabel` / `timeLabel`
  (the text shown on the hero).
- **Registration:** put the link in `registration.url`. While it's empty, the Register buttons show a
  "Registration opens soon" note instead of navigating.

### Section → file map

| # | Section | Component | Data in `event.js` |
|---|---------|-----------|--------------------|
| – | Intro (atoms → gamma particle → explosion) | `src/components/Loader.jsx` | `event.presentsLine` |
| – | Header, nav, gamma meter, mute button | `src/components/Header.jsx` | `nav`, `audio` |
| – | Custom cursor | `src/components/Cursor.jsx` | – |
| – | Register button + impact effect | `src/components/RegisterButton.jsx` | `registration` |
| 0 | Hero | `src/sections/Hero.jsx` | `event`, `media.logo`, `venue.name` |
| 1 | About + countdown | `src/sections/About.jsx` | `about`, `event.start/end` |
| 2 | Stats strip | `src/sections/Stats.jsx` | `stats` |
| 3 | Tracks | `src/sections/Tracks.jsx` | `tracks` |
| 4 | Prizes | `src/sections/Prizes.jsx` | `prizes`, `specialMentions`, `goodies` |
| 5 | Timeline + rage meter | `src/sections/Timeline.jsx` | `schedule` |
| 6 | Judging power bars | `src/sections/Judging.jsx` | `judging` |
| 7 | Organising committee | `src/sections/Committee.jsx` | `committee` |
| 8 | FAQ | `src/sections/Faq.jsx` | `faqs` |
| – | Finale + footer + map | `src/sections/Footer.jsx` | `event.contact`, `media.partnerLogos`, `venue` |

Shared pieces:

- `src/lib/rage.js` is the scroll-driven "rage" engine (colours and intensity).
- `src/components/HudFrame.jsx` draws the angular frames, hazard stripes and cracks.
- `src/components/GammaField.jsx` is the particle canvas.
- `src/lib/audio.js` handles the music and SFX.
- `src/index.css` holds the global styles and effects.

Section order lives in `src/App.jsx` (`SECTIONS`). Reordering changes how "transformed" each section looks.

---

## 3. Where to drop each asset

Put files in **`public/`** using **exactly these lowercase names**. The live server is case-sensitive,
so `Venue.JPG` will not be found. Until a file exists, the site shows a labelled "Asset pending"
placeholder with the expected path and size. While `npm run dev` is running, new files appear automatically.

| File | Size | Used in |
|------|------|---------|
| `public/images/designova-logo.png` | ~1600×500, transparent | Hero — **supplied** |
| `public/images/designova-logo.webp` + `designova-logo-820.webp` | same / 820 wide | Faster versions of the logo (see note) |
| `public/images/galgotias-logo.png` | ~400 wide, transparent | Footer |
| `public/images/ieee-gusb-logo.png` | ~400 wide, transparent | Footer |
| `public/images/ieee-cs-logo.png` | ~400 wide, transparent | Footer |
| `public/images/team/<firstname-lastname>.jpg` | 600×600 | Committee (also list them in `committee`) |
| `public/audio/ambient.m4a` | AAC, fast start | Optional music |
| `public/audio/impact.m4a` | AAC, fast start | Optional Register SFX |

**Logo WebP note:** the supplied PNG is ~1 MB, so WebP copies (135 KB and 54 KB) are included and
preloaded. `designova-logo.webp-source.txt` records a fingerprint of the PNG they were made from.
**If you replace the PNG, the old WebPs are ignored automatically** and the build prints a reminder,
so a stale logo can never show. To get the speed back:

1. Export new WebPs at <https://squoosh.app>: `designova-logo.webp` at full size and
   `designova-logo-820.webp` at 820px wide.
2. Delete `designova-logo.webp-source.txt`.

**Audio:** royalty-free only. Make the files "fast start" and switch them on in `event.js`
(`audio.enabled: true`):

```bash
ffmpeg -i ambient.wav -c:a aac -b:a 128k -movflags +faststart ambient.m4a
```

Music starts after the intro. If the browser blocks autoplay, it starts on the first click, tap or key.
It pauses when the tab is hidden, and the header mute button remembers the choice. Volume goes through
a Web Audio GainNode, because iOS ignores the normal volume setting.

---

## 4. Hosting

```bash
npm run build
```

This produces a static site in **`dist/`**. Upload that folder to any static host.

### Vercel

1. Push this folder to a GitHub repository.
2. On <https://vercel.com> → **Add New… → Project** → import the repo.
3. Vercel detects **Vite**. Keep the defaults: build command `npm run build`, output directory `dist`.
4. Click **Deploy**. Every later push redeploys automatically.

Or from the terminal: `npx vercel` (preview) then `npx vercel --prod`.

---

## 5. Browser support and accessibility

- **Browsers:** Chrome, Edge and Firefox 90+; Safari 15+ (macOS and iOS); Android Chrome. The layout
  works down to 320px with no horizontal scroll.
- **Safari 15 settings:** `vite.config.js` sets `build.target` / `build.cssTarget` to Safari 15, so
  `-webkit-` prefixes and fallbacks survive minification.
- **`@supports` fallbacks:** used for `color-mix()`, container queries, `:has()`, `100svh` and
  `overflow: clip`.
- **Why Tailwind 3 and not 4:** Tailwind 4 requires Safari 16.4+.
- **Reduced motion:** with *Reduce motion* turned on (Windows: Settings → Accessibility → Visual
  effects → Animation effects **off**), the intro shows a still image of the formed gamma particle
  for about 2 seconds, then fades. There's no screen shake, shockwave, particle animation or 3D flip,
  and scroll colours snap between three calm stages instead of blending. With motion on, the only
  flash is one soft pulse in the intro.
- **Keyboard:**
  - Skip link.
  - Visible focus rings.
  - Committee flip cards are buttons with `aria-pressed`, working with Enter and Space.
  - The FAQ accordion allows one panel open at a time; Up/Down/Home/End move between questions.
  - The mobile menu closes with Esc and returns focus.
- **Custom cursor:** only on mouse or trackpad (`(hover: hover) and (pointer: fine)`), never on touch.

---

## 6. IP note

The theme is Hulk-*inspired* through original art only: gamma energy, cracks, shockwaves, HUD lab
frames and a rage meter. The site uses no Marvel or Avengers characters, logos, fonts, film stills
or audio. Fonts are from Google Fonts under the Open Font License: **Saira**, **Inter** and
**Share Tech Mono**.

The DESIGNOVA logo is supplied by the organisers. Its ringed "D" and metallic lettering are close to
the Avengers logo style, so please have it reviewed. If you swap it out, just delete
`designova-logo.png` and the site falls back to an original chrome CSS wordmark.
