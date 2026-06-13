/**
 * plantCacheService.ts
 *
 * Permanently caches PlantInfo objects in AsyncStorage.
 * Key: normalised plant name (lowercase, spaces → underscores)
 * Once written, the entry is never re-fetched — plant data doesn't change.
 *
 * Cache key format:  "vv_plant_v2_<normalised_name>"
 * (v2 suffix lets us bust old entries if the PlantInfo schema changes)
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { PlantInfo } from "./geminiService";

const CACHE_PREFIX = "vv_plant_v2_";

function cacheKey(plantName: string): string {
  return CACHE_PREFIX + plantName.toLowerCase().replace(/\s+/g, "_");
}

/** Returns cached PlantInfo or null if not cached yet */
export async function getCachedPlant(plantName: string): Promise<PlantInfo | null> {
  try {
    const raw = await AsyncStorage.getItem(cacheKey(plantName));
    if (!raw) return null;
    return JSON.parse(raw) as PlantInfo;
  } catch {
    return null;
  }
}

/** Permanently saves PlantInfo to the cache */
export async function cachePlant(plantName: string, info: PlantInfo): Promise<void> {
  try {
    await AsyncStorage.setItem(cacheKey(plantName), JSON.stringify(info));
  } catch {
    // Silent — cache failure is non-fatal
  }
}

/** Remove a single plant from cache (useful for "Refresh" / dev tools) */
export async function clearCachedPlant(plantName: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(cacheKey(plantName));
  } catch {}
}

/** List all cached plant names */
export async function listCachedPlants(): Promise<string[]> {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys
      .filter((k) => k.startsWith(CACHE_PREFIX))
      .map((k) => k.slice(CACHE_PREFIX.length).replace(/_/g, " "));
  } catch {
    return [];
  }
}

/** Clear the entire plant cache */
export async function clearAllPlantCache(): Promise<void> {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const plantKeys = keys.filter((k) => k.startsWith(CACHE_PREFIX));
    if (plantKeys.length > 0) await AsyncStorage.multiRemove(plantKeys);
  } catch {}
}
