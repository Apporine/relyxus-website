import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createCoreRenderer, type CoreTint } from "./coreRenderer";
import { createRadarRenderer, type RadarState } from "./radar";
import { useLessMotion } from "@/lib/motion";

/**
 * When the motion designer delivers the rendered loop (1280×720 VP9 WebM,
 * H.264 MP4 fallback and a poster), put the files in client/public/media and
 * set these paths. Until then the core is drawn live on a canvas, from the
 * same storyboard, as a seamless 20 second loop.
 */
export const signalCoreMedia = {
  webm: "",
  mp4: "",
  poster: "",
};

const FPS = 30;
/** The still frame shown with reduced motion: just after the first pulse. */
const POSTER_SECONDS = 4.25;

export type SignalCoreHandle = {
  kick: () => void;
  radar: RadarState;
};

/**
 * The signal core and, optionally, its radar layer. Both canvases share one
 * ticker capped at 30 fps, which stops when the core is off screen, the tab
 * is hidden or the visitor prefers less motion.
 */
export const SignalCore = forwardRef<
  SignalCoreHandle,
  {
    tint?: CoreTint;
    radar?: boolean;
    className?: string;
    /** Start drawing immediately rather than when scrolled into view. */
    eager?: boolean;
  }
>(function SignalCore(
  { tint = "signal", radar = false, className = "", eager = false },
  ref
) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLCanvasElement>(null);
  const radarRef = useRef<HTMLCanvasElement>(null);
  const handle = useRef<SignalCoreHandle>({
    kick: () => {},
    radar: { scale: 1, x: 0, y: 0, intro: 1 },
  });
  const less = useLessMotion();
  const useVideo =
    Boolean(signalCoreMedia.webm || signalCoreMedia.mp4) && !less;
  const [videoReady, setVideoReady] = useState(false);

  useImperativeHandle(ref, () => handle.current, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const coreCanvas = coreRef.current;
    if (!wrap) return;
    const core = coreCanvas ? createCoreRenderer(coreCanvas, { tint }) : null;
    const rings =
      radar && radarRef.current ? createRadarRenderer(radarRef.current) : null;
    handle.current.kick = () => core?.kick();

    let frame = 0;
    let last = 0;
    let visible = eager;
    const start = performance.now();
    const paint = (seconds: number) => {
      core?.draw(seconds);
      rings?.draw(seconds, handle.current.radar);
    };

    // Resizing a canvas clears it, so the still frame has to be redrawn.
    const resize = () => {
      core?.resize();
      rings?.resize();
      if (less) paint(POSTER_SECONDS);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(wrap);

    if (less) return () => observer.disconnect();

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (!visible || document.hidden) return;
      if (now - last < 1000 / FPS - 1) return;
      last = now;
      paint((now - start) / 1000);
    };
    paint(0);
    frame = requestAnimationFrame(tick);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(wrap);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      io.disconnect();
    };
  }, [tint, radar, less, eager, useVideo]);

  // Lazy load the video after first paint, as the delivery spec asks.
  useEffect(() => {
    if (!useVideo) return;
    const id = window.setTimeout(() => setVideoReady(true), 300);
    return () => window.clearTimeout(id);
  }, [useVideo]);

  return (
    <div className={`rx-core ${className}`} ref={wrapRef} aria-hidden="true">
      {radar && <canvas className="rx-core-radar" ref={radarRef} />}
      {useVideo ? (
        <video
          className="rx-core-video"
          muted
          loop
          playsInline
          autoPlay
          poster={signalCoreMedia.poster || undefined}
          preload="none"
        >
          {videoReady && signalCoreMedia.webm && (
            <source src={signalCoreMedia.webm} type="video/webm" />
          )}
          {videoReady && signalCoreMedia.mp4 && (
            <source src={signalCoreMedia.mp4} type="video/mp4" />
          )}
        </video>
      ) : (
        <canvas className="rx-core-canvas" ref={coreRef} />
      )}
    </div>
  );
});
