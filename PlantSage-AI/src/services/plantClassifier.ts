/**
 * plantClassifier.ts
 * Calls the local FastAPI / TFLite server to identify a plant from an image.
 *
 * Model: EfficientNetV2S  (plant_model.tflite, 20 MB)
 * Classes: 71 Indian medicinal plants
 * Accuracy: 96.6% val  |  98.4% TTA (4-pass augmentation)
 */

import { ML_SERVER_URL } from "../config";

export interface MLPrediction {
  rank:             number;
  class_name:       string;       // snake_case e.g. "tulsi"
  display_name:     string;       // Human-readable e.g. "Tulsi (Holy Basil)"
  confidence:       number;       // 0 – 100.0
  is_toxic:         boolean;
  needs_caution:    boolean;
  ayush_recognized: boolean;
  model_source?:    string;       // "EfficientNetV2S-v2"
}

export interface MLIdentifyResult {
  success:        boolean;
  top_prediction: MLPrediction;
  top5:           MLPrediction[];
  routing?:       string;         // "EfficientNetV2S (TTA 4 passes)" etc.
  message?:       string;         // toxic warning if applicable
}

/**
 * Send a base64-encoded image to the local ML server for plant identification.
 * @param base64Image  Raw base64 string (no data URI prefix)
 * @param useTTA       Enable Test-Time Augmentation for higher accuracy (~+2%)
 *                     Slightly slower (4 inference passes instead of 1).
 */
export async function classifyPlant(
  base64Image: string,
  useTTA = false,
): Promise<MLIdentifyResult> {
  const url = useTTA
    ? `${ML_SERVER_URL}/identify?tta=true`
    : `${ML_SERVER_URL}/identify`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ base64_image: base64Image }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`ML Server error ${response.status}: ${err}`);
  }

  return response.json();
}

/**
 * Check if the ML server is reachable and the v2 model is loaded.
 */
export async function checkServerHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${ML_SERVER_URL}/health`, {
      signal: AbortSignal.timeout(3000),  // 3 second timeout
    });
    const data = await response.json();
    return data.status === "ok";
  } catch {
    return false;
  }
}
