/**
 * geminiService.ts
 *
 * Secure proxy layer — all Gemini AI calls are routed through the
 * FastAPI backend (ml/server.py). The API key never leaves the server.
 *
 * Exported interfaces and function signatures are UNCHANGED so that
 * all callers (identify.tsx, herb-detail/[id].tsx) require zero edits.
 *
 * Backend endpoints:
 *   POST /gemini/plant-info      → getPlantInfo()
 *   POST /gemini/symptom-search  → searchPlantsBySymptom()
 *   POST /gemini/verify-plant    → verifyIsPlant()
 *   POST /gemini/verify-vision   → verifyPlantWithVision()
 */

import { ML_SERVER_URL } from "../config";

// ─── Types (unchanged — callers depend on these) ─────────────────

export interface HomeRemedy {
  name: string;
  forCondition: string;
  ingredients: string[];
  steps: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  prepTime: string;
}

export interface LearnMoreLink {
  title: string;
  url: string;
  type: "youtube" | "article" | "wikipedia";
}

export interface PlantInfo {
  name: string;
  botanicalName: string;
  family: string;
  commonNames: string[];
  description: string;
  ayushRecognized: boolean;
  doctorVerified: boolean;
  partsUsed: { part: string; preparation: string }[];
  medicinalProperties: string[];
  uses: { condition: string; description: string }[];
  homeRemedies: HomeRemedy[];
  dosage: string;
  cautions: string[];
  toxicLookalike: { name: string; warning: string } | null;
  learnMoreLinks: LearnMoreLink[];
  relatedSearches: {
    google: string[];
    youtube: string[];
    news: string[];
  };
  // Source metadata
  dataSource: "pfaf+gemini" | "gemini";
  pfafUrl?: string;
  images?: string[];
  isToxic?: boolean;
  poisoningSymptoms?: string | null;
  poisoningFirstAid?: string | null;
}

export interface SymptomPlant {
  plantName: string;
  botanicalName: string;
  ayushRecognized: boolean;
  relevanceScore: number;
  howItHelps: string;
  primaryPreparation: string;
  quickRemedy: string;
  caution: string | null;
}

export interface VisionVerifyResult {
  /** Whether Gemini agrees with the ML model's top prediction */
  agrees: boolean;
  /** Gemini's own best guess for the plant (may differ from ML). Set to "NOT_A_PLANT" if image is not a plant. */
  geminiPlant: string;
  /** Gemini's confidence: "high" | "medium" | "low" */
  geminiConfidence: "high" | "medium" | "low";
  /** One-line reason for agreement/disagreement */
  reasoning: string;
  /** Caution note if plant is potentially dangerous */
  caution: string | null;
  /** Care level for the plant */
  plant_care?: "Easy" | "Moderate" | "Difficult";
  /** Descriptive summary of the plant */
  about_plant?: string;
  /** Dynamic toxicity status from real-time database/web search lookup */
  is_toxic?: boolean;
}

// ─── Internal helpers ─────────────────────────────────────────────

async function postToBackend<T>(path: string, body: object): Promise<T> {
  const response = await fetch(`${ML_SERVER_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Backend error ${response.status}: ${err}`);
  }
  return response.json();
}

// ─── 1. Get full plant info ───────────────────────────────────────

/**
 * Fetch hybrid PFAF + Gemini plant information via the backend.
 * @param plantName     - Common name e.g. "Tulsi"
 * @param botanicalName - Optional e.g. "Ocimum tenuiflorum"
 * @param classLabel    - ML class key e.g. "tulsi" (used for PFAF lookup)
 */
export async function getPlantInfo(
  plantName: string,
  botanicalName?: string,
  classLabel?: string,
  isToxic?: boolean,
): Promise<PlantInfo> {
  return postToBackend<PlantInfo>("/ai/plant-info", {
    plant_name:      plantName,
    botanical_name:  botanicalName ?? null,
    class_label:     classLabel ?? null,
    is_toxic:        isToxic ?? false,
  });
}

// ─── 2. Search plants by symptom ─────────────────────────────────

export async function searchPlantsBySymptom(
  symptom: string,
): Promise<SymptomPlant[]> {
  return postToBackend<SymptomPlant[]>("/ai/symptom-search", { symptom });
}

// ─── 3. Vision: verify image is a plant ──────────────────────────

/**
 * Lightweight plant presence check — called BEFORE the main verification
 * when ML confidence is high (≥50%). Prevents the model from confidently
 * misidentifying a non-plant image (e.g., a person, food, landscape).
 *
 * Returns true only if the image clearly contains a plant / leaf / herb.
 */
export async function verifyIsPlant(base64Image: string): Promise<boolean> {
  try {
    const result = await postToBackend<{ is_plant: boolean }>(
      "/ai/verify-plant",
      { base64_image: base64Image },
    );
    return result.is_plant === true;
  } catch {
    return true; // fail open on network error
  }
}

// ─── 4. Vision: cross-verify ML prediction ───────────────────────

/**
 * Send the captured image + ML top prediction to the backend for
 * Gemini vision cross-verification.
 *
 * @param base64Image   Raw base64 string (no data-URI prefix)
 * @param mlPlantName   Display name from ML prediction e.g. "Tulsi (Holy Basil)"
 * @param mlClassName   Snake_case class name e.g. "tulsi"
 * @param mlConfidence  ML confidence 0–100
 */
export async function verifyPlantWithVision(
  base64Image: string,
  mlPlantName: string,
  mlClassName: string,
  mlConfidence: number,
): Promise<VisionVerifyResult> {
  try {
    return await postToBackend<VisionVerifyResult>("/ai/verify-vision", {
      base64_image:   base64Image,
      ml_plant_name:  mlPlantName,
      ml_class_name:  mlClassName,
      ml_confidence:  mlConfidence,
    });
  } catch (err) {
    console.warn("[VisionVerify] Failed:", err);
    // Graceful fallback — don't crash the identify screen
    return {
      agrees:           true,
      geminiPlant:      mlPlantName,
      geminiConfidence: "low",
      reasoning:        "Visual verification unavailable — ML prediction shown.",
      caution:          null,
      plant_care:       "Moderate",
      about_plant:      `${mlPlantName} is a medicinal plant traditionally utilized for its herbal health remedies.`,
    };
  }
}

// ─── URL helpers (unchanged) ──────────────────────────────────────

export function googleUrl(query: string): string {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

export function youtubeUrl(query: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

export function newsUrl(query: string): string {
  return `https://news.google.com/search?q=${encodeURIComponent(query)}`;
}
