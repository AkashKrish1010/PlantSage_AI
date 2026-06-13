import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Camera, Leaf, Shield, BookOpen,
  Brain, Cpu, Database, Globe, Microscope,
  Smartphone, ArrowRight, Sparkles,
  FlaskConical, TreePine, Zap, ScanLine, Network, BarChart3,
} from "lucide-react";
import { plants } from "@/data/plants";
import HeroSequence from "@/components/HeroSequence";
import SplitText from "./SplitText";
import CircularGallery from "./CircularGallery";

const featured = plants.slice(0, 4);

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

/* ── Counter ──────────────────────────────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let n = 0;
    const step = Math.ceil(to / 60);
    const t = setInterval(() => {
      n += step;
      if (n >= to) { setCount(to); clearInterval(t); }
      else setCount(n);
    }, 18);
    return () => clearInterval(t);
  }, [inView, to]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ── Section Heading ──────────────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mb-4"
      style={{ fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-bark-brown)", opacity: 0.7 }}
    >
      {children}
    </p>
  );
}

/* ── HOW IT WORKS steps ───────────────────────────────────────────── */
const HOW_STEPS = [
  {
    step: "01",
    icon: Camera,
    title: "Capture or Search",
    desc: "Snap a photo with your camera or type a symptom / plant name to begin your Ayurvedic journey.",
    bg: "var(--color-sage-mist)",
    accent: "var(--color-forest-floor)",
    imageUrl: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=600"
  },
  {
    step: "02",
    icon: Brain,
    title: "AI Analysis",
    desc: "Our dual-pipeline engine — Vision Transformer + Gemini 1.5 Pro — cross-validates your image against 8,000+ species.",
    bg: "var(--color-lichen)",
    accent: "var(--color-warm-loam)",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600"
  },
  {
    step: "03",
    icon: FlaskConical,
    title: "Ayurvedic Insight",
    desc: "Doctor-verified remedies, dosage, contraindications and Panchakarma protocols surfaced instantly.",
    bg: "var(--color-moss-veil)",
    accent: "var(--color-botanical-ink)",
    imageUrl: "/ayurvedic-insight.jpeg"
  },
  {
    step: "04",
    icon: TreePine,
    title: "Grow Your Garden",
    desc: "Add plants to your personal herbal garden, track growth, and get geo-located sourcing tips.",
    bg: "var(--color-eucalyptus)",
    accent: "var(--color-bark-brown)",
    imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=600"
  },
];

/* ── TECH CARDS ───────────────────────────────────────────────────── */
const TECH = [
  { name: "Gemini 1.5 Pro",     role: "Multimodal LLM",        icon: Sparkles  },
  { name: "Vision Transformer", role: "Plant Classification",   icon: ScanLine  },
  { name: "FastAPI",            role: "Backend API",            icon: Zap       },
  { name: "React + Vite",       role: "Frontend",               icon: Cpu       },
  { name: "Supabase",           role: "Database & Auth",        icon: Database  },
  { name: "Ayurveda Corpus",    role: "Knowledge Base",         icon: BookOpen  },
  { name: "PostGIS",            role: "Geolocation",            icon: Globe     },
  { name: "Python ML",          role: "Model Training",         icon: Microscope},
];

/* ── ARCH NODES ───────────────────────────────────────────────────── */
const ARCH = [
  { label: "Mobile / Web",        icon: Smartphone },
  { label: "Gemini 1.5 Pro",      icon: Sparkles   },
  { label: "Vision Transformer",  icon: ScanLine   },
  { label: "Ayurveda DB",         icon: Database   },
  { label: "FastAPI Backend",     icon: Zap        },
  { label: "AYUSH Knowledge Graph", icon: Network  },
];

/* ── USER FLOW ────────────────────────────────────────────────────── */
const FLOW = [
  { label: "Open App",     icon: Smartphone   },
  { label: "Snap / Search",icon: Camera       },
  { label: "AI Scans",     icon: Brain        },
  { label: "Get Insight",  icon: FlaskConical },
  { label: "Save Garden",  icon: TreePine     },
  { label: "Track Growth", icon: BarChart3    },
];

