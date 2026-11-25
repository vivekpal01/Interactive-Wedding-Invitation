import { useCallback, useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";

export default function Scratch() {
  const wrap = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const [done, setDone] = useState(false);
  const drawing = useRef(false);
  const moves = useRef(0);
  const touched = useRef(false);

  const paint = useCallback(() => {
    const c = cv.current!, w = wrap.current!;
    const r = w.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = r.width * dpr; c.height = r.height * dpr;
    const x = c.getContext("2d")!; x.setTransform(dpr, 0, 0, dpr, 0, 0);
    const g = x.createLinearGradient(0, 0, r.width, r.height);
    g.addColorStop(0, "#c9a04a"); g.addColorStop(.45, "#f6e3a0"); g.addColorStop(1, "#b88a2f");
    x.fillStyle = g; x.fillRect(0, 0, r.width, r.height);
    x.globalAlpha = .3; x.fillStyle = "#fff";
    for (let i = 0; i < 160; i++) { x.beginPath(); x.arc(Math.random() * r.width, Math.random() * r.height, Math.random() * 2.2, 0, 7); x.fill(); }
    x.globalAlpha = .55; x.strokeStyle = "#fff4cf"; x.lineWidth = 2; x.setLineDash([8, 7]);
    x.strokeRect(12, 12, r.width - 24, r.height - 24); x.setLineDash([]);
    x.globalAlpha = 1; x.textAlign = "center"; x.textBaseline = "middle"; x.fillStyle = "#6b1626";
    x.shadowColor = "rgba(255,244,207,.8)"; x.shadowBlur = 6;
    x.font = `${Math.round(r.width * .15)}px "Great Vibes", cursive`;
    x.fillText("Scratch to reveal", r.width / 2, r.height * .42);
    x.font = `600 ${Math.round(r.width * .095)}px Caveat, cursive`;
    x.fillText("our wedding date", r.width / 2, r.height * .64);
  }, []);

  useEffect(() => { paint(); Promise.all([document.fonts.load('40px "Great Vibes"'), document.fonts.load('600 30px Caveat')]).then(() => { if (!touched.current) paint(); }).catch(() => {}); const f = () => !done && paint(); window.addEventListener("resize", f); return () => window.removeEventListener("resize", f); }, [paint, done]);

  const scratch = (e: React.PointerEvent) => {
    touched.current = true;
    if (!drawing.current || done) return;
    const c = cv.current!, r = c.getBoundingClientRect(), x = c.getContext("2d")!;
    x.globalCompositeOperation = "destination-out";
    x.beginPath(); x.arc(e.clientX - r.left, e.clientY - r.top, 26, 0, 7); x.fill();
    if (++moves.current % 12 === 0) check();
  };
  const check = () => {
    const c = cv.current!, x = c.getContext("2d")!;
    const d = x.getImageData(0, 0, c.width, c.height).data; let clear = 0, n = 0;
    for (let i = 3; i < d.length; i += 64) { n++; if (d[i] === 0) clear++; }
    if (clear / n > .45) setDone(true);
  };

  return (
    <div className="scratch-block">
      <div ref={wrap} className="scratch" style={{ touchAction: "none" }}>
        <div className="scratch-under">
          <img src="/stickers/x-soulmates.png" alt="" className="scratch-stk" />
          <small>Save the date</small>
          <strong>25 December 2026</strong>
          
        </div>
        <canvas ref={cv} className={done ? "gone" : ""} aria-label="Scratch card. Scratch to reveal the wedding date."
          onPointerDown={(e) => { drawing.current = true; (e.target as Element).setPointerCapture(e.pointerId); scratch(e); }}
          onPointerMove={scratch} onPointerUp={() => { drawing.current = false; check(); }} onPointerCancel={() => (drawing.current = false)} />
      </div>
      {!done && <button className="btn ghost" onClick={() => setDone(true)}><Sparkles size={16} /> Tap to reveal</button>}
      <p className="sr-only" aria-live="polite">{done ? "The wedding date is 25 December 2026 at 5:00 PM." : ""}</p>
    </div>
  );
}
