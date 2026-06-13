import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../src/context/ThemeContext";
import { AppColors, radius, spacing } from "../src/theme";
import BottomNav from "../src/components/BottomNav";
import SwipeTabWrapper from "../src/components/SwipeTabWrapper";

export default function AboutScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <SwipeTabWrapper>
      <View style={styles.root}>
        <LinearGradient
          colors={[colors.herbDark, colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <SafeAreaView edges={["top"]}>
            <View style={styles.heroInner}>
              <View style={styles.heroTopRow}>
                <View style={styles.heroBadge}>
                  <Ionicons name="leaf" size={13} color={"#f6f2ea"} />
                  <Text style={styles.heroBadgeText}>PlantSage AI</Text>
                </View>
              </View>
              <Text style={styles.heroTitle}>More</Text>
              <Text style={styles.heroSubtitle}>
                Settings, info, and safety notes — designed to be calm and readable.
              </Text>
            </View>
          </SafeAreaView>
        </LinearGradient>

        <SafeAreaView style={styles.safe} edges={[]}>
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

            <View style={styles.sections}>

              {/* Mission */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Our Mission</Text>
                <Text style={styles.body}>
                  PlantSage AI bridges the gap between India's rich 8,000+ medicinal plant
                  heritage and modern accessibility. Built in alignment with the Ministry of
                  AYUSH's vision, we bring verified Ayurvedic knowledge to your fingertips —
                  helping you identify plants, discover traditional remedies, and make informed
                  health choices rooted in ancient wisdom.
                </Text>
              </View>

              {/* Badges explained */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Understanding Our Badges</Text>

                <View style={styles.badgeRow}>
                  <View style={[styles.badgeIconWrapper, { backgroundColor: colors.primarySoft }]}>
                    <Ionicons name="shield-checkmark" size={20} color={colors.primary} />
                  </View>
                  <View style={styles.badgeContent}>
                    <Text style={styles.badgeName}>✓ Doctor Verified</Text>
                    <Text style={styles.muted}>
                      Remedies backed by scientific research, clinical studies, or recognised
                      by AYUSH pharmacopoeia.
                    </Text>
                  </View>
                </View>

                <View style={styles.badgeRow}>
                  <View style={[styles.badgeIconWrapper, { backgroundColor: colors.earthLight }]}>
                    <Ionicons name="book-outline" size={20} color={colors.earth} />
                  </View>
                  <View style={styles.badgeContent}>
                    <Text style={styles.badgeName}>Traditional Use</Text>
                    <Text style={styles.muted}>
                      Based on centuries of traditional knowledge. Not yet clinically validated
                      but widely practiced across generations.
                    </Text>
                  </View>
                </View>
              </View>

              {/* Safety disclaimer */}
              <View style={[styles.card, styles.dangerCard]}>
                <View style={styles.dangerHeader}>
                  <Ionicons name="warning" size={20} color={colors.danger} />
                  <Text style={styles.dangerTitle}>Safety Disclaimer</Text>
                </View>
                {[
                  "This app is for educational purposes and does not replace professional medical advice.",
                  "Always consult a qualified healthcare provider before using any herbal remedy.",
                  "Pay attention to toxic lookalike warnings — misidentification can be dangerous.",
                  "Pregnant or nursing women, and those on medication, should seek medical guidance.",
                  "Start with small doses to test for allergic reactions.",
                ].map((line, i) => (
                  <Text key={i} style={styles.dangerItem}>• {line}</Text>
                ))}
              </View>

              {/* Contact */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Contact & Feedback</Text>
                <Text style={styles.body}>
                  We'd love to hear from you! Help us improve PlantSage AI.
                </Text>
                <View style={styles.contactRow}>
                  <Ionicons name="mail-outline" size={16} color={colors.primary} />
                  <Text style={[styles.contactEmail, { color: colors.primary }]}>
                    feedback@plantsageai.app
                  </Text>
                </View>
              </View>

              {/* Version */}
              <Text style={styles.version}>
                PlantSage AI v1.0 • SIH1555 • Ministry of AYUSH
              </Text>

            </View>

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

    hero: {
      paddingBottom: spacing.lg,
      overflow: "hidden",
    },
    heroInner: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
    },
    heroTopRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: spacing.md,
    },
    heroBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      backgroundColor: "rgba(255,255,255,0.12)",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: radius.full,
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.16)",
      alignSelf: "flex-start",
    },
    heroBadgeText: {
      color: "rgba(246,242,234,0.92)",
      fontSize: 12,
      fontWeight: "800",
      letterSpacing: 0.2,
    },
    heroTitle: {
      fontSize: 30,
      fontWeight: "900",
      color: "#f6f2ea",
      letterSpacing: -0.6,
      marginBottom: 6,
    },
    heroSubtitle: {
      fontSize: 13,
      color: "rgba(246,242,234,0.78)",
      lineHeight: 19,
      maxWidth: 340,
    },

    scrollContent: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg,
      paddingBottom: spacing.xl,
    },

    sections: { gap: spacing.md },

    card: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: radius.lg,
      padding: spacing.lg,
      gap: spacing.md,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: isDark ? 0.22 : 0.06,
      shadowRadius: 16,
      elevation: isDark ? 10 : 2,
    },
    dangerCard: {
      backgroundColor: colors.dangerLight,
      borderColor: colors.dangerBorder,
    },

    cardTitle: { fontSize: 16, fontWeight: "800", color: colors.text, letterSpacing: -0.2 },
    body: { fontSize: 13, lineHeight: 20, color: colors.textMuted },
    muted: { fontSize: 12, lineHeight: 17, color: colors.textMuted },

    badgeRow: { flexDirection: "row", gap: 12, alignItems: "flex-start" },
    badgeIconWrapper: {
      width: 40,
      height: 40,
      borderRadius: radius.md,
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    badgeContent: { flex: 1, gap: 3 },
    badgeName: { fontSize: 13, fontWeight: "800", color: colors.text },

    dangerHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 },
    dangerTitle: { fontSize: 16, fontWeight: "900", color: colors.danger, letterSpacing: -0.2 },
    dangerItem: { fontSize: 13, lineHeight: 19, marginTop: 2, color: colors.textMuted },

    contactRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 4 },
    contactEmail: { fontSize: 14, fontWeight: "700" },

    version: { textAlign: "center", fontSize: 12, paddingVertical: spacing.md, color: colors.textMuted },
  });
}

