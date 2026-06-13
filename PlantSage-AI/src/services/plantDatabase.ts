/**
 * plantDatabase.ts
 * Loads plant_db.json (built from PFAF dataset) and provides a lookup
 * by class name (e.g. "tulsi", "neem") or common/scientific name.
 */

import PLANT_DB_RAW from "../data/plant_db.json";

export interface PFAFEntry {
  scientific_name: string;
  common_name: string;
  summary: string;
  medicinal_properties: string[];   // ["Antifungal", "Antiseptic", ...]
  medicinal_rating: number;         // 0-5
  edible_uses: string;
  known_hazards: string;
  other_uses: string;
  native_range?: string;            // optional — stubs may not have it
  pfaf_url: string;
  is_in_pfaf: boolean;
}

const PLANT_DB = PLANT_DB_RAW as unknown as Record<string, PFAFEntry>;

/**
 * Look up a plant by its ML class name (e.g. "tulsi", "neem")
 */
export function getPlantByClass(className: string): PFAFEntry | null {
  const key = className.toLowerCase().replace(/[\s-]/g, "_");
  const entry = PLANT_DB[key];
  if (!entry || !entry.is_in_pfaf) return null;
  return entry;
}

/**
 * Look up by common or scientific name (fuzzy, case-insensitive).
 * Used when we only have the Gemini-identified plant name.
 */
export function getPlantByName(name: string): PFAFEntry | null {
  const needle = name.toLowerCase();
  for (const entry of Object.values(PLANT_DB)) {
    if (!entry.is_in_pfaf) continue;
    if (
      entry.common_name.toLowerCase().includes(needle) ||
      entry.scientific_name.toLowerCase().includes(needle)
    ) {
      return entry;
    }
  }
  return null;
}

/**
 * Convert PFAF medicinal_properties list into readable use-case descriptions.
 * Groups raw property terms into meaningful categories.
 */
export function buildUsesFromPFAF(props: string[]): { condition: string; description: string }[] {
  type Category = { condition: string; keywords: string[]; description: string };

  const CATEGORIES: Category[] = [
    {
      condition: "Fever & Infections",
      keywords: ["antibacterial", "antiviral", "antimicrobial", "antiseptic", "febrifuge", "antipyretic"],
      description: "Helps fight bacterial and viral infections; traditionally used to reduce fever.",
    },
    {
      condition: "Digestive Health",
      keywords: ["carminative", "stomachic", "digestive", "antidiarrhoeal", "laxative", "appetizer"],
      description: "Aids digestion, relieves bloating, gas, and stomach cramps.",
    },
    {
      condition: "Respiratory Health",
      keywords: ["expectorant", "antiasthmatic", "bronchitis", "pulmonary", "pectoral"],
      description: "Helpful in cough, asthma, bronchitis, and respiratory congestion.",
    },
    {
      condition: "Anti-inflammatory & Pain",
      keywords: ["antiinflammatory", "anti-inflammatory", "analgesic", "anodyne", "antirheumatic", "antiarthritic"],
      description: "Reduces inflammation and pain, useful in arthritis and joint conditions.",
    },
    {
      condition: "Skin Health",
      keywords: ["skin", "vulnerary", "astringent", "emollient", "eczema", "dermatitis", "antipruritic"],
      description: "Used topically for wounds, skin infections, rashes, and inflammatory skin conditions.",
    },
    {
      condition: "Immunity & Vitality",
      keywords: ["adaptogen", "tonic", "immunomodulatory", "alterative", "nutritive", "stimulant"],
      description: "Strengthens the immune system and improves overall vitality and resilience.",
    },
    {
      condition: "Diuretic & Kidney Support",
      keywords: ["diuretic", "lithontripic", "urinary", "nephritis"],
      description: "Promotes healthy kidney function and urine flow; may help dissolve kidney stones.",
    },
    {
      condition: "Liver & Blood",
      keywords: ["hepatic", "depurative", "cholagogue", "haemostatic", "anticholesterolemic", "hypoglycaemic"],
      description: "Supports liver function, purifies blood, and may help regulate blood sugar and cholesterol.",
    },
    {
      condition: "Nervous System",
      keywords: ["nervine", "sedative", "antispasmodic", "epilepsy", "anticonvulsant"],
      description: "Calms the nervous system; traditionally used for anxiety, spasms, and epilepsy.",
    },
    {
      condition: "Women's Health",
      keywords: ["emmenagogue", "galactogogue", "uterine", "women's complaints", "contraceptive"],
      description: "Used in traditional medicine to support menstruation and women's reproductive health.",
    },
    {
      condition: "Wound Healing",
      keywords: ["vulnerary", "wound", "cicatrizant", "haemostatic"],
      description: "Promotes wound healing and helps stop bleeding.",
    },
    {
      condition: "Cancer & Antioxidant",
      keywords: ["cancer", "cytostatic", "antioxidant", "free radical"],
      description: "Contains compounds studied for antioxidant and potential anti-tumour properties.",
    },
  ];

  const lowerProps = props.map((p) => p.toLowerCase());
  const results: { condition: string; description: string }[] = [];

  for (const cat of CATEGORIES) {
    if (cat.keywords.some((kw) => lowerProps.some((p) => p.includes(kw)))) {
      results.push({ condition: cat.condition, description: cat.description });
    }
    if (results.length >= 7) break;
  }

  return results;
}
