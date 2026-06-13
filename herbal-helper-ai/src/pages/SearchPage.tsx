import { useState, useMemo, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Loader2, Sparkles } from "lucide-react";
import { plants, symptoms } from "@/data/plants";
import { Link, useSearchParams } from "react-router-dom";
import { searchPlantsBySymptom, type SymptomPlant } from "@/services/geminiService";
import { checkServerHealth } from "@/services/plantClassifier";

function Micro({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "var(--color-botanical-ink)", opacity: 0.45 }}>
      {children}
    </span>
  );
}

const filterChips  = ["All", "Tea", "Paste", "Decoction", "Juice", "Topical"];
const verifiedFilter = ["All", "Verified", "Traditional"];

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const [query,       setQuery]       = useState(searchParams.get("q") || "");
  const [prepFilter,  setPrepFilter]  = useState("All");
  const [verFilter,   setVerFilter]   = useState("All");
  const [aiResults,   setAiResults]   = useState<SymptomPlant[] | null>(null);
  const [aiLoading,   setAiLoading]   = useState(false);

  const suggestions = useMemo(() => {
    if (!query) return [];
    return symptoms.filter((s) => s.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
  }, [query]);

  const localResults = useMemo(() => {
    let filtered = plants;
    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter((p) =>
        p.symptoms.some((s) => s.includes(q)) ||
        p.name.toLowerCase().includes(q) ||
        p.uses.some((u) => u.toLowerCase().includes(q))
      );
    }
    if (prepFilter !== "All") filtered = filtered.filter((p) => p.preparations.some((pr) => pr.type.toLowerCase() === prepFilter.toLowerCase()));
    if (verFilter === "Verified")   filtered = filtered.filter((p) =>  p.verified);
    if (verFilter === "Traditional") filtered = filtered.filter((p) => !p.verified);
    return filtered;
  }, [query, prepFilter, verFilter]);

  const fetchAiResults = useCallback(async (symptom: string) => {
    if (!symptom.trim()) { setAiResults(null); return; }
    const online = await checkServerHealth();
    if (!online) { setAiResults(null); return; }
    setAiLoading(true);
    try {
      setAiResults(await searchPlantsBySymptom(symptom));
    } catch { setAiResults(null); }
    finally  { setAiLoading(false); }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      if (query.trim().length >= 2) fetchAiResults(query);
      else setAiResults(null);
    }, 600);
    return () => clearTimeout(t);
  }, [query, fetchAiResults]);

  const showAi = aiResults && aiResults.length > 0;

  /* Pill helper */
  const Pill = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <motion.button
      layout
      type="button"
      onClick={onClick}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        borderRadius: "9999px",
        padding: "6px 14px",
        border: `1px solid ${active ? "var(--color-botanical-ink)" : "var(--color-lichen)"}`,
        backgroundColor: active ? "var(--color-warm-loam)" : "var(--color-cream-paper)",
        color: active ? "var(--color-cream-paper)" : "var(--color-botanical-ink)",
        cursor: "pointer",
        transition: "all 0.15s",
        whiteSpace: "nowrap" as const,
      }}
    >
      {label}
    </motion.button>
  );

  return (
    <div className="max-w-[1200px] mx-auto px-8 py-16">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <Micro>Ayurvedic search</Micro>
        <h1 style={{ fontFamily: "var(--font-akkurat)", fontSize: "clamp(28px,4vw,47px)", fontWeight: 400, letterSpacing: "-1.88px", lineHeight: 0.98, color: "var(--color-botanical-ink)" }} className="mt-2 mb-3">
          Search by Symptom
        </h1>
        <p style={{ fontFamily: "var(--font-akkurat)", fontSize: "18px", lineHeight: 1.67, letterSpacing: "-0.04em", color: "var(--color-botanical-ink)", opacity: 0.5 }}>
          What plant helps with this?
        </p>
      </motion.div>

      {/* Search input */}
      <div className="relative mb-5 max-w-xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "var(--color-eucalyptus)" }} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="headache, cold, skin issues…"
          style={{
            width: "100%",
            paddingLeft: "44px",
            paddingRight: "16px",
            paddingTop: "12px",
            paddingBottom: "12px",
            fontFamily: "var(--font-akkurat)",
            fontSize: "16px",
            letterSpacing: "-0.04em",
            color: "var(--color-botanical-ink)",
            backgroundColor: "var(--color-sage-mist)",
            border: "1px solid var(--color-lichen)",
            borderRadius: "20px",
            outline: "none",
          }}
          onFocus={e => (e.target.style.borderColor = "var(--color-botanical-ink)")}
          onBlur={e  => (e.target.style.borderColor = "var(--color-lichen)")}
        />
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && query && (
        <div className="flex flex-wrap gap-2 mb-5">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setQuery(s)}
              className="adaline-tag cursor-pointer"
              style={{ transition: "background-color 0.12s" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--color-eucalyptus)")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--color-moss-veil)")}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-1">
        <Filter className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--color-eucalyptus)" }} />
        {filterChips.map((f) => <Pill key={f} label={f} active={prepFilter === f} onClick={() => setPrepFilter(f)} />)}
      </div>
      <div className="flex gap-2 mb-10">
        {verifiedFilter.map((f) => <Pill key={f} label={f} active={verFilter === f} onClick={() => setVerFilter(f)} />)}
      </div>

      {/* AI loading */}
      {aiLoading && (
        <div className="mb-6 flex items-center gap-2" style={{ fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.04em", color: "var(--color-bark-brown)", opacity: 0.6 }}>
          <Loader2 className="h-4 w-4 animate-spin" />
          Searching with AI…
        </div>
      )}

      {/* AI results */}
      {showAi && (
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-4 w-4" style={{ color: "var(--color-forest-floor)" }} />
            <span style={{ fontFamily: "var(--font-akkurat)", fontSize: "20px", fontWeight: 400, letterSpacing: "-0.04em", color: "var(--color-botanical-ink)" }}>
              AI Recommendations
            </span>
          </div>
          <div
            className="p-6 mb-6"
            style={{ backgroundColor: "var(--color-sage-mist)", border: "1px solid var(--color-lichen)", borderRadius: "8px" }}
          >
            <div className="grid gap-4 md:grid-cols-2">
              {aiResults!.map((p) => (
                <div
                  key={p.plantName}
                  style={{ backgroundColor: "var(--color-cream-paper)", border: "1px solid var(--color-lichen)", borderRadius: "8px", padding: "20px" }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <h3 style={{ fontFamily: "var(--font-akkurat)", fontSize: "16px", fontWeight: 700, letterSpacing: "-0.04em", color: "var(--color-botanical-ink)" }}>
                      {p.plantName}
                    </h3>
                    {p.ayushRecognized && <span className="adaline-tag">AYUSH</span>}
                  </div>
                  <p style={{ fontFamily: "var(--font-akkurat)", fontSize: "12px", letterSpacing: "-0.04em", color: "var(--color-botanical-ink)", opacity: 0.4 }} className="italic mb-2">
                    {p.botanicalName}
                  </p>
                  <p style={{ fontFamily: "var(--font-akkurat)", fontSize: "14px", lineHeight: 1.5, letterSpacing: "-0.04em", color: "var(--color-botanical-ink)", opacity: 0.65 }} className="mb-3">
                    {p.howItHelps}
                  </p>
                  <span className="adaline-tag">{p.primaryPreparation}</span>
                  {p.caution && (
                    <p style={{ fontFamily: "var(--font-akkurat)", fontSize: "12px", letterSpacing: "-0.04em", color: "var(--color-bark-brown)" }} className="mt-2">
                      ⚠ {p.caution}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Encyclopedia results */}
      <div className="mb-5">
        <span style={{ fontFamily: "var(--font-akkurat)", fontSize: "20px", fontWeight: 400, letterSpacing: "-0.04em", color: "var(--color-botanical-ink)" }}>
          Encyclopedia {localResults.length > 0 && <span style={{ opacity: 0.4 }}>({localResults.length})</span>}
        </span>
      </div>

      <motion.div
        key={`${query}-${prepFilter}-${verFilter}`}
        initial="hidden"
        animate="show"
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } }}
        className="grid gap-3 md:grid-cols-2"
      >
        {localResults.length === 0 && !showAi ? (
          <div className="col-span-full py-16 text-center">
            <p style={{ fontFamily: "var(--font-akkurat)", fontSize: "18px", letterSpacing: "-0.04em", color: "var(--color-botanical-ink)", opacity: 0.4 }}>
              No plants found — try a different symptom
            </p>
          </div>
        ) : (
          localResults.map((plant) => (
            <motion.div
              key={plant.id}
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
              whileHover={{ y: -2 }}
            >
              <Link
                to={`/encyclopedia/${plant.id}`}
                className="flex gap-4"
                style={{ border: "1px solid var(--color-lichen)", borderRadius: "8px", padding: "16px", backgroundColor: "var(--color-cream-paper)", display: "flex", textDecoration: "none", transition: "border-color 0.15s" }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = "var(--color-botanical-ink)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = "var(--color-lichen)")}
              >
                <img
                  src={plant.imageUrl}
                  alt={plant.name}
                  loading="lazy"
                  style={{ width: "64px", height: "64px", borderRadius: "8px", objectFit: "cover", flexShrink: 0 }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 style={{ fontFamily: "var(--font-akkurat)", fontSize: "15px", fontWeight: 700, letterSpacing: "-0.04em", color: "var(--color-botanical-ink)" }}>
                      {plant.name}
                    </h3>
                    {plant.verified
                      ? <span className="adaline-tag" style={{ padding: "2px 8px", fontSize: "10px" }}>Verified</span>
                      : <span className="adaline-tag" style={{ padding: "2px 8px", fontSize: "10px", backgroundColor: "var(--color-lichen)" }}>Folklore</span>
                    }
                  </div>
                  <p style={{ fontFamily: "var(--font-akkurat)", fontSize: "12px", letterSpacing: "-0.04em", color: "var(--color-botanical-ink)", opacity: 0.4 }} className="italic">
                    {plant.botanicalName}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
}
