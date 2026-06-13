import React, { useState, useMemo, useRef, useCallback } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import { radius, spacing, type AppColors } from "../src/theme";
import { useAuth } from "../src/context/AuthContext";
import { useThemeColors } from "../src/context/ThemeContext";
import { useAlert } from "../src/context/AlertContext";

const { height: SCREEN_H } = Dimensions.get("window");
const HERO_H  = SCREEN_H * 0.60;

const HERO_IMAGE = require("../assets/images/signup-image.jpg");
const BRAND_LOGO = require("../assets/images/logo-Photoroom.png");

export default function SignupScreen() {
  const router = useRouter();
  const { user, signup, loading } = useAuth();
  const { showAlert } = useAlert();

  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");

  React.useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user]);
  const [confirm,  setConfirm]  = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [remember, setRemember] = useState(false);

  const colors = useThemeColors();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  // ── Entrance animations ──────────────────────────────────────────────────
  const brandFadeAnim   = useRef(new Animated.Value(0)).current;
  const headingFadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim       = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      brandFadeAnim.setValue(0);
      headingFadeAnim.setValue(0);
      slideAnim.setValue(0);

      Animated.stagger(150, [
        Animated.timing(brandFadeAnim, {
          toValue: 1, duration: 500, useNativeDriver: true,
        }),
        Animated.timing(headingFadeAnim, {
          toValue: 1, duration: 500, useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 1, duration: 600, useNativeDriver: true,
        }),
      ]).start();
    }, [brandFadeAnim, headingFadeAnim, slideAnim])
  );

  const drawerTranslateY = slideAnim.interpolate({
    inputRange:  [0, 1],
    outputRange: [180, 0],
  });
  const drawerOpacity = slideAnim.interpolate({
    inputRange:  [0, 1],
    outputRange: [0, 1],
  });

  // ── Handlers ─────────────────────────────────────────────────────────────

  const handleCreate = async () => {
    if (!name.trim()) {
      showAlert("Name required", "Please enter your full name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      showAlert("Invalid email", "Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      showAlert("Weak password", "Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      showAlert("Password mismatch", "Passwords do not match.");
      return;
    }
    try {
      await signup(name.trim(), email.trim(), password);
      router.replace("/");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Sign up failed. Please try again.";
      showAlert("Sign Up Failed", message);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior="padding"
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* ── HERO IMAGE (60 %) ──────────────────────────────── */}
        <ImageBackground
          source={typeof HERO_IMAGE === "string" ? { uri: HERO_IMAGE } : HERO_IMAGE}
          style={styles.hero}
          resizeMode="cover"
        >
          <LinearGradient
            colors={["rgba(27,67,50,0.15)", "rgba(27,67,50,0.80)"]}
            style={StyleSheet.absoluteFill}
          />

          <SafeAreaView edges={["top"]} style={styles.safeHero}>
            <View style={styles.heroContent}>
              <Animated.View style={{ opacity: brandFadeAnim }}>
                <View style={styles.brandContainer}>
                  <Image source={BRAND_LOGO} style={styles.brandLogo} />
                  <Text style={styles.brandText}>PlantSage AI</Text>
                </View>
              </Animated.View>

              <Animated.View style={{ opacity: headingFadeAnim }}>
                <Text style={styles.heroHeading}>
                  Join us to explore{"\n"}
                  <Text style={styles.heroAccent}>nature's ancient{"\n"}</Text>
                  herbal wisdom.
                </Text>
              </Animated.View>
            </View>
          </SafeAreaView>
        </ImageBackground>

        {/* ── FLOATING DRAWER ─────────────────────────── */}
        <Animated.View
          style={[
            styles.drawer,
            {
              opacity: drawerOpacity,
              transform: [{ translateY: drawerTranslateY }],
              marginTop: -36,
            },
          ]}
        >
          {/* pill handle */}
          <View style={styles.handle} />

          <View style={styles.drawerContent}>
            {/* Title */}
            <Text style={styles.title}>Sign up</Text>
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Already Have An Account? </Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.switchLink}>Sign In</Text>
              </TouchableOpacity>
            </View>

            {/* Full Name */}
            <View style={styles.inputRow}>
              <Ionicons name="person-outline" size={17} color={colors.textMuted} />
              <TextInput
                placeholder="Full name"
                placeholderTextColor={colors.textMuted}
                value={name}
                onChangeText={setName}
                style={styles.input}
                autoCapitalize="words"
                autoComplete="name"
              />
            </View>

            {/* Email */}
            <View style={styles.inputRow}>
              <Ionicons name="mail-outline" size={17} color={colors.textMuted} />
              <TextInput
                placeholder="Enter your email address"
                placeholderTextColor={colors.textMuted}
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            {/* Password */}
            <View style={styles.inputRow}>
              <Ionicons name="lock-closed-outline" size={17} color={colors.textMuted} />
              <TextInput
                placeholder="Password (min. 6 characters)"
                placeholderTextColor={colors.textMuted}
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry={!showPass}
                autoCapitalize="none"
                autoComplete="new-password"
              />
              <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                <Ionicons
                  name={showPass ? "eye-outline" : "eye-off-outline"}
                  size={17}
                  color={colors.textMuted}
                />
              </TouchableOpacity>
            </View>

            {/* Confirm password */}
            <View style={styles.inputRow}>
              <Ionicons name="lock-closed-outline" size={17} color={colors.textMuted} />
              <TextInput
                placeholder="Confirm password"
                placeholderTextColor={colors.textMuted}
                value={confirm}
                onChangeText={setConfirm}
                style={styles.input}
                secureTextEntry={!showConf}
                autoCapitalize="none"
                autoComplete="new-password"
              />
              <TouchableOpacity onPress={() => setShowConf(!showConf)}>
                <Ionicons
                  name={showConf ? "eye-outline" : "eye-off-outline"}
                  size={17}
                  color={colors.textMuted}
                />
              </TouchableOpacity>
            </View>

            {/* Remember */}
            <View style={styles.rememberRow}>
              <TouchableOpacity
                style={styles.checkRow}
                onPress={() => setRemember(!remember)}
                activeOpacity={0.7}
              >
                <View style={[styles.checkbox, remember && styles.checkboxOn]}>
                  {remember && <Ionicons name="checkmark" size={10} color="#fff" />}
                </View>
                <Text style={styles.rememberText}>I agree to the Terms & Privacy Policy</Text>
              </TouchableOpacity>
            </View>

            {/* Primary CTA */}
            <TouchableOpacity
              style={[styles.primaryBtn, loading && styles.primaryBtnDisabled]}
              onPress={handleCreate}
              activeOpacity={0.85}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color={colors.primaryForeground} />
              ) : (
                <Text style={styles.primaryBtnText}>Create Account</Text>
              )}
            </TouchableOpacity>

          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function makeStyles(colors: AppColors) {
  const isDark = colors.background === "#0e1a13";
  return StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.background },
    scrollContent: { flexGrow: 1 },

    // ── Hero ──────────────────────────────────────────────────────
    hero: { height: HERO_H },
    safeHero: { flex: 1 },
    heroContent: {
      flex: 1,
      justifyContent: "flex-start",
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg,
      gap: 14,
    },
    brandContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      alignSelf: "flex-start",
    },
    brandLogo: {
      width: 32,
      height: 32,
      resizeMode: "contain",
    },
    brandText: {
      fontSize: 18,
      fontWeight: "800",
      color: "#f9f5ef",
      letterSpacing: 0.5,
    },
    heroHeading: {
      fontSize: 28,
      fontWeight: "800",
      color: "#f9f5ef",
      lineHeight: 38,
    },
    heroAccent: { color: colors.saffron },

    // ── Drawer ────────────────────────────────────────────────────
    drawer: {
      flex: 1,
      backgroundColor: colors.background,
      borderTopLeftRadius: 36,
      borderTopRightRadius: 36,
      paddingTop: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -6 },
      shadowOpacity: 0.12,
      shadowRadius: 20,
      elevation: 24,
      borderWidth: 1,
      borderColor: colors.border,
    },
    handle: {
      width: 44,
      height: 4,
      borderRadius: 2,
      backgroundColor: colors.border,
      alignSelf: "center",
      marginBottom: 16,
    },
    drawerContent: {
      paddingHorizontal: spacing.lg,
      paddingBottom: 28,
    },

    // ── Heading ───────────────────────────────────────────────────
    title:       { fontSize: 22, fontWeight: "800", color: colors.text, marginBottom: 4 },
    switchRow:   { flexDirection: "row", alignItems: "center", marginBottom: 16 },
    switchLabel: { fontSize: 13, color: colors.textMuted },
    switchLink:  { fontSize: 13, color: colors.primary, fontWeight: "700" },

    // ── Inputs ────────────────────────────────────────────────────
    inputRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      height: 46,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.md,
      backgroundColor: colors.surface,
      paddingHorizontal: spacing.md,
      marginBottom: 12,
    },
    input: { flex: 1, fontSize: 14, color: colors.text },

    // ── Remember ─────────────────────────────────────────
    rememberRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 14,
      marginTop: 4,
    },
    checkRow:   { flexDirection: "row", alignItems: "center", gap: 7, flex: 1 },
    checkbox: {
      width: 17, height: 17, borderRadius: 4,
      borderWidth: 1.5, borderColor: colors.border,
      backgroundColor: isDark ? colors.surfaceAlt : "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    checkboxOn:   { backgroundColor: colors.primary, borderColor: colors.primary },
    rememberText: { fontSize: 12, color: colors.textMuted, flex: 1, flexWrap: "wrap" },

    // ── Primary ───────────────────────────────────────────────────
    primaryBtn: {
      height: 48,
      borderRadius: radius.full,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.28,
      shadowRadius: 10,
      elevation: 6,
      marginBottom: 16,
    },
    primaryBtnDisabled: { opacity: 0.6 },
    primaryBtnText:  { fontSize: 16, fontWeight: "700", color: colors.primaryForeground },
  });
}
