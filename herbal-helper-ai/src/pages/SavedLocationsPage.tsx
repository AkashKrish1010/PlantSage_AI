import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Trash2, ExternalLink, Camera, RefreshCw, Calendar, Clock } from "lucide-react";
import {
  getSavedPlants, removeSavedPlant, openGoogleMaps, type SavedPlant,
} from "@/services/savedPlantsService";

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

function Micro({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "var(--color-botanical-ink)", opacity: 0.45 }}>
      {children}
    </span>
  );
}

function PlantLocationCard({ plant, onDelete }: { plant: SavedPlant; onDelete: (id: string) => void }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      whileHover={{ y: -2 }}
      style={{
        display: "flex",
        gap: "16px",
        border: "1px solid var(--color-lichen)",
        borderRadius: "8px",
        padding: "20px",
        backgroundColor: "var(--color-cream-paper)",
        transition: "border-color 0.15s",
      }}
      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = "var(--color-botanical-ink)")}
      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = "var(--color-lichen)")}
    >
      {/* Image */}
      <div style={{ width: "72px", height: "72px", flexShrink: 0, overflow: "hidden", borderRadius: "8px", backgroundColor: "var(--color-sage-mist)" }}>
        {plant.imageUri ? (
          <img src={plant.imageUri} alt={plant.name} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="flex h-full w-full items-center justify-center" style={{ fontSize: "24px" }}>🌿</div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
          <div>
            <h3 style={{ fontFamily: "var(--font-akkurat)", fontSize: "16px", fontWeight: 700, letterSpacing: "-0.04em", color: "var(--color-botanical-ink)" }}>
              {plant.name}
            </h3>
            <p style={{ fontFamily: "var(--font-akkurat)", fontSize: "12px", letterSpacing: "-0.04em", color: "var(--color-botanical-ink)", opacity: 0.4 }} className="italic mt-0.5">
              {plant.scientificName}
            </p>
          </div>
          <span className="adaline-tag" style={{ fontSize: "11px" }}>{plant.confidence.toFixed(1)}%</span>
        </div>

        {plant.address && (
          <p style={{ fontFamily: "var(--font-akkurat)", fontSize: "13px", lineHeight: 1.45, letterSpacing: "-0.04em", color: "var(--color-botanical-ink)", opacity: 0.5 }} className="mb-3 line-clamp-2">
            {plant.address}
          </p>
        )}

        {/* Meta timestamps */}
        <div className="flex flex-wrap gap-4 mb-4">
          <span className="flex items-center gap-1.5" style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.02em", color: "var(--color-botanical-ink)", opacity: 0.4 }}>
            <Calendar className="h-3 w-3" />
            {formatDate(plant.savedAt)}
          </span>
          <span className="flex items-center gap-1.5" style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.02em", color: "var(--color-botanical-ink)", opacity: 0.4 }}>
            <Clock className="h-3 w-3" />
            {formatTime(plant.savedAt)}
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => openGoogleMaps(plant.latitude, plant.longitude, plant.name)}
            className="adaline-btn-ghost"
            style={{ fontSize: "12px", padding: "6px 14px", gap: "6px" }}
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Open in Maps
          </button>
          <button
            type="button"
            onClick={() => onDelete(plant.id)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "var(--font-akkurat)",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: "var(--color-bark-brown)",
              backgroundColor: "transparent",
              border: "1px solid var(--color-eucalyptus)",
              borderRadius: "20px",
              padding: "6px 14px",
              cursor: "pointer",
              transition: "border-color 0.15s, color 0.15s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-bark-brown)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-eucalyptus)"; }}
          >
            <Trash2 className="h-3.5 w-3.5" />
            Remove
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default function SavedLocationsPage() {
  const [savedPlants, setSavedPlants] = useState<SavedPlant[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [refreshing,  setRefreshing]  = useState(false);

  const load = useCallback(async () => {
    const data = await getSavedPlants();
    setSavedPlants(data);
    setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleRefresh = () => { setRefreshing(true); load(); };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this saved plant location?")) return;
    await removeSavedPlant(id);
    setSavedPlants((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="max-w-[1200px] mx-auto px-8 py-16">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Micro>GPS records</Micro>
            <h1 style={{ fontFamily: "var(--font-akkurat)", fontSize: "clamp(28px,4vw,47px)", fontWeight: 400, letterSpacing: "-1.88px", lineHeight: 0.98, color: "var(--color-botanical-ink)" }} className="mt-2 mb-2">
              Saved Locations
            </h1>
            <p style={{ fontFamily: "var(--font-akkurat)", fontSize: "18px", lineHeight: 1.67, letterSpacing: "-0.04em", color: "var(--color-botanical-ink)", opacity: 0.5 }}>
              Plants you identified and saved with GPS coordinates
            </p>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing}
            className="adaline-btn-ghost"
            style={{ fontSize: "13px", padding: "8px 18px" }}
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </motion.div>

      {/* States */}
      {loading ? (
        <div className="py-20 text-center">
          <p style={{ fontFamily: "var(--font-akkurat)", fontSize: "16px", letterSpacing: "-0.04em", color: "var(--color-botanical-ink)", opacity: 0.35 }}>
            Loading saved plants…
          </p>
        </div>
      ) : savedPlants.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ border: "1.5px dashed var(--color-eucalyptus)", borderRadius: "8px", padding: "80px 40px", textAlign: "center" }}
        >
          <div
            style={{ width: "56px", height: "56px", border: "1px solid var(--color-lichen)", borderRadius: "8px", backgroundColor: "var(--color-sage-mist)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}
          >
            <MapPin className="h-6 w-6" style={{ color: "var(--color-eucalyptus)" }} />
          </div>
          <h2 style={{ fontFamily: "var(--font-akkurat)", fontSize: "24px", fontWeight: 400, letterSpacing: "-0.04em", color: "var(--color-botanical-ink)" }} className="mb-3">
            No saved plants yet
          </h2>
          <p style={{ fontFamily: "var(--font-akkurat)", fontSize: "15px", lineHeight: 1.6, letterSpacing: "-0.04em", color: "var(--color-botanical-ink)", opacity: 0.5 }} className="max-w-sm mx-auto mb-8">
            Scan a plant on the Identify page and tap &ldquo;Save Location&rdquo; to remember where you found it.
          </p>
          <Link to="/identify" className="adaline-btn-primary" style={{ fontSize: "13px" }}>
            <Camera className="h-4 w-4" />
            Scan a Plant
          </Link>
        </motion.div>
      ) : (
        <>
          {/* Count label */}
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="h-3.5 w-3.5" style={{ color: "var(--color-eucalyptus)" }} />
            <Micro>Plant Locations ({savedPlants.length})</Micro>
          </div>

          {/* Cards */}
          <div className="grid gap-4 md:grid-cols-2">
            <AnimatePresence>
              {savedPlants.map((plant) => (
                <PlantLocationCard key={plant.id} plant={plant} onDelete={handleDelete} />
              ))}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
}
