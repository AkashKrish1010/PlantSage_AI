import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { plants, gardenCategories } from "@/data/plants";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function Micro({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "var(--color-botanical-ink)", opacity: 0.45 }}>
      {children}
    </span>
  );
}

export default function GardenPage() {
  const [activeCategory, setActiveCategory] = useState(gardenCategories[0].id);
  const category       = gardenCategories.find((c) => c.id === activeCategory)!;
  const categoryPlants = category.plantIds.map((id) => plants.find((p) => p.id === id)!).filter(Boolean);

  return (
    <div className="max-w-[1200px] mx-auto px-8 py-16">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <Micro>Curated collections</Micro>
        <h1 style={{ fontFamily: "var(--font-akkurat)", fontSize: "clamp(28px,4vw,47px)", fontWeight: 400, letterSpacing: "-1.88px", lineHeight: 0.98, color: "var(--color-botanical-ink)" }} className="mt-2 mb-3">
          Virtual Herbal Garden
        </h1>
        <p style={{ fontFamily: "var(--font-akkurat)", fontSize: "18px", lineHeight: 1.67, letterSpacing: "-0.04em", color: "var(--color-botanical-ink)", opacity: 0.5 }}>
          Explore curated plant collections by use and season
        </p>
      </motion.div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2.5 mb-8">
        {gardenCategories.map((cat) => {
          const active = activeCategory === cat.id;
          return (
            <motion.button
              layout
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "var(--font-akkurat)",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                borderRadius: "20px",
                padding: "10px 18px",
                border: `1px solid ${active ? "var(--color-botanical-ink)" : "var(--color-lichen)"}`,
                backgroundColor: active ? "var(--color-warm-loam)" : "var(--color-cream-paper)",
                color: active ? "var(--color-cream-paper)" : "var(--color-botanical-ink)",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              <span className="text-base">{cat.emoji}</span>
              {cat.name}
            </motion.button>
          );
        })}
      </div>

      {/* Category description */}
      <motion.div
        key={category.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="mb-8 p-5"
        style={{ backgroundColor: "var(--color-sage-mist)", border: "1px solid var(--color-lichen)", borderRadius: "8px" }}
      >
        <p style={{ fontFamily: "var(--font-akkurat)", fontSize: "16px", lineHeight: 1.6, letterSpacing: "-0.04em", color: "var(--color-botanical-ink)", opacity: 0.65 }}>
          {category.description}
        </p>
      </motion.div>

      {/* Plant grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={category.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { staggerChildren: 0.08 } }}
          exit={{ opacity: 0 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {categoryPlants.map((plant) => (
            <motion.div
              key={plant.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2 }}
            >
              <Link
                to={`/encyclopedia/${plant.id}`}
                className="flex gap-4 group"
                style={{
                  border: "1px solid var(--color-lichen)",
                  borderRadius: "8px",
                  padding: "16px",
                  backgroundColor: "var(--color-cream-paper)",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "flex-start",
                  transition: "border-color 0.15s",
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = "var(--color-botanical-ink)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = "var(--color-lichen)")}
              >
                <div style={{ width: "72px", height: "72px", flexShrink: 0, overflow: "hidden", borderRadius: "8px" }}>
                  <img
                    src={plant.imageUrl}
                    alt={plant.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 style={{ fontFamily: "var(--font-akkurat)", fontSize: "15px", fontWeight: 700, letterSpacing: "-0.04em", color: "var(--color-botanical-ink)" }}>
                    {plant.name}
                  </h3>
                  <p style={{ fontFamily: "var(--font-akkurat)", fontSize: "12px", letterSpacing: "-0.04em", color: "var(--color-botanical-ink)", opacity: 0.4 }} className="italic mt-0.5 truncate">
                    {plant.botanicalName}
                  </p>
                  <p style={{ fontFamily: "var(--font-akkurat)", fontSize: "13px", lineHeight: 1.45, letterSpacing: "-0.04em", color: "var(--color-botanical-ink)", opacity: 0.55 }} className="mt-1.5 line-clamp-2">
                    {plant.description}
                  </p>
                </div>
                <ArrowRight className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 opacity-0 group-hover:opacity-40 transition-opacity" style={{ color: "var(--color-botanical-ink)" }} />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