/* ══════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const pinRef  = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  /* pinned how-it-works — driven by native scroll via IntersectionObserver */
  useEffect(() => {
    const container = pinRef.current;
    if (!container) return;
    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const totalH = container.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const pct = Math.min(1, scrolled / totalH);
      setActiveStep(Math.min(HOW_STEPS.length - 1, Math.floor(pct * HOW_STEPS.length)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ color: "var(--color-botanical-ink)" }}>

      {/* ══ HERO — GSAP canvas sequence ════════════════════════════════ */}
      <HeroSequence />

      <div style={{ backgroundColor: "var(--color-cream-paper)" }}>

      {/* ══ HOW IT WORKS — PINNED SCROLL ═══════════════════════════════ */}
      <section id="how-it-works-section" ref={pinRef} style={{ height: `${HOW_STEPS.length * 100}vh` }} className="relative">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden" style={{ backgroundColor: "var(--color-immersive-black)" }}>
          <div className="max-w-[1200px] mx-auto px-8 w-full grid md:grid-cols-2 gap-16 items-center">

            {/* Left text */}
            <div>
              <p
                className="mb-4"
                style={{ fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-moss-veil)", opacity: 0.8 }}
              >
                How it works
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4 }}
                >
                  <div
                    style={{ fontFamily: "var(--font-akkurat)", fontSize: "120px", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.04em", color: "rgba(251,253,246,0.25)" }}
                    className="leading-none mb-2 select-none"
                  >
                    {HOW_STEPS[activeStep].step}
                  </div>
                  <h2 style={{ fontFamily: "var(--font-akkurat)", fontSize: "clamp(32px,4vw,47px)", fontWeight: 400, letterSpacing: "-1.88px", lineHeight: 0.98, color: "var(--color-cream-paper)" }} className="mb-5">
                    {HOW_STEPS[activeStep].title}
                  </h2>
                  <p style={{ fontFamily: "var(--font-akkurat)", fontSize: "18px", lineHeight: 1.67, letterSpacing: "-0.04em", color: "rgba(251,253,246,0.6)" }} className="max-w-md">
                    {HOW_STEPS[activeStep].desc}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Step dots */}
              <div className="flex gap-2 mt-10">
                {HOW_STEPS.map((_, i) => (
                  <div
                    key={i}
                    className="h-px transition-all duration-500 rounded-full"
                    style={{ width: i === activeStep ? "40px" : "16px", backgroundColor: i === activeStep ? "var(--color-moss-veil)" : "rgba(251,253,246,0.2)" }}
                  />
                ))}
              </div>
            </div>

            {/* Right cinematic image panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45 }}
                className="relative aspect-square w-full max-w-sm mx-auto overflow-hidden border border-eucalyptus/20"
                style={{ borderRadius: "8px" }}
              >
                <img
                  src={HOW_STEPS[activeStep].imageUrl}
                  alt={HOW_STEPS[activeStep].title}
                  className="w-full h-full object-cover"
                />
                {/* Dark vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Floating step description tag */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded border border-white/10 backdrop-blur-md bg-black/40">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold tracking-tight text-xs md:text-sm" style={{ fontFamily: "var(--font-akkurat)" }}>
                      {HOW_STEPS[activeStep].title}
                    </span>
                    <span className="text-white/60 text-[10px] font-mono tracking-wider uppercase">
                      Step {HOW_STEPS[activeStep].step}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ══ ARCHITECTURE ═══════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "var(--color-immersive-ivory)", borderTop: "1px solid var(--color-lichen)" }} className="py-24">
        <div className="max-w-[1200px] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <SectionLabel>System Design</SectionLabel>
            <h2 style={{ fontFamily: "var(--font-akkurat)", fontSize: "clamp(32px,4vw,47px)", fontWeight: 400, letterSpacing: "-1.88px", lineHeight: 0.98, color: "var(--color-botanical-ink)" }}>
              The Architecture
            </h2>
            <p style={{ fontFamily: "var(--font-akkurat)", fontSize: "18px", lineHeight: 1.67, letterSpacing: "-0.04em", color: "var(--color-botanical-ink)", opacity: 0.55 }} className="mt-4 max-w-xl">
              A dual-pipeline AI system — Vision Transformer meets language models — delivering unparalleled identification accuracy.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {ARCH.map((node, i) => {
              const Icon = node.icon;
              return (
                <motion.div
                  key={node.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -2 }}
                  style={{ backgroundColor: "var(--color-cream-paper)", border: "1px solid var(--color-lichen)", borderRadius: "8px", padding: "24px" }}
                >
                  <Icon className="h-6 w-6 mb-3" style={{ color: "var(--color-forest-floor)" }} />
                  <p style={{ fontFamily: "var(--font-akkurat)", fontSize: "14px", fontWeight: 700, letterSpacing: "-0.04em", color: "var(--color-botanical-ink)" }}>
                    {node.label}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Flow callout */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-6 flex items-center gap-4"
            style={{ backgroundColor: "var(--color-cream-paper)", border: "1px solid var(--color-lichen)", borderRadius: "8px", padding: "16px 24px" }}
          >
            <Network className="h-5 w-5 flex-shrink-0" style={{ color: "var(--color-forest-floor)" }} />
            <div className="flex-1">
              <p style={{ fontFamily: "var(--font-akkurat)", fontSize: "14px", fontWeight: 700, letterSpacing: "-0.04em", color: "var(--color-botanical-ink)" }}>Real-time bidirectional data flow</p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.02em", color: "var(--color-bark-brown)", opacity: 0.6, marginTop: "2px" }}>
                Camera → AI Pipeline → Ayurveda DB → Response in &lt;2s
              </p>
            </div>
            <ArrowRight className="h-4 w-4 flex-shrink-0" style={{ color: "var(--color-eucalyptus)" }} />
          </motion.div>
        </div>
      </section>

      {/* ══ USER FLOW ══════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "var(--color-immersive-green)", borderBottom: "1px solid rgba(251,253,246,0.15)" }} className="py-24">
        <div className="max-w-[1200px] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p
              className="mb-4"
              style={{ fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-moss-veil)", opacity: 0.8 }}
            >
              User Journey
            </p>
            <h2 style={{ fontFamily: "var(--font-akkurat)", fontSize: "clamp(32px,4vw,47px)", fontWeight: 400, letterSpacing: "-1.88px", lineHeight: 0.98, color: "var(--color-cream-paper)" }}>
              Your Flow
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            <div className="hidden md:block absolute top-10 left-0 right-0 h-px" style={{ backgroundColor: "rgba(251,253,246,0.15)" }} />
            <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
              {FLOW.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.09 }}
                    className="flex flex-col items-center gap-3 text-center"
                  >
                    <motion.div
                      whileHover={{ y: -2 }}
                      style={{ width: "80px", height: "80px", border: "1px solid rgba(251,253,246,0.15)", borderRadius: "8px", backgroundColor: "rgba(251,253,246,0.04)", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <Icon className="h-7 w-7" style={{ color: "var(--color-moss-veil)" }} />
                    </motion.div>
                    <p style={{ fontFamily: "var(--font-akkurat)", fontSize: "14px", fontWeight: 700, letterSpacing: "-0.04em", color: "var(--color-cream-paper)" }}>
                      {step.label}
                    </p>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.06em", color: "var(--color-moss-veil)", opacity: 0.6 }}>
                      0{i + 1}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══ TECH STACK ═════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "var(--color-immersive-ivory)", borderBottom: "1px solid var(--color-lichen)" }} className="py-24">
        <div className="max-w-[1200px] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <SectionLabel>Powering the experience</SectionLabel>
            <h2 style={{ fontFamily: "var(--font-akkurat)", fontSize: "clamp(32px,4vw,47px)", fontWeight: 400, letterSpacing: "-1.88px", lineHeight: 0.98, color: "var(--color-botanical-ink)" }}>
              Built With
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TECH.map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -2 }}
                  style={{ backgroundColor: "var(--color-cream-paper)", border: "1px solid var(--color-lichen)", borderRadius: "8px", padding: "20px 24px" }}
                >
                  <Icon className="h-5 w-5 mb-3" style={{ color: "var(--color-forest-floor)" }} />
                  <p style={{ fontFamily: "var(--font-akkurat)", fontSize: "14px", fontWeight: 700, letterSpacing: "-0.04em", color: "var(--color-botanical-ink)" }}>{t.name}</p>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.02em", color: "var(--color-bark-brown)", opacity: 0.6, marginTop: "3px" }}>{t.role}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ FEATURED PLANTS ════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "var(--color-cream-paper)" }} className="py-24">
        <div className="max-w-[1200px] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <SectionLabel>Encyclopedia</SectionLabel>
              <h2 style={{ fontFamily: "var(--font-akkurat)", fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 400, letterSpacing: "-0.04em", lineHeight: 1, color: "var(--color-botanical-ink)" }}>
                Featured Plants
              </h2>
            </div>
            <Link
              to="/encyclopedia"
              className="flex items-center gap-1.5 group"
              style={{ fontFamily: "var(--font-akkurat)", fontSize: "13px", fontWeight: 700, letterSpacing: "-0.04em", color: "var(--color-warm-loam)" }}
            >
              View All
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          <div style={{ height: '600px', position: 'relative' }}>
            <CircularGallery
              bend={1}
              textColor="#ffffff"
              borderRadius={0.05}
              scrollEase={0.05}
              fontUrl="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap"
              font="bold 30px Orbitron"
              scrollSpeed={2}
              items={plants.map((plant) => ({
                image: plant.imageUrl,
                text: plant.name,
              }))}
            />
          </div>
        </div>
      </section>

      {/* ══ TRUSTED BY MARQUEE ════════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: "var(--color-immersive-green)",
          borderTop: "1px solid rgba(251,253,246,0.15)",
          borderBottom: "1px solid rgba(251,253,246,0.15)",
        }}
        className="py-16 overflow-hidden select-none"
      >
        <div className="w-full">
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--color-moss-veil)",
              opacity: 0.8,
              textAlign: "center",
            }}
            className="mb-8"
          >
            Endorsed & Trusted By
          </p>
          <div className="relative w-full overflow-hidden flex items-center h-20">
            {/* Soft fade gradients on edges */}
            <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#0c1f0c] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#0c1f0c] to-transparent z-10 pointer-events-none" />

            <div className="adaline-marquee-track">
              {[
                { icon: Shield,        label: "Ministry of AYUSH" },
                { icon: BookOpen,      label: "National Institute of Ayurveda" },
                { icon: Leaf,          label: "Botanical Survey of India" },
                { icon: Globe,         label: "WHO Traditional Medicine Centre" },
                { icon: Microscope,    label: "CCRAS Research Council" },
                { icon: Sparkles,      label: "CSIR Ayurveda Science" },
                { icon: TreePine,      label: "National Medicinal Plants Board" },
                { icon: Network,       label: "AYUSH Knowledge Graph" },
                { icon: Database,      label: "Indian Pharmacopoeia" },
              ].concat([
                { icon: Shield,        label: "Ministry of AYUSH" },
                { icon: BookOpen,      label: "National Institute of Ayurveda" },
                { icon: Leaf,          label: "Botanical Survey of India" },
                { icon: Globe,         label: "WHO Traditional Medicine Centre" },
                { icon: Microscope,    label: "CCRAS Research Council" },
                { icon: Sparkles,      label: "CSIR Ayurveda Science" },
                { icon: TreePine,      label: "National Medicinal Plants Board" },
                { icon: Network,       label: "AYUSH Knowledge Graph" },
                { icon: Database,      label: "Indian Pharmacopoeia" },
              ], [
                { icon: Shield,        label: "Ministry of AYUSH" },
                { icon: BookOpen,      label: "National Institute of Ayurveda" },
                { icon: Leaf,          label: "Botanical Survey of India" },
                { icon: Globe,         label: "WHO Traditional Medicine Centre" },
                { icon: Microscope,    label: "CCRAS Research Council" },
                { icon: Sparkles,      label: "CSIR Ayurveda Science" },
                { icon: TreePine,      label: "National Medicinal Plants Board" },
                { icon: Network,       label: "AYUSH Knowledge Graph" },
                { icon: Database,      label: "Indian Pharmacopoeia" },
              ]).map((b, i) => (
                <div
                  key={`${b.label}-${i}`}
                  className="flex items-center gap-3 shrink-0"
                >
                  <div className="p-2 rounded-full border border-eucalyptus/20 bg-cream-paper/5 flex items-center justify-center">
                    <b.icon className="h-5 w-5" style={{ color: "var(--color-moss-veil)" }} />
                  </div>
                  <span style={{ fontFamily: "var(--font-akkurat)", fontSize: "14px", fontWeight: 700, letterSpacing: "-0.04em", color: "var(--color-cream-paper)" }}>
                    {b.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Marquee CSS injection */}
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.3333%); }
          }
          .adaline-marquee-track {
            display: inline-flex;
            gap: 64px;
            animation: marquee 35s linear infinite;
            padding-left: 32px;
          }
          .adaline-marquee-track:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* ══ CTA BANNER ═════════════════════════════════════════════════ */}
      <section
        id="cta-banner-section"
        style={{
          backgroundColor: "var(--color-immersive-black)",
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "140px",
          paddingBottom: "80px",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Leaf className="h-10 w-10 mx-auto mb-8 animate-float" style={{ color: "var(--color-moss-veil)" }} />
            <SplitText
              text="Start Your Herbal Journey"
              className="mb-6 block"
              delay={50}
              duration={1.25}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
              onLetterAnimationComplete={handleAnimationComplete}
              showCallback
              tag="h2"
              style={{
                fontFamily: "var(--font-akkurat)",
                fontSize: "clamp(32px,5vw,53px)",
                fontWeight: 400,
                letterSpacing: "-2.12px",
                lineHeight: 1,
                color: "var(--color-cream-paper)"
              }}
            />
            <p style={{ fontFamily: "var(--font-akkurat)", fontSize: "18px", lineHeight: 1.67, letterSpacing: "-0.04em", color: "rgba(251,253,246,0.6)" }} className="max-w-md mx-auto mb-10">
              Join thousands discovering India&apos;s botanical heritage through the power of AI.
            </p>
            <Link to="/identify" className="adaline-btn-primary" style={{ fontSize: "15px", padding: "14px 32px" }}>
              <Camera className="h-5 w-5" />
              Identify a Plant Now
            </Link>
          </motion.div>
        </div>
      </section>
      </div>{/* end cream-paper wrapper */}
    </div>
  );
}
