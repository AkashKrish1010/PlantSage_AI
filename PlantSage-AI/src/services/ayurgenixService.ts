/**
 * ayurgenixService.ts
 *
 * Indexes the AyurGenix Ayurvedic dataset (446 disease records)
 * by herb name. Provides lookup of which diseases a plant is used for,
 * along with symptoms, doshas, diet, yoga, prevention, and formulation.
 */

import DATA from "../data/ayurgenix_data.json";

export interface AyurGenixEntry {
  disease: string;
  symptoms: string;
  doshas: string;
  formulation: string;
  diet: string;
  yoga: string;
  prevention: string;
}

type RawRow = {
  "Disease"?: string;
  "Symptoms"?: string;
  "Doshas"?: string;
  "Formulation"?: string;
  "Diet and Lifestyle Recommendations"?: string;
  "Yoga & Physical Therapy"?: string;
  "Prevention"?: string;
  "Ayurvedic Herbs"?: string;
};

// Build herb -> entries index at module load time (O(n) once)
const HERB_INDEX: Record<string, AyurGenixEntry[]> = {};

(DATA as RawRow[]).forEach((row) => {
  const rawHerbs = row["Ayurvedic Herbs"] || "";
  const herbs = rawHerbs
    .split(",")
    .map((h) => h.trim().toLowerCase())
    .filter((h) => h && h !== "none" && h !== "none specific");

  herbs.forEach((herb) => {
    if (!HERB_INDEX[herb]) HERB_INDEX[herb] = [];
    HERB_INDEX[herb].push({
      disease:     row["Disease"] || "",
      symptoms:    row["Symptoms"] || "",
      doshas:      row["Doshas"] || "",
      formulation: row["Formulation"] || "",
      diet:        row["Diet and Lifestyle Recommendations"] || "",
      yoga:        row["Yoga & Physical Therapy"] || "",
      prevention:  row["Prevention"] || "",
    });
  });
});

/**
 * Look up AyurGenix entries for a herb by name (fuzzy, case-insensitive).
 * Returns up to `limit` disease entries for the plant.
 */
export function getAyurGenixDataForHerb(
  plantName: string,
  limit = 6
): AyurGenixEntry[] {
  const needle = plantName.toLowerCase().trim();

  // Exact key match first
  if (HERB_INDEX[needle]) {
    return HERB_INDEX[needle].slice(0, limit);
  }

  // Partial match — herb name is contained in the key or vice versa
  for (const key of Object.keys(HERB_INDEX)) {
    if (key.includes(needle) || needle.includes(key)) {
      return HERB_INDEX[key].slice(0, limit);
    }
  }

  // Word-level match — any word in plantName matches any word in the key
  const words = needle.split(/\s+/).filter((w) => w.length > 3);
  for (const key of Object.keys(HERB_INDEX)) {
    if (words.some((w) => key.includes(w))) {
      return HERB_INDEX[key].slice(0, limit);
    }
  }

  return [];
}

/**
 * Returns all diseases associated with a plant (for the "Treats" section).
 */
export function getDiseasesForHerb(plantName: string): string[] {
  return getAyurGenixDataForHerb(plantName, 10)
    .map((e) => e.disease)
    .filter(Boolean);
}
