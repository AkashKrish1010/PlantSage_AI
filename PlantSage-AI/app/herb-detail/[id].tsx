import React, { useEffect, useMemo, useState } from "react";
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, ActivityIndicator, Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { AppColors, radius, spacing } from "../../src/theme";
import { getPlantInfo, type PlantInfo, type LearnMoreLink } from "../../src/services/geminiService";
import { getAyurGenixDataForHerb, type AyurGenixEntry } from "../../src/services/ayurgenixService";
import { useThemeColors } from "../../src/context/ThemeContext";
import { plantImages, plantImageSets, getPlantImageSet } from "../../src/data/plantImages";
import { getCachedPlant, cachePlant } from "../../src/services/plantCacheService";
import ImageSlider from "../../src/components/ImageSlider";

// ─── Section wrapper ─────────────────────────────────────────────
function Section({
  title, icon, children, colors,
}: {
  title: string; icon: string; children: React.ReactNode; colors: AppColors;
}) {
  const sec = useMemo(() => makeSectionStyles(colors), [colors]);
  return (
    <View style={sec.wrapper}>
      <View style={sec.titleRow}>
        <Ionicons name={icon as any} size={18} color={colors.primary} />
        <Text style={sec.title}>{title}</Text>
      </View>
      {children}
    </View>
  );
}
function makeSectionStyles(colors: AppColors) {
  return StyleSheet.create({
    wrapper: { marginBottom: spacing.lg },
    titleRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: spacing.sm },
    title: { fontSize: 18, fontWeight: "800", color: colors.text, letterSpacing: -0.2 },
  });
}

// ─── Skeleton block ───────────────────────────────────────────────
function Skel({ h = 16, mb = 8, w = "100%" as any }) {
  const c = useThemeColors();
  return <View style={{ height: h, backgroundColor: c.surface, borderRadius: 8, marginBottom: mb, width: w, opacity: 0.7 }} />;
}

