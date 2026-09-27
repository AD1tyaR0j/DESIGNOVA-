import { event, media, nav, venue } from '../data/event';
import { STATUS_LABEL, statusAt, useNow } from '../lib/time';
import { headingAxes } from '../lib/rage';
import GammaField from '../components/GammaField';
import Img from '../components/Img';
import RegisterButton from '../components/RegisterButton';

const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.mapsQuery)}`;

export function StatusBadge({ className = '' }) {
  const now = useNow(15000);
  const status = statusAt(now);
  const live = status === 'live';
  return (
    <p
      className={`inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-xs uppercase tracking-[0.18em] ${
        live ? 'border-gamma bg-gamma text-void' : status === 'complete' ? 'border-gamma/60 text-gamma' : 'border-accent/50 text-accent-text'
      } ${className}`}
    >
      <span className={`h-2 w-2 rounded-full ${live ? 'animate-pulse bg-void' : 'bg-current'}`} aria-hidden="true" />
      Event status: {STATUS_LABEL[status]}
    </p>
  );
}

const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(venue.mapsQuery)}&z=15&output=embed`;

export default function Footer() {
  return (
    <footer className="relative" style={headingAxes(1)}>
      {/* Finale: fully transformed */}
      <section aria-labelledby="finale-title" data-no-impact className="relative overflow-hidden border-t border-gamma/40 py-24 text-center sm:py-32">
        <GammaField boost={0.2} density={1.3} interactive />
        <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 60%, rgb(57 255 20 / .14), transparent 70%)' }} aria-hidden="true" />
        <div className="container-site relative">
          <p className="eyebrow">Status: Transformed</p>
          <h2 id="finale-title" className="h-trans mx-auto mt-4 max-w-4xl text-[2.6rem] xs:text-5xl sm:text-7xl lg:text-8xl" style={{ color: '#7CFF00', textShadow: '0 0 30px rgb(57 255 20 / .45)' }}>
            Your idea is ready to transform
          </h2>
          <p className="tagline-gradient mt-6 font-display text-2xl font-extrabold uppercase sm:text-3xl" style={{ fontStretch: '88%' }}>
            {event.tagline}
          </p>
          <div className="mt-10 flex justify-center">
            <RegisterButton />
          </div>
        </div>
      </section>

      <div className="hazard-bar" aria-hidden="true" />

      <div className="bg-panel">
        <div className="container-site grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.1fr_0.55fr_1.2fr_1.25fr]">
          <div>
            <p className="font-display text-3xl font-black uppercase text-ink" style={{ fontStretch: '90%' }}>
              {event.name} <span className="text-gamma">{event.year}</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink/85">
              A {event.type.toLowerCase()} by the {event.organiserLong}.
            </p>
            <StatusBadge className="mt-5" />
            <ul className="mt-8 flex flex-wrap items-center gap-3" aria-label="Organisers">
              {media.partnerLogos.map((l) => (
                <li key={l.src} className="flex h-14 items-center">
                  <Img
                    src={l.src}
                    alt={l.name}
                    width="400"
                    height="160"
                    className="h-12 w-auto max-w-[140px] object-contain"
                    fallback={
                      <span className="inline-flex h-12 items-center border border-accent/40 px-3 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink/85">
                        {l.name}
                      </span>
                    }
                  />
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-text">Quick links</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 lg:grid-cols-1">
              {nav.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="inline-block py-1 text-ink/90 hover:text-gamma">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-text">Contact</h2>
            <ul className="mt-4 space-y-3 text-ink/90">
              <li>
                <a href={`mailto:${event.contact.email}`} className="text-sm [overflow-wrap:anywhere] underline decoration-accent/50 underline-offset-4 hover:text-gamma">
                  {event.contact.email}
                </a>
              </li>
              {event.contact.people.map((p) => (
                <li key={p.phone}>
                  <span className="block text-sm text-muted">{p.name}</span>
                  <a href={`tel:${p.phone.replace(/\s/g, '')}`} className="font-mono hover:text-gamma">
                    {p.phone}
                  </a>
                </li>
              ))}
            </ul>
            <address className="mt-5 text-sm not-italic leading-relaxed text-ink/80">{venue.address}</address>
          </div>

          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-text">Find the venue</h2>
            <div className="relative mt-4 aspect-[4/3] overflow-hidden border border-accent/40 bg-void">
              <iframe
                title={`Map showing ${venue.name}`}
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full"
                style={{ border: 0, filter: 'grayscale(.6) invert(.9) hue-rotate(180deg) contrast(.9)' }}
              />
            </div>
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm text-ink/90 underline decoration-accent/50 underline-offset-4 hover:text-gamma">
              Open in Google Maps<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="container-site flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {event.year} {event.organiser}, Galgotias University.
            </p>
            <p>Hulk-inspired theme. Not affiliated with or endorsed by Marvel.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
