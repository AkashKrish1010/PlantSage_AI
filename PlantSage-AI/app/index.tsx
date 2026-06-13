import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileAvatar from "../src/components/ProfileAvatar";
import ThemeToggle from "../src/components/ThemeToggle";

import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useThemeColors } from "../src/context/ThemeContext";
import { radius, spacing } from "../src/theme";
import HerbCard from "../src/components/HerbCard";
import BottomNav from "../src/components/BottomNav";
import AnimatedSection from "../src/components/AnimatedSection";
import SwipeTabWrapper from "../src/components/SwipeTabWrapper";

const { width } = Dimensions.get("window");

const herbs = [
  {
    id: "tulasi",
    name: "Tulsi",
    botanicalName: "Ocimum tenuiflorum",
    subtitle: "Holy Basil — adaptogen for immunity, stress, and respiratory health.",
    badge: "VERIFIED",
    image: require("../assets/plants/Tulasi.jpg"),
  },
  {
    id: "ashwagandha",
    name: "Ashwagandha",
    botanicalName: "Withania somnifera",
    subtitle: "Ancient adaptogen for stress, energy, and vitality.",
    badge: "AYUSH",
    image: require("../assets/plants/Ashwagandha.jpg"),
  },
  {
    id: "neem",
    name: "Neem",
    botanicalName: "Azadirachta indica",
    subtitle: "Powerful antibacterial and antifungal properties for skin and immunity.",
    badge: "VERIFIED",
    image: require("../assets/plants/Neem.jpg"),
  },
];

const quickSymptoms = [
  "Cold & Cough",
  "Headache",
  "Digestion",
  "Skin Issues",
  "Stress",
  "Immunity",
];

const trustBadges: Array<{ icon: "leaf-outline"; label: string }> = [];