// ─── Loading state ────────────────────────────────────────────────
function LoadingView({ colors, styles, onBack, imageSet }: { colors: AppColors; styles: any; onBack: () => void; imageSet: any[] }) {
  return (
    <View style={styles.root}>
      {imageSet.length > 0 ? (
        <ImageSlider images={imageSet} height={styles.heroBanner.height}>
          <SafeAreaView edges={["top"]}>
            <TouchableOpacity onPress={onBack} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={20} color="#f6f2ea" />
            </TouchableOpacity>
          </SafeAreaView>
        </ImageSlider>
      ) : (
        <View style={styles.heroBanner}>
          <LinearGradient colors={[colors.herbDark, colors.primary, colors.herb]} style={StyleSheet.absoluteFillObject} />
          <SafeAreaView edges={["top"]}>
            <TouchableOpacity onPress={onBack} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={20} color="#f6f2ea" />
            </TouchableOpacity>
          </SafeAreaView>
          <View style={styles.heroIconWrapper}>
            <Ionicons name="leaf" size={64} color="rgba(249,245,239,0.18)" />
          </View>
        </View>
      )}
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <Skel h={32} mb={6} w="70%" />
        <Skel h={16} mb={20} w="50%" />
        <Skel h={14} mb={6} />
        <Skel h={14} mb={6} />
        <Skel h={14} mb={20} w="80%" />
        <Skel h={22} mb={10} w="40%" />
        <Skel h={14} mb={6} />
        <Skel h={14} mb={6} />
        <Skel h={14} mb={20} w="60%" />
        <View style={{ alignItems: "center", paddingTop: 12 }}>
          <ActivityIndicator color={colors.primary} size="small" />
          <Text style={{ color: colors.textMuted, marginTop: 8, fontSize: 13 }}>
            Loading plant details…
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

// ─── Main screen ─────────────────────────────────────────────────
export default function PlantDetailScreen() {
  const { id, className, botanical, isToxic: isToxicParam, userImage } = useLocalSearchParams<{ id?: string; className?: string; botanical?: string; isToxic?: string; userImage?: string }>();
  const router = useRouter();
  const colors = useThemeColors();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const plantName = id ? decodeURIComponent(id) : "Unknown Plant";
  const classLabel = className ? decodeURIComponent(className) : undefined;

  // Resolve multi-image set with multiple fallback strategies
  const resolveImageSet = (name: string): any[] => {
    const nameMap: Record<string, string> = {
      tulsi: "Tulasi",
      tulasi: "Tulasi",
      "holy basil": "Tulasi",
      "holy_basil": "Tulasi",
      aloe: "Aloevera",
      aloevera: "Aloevera",
      "aloe vera": "Aloevera",
      "aloe_vera": "Aloevera",
      amla: "Amla",
      "indian gooseberry": "Amla",
      "indian_gooseberry": "Amla",
      amruthaballi: "Amruta_Balli",
      giloy: "Amruta_Balli",
      arali: "Arali",
      nerium: "Arali",
      ashoka: "Ashoka",
      ashwagandha: "Ashwagandha",
      avacado: "Avacado",
      avocado: "Avacado",
      bamboo: "Bamboo",
      basale: "Basale",
      betel: "Betel",
      "betel leaf": "Betel",
      "betel_leaf": "Betel",
      betel_nut: "Betel_Nut",
      "betel nut": "Betel_Nut",
      supari: "Betel_Nut",
      brahmi: "Brahmi",
      castor: "Castor",
      curry_leaf: "Curry_Leaf",
      "curry leaf": "Curry_Leaf",
      curry: "Curry_Leaf",
      doddpathre: "Doddapatre",
      doddapatre: "Doddapatre",
      ekka: "Ekka",
      ganike: "Ganike",
      gauva: "Gauva",
      guava: "Gauva",
      geranium: "Geranium",
      henna: "Henna",
      mehendi: "Henna",
      hibiscus: "Hibiscus",
      honge: "Honge",
      insulin: "Insulin",
      jasmine: "Jasmine",
      lemon: "Lemon",
      lemongrass: "Lemon_grass",
      lemon_grass: "Lemon_grass",
      mango: "Mango",
      mint: "Mint",
      pudina: "Mint",
      nagadali: "Nagadali",
      neem: "Neem",
      nithyapushpa: "Nithyapushpa",
      sadabahar: "Nithyapushpa",
      catharanthus: "Nithyapushpa",
      nooni: "Nooni",
      noni: "Nooni",
      pappaya: "Pappaya",
      papaya: "Pappaya",
      pepper: "Pepper",
      "black pepper": "Pepper",
      black_pepper: "Pepper",
      pomegranate: "Pomegranate",
      raktachandini: "Raktachandini",
      rose: "Rose",
      sapota: "Sapota",
      chikoo: "Sapota",
      wood_sorel: "Wood_sorel",

      // ─── 31 Species without direct local asset (mapped to closest visual cousins) ───
      asthma_weed: "Wood_sorel",
      "asthma weed": "Wood_sorel",
      badipala: "Honge",
      balloon_vine: "Amruta_Balli",
      "balloon vine": "Amruta_Balli",
      bringaraja: "Brahmi",
      bhringraj: "Brahmi",
      camphor: "Honge",
      caricature: "Geranium",
      "caricature plant": "Geranium",
      chakte: "Honge",
      citron_lime: "Lemon",
      "citron lime": "Lemon",
      common_rue: "Wood_sorel",
      "common rue": "Wood_sorel",
      coriander: "Mint",
      dhaniya: "Mint",
      custard_apple: "Mango",
      "custard apple": "Mango",
      eucalyptus: "Neem",
      ganigale: "Arali",
      gasagase: "Wood_sorel",
      poppy: "Wood_sorel",
      "gasagase (poppy)": "Wood_sorel",
      ginger: "Mint",
      adrak: "Mint",
      globe_amaranth: "Geranium",
      "globe amaranth": "Geranium",
      harsingar: "Jasmine",
      parijat: "Jasmine",
      "harsingar (parijat)": "Jasmine",
      jackfruit: "Sapota",
      kamakasturi: "Tulasi",
      kambajala: "Honge",
      kasambruga: "Ganike",
      kepala: "Arali",
      lantana: "Geranium",
      malabar_nut: "Doddapatre",
      "malabar nut": "Doddapatre",
      marigold: "Hibiscus",
      genda: "Hibiscus",
      moringa: "Neem",
      drumstick: "Neem",
      "drumstick (moringa)": "Neem",
      nelavembu: "Brahmi",
      kalmegh: "Brahmi",
      "nelavembu (kalmegh)": "Brahmi",
      nerale: "Mango",
      jamun: "Mango",
      "indian blackberry (jamun)": "Mango",
      padri: "Honge",
      sampige: "Jasmine",
      champak: "Jasmine",
      "champak (sampige)": "Jasmine",
      tamarind: "Neem",
      "tamarind (imli)": "Neem",
      tecoma: "Arali",
      thumbe: "Mint",
      turmeric: "Doddapatre",
      haldi: "Doddapatre",
    };

    const cleanInput = name.toLowerCase().trim();
    let targetKey = nameMap[cleanInput];
    
    if (!targetKey) {
      for (const [alias, realKey] of Object.entries(nameMap)) {
        if (cleanInput.includes(alias) || alias.includes(cleanInput)) {
          targetKey = realKey;
          break;
        }
      }
    }
    
    if (!targetKey && classLabel) {
      const cleanClass = classLabel.toLowerCase().replace(/_/g, " ").trim();
      targetKey = nameMap[cleanClass];
      if (!targetKey) {
        for (const [alias, realKey] of Object.entries(nameMap)) {
          if (cleanClass.includes(alias) || alias.includes(cleanClass)) {
            targetKey = realKey;
            break;
          }
        }
      }
    }

    if (!targetKey) {
      const normalizedName = cleanInput.replace(/[^a-z0-9]/g, "");
      const directMatch = Object.keys(plantImageSets).find(k => {
        const cleanK = k.toLowerCase().replace(/[^a-z0-9]/g, "");
        return normalizedName.includes(cleanK) || cleanK.includes(normalizedName);
      });
      if (directMatch) {
        targetKey = directMatch;
      }
    }

    if (targetKey && targetKey in plantImageSets) {
      return plantImageSets[targetKey as keyof typeof plantImageSets];
    }

    if (targetKey && targetKey in plantImages) {
      return [plantImages[targetKey as keyof typeof plantImages]];
    }

    if (name in plantImageSets) return plantImageSets[name as keyof typeof plantImageSets];
    const underscored = name.trim().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('_');
    if (underscored in plantImageSets) return plantImageSets[underscored as keyof typeof plantImageSets];
    const compact = name.replace(/\s+/g, '').replace(/^(.)/, c => c.toUpperCase());
    if (compact in plantImageSets) return plantImageSets[compact as keyof typeof plantImageSets];
    
    const single = plantImages[name as keyof typeof plantImages]
      ?? plantImages[underscored as keyof typeof plantImages]
      ?? plantImages[compact as keyof typeof plantImages];
    return single ? [single] : [];
  };

  const [plantInfo, setPlantInfo] = useState<PlantInfo | null>(null);
  const [ayurData, setAyurData] = useState<AyurGenixEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [fromCache, setFromCache] = useState(false);

  const localImageSet = resolveImageSet(plantName);
  const imageSet = localImageSet.length > 0
    ? localImageSet
    : userImage
      ? [{ uri: userImage }]
      : (plantInfo?.images && plantInfo.images.length > 0)
        ? plantInfo.images.map(url => ({ uri: url }))
        : [];

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setFromCache(false);

    // Load AyurGenix data synchronously (local JSON)
    const ayur = getAyurGenixDataForHerb(plantName);
    if (!cancelled) setAyurData(ayur);

    const botanicalParam = botanical ? decodeURIComponent(botanical) : undefined;
    const isToxicVal = isToxicParam === "true";

    // ── Check permanent cache first ─────────────────────────────────
    getCachedPlant(plantName).then(async (cached) => {
      if (cancelled) return;
      if (cached) {
        setPlantInfo(cached);
        setFromCache(true);
        setLoading(false);
        return;
      }

      // ── Not cached → fetch from Gemini (one-time) ──────────────────
      try {
        const info = await getPlantInfo(plantName, botanicalParam, classLabel, isToxicVal);
        if (!cancelled) {
          setPlantInfo(info);
          setLoading(false);
          // Save permanently so we never call Gemini again for this plant
          cachePlant(plantName, info);
        }
      } catch (e: any) {
        if (!cancelled) {
          setError(e?.message || "Failed to load plant details.");
          setLoading(false);
        }
      }
    });

    return () => { cancelled = true; };
  }, [plantName, classLabel]);

  if (loading) {
    return <LoadingView colors={colors} styles={styles} onBack={router.back} imageSet={imageSet} />;
  }

  if (error || !plantInfo) {
    return (
      <View style={styles.root}>
        <SafeAreaView edges={["top"]}>
          <TouchableOpacity onPress={router.back} style={[styles.backBtn, { margin: spacing.md, backgroundColor: colors.surface }]}>
            <Ionicons name="arrow-back" size={20} color={colors.text} />
          </TouchableOpacity>
        </SafeAreaView>
        <View style={styles.errorContainer}>
          <Ionicons name="leaf-outline" size={64} color={colors.textMuted} />
          <Text style={styles.errorTitle}>Could Not Load Plant</Text>
          <Text style={styles.errorMsg}>{error || "No information available."}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={router.back}>
            <Text style={styles.retryText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ─── Main render ───────────────────────────────────────────────
  return (
    <View style={styles.root}>
      {/* Hero slider */}
      {imageSet.length > 0 ? (
        <ImageSlider
          images={imageSet}
          height={styles.heroBanner.height}
          gradientColors={["transparent", "rgba(14,26,19,0.65)", colors.herbDark]}
        >
          <SafeAreaView edges={["top"]}>
            <TouchableOpacity onPress={router.back} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={20} color="#f6f2ea" />
            </TouchableOpacity>
          </SafeAreaView>
        </ImageSlider>
      ) : (
        <View style={styles.heroBanner}>
          <LinearGradient
            colors={[colors.herbDark, colors.primary, colors.herb]}
            style={StyleSheet.absoluteFillObject}
          />
          <SafeAreaView edges={["top"]}>
            <TouchableOpacity onPress={router.back} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={20} color="#f6f2ea" />
            </TouchableOpacity>
          </SafeAreaView>
          <View style={styles.heroIconWrapper}>
            <Ionicons name="leaf" size={64} color="rgba(249,245,239,0.18)" />
          </View>
        </View>
      )}

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Title block */}
        <View style={styles.titleRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{plantInfo.name}</Text>
            {plantInfo.botanicalName ? (
              <Text style={styles.botanical}>{plantInfo.botanicalName}</Text>
            ) : null}
            {plantInfo.family ? (
              <Text style={styles.family}>{plantInfo.family}</Text>
            ) : null}
          </View>
          <View style={plantInfo.ayushRecognized ? styles.ayushBadge : styles.folkloreBadge}>
            <Ionicons
              name={plantInfo.ayushRecognized ? "shield-checkmark" : "book-outline"}
              size={13}
              color={plantInfo.ayushRecognized ? colors.primaryForeground : colors.earth}
            />
            <Text style={plantInfo.ayushRecognized ? styles.ayushText : styles.folkloreText}>
              {plantInfo.ayushRecognized ? "AYUSH" : "Folklore"}
            </Text>
          </View>
        </View>

        {/* Common names */}
        {plantInfo.commonNames?.length > 0 && (
          <View style={styles.tagRow}>
            {plantInfo.commonNames.slice(0, 5).map((n, i) => (
              <View key={i} style={styles.commonTag}>
                <Text style={styles.commonTagText}>{n}</Text>
              </View>
            ))}
          </View>
        )}

        {/* About */}
        <Section title="About" icon="information-circle" colors={colors}>
          <Text style={styles.description}>{plantInfo.description}</Text>
        </Section>

        {/* Toxic Plant Emergency Safety Banner */}
        {plantInfo.isToxic && (
          <View style={styles.toxicAlertBanner}>
            <View style={styles.toxicAlertHeader}>
              <Ionicons name="skull" size={20} color={colors.danger} />
              <Text style={styles.toxicAlertHeaderTitle}>POISONOUS PLANT ALERT</Text>
            </View>
            <Text style={styles.toxicAlertSub}>This plant contains highly toxic compounds. Do not ingest, consume, or apply this plant under any circumstances.</Text>
            
            {plantInfo.poisoningSymptoms ? (
              <View style={styles.toxicAlertSection}>
                <Text style={styles.toxicAlertSecTitle}>⚠️ Ingestion Symptoms (If Eaten):</Text>
                <Text style={styles.toxicAlertSecBody}>{plantInfo.poisoningSymptoms}</Text>
              </View>
            ) : null}

            {plantInfo.poisoningFirstAid ? (
              <View style={[styles.toxicAlertSection, { borderTopWidth: 1, borderTopColor: colors.dangerBorder, paddingTop: 10, marginTop: 10, opacity: 0.8 }]}>
                <Text style={styles.toxicAlertSecTitle}>🚨 Emergency First Aid Action:</Text>
                <Text style={styles.toxicAlertSecBody}>{plantInfo.poisoningFirstAid}</Text>
              </View>
            ) : null}
          </View>
        )}

        {/* Medicinal Properties */}
        {plantInfo.medicinalProperties?.length > 0 && !plantInfo.isToxic && (
          <Section title="Medicinal Properties" icon="flask-outline" colors={colors}>
            <View style={styles.tagRow}>
              {plantInfo.medicinalProperties.slice(0, 10).map((p, i) => (
                <View key={i} style={styles.propTag}>
                  <Text style={styles.propTagText}>{p}</Text>
                </View>
              ))}
            </View>
          </Section>
        )}

        {/* Medicinal Uses (PFAF / Gemini derived) */}
        {plantInfo.uses?.length > 0 && !plantInfo.isToxic && (
          <Section title="Medicinal Uses" icon="medical-outline" colors={colors}>
            {plantInfo.uses.map((use, i) => (
              <View key={i} style={styles.useCard}>
                <View style={styles.useDot} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.useCondition}>{use.condition}</Text>
                  <Text style={styles.useDesc}>{use.description}</Text>
                </View>
              </View>
            ))}
          </Section>
        )}

        {/* AyurGenix Disease Index */}
        {ayurData.length > 0 && !plantInfo.isToxic && (
          <Section title="Treats These Conditions" icon="bandage-outline" colors={colors}>
            {ayurData.map((entry, i) => (
              <View key={i} style={styles.diseaseCard}>
                <View style={styles.diseaseHeader}>
                  <Ionicons name="pulse" size={14} color={colors.primary} />
                  <Text style={styles.diseaseName}>{entry.disease}</Text>
                </View>
                {entry.symptoms ? (
                  <Text style={styles.diseaseSymptoms}>Symptoms: {entry.symptoms}</Text>
                ) : null}
                {entry.formulation ? (
                  <Text style={styles.diseaseFormulation}>Formulation: {entry.formulation}</Text>
                ) : null}
                {entry.doshas ? (
                  <View style={styles.doshaRow}>
                    <Text style={styles.doshaLabel}>Doshas: </Text>
                    <Text style={styles.doshaValue}>{entry.doshas}</Text>
                  </View>
                ) : null}
              </View>
            ))}
          </Section>
        )}

        {/* Parts used */}
        {plantInfo.partsUsed?.length > 0 && !plantInfo.isToxic && (
          <Section title="Parts Used" icon="leaf-outline" colors={colors}>
            <View style={styles.partsRow}>
              {plantInfo.partsUsed.map((p, i) => (
                <View key={i} style={styles.partCard}>
                  <Text style={styles.partName}>{p.part}</Text>
                  <Text style={styles.partPrep}>{p.preparation}</Text>
                </View>
              ))}
            </View>
          </Section>
        )}

        {/* Home Remedies */}
        {plantInfo.homeRemedies?.length > 0 && !plantInfo.isToxic && (
          <Section title="Home Remedies" icon="flask" colors={colors}>
            {plantInfo.homeRemedies.map((remedy, i) => (
              <View key={i} style={styles.remedyCard}>
                <View style={styles.remedyBody}>
                  <Text style={styles.remedyName}>{remedy.name}</Text>
                  <Text style={styles.remedyFor}>For: {remedy.forCondition}</Text>
                  {remedy.prepTime ? (
                    <View style={styles.timeBadge}>
                      <Ionicons name="time-outline" size={12} color={colors.textMuted} />
                      <Text style={styles.timeText}>{remedy.prepTime} · {remedy.difficulty}</Text>
                    </View>
                  ) : null}

                  <Text style={styles.remedySubhead}>Ingredients</Text>
                  {remedy.ingredients.map((ing, j) => (
                    <View key={j} style={styles.ingRow}>
                      <View style={styles.ingDot} />
                      <Text style={styles.ingText}>{ing}</Text>
                    </View>
                  ))}

                  <Text style={styles.remedySubhead}>Steps</Text>
                  {remedy.steps.map((step, j) => (
                    <View key={j} style={styles.stepRow}>
                      <View style={styles.stepNum}>
                        <Text style={styles.stepNumText}>{j + 1}</Text>
                      </View>
                      <Text style={styles.stepText}>{step}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </Section>
        )}

        {/* AyurGenix Lifestyle advice */}
        {ayurData.length > 0 && ayurData[0].diet && !plantInfo.isToxic && (
          <Section title="Diet & Lifestyle" icon="nutrition-outline" colors={colors}>
            {ayurData.slice(0, 3).map((entry, i) =>
              entry.diet ? (
                <View key={i} style={styles.infoCard}>
                  <Text style={styles.infoLabel}>{entry.disease}</Text>
                  <Text style={styles.infoValue}>{entry.diet}</Text>
                  {entry.yoga ? <Text style={[styles.infoValue, { marginTop: 4, fontStyle: "italic" }]}>Yoga: {entry.yoga}</Text> : null}
                </View>
              ) : null
            )}
          </Section>
        )}

        {/* Dosage */}
        {plantInfo.dosage && !plantInfo.isToxic && (
          <Section title="Dosage" icon="timer-outline" colors={colors}>
            <View style={styles.dosageBox}>
              <Text style={styles.dosageText}>{plantInfo.dosage}</Text>
            </View>
          </Section>
        )}

        {/* Cautions */}
        {plantInfo.cautions?.length > 0 && (
          <Section title="Cautions & Safety" icon="warning-outline" colors={colors}>
            {plantInfo.cautions.map((c, i) => (
              <View key={i} style={styles.cautionRow}>
                <Ionicons name="warning-outline" size={15} color={colors.saffron} style={{ marginTop: 1 }} />
                <Text style={styles.cautionText}>{c}</Text>
              </View>
            ))}
          </Section>
        )}

        {/* Toxic lookalike */}
        {plantInfo.toxicLookalike && (
          <View style={styles.lookalikeBanner}>
            <View style={styles.lookalikeTitle}>
              <Ionicons name="skull-outline" size={18} color={colors.danger} />
              <Text style={styles.lookalikeTitleText}>Toxic Lookalike Alert</Text>
            </View>
            <Text style={styles.lookalikeNameText}>Lookalike Species: {plantInfo.toxicLookalike.name}</Text>
            <Text style={styles.lookalikeWarning}>{plantInfo.toxicLookalike.warning}</Text>
            
            <View style={styles.lookalikeDivider} />
            
            <View style={styles.safetyGuidelinesBox}>
              <Text style={styles.safetyTitle}>⚠️ URGENT SAFETY GUIDELINES:</Text>
              
              <View style={styles.safetyRow}>
                <Ionicons name="close-circle-outline" size={15} color={colors.danger} style={{ marginTop: 2 }} />
                <Text style={styles.safetyText}>
                  <Text style={{ fontWeight: "700" }}>Do NOT use remedies:</Text> Avoid attempting any home remedies or preparations for this herb if you cannot 100% verify its identity.
                </Text>
              </View>

              <View style={styles.safetyRow}>
                <Ionicons name="shield-outline" size={15} color={colors.danger} style={{ marginTop: 2 }} />
                <Text style={styles.safetyText}>
                  <Text style={{ fontWeight: "700" }}>Consult a physician first:</Text> Always consult a qualified medical professional or certified Ayurvedic practitioner before using wild-harvested herbs.
                </Text>
              </View>

              <View style={styles.safetyRow}>
                <Ionicons name="eye-outline" size={15} color={colors.danger} style={{ marginTop: 2 }} />
                <Text style={styles.safetyText}>
                  <Text style={{ fontWeight: "700" }}>High Risk of Poisoning:</Text> Visual similarities to {plantInfo.toxicLookalike.name} make self-harvesting extremely high risk. Do not ingest without laboratory-grade verification.
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* ── Learn More Links ─────────────────────────────────── */}
        {(plantInfo.learnMoreLinks?.length ?? 0) > 0 && (
          <Section title="Learn More" icon="globe-outline" colors={colors}>
            {/* YouTube links */}
            {plantInfo.learnMoreLinks.filter(l => l.type === "youtube").length > 0 && (
              <View style={styles.linkGroup}>
                <View style={styles.linkGroupHeader}>
                  <View style={[styles.linkTypeDot, { backgroundColor: "#FF0000" }]} />
                  <Text style={styles.linkGroupLabel}>YouTube Videos</Text>
                </View>
                {plantInfo.learnMoreLinks
                  .filter((l) => l.type === "youtube")
                  .map((link, i) => (
                    <TouchableOpacity
                      key={i}
                      style={styles.linkCard}
                      onPress={() => Linking.openURL(link.url)}
                      activeOpacity={0.75}
                    >
                      <View style={styles.linkIconBox}>
                        <Ionicons name="logo-youtube" size={18} color="#FF0000" />
                      </View>
                      <Text style={styles.linkTitle} numberOfLines={2}>{link.title}</Text>
                      <Ionicons name="open-outline" size={14} color={colors.textMuted} />
                    </TouchableOpacity>
                  ))}
              </View>
            )}

            {/* Wikipedia + Article links */}
            {plantInfo.learnMoreLinks.filter(l => l.type !== "youtube").length > 0 && (
              <View style={styles.linkGroup}>
                <View style={styles.linkGroupHeader}>
                  <View style={[styles.linkTypeDot, { backgroundColor: colors.primary }]} />
                  <Text style={styles.linkGroupLabel}>Articles & References</Text>
                </View>
                {plantInfo.learnMoreLinks
                  .filter((l) => l.type !== "youtube")
                  .map((link, i) => (
                    <TouchableOpacity
                      key={i}
                      style={styles.linkCard}
                      onPress={() => Linking.openURL(link.url)}
                      activeOpacity={0.75}
                    >
                      <View style={styles.linkIconBox}>
                        <Ionicons
                          name={link.type === "wikipedia" ? "book-outline" : "document-text-outline"}
                          size={18}
                          color={link.type === "wikipedia" ? colors.earth : colors.primary}
                        />
                      </View>
                      <Text style={styles.linkTitle} numberOfLines={2}>{link.title}</Text>
                      <Ionicons name="open-outline" size={14} color={colors.textMuted} />
                    </TouchableOpacity>
                  ))}
              </View>
            )}
          </Section>
        )}

        {/* Cache status pill */}
        {fromCache && (
          <View style={styles.cachePill}>
            <Ionicons name="checkmark-circle" size={12} color={colors.primary} />
            <Text style={styles.cachePillText}>Loaded from device cache</Text>
          </View>
        )}

        <View style={{ height: 110 }} />
      </ScrollView>
    </View>
  );
}

function makeStyles(colors: AppColors) {
  const isDark = colors.background === "#0e1a13";
  return StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.background },

    heroBanner: { height: 260, overflow: "hidden", position: "relative" },
    heroIconWrapper: { position: "absolute", bottom: -12, right: 24 },
    backBtn: {
      marginTop: spacing.sm, marginLeft: spacing.md,
      width: 38, height: 38, borderRadius: 19,
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      alignItems: "center", justifyContent: "center",
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.15)",
    },

    errorContainer: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: spacing.lg, gap: 12 },
    errorTitle: { fontSize: 20, fontWeight: "700", color: colors.text },
    errorMsg: { fontSize: 14, color: colors.textMuted, textAlign: "center", lineHeight: 20 },
    retryBtn: { paddingHorizontal: 28, paddingVertical: 12, borderRadius: radius.full, backgroundColor: colors.primary, marginTop: 8 },
    retryText: { color: colors.primaryForeground, fontWeight: "700", fontSize: 15 },

    scroll: { flex: 1 },
    scrollContent: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.xl + 40 },

    titleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: spacing.md },
    name: { fontSize: 28, fontWeight: "900", color: colors.text, letterSpacing: -0.5 },
    botanical: { fontSize: 14, fontStyle: "italic", color: colors.textMuted, marginTop: 2 },
    family: { fontSize: 12, color: colors.textMuted, marginTop: 1 },

    ayushBadge: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: colors.primary, paddingHorizontal: 10, paddingVertical: 5, borderRadius: radius.full, marginTop: 4 },
    ayushText: { fontSize: 11, fontWeight: "700", color: colors.primaryForeground },
    folkloreBadge: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: colors.earthLight, paddingHorizontal: 10, paddingVertical: 5, borderRadius: radius.full, marginTop: 4 },
    folkloreText: { fontSize: 11, fontWeight: "600", color: colors.earth },

    tagRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: spacing.md },
    commonTag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.full, backgroundColor: colors.surfaceAlt, borderWidth: 1, borderColor: colors.border },
    commonTagText: { fontSize: 12, color: colors.textMuted },

    description: { fontSize: 14, color: colors.textMuted, lineHeight: 22, marginBottom: spacing.md },

    propTag: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: radius.full, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
    propTagText: { fontSize: 12, color: colors.text },

    useCard: { flexDirection: "row", alignItems: "flex-start", gap: 10, marginBottom: 12 },
    useDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary, marginTop: 5, flexShrink: 0 },
    useCondition: { fontSize: 14, fontWeight: "700", color: colors.text },
    useDesc: { fontSize: 13, color: colors.textMuted, lineHeight: 18, marginTop: 2 },

    // AyurGenix disease cards
    diseaseCard: {
      backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1,
      borderColor: colors.border, padding: spacing.md, marginBottom: spacing.sm,
    },
    diseaseHeader: { flexDirection: "row", alignItems: "center", gap: 7, marginBottom: 4 },
    diseaseName: { fontSize: 14, fontWeight: "700", color: colors.text },
    diseaseSymptoms: { fontSize: 12, color: colors.textMuted, marginBottom: 3 },
    diseaseFormulation: { fontSize: 12, color: colors.primary, fontWeight: "600", marginBottom: 3 },
    doshaRow: { flexDirection: "row", marginTop: 2 },
    doshaLabel: { fontSize: 12, color: colors.textMuted, fontWeight: "600" },
    doshaValue: { fontSize: 12, color: colors.textMuted },

    partsRow: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
    partCard: { alignItems: "center", paddingHorizontal: 14, paddingVertical: 12, borderRadius: radius.lg, backgroundColor: colors.primaryLight, gap: 4, minWidth: 80 },
    partName: { fontSize: 12, fontWeight: "700", color: colors.primary, textAlign: "center" },
    partPrep: { fontSize: 10, color: colors.primary, opacity: 0.7, textAlign: "center" },

    remedyCard: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, marginBottom: spacing.md, overflow: "hidden" },
    remedyBody: { paddingHorizontal: spacing.lg, paddingVertical: spacing.lg },
    remedyName: { fontSize: 15, fontWeight: "700", color: colors.text },
    remedyFor: { fontSize: 12, color: colors.textMuted, marginTop: 2, marginBottom: 6 },
    timeBadge: { flexDirection: "row", alignItems: "center", gap: 4, marginBottom: 10 },
    timeText: { fontSize: 11, color: colors.textMuted },
    remedySubhead: { fontSize: 13, fontWeight: "700", color: colors.text, marginBottom: 6, marginTop: 10 },
    ingRow: { flexDirection: "row", alignItems: "flex-start", gap: 8, marginBottom: 4 },
    ingDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.primary, marginTop: 5, flexShrink: 0 },
    ingText: { fontSize: 13, color: colors.textMuted, flex: 1, lineHeight: 18 },
    stepRow: { flexDirection: "row", alignItems: "flex-start", gap: 10, marginBottom: 8 },
    stepNum: { width: 22, height: 22, borderRadius: 11, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 },
    stepNumText: { fontSize: 10, fontWeight: "800", color: colors.primaryForeground },
    stepText: { flex: 1, fontSize: 13, color: colors.textMuted, lineHeight: 19 },

    infoCard: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm },
    infoLabel: { fontSize: 13, fontWeight: "700", color: colors.text, marginBottom: 4 },
    infoValue: { fontSize: 13, color: colors.textMuted, lineHeight: 20 },

    dosageBox: { backgroundColor: isDark ? colors.surfaceAlt : colors.surface, borderWidth: 1, borderColor: isDark ? "rgba(240,236,228,0.06)" : colors.border, borderRadius: radius.md, padding: spacing.md },
    dosageText: { fontSize: 14, color: colors.textMuted, lineHeight: 20 },

    cautionRow: { flexDirection: "row", gap: 8, marginBottom: 8, alignItems: "flex-start" },
    cautionText: { flex: 1, fontSize: 13, color: colors.textMuted, lineHeight: 19 },

    lookalikeBanner: { backgroundColor: colors.dangerLight, borderWidth: 1, borderColor: colors.dangerBorder, borderRadius: radius.lg, padding: spacing.md, gap: 6, marginBottom: spacing.xl },
    lookalikeTitle: { flexDirection: "row", alignItems: "center", gap: 8 },
    lookalikeTitleText: { fontSize: 15, fontWeight: "800", color: colors.danger },
    lookalikeNameText: { fontSize: 14, fontWeight: "700", color: colors.text, marginTop: 2 },
    lookalikeWarning: { fontSize: 13, color: colors.text, opacity: 0.8, lineHeight: 18, marginBottom: 4 },
    lookalikeDivider: { height: 1, backgroundColor: colors.dangerBorder, marginVertical: spacing.sm, opacity: 0.5 },
    safetyGuidelinesBox: { gap: 6, marginTop: 2 },
    safetyTitle: { fontSize: 12, fontWeight: "800", color: colors.danger, letterSpacing: 0.2, marginBottom: 2 },
    safetyRow: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
    safetyText: { flex: 1, fontSize: 12, color: colors.text, lineHeight: 17 },

    // Toxic alerts
    toxicAlertBanner: {
      backgroundColor: colors.dangerLight,
      borderWidth: 1.5,
      borderColor: colors.dangerBorder,
      borderRadius: radius.lg,
      padding: spacing.md,
      marginBottom: spacing.lg,
      gap: 8,
    },
    toxicAlertHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    toxicAlertHeaderTitle: {
      fontSize: 16,
      fontWeight: "800",
      color: colors.danger,
      letterSpacing: 0.2,
    },
    toxicAlertSub: {
      fontSize: 13,
      fontWeight: "600",
      color: colors.text,
      opacity: 0.85,
      lineHeight: 18,
    },
    toxicAlertSection: {
      gap: 4,
      marginTop: 2,
    },
    toxicAlertSecTitle: {
      fontSize: 13,
      fontWeight: "800",
      color: colors.danger,
    },
    toxicAlertSecBody: {
      fontSize: 13,
      color: colors.text,
      opacity: 0.85,
      lineHeight: 18,
    },

    // ── Learn More Links ──────────────────────────────────────────────
    linkGroup: { marginBottom: spacing.md },
    linkGroupHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginBottom: spacing.sm,
    },
    linkTypeDot: { width: 8, height: 8, borderRadius: 4 },
    linkGroupLabel: {
      fontSize: 11,
      fontWeight: "700",
      color: colors.textMuted,
      letterSpacing: 0.8,
      textTransform: "uppercase",
    },
    linkCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.md,
      padding: spacing.sm,
      marginBottom: 8,
    },
    linkIconBox: {
      width: 36,
      height: 36,
      borderRadius: radius.sm,
      backgroundColor: isDark ? "rgba(240,236,228,0.06)" : "rgba(0,0,0,0.04)",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    linkTitle: {
      flex: 1,
      fontSize: 13,
      color: colors.text,
      fontWeight: "500",
      lineHeight: 18,
    },

    // ── Cache pill ────────────────────────────────────────────────────
    cachePill: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      alignSelf: "center",
      paddingHorizontal: 12,
      paddingVertical: 5,
      borderRadius: radius.full,
      backgroundColor: colors.primarySoft,
      marginBottom: spacing.lg,
    },
    cachePillText: { fontSize: 11, color: colors.primary, fontWeight: "600" },
  });
}
