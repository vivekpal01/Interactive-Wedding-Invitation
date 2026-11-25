import { Heart } from "lucide-react";

const P1 = "M177 245 C196 239 253 216 290 207 C327 198 352 191 400 192 C448 193 529 206 577 215 C625 224 653 234 690 247 C727 260 765 274 800 290 C835 306 866 325 900 345 C934 365 985 398 1002 409";
const P2 = "M362 287 C560 312 800 360 1002 409";
const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const Plane = () => (
  <g fill="#3b1a22" transform="scale(1.5)">
    <ellipse rx="18" ry="3.2" /><path d="M5 0L-6 -17L-10 -17L-4 0L-10 17L-6 17Z" /><path d="M-14 0L-20 -8L-16 -8L-11 0L-16 8L-20 8Z" />
  </g>
);

function Flight({ d, begin, id }: { d: string; begin: string; id: string }) {
  const rm = reduce();
  return (
    <>
      <path id={id} d={d} fill="none" />
      <path d={d} pathLength={1} fill="none" stroke="#c9a04a" strokeWidth="7" strokeLinecap="round" strokeDasharray="1 1" strokeDashoffset={rm ? 0 : 1} opacity={rm ? 0.5 : 0} className="trail">
        {!rm && <>
          <animate attributeName="stroke-dashoffset" values="1;0;0;0" keyTimes="0;.7;.95;1" dur="7s" begin={begin} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;.75;.75;0;0" keyTimes="0;.04;.72;.95;1" dur="7s" begin={begin} repeatCount="indefinite" />
        </>}
      </path>
      {!rm && (
        <g>
          <Plane />
          <animateMotion dur="7s" begin={begin} repeatCount="indefinite" rotate="auto" calcMode="linear" keyPoints="0;1;1" keyTimes="0;.7;1"><mpath href={"#" + id} /></animateMotion>
          <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;.04;.68;.74;1" dur="7s" begin={begin} repeatCount="indefinite" />
        </g>
      )}
    </>
  );
}

export default function RouteMap() {
  return (
    <figure className="routemap reveal">
      <span className="tape" />
      <div className="map-art">
        <img src="/map.jpg" alt="Map showing journeys from Ireland and the UK to Nagpur, India" />
        <svg viewBox="0 0 1280 720" aria-hidden="true">
          <Flight d={P1} begin="0s" id="r1" />
          <Flight d={P2} begin="2.4s" id="r2" />
          {[[177, 245], [362, 287], [1002, 409]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="9" className="ring" style={{ animationDelay: `${i * .8}s`, transformOrigin: `${x}px ${y}px` }} />
          ))}
        </svg>
        <img className="couple-pop" src="/stickers/y-board.png" alt="" aria-hidden="true" />
        <Heart className="arrive h4" fill="currentColor" aria-hidden="true" /><Heart className="arrive h5" fill="currentColor" aria-hidden="true" /><Heart className="arrive h6" fill="currentColor" aria-hidden="true" /><Heart className="arrive h7" fill="currentColor" aria-hidden="true" />
        <Heart className="arrive h1" fill="currentColor" aria-hidden="true" /><Heart className="arrive h2" fill="currentColor" aria-hidden="true" /><Heart className="arrive h3" fill="currentColor" aria-hidden="true" />
      </div>
      <figcaption>-Bound by Destiny</figcaption>
    </figure>
  );
}
