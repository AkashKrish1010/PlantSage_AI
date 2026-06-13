/**
 * Symptom to Plant Mapping Service
 * Uses the AyurGenixAI Dataset to map symptoms to Ayurvedic plants
 */

import ayurgenixData from '../data/ayurgenix_data.json';
import { plantImages, hasPlantImage } from '../data/plantImages';

export interface PlantRecommendation {
  plantName: string;
  botanicalName?: string;
  howItHelps: string;
  quickRemedy: string;
  dosage?: string;
  caution?: string;
  image?: any;
  disease: string;
  symptoms: string;
  doshas?: string;
  diet?: string;
  yoga?: string;
  prevention?: string;
  ayushRecognized?: boolean;
}

// Plant name normalization mapping
const plantNameMapping: { [key: string]: string } = {
  // Tulasi/Tulsi
  'tulsi': 'Tulasi',
  'holy basil': 'Tulasi',

  // Neem
  'neem': 'Neem',

  // Ashwagandha
  'ashwagandha': 'Ashwagandha',

  // Brahmi
  'brahmi': 'Brahmi',

  // Amla
  'amla': 'Amla',
  'indian gooseberry': 'Amla',

  // Curry Leaf
  'curry leaf': 'Curry_Leaf',
  'curry leaves': 'Curry_Leaf',

  // Mint
  'mint': 'Mint',
  'pudina': 'Mint',
  'peppermint': 'Mint',

  // Lemon
  'lemon': 'Lemon',
  'nimbu': 'Lemon',

  // Aloe Vera
  'aloe vera': 'Aloevera',
  'aloe': 'Aloevera',

  // Jasmine
  'jasmine': 'Jasmine',

  // Rose
  'rose': 'Rose',

  // Hibiscus
  'hibiscus': 'Hibiscus',

  // Henna
  'henna': 'Henna',

  // Betel
  'betel': 'Betel',
  'paan': 'Betel',

  // Mango
  'mango': 'Mango',

  // Guava
  'guava': 'Gauva',

  // Pomegranate
  'pomegranate': 'Pomegranate',
  'anar': 'Pomegranate',

  // Lemon grass
  'lemon grass': 'Lemon_grass',
  'lemongrass': 'Lemon_grass',

  // Pepper
  'pepper': 'Pepper',
  'black pepper': 'Pepper',

  // Basale
  'basale': 'Basale',

  // Papaya
  'papaya': 'Pappaya',

  // Bamboo
  'bamboo': 'Bamboo',

  // Castor
  'castor': 'Castor',

  // Ashoka
  'ashoka': 'Ashoka',

  // Insulin plant
  'insulin': 'Insulin',

  // Geranium
  'geranium': 'Geranium',
};

/**
 * Normalize plant name to match our image database
 */
function normalizePlantName(plantName: string): string | null {
  const normalized = plantName.toLowerCase().trim();
  
  // Direct match in mapping
  if (plantNameMapping[normalized]) {
    return plantNameMapping[normalized];
  }
  
  // Check if it exists in our image database
  const capitalizedName = plantName.trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('_');
  
  if (hasPlantImage(capitalizedName)) {
    return capitalizedName;
  }
  
  return null;
}

/**
 * Extract plant names from comma-separated Ayurvedic herbs string
 */
function extractPlantNames(herbsString: string): string[] {
  if (!herbsString) return [];
  
  return herbsString
    .split(',')
    .map(herb => herb.trim())
    .filter(herb => herb.length > 0);
}

/**
 * Search for plant recommendations by symptom
 */
export function searchBySymptom(symptomQuery: string): PlantRecommendation[] {
  const query = symptomQuery.toLowerCase().trim();
  const results: PlantRecommendation[] = [];
  const seenPlants = new Set<string>();

  // Search through the dataset
  for (const entry of ayurgenixData) {
    // Match against disease, symptoms, or related fields
    const disease = (entry.Disease || '').toLowerCase();
    const symptoms = (entry.Symptoms || '').toLowerCase();
    const ayurvedicHerbs = entry['Ayurvedic Herbs'] || '';
    
    if (
      disease.includes(query) ||
      symptoms.includes(query) ||
      disease === query ||
      symptoms.split(',').some((s: string) => s.trim().toLowerCase() === query)
    ) {
      // Extract plant names from Ayurvedic Herbs field
      const plantNames = extractPlantNames(ayurvedicHerbs);
      
      for (const plantName of plantNames) {
        const normalizedName = normalizePlantName(plantName);
        
        // Only add plants we have images for and haven't added yet
        if (normalizedName && !seenPlants.has(normalizedName)) {
          seenPlants.add(normalizedName);
          
          results.push({
            plantName: plantName,
            disease: entry.Disease || '',
            symptoms: entry.Symptoms || '',
            howItHelps: entry['Herbal/Alternative Remedies'] || `Helps with ${entry.Disease}`,
            quickRemedy: entry.Formulation || `Use ${plantName} as recommended`,
            dosage: entry.Formulation,
            caution: entry.Complications ? `Caution: ${entry.Complications}` : undefined,
            doshas: entry.Doshas,
            diet: entry['Diet and Lifestyle Recommendations'],
            yoga: entry['Yoga & Physical Therapy'],
            prevention: entry.Prevention,
            image: plantImages[normalizedName as keyof typeof plantImages],
            ayushRecognized: true,
          });
        }
      }
    }
  }

  return results;
}

/**
 * Get all unique symptoms from the dataset
 */
export function getAllSymptoms(): string[] {
  const symptomsSet = new Set<string>();
  
  for (const entry of ayurgenixData) {
    if (entry.Disease) {
      symptomsSet.add(entry.Disease);
    }
    if (entry.Symptoms) {
      const symptoms = entry.Symptoms.split(',').map((s: string) => s.trim());
      symptoms.forEach(s => symptomsSet.add(s));
    }
  }
  
  return Array.from(symptomsSet).sort();
}

/**
 * Get all diseases from the dataset
 */
export function getAllDiseases(): string[] {
  return ayurgenixData
    .map(entry => entry.Disease)
    .filter(Boolean)
    .sort();
}

/**
 * Get popular symptoms/diseases (ones with most plant recommendations)
 */
export function getPopularSymptoms(limit: number = 10): string[] {
  const symptomCount: { [key: string]: number } = {};
  
  for (const entry of ayurgenixData) {
    const disease = entry.Disease;
    if (disease) {
      const herbs = extractPlantNames(entry['Ayurvedic Herbs'] || '');
      symptomCount[disease] = herbs.length;
    }
  }
  
  return Object.entries(symptomCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([symptom]) => symptom);
}
