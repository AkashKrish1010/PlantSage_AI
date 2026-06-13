import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera, Upload, X, Leaf, AlertTriangle,
  MapPin, Loader2, WifiOff, Sprout,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { checkServerHealth } from "@/services/plantClassifier";
import { runIdentifyPipeline, type IdentifyPipelineResult } from "@/services/identifyPipeline";
import { savePlantLocation, isDuplicateNearby } from "@/services/savedPlantsService";
import { prepareImageForML } from "@/lib/imageUtils";

/* ── Micro-label helper ── */
function Micro({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--color-botanical-ink)", opacity: 0.45 }}>
      {children}
    </span>
  );
}

export default function IdentifyPage() {
  const [image,          setImage]          = useState<string | null>(null);
  const [scanning,       setScanning]       = useState(false);
  const [identifyResult, setIdentifyResult] = useState<IdentifyPipelineResult | null>(null);
  const [serverOnline,   setServerOnline]   = useState<boolean | null>(null);
  const [locationSaving, setLocationSaving] = useState(false);
  const [locationSaved,  setLocationSaved]  = useState(false);
  const [error,          setError]          = useState<string | null>(null);
  const fileRef   = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  useEffect(() => { checkServerHealth().then(setServerOnline); }, []);

  const processFile = async (file: File) => {
    setScanning(true);
    setIdentifyResult(null);
    setLocationSaved(false);
    setError(null);
    const online = serverOnline ?? (await checkServerHealth());
    setServerOnline(online);
    if (!online) {
      setScanning(false);
      setError("ML server is offline. Start it with: python ml/server.py (from VanaVaidhya folder)");
      return;
    }
    try {
      const { base64, previewUrl } = await prepareImageForML(file);
      setImage(previewUrl);
      const result = await runIdentifyPipeline(base64);
      setIdentifyResult(result);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Identification failed";
      if (msg === "NOT_A_PLANT") setError("This doesn't look like a plant. Please capture a clear photo of leaves, flowers, or stems.");
      else if (msg.includes("Network") || msg.includes("fetch") || msg.includes("Failed")) setError("Could not reach ML server. Make sure python ml/server.py is running.");
      else setError(msg);
      setImage(null);
    } finally {
      setScanning(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    await processFile(file);
  };

  const reset = () => {
    setImage(null);
    setScanning(false);
    setIdentifyResult(null);
    setLocationSaved(false);
    setError(null);
  };

  const handleSaveLocation = async () => {
    if (!identifyResult || locationSaved) return;
    setLocationSaving(true);
    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 15000 })
      );
      const { latitude, longitude } = pos.coords;
      const { finalPlant, finalConfidence, geminiWon, mlResult } = identifyResult;
      const dup = await isDuplicateNearby(finalPlant, latitude, longitude);
      if (dup) { toast.error("Already saved nearby", { description: `A ${finalPlant} was saved within 100 m.` }); return; }
      let address: string | undefined;
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`, { headers: { "Accept-Language": "en" } });
        address = (await res.json()).display_name;
      } catch { /* ok */ }
      const sciName = geminiWon ? "" : (mlResult.top_prediction.class_name.replace(/_/g, " ") ?? "");
      await savePlantLocation({ name: finalPlant, scientificName: sciName, confidence: finalConfidence, latitude, longitude, address, savedAt: Date.now(), imageUri: image ?? undefined });
      setLocationSaved(true);
      toast.success("Location saved");
    } catch {
      toast.error("Could not save location", { description: "Allow location access in your browser." });
    } finally {
      setLocationSaving(false);
    }
  };

  const r = identifyResult;
  const displayName  = r?.plantInfo?.name ?? r?.finalPlant;
  const description  = r?.plantInfo?.description ?? r?.aboutPlant ?? r?.reasoning;

  return (
    <div className="max-w-[1200px] mx-auto px-8 py-16">
      {/* Page header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <Micro>AI Identification</Micro>
        <h1 style={{ fontFamily: "var(--font-akkurat)", fontSize: "clamp(28px,4vw,47px)", fontWeight: 400, letterSpacing: "-1.88px", lineHeight: 0.98, color: "var(--color-botanical-ink)" }} className="mt-2 mb-3">
          Identify a Plant
        </h1>
        <p style={{ fontFamily: "var(--font-akkurat)", fontSize: "18px", lineHeight: 1.67, letterSpacing: "-0.04em", color: "var(--color-botanical-ink)", opacity: 0.5 }}>
          Same AI pipeline as the VanaVaidhya mobile app — plant check, TTA model, Gemini verify
        </p>

        {serverOnline === false && (
          <div className="mt-4 flex items-center gap-2.5 rounded-lg px-4 py-3" style={{ border: "1px solid var(--color-eucalyptus)", backgroundColor: "var(--color-sage-mist)" }}>
            <WifiOff className="h-4 w-4 flex-shrink-0" style={{ color: "var(--color-bark-brown)" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.02em", color: "var(--color-bark-brown)" }}>
              ML server offline — run <code>python ml/server.py</code>
            </span>
          </div>
        )}
      </motion.div>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* ── Image well ── */}
        <div
          className="relative overflow-hidden flex flex-col items-center justify-center"
          style={{ aspectRatio: "4/3", maxHeight: "380px", border: `1.5px dashed var(--color-eucalyptus)`, borderRadius: "8px", backgroundColor: "var(--color-sage-mist)" }}
        >
          {image ? (
            <>
              <img src={image} alt="Plant" className="h-full w-full object-cover" style={{ borderRadius: "8px" }} />
              <button
                type="button"
                onClick={reset}
                className="absolute top-3 right-3 flex items-center justify-center"
                style={{ width: "32px", height: "32px", borderRadius: "9999px", backgroundColor: "rgba(251,253,246,0.9)", border: "1px solid var(--color-lichen)", backdropFilter: "blur(6px)" }}
              >
                <X className="h-4 w-4" style={{ color: "var(--color-botanical-ink)" }} />
              </button>
              <AnimatePresence>
                {scanning && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                    style={{ backgroundColor: "rgba(251,253,246,0.7)", backdropFilter: "blur(4px)", borderRadius: "8px" }}
                  >
                    <Leaf className="h-8 w-8 animate-pulse" style={{ color: "var(--color-forest-floor)" }} />
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.04em", color: "var(--color-botanical-ink)" }}>
                      Checking plant & running TTA model…
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <div className="flex flex-col items-center gap-3" style={{ color: "var(--color-eucalyptus)" }}>
              <Camera className="h-10 w-10" />
              <p style={{ fontFamily: "var(--font-akkurat)", fontSize: "14px", letterSpacing: "-0.04em", color: "var(--color-botanical-ink)", opacity: 0.4 }}>
                Capture or upload a clear plant photo
              </p>
            </div>
          )}
        </div>

        {/* ── Controls + Results ── */}
        <div className="flex flex-col gap-5">
          {!image && !scanning && (
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={() => cameraRef.current?.click()} className="adaline-btn-primary">
                <Camera className="h-4 w-4" />
                Use Camera
              </button>
              <button type="button" onClick={() => fileRef.current?.click()} className="adaline-btn-ghost">
                <Upload className="h-4 w-4" />
                Upload Photo
              </button>
              <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleUpload} />
              <input ref={fileRef}   type="file" accept="image/*" className="hidden" onChange={handleUpload} />
            </div>
          )}

          {error && (
            <div className="p-4 rounded-lg" style={{ backgroundColor: "var(--color-sage-mist)", border: "1px solid var(--color-eucalyptus)" }}>
              <p style={{ fontFamily: "var(--font-akkurat)", fontSize: "14px", letterSpacing: "-0.04em", color: "var(--color-bark-brown)" }}>{error}</p>
            </div>
          )}

          {r && !scanning && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ backgroundColor: "var(--color-cream-paper)", border: "1px solid var(--color-lichen)", borderRadius: "8px", padding: "24px" }}
            >
              {/* Plant name + badges */}
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 style={{ fontFamily: "var(--font-akkurat)", fontSize: "24px", fontWeight: 400, letterSpacing: "-0.04em", color: "var(--color-botanical-ink)" }}>
                    {displayName}
                  </h2>
                  <p style={{ fontFamily: "var(--font-akkurat)", fontSize: "13px", letterSpacing: "-0.04em", color: "var(--color-botanical-ink)", opacity: 0.45 }} className="italic mt-0.5">
                    {r.plantInfo?.botanicalName ?? (r.className ? r.className.replace(/_/g, " ") : "")}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="adaline-tag">{r.finalConfidence.toFixed(1)}% match</span>
                  {r.ayushRecognized && <span className="adaline-tag">AYUSH</span>}
                  {r.isToxic && (
                    <span className="adaline-tag" style={{ backgroundColor: "var(--color-eucalyptus)" }}>Toxic</span>
                  )}
                  {r.source === "AI+ML" && (
                    <span className="adaline-tag flex items-center gap-1">
                      <Sprout className="h-3 w-3" /> AI verified
                    </span>
                  )}
                </div>
              </div>

              {description && (
                <p style={{ fontFamily: "var(--font-akkurat)", fontSize: "15px", lineHeight: 1.6, letterSpacing: "-0.04em", color: "var(--color-botanical-ink)", opacity: 0.6 }} className="mb-4">
                  {description}
                </p>
              )}

              {r.plantCare && (
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.02em", color: "var(--color-bark-brown)", opacity: 0.65 }} className="mb-3">
                  CARE LEVEL: <span style={{ fontWeight: 700, opacity: 1 }}>{r.plantCare}</span>
                </p>
              )}

              {r.plantInfo?.partsUsed && r.plantInfo.partsUsed.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {r.plantInfo.partsUsed.slice(0, 4).map((p) => (
                    <span key={p.part} className="adaline-tag">{p.part}</span>
                  ))}
                </div>
              )}

              {r.plantInfo?.toxicLookalike && (
                <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: "var(--color-sage-mist)", border: "1px solid var(--color-eucalyptus)" }}>
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="h-4 w-4" style={{ color: "var(--color-bark-brown)" }} />
                    <span style={{ fontFamily: "var(--font-akkurat)", fontSize: "13px", fontWeight: 700, letterSpacing: "-0.04em", color: "var(--color-bark-brown)" }}>
                      Lookalike: {r.plantInfo.toxicLookalike.name}
                    </span>
                  </div>
                  <p style={{ fontFamily: "var(--font-akkurat)", fontSize: "13px", letterSpacing: "-0.04em", color: "var(--color-botanical-ink)", opacity: 0.6 }}>
                    {r.plantInfo.toxicLookalike.warning}
                  </p>
                </div>
              )}

              {r.mlResult.top5.length > 1 && (
                <div className="mb-5">
                  <Micro>ML top matches</Micro>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {r.mlResult.top5.slice(0, 5).map((p) => (
                      <span
                        key={p.class_name}
                        className="adaline-tag"
                        style={{ backgroundColor: (p.display_name === r.finalPlant || r.finalPlant.toLowerCase().includes(p.class_name.replace(/_/g, " "))) ? "var(--color-eucalyptus)" : "var(--color-lichen)" }}
                      >
                        {p.display_name} ({p.confidence.toFixed(0)}%)
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <button
                  className="adaline-btn-ghost"
                  style={{ fontSize: "13px", padding: "8px 18px" }}
                  onClick={handleSaveLocation}
                  disabled={locationSaving || locationSaved}
                >
                  {locationSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
                  {locationSaved ? "Location Saved" : "Save Location"}
                </button>
                <Link to="/saved-locations" className="adaline-btn-ghost" style={{ fontSize: "13px", padding: "8px 18px" }}>
                  View Saved
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
