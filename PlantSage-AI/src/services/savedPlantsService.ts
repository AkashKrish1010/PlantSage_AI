import AsyncStorage from "@react-native-async-storage/async-storage";

export interface SavedPlant {
  id: string;            // uuid
  name: string;          // display name
  scientificName: string; // class_name (underscore form, cleaned)
  confidence: number;
  latitude: number;
  longitude: number;
  address?: string;      // reverse-geocoded friendly address
  savedAt: number;       // Date.now()
  imageUri?: string;     // local image path (optional)
}

const STORAGE_KEY = "vanaVaidhya_savedPlants_v1";

const MOCK_PLANTS: SavedPlant[] = [
  {
    id: "mock_tulsi",
    name: "Tulsi (Holy Basil)",
    scientificName: "Ocimum sanctum",
    confidence: 98.4,
    latitude: 12.971598,
    longitude: 77.594566,
    address: "Cubbon Park, Near Band Stand, Bengaluru, Karnataka",
    savedAt: Date.now() - 3600000 * 2, // 2 hours ago
    imageUri: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "mock_neem",
    name: "Neem",
    scientificName: "Azadirachta indica",
    confidence: 94.2,
    latitude: 18.520430,
    longitude: 73.856743,
    address: "Savitribai Phule Pune University, Botanical Garden, Pune, Maharashtra",
    savedAt: Date.now() - 3600000 * 24, // 1 day ago
    imageUri: "https://images.unsplash.com/photo-1596701062351-df5f8af54b86?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "mock_aloe",
    name: "Aloe Vera",
    scientificName: "Aloe barbadensis miller",
    confidence: 89.7,
    latitude: 9.931233,
    longitude: 76.267304,
    address: "Fort Kochi Beach Path, Kochi, Kerala",
    savedAt: Date.now() - 3600000 * 48, // 2 days ago
    imageUri: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?q=80&w=400&auto=format&fit=crop",
  }
];

/** Load all saved plants (newest first) */
export async function getSavedPlants(): Promise<SavedPlant[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed with mock data if no storage exists
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_PLANTS));
      return MOCK_PLANTS;
    }
    const parsed: SavedPlant[] = JSON.parse(raw);
    // If the storage exists but is explicitly empty (e.g. user deleted all),
    // we return the empty list so they can clear the screen.
    return parsed.sort((a, b) => b.savedAt - a.savedAt);
  } catch {
    return [];
  }
}

/** Save a new plant location entry */
export async function savePlantLocation(plant: Omit<SavedPlant, "id">): Promise<SavedPlant> {
  const id = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const entry: SavedPlant = { id, ...plant };
  const existing = await getSavedPlants();
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([entry, ...existing]));
  return entry;
}

/** Remove a saved plant by id */
export async function removeSavedPlant(id: string): Promise<void> {
  const existing = await getSavedPlants();
  const updated = existing.filter((p) => p.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

/** Check if any plant with same name is saved within 100m of given coords */
export async function isDuplicateNearby(
  name: string,
  lat: number,
  lon: number,
  radiusMeters = 100
): Promise<boolean> {
  const plants = await getSavedPlants();
  return plants.some((p) => {
    if (p.name.toLowerCase() !== name.toLowerCase()) return false;
    const dist = haversine(lat, lon, p.latitude, p.longitude);
    return dist < radiusMeters;
  });
}

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000; // metres
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const dPhi = ((lat2 - lat1) * Math.PI) / 180;
  const dLambda = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dPhi / 2) ** 2 +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(dLambda / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
