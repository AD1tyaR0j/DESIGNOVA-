import { useCallback, useEffect, useState } from 'react';
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import { startRage } from './lib/rage';
import { prefersReducedMotion } from './lib/motion';
import { startAmbient } from './lib/audio';
import Loader from './components/Loader';
import Header from './components/Header';
import Cursor from './components/Cursor';
import FxLayer from './components/FxLayer';
import Hero from './sections/Hero';
import About from './sections/About';
import Stats from './sections/Stats';
import Tracks from './sections/Tracks';
import Prizes from './sections/Prizes';
import Timeline from './sections/Timeline';
import Judging from './sections/Judging';
import Committee from './sections/Committee';
import Faq from './sections/Faq';
import Footer from './sections/Footer';

// Story order. Each section's position sets its "stage" (0 → 1): headings get
// heavier and wider and frames more cracked the further down the page you go.
const SECTIONS = [About, Stats, Tracks, Prizes, Timeline, Judging, Committee, Faq];
const TOTAL_STAGES = SECTIONS.length + 1; // + footer finale

// The intro plays on every visit before the landing page. Add ?nointro to the URL to skip it while editing.
const shouldShowIntro = () => !new URLSearchParams(window.location.search).has('nointro');

export default function App() {
  const [intro, setIntro] = useState(shouldShowIntro);
  // hero entrance starts when the intro blast opens the page (or at once with ?nointro)
  const [revealed, setRevealed] = useState(() => !shouldShowIntro());
  const reveal = useCallback(() => setRevealed(true), []);

  useEffect(() => {
    startRage();
  }, []);

  useEffect(() => {
    if (!intro) startAmbient();
  }, [intro]);

  const endIntro = useCallback(() => {
    setRevealed(true); // safety net: hero content must never stay hidden
    setIntro(false);
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion={prefersReducedMotion() ? 'always' : 'never'}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {intro && <Loader onDone={endIntro} onReveal={reveal} />}
        <Header />
        {/* #app-shell shakes on impact; fixed UI (header, cursor) stays outside it */}
        <div id="app-shell">
          <main id="main" tabIndex={-1} className="outline-none">
            <Hero revealed={revealed} />
            {SECTIONS.map((S, i) => (
              <S key={i} stage={(i + 1) / TOTAL_STAGES} index={i + 1} />
            ))}
          </main>
          <Footer />
        </div>
        <div className="scanlines" aria-hidden="true" />
        <FxLayer />
        <Cursor />
      </MotionConfig>
    </LazyMotion>
  );
}
