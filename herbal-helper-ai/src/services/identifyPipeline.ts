/**
 * Plant identification pipeline — mirrors VanaVaidhya app/identify.tsx logic.
 */

import { classifyPlant, type MLIdentifyResult } from "./plantClassifier";
import {
  verifyIsPlant,
  verifyPlantWithVision,
  getPlantInfo,
  type PlantInfo,
  type VisionVerifyResult,
} from "./geminiService";

const ML_CONFIDENCE_THRESHOLD = 92;

export type IdentifySource = "ML" | "AI+ML";

export interface IdentifyPipelineResult {
  mlResult: MLIdentifyResult;
  finalPlant: string;
  finalConfidence: number;
  geminiWon: boolean;
  source: IdentifySource;
  reasoning: string;
  plantCare: string | null;
  aboutPlant: string | null;
  isToxic: boolean;
  needsCaution: boolean;
  ayushRecognized: boolean;
  className: string;
  plantInfo: PlantInfo | null;
  notAPlant: boolean;
}

function arbitrate(
  mlConfidence: number,
  mlName: string,
  geminiName: string,
  geminiLevel: "high" | "medium" | "low",
  agrees: boolean,
): { plant: string; confidence: number; geminiWon: boolean } {
  const geminiScore = { high: 93, medium: 72, low: 48 }[geminiLevel];
  if (agrees) {
    return {
      plant: mlName,
      confidence: Math.min(Math.max(mlConfidence, geminiScore), 99.5),
      geminiWon: false,
    };
  }
  if (geminiScore > mlConfidence + 10) {
    return { plant: geminiName, confidence: geminiScore, geminiWon: true };
  }
  return { plant: mlName, confidence: mlConfidence, geminiWon: false };
}

const LOCAL_DESCRIPTIONS: Record<string, string> = {
  tulsi:
    "A highly revered Ayurvedic herb traditionally used to support respiratory health and immune system function.",
  basil:
    "A highly revered Ayurvedic herb traditionally used to support respiratory health and immune system function.",
  neem: "A highly valued antiseptic tree known for its antibacterial properties and skin healing benefits.",
  aloe: "A soothing succulent renowned for its cooling gel, widely used to heal skin and support digestion.",
  ashwagandha:
    "A prominent adaptogenic herb prized for its ability to reduce stress and enhance vitality.",
};

function inferPlantCare(plantName: string): string {
  const n = plantName.toLowerCase();
  if (
    n.includes("tulsi") ||
    n.includes("basil") ||
    n.includes("neem") ||
    n.includes("aloe")
  ) {
    return "Easy";
  }
  return "Moderate";
}

function localAboutPlant(plantName: string): string | null {
  const n = plantName.toLowerCase();
  for (const key of Object.keys(LOCAL_DESCRIPTIONS)) {
    if (n.includes(key)) return LOCAL_DESCRIPTIONS[key];
  }
  return null;
}

function applyGeminiWonFlags(plant: string, vision: VisionVerifyResult) {
  const geminiSaysToxic = vision.is_toxic === true || !!vision.caution;
  const isAyush =
    plant.toLowerCase().includes("tulsi") ||
    plant.toLowerCase().includes("basil") ||
    plant.toLowerCase().includes("neem") ||
    plant.toLowerCase().includes("aloe") ||
    plant.toLowerCase().includes("ashwagandha") ||
    plant.toLowerCase().includes("ginger") ||
    plant.toLowerCase().includes("amla") ||
    plant.toLowerCase().includes("turmeric") ||
    plant.toLowerCase().includes("mint");
  return {
    isToxic: geminiSaysToxic,
    needsCaution: !!vision.caution,
    ayushRecognized: isAyush,
  };
}

/**
 * Full identify flow: plant gate → ML (TTA) → optional Gemini arbitration → plant info.
 */
export async function runIdentifyPipeline(base64: string): Promise<IdentifyPipelineResult> {
  const isPlant = await verifyIsPlant(base64);
  if (!isPlant) {
    throw new Error("NOT_A_PLANT");
  }

  const prediction = await classifyPlant(base64, true);
  const top = prediction.top_prediction;

  let finalPlant: string;
  let finalConfidence: number;
  let geminiWon: boolean;
  let source: IdentifySource;
  let reasoning: string;
  let plantCare: string | null;
  let aboutPlant: string | null;
  let isToxic: boolean;
  let needsCaution: boolean;
  let ayushRecognized: boolean;
  let className: string;

  if (top.confidence >= ML_CONFIDENCE_THRESHOLD) {
    finalPlant = top.display_name;
    finalConfidence = top.confidence;
    geminiWon = false;
    source = "ML";
    reasoning = `Identified as ${top.display_name} by our high-confidence EfficientNetV2S neural model based on structural leaf pattern matching.`;
    isToxic = top.is_toxic;
    needsCaution = top.needs_caution;
    ayushRecognized = top.ayush_recognized;
    plantCare = inferPlantCare(top.display_name);
    aboutPlant = localAboutPlant(top.display_name);
    className = top.class_name;
  } else {
    const visionResult = await verifyPlantWithVision(
      base64,
      top.display_name,
      top.class_name,
      top.confidence,
    );

    if (visionResult.geminiPlant === "NOT_A_PLANT") {
      throw new Error("NOT_A_PLANT");
    }

    const { plant, confidence, geminiWon: gWon } = arbitrate(
      top.confidence,
      top.display_name,
      visionResult.geminiPlant,
      visionResult.geminiConfidence,
      visionResult.agrees,
    );

    finalPlant = plant;
    finalConfidence = confidence;
    geminiWon = gWon;
    source = "AI+ML";
    reasoning =
      visionResult.reasoning ||
      "Visual observation successfully processed via dual AI+ML arbitration.";
    plantCare = visionResult.plant_care || "Moderate";
    aboutPlant = visionResult.about_plant || null;
    className = gWon ? "" : top.class_name;

    if (gWon) {
      const flags = applyGeminiWonFlags(plant, visionResult);
      isToxic = flags.isToxic;
      needsCaution = flags.needsCaution;
      ayushRecognized = flags.ayushRecognized;
    } else {
      const geminiSaysToxic = visionResult.is_toxic === true || !!visionResult.caution;
      isToxic = top.is_toxic || geminiSaysToxic;
      needsCaution = top.needs_caution || !!visionResult.caution;
      ayushRecognized = top.ayush_recognized;
    }
  }

  let plantInfo: PlantInfo | null = null;
  try {
    plantInfo = await getPlantInfo(
      finalPlant,
      geminiWon ? undefined : top.class_name.replace(/_/g, " "),
      geminiWon ? undefined : top.class_name,
      isToxic,
    );
  } catch {
    /* optional */
  }

  return {
    mlResult: prediction,
    finalPlant,
    finalConfidence,
    geminiWon,
    source,
    reasoning,
    plantCare,
    aboutPlant,
    isToxic,
    needsCaution,
    ayushRecognized,
    className,
    plantInfo,
    notAPlant: false,
  };
}
