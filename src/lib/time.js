import { useEffect, useState } from 'react';
import { event } from '../data/event';

export const START = new Date(event.start).getTime();
export const END = new Date(event.end).getTime();

/** 'upcoming' | 'live' | 'complete' */
export function statusAt(now) {
  if (now < START) return 'upcoming';
  if (now < END) return 'live';
  return 'complete';
}

/** Current time, re-rendering every `ms`. Paused while the tab is hidden. */
export function useNow(ms = 1000) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    let id = 0;
    const tick = () => setNow(Date.now());
    const start = () => {
      clearInterval(id);
      tick();
      id = setInterval(tick, ms);
    };
    const onVis = () => (document.hidden ? clearInterval(id) : start());
    start();
    document.addEventListener('visibilitychange', onVis);
    return () => {
      clearInterval(id);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [ms]);
  return now;
}

export function splitDuration(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

/** Minutes since midnight in IST for a timestamp (independent of the viewer's time zone). */
export function istMinutes(ts) {
  const d = new Date(ts + 5.5 * 3600 * 1000);
  return d.getUTCHours() * 60 + d.getUTCMinutes();
}

export const STATUS_LABEL = {
  upcoming: 'Upcoming',
  live: 'LIVE',
  complete: 'COMPLETE',
};
