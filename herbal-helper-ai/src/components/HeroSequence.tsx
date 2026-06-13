/**
 * HeroSequence.tsx
 * Scroll-driven canvas image-sequence animation (Apple / Adaline style).
 * 280 JPEG frames fetched from adaline.ai's CDN, driven by GSAP ScrollTrigger.
 */
import { useRef, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Camera, Search, ChevronDown } from "lucide-react";

/* ── Constants ─────────────────────────────────────────────────────────────── */
const TOTAL_FRAMES = 280;
const BASE_URL =
  "https://www.adaline.ai/sequence/16x9_281/high/graded_4K_100_gm_85_1440_3-";
const FALLBACK_FRAME = 140; // shown on mobile / low-end

/** Generate all 280 frame URLs (001 → 280, zero-padded to 3 digits) */
function buildUrls(): string[] {
  const urls: string[] = [];
  for (let i = 1; i <= TOTAL_FRAMES; i++) {
    urls.push(`${BASE_URL}${String(i).padStart(3, "0")}.jpg`);
  }
  return urls;
}
const FRAME_URLS = buildUrls();

/* ── Cover-fit draw helper ──────────────────────────────────────────────────── */
function coverFit(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cssW: number,
  cssH: number,
) {
  const imgAR    = img.naturalWidth / img.naturalHeight;
  const canvasAR = cssW / cssH;
  let dw: number, dh: number, dx: number, dy: number;
  if (imgAR > canvasAR) {
    dh = cssH; dw = dh * imgAR;
    dx = (cssW - dw) / 2; dy = 0;
  } else {
    dw = cssW; dh = dw / imgAR;
    dx = 0; dy = (cssH - dh) / 2;
  }
  ctx.drawImage(img, dx, dy, dw, dh);
}

