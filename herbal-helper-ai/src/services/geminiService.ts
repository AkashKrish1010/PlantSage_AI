/**
 * Gemini AI proxy — routes through VanaVaidhya/ml server (no API key in client).
 */

import { ML_SERVER_URL, WEB_CLIENT_SECRET } from "@/config";

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
  agrees: boolean;
  geminiPlant: string;
  geminiConfidence: "high" | "medium" | "low";
  reasoning: string;
  caution: string | null;
  plant_care?: "Easy" | "Moderate" | "Difficult";
  about_plant?: string;
  is_toxic?: boolean;
}

async function postToBackend<T>(path: string, body: object): Promise<T> {
  const token = localStorage.getItem("plantsage_access_token");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  } else {
    headers["X-Client-Secret"] = WEB_CLIENT_SECRET;
  }

  const response = await fetch(`${ML_SERVER_URL}${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Backend error ${response.status}: ${err}`);
  }
  return response.json();
}

export async function getPlantInfo(
  plantName: string,
  botanicalName?: string,
  classLabel?: string,
  isToxic?: boolean,
): Promise<PlantInfo> {
  return postToBackend<PlantInfo>("/ai/plant-info", {
    plant_name: plantName,
    botanical_name: botanicalName ?? null,
    class_label: classLabel ?? null,
    is_toxic: isToxic ?? false,
  });
}

export async function searchPlantsBySymptom(symptom: string): Promise<SymptomPlant[]> {
  return postToBackend<SymptomPlant[]>("/ai/symptom-search", { symptom });
}

export async function verifyIsPlant(base64Image: string): Promise<boolean> {
  try {
    const result = await postToBackend<{ is_plant: boolean }>("/ai/verify-plant", {
      base64_image: base64Image,
    });
    return result.is_plant === true;
  } catch {
    return true;
  }
}

export async function verifyPlantWithVision(
  base64Image: string,
  mlPlantName: string,
  mlClassName: string,
  mlConfidence: number,
): Promise<VisionVerifyResult> {
  try {
    return await postToBackend<VisionVerifyResult>("/ai/verify-vision", {
      base64_image: base64Image,
      ml_plant_name: mlPlantName,
      ml_class_name: mlClassName,
      ml_confidence: mlConfidence,
    });
  } catch {
    return {
      agrees: true,
      geminiPlant: mlPlantName,
      geminiConfidence: "low",
      reasoning: "Visual verification unavailable — ML prediction shown.",
      caution: null,
    };
  }
}
