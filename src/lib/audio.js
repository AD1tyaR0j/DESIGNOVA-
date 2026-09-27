/* ==========================================================================
   Optional ambient music + impact SFX (royalty-free files supplied by the
   organisers; nothing is bundled). Enabled via `audio.enabled` in event.js.

   • Starts after the intro. If the browser blocks autoplay, starts on the
     first click / tap / key press instead.
   • Pauses while the tab is hidden.
   • Volume goes through a Web Audio GainNode, because iOS Safari ignores
     HTMLMediaElement.volume. Falls back to element volume without Web Audio.
   • Mute preference is remembered per browser.
   ========================================================================== */
import { useSyncExternalStore } from 'react';
import { audio as config } from '../data/event';
import { hasAsset } from './assets';

const KEY = 'designova-muted';
const readMuted = () => {
  try {
    return localStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
};

const available = config.enabled && hasAsset(config.ambient);
const sfxAvailable = config.enabled && hasAsset(config.impact);

let el = null;
let ctx = null;
let gain = null;
let impactBuffer = null;
let wanted = false; // intro finished → music should be playing
let unlocked = false;
let muted = readMuted();
const subs = new Set();
const emit = () => subs.forEach((f) => f());

function ensureGraph() {
  if (el) return;
  el = new Audio(config.ambient);
  el.loop = true;
  el.preload = 'auto';
  el.setAttribute('playsinline', '');
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (Ctx) {
    try {
      ctx = new Ctx();
      gain = ctx.createGain();
      gain.gain.value = muted ? 0 : config.volume;
      ctx.createMediaElementSource(el).connect(gain).connect(ctx.destination);
    } catch {
      ctx = null;
    }
  }
  if (!ctx) el.volume = muted ? 0 : config.volume;
}

async function loadImpact() {
  if (!sfxAvailable || !ctx || impactBuffer) return;
  try {
    const res = await fetch(config.impact);
    const data = await res.arrayBuffer();
    impactBuffer = await new Promise((ok, fail) => ctx.decodeAudioData(data, ok, fail));
  } catch {
    impactBuffer = null;
  }
}

async function tryPlay() {
  if (!available || !wanted || muted || document.hidden) return false;
  ensureGraph();
  try {
    // Call resume() and play() synchronously so iOS still sees the user gesture.
    const resuming = ctx && ctx.state !== 'running' ? ctx.resume() : null;
    const playing = el.play();
    // resume() can stay pending forever without a gesture, so cap the wait
    if (resuming) await Promise.race([resuming, new Promise((r) => setTimeout(r, 300))]);
    await playing;
    if (ctx && ctx.state !== 'running') throw new Error('audio context suspended');
    unlocked = true;
    loadImpact();
    return true;
  } catch {
    el.pause();
    return false;
  }
}

const GESTURES = ['pointerdown', 'keydown', 'touchend'];
function armGestureStart() {
  const handler = async () => {
    if (await tryPlay()) GESTURES.forEach((g) => window.removeEventListener(g, handler, true));
  };
  GESTURES.forEach((g) => window.addEventListener(g, handler, true));
}

let visBound = false;
export function startAmbient() {
  if (!available || wanted) return;
  wanted = true;
  tryPlay().then((ok) => {
    if (!ok) armGestureStart();
  });
  if (!visBound) {
    visBound = true;
    document.addEventListener('visibilitychange', () => {
      if (!el) return;
      if (document.hidden) el.pause();
      else tryPlay();
    });
  }
}

export function setMuted(next) {
  muted = next;
  try {
    localStorage.setItem(KEY, next ? '1' : '0');
  } catch {
    /* storage blocked — preference just won't persist */
  }
  if (el) {
    if (gain && ctx) gain.gain.setTargetAtTime(next ? 0 : config.volume, ctx.currentTime, 0.05);
    else el.volume = next ? 0 : config.volume;
    if (next) el.pause();
    else tryPlay();
  }
  emit();
}

export function playImpact() {
  if (!unlocked || muted || !impactBuffer || !ctx) return;
  const src = ctx.createBufferSource();
  const g = ctx.createGain();
  g.gain.value = Math.min(1, config.volume * 2);
  src.buffer = impactBuffer;
  src.connect(g).connect(ctx.destination);
  src.start();
}

export const audioAvailable = available;

export function useMuted() {
  return useSyncExternalStore(
    (f) => {
      subs.add(f);
      return () => subs.delete(f);
    },
    () => muted,
  );
}
