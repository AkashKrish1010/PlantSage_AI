import React, { useMemo, useRef } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { AppColors, radius, spacing } from "../theme";
import { useThemeColors } from "../context/ThemeContext";

type Props = {
  name: string;
  subtitle: string;
  botanicalName?: string;
  badge?: string;
  image?: any;
  delay?: number;
  onPress?: () => void;
};

const HerbCard: React.FC<Props> = ({
  name,
  subtitle,
  botanicalName,
  badge = "MEDICINAL",
  image,
  onPress,
}) => {
  const colors = useThemeColors();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const isDark = colors.background === "#0e1a13";
  const scale    = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 0.975, useNativeDriver: true, speed: 30 }),
    ]).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20 }).start();
  };

  return (
    <Animated.View style={[styles.wrapper, { transform: [{ scale }] }]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.card}
      >
        {/* Image header */}
        <ImageBackground
          source={image}
          imageStyle={styles.image}
          style={styles.imageContainer}
        >
          {/* Gradient overlay — bottom-weighted */}
          <LinearGradient
            colors={[
              "transparent",
              isDark ? "rgba(0,0,0,0.78)" : "rgba(27,67,50,0.72)",
            ]}
            style={StyleSheet.absoluteFillObject}
          />

          {/* Badge */}
          <View style={styles.badgeWrapper}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          </View>

          {/* Herb name overlaid on image */}
          <View style={styles.imageBottom}>
            <Text style={styles.imageTitle}>{name}</Text>
            {botanicalName ? (
              <Text style={styles.imageBotanical}>{botanicalName}</Text>
            ) : null}
          </View>
        </ImageBackground>

        {/* Content */}
        <View style={styles.content}>
          <Text numberOfLines={2} style={styles.subtitle}>
            {subtitle}
          </Text>
          <View style={styles.footer}>
            <View style={styles.tagRow}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Leaf</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Root</Text>
              </View>
            </View>
            <View style={styles.arrowCircle}>
              <Ionicons name="arrow-forward" size={13} color={colors.primary} />
            </View>
          </View>
        </View>

        {/* Left accent bar */}
        <View style={styles.accentBar} />
      </Pressable>
    </Animated.View>
  );
};

function makeStyles(colors: AppColors) {
  const isDark = colors.background === "#0e1a13";
  return StyleSheet.create({
    wrapper: {
      width: "92%",
      alignSelf: "center",
      marginBottom: spacing.sm,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: radius.xl,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: isDark ? 0.22 : 0.08,
      shadowRadius: 18,
      elevation: isDark ? 7 : 4,
      position: "relative",
    },
    accentBar: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: 3,
      backgroundColor: colors.primary,
      borderTopLeftRadius: radius.xl,
      borderBottomLeftRadius: radius.xl,
      opacity: isDark ? 0.95 : 1,
    },
    imageContainer: {
      height: 150,
      justifyContent: "flex-end",
    },
    image: {
      borderTopLeftRadius: radius.xl,
      borderTopRightRadius: radius.xl,
    },
    badgeWrapper: {
      position: "absolute",
      top: spacing.sm + 2,
      right: spacing.sm + 2,
    },
    badge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: radius.full,
      backgroundColor: isDark ? "rgba(22,34,25,0.75)" : "rgba(45,106,79,0.85)",
      borderWidth: 1,
      borderColor: isDark ? "rgba(240,236,228,0.18)" : "rgba(255,255,255,0.18)",
    },
    badgeText: {
      fontSize: 9,
      letterSpacing: 1.3,
      color: "#f9f5ef",
      fontWeight: "800",
    },
    imageBottom: {
      paddingHorizontal: spacing.md,
      paddingBottom: spacing.sm + 4,
    },
    imageTitle: {
      fontSize: 20,
      fontWeight: "900",
      color: "#f9f5ef",
      letterSpacing: -0.2,
    },
    imageBotanical: {
      fontSize: 11,
      fontStyle: "italic",
      color: "rgba(249,245,239,0.74)",
      marginTop: 1,
    },
    content: {
      paddingHorizontal: spacing.md + 3,
      paddingTop: spacing.sm + 2,
      paddingBottom: spacing.sm + 6,
    },
    subtitle: {
      fontSize: 13,
      color: colors.textMuted,
      lineHeight: 18,
      marginBottom: spacing.sm,
    },
    footer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    tagRow: {
      flexDirection: "row",
      gap: 6,
    },
    tag: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: radius.full,
      backgroundColor: colors.primarySoft,
      borderWidth: 1,
      borderColor: isDark ? "rgba(74,171,122,0.25)" : "rgba(45,106,79,0.14)",
    },
    tagText: {
      fontSize: 11,
      color: colors.primary,
      fontWeight: "700",
      letterSpacing: 0.2,
    },
    arrowCircle: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: colors.primarySoft,
      borderWidth: 1,
      borderColor: isDark ? "rgba(74,171,122,0.25)" : "rgba(45,106,79,0.14)",
      alignItems: "center",
      justifyContent: "center",
    },
  });
}

export default HerbCard;
