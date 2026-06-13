import React, { useMemo, useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Platform,
  RefreshControl,
  Animated,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useThemeColors } from "../src/context/ThemeContext";
import { AppColors, radius, spacing } from "../src/theme";
import BottomNav from "../src/components/BottomNav";
import { getSavedPlants, removeSavedPlant, SavedPlant } from "../src/services/savedPlantsService";
import SwipeTabWrapper from "../src/components/SwipeTabWrapper";
import { plantImages } from "../src/data/plantImages";
import { useAlert } from "../src/context/AlertContext";

function formatDate(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatTime(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

function openGoogleMaps(lat: number, lon: number, label: string) {
  const encodedLabel = encodeURIComponent(label);
  const url = Platform.select({
    ios: `maps:?q=${encodedLabel}&ll=${lat},${lon}`,
    android: `geo:${lat},${lon}?q=${lat},${lon}(${encodedLabel})`,
    default: `https://maps.google.com/?q=${lat},${lon}`,
  });
  // Always try Google Maps app first, fallback to browser
  const googleMapsApp = `comgooglemaps://?q=${lat},${lon}&zoom=17`;
  const webUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}&travelmode=walking`;

  if (Platform.OS === "ios") {
    Linking.canOpenURL(googleMapsApp)
      .then((supported) => Linking.openURL(supported ? googleMapsApp : webUrl))
      .catch(() => Linking.openURL(webUrl));
  } else {
    Linking.openURL(url || webUrl).catch(() => Linking.openURL(webUrl));
  }
}

// Map names/scientific names to exact plantImages keys
const plantImageKeys: Record<string, keyof typeof plantImages> = {
  aloe_vera: "Aloevera",
  aloe: "Aloevera",
  amla: "Amla",
  amruthaballi: "Amruta_Balli",
  arali: "Arali",
  ashoka: "Ashoka",
  ashwagandha: "Ashwagandha",
  avacado: "Avacado",
  bamboo: "Bamboo",
  basale: "Basale",
  betel: "Betel",
  betel_nut: "Betel_Nut",
  brahmi: "Brahmi",
  castor: "Castor",
  curry_leaf: "Curry_Leaf",
  doddpathre: "Doddapatre",
  doddapatre: "Doddapatre",
  ekka: "Ekka",
  ganike: "Ganike",
  gauva: "Gauva",
  guava: "Gauva",
  geranium: "Geranium",
  henna: "Henna",
  hibiscus: "Hibiscus",
  honge: "Honge",
  insulin: "Insulin",
  jasmine: "Jasmine",
  lemon: "Lemon",
  lemongrass: "Lemon_grass",
  lemon_grass: "Lemon_grass",
  mango: "Mango",
  mint: "Mint",
  nagadali: "Nagadali",
  neem: "Neem",
  nithyapushpa: "Nithyapushpa",
  catharanthus: "Nithyapushpa",
  nooni: "Nooni",
  pappaya: "Pappaya",
  papaya: "Pappaya",
  pepper: "Pepper",
  pomegranate: "Pomegranate",
  raktachandini: "Raktachandini",
  rose: "Rose",
  sapota: "Sapota",
  tulsi: "Tulasi",
  tulasi: "Tulasi",
  wood_sorel: "Wood_sorel",

  // ─── 31 Species without direct local asset (mapped to closest visual cousins) ───
  asthma_weed: "Wood_sorel",
  badipala: "Honge",
  balloon_vine: "Amruta_Balli",
  bringaraja: "Brahmi",
  bhringraj: "Brahmi",
  camphor: "Honge",
  caricature: "Geranium",
  chakte: "Honge",
  citron_lime: "Lemon",
  common_rue: "Wood_sorel",
  coriander: "Mint",
  dhaniya: "Mint",
  custard_apple: "Mango",
  eucalyptus: "Neem",
  ganigale: "Arali",
  gasagase: "Wood_sorel",
  poppy: "Wood_sorel",
  ginger: "Mint",
  adrak: "Mint",
  globe_amaranth: "Geranium",
  harsingar: "Jasmine",
  parijat: "Jasmine",
  jackfruit: "Sapota",
  kamakasturi: "Tulasi",
  kambajala: "Honge",
  kasambruga: "Ganike",
  kepala: "Arali",
  lantana: "Geranium",
  malabar_nut: "Doddapatre",
  marigold: "Hibiscus",
  genda: "Hibiscus",
  moringa: "Neem",
  drumstick: "Neem",
  nelavembu: "Brahmi",
  kalmegh: "Brahmi",
  nerale: "Mango",
  jamun: "Mango",
  padri: "Honge",
  sampige: "Jasmine",
  champak: "Jasmine",
  tamarind: "Neem",
  tecoma: "Arali",
  thumbe: "Mint",
  turmeric: "Doddapatre",
  haldi: "Doddapatre",
};

function getSavedPlantImage(plant: SavedPlant) {
  // 1. Try local/captured custom image first
  if (plant.imageUri && (plant.imageUri.startsWith("file://") || plant.imageUri.startsWith("content://"))) {
    return { uri: plant.imageUri };
  }
  
  // 2. Map via hardcoded mapping first
  const classKey = plant.scientificName.toLowerCase().replace(/[\s-]/g, "_");
  const nameKey = plant.name.toLowerCase().replace(/[\s-]/g, "_");
  
  let key = plantImageKeys[classKey] || plantImageKeys[nameKey];
  
  if (!key) {
    // Try fuzzy match in plantImageKeys
    for (const [k, v] of Object.entries(plantImageKeys)) {
      if (nameKey.includes(k) || k.includes(nameKey) || classKey.includes(k) || k.includes(classKey)) {
        key = v;
        break;
      }
    }
  }
  
  // 3. If mapped key found and exists in plantImages, use it
  if (key && plantImages[key]) {
    return plantImages[key];
  }
  
  // 4. Smart generic search directly against plantImages keys
  const cleanName = plant.name.toLowerCase().replace(/[^a-z0-9]/g, "");
  const cleanSci = plant.scientificName.toLowerCase().replace(/[^a-z0-9]/g, "");
  
  const directKey = Object.keys(plantImages).find(k => {
    const cleanK = k.toLowerCase().replace(/[^a-z0-9]/g, "");
    return (
      cleanName.includes(cleanK) || 
      cleanK.includes(cleanName) || 
      cleanSci.includes(cleanK) || 
      cleanK.includes(cleanSci)
    );
  }) as keyof typeof plantImages | undefined;
  
  if (directKey && plantImages[directKey]) {
    return plantImages[directKey];
  }
  
  // 5. Try the remote URI (e.g. mock images or unsplash)
  if (plant.imageUri) {
    return { uri: plant.imageUri };
  }
  
  return null;
}

function PlantCard({
  plant,
  colors,
  styles,
  onDelete,
}: {
  plant: SavedPlant;
  colors: AppColors;
  styles: ReturnType<typeof makeStyles>;
  onDelete: (id: string) => void;
}) {
  const { showAlert } = useAlert();
  const [expanded, setExpanded] = useState(false);
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const imgSource = getSavedPlantImage(plant);

  const handlePressIn = () =>
    Animated.spring(scaleAnim, { toValue: 0.97, useNativeDriver: true, speed: 50 }).start();
  const handlePressOut = () =>
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 40 }).start();

  const confirmDelete = () => {
    showAlert(
      "Remove Saved Plant",
      `Remove ${plant.name} from your saved locations?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Remove", style: "destructive", onPress: () => onDelete(plant.id) },
      ]
    );
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() => setExpanded((e) => !e)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {/* Top row */}
        <View style={styles.cardTop}>
          <View style={styles.cardThumb}>
            {imgSource ? (
              <Image source={imgSource} style={styles.thumbImage} />
            ) : (
              <LinearGradient
                colors={[colors.primaryLight, colors.primarySoft as any]}
                style={styles.thumbGrad}
              >
                <Ionicons name="leaf" size={22} color={colors.primary} />
              </LinearGradient>
            )}
          </View>

          <View style={styles.cardInfo}>
            <Text style={styles.cardName} numberOfLines={1}>{plant.name}</Text>
            <Text style={styles.cardSci} numberOfLines={1}>{plant.scientificName}</Text>
            <View style={styles.metaRow}>
              <Ionicons name="calendar-outline" size={11} color={colors.textMuted} />
              <Text style={styles.metaText}>{formatDate(plant.savedAt)}</Text>
              <Text style={styles.metaDot}>·</Text>
              <Ionicons name="time-outline" size={11} color={colors.textMuted} />
              <Text style={styles.metaText}>{formatTime(plant.savedAt)}</Text>
            </View>
          </View>

          <View style={styles.cardActions}>
            <View style={styles.confPill}>
              <Text style={styles.confNum}>{plant.confidence.toFixed(0)}%</Text>
            </View>
            <TouchableOpacity onPress={confirmDelete} style={styles.deleteBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Ionicons name="trash-outline" size={15} color={colors.danger} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Location row — always visible */}
        <View style={styles.locRow}>
          <Ionicons name="location" size={13} color={colors.primary} />
          <Text style={styles.locText} numberOfLines={expanded ? undefined : 1}>
            {plant.address ?? `${plant.latitude.toFixed(5)}, ${plant.longitude.toFixed(5)}`}
          </Text>
        </View>

        {/* Expanded detail */}
        {expanded && (
          <View style={styles.expandedSection}>
            <View style={styles.coordsBox}>
              <View style={styles.coordItem}>
                <Text style={styles.coordLabel}>LATITUDE</Text>
                <Text style={styles.coordVal}>{plant.latitude.toFixed(6)}</Text>
              </View>
              <View style={styles.coordDivider} />
              <View style={styles.coordItem}>
                <Text style={styles.coordLabel}>LONGITUDE</Text>
                <Text style={styles.coordVal}>{plant.longitude.toFixed(6)}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Get Directions CTA */}
        <TouchableOpacity
          style={styles.directionsBtn}
          onPress={() => openGoogleMaps(plant.latitude, plant.longitude, plant.name)}
          activeOpacity={0.85}
        >
          <Ionicons name="navigate" size={15} color="#fff" />
          <Text style={styles.directionsBtnText}>Get Directions</Text>
          <Ionicons name="open-outline" size={13} color="rgba(255,255,255,0.75)" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function SavedPlantsScreen() {
  const colors = useThemeColors();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const router = useRouter();
  const [plants, setPlants] = useState<SavedPlant[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    const data = await getSavedPlants();
    setPlants(data);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  const handleDelete = useCallback(async (id: string) => {
    await removeSavedPlant(id);
    setPlants((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <SwipeTabWrapper>
      <View style={styles.root}>
        {/* Header */}
        <LinearGradient
          colors={[colors.herbDark, colors.primary]}
          style={styles.headerGrad}
        >
          <SafeAreaView edges={["top"]}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.backBtn}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="arrow-back" size={22} color="#f6f2ea" />
              </TouchableOpacity>
              <View style={styles.headerText}>
                <Text style={styles.headerTitle}>Saved Locations</Text>
                <Text style={styles.headerSub}>
                  {plants.length === 0
                    ? "No plants saved yet"
                    : `${plants.length} plant${plants.length === 1 ? "" : "s"} saved`}
                </Text>
              </View>
              <View style={styles.countBadge}>
                <Text style={styles.countNum}>{plants.length}</Text>
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={colors.primary}
              colors={[colors.primary]}
            />
          }
        >
          {plants.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Ionicons name="location-outline" size={48} color={colors.textMuted} />
              </View>
              <Text style={styles.emptyTitle}>No saved plants yet</Text>
              <Text style={styles.emptySub}>
                Scan a plant and tap "Save Location" to remember where you found it.
              </Text>
              <TouchableOpacity
                style={styles.emptyBtn}
                onPress={() => router.push("/identify")}
                activeOpacity={0.85}
              >
                <Ionicons name="camera" size={16} color="#fff" />
                <Text style={styles.emptyBtnText}>Scan a Plant</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {/* Section label */}
              <View style={styles.sectionHeader}>
                <Ionicons name="map-outline" size={14} color={colors.textMuted} />
                <Text style={styles.sectionLabel}>PLANT LOCATIONS</Text>
              </View>

              {plants.map((plant) => (
                <PlantCard
                  key={plant.id}
                  plant={plant}
                  colors={colors}
                  styles={styles}
                  onDelete={handleDelete}
                />
              ))}

              <View style={{ height: 24 }} />
            </>
          )}

          <View style={{ height: 110 }} />
        </ScrollView>

        <BottomNav />
      </View>
    </SwipeTabWrapper>
  );
}

function makeStyles(colors: AppColors) {
  const isDark = colors.background === "#0e1a13";
  return StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.background },

    headerGrad: { paddingBottom: spacing.lg },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
      gap: spacing.md,
    },
    backBtn: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: "rgba(246,242,234,0.14)",
      alignItems: "center",
      justifyContent: "center",
    },
    headerText: { flex: 1 },
    headerTitle: {
      fontSize: 22,
      fontWeight: "800",
      color: "#f6f2ea",
      letterSpacing: -0.3,
    },
    headerSub: {
      fontSize: 12,
      color: "rgba(246,242,234,0.72)",
      marginTop: 2,
    },
    countBadge: {
      minWidth: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: "rgba(246,242,234,0.18)",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 8,
    },
    countNum: {
      fontSize: 16,
      fontWeight: "800",
      color: "#f6f2ea",
    },

    scrollContent: {
      paddingHorizontal: spacing.md,
      paddingTop: spacing.md,
      flexGrow: 1,
    },

    // Section header
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginBottom: spacing.sm,
      paddingLeft: 2,
    },
    sectionLabel: {
      fontSize: 11,
      fontWeight: "700",
      color: colors.textMuted,
      letterSpacing: 1.2,
    },

    // Plant card
    card: {
      backgroundColor: colors.surface,
      borderRadius: radius.xl,
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.md,
      marginBottom: spacing.sm,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: isDark ? 0.18 : 0.06,
      shadowRadius: 12,
      elevation: isDark ? 8 : 4,
    },
    cardTop: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm,
      marginBottom: spacing.sm,
    },
    cardThumb: { flexShrink: 0 },
    thumbImage: {
      width: 52,
      height: 52,
      borderRadius: radius.md,
      backgroundColor: colors.surface,
    },
    thumbGrad: {
      width: 52,
      height: 52,
      borderRadius: radius.md,
      alignItems: "center",
      justifyContent: "center",
    },
    cardInfo: { flex: 1, gap: 2 },
    cardName: {
      fontSize: 16,
      fontWeight: "800",
      color: colors.text,
      letterSpacing: -0.2,
    },
    cardSci: {
      fontSize: 12,
      fontStyle: "italic",
      color: colors.textMuted,
    },
    metaRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      marginTop: 3,
    },
    metaText: { fontSize: 11, color: colors.textMuted },
    metaDot: { fontSize: 11, color: colors.textMuted },

    cardActions: {
      alignItems: "flex-end",
      gap: 8,
      flexShrink: 0,
    },
    confPill: {
      backgroundColor: colors.primarySoft,
      borderRadius: radius.full,
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
    confNum: {
      fontSize: 13,
      fontWeight: "700",
      color: colors.primary,
    },
    deleteBtn: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: isDark ? "rgba(248,113,113,0.1)" : "rgba(220,38,38,0.07)",
      alignItems: "center",
      justifyContent: "center",
    },

    // Location
    locRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 5,
      backgroundColor: isDark ? "rgba(74,171,122,0.07)" : "rgba(45,106,79,0.06)",
      borderRadius: radius.sm,
      paddingHorizontal: 10,
      paddingVertical: 7,
      marginBottom: spacing.sm,
    },
    locText: {
      flex: 1,
      fontSize: 12,
      color: colors.text,
      lineHeight: 17,
    },

    // Expanded
    expandedSection: { marginBottom: spacing.sm },
    coordsBox: {
      flexDirection: "row",
      backgroundColor: isDark ? "rgba(240,236,228,0.04)" : "rgba(27,67,50,0.04)",
      borderRadius: radius.sm,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: "hidden",
    },
    coordItem: { flex: 1, padding: spacing.sm, alignItems: "center" },
    coordLabel: {
      fontSize: 9,
      fontWeight: "700",
      color: colors.textMuted,
      letterSpacing: 1,
      marginBottom: 3,
    },
    coordVal: {
      fontSize: 13,
      fontWeight: "600",
      color: colors.text,
      fontVariant: ["tabular-nums"],
    },
    coordDivider: { width: 1, backgroundColor: colors.border },

    // Directions
    directionsBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 7,
      height: 44,
      borderRadius: radius.full,
      backgroundColor: colors.primary,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
    directionsBtnText: {
      color: "#f6f2ea",
      fontWeight: "700",
      fontSize: 14,
    },

    // Empty state
    emptyState: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: spacing.xl,
      paddingTop: 60,
    },
    emptyIcon: {
      width: 96,
      height: 96,
      borderRadius: 48,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: spacing.lg,
    },
    emptyTitle: {
      fontSize: 20,
      fontWeight: "800",
      color: colors.text,
      letterSpacing: -0.3,
      marginBottom: spacing.sm,
    },
    emptySub: {
      fontSize: 14,
      color: colors.textMuted,
      textAlign: "center",
      lineHeight: 21,
      marginBottom: spacing.lg,
    },
    emptyBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingHorizontal: 28,
      height: 48,
      borderRadius: radius.full,
      backgroundColor: colors.primary,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
    emptyBtnText: {
      color: "#f6f2ea",
      fontWeight: "700",
      fontSize: 15,
    },
  });
}
