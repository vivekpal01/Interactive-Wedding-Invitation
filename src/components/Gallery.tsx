import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PHOTOS = [
  { src: "/photos/photo1.jpg", cap: "Hand in hand", pos: "50% 30%" },
  { src: "/photos/photo2.jpg", cap: "Walking into forever", pos: "50% 55%" },
  { src: "/photos/photo3.jpg", cap: "Golden hour", pos: "50% 50%" },
];
const N = PHOTOS.length;
const LOOP = [...PHOTOS, ...PHOTOS, ...PHOTOS]; // three copies = endless, cylinder-style loop

export default function Gallery() {
  const tr = useRef<HTMLDivElement>(null);
  const idx = useRef(N);
  const timer = useRef<number>();
  const [active, setActive] = useState(0);

  const centerOn = (k: number, smooth: boolean) => {
    const t = tr.current!, el = t.children[k] as HTMLElement;
    t.scrollTo({ left: el.offsetLeft - (t.clientWidth - el.offsetWidth) / 2, behavior: smooth ? "smooth" : "auto" });
  };
  const nearest = () => {
    const t = tr.current!, mid = t.scrollLeft + t.clientWidth / 2; let best = 0, bd = 1e9;
    Array.from(t.children).forEach((c, k) => { const e = c as HTMLElement, d = Math.abs(e.offsetLeft + e.offsetWidth / 2 - mid); if (d < bd) { bd = d; best = k; } });
    return best;
  };

  useLayoutEffect(() => { centerOn(N, false); }, []);

  const onScroll = useCallback(() => {
    const k = nearest(); idx.current = k; setActive(k % N);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {          // scrolling stopped: silently jump back to the middle copy
      const t = tr.current!; const cur = nearest();
      if (cur < N || cur >= 2 * N) {
        const to = cur < N ? cur + N : cur - N;
        t.style.scrollSnapType = "none"; centerOn(to, false); idx.current = to;
        requestAnimationFrame(() => { t.style.scrollSnapType = ""; });
      }
    }, 140);
  }, []);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const go = (d: number) => centerOn(Math.min(Math.max(idx.current + d, 0), LOOP.length - 1), true);
  const goDot = (k: number) => { let d = ((k - (idx.current % N)) + N) % N; if (d > 1) d -= N; go(d); };

  return (
    <div className="gallery">
      <div className="track" ref={tr} onScroll={onScroll} tabIndex={0} aria-label="Photo gallery, endless sideways scroll">
        {LOOP.map((p, k) => (
          <figure className={"polaroid p" + (k % N) + (k % N === active ? " active" : "")} key={k} aria-hidden={k < N || k >= 2 * N}>
            <span className="tape" />
            <img src={p.src} alt={p.cap} style={{ objectPosition: p.pos }} loading="lazy" draggable={false} />
            <figcaption>{p.cap}</figcaption>
          </figure>
        ))}
      </div>
      <div className="g-ctrl">
        <button onClick={() => go(-1)} aria-label="Previous photo"><ChevronLeft /></button>
        <div className="dots">{PHOTOS.map((_, k) => <button key={k} className={k === active ? "on" : ""} onClick={() => goDot(k)} aria-label={`Photo ${k + 1}`} />)}</div>
        <button onClick={() => go(1)} aria-label="Next photo"><ChevronRight /></button>
      </div>
    </div>
  );
}
