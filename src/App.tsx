import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp, CalendarDays, Clock, Heart, MapPin, Navigation, Shirt, Sparkles } from "lucide-react";
import Music from "./components/Music";
import Scratch from "./components/Scratch";
import Gallery from "./components/Gallery";
import RouteMap from "./components/RouteMap";
import { DIRECTIONS_URL, EVENTS, FAMILIES, MAP_EMBED_SRC, S, VENUE_NAME, VENUE_PLACE } from "./config";

gsap.registerPlugin(ScrollTrigger);
const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (reduce()) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((en) => en.forEach((x) => x.isIntersecting && (x.target.classList.add("in"), io.unobserve(x.target))), { threshold: .18 });
    els.forEach((e) => io.observe(e)); return () => io.disconnect();
  }, []);
}

const Stk = ({ n, cls = "", alt = "" }: { n: string; cls?: string; alt?: string }) => <img className={"stk " + cls} src={S(n)} alt={alt} draggable={false} />;

function Lights() {
  return <div className="lights" aria-hidden="true">{Array.from({ length: 22 }).map((_, i) => <i key={i} style={{ animationDelay: `${(i % 7) * .35}s`, ["--i" as string]: i }} />)}</div>;
}
function Garlands() {
  const lens = [90, 150, 110, 190, 130, 170, 100, 160, 120];
  return <div className="garlands" aria-hidden="true">{lens.map((l, i) => (
    <div key={i} className="strand" style={{ left: `${6 + i * 11.2}%`, height: l, animationDelay: `${i * .4}s` }}>
      {Array.from({ length: Math.round(l / 28) }).map((_, k) => <b key={k} className={"fl f" + ((i + k) % 3)} />)}
    </div>))}</div>;
}

