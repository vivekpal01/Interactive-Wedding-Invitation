import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { MUSIC_SRC, YOUTUBE_URL } from "../config";

export default function Music({ startSignal }: { startSignal: number }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);   // autoplay was allowed only silently
  const userMuted = useRef(false);

  const play = () => ref.current?.play().then(() => setPlaying(true)).catch(() => setPlaying(false));

  // Browsers block *audible* autoplay. Strategy: try with sound; if blocked, play silently right away
  // (music is "running") and switch the sound on at the very first tap / key press / scroll-touch.
  useEffect(() => {
    const a = ref.current!;
    a.muted = false;
    a.play().then(() => { setPlaying(true); setNeedsTap(false); }).catch(() => {
      a.muted = true; setMuted(true); setNeedsTap(true);
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    });
    const unlock = () => {
      const el = ref.current!;
      if (!userMuted.current) { el.muted = false; setMuted(false); }
      setNeedsTap(false);
      if (el.paused) el.play().then(() => setPlaying(true)).catch(() => {});
      off();
    };
    const evs = ["pointerup", "touchend", "click", "keydown"];
    const off = () => evs.forEach((e) => window.removeEventListener(e, unlock));
    evs.forEach((e) => window.addEventListener(e, unlock));
    return off;
  }, []);
  useEffect(() => { if (startSignal) { const a = ref.current!; if (!userMuted.current) { a.muted = false; setMuted(false); } setNeedsTap(false); play(); } }, [startSignal]);

  const toggle = () => { const a = ref.current!; if (a.paused) play(); else { a.pause(); setPlaying(false); } };
  const mute = () => { const a = ref.current!; a.muted = !a.muted; userMuted.current = a.muted; setMuted(a.muted); setNeedsTap(false); };

  return (
    <div className="music" role="group" aria-label="Wedding music">
      <audio ref={ref} src={MUSIC_SRC} loop autoPlay playsInline preload="auto" />
      <div className={"vinyl" + (playing ? " spin" : "")} aria-hidden="true"><span /></div>
      <div className="music-text"><b>Our song</b><small>{!playing ? "Tap play" : needsTap ? "Tap for sound" : muted ? "Muted" : "Now playing"}</small></div>
      <button onClick={toggle} aria-label={playing ? "Pause music" : "Play music"}>{playing ? <Pause size={18} /> : <Play size={18} />}</button>
      <button onClick={mute} aria-label={muted ? "Unmute music" : "Mute music"}>{muted ? <VolumeX size={18} /> : <Volume2 size={18} />}</button>
      <a className="yt" href={YOUTUBE_URL} target="_blank" rel="noreferrer">YouTube</a>
    </div>
  );
}
