import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, AlertTriangle, CheckCircle, BookOpen } from "lucide-react";
import { plants } from "@/data/plants";

function Micro({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "var(--color-botanical-ink)", opacity: 0.45 }}>
      {children}
    </span>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontFamily: "var(--font-akkurat)", fontSize: "22px", fontWeight: 400, letterSpacing: "-0.04em", lineHeight: 1.1, color: "var(--color-botanical-ink)" }} className="mb-4">
      {children}
    </h2>
  );
}

export default function PlantDetailPage() {
  const { id } = useParams();
  const plant  = plants.find((p) => p.id === id);

  if (!plant) {
    return (
      <div className="max-w-[1200px] mx-auto px-8 py-24 flex items-center justify-center">
        <p style={{ fontFamily: "var(--font-akkurat)", fontSize: "18px", letterSpacing: "-0.04em", color: "var(--color-botanical-ink)", opacity: 0.4 }}>
          Plant not found
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* ── Hero image ── */}
      <div className="relative max-w-4xl mx-auto" style={{ marginTop: "0" }}>
        <div className="relative overflow-hidden" style={{ height: "280px", borderRadius: "0 0 8px 8px" }}>
          <img
            src={plant.imageUrl}
            alt={plant.name}
            className="h-full w-full object-cover"
          />
          {/* Subtle bottom fade */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(251,253,246,0.7) 0%, transparent 50%)" }} />
          {/* Back button */}
          <Link
            to="/encyclopedia"
            className="absolute top-4 left-4 flex items-center gap-2"
            style={{
              fontFamily: "var(--font-akkurat)",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: "var(--color-botanical-ink)",
              backgroundColor: "rgba(251,253,246,0.85)",
              border: "1px solid var(--color-lichen)",
              borderRadius: "20px",
              padding: "8px 14px",
              backdropFilter: "blur(8px)",
              textDecoration: "none",
            }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Encyclopedia
          </Link>
        </div>
      </div>

      {/* ── Content ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto px-8 pt-10 pb-24"
      >
        {/* Plant header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <Micro>Medicinal plant</Micro>
            <h1 style={{ fontFamily: "var(--font-akkurat)", fontSize: "clamp(28px,4vw,47px)", fontWeight: 400, letterSpacing: "-1.88px", lineHeight: 0.98, color: "var(--color-botanical-ink)" }} className="mt-2 mb-1">
              {plant.name}
            </h1>
            <p style={{ fontFamily: "var(--font-akkurat)", fontSize: "15px", letterSpacing: "-0.04em", color: "var(--color-botanical-ink)", opacity: 0.45 }} className="italic">
              {plant.botanicalName}
            </p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.04em", color: "var(--color-botanical-ink)", opacity: 0.35, marginTop: "4px" }}>
              Family: {plant.family}
            </p>
          </div>
          {plant.verified ? (
            <span className="adaline-tag flex items-center gap-1.5">
              <CheckCircle className="h-3 w-3" /> Verified
            </span>
          ) : (
            <span className="adaline-tag flex items-center gap-1.5" style={{ backgroundColor: "var(--color-lichen)" }}>
              <BookOpen className="h-3 w-3" /> Folklore
            </span>
          )}
        </div>

        {/* Common names */}
        <div className="flex flex-wrap gap-2 mb-6">
          {plant.commonNames.map((n) => (
            <span key={n} className="adaline-tag" style={{ backgroundColor: "var(--color-lichen)" }}>{n}</span>
          ))}
        </div>

        {/* Description */}
        <p style={{ fontFamily: "var(--font-akkurat)", fontSize: "18px", lineHeight: 1.67, letterSpacing: "-0.04em", color: "var(--color-botanical-ink)", opacity: 0.6 }} className="mb-12">
          {plant.description}
        </p>

        {/* ── Parts used + Properties ── */}
        <div className="grid gap-10 md:grid-cols-2 mb-12">
          <section>
            <SectionHeading>Parts Used</SectionHeading>
            <div className="flex flex-wrap gap-3">
              {plant.partsUsed.map((p) => (
                <div
                  key={p.part}
                  className="flex flex-col items-center gap-1.5"
                  style={{ border: "1px solid var(--color-lichen)", borderRadius: "8px", padding: "16px 20px", backgroundColor: "var(--color-sage-mist)" }}
                >
                  <span className="text-xl">{p.icon}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--color-botanical-ink)" }}>{p.part}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionHeading>Properties</SectionHeading>
            <div className="flex flex-wrap gap-2">
              {plant.medicinalProperties.map((prop) => (
                <span key={prop} className="adaline-tag" style={{ backgroundColor: "var(--color-lichen)" }}>{prop}</span>
              ))}
            </div>
          </section>
        </div>

        {/* ── Uses ── */}
        <section style={{ backgroundColor: "var(--color-sage-mist)", border: "1px solid var(--color-lichen)", borderRadius: "8px", padding: "24px" }} className="mb-10">
          <SectionHeading>Uses</SectionHeading>
          <div className="flex flex-wrap gap-2">
            {plant.uses.map((use) => (
              <span key={use} className="adaline-tag">{use}</span>
            ))}
          </div>
        </section>

        {/* ── Preparations ── */}
        <section className="mb-10">
          <SectionHeading>Home Preparations</SectionHeading>
          <div className="grid gap-4 md:grid-cols-2">
            {plant.preparations.map((prep, i) => (
              <div
                key={i}
                style={{ border: "1px solid var(--color-lichen)", borderRadius: "8px", padding: "20px", backgroundColor: "var(--color-cream-paper)" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 style={{ fontFamily: "var(--font-akkurat)", fontSize: "15px", fontWeight: 700, letterSpacing: "-0.04em", color: "var(--color-botanical-ink)" }}>
                    {prep.method}
                  </h3>
                  <span className="adaline-tag" style={{ backgroundColor: "var(--color-lichen)", fontSize: "10px" }}>{prep.type}</span>
                </div>
                <ol className="space-y-2.5">
                  {prep.steps.map((step, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span
                        style={{ width: "22px", height: "22px", borderRadius: "9999px", backgroundColor: "var(--color-botanical-ink)", color: "var(--color-cream-paper)", fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}
                      >
                        {j + 1}
                      </span>
                      <span style={{ fontFamily: "var(--font-akkurat)", fontSize: "14px", lineHeight: 1.5, letterSpacing: "-0.04em", color: "var(--color-botanical-ink)", opacity: 0.7 }}>
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        {/* ── Dosage ── */}
        <section className="mb-8">
          <SectionHeading>Dosage</SectionHeading>
          <div style={{ border: "1px solid var(--color-lichen)", borderRadius: "8px", padding: "20px", backgroundColor: "var(--color-sage-mist)" }}>
            <p style={{ fontFamily: "var(--font-akkurat)", fontSize: "15px", lineHeight: 1.6, letterSpacing: "-0.04em", color: "var(--color-botanical-ink)", opacity: 0.7 }}>
              {plant.dosage}
            </p>
          </div>
        </section>

        {/* ── Cautions ── */}
        <section className="mb-8">
          <SectionHeading>Cautions</SectionHeading>
          <ul className="space-y-3">
            {plant.cautions.map((c, i) => (
              <li key={i} className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "var(--color-bark-brown)" }} />
                <span style={{ fontFamily: "var(--font-akkurat)", fontSize: "15px", lineHeight: 1.5, letterSpacing: "-0.04em", color: "var(--color-botanical-ink)", opacity: 0.65 }}>
                  {c}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Toxic Lookalike ── */}
        {plant.toxicLookalike && (
          <section className="mb-8">
            <div style={{ backgroundColor: "var(--color-sage-mist)", border: "1px solid var(--color-eucalyptus)", borderRadius: "8px", padding: "24px" }}>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-5 w-5" style={{ color: "var(--color-bark-brown)" }} />
                <span style={{ fontFamily: "var(--font-akkurat)", fontSize: "16px", fontWeight: 700, letterSpacing: "-0.04em", color: "var(--color-bark-brown)" }}>
                  Toxic Lookalike Warning
                </span>
              </div>
              <h3 style={{ fontFamily: "var(--font-akkurat)", fontSize: "15px", fontWeight: 700, letterSpacing: "-0.04em", color: "var(--color-botanical-ink)" }} className="mb-2">
                {plant.toxicLookalike.name}
              </h3>
              <p style={{ fontFamily: "var(--font-akkurat)", fontSize: "14px", lineHeight: 1.55, letterSpacing: "-0.04em", color: "var(--color-botanical-ink)", opacity: 0.65 }}>
                {plant.toxicLookalike.warning}
              </p>
            </div>
          </section>
        )}
      </motion.div>
    </div>
  );
}