export default function App() {
  const [startSignal, setStartSignal] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  useReveal();

  useLayoutEffect(() => {
    if (reduce()) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero .names > *", { y: 40, opacity: 0, duration: 1.1, stagger: .18, ease: "power3.out", delay: .2 });
      gsap.from(".hero-couple", { scale: .6, opacity: 0, rotate: -6, duration: 1.2, ease: "back.out(1.6)", delay: .5 });
      gsap.from(".hero .orbit", { scale: 0, opacity: 0, duration: .8, stagger: .12, ease: "back.out(2)", delay: 1 });

      // Story: groom slides in first, then (after a few seconds) bride from the other side
      const tl = gsap.timeline({ scrollTrigger: { trigger: ".story", start: "top 62%", once: true } });
      gsap.set([".groom .person", ".groom .bio > *", ".groom .chip", ".bride .person", ".bride .bio > *", ".bride .chip"], { opacity: 0 });
      tl.fromTo(".groom .person", { x: "-90vw", rotate: -18, opacity: 1 }, { x: 0, rotate: 0, duration: 1.4, ease: "elastic.out(1,.6)" })
        .to(".groom .bio > *", { opacity: 1, y: 0, duration: .7, stagger: .18, ease: "power2.out" }, "-=.7")
        .fromTo(".groom .chip", { scale: 0, opacity: 0, rotate: -40 }, { scale: 1, opacity: 1, rotate: 0, stagger: .15, duration: .7, ease: "back.out(2.4)" }, "-=.4")
        .fromTo(".bride .person", { x: "90vw", rotate: 18, opacity: 1 }, { x: 0, rotate: 0, duration: 1.4, ease: "elastic.out(1,.6)" }, "+=1.2")
        .to(".bride .bio > *", { opacity: 1, y: 0, duration: .7, stagger: .18, ease: "power2.out" }, "-=.7")
        .fromTo(".bride .chip", { scale: 0, opacity: 0, rotate: 40 }, { scale: 1, opacity: 1, rotate: 0, stagger: .15, duration: .7, ease: "back.out(2.4)" }, "-=.4")
        .from(".meet-heart", { scale: 0, rotate: -30, duration: .9, ease: "elastic.out(1,.4)" })
        .fromTo(".burst", { scale: 0, x: 0, y: 0, opacity: 1 }, { scale: () => gsap.utils.random(.6, 1.4), x: () => gsap.utils.random(-120, 120), y: () => gsap.utils.random(-110, 90), opacity: 0, duration: 1.6, stagger: .05, ease: "power2.out" }, "-=.5");
      gsap.to(".meet-heart", { scale: 1.12, repeat: -1, yoyo: true, duration: .9, ease: "sine.inOut", delay: 6 });
      gsap.to(".parallax-a", { yPercent: -18, scrollTrigger: { trigger: ".worlds", scrub: true } });
      gsap.to(".parallax-b", { yPercent: 14, scrollTrigger: { trigger: ".worlds", scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (reduce()) return;
    const pop = (e: PointerEvent) => {
      for (let i = 0; i < 6; i++) {
        const h = document.createElement("span"); h.className = "pop"; h.textContent = "♥"; h.style.left = e.clientX + "px"; h.style.top = e.clientY + "px";
        document.body.appendChild(h);
        gsap.to(h, { x: gsap.utils.random(-60, 60), y: gsap.utils.random(-110, -40), rotate: gsap.utils.random(-40, 40), opacity: 0, scale: gsap.utils.random(.8, 1.6), duration: 1.1, ease: "power2.out", onComplete: () => h.remove() });
      }
    };
    window.addEventListener("pointerdown", pop); return () => window.removeEventListener("pointerdown", pop);
  }, []);

  const openInvite = () => {
    setStartSignal((n) => n + 1);
    document.getElementById("story")?.scrollIntoView({ behavior: reduce() ? "auto" : "smooth" });
  };

  return (
    <div ref={root} className="app">
      <Music startSignal={startSignal} />

      {/* ============ HERO ============ */}
      <header className="hero" id="top">
        <div className="sky" /><div className="sun" />
        <div className="vines" aria-hidden="true"><span /><span /><span /></div>
        <Garlands /><Lights />
        <div className="petals" aria-hidden="true">{Array.from({ length: 16 }).map((_, i) => <i key={i} style={{ left: `${(i * 6.4) % 100}%`, animationDelay: `${(i * 0.9) % 9}s`, animationDuration: `${8 + (i % 5)}s` }} />)}</div>
        <div className="hero-inner">
          <p className="together">Together with our families</p>
          <h1 className="names"><span className="script">Nishant</span><span className="amp">&amp;</span><span className="script">Purwa</span></h1>
          <div className="hero-stage">
            <Stk n="x-couple-banner" cls="hero-couple" alt="Caricature of Nishant and Purwa" />
            <Stk n="x-champagne" cls="orbit o1" /><Stk n="x-passports" cls="orbit o2" /><Stk n="x-scooter" cls="orbit o3" /><Stk n="x-rings" cls="orbit o4" />
            <Heart className="orbit h1" fill="currentColor" /><Heart className="orbit h2" fill="currentColor" /><Heart className="orbit h3" fill="currentColor" />
          </div>
          <p className="tag">Two worlds, one beautiful story. Join us as we begin our forever.</p>
          <button className="btn open" onClick={openInvite}><Sparkles size={18} /> Open Our Invitation</button>
        </div>
      </header>

      {/* ============ STORY ============ */}
      <section className="story paper" id="story">
        <h2 className="h-script reveal">Meet the couple</h2>
        <p className="sub reveal">Indian roots, now living abroad</p>
        <div className="people">
          <article className="groom">
            <div className="person-wrap"><Stk n="y-groom-ireland" cls="person" alt="Caricature of Nishant, from Ireland" />
              <Stk n="n-techie" cls="chip c1" /><Stk n="n-foodie" cls="chip c2" /><Stk n="n-cricket" cls="chip c3" /></div>
            <div className="bio"><small>The Groom · From Ireland</small><h3>Nishant Thool</h3>
              <ul><li>Techie</li><li>Foodie</li><li>Traveller</li><li>Movies</li><li>Cricket</li></ul></div>
          </article>
          <div className="meet" aria-hidden="true">
            <Stk n="n-flag-heart" cls="meet-heart" />
            {Array.from({ length: 10 }).map((_, i) => <Heart key={i} className="burst" fill="currentColor" />)}
          </div>
          <article className="bride">
            <div className="person-wrap"><Stk n="y-bride-uk" cls="person" alt="Caricature of Purwa, from the United Kingdom" />
              <Stk n="x-bride-toBe" cls="chip c1" /><Stk n="x-bride-dreamy" cls="chip c2" /><Stk n="x-book-code" cls="chip c3" /></div>
            <div className="bio"><small>The Bride · From United Kingdom</small><h3>Purwa Manhar</h3>
              <ul><li>Coffee</li><li>Explorer</li><li>Medico</li><li>Culture &amp; Art</li><li>Books</li></ul></div>
          </article>
        </div>
      </section>

      {/* ============ TWO WORLDS ============ */}
      <section className="worlds">
        <h2 className="h-script reveal">Two worlds, one story</h2>
        
        <RouteMap />
      </section>

      {/* ============ DATE ============ */}
      <section className="date paper">
        <h2 className="h-script reveal">Save the date</h2>
       
        <Scratch />
      </section>

      {/* ============ SCHEDULE ============ */}
      <section className="schedule" id="events">
        <h2 className="h-script reveal">Schedule of events</h2>
        <div className="sched-card reveal">
          <div className="torn" aria-hidden="true" />
          {[["24 December 2026", EVENTS.slice(0, 2)], ["25 December 2026", EVENTS.slice(2, 3)], ["26 December 2026", EVENTS.slice(3)]].map(([d, list]) => (
            <div key={d as string} className="day">
              <h3>{d as string}</h3>
              <ol className="timeline">
                {(list as typeof EVENTS).map((e) => (
                  <li key={e.key}><time>{e.time}</time><span className="dot" aria-hidden="true" />
                    <div><b>{e.name}</b><small>{e.tag}</small></div></li>))}
              </ol>
            </div>))}
        </div>

        <div className="cards">
          {EVENTS.map((e, i) => (
            <article key={e.key} className={`event e-${e.key} reveal`} style={{ transitionDelay: `${(i % 2) * .12}s` }}>
              <div className="deco" aria-hidden="true"><i /><i /><i /><i /><i /></div>
              <Stk n={e.sticker} cls="event-stk" alt={`Nishant and Purwa dressed for the ${e.name}`} />
              <h3 className="sr-only">{e.name}</h3>
              <ul>
                <li><CalendarDays size={17} /> {e.day}</li>
                <li><Clock size={17} /> {e.time}</li>
                <li><Shirt size={17} /> Dress code: {e.dress}</li>
              </ul>
              <p className="tagline"><Sparkles size={16} /> {e.tag}</p>
            </article>))}
        </div>
      </section>

      {/* ============ FAMILIES ============ */}
      <section className="families paper">
        <h2 className="h-script reveal">With our families</h2>
        <div className="fam-grid">
          {Object.values(FAMILIES).map((f, i) => (
            <article key={f.title} className={"fam reveal " + (i ? "right" : "left")}>
              <small>{f.title}</small><h3>{f.person}</h3>
              <p>{i ? "Daughter of" : "Son of"}</p>
              <b>{f.father}</b><span className="and">&amp;</span><b>{f.mother}</b>
            </article>))}
        </div>
      </section>

      {/* ============ VENUE ============ */}
      <section className="venue">
        <h2 className="h-script reveal">Zootopia...</h2>
        <div className="venue-grid">
          <div className="venue-text reveal">
            <h3>{VENUE_NAME}</h3><p className="where"><MapPin size={16} /> {VENUE_PLACE}</p>
            <p>All celebrations take place here. Tap Get Directions to open the exact location in Google Maps.</p>
            <a className="btn" href={DIRECTIONS_URL} target="_blank" rel="noreferrer"><Navigation size={18} /> Get Directions</a>
          </div>
          <div className="map reveal">
            {MAP_EMBED_SRC ? <iframe title={`Map of ${VENUE_NAME}`} src={MAP_EMBED_SRC} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              : <a className="map-fallback" href={DIRECTIONS_URL} target="_blank" rel="noreferrer" aria-label="Open the venue in Google Maps"><MapPin size={46} /><b>Open venue in Google Maps</b><small>Tap to see the exact location</small></a>}
          </div>
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section className="gal paper">
        <h2 className="h-script reveal">Our moments</h2>
        <p className="sub reveal">Swipe or scroll sideways</p>
        <Gallery />
      </section>

      {/* ============ CLOSING ============ */}
      <footer className="closing">
        <div className="sky" /><div className="sun" /><div className="rows" aria-hidden="true" />
        <Garlands /><Lights />
        <div className="close-inner">
          <Stk n="x-sunset" cls="close-stk reveal" alt="Nishant and Purwa watching the sunset over the vineyard" />
          <p className="gratitude reveal">With love and gratitude</p>
          <h2 className="script big reveal">Nishant &amp; Purwa</h2>
          <p className="dates reveal">24–26 December 2026</p>
          <button className="btn" onClick={() => window.scrollTo({ top: 0, behavior: reduce() ? "auto" : "smooth" })}><ArrowUp size={18} /> Back to top</button>
        </div>
        {Array.from({ length: 12 }).map((_, i) => <Heart key={i} className="rise" fill="currentColor" style={{ left: `${8 + i * 7.5}%`, animationDelay: `${i * .7}s` }} aria-hidden="true" />)}
      </footer>
    </div>
  );
}
