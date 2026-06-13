import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useThemeColors } from "../src/context/ThemeContext";
import { AppColors, radius, spacing } from "../src/theme";
import BottomNav from "../src/components/BottomNav";
import AnimatedSection from "../src/components/AnimatedSection";
import SwipeTabWrapper from "../src/components/SwipeTabWrapper";
import { plantImages } from "../src/data/plantImages";

// Maps garden plant IDs → exact plantImages keys
const gardenImageKey: Record<string, keyof typeof plantImages> = {
  tulsi: "Tulasi",
  amla: "Amla",
  ashwagandha: "Ashwagandha",
  ginger: "Mint",          // closest available
  fennel: "Lemon_grass",   // closest available
  neem: "Neem",
  turmeric: "Doddapatre",  // closest available
  brahmi: "Brahmi",
  shatavari: "Amruta_Balli",// closest available
  giloy: "Amruta_Balli",
  aloe_vera: "Aloevera",
  mint: "Mint",
  curry_leaf: "Curry_Leaf",
  hibiscus: "Hibiscus",
  henna: "Henna",
  jasmine: "Jasmine",
  lemongrass: "Lemon_grass",
};

function getGardenThumb(id: string) {
  const key = gardenImageKey[id] ?? (id.charAt(0).toUpperCase() + id.slice(1)) as keyof typeof plantImages;
  return plantImages[key] ?? null;
}

const gardenCategories = [
  {
    id: "immunity",
    name: "Immunity",
    icon: "shield-checkmark-outline" as const,
    description: "Plants that strengthen the body's natural defences and boost vitality.",
    plants: [
      { id: "tulsi", name: "Tulsi", botanicalName: "Ocimum tenuiflorum", description: "Holy Basil — revered adaptogen for immunity and respiratory health." },
      { id: "amla", name: "Amla", botanicalName: "Phyllanthus emblica", description: "Indian Gooseberry, richest natural source of Vitamin C." },
      { id: "ashwagandha", name: "Ashwagandha", botanicalName: "Withania somnifera", description: "Adaptogen for vitality, stress balance, and immune resilience." },
      { id: "giloy", name: "Giloy", botanicalName: "Tinospora cordifolia", description: "Famous Ayurvedic immunomodulator, rejuvenates immune response and fights recurrent fevers." },
      { id: "neem", name: "Neem", botanicalName: "Azadirachta indica", description: "Purifies blood, stimulates antibody production, and supports overall immune defenses." },
    ],
  },
  {
    id: "digestion",
    name: "Digestion",
    icon: "nutrition-outline" as const,
    description: "Herbs that support the digestive system and gut health.",
    plants: [
      { id: "ginger", name: "Ginger", botanicalName: "Zingiber officinale", description: "Warming rhizome for digestion, nausea, and poor appetite." },
      { id: "fennel", name: "Fennel", botanicalName: "Foeniculum vulgare", description: "Sweet seeds that calm bloating, gas, and indigestion." },
      { id: "aloe_vera", name: "Aloe Vera", botanicalName: "Aloe barbadensis", description: "Soothing gel that supports stomach lining, digestion, and cools the gastrointestinal tract." },
      { id: "mint", name: "Mint", botanicalName: "Mentha spicata", description: "Refreshing carminative herb that relaxes stomach muscles and aids indigestion." },
      { id: "curry_leaf", name: "Curry Leaf", botanicalName: "Murraya koenigii", description: "Stomachic and digestive stimulant traditionally used for morning sickness and gut health." },
    ],
  },
  {
    id: "skin",
    name: "Skin Care",
    icon: "sparkles-outline" as const,
    description: "Plants used for healthy, glowing skin in Ayurveda.",
    plants: [
      { id: "neem", name: "Neem", botanicalName: "Azadirachta indica", description: "Purifies blood, fights acne and fungal skin infections." },
      { id: "turmeric", name: "Turmeric", botanicalName: "Curcuma longa", description: "Anti-inflammatory golden spice for glowing skin and complexion." },
      { id: "aloe_vera", name: "Aloe Vera", botanicalName: "Aloe barbadensis", description: "Soothing succulent gel for healing burns, moisturizing skin, and fighting acne." },
      { id: "hibiscus", name: "Hibiscus", botanicalName: "Hibiscus rosa-sinensis", description: "Antioxidant-rich flower that supports collagen production and enhances skin elasticity." },
      { id: "henna", name: "Henna", botanicalName: "Lawsonia inermis", description: "Cooling herb traditionally applied for scalp health, conditioning, and skin defense." },
    ],
  },
  {
    id: "stress",
    name: "Calm & Sleep",
    icon: "moon-outline" as const,
    description: "Herbs for relaxation, sleep, and managing anxiety.",
    plants: [
      { id: "brahmi", name: "Brahmi", botanicalName: "Bacopa monnieri", description: "Brain tonic for memory, focus, and reducing anxiety." },
      { id: "shatavari", name: "Shatavari", botanicalName: "Asparagus racemosus", description: "Balancing adaptogen for stress and hormonal harmony." },
      { id: "jasmine", name: "Jasmine", botanicalName: "Jasminum officinale", description: "Therapeutic floral aroma that calms the central nervous system and promotes sound sleep." },
      { id: "lemongrass", name: "Lemongrass", botanicalName: "Cymbopogon citratus", description: "Citrusy herb that acts as a natural sedative, relaxing tense muscles and soothing anxiety." },
      { id: "tulsi", name: "Tulsi", botanicalName: "Ocimum tenuiflorum", description: "Holy Basil adaptogen that reduces physical and emotional stress, bringing mental clarity." },
    ],
  },
];