export default function HomeScreen() {
  const colors = useThemeColors();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const router = useRouter();
  const heroScale = useRef(new Animated.Value(1)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  const statsAnim = useRef(new Animated.Value(0)).current;
  const [stats, setStats] = useState({ plants: 0, models: 0, ayush: 0 });

  useEffect(() => {
    statsAnim.setValue(0);
    const id = statsAnim.addListener(({ value }) => {
      setStats({
        plants: Math.round(8000 * value),
        models: Math.round(78 * value),
        ayush: Math.round(100 * value),
      });
    });
    Animated.timing(statsAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    }).start();
    return () => {
      statsAnim.removeListener(id);
    };
  }, [statsAnim]);

  const heroOpacity = scrollY.interpolate({
    inputRange: [0, 160],
    outputRange: [1, 0.55],
    extrapolate: "clamp",
  });
  const heroTranslate = scrollY.interpolate({
    inputRange: [0, 160],
    outputRange: [0, -28],
    extrapolate: "clamp",
  });

  return (
    <SwipeTabWrapper>
      <View style={styles.root}>
        <Animated.ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          {/* ── Hero ───────────────────────────────────────── */}
          <Animated.View
            style={{
              opacity: heroOpacity,
              transform: [{ translateY: heroTranslate }],
            }}
          >
            <LinearGradient
              colors={[colors.herbDark, colors.primary, colors.herb]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.hero}
            >
              {/* Decorative orbs */}
              <View style={[styles.orb, { top: -30, left: -30, width: 160, height: 160, opacity: 0.08 }]} />
              <View style={[styles.orb, { top: 60, right: -20, width: 100, height: 100, opacity: 0.06 }]} />
              <View style={[styles.orb, { bottom: -10, left: 80, width: 80, height: 80, opacity: 0.07 }]} />

              {/* Subtle botanical line art overlay */}
              <View style={styles.meshOverlay} />

              <SafeAreaView edges={['top']}>
                {/* Top-right action cluster: theme toggle + profile avatar */}
                <View style={[styles.topBar, { flexDirection: "row", alignItems: "center", gap: 8 }]}>
                  <ThemeToggle />
                  <ProfileAvatar />
                </View>
                <View style={styles.heroContent}>
                  {/* Brand pill */}
                  <View style={styles.brandPill}>
                    <Ionicons name="leaf" size={12} color={colors.primaryForeground} />
                    <Text style={styles.brandPillText}>PlantSage AI</Text>
                    <View style={styles.brandDot} />
                    <Text style={styles.brandPillSub}>AYUSH</Text>
                  </View>

                  <Text style={styles.heroTitle}>
                    India's Medicinal{"\n"}
                    <Text style={styles.heroTitleAccent}>Plant Intelligence</Text>
                  </Text>

                  <Text style={styles.heroSubtitle}>
                    Identify plants, discover Ayurvedic remedies, and grow your own
                    herbal garden — guided by 8,000 years of ancient wisdom.
                  </Text>

                  {/* Stats row */}
                  <View style={styles.statsRow}>
                    {[
                      { val: `${stats.plants.toLocaleString()}+`, lbl: "Plants" },
                      { val: `${stats.models}`, lbl: "AI Models" },
                      { val: `${stats.ayush}%`, lbl: "AYUSH" },
                    ].map(({ val, lbl }) => (
                      <View key={lbl} style={styles.statItem}>
                        <Text style={styles.statVal}>{val}</Text>
                        <Text style={styles.statLbl}>{lbl}</Text>
                      </View>
                    ))}
                  </View>

                  {/* CTA buttons */}
                  <View style={styles.ctas}>
                    <TouchableOpacity
                      style={styles.ctaPrimary}
                      onPress={() => router.push("/identify")}
                      activeOpacity={0.85}
                    >
                      <Ionicons name="camera" size={17} color="#fff" />
                      <Text style={styles.ctaPrimaryText}>Identify Plant</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.ctaSecondary}
                      onPress={() => router.push("/search")}
                      activeOpacity={0.85}
                    >
                      <Ionicons name="search" size={17} color={colors.primaryForeground} />
                      <Text style={styles.ctaSecondaryText}>Search Symptom</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </SafeAreaView>
            </LinearGradient>
          </Animated.View>

          {/* ── Trust badges removed (was a single pill) ───── */}

          {/* ── Featured Plants ────────────────────────────── */}
          <AnimatedSection delay={140} style={styles.section}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionEyebrow}>CURATED SELECTION</Text>
                <Text style={styles.sectionTitle}>Featured Plants</Text>
              </View>
              <TouchableOpacity
                onPress={() => router.push("/garden")}
                style={styles.viewAllBtn}
              >
                <Text style={styles.viewAllText}>View All</Text>
                <Ionicons name="arrow-forward" size={13} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </AnimatedSection>

          {herbs.map((herb, index) => (
            <AnimatedSection key={herb.id} delay={200 + index * 100}>
              <Link
                href={{ pathname: "/herb-detail/[id]", params: { id: encodeURIComponent(herb.name), className: herb.id, botanical: herb.botanicalName } }}
                asChild
              >
                <HerbCard
                  name={herb.name}
                  botanicalName={herb.botanicalName}
                  subtitle={herb.subtitle}
                  badge={herb.badge}
                  image={herb.image}
                  delay={0}
                  onPress={() => { }}
                />
              </Link>
            </AnimatedSection>
          ))}

          {/* ── Quick Remedies ─────────────────────────────── */}
          <AnimatedSection delay={120} style={styles.section}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionEyebrow}>AI-POWERED</Text>
                <Text style={styles.sectionTitle}>Quick Remedies</Text>
              </View>
            </View>
            <View style={styles.symptomGrid}>
              {quickSymptoms.map((s) => (
                <TouchableOpacity
                  key={s}
                  style={styles.symptomPill}
                  onPress={() => router.push("/search")}
                  activeOpacity={0.75}
                >
                  <View style={styles.symptomIconBubble}>
                    <Ionicons name="sparkles-outline" size={13} color={colors.primary} />
                  </View>
                  <Text style={styles.symptomText} numberOfLines={1}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </AnimatedSection>

          {/* Bottom padding for nav */}
          <View style={{ height: 100 }} />
        </Animated.ScrollView>

        <BottomNav />
      </View>
    </SwipeTabWrapper>
  );
}

import { AppColors } from "../src/theme";
function makeStyles(colors: AppColors) {
  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scroll: { flex: 1 },
    scrollContent: { flexGrow: 1 },

    // ─ Hero ─
    hero: {
      paddingBottom: 40,
      overflow: "hidden",
      position: "relative",
    },
    orb: {
      position: "absolute",
      borderRadius: 999,
      backgroundColor: "#fff",
    },
    meshOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "transparent",
      // vignette via opacity gradient (simulated)
    },
    heroContent: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.xl,
      zIndex: 10,
    },
    topBar: {
      flexDirection: "row",
      justifyContent: "flex-end",
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
      zIndex: 10,
    },
    brandPill: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      alignSelf: "flex-start",
      backgroundColor: "rgba(255,255,255,0.13)",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: radius.full,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.18)",
    },
    brandPillText: {
      color: colors.primaryForeground,
      fontSize: 12,
      fontWeight: "700",
      letterSpacing: 0.3,
    },
    brandDot: {
      width: 3,
      height: 3,
      borderRadius: 2,
      backgroundColor: "rgba(249,245,239,0.5)",
    },
    brandPillSub: {
      color: "rgba(249,245,239,0.7)",
      fontSize: 11,
      fontWeight: "500",
      letterSpacing: 0.8,
    },
    heroTitle: {
      fontSize: 34,
      fontWeight: "800",
      color: colors.primaryForeground,
      lineHeight: 40,
      marginBottom: spacing.sm,
      letterSpacing: -0.5,
    },
    heroTitleAccent: {
      fontStyle: "italic",
      fontWeight: "700",
      color: "#a8d5b5",
    },
    heroSubtitle: {
      fontSize: 14,
      color: "rgba(249,245,239,0.82)",
      lineHeight: 21,
      marginBottom: spacing.lg,
      maxWidth: width * 0.85,
    },
    statsRow: {
      flexDirection: "row",
      gap: 0,
      marginBottom: spacing.lg,
      backgroundColor: "rgba(255,255,255,0.08)",
      borderRadius: radius.lg,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.12)",
    },
    statItem: {
      flex: 1,
      alignItems: "center",
      paddingVertical: 12,
      borderRightWidth: 1,
      borderRightColor: "rgba(255,255,255,0.1)",
    },
    statVal: {
      fontSize: 18,
      fontWeight: "800",
      color: "#f9f5ef",
      letterSpacing: -0.3,
    },
    statLbl: {
      fontSize: 10,
      color: "rgba(249,245,239,0.65)",
      fontWeight: "500",
      letterSpacing: 0.5,
      marginTop: 1,
    },
    ctas: {
      flexDirection: "row",
      gap: 10,
    },
    ctaPrimary: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: colors.saffron,
      paddingVertical: 14,
      borderRadius: radius.full,
      shadowColor: colors.saffron,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.4,
      shadowRadius: 12,
      elevation: 6,
    },
    ctaPrimaryText: {
      color: "#fff",
      fontWeight: "700",
      fontSize: 14,
      letterSpacing: 0.2,
    },
    ctaSecondary: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      borderWidth: 1.5,
      borderColor: "rgba(249,245,239,0.35)",
      paddingVertical: 14,
      borderRadius: radius.full,
      backgroundColor: "rgba(255,255,255,0.09)",
    },
    ctaSecondaryText: {
      color: colors.primaryForeground,
      fontWeight: "600",
      fontSize: 14,
    },

    // (trust badges + divider removed)

    // ─ Sections ─
    section: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg,
      paddingBottom: spacing.sm,
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginBottom: spacing.md,
    },
    sectionEyebrow: {
      fontSize: 10,
      fontWeight: "700",
      color: colors.primary,
      letterSpacing: 1.4,
      marginBottom: 2,
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: "800",
      color: colors.text,
      letterSpacing: -0.3,
    },
    viewAllBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: radius.full,
      backgroundColor: colors.primaryLight,
    },
    viewAllText: {
      fontSize: 12,
      fontWeight: "700",
      color: colors.primary,
    },

    // ─ Symptoms ─
    symptomGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      rowGap: 10,
      columnGap: 10,
      marginBottom: spacing.lg,
    },
    symptomPill: {
      width: "48%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: 8,
      paddingHorizontal: 14,
      paddingVertical: 11,
      borderRadius: radius.full,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.04,
      shadowRadius: 4,
      elevation: 1,
    },
    symptomIconBubble: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: colors.primarySoft,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "rgba(45,106,79,0.14)",
    },
    symptomText: {
      fontSize: 13,
      fontWeight: "700",
      color: colors.text,
      letterSpacing: 0.1,
    },
  });
}
