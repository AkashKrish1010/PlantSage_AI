/**
 * Calls the VanaVaidhya FastAPI ML server for plant identification.
 * Server lives in VanaVaidhya/ml — not modified by this app.
 */

import { ML_SERVER_URL, WEB_CLIENT_SECRET } from "@/config";

export interface MLPrediction {
  rank: number;
  class_name: string;
  display_name: string;
  confidence: number;
  is_toxic: boolean;
  needs_caution: boolean;
  ayush_recognized: boolean;
  model_source?: string;
}

export interface MLIdentifyResult {
  success: boolean;
  top_prediction: MLPrediction;
  top5: MLPrediction[];
  routing?: string;
  message?: string;
}

export async function classifyPlant(
  base64Image: string,
  useTTA = false,
): Promise<MLIdentifyResult> {
  const url = useTTA
    ? `${ML_SERVER_URL}/identify?tta=true`
    : `${ML_SERVER_URL}/identify`;

  const token = localStorage.getItem("plantsage_access_token");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  } else {
    headers["X-Client-Secret"] = WEB_CLIENT_SECRET;
  }

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ base64_image: base64Image }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`ML Server error ${response.status}: ${err}`);
  }

  return response.json();
}

export async function checkServerHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${ML_SERVER_URL}/health`, {
      signal: AbortSignal.timeout(3000),
    });
    const data = await response.json();
    return data.status === "ok";
  } catch {
    return false;
  }
}
