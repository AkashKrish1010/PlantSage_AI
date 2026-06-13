/**
 * Plant Data Service - Provides local plant information
 */

import ayurgenixData from '../data/ayurgenix_data.json';
import { plantImages, hasPlantImage } from '../data/plantImages';

export interface PlantDetails {
  name: string;
  botanicalName?: string;
  image?: any;
  images?: any[];
  about: string;
  uses: string[];
  remedies: PlantRemedy[];
  doshas?: string;
  diet?: string;
  yoga?: string;
  prevention?: string;
  symptoms?: string;
  formulation?: string;
  ayushRecognized: boolean;
}

export interface PlantRemedy {
  title: string;
  ingredients: string[];
  preparation: string;
  dosage: string;
  forCondition: string;
}

// Hardcoded plant database
const plantDatabase: { [key: string]: PlantDetails } = {
  'Tulasi': {
    name: 'Tulasi (Holy Basil)',
    botanicalName: 'Ocimum sanctum',
    image: plantImages.Tulasi,
    about: 'Tulasi, known as Holy Basil, is one of the most sacred plants in India. Revered in Ayurveda for over 5,000 years.',
    uses: [
      'Boosts immunity and fights infections',
      'Reduces stress and anxiety',
      'Relieves respiratory conditions',
      'Lowers blood sugar levels',
    ],
    remedies: [
      {
        title: 'Tulasi Tea for Cold',
        ingredients: ['10-12 fresh Tulasi leaves', '1 cup water', '1 tsp honey'],
        preparation: 'Boil water with Tulasi leaves for 5 minutes. Strain and add honey.',
        dosage: 'Take 2-3 times daily',
        forCondition: 'Cold and cough',
      },
    ],
    ayushRecognized: true,
  },
  'Neem': {
    name: 'Neem',
    botanicalName: 'Azadirachta indica',
    image: plantImages.Neem,
    about: 'Neem is called Sarva Roga Nivarini - the curer of all ailments in Ayurveda.',
    uses: [
      'Purifies blood and detoxifies',
      'Treats skin conditions',
      'Controls blood sugar levels',
      'Boosts immunity',
    ],
    remedies: [
      {
        title: 'Neem Juice for Blood Purification',
        ingredients: ['10-12 fresh neem leaves', '1 glass water'],
        preparation: 'Crush neem leaves and extract juice. Mix with water.',
        dosage: 'Take on empty stomach once daily',
        forCondition: 'Blood purification',
      },
    ],
    ayushRecognized: true,
  },
  'Ashwagandha': {
    name: 'Ashwagandha',
    botanicalName: 'Withania somnifera',
    image: plantImages.Ashwagandha,
    about: 'Ashwagandha is one of the most powerful herbs in Ayurveda, known for restoring vitality.',
    uses: [
      'Reduces stress and anxiety',
      'Improves strength and stamina',
      'Enhances brain function',
      'Improves sleep quality',
    ],
    remedies: [
      {
        title: 'Ashwagandha Milk for Sleep',
        ingredients: ['1 tsp Ashwagandha powder', '1 cup warm milk', 'Honey'],
        preparation: 'Mix Ashwagandha powder in warm milk. Add honey.',
        dosage: 'Drink before bedtime',
        forCondition: 'Insomnia and stress',
      },
    ],
    ayushRecognized: true,
  },
};

export function getPlantDetails(plantName: string): PlantDetails | null {
  const normalized = plantName.trim();
  
  if (plantDatabase[normalized]) {
    return plantDatabase[normalized];
  }
  
  if (hasPlantImage(normalized)) {
    return {
      name: normalized,
      botanicalName: undefined,
      image: plantImages[normalized as keyof typeof plantImages],
      about: `${normalized} is a medicinal plant recognized in traditional Indian medicine.`,
      uses: ['Traditional medicinal uses', 'Consult practitioner for specific applications'],
      remedies: [],
      ayushRecognized: true,
    };
  }
  
  return null;
}

export function getAllPlants(): string[] {
  return Object.keys(plantDatabase);
}