export default function GardenScreen() {
  const colors = useThemeColors();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const router = useRouter();
  const [activeId, setActiveId] = useState(gardenCategories[0].id);
  const category = gardenCategories.find((c) => c.id === activeId)!;

  return (
    <SwipeTabWrapper>
      <View style={styles.root}>
        <SafeAreaView style={styles.safe} edges={['top']}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* ── Gradient header ─────────────────────────── */}
            <LinearGradient
              colors={[colors.herbDark, colors.primary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.headerGrad}
            >
              <View style={styles.orb} />
              <View style={styles.headerContent}>
                <Text style={styles.eyebrow}>VIRTUAL GARDEN</Text>
                <Text style={styles.title}>Herbal Collections</Text>
                <Text style={styles.subtitle}>
                  Curated medicinal plants by health category
                </Text>
              </View>
            </LinearGradient>

            {/* ── Category tabs ───────────────────────────── */}
            <AnimatedSection delay={80}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.tabsScroll}
                style={styles.tabsWrapper}
              >
                {gardenCategories.map((cat) => {
                  const isActive = cat.id === activeId;
                  return (
                    <TouchableOpacity
                      key={cat.id}
                      onPress={() => setActiveId(cat.id)}
                      style={[styles.tab, isActive && styles.tabActive]}
                      activeOpacity={0.8}
                    >
                      <Ionicons
                        name={cat.icon}
                        size={20}
                        color={isActive ? colors.primaryForeground : colors.textMuted}
                      />
                      <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                        {cat.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </AnimatedSection>

            {/* ── Category description ────────────────────── */}
            <AnimatedSection delay={120} style={styles.categoryDescWrapper}>
              <Text style={styles.categoryDesc} key={category.id}>
                {category.description}
              </Text>
            </AnimatedSection>

            {/* ── Plant cards ─────────────────────────────── */}
            {category.plants.map((plant, index) => (
              <AnimatedSection key={plant.id} delay={160 + index * 80} style={styles.cardWrapper}>
                <TouchableOpacity
                  style={styles.plantCard}
                  onPress={() =>
                    router.push({
                      pathname: "/herb-detail/[id]",
                      params: {
                        id: encodeURIComponent(plant.name),
                        className: plant.id,
                        botanical: encodeURIComponent(plant.botanicalName),
                      },
                    } as any)
                  }
                  activeOpacity={0.82}
                >
                  {/* Thumb */}
                  <View style={styles.plantThumb}>
                    {getGardenThumb(plant.id) ? (
                      <Image
                        source={getGardenThumb(plant.id)!}
                        style={styles.thumbImg}
                        resizeMode="cover"
                      />
                    ) : (
                      <LinearGradient
                        colors={[colors.primaryLight, colors.primarySoft as any]}
                        style={styles.thumbGrad}
                      >
                        <Ionicons name="leaf" size={28} color={colors.primary} />
                      </LinearGradient>
                    )}
                  </View>

                  {/* Info */}
                  <View style={styles.plantInfo}>
                    <Text style={styles.plantName}>{plant.name}</Text>
                    <Text style={styles.plantBotanical}>{plant.botanicalName}</Text>
                    <Text numberOfLines={2} style={styles.plantDesc}>
                      {plant.description}
                    </Text>
                    <View style={styles.partsRow}>
                      <View style={styles.partTag}><Text style={styles.partTagText}>Leaf</Text></View>
                      <View style={styles.partTag}><Text style={styles.partTagText}>Root</Text></View>
                    </View>
                  </View>

                  <View style={styles.arrowWrap}>
                    <Ionicons name="chevron-forward" size={16} color={colors.primary} />
                  </View>
                </TouchableOpacity>
              </AnimatedSection>
            ))}

            <View style={{ height: 100 }} />
          </ScrollView>
        </SafeAreaView>

        <BottomNav />
      </View>
    </SwipeTabWrapper>
  );
}

function makeStyles(colors: AppColors) {
  return StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.background },
    safe: { flex: 1 },
    scrollContent: { flexGrow: 1 },

    // Header gradient
    headerGrad: {
      paddingBottom: 36,
      overflow: "hidden",
      position: "relative",
    },
    orb: {
      position: "absolute",
      width: 200,
      height: 200,
      borderRadius: 100,
      backgroundColor: "rgba(255,255,255,0.05)",
      top: -60,
      right: -40,
    },
    headerContent: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.xl,
    },
    eyebrow: {
      fontSize: 10,
      fontWeight: "700",
      color: "rgba(249,245,239,0.65)",
      letterSpacing: 2,
      marginBottom: 6,
    },
    title: {
      fontSize: 28,
      fontWeight: "800",
      color: colors.primaryForeground,
      letterSpacing: -0.4,
      marginBottom: 6,
    },
    subtitle: {
      fontSize: 14,
      color: "rgba(249,245,239,0.78)",
      lineHeight: 20,
    },

    // Tabs
    tabsWrapper: {
      marginTop: -18,
    },
    tabsScroll: {
      paddingHorizontal: spacing.lg,
      gap: 10,
      paddingBottom: 4,
      paddingTop: 4,
    },
    tab: {
      flexDirection: "column",
      alignItems: "center",
      gap: 5,
      minWidth: 82,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderRadius: radius.xl,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 6,
      elevation: 2,
    },
    tabActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5,
    },
    tabLabel: {
      fontSize: 11,
      fontWeight: "600",
      color: colors.textMuted,
      textAlign: "center",
    },
    tabLabelActive: {
      color: colors.primaryForeground,
      fontWeight: "700",
    },

    // Category description
    categoryDescWrapper: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
      paddingBottom: spacing.sm,
    },
    categoryDesc: {
      fontSize: 13,
      color: colors.textMuted,
      fontStyle: "italic",
      lineHeight: 19,
      paddingLeft: spacing.sm,
      borderLeftWidth: 2,
      borderLeftColor: colors.primaryLight,
    },

    // Plant cards
    cardWrapper: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.sm,
    },
    plantCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.md,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.xl,
      padding: spacing.md,
      shadowColor: colors.herbDark,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.07,
      shadowRadius: 10,
      elevation: 3,
    },
    plantThumb: {
      flexShrink: 0,
      borderRadius: radius.lg,
      overflow: "hidden",
    },
    thumbGrad: {
      width: 64,
      height: 64,
      borderRadius: radius.lg,
      alignItems: "center",
      justifyContent: "center",
    },
    thumbImg: {
      width: 64,
      height: 64,
      borderRadius: radius.lg,
    },
    plantInfo: { flex: 1, gap: 2 },
    plantName: { fontSize: 17, fontWeight: "800", color: colors.text, letterSpacing: -0.2 },
    plantBotanical: { fontSize: 12, fontStyle: "italic", color: colors.textMuted },
    plantDesc: { fontSize: 12, color: colors.textMuted, lineHeight: 17, marginTop: 2 },
    partsRow: { flexDirection: "row", gap: 6, marginTop: 5 },
    partTag: {
      paddingHorizontal: 9,
      paddingVertical: 3,
      borderRadius: radius.full,
      backgroundColor: colors.primaryLight,
    },
    partTagText: { fontSize: 10, color: colors.primary, fontWeight: "700" },
    arrowWrap: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: colors.primaryLight,
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
  });
}
