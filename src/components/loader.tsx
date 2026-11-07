"use client";

import { useEffect, useRef } from "react";

/**
 * Tiles loader (ported from Originkit "Tiles"). Tiles ink over in a fixed random order as the
 * page loads, then shrink away in a diagonal wave from the bottom-left. Plays once per visit.
 */
const MIN_TIME = 3; // seconds the load plays at minimum
const REVEAL_S = 1.6;
const FADE_S = 0.35;
const SHORT_SIDE = 7; // tiles across the short side
const INK_WINDOW = 0.04; // share of the load one tile takes to ink in

const rand = (seed: number) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};
const clamp = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const seg = (x: number, a: number, b: number) => clamp((x - a) / Math.max(1e-6, b - a));
const outCubic = (x: number) => 1 - Math.pow(1 - x, 3);
const inOutCubic = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

// Simulated load: uneven chunks landing at different times; exactly 1 at loadS.
function loadCurve(seed: number, loadS: number) {
  const r = rand(seed);
  const k = Math.min(1, loadS / 4.4);
  const chunks: { size: number; start: number; len: number }[] = [];
  let total = 0;
  for (let i = 0; i < 7; i++) {
    const size = 0.4 + r() * 1.2;
    chunks.push({ size, start: r() * 0.78 * loadS, len: (0.25 + r() * 0.9) * k });
    total += size;
  }
  chunks.push({ size: total * 0.12, start: loadS - 0.45 * k, len: 0.45 * k });
  total *= 1.12;
  return (t: number) => {
    if (t >= loadS) return 1;
    let p = 0;
    for (const c of chunks) {
      const x = clamp((t - c.start) / Math.max(1e-3, c.len));
      p += c.size * x * x * (3 - 2 * x);
    }
    return Math.min(0.999, p / total);
  };
}

// Real load only ever holds the simulated curve back.
function realLoad() {
  if (document.readyState === "complete") return 1;
  const imgs = document.images;
  let done = 0;
  for (const im of Array.from(imgs)) if (im.complete) done++;
  const frac = imgs.length ? done / imgs.length : 1;
  const fonts = document.fonts && document.fonts.status === "loaded" ? 1 : 0;
  return Math.min(0.95, 0.15 + 0.6 * frac + 0.2 * fonts);
}

export default function Loader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const loader = rootRef.current!, tilesEl = tilesRef.current!, countEl = countRef.current!, numEl = numRef.current!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cols = 0, rows = 0;
    let tiles: HTMLDivElement[] = [], papers: HTMLDivElement[] = [], order: number[] = [];

    const build = () => {
      const w = innerWidth, h = innerHeight, cell = Math.min(w, h) / SHORT_SIDE;
      const c = Math.max(1, Math.round(w / cell)), r = Math.max(1, Math.round(h / cell));
      if (c === cols && r === rows) return;
      cols = c; rows = r;
      const count = cols * rows;
      const rr = rand(count * 7919 + 13);
      order = Array.from({ length: count }, () => rr() * (1 - INK_WINDOW));
      tilesEl.innerHTML = ""; tiles = []; papers = [];
      for (let i = 0; i < count; i++) {
        const t = document.createElement("div"), p = document.createElement("div");
        t.className = "tile";
        const x = i % cols, y = Math.floor(i / cols);
        // 1px overlap so no seam shows between closed tiles
        t.style.cssText = `left:${(x * 100) / cols}%;top:${(y * 100) / rows}%;width:calc(${100 / cols}% + 1px);height:calc(${100 / rows}% + 1px)`;
        t.appendChild(p); tilesEl.appendChild(t); tiles.push(t); papers.push(p);
      }
    };

    const loadS = reduced ? 0.6 : MIN_TIME, revealS = reduced ? 0.4 : REVEAL_S, curve = loadCurve(7, loadS);
    let t = 0, progress = 0, revealAt = -1, last = -1, raf = 0;

    const draw = () => {
      const reveal = revealAt < 0 ? 0 : clamp((t - revealAt) / revealS);
      for (let i = 0; i < tiles.length; i++) {
        papers[i].style.opacity = String(1 - seg(progress, order[i], order[i] + INK_WINDOW));
        const c = i % cols, r = Math.floor(i / cols);
        const d = 0.5 * (cols > 1 ? c / (cols - 1) : 0) + 0.5 * (rows > 1 ? (rows - 1 - r) / (rows - 1) : 0);
        tiles[i].style.transform = `scale(${1 - inOutCubic(seg(reveal, d * 0.55, d * 0.55 + 0.45))})`;
      }
      const digits = String(Math.round(progress * 100));
      if (numEl.textContent !== digits) numEl.textContent = digits;
      countEl.style.opacity = String(outCubic(seg(t, 0.1, 0.8)) * (1 - seg(reveal, 0, 0.15)));
    };

    const tick = (now: number) => {
      // Cap the step at .25s, not .05s, so slow or throttled frames still keep real time
      const dt = last < 0 ? 0 : Math.min(0.25, (now - last) / 1000);
      last = now; t += dt;
      if (revealAt < 0) {
        const target = Math.min(curve(t), realLoad());
        progress = target >= 1 ? 1 : Math.min(target, progress + dt * 1.5);
        if (progress >= 1 && t >= loadS) {
          revealAt = t;
          // Let the page start its entrance (e.g. shapes dropping) as the tiles clear
          (window as Window & { __loaderRevealed?: boolean }).__loaderRevealed = true;
          window.dispatchEvent(new Event("loader:reveal"));
        }
      }
      draw();
      if (revealAt >= 0 && t - revealAt >= revealS) {
        loader.style.transition = `opacity ${FADE_S}s ease`;
        loader.style.opacity = "0";
        loader.style.pointerEvents = "none";
        setTimeout(() => (loader.style.display = "none"), FADE_S * 1000);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const onResize = () => { build(); draw(); };
    build(); draw();
    loader.style.background = "transparent"; // tiles take over from the solid paper
    addEventListener("resize", onResize);
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", onResize); };
  }, []);

  return (
    <div id="loader" ref={rootRef} aria-hidden="true">
      {/* Solid paper until the tiles are built, so the page never flashes through */}
      <div ref={tilesRef} className="absolute inset-0" />
      <div className="count" ref={countRef}>
        <span><span ref={numRef} /><span className="pct">%</span></span>
      </div>
    </div>
  );
}