/* ── Component ──────────────────────────────────────────────────────────────── */
export default function HeroSequence() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const frames        = useRef<(HTMLImageElement | null)[]>(Array(TOTAL_FRAMES).fill(null));
  const currentFrame  = useRef(0);
  const [loaded, setLoaded]       = useState(false);
  const [loadPct, setLoadPct]     = useState(0);
  const [isMobile, setIsMobile]   = useState(false);

  /* ── Draw a single frame onto the canvas ──────────────────────────────────── */
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = frames.current[Math.max(0, Math.min(index, TOTAL_FRAMES - 1))];
    if (!img || !img.complete || !img.naturalWidth) return;

    const dpr  = window.devicePixelRatio || 1;
    const cssW = canvas.clientWidth;
    const cssH = canvas.clientHeight;

    /* Resize buffer only when needed */
    if (canvas.width !== Math.round(cssW * dpr) || canvas.height !== Math.round(cssH * dpr)) {
      canvas.width  = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);
    coverFit(ctx, img, cssW, cssH);
  }, []);

  /* ── Detect mobile / low-end ──────────────────────────────────────────────── */
  useEffect(() => {
    const mobile =
      window.matchMedia("(max-width: 768px)").matches ||
      (typeof navigator !== "undefined" && navigator.hardwareConcurrency <= 2);
    setIsMobile(mobile);
  }, []);

  /* ── Preload all frames ───────────────────────────────────────────────────── */
  useEffect(() => {
    if (isMobile) {
      /* Mobile: load only the fallback frame */
      const img = new Image();
      img.onload = () => {
        frames.current[FALLBACK_FRAME] = img;
        drawFrame(FALLBACK_FRAME);
        setLoaded(true);
        setLoadPct(100);
      };
      img.onerror = () => { setLoaded(true); setLoadPct(100); };
      img.src = FRAME_URLS[FALLBACK_FRAME];
      return;
    }

    let done = 0;
    const total = TOTAL_FRAMES;

    const promises = FRAME_URLS.map((url, i) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          frames.current[i] = img;
          done++;
          setLoadPct(Math.round((done / total) * 100));
          /* Draw frame 0 as soon as it's ready */
          if (i === 0) drawFrame(0);
          resolve();
        };
        img.onerror = () => { done++; setLoadPct(Math.round((done / total) * 100)); resolve(); };
        img.src = url;
      })
    );

    Promise.all(promises).then(() => {
      drawFrame(currentFrame.current);
      setLoaded(true);
    });
  }, [isMobile, drawFrame]);

  /* ── GSAP ScrollTrigger (desktop only) ───────────────────────────────────── */
  useEffect(() => {
    if (isMobile || !loaded) return;

    let gsapInstance: typeof import("gsap").gsap;
    let ST: typeof import("gsap/ScrollTrigger").ScrollTrigger;
    let tween: ReturnType<typeof import("gsap").gsap.to> | undefined;

    (async () => {
      const { gsap }          = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      gsapInstance = gsap;
      ST = ScrollTrigger;

      const obj = { frame: 0 };

      tween = gsap.to(obj, {
        frame: TOTAL_FRAMES - 1,
        ease:  "none",
        onUpdate() {
          const i = Math.round(obj.frame);
          if (i !== currentFrame.current) {
            currentFrame.current = i;
            drawFrame(i);
          }
        },
        scrollTrigger: {
          trigger:             containerRef.current,
          start:               "top top",
          end:                 "bottom bottom",
          scrub:               1,
          invalidateOnRefresh: true,
        },
      });
    })();

    return () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, [isMobile, loaded, drawFrame]);

  /* ── Resize handler ───────────────────────────────────────────────────────── */
  useEffect(() => {
    const onResize = () => drawFrame(currentFrame.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [drawFrame]);

  /* ── Render ───────────────────────────────────────────────────────────────── */
  return (
    /* 300vh tall scroll container — sticky canvas fills the first vh */
    <div
      ref={containerRef}
      style={{ position: "relative", height: isMobile ? "100vh" : "300vh" }}
    >
      {/* ── Sticky viewport wrapper ── */}
      <div
        style={{
          position:   "sticky",
          top:        0,
          height:     "100vh",
          width:      "100%",
          overflow:   "hidden",
          background: "#0a0a0a",
        }}
      >
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position:   "absolute",
            inset:      0,
            width:      "100%",
            height:     "100%",
            display:    "block",
            background: "#0a0a0a",
          }}
        />

        {/* Loading bar */}
        {!loaded && (
          <div
            style={{
              position:  "absolute",
              bottom:    0,
              left:      0,
              height:    "2px",
              width:     `${loadPct}%`,
              backgroundColor: "#fbfdf6",
              transition: "width 0.1s linear",
              zIndex:    20,
            }}
          />
        )}

        {/* ── Hero overlay text ── */}
        <div
          style={{
            position:       "absolute",
            inset:          0,
            display:        "flex",
            flexDirection:  "column",
            alignItems:     "center",
            justifyContent: "center",
            zIndex:         10,
            padding:        "0 24px",
            opacity:        loaded ? 1 : 0,
            transition:     "opacity 0.8s ease 0.2s",
          }}
        >
          {/* Micro-label */}
          <p
            style={{
              fontFamily:     "var(--font-fragment-mono)",
              fontSize:       "var(--text-caption)",
              lineHeight:     "var(--leading-caption)",
              letterSpacing:  "var(--tracking-caption)",
              textTransform:  "uppercase",
              color:          "rgba(10,29,8,0.6)",
              marginBottom:   "28px",
              textAlign:      "center",
            }}
          >
            PlantSage AI · SIH 1555 · Ministry of AYUSH
          </p>

          {/* Headline */}
          <h1
            style={{
              fontFamily:    "var(--font-akkurat)",
              fontSize:      "clamp(32px, 6.5vw, var(--text-display))",
              fontWeight:    400,
              lineHeight:    "var(--leading-display)",
              letterSpacing: "var(--tracking-display)",
              color:         "var(--color-botanical-ink)",
              textAlign:     "center",
              maxWidth:      "880px",
              marginBottom:  "28px",
            }}
          >
            India&apos;s 8,000 Medicinal Plants,{" "}
            <br />
            <span style={{ color: "var(--color-forest-floor)" }}>At Your Fingertips</span>
          </h1>

          {/* Sub */}
          <p
            style={{
              fontFamily:    "var(--font-akkurat)",
              fontSize:      "clamp(14px, 1.6vw, var(--text-body))",
              lineHeight:    "var(--leading-body)",
              letterSpacing: "var(--tracking-body)",
              color:         "rgba(10,29,8,0.75)",
              textAlign:     "center",
              maxWidth:      "520px",
              marginBottom:  "40px",
            }}
          >
            Identify plants instantly with AI, discover Ayurvedic remedies,
            and grow your personal herbal garden.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", marginBottom: "60px" }}>
            <Link
              to="/identify"
              style={{
                display:         "inline-flex",
                alignItems:      "center",
                gap:             "8px",
                fontFamily:      "var(--font-akkurat)",
                fontSize:        "14px",
                fontWeight:      700,
                letterSpacing:   "-0.04em",
                backgroundColor: "var(--color-warm-loam)",
                color:           "var(--color-cream-paper)",
                borderRadius:    "20px",
                padding:         "12px 28px",
                textDecoration:  "none",
                border:          "none",
                transition:      "background-color 0.15s",
                cursor:          "pointer",
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-forest-floor)")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-warm-loam)")}
            >
              <Camera style={{ width: "15px", height: "15px", flexShrink: 0 }} />
              Identify a Plant
            </Link>
            <Link
              to="/search"
              style={{
                display:        "inline-flex",
                alignItems:     "center",
                gap:            "8px",
                fontFamily:     "var(--font-akkurat)",
                fontSize:       "14px",
                fontWeight:     700,
                letterSpacing:  "-0.04em",
                backgroundColor:"transparent",
                color:          "var(--color-botanical-ink)",
                borderRadius:   "20px",
                padding:        "11px 28px",
                textDecoration: "none",
                border:         "1px solid var(--color-botanical-ink)",
                transition:     "border-color 0.15s, background-color 0.15s",
                cursor:         "pointer",
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = "rgba(10,29,8,0.08)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = "transparent"; }}
            >
              <Search style={{ width: "15px", height: "15px", flexShrink: 0 }} />
              Search by Symptom
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "clamp(24px,5vw,80px)", justifyContent: "center" }}>
            {[
              { val: "8,000+", label: "Plant Species"  },
              { val: "97%",    label: "AI Accuracy"     },
              { val: "500+",   label: "Remedies"        },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily:    "var(--font-akkurat)",
                    fontSize:      "clamp(22px,3.5vw,36px)",
                    fontWeight:    400,
                    letterSpacing: "-0.04em",
                    color:         "var(--color-forest-floor)",
                    lineHeight:    1,
                  }}
                >
                  {s.val}
                </div>
                <p
                  style={{
                    fontFamily:    "var(--font-mono)",
                    fontSize:      "10px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color:         "rgba(10,29,8,0.5)",
                    marginTop:     "5px",
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll nudge — fades out once scrolled */}
        <div
          style={{
            position:   "absolute",
            bottom:     "32px",
            left:       "50%",
            transform:  "translateX(-50%)",
            display:    "flex",
            flexDirection: "column",
            alignItems: "center",
            gap:        "4px",
            color:      "rgba(10,29,8,0.5)",
            zIndex:     10,
            opacity:    loaded ? 1 : 0,
            transition: "opacity 0.6s ease 1s",
            animation:  "heroNudge 1.8s ease-in-out infinite",
          }}
        >
          <span
            style={{
              fontFamily:    "var(--font-mono)",
              fontSize:      "10px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            scroll
          </span>
          <ChevronDown style={{ width: "14px", height: "14px" }} />
        </div>

        {/* Vignette overlay for depth */}
        <div
          aria-hidden
          style={{
            position:   "absolute",
            inset:      0,
            background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(0,0,0,0.35) 100%)",
            pointerEvents: "none",
            zIndex:     5,
          }}
        />
      </div>

      {/* Keyframes injected inline */}
      <style>{`
        @keyframes heroNudge {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(6px); }
        }
      `}</style>
    </div>
  );
}
