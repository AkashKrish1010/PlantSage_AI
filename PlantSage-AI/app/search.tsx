import React, { useMemo, useState } from "react";
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  ScrollView, Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useThemeColors } from "../src/context/ThemeContext";
import { AppColors, radius, spacing } from "../src/theme";
import BottomNav from "../src/components/BottomNav";
import { searchBySymptom, PlantRecommendation } from "../src/services/symptomMappingService";
import SwipeTabWrapper from "../src/components/SwipeTabWrapper";
import { SpinnerLarge } from "../src/components/Spinner";

const quickSymptoms = [
  "Cough", "Diabetes", "Hypertension", "Fever",
  "Headache", "Asthma", "Arthritis", "Skin Disease",
];

export default function SearchScreen() {
  const colors = useThemeColors();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PlantRecommendation[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const samplePlants = useMemo(() => {
    // Default suggestions shown before searching
    return [
      ...searchBySymptom("Cough").slice(0, 2),
      ...searchBySymptom("Fever").slice(0, 1),
      ...searchBySymptom("Headache").slice(0, 1),
    ].slice(0, 4);
  }, []);

  const doSearch = async (term: string) => {
    const q = term.trim();
    if (!q) return;
    setQuery(q);
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      // Use local dataset to search
      const plants = searchBySymptom(q);

      setResults(plants);

      if (plants.length === 0) {
        setError("No plants found for this symptom. Try a different search term.");
      }
    } catch (e: any) {
      setError(e.message || "Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults(null);
    setError(null);
  };

  const openPlant = (plant: PlantRecommendation) => {
    router.push({
      pathname: "/herb-detail/[id]",
      params: {
        id: encodeURIComponent(plant.plantName),
        botanical: plant.botanicalName || "",
      },
    } as any);
  };

  return (
    <SwipeTabWrapper>
      <View style={styles.root}>
        <SafeAreaView style={styles.safe} edges={['top']}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Header */}
            <View>
              <Text style={styles.title}>Search by Symptom</Text>
              <Text style={styles.subtitle}>
                Enter your symptoms to find Ayurvedic plant remedies from our database
              </Text>
            </View>

            {/* Search bar */}
            <View style={styles.searchBar}>
              <Ionicons name="search-outline" size={18} color={colors.textMuted} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={() => doSearch(query)}
                placeholder="e.g. headache, stomach pain, hair fall…"
                placeholderTextColor={colors.textMuted}
                style={styles.searchInput}
                returnKeyType="search"
              />
              {query.length > 0 && (
                <TouchableOpacity onPress={clearSearch}>
                  <Ionicons name="close-circle" size={18} color={colors.textMuted} />
                </TouchableOpacity>
              )}
            </View>

            {/* Search button */}
            {query.length > 0 && !loading && (
              <View>
                <TouchableOpacity
                  style={styles.searchBtn}
                  onPress={() => doSearch(query)}
                  activeOpacity={0.85}
                >
                  <Ionicons name="search" size={16} color="#fff" />
                  <Text style={styles.searchBtnText}>Search Remedies</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Quick symptom chips */}
            {!results && !loading && (
              <View>
                <Text style={styles.quickLabel}>Quick Symptoms</Text>
                <View style={styles.chipWrap}>
                  {quickSymptoms.map((s) => (
                    <TouchableOpacity
                      key={s}
                      style={styles.chip}
                      onPress={() => doSearch(s)}
                      activeOpacity={0.75}
                    >
                      <Text style={styles.chipText}>{s}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Sample plants (default state) */}
            {!results && !loading && query.trim().length === 0 && !error && samplePlants.length > 0 && (
              <View style={styles.resultsSection}>
                <Text style={styles.resultsHeader}>Suggested plants</Text>
                {samplePlants.map((plant, index) => (
                  <TouchableOpacity
                    key={`${plant.plantName}-${index}`}
                    style={styles.resultCard}
                    onPress={() => openPlant(plant)}
                    activeOpacity={0.82}
                  >
                    {/* Image + rank */}
                    <View style={styles.plantSwatch}>
                      {plant.image ? (
                        <Image source={plant.image} style={styles.plantImage} resizeMode="cover" />
                      ) : (
                        <View style={styles.plantImageFallback}>
                          <Ionicons name="leaf" size={20} color={colors.primary} />
                        </View>
                      )}
                      <View style={styles.rankBadge}>
                        <Text style={styles.plantRankWhite}>#{index + 1}</Text>
                      </View>
                    </View>

                    <View style={styles.plantInfo}>
                      <View style={styles.plantNameRow}>
                        <Text style={styles.plantName}>{plant.plantName}</Text>
                        {plant.ayushRecognized && (
                          <View style={styles.ayushDot}>
                            <Ionicons name="checkmark" size={9} color="#fff" />
                          </View>
                        )}
                      </View>
                      <Text style={styles.plantBotanical}>{plant.botanicalName}</Text>

                      <Text numberOfLines={2} style={styles.howHelps}>
                        {plant.howItHelps}
                      </Text>

                      <View style={styles.quickRemedyBox}>
                        <View style={styles.quickRemedyIcon}>
                          <Ionicons name="flask-outline" size={12} color={colors.primary} />
                        </View>
                        <Text style={styles.quickRemedyText} numberOfLines={2}>
                          {plant.quickRemedy}
                        </Text>
                      </View>

                      {plant.caution && (
                        <View style={styles.cautionBox}>
                          <Ionicons name="warning-outline" size={11} color={colors.saffron} />
                          <Text style={styles.cautionText} numberOfLines={1}>
                            {plant.caution}
                          </Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.chevronBubble}>
                      <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Loading */}
            {loading && (
              <View style={styles.loadingBox}>
                <SpinnerLarge color={colors.primary} size={32} />
                <Text style={styles.loadingText}>Searching Ayurvedic remedies…</Text>
                <Text style={styles.loadingSubText}>446 diseases in our database</Text>
              </View>
            )}

            {/* Error */}
            {error && (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle-outline" size={32} color={colors.danger} />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            {/* Results */}
            {results && results.length === 0 && (
              <View style={styles.emptyBox}>
                <Ionicons name="leaf-outline" size={40} color={colors.textMuted} />
                <Text style={styles.emptyTitle}>No plants found</Text>
                <Text style={styles.emptySub}>Try a different symptom or keyword</Text>
              </View>
            )}

            {results && results.length > 0 && (
              <View style={styles.resultsSection}>
                <Text style={styles.resultsHeader}>
                  {results.length} plants for "{query}"
                </Text>
                {results.map((plant, index) => (
                  <View
                    key={plant.plantName}
                  >
                    <TouchableOpacity
                      style={styles.resultCard}
                      onPress={() => openPlant(plant)}
                      activeOpacity={0.82}
                    >
                      {/* Rank & image */}
                      <View style={styles.plantSwatch}>
                        {plant.image ? (
                          <Image source={plant.image} style={styles.plantImage} resizeMode="cover" />
                        ) : (
                          <View style={styles.plantImageFallback}>
                            <Text style={styles.plantRank}>#{index + 1}</Text>
                            <Ionicons name="leaf" size={20} color={colors.primary} />
                          </View>
                        )}
                        <View style={styles.rankBadge}>
                          <Text style={styles.plantRankWhite}>#{index + 1}</Text>
                        </View>
                      </View>

                      <View style={styles.plantInfo}>
                        {/* Name row */}
                        <View style={styles.plantNameRow}>
                          <Text style={styles.plantName}>{plant.plantName}</Text>
                          {plant.ayushRecognized && (
                            <View style={styles.ayushDot}>
                              <Ionicons name="checkmark" size={9} color="#fff" />
                            </View>
                          )}
                        </View>
                        <Text style={styles.plantBotanical}>
                          {plant.botanicalName}
                        </Text>

                        {/* How it helps */}
                        <Text numberOfLines={2} style={styles.howHelps}>
                          {plant.howItHelps}
                        </Text>

                        {/* Quick remedy */}
                        <View style={styles.quickRemedyBox}>
                          <View style={styles.quickRemedyIcon}>
                            <Ionicons name="flask-outline" size={12} color={colors.primary} />
                          </View>
                          <Text style={styles.quickRemedyText} numberOfLines={2}>
                            {plant.quickRemedy}
                          </Text>
                        </View>

                        {/* Caution */}
                        {plant.caution && (
                          <View style={styles.cautionBox}>
                            <Ionicons name="warning-outline" size={11} color={colors.saffron} />
                            <Text style={styles.cautionText} numberOfLines={1}>
                              {plant.caution}
                            </Text>
                          </View>
                        )}

                        {/* Preparation tag */}
                        {plant.dosage && (
                          <View style={styles.prepRow}>
                            <View style={styles.prepTag}>
                              <Text style={styles.prepTagText}>
                                {plant.dosage}
                              </Text>
                            </View>
                          </View>
                        )}
                      </View>

                      <View style={styles.chevronBubble}>
                        <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}

                {/* Search again */}
                <TouchableOpacity style={styles.clearBtn} onPress={clearSearch}>
                  <Text style={styles.clearBtnText}>Search for another symptom</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={{ height: 100 }} />
          </ScrollView>
        </SafeAreaView>

        <BottomNav />
      </View>
    </SwipeTabWrapper>
  );
}

function makeStyles(colors: AppColors) {
  const isDark = colors.background === "#0e1a13";
  return StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  safe: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.lg, paddingTop: spacing.xl },

  title: { fontSize: 26, fontWeight: "700", color: colors.text, marginBottom: 4 },
  subtitle: { fontSize: 13, color: colors.textMuted, fontStyle: "italic", marginBottom: spacing.md, lineHeight: 19 },

  // Search bar
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    height: 52,
    marginBottom: spacing.sm,
    gap: 8,
  },
  searchInput: { flex: 1, fontSize: 15, color: colors.text },

  // Search button
  searchBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 48,
    borderRadius: radius.full,
    backgroundColor: colors.saffron,
    marginBottom: spacing.lg,
    shadowColor: colors.saffron,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 6,
    elevation: 4,
  },
  searchBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },

  // Quick chips
  quickLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  chipWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: spacing.lg },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipText: { fontSize: 13, color: colors.text, fontWeight: "500" },

  // Loading
  loadingBox: {
    alignItems: "center",
    paddingVertical: 48,
    gap: 12,
  },
  loadingText: { fontSize: 15, fontWeight: "600", color: colors.text },
  loadingSubText: { fontSize: 12, color: colors.textMuted },

  // Error
  errorBox: {
    alignItems: "center",
    paddingVertical: 32,
    gap: 10,
  },
  errorText: { fontSize: 14, color: colors.danger, textAlign: "center", lineHeight: 20 },

  // Empty
  emptyBox: {
    alignItems: "center",
    paddingVertical: 48,
    gap: 10,
  },
  emptyTitle: { fontSize: 18, fontWeight: "600", color: colors.textMuted },
  emptySub: { fontSize: 13, color: colors.textMuted },

  // Results
  resultsSection: { gap: 0 },
  resultsHeader: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textMuted,
    marginBottom: spacing.md,
    fontStyle: "italic",
  },

  resultCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.xl,
    padding: 14,
    marginBottom: spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: isDark ? 0.22 : 0.06,
    shadowRadius: 18,
    elevation: isDark ? 10 : 3,
  },

  plantSwatch: {
    width: 66,
    height: 66,
    borderRadius: radius.lg,
    backgroundColor: colors.primaryLight,
    flexShrink: 0,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: isDark ? "rgba(240,236,228,0.08)" : "rgba(0,0,0,0.04)",
  },
  plantImage: { width: "100%", height: "100%" },
  plantImageFallback: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  plantRank: { fontSize: 10, fontWeight: "700", color: colors.primary },
  rankBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 10,
  },
  plantRankWhite: { fontSize: 9, fontWeight: "700", color: "#fff" },

  plantInfo: { flex: 1, gap: 4 },
  plantNameRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  plantName: { fontSize: 16, fontWeight: "800", color: colors.text, letterSpacing: -0.2 },
  ayushDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  plantBotanical: { fontSize: 12, fontStyle: "italic", color: colors.textMuted },
  howHelps: { fontSize: 12, color: colors.textMuted, lineHeight: 17, marginTop: 1 },

  quickRemedyBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.primarySoft,
    borderRadius: radius.full,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginTop: 4,
    borderWidth: 1,
    borderColor: isDark ? "rgba(74,171,122,0.25)" : "rgba(45,106,79,0.14)",
  },
  quickRemedyIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: isDark ? "rgba(14,26,19,0.35)" : "rgba(255,255,255,0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  quickRemedyText: { flex: 1, fontSize: 11, color: colors.primary, lineHeight: 16, fontWeight: "600" },

  cautionBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 4,
  },
  cautionText: { flex: 1, fontSize: 11, color: colors.saffron, fontWeight: "600" },

  prepRow: { flexDirection: "row", marginTop: 4 },
  prepTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
    backgroundColor: colors.earthLight,
  },
  prepTagText: { fontSize: 10, color: colors.earth, fontWeight: "600" },

  chevronBubble: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: isDark ? "rgba(240,236,228,0.06)" : "rgba(0,0,0,0.04)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: isDark ? "rgba(240,236,228,0.08)" : "rgba(0,0,0,0.05)",
  },

  // Clear
  clearBtn: { alignItems: "center", paddingVertical: 14 },
  clearBtnText: { fontSize: 14, color: colors.primary, fontWeight: "600" },
  });
}
