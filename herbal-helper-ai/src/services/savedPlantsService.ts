/**
 * Saved plant locations (browser localStorage).
 * Mirrors VanaVaidhya savedPlantsService — separate storage key for this web app.
 */

export interface SavedPlant {
  id: string;
  name: string;
  scientificName: string;
  confidence: number;
  latitude: number;
  longitude: number;
  address?: string;
  savedAt: number;
  imageUri?: string;
}

const STORAGE_KEY = "herbalHelper_savedPlants_v1";

const MOCK_PLANTS: SavedPlant[] = [
  {
    id: "mock_tulsi",
    name: "Tulsi (Holy Basil)",
    scientificName: "Ocimum sanctum",
    confidence: 98.4,
    latitude: 12.971598,
    longitude: 77.594566,
    address: "Cubbon Park, Near Band Stand, Bengaluru, Karnataka",
    savedAt: Date.now() - 3600000 * 2,
    imageUri:
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=320&auto=format&fit=crop",
  },
  {
    id: "mock_neem",
    name: "Neem",
    scientificName: "Azadirachta indica",
    confidence: 94.2,
    latitude: 18.52043,
    longitude: 73.856743,
    address: "Savitribai Phule Pune University, Botanical Garden, Pune, Maharashtra",
    savedAt: Date.now() - 3600000 * 24,
    imageUri:
      "https://images.unsplash.com/photo-1596701062351-df5f8af54b86?q=80&w=320&auto=format&fit=crop",
  },
];

function readStorage(): SavedPlant[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_PLANTS));
      return MOCK_PLANTS;
    }
    const parsed: SavedPlant[] = JSON.parse(raw);
    return parsed.sort((a, b) => b.savedAt - a.savedAt);
  } catch {
    return [];
  }
}

export async function getSavedPlants(): Promise<SavedPlant[]> {
  return readStorage();
}

export async function savePlantLocation(
  plant: Omit<SavedPlant, "id">,
): Promise<SavedPlant> {
  const id = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const entry: SavedPlant = { id, ...plant };
  const existing = readStorage();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([entry, ...existing]));
  return entry;
}

export async function removeSavedPlant(id: string): Promise<void> {
  const existing = readStorage();
  const updated = existing.filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export async function isDuplicateNearby(
  name: string,
  lat: number,
  lon: number,
  radiusMeters = 100,
): Promise<boolean> {
  const plants = readStorage();
  return plants.some((p) => {
    if (p.name.toLowerCase() !== name.toLowerCase()) return false;
    return haversine(lat, lon, p.latitude, p.longitude) < radiusMeters;
  });
}

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000;
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const dPhi = ((lat2 - lat1) * Math.PI) / 180;
  const dLambda = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dPhi / 2) ** 2 +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(dLambda / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function openGoogleMaps(lat: number, lon: number, label: string) {
  const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}&travelmode=walking`;
  window.open(url, "_blank", "noopener,noreferrer");
}
