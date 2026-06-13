import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { plants } from "@/data/plants";
import { Search } from "lucide-react";

const categories  = ["All", "Herb", "Tree", "Rhizome", "Climber", "Shrub", "Succulent", "Root Medicine"];
const bodySystems = ["All", "Respiratory", "Digestive", "Immune", "Skin", "Nervous", "Reproductive"];

function Micro({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "var(--color-botanical-ink)", opacity: 0.45 }}>
      {children}
    </span>
  );
}

function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <motion.button
      layout
      type="button"
      onClick={onClick}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        letterSpacing: "0.04em",
        textTransform: "uppercase" as const,
        borderRadius: "9999px",
        padding: "5px 14px",
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
}

export default function EncyclopediaPage() {
  const [search, setSearch] = useState("");
  const [cat,    setCat]    = useState("All");
  const [body,   setBody]   = useState("All");

  const filtered = useMemo(() => {
    let list = plants;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.botanicalName.toLowerCase().includes(q));
    }
    if (cat  !== "All") list = list.filter((p) => p.category.some((c) => c.toLowerCase() === cat.toLowerCase()));
    if (body !== "All") list = list.filter((p) => p.bodySystem.includes(body));
    return list;
  }, [search, cat, body]);

  return (
    <div className="max-w-[1200px] mx-auto px-8 py-16">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <Micro>Botanical reference</Micro>
        <h1 style={{ fontFamily: "var(--font-akkurat)", fontSize: "clamp(28px,4vw,47px)", fontWeight: 400, letterSpacing: "-1.88px", lineHeight: 0.98, color: "var(--color-botanical-ink)" }} className="mt-2 mb-3">
          Plant Encyclopedia
        </h1>
        <p style={{ fontFamily: "var(--font-akkurat)", fontSize: "18px", lineHeight: 1.67, letterSpacing: "-0.04em", color: "var(--color-botanical-ink)", opacity: 0.5 }}>
          {plants.length} medicinal plants from India&apos;s botanical heritage
        </p>
      </motion.div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "var(--color-eucalyptus)" }} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search plants…"
          style={{
            width: "100%",
            paddingLeft: "44px",
            paddingRight: "16px",
            paddingTop: "11px",
            paddingBottom: "11px",
            fontFamily: "var(--font-akkurat)",
            fontSize: "15px",
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

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-3">
        {categories.map((c) => <FilterPill key={c} label={c} active={cat === c} onClick={() => setCat(c)} />)}
      </div>
      <div className="flex flex-wrap gap-2 mb-10">
        {bodySystems.map((b) => <FilterPill key={b} label={b} active={body === b} onClick={() => setBody(b)} />)}
      </div>

      {/* Result count */}
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--color-botanical-ink)", opacity: 0.35 }} className="mb-6">
        {filtered.length} result{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Grid */}
      <motion.div
        key={`${search}-${cat}-${body}`}
        initial="hidden"
        animate="show"
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {filtered.map((plant) => (
          <motion.div
            key={plant.id}
            variants={{ hidden: { opacity: 0, scale: 0.96 }, show: { opacity: 1, scale: 1 } }}
            whileHover={{ y: -2 }}
          >
            <Link
              to={`/encyclopedia/${plant.id}`}
              className="block group"
              style={{
                border: "1px solid var(--color-lichen)",
                borderRadius: "8px",
                overflow: "hidden",
                backgroundColor: "var(--color-cream-paper)",
                textDecoration: "none",
                transition: "border-color 0.15s",
                display: "block",
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = "var(--color-botanical-ink)")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = "var(--color-lichen)")}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/3", maxHeight: "128px" }}>
                <img
                  src={plant.imageUrl}
                  alt={plant.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {plant.verified && (
                  <span
                    className="absolute top-2 right-2"
                    style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.04em", textTransform: "uppercase", backgroundColor: "var(--color-moss-veil)", color: "var(--color-botanical-ink)", borderRadius: "9999px", padding: "2px 6px" }}
                  >
                    ✓
                  </span>
                )}
              </div>
              <div className="p-3">
                <h3 style={{ fontFamily: "var(--font-akkurat)", fontSize: "13px", fontWeight: 700, letterSpacing: "-0.04em", color: "var(--color-botanical-ink)" }}>
                  {plant.name}
                </h3>
                <p style={{ fontFamily: "var(--font-akkurat)", fontSize: "11px", letterSpacing: "-0.04em", color: "var(--color-botanical-ink)", opacity: 0.4 }} className="italic truncate mt-0.5">
                  {plant.botanicalName}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
