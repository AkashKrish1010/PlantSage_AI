import React, { useMemo, useState } from "react";
import {
  View, Text, StyleSheet, TouchableOpacity, Image,
  ScrollView, ActivityIndicator, Modal, TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { AppColors, radius, spacing } from "../src/theme";
import BottomNav from "../src/components/BottomNav";
import { classifyPlant, MLIdentifyResult } from "../src/services/plantClassifier";
import { verifyPlantWithVision, verifyIsPlant, type VisionVerifyResult } from "../src/services/geminiService";
import { savePlantLocation, isDuplicateNearby } from "../src/services/savedPlantsService";
import SwipeTabWrapper from "../src/components/SwipeTabWrapper";
import { SpinnerOverlay } from "../src/components/Spinner";
import { useThemeColors } from "../src/context/ThemeContext";
import { useAlert } from "../src/context/AlertContext";

export default function IdentifyScreen() {
  const router = useRouter();
  const colors = useThemeColors();
  const { showAlert } = useAlert();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<MLIdentifyResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Arbitrated final answer (ML + Gemini cross-check, source never shown)
  const [finalPlant, setFinalPlant] = useState<string | null>(null);
  const [finalConfidence, setFinalConfidence] = useState<number | null>(null);
  const [geminiWon, setGeminiWon] = useState(false);
  // Testing indicator — shows which path was taken ("ML" or "AI+ML")
  const [source, setSource] = useState<"ML" | "AI+ML" | null>(null);

  // Location save state
  const [locationSaving, setLocationSaving] = useState(false);
  const [locationSaved, setLocationSaved] = useState(false);
  // Track image source — Save Location is only offered for camera scans
  const [isFromCamera, setIsFromCamera] = useState(false);

  // Modal states
  const [modalVisible, setModalVisible] = useState(false);
  const [reasoning, setReasoning] = useState<string | null>(null);
  const [plantCare, setPlantCare] = useState<string | null>(null);
  const [aboutPlant, setAboutPlant] = useState<string | null>(null);
  const [isToxic, setIsToxic] = useState(false);
  const [needsCaution, setNeedsCaution] = useState(false);
  const [ayushRecognized, setAyushRecognized] = useState(false);

  // Confidence threshold: below this, Gemini is called to assist
  const ML_CONFIDENCE_THRESHOLD = 92;
  // If top-1 confidence is below this, the image is almost certainly not a plant
  const NOT_PLANT_THRESHOLD = 10;

  // Find which top5 entry corresponds to the winning plant name
  const findWinnerInTop5 = (top5: MLIdentifyResult["top5"], plantName: string): number => {
    const needle = plantName.toLowerCase();
    return top5.findIndex(
      (p) =>
        needle.includes(p.class_name.replace(/_/g, " ")) ||
        p.display_name.toLowerCase().split(" ").some(
          (w) => w.length > 3 && needle.includes(w)
        )
    );
  };

  // Arbitration: compare ML + Gemini confidences, pick the winner silently
  const arbitrate = (
    mlConfidence: number,
    mlName: string,
    geminiName: string,
    geminiLevel: "high" | "medium" | "low",
    agrees: boolean,
  ): { plant: string; confidence: number; geminiWon: boolean } => {
    const geminiScore = { high: 93, medium: 72, low: 48 }[geminiLevel];
    if (agrees) {
      return { plant: mlName, confidence: Math.min(Math.max(mlConfidence, geminiScore), 99.5), geminiWon: false };
    }
    if (geminiScore > mlConfidence + 10) {
      return { plant: geminiName, confidence: geminiScore, geminiWon: true };
    }
    return { plant: mlName, confidence: mlConfidence, geminiWon: false };
  };

  const processImage = async (base64: string, uri: string) => {
    setImageUri(uri);
    setScanning(true);
    setResult(null);
    setError(null);
    setFinalPlant(null);
    setFinalConfidence(null);
    setGeminiWon(false);
    setSource(null);
    setReasoning(null);

    try {
      // ── Step 0: Plant gate ──────────────────────────────────────────────
      // Ask Gemini Vision FIRST — before any ML call — whether the image
      // actually shows a plant. If not, show hardcoded rejection immediately
      // and skip all further processing (no ML server hit needed).
      const isPlant = await verifyIsPlant(base64);
      if (!isPlant) {
        setError("NOT_A_PLANT");
        return;
      }

      // ── Step 1: ML inference ────────────────────────────────────────────
      // Plant confirmed — run EfficientNetV2S with TTA.
      const prediction = await classifyPlant(base64, true);
      setResult(prediction);
      const top = prediction.top_prediction;

      if (top.confidence >= ML_CONFIDENCE_THRESHOLD) {
        // ✅ ML ≥ 92% — plant confirmed by gate, trust ML directly
        setFinalPlant(top.display_name);
        setFinalConfidence(top.confidence);
        setGeminiWon(false);
        setSource("ML");
        setReasoning(
          `Identified as ${top.display_name} by our high-confidence EfficientNetV2S neural model based on structural leaf pattern matching.`
        );
        setIsToxic(top.is_toxic);
        setNeedsCaution(top.needs_caution);
        setAyushRecognized(top.ayush_recognized);

        const nameLower = top.display_name.toLowerCase();
        if (nameLower.includes("tulsi") || nameLower.includes("basil") || nameLower.includes("neem") || nameLower.includes("aloe")) {
          setPlantCare("Easy");
        } else if (nameLower.includes("ashwagandha")) {
          setPlantCare("Moderate");
        } else {
          setPlantCare("Moderate");
        }

        // Local descriptions for offline/fast path — only render if matching plant is found
        const LOCAL_DESCRIPTIONS: Record<string, string> = {
          "tulsi": "A highly revered Ayurvedic herb traditionally used to support respiratory health and immune system function.",
          "basil": "A highly revered Ayurvedic herb traditionally used to support respiratory health and immune system function.",
          "neem": "A highly valued antiseptic tree known for its antibacterial properties and skin healing benefits.",
          "aloe": "A soothing succulent renowned for its cooling gel, widely used to heal skin and support digestion.",
          "ashwagandha": "A prominent adaptogenic herb prized for its ability to reduce stress and enhance vitality.",
        };
        let foundDesc: string | null = null;
        for (const key of Object.keys(LOCAL_DESCRIPTIONS)) {
          if (nameLower.includes(key)) {
            foundDesc = LOCAL_DESCRIPTIONS[key];
            break;
          }
        }
        setAboutPlant(foundDesc);
      } else {
        // ⚠️ ML < 92% — plant is confirmed, ask Gemini to verify/identify
        const visionResult = await verifyPlantWithVision(
          base64,
          top.display_name,
          top.class_name,
          top.confidence,
        );
        const { plant, confidence, geminiWon: gWon } = arbitrate(
          top.confidence,
          top.display_name,
          visionResult.geminiPlant,
          visionResult.geminiConfidence,
          visionResult.agrees,
        );
        setFinalPlant(plant);
        setFinalConfidence(confidence);
        setGeminiWon(gWon);
        setSource("AI+ML");
        setReasoning(visionResult.reasoning || "Visual observation successfully processed via dual AI+ML arbitration.");
        setPlantCare(visionResult.plant_care || "Moderate");
        setAboutPlant(visionResult.about_plant || null);

        const geminiSaysToxic = visionResult.is_toxic === true || !!visionResult.caution;
        const geminiSaysCaution = !!visionResult.caution;

        if (gWon) {
          setIsToxic(geminiSaysToxic);
          setNeedsCaution(geminiSaysCaution);
          const isAyush =
            plant.toLowerCase().includes("tulsi") ||
            plant.toLowerCase().includes("basil") ||
            plant.toLowerCase().includes("neem") ||
            plant.toLowerCase().includes("aloe") ||
            plant.toLowerCase().includes("ashwagandha") ||
            plant.toLowerCase().includes("ginger") ||
            plant.toLowerCase().includes("amla") ||
            plant.toLowerCase().includes("turmeric") ||
            plant.toLowerCase().includes("mint");
          setAyushRecognized(isAyush);
        } else {
          setIsToxic(top.is_toxic || geminiSaysToxic);
          setNeedsCaution(top.needs_caution || geminiSaysCaution);
          setAyushRecognized(top.ayush_recognized);
        }
      }
      setModalVisible(true);
    } catch (e: any) {
      setError(
        e.message?.includes("Network request failed") || e.message?.includes("fetch")
          ? "Could not reach ML server. Make sure  python ml/server.py  is running."
          : e.message || "Identification failed. Try a clearer photo."
      );
    } finally {
      setScanning(false);
    }
  };

  const handleCapture = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      showAlert("Camera Permission", "Camera access is required to scan plants.");
      return;
    }
    const picked = await ImagePicker.launchCameraAsync({
      mediaTypes: 'images',
      quality: 0.75,
      base64: true,
    });
    if (!picked.canceled && picked.assets[0].base64) {
      setIsFromCamera(true);
      await processImage(picked.assets[0].base64, picked.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    const picked = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      quality: 0.75,
      base64: true,
    });
    if (!picked.canceled && picked.assets[0].base64) {
      setIsFromCamera(false);
      await processImage(picked.assets[0].base64, picked.assets[0].uri);
    }
  };

  const reset = () => {
    setImageUri(null);
    setScanning(false);
    setResult(null);
    setError(null);
    setFinalPlant(null);
    setFinalConfidence(null);
    setGeminiWon(false);
    setSource(null);
    setLocationSaved(false);
    setLocationSaving(false);
    setIsFromCamera(false);
    setModalVisible(false);
    setReasoning(null);
    setPlantCare(null);
    setAboutPlant(null);
    setIsToxic(false);
    setNeedsCaution(false);
    setAyushRecognized(false);
  };

  const handleSaveLocation = async () => {
    if (!finalPlant || locationSaved) return;
    setLocationSaving(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        showAlert(
          "Location Permission",
          "Location access is required to save this plant's location."
        );
        return;
      }
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });
      const { latitude, longitude } = loc.coords;

      // Reverse geocode for friendly address
      let address: string | undefined;
      try {
        const geo = await Location.reverseGeocodeAsync({ latitude, longitude });
        if (geo.length > 0) {
          const g = geo[0];
          const parts = [g.name, g.district, g.city, g.region]
            .filter(Boolean)
            .join(", ");
          address = parts || undefined;
        }
      } catch { /* silent — coords alone are fine */ }

      // Duplicate check
      const dup = await isDuplicateNearby(finalPlant, latitude, longitude);
      if (dup) {
        showAlert(
          "Already Saved Nearby",
          `A ${finalPlant} has already been saved within 100 m of this location.`
        );
        setLocationSaving(false);
        return;
      }

      const sciName = geminiWon ? "" : (result?.top_prediction?.class_name?.replace(/_/g, " ") ?? "");
      await savePlantLocation({
        name: finalPlant,
        scientificName: sciName,
        confidence: finalConfidence ?? result?.top_prediction?.confidence ?? 0,
        latitude,
        longitude,
        address,
        savedAt: Date.now(),
        imageUri: imageUri ?? undefined,
      });
      setLocationSaved(true);
    } catch (e: any) {
      showAlert("Error", e?.message ?? "Could not save location. Please try again.");
    } finally {
      setLocationSaving(false);
    }
  };

  const viewDetails = () => {
    // Navigate using the final (arbitrated) plant name, not just ML top prediction
    const plantName = finalPlant ?? result?.top_prediction?.display_name;
    // If Gemini overrules the ML, the ML's className is incorrect. Set it to empty.
    const className = geminiWon ? "" : result?.top_prediction?.class_name;
    if (!plantName) return;
    router.push({
      pathname: "/herb-detail/[id]",
      params: {
        id: encodeURIComponent(plantName),
        className: className ?? "",
        isToxic: isToxic ? "true" : "false",
        userImage: imageUri ?? "",
      },
    } as any);
  };

  const top = result?.top_prediction;

  return (
    <SwipeTabWrapper>
      <View style={styles.root}>
        {/* Header */}
        <LinearGradient
          colors={[colors.herbDark, colors.primary]}
          style={styles.headerGrad}
        >
          <SafeAreaView edges={['top']}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Identify Plant</Text>
              <Text style={styles.headerSub}>Point camera at any plant — AI identifies it instantly</Text>
            </View>
          </SafeAreaView>
        </LinearGradient>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

          {/* Server status pill removed — server is always running locally */}

          {/* Camera / preview box */}
          <View style={styles.cameraBox}>
            {imageUri ? (
              <>
                <Image source={{ uri: imageUri }} style={styles.preview} resizeMode="cover" />
                <TouchableOpacity onPress={reset} style={styles.closeBtn}>
                  <Ionicons name="close" size={20} color={colors.text} />
                </TouchableOpacity>

                {/* Scanning overlay */}
                {scanning && (
                  <View style={styles.scanOverlay}>
                    <SpinnerOverlay size={40} />
                    <Text style={styles.scanLabel}>Identifying plant…</Text>
                  </View>
                )}
              </>
            ) : (
              <View style={styles.placeholder}>
                <View style={styles.placeholderIcon}>
                  <Ionicons name="camera-outline" size={52} color={colors.textMuted} />
                </View>
                <Text style={styles.placeholderTitle}>Point camera at a plant</Text>
                <Text style={styles.placeholderSub}>
                  EfficientNetV2S model — 71 Indian medicinal plant species (98.4% TTA accuracy)
                </Text>
              </View>
            )}
          </View>

          {/* Action buttons */}
          {!imageUri && (
            <View style={styles.btnRow}>
              <TouchableOpacity style={styles.btnPrimary} onPress={handleCapture} activeOpacity={0.85}>
                <Ionicons name="camera" size={18} color="#fff" />
                <Text style={styles.btnPrimaryText}>Capture Live</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSecondary} onPress={handleUpload} activeOpacity={0.85}>
                <Ionicons name="cloud-upload-outline" size={18} color={colors.primary} />
                <Text style={styles.btnSecondaryText}>From Gallery</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Not-a-plant Pop-Up Modal */}
          <Modal
            visible={error === "NOT_A_PLANT" && !scanning}
            transparent={true}
            animationType="fade"
            onRequestClose={reset}
          >
            <View style={styles.popupBackdrop}>
              <TouchableWithoutFeedback onPress={reset}>
                <View style={StyleSheet.absoluteFillObject} />
              </TouchableWithoutFeedback>

              <View style={styles.popupCard}>
                {/* Close Button */}
                <TouchableOpacity
                  style={styles.popupCloseBtn}
                  onPress={reset}
                  activeOpacity={0.8}
                >
                  <Ionicons name="close" size={18} color={colors.textMuted} />
                </TouchableOpacity>

                <View style={styles.popupIconWrap}>
                  <Ionicons name="image-outline" size={36} color={colors.saffron} />
                </View>

                <Text style={styles.popupTitle}>No plant detected</Text>
                <Text style={styles.popupMsg}>
                  Please upload a clear photo of a plant or leaf. Other images — people, food, objects — cannot be identified.
                </Text>

                <TouchableOpacity
                  style={styles.popupBtn}
                  onPress={reset}
                  activeOpacity={0.85}
                >
                  <Ionicons name="camera" size={16} color="#fff" />
                  <Text style={styles.popupBtnText}>Try a Plant Photo</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Generic error state */}
          {error && error !== "NOT_A_PLANT" && !scanning && (
            <View style={styles.errorCard}>
              <Ionicons name="alert-circle-outline" size={36} color={colors.danger} />
              <Text style={styles.errorTitle}>Identification Failed</Text>
              <Text style={styles.errorMsg}>{error}</Text>
              <TouchableOpacity style={styles.retryBtn} onPress={reset}>
                <Text style={styles.retryText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Action buttons shown after successful scan to reopen the Modal or reset */}
          {imageUri && !scanning && finalPlant && error !== "NOT_A_PLANT" && (
            <View style={styles.btnRow}>
              <TouchableOpacity
                style={styles.btnPrimary}
                onPress={() => setModalVisible(true)}
                activeOpacity={0.85}
              >
                <Ionicons name="eye" size={18} color="#fff" />
                <Text style={styles.btnPrimaryText}>View Results</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnSecondary}
                onPress={reset}
                activeOpacity={0.85}
              >
                <Ionicons name="refresh-outline" size={18} color={colors.primary} />
                <Text style={styles.btnSecondaryText}>Scan Another</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Slide-Up Bottom Sheet Modal for Scan Results */}
          {result && top && finalPlant && (
            <Modal
              visible={modalVisible}
              transparent={true}
              animationType="slide"
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalBackdrop}>
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                  <View style={{ flex: 1 }} />
                </TouchableWithoutFeedback>

                <View style={styles.modalSheet}>
                  {/* Drag Handle */}
                  <View style={styles.modalDragHandle} />

                  {/* Graphic/Image Header */}
                  <View style={{ paddingHorizontal: spacing.lg }}>
                    <View style={styles.modalHeaderBox}>
                      {imageUri ? (
                        <Image source={{ uri: imageUri }} style={styles.modalHeaderImage} />
                      ) : (
                        <LinearGradient
                          colors={[colors.herbDark, colors.primary]}
                          style={styles.modalHeaderGrad}
                        >
                          <Ionicons name="leaf" size={48} color="#f6f2ea" />
                        </LinearGradient>
                      )}

                      {/* Close button inside modal */}
                      <TouchableOpacity
                        style={styles.modalCloseBtn}
                        onPress={() => setModalVisible(false)}
                        activeOpacity={0.85}
                      >
                        <Ionicons name="close" size={20} color="#fff" />
                      </TouchableOpacity>

                      {/* Match Confidence Pill */}
                      <View style={styles.modalMatchPill}>
                        <Ionicons name="checkmark-circle" size={14} color="#fff" />
                        <Text style={styles.modalMatchText}>
                          {(finalConfidence ?? top.confidence).toFixed(0)}% match
                        </Text>
                      </View>
                    </View>
                  </View>

                  <ScrollView
                    contentContainerStyle={styles.modalScroll}
                    showsVerticalScrollIndicator={false}
                  >
                    {/* Title Section */}
                    <Text style={styles.modalTitle}>{finalPlant}</Text>
                    {(() => {
                      if (!geminiWon) {
                        return <Text style={styles.modalSubtitle}>{top.class_name.replace(/_/g, " ")}</Text>;
                      }
                      const idx = findWinnerInTop5(result.top5, finalPlant ?? "");
                      if (idx >= 0) {
                        return <Text style={styles.modalSubtitle}>{result.top5[idx].class_name.replace(/_/g, " ")}</Text>;
                      }
                      return null;
                    })()}

                    {/* Tags Badge Row */}
                    <View style={styles.badgeRow}>
                      {ayushRecognized && (
                        <View style={styles.ayushBadge}>
                          <Ionicons name="shield-checkmark" size={12} color={colors.primary} />
                          <Text style={styles.ayushText}>AYUSH Recognised</Text>
                        </View>
                      )}
                      {needsCaution && (
                        <View style={styles.cautionBadge}>
                          <Ionicons name="warning-outline" size={12} color={colors.saffron} />
                          <Text style={styles.cautionText}>Use with Caution</Text>
                        </View>
                      )}
                      {isToxic && (
                        <View style={[styles.cautionBadge, { backgroundColor: "rgba(220,38,38,0.08)" }]}>
                          <Ionicons name="alert-circle-outline" size={12} color={colors.danger} />
                          <Text style={[styles.cautionText, { color: colors.danger }]}>Toxic Plant</Text>
                        </View>
                      )}
                    </View>

                    {/* Quick Info Grid */}
                    <View style={styles.modalStatsTable}>
                      <View style={styles.modalStatsRow}>
                        <View style={styles.modalStatsLabelCol}>
                          <Ionicons name="shield-checkmark-outline" size={16} color={colors.textMuted} />
                          <Text style={styles.modalStatsLabel}>AYUSH Status</Text>
                        </View>
                        <Text style={styles.modalStatsValue}>
                          {ayushRecognized ? "Recognised" : "Unlisted"}
                        </Text>
                      </View>
                      <View style={styles.modalStatsDivider} />
                      <View style={styles.modalStatsRow}>
                        <View style={styles.modalStatsLabelCol}>
                          <Ionicons name="heart-outline" size={16} color={colors.textMuted} />
                          <Text style={styles.modalStatsLabel}>Toxicity</Text>
                        </View>
                        <Text style={[styles.modalStatsValue, isToxic && { color: colors.danger }]}>
                          {isToxic ? "Toxic" : "Non-toxic"}
                        </Text>
                      </View>
                      <View style={styles.modalStatsDivider} />
                      <View style={styles.modalStatsRow}>
                        <View style={styles.modalStatsLabelCol}>
                          <Ionicons name="git-network-outline" size={16} color={colors.textMuted} />
                          <Text style={styles.modalStatsLabel}>Verification</Text>
                        </View>
                        <Text style={styles.modalStatsValue}>
                          {source === "AI+ML" ? "AI+ML Assisted" : "ML Direct"}
                        </Text>
                      </View>
                      <View style={styles.modalStatsDivider} />
                      <View style={styles.modalStatsRow}>
                        <View style={styles.modalStatsLabelCol}>
                          <Ionicons name="leaf-outline" size={16} color={colors.textMuted} />
                          <Text style={styles.modalStatsLabel}>Plant Care</Text>
                        </View>
                        <Text style={styles.modalStatsValue}>
                          {plantCare || "Moderate"}
                        </Text>
                      </View>
                    </View>

                    {/* About / Observation Description */}
                    {aboutPlant ? (
                      <>
                        <Text style={styles.modalSectionHeading}>About</Text>
                        <Text style={styles.modalAboutBody}>{aboutPlant}</Text>
                      </>
                    ) : null}

                    {/* Confidence breakdown progress bars */}
                    <Text style={styles.modalSectionHeading}>Confidence breakdown</Text>
                    <View style={styles.modalBreakdownCard}>
                      {(() => {
                        let list = [...result.top5];
                        if (source === "AI+ML" && finalPlant) {
                          // Remove the duplicate if it already matches the winner
                          list = list.filter((p) => p.display_name.toLowerCase() !== finalPlant.toLowerCase());
                          // Place the AI prediction at the very top (index 0)
                          list.unshift({
                            rank: 1,
                            class_name: result.top5[0]?.class_name || "unknown",
                            display_name: finalPlant,
                            confidence: finalConfidence ?? 90,
                            is_toxic: top.is_toxic,
                            needs_caution: top.needs_caution,
                            ayush_recognized: top.ayush_recognized,
                            model_source: "AI Model",
                          });
                        }
                        return list.map((p) => {
                          const isWinner = p.display_name === finalPlant;
                          return (
                            <View key={p.class_name + "_" + p.display_name} style={styles.modalBreakdownRow}>
                              <View style={styles.modalBreakdownLabelRow}>
                                <Text
                                  style={[
                                    styles.modalBreakdownLabel,
                                    isWinner && { color: colors.primary, fontWeight: "800" },
                                  ]}
                                >
                                  {p.display_name}
                                </Text>
                                <Text style={styles.modalBreakdownPercent}>
                                  {p.confidence.toFixed(1)}%
                                </Text>
                              </View>
                              <View style={styles.modalBarTrack}>
                                <View
                                  style={[
                                    styles.modalBarFill,
                                    { width: `${p.confidence}%` },
                                    isWinner ? { backgroundColor: colors.primary } : { backgroundColor: colors.textMuted, opacity: 0.5 },
                                  ]}
                                />
                              </View>
                            </View>
                          );
                        });
                      })()}
                    </View>

                    {/* Live Location Save CTA */}
                    {isFromCamera && (
                      <TouchableOpacity
                        style={[
                          styles.saveLocBtn,
                          locationSaved && styles.saveLocBtnSaved,
                        ]}
                        onPress={handleSaveLocation}
                        activeOpacity={0.85}
                        disabled={locationSaved || locationSaving}
                      >
                        {locationSaving ? (
                          <ActivityIndicator size="small" color="#fff" />
                        ) : (
                          <Ionicons
                            name={locationSaved ? "checkmark-circle" : "location"}
                            size={17}
                            color="#fff"
                          />
                        )}
                        <Text style={styles.saveLocText}>
                          {locationSaved ? "Location Saved" : "Save Location"}
                        </Text>
                      </TouchableOpacity>
                    )}

                    {/* Main CTA */}
                    <TouchableOpacity
                      style={styles.viewFullBtn}
                      onPress={() => {
                        setModalVisible(false);
                        viewDetails();
                      }}
                      activeOpacity={0.85}
                    >
                      <Ionicons name="leaf" size={16} color="#fff" />
                      <Text style={styles.viewFullText}>View Full Details</Text>
                      <Ionicons name="arrow-forward" size={16} color="#fff" />
                    </TouchableOpacity>

                    <View style={{ height: 20 }} />
                  </ScrollView>
                </View>
              </View>
            </Modal>
          )}

          <View style={{ height: 100 }} />
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

    headerGrad: {
      paddingBottom: spacing.lg,
    },
    header: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
    },
    headerTitle: {
      fontSize: 26,
      fontWeight: "800",
      color: "#f6f2ea",
      letterSpacing: -0.3,
    },
    headerSub: {
      fontSize: 13,
      color: "rgba(246,242,234,0.82)",
      marginTop: 3,
      lineHeight: 18,
    },

    scrollContent: {
      paddingHorizontal: spacing.md,
      paddingTop: spacing.md,
    },

    // Server status
    serverWarning: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      backgroundColor: isDark ? "rgba(240,144,48,0.14)" : "#fff3e0",
      borderWidth: 1,
      borderColor: isDark ? "rgba(240,144,48,0.32)" : "#ffcc80",
      borderRadius: radius.full,
      paddingHorizontal: 12,
      paddingVertical: 6,
      marginBottom: spacing.sm,
      alignSelf: "flex-start",
    },
    serverWarningText: { fontSize: 11, color: colors.accent, fontWeight: "600" },
    serverOnline: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      backgroundColor: colors.primarySoft,
      borderRadius: radius.full,
      paddingHorizontal: 12,
      paddingVertical: 6,
      marginBottom: spacing.sm,
      alignSelf: "flex-start",
      borderWidth: 1,
      borderColor: isDark ? "rgba(74,171,122,0.25)" : "rgba(45,106,79,0.14)",
    },
    serverOnlineText: { fontSize: 11, color: colors.primary, fontWeight: "600" },

    // Camera box
    cameraBox: {
      aspectRatio: 3 / 4,
      borderRadius: radius.xl,
      overflow: "hidden",
      backgroundColor: isDark ? "rgba(74,171,122,0.06)" : "rgba(27,67,50,0.08)",
      borderWidth: 2,
      borderColor: isDark ? "rgba(74,171,122,0.26)" : "rgba(45,106,79,0.25)",
      marginBottom: spacing.md,
      alignItems: "center",
      justifyContent: "center",
      borderStyle: "dashed",
    },
  preview: { width: "100%", height: "100%" },
  closeBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: isDark ? "rgba(14,26,19,0.72)" : "rgba(249,245,239,0.9)",
    borderRadius: radius.full,
    padding: 6,
    borderWidth: 1,
    borderColor: isDark ? "rgba(240,236,228,0.12)" : "rgba(0,0,0,0.04)",
  },
  scanOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: isDark ? "rgba(0,0,0,0.55)" : "rgba(27,67,50,0.55)",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },
  scanRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "rgba(249,245,239,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  scanLabel: {
    color: "#f6f2ea",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: -0.2,
  },
  scanSub: {
    color: "rgba(246,242,234,0.72)",
    fontSize: 12,
  },
  placeholder: { alignItems: "center", gap: 10, paddingHorizontal: 24 },
  placeholderIcon: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  placeholderTitle: { fontSize: 16, fontWeight: "600", color: colors.text },
  placeholderSub: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: "center",
    lineHeight: 19,
  },

  // Buttons
  btnRow: { flexDirection: "row", gap: 12, marginBottom: spacing.md },
  btnPrimary: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 52,
    borderRadius: radius.full,
    backgroundColor: colors.saffron,
    shadowColor: colors.saffron,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  btnPrimaryText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  btnSecondary: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 52,
    borderRadius: radius.full,
    borderWidth: 1.5,
    borderColor: isDark ? "rgba(74,171,122,0.55)" : colors.primary,
    backgroundColor: colors.primarySoft,
  },
  btnSecondaryText: { color: colors.primary, fontWeight: "700", fontSize: 15 },

  // Not-a-plant card
  notPlantCard: {
    backgroundColor: isDark ? "rgba(240,144,48,0.08)" : "rgba(217,115,22,0.07)",
    borderWidth: 1,
    borderColor: isDark ? "rgba(240,144,48,0.28)" : "rgba(217,115,22,0.28)",
    borderRadius: radius.xl,
    padding: spacing.lg,
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  notPlantIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: isDark ? "rgba(240,144,48,0.13)" : "rgba(217,115,22,0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
  },
  notPlantTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.saffron,
    letterSpacing: -0.2,
  },
  notPlantMsg: {
    fontSize: 13,
    color: isDark ? "rgba(240,144,48,0.85)" : "rgba(146,64,14,0.85)",
    textAlign: "center",
    lineHeight: 20,
  },
  notPlantBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: 4,
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: radius.full,
    borderWidth: 1.5,
    borderColor: colors.saffron,
    backgroundColor: isDark ? "rgba(240,144,48,0.1)" : "rgba(217,115,22,0.08)",
  },
  notPlantBtnText: { fontSize: 14, fontWeight: "700", color: colors.saffron },

  // Error
  errorCard: {
    backgroundColor: colors.dangerLight,
    borderWidth: 1,
    borderColor: colors.dangerBorder,
    borderRadius: radius.xl,
    padding: spacing.lg,
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  errorTitle: { fontSize: 17, fontWeight: "800", color: colors.danger },
  errorMsg: {
    fontSize: 13,
    color: colors.danger,
    opacity: 0.85,
    textAlign: "center",
    lineHeight: 19,
  },
  retryBtn: {
    marginTop: 4,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.danger,
  },
  retryText: { fontSize: 14, fontWeight: "700", color: colors.danger },

  // Result card
  resultCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: isDark ? 0.2 : 0.08,
    shadowRadius: 16,
    elevation: isDark ? 10 : 8,
    marginBottom: spacing.md,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    alignSelf: "center",
    marginBottom: spacing.md,
    opacity: isDark ? 0.9 : 0.7,
  },
  toxicBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.dangerLight,
    borderWidth: 1,
    borderColor: colors.dangerBorder,
    borderRadius: radius.md,
    padding: spacing.sm,
    marginBottom: spacing.md,
  },
  toxicText: { flex: 1, fontSize: 12, color: colors.danger, fontWeight: "600" },
  resultHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: spacing.sm,
  },
  resultName: { fontSize: 24, fontWeight: "900", color: colors.text, letterSpacing: -0.4 },
  resultClass: {
    fontSize: 13,
    color: colors.textMuted,
    fontStyle: "italic",
    marginTop: 2,
    textTransform: "capitalize",
  },
  confidencePill: {
    alignItems: "center",
    backgroundColor: colors.primarySoft,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    paddingVertical: 8,
    minWidth: 64,
  },
  confNum: { fontSize: 22, fontWeight: "800", color: colors.primary },
  confLabel: { fontSize: 10, color: colors.primary, fontWeight: "500" },
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: spacing.md,
  },
  ayushBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.full,
  },
  ayushText: { fontSize: 11, color: colors.primary, fontWeight: "600" },
  cautionBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(217,115,22,0.12)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.full,
  },
  cautionText: { fontSize: 11, color: colors.saffron, fontWeight: "600" },

  // Alternatives
  altSection: {
    backgroundColor: isDark ? colors.surfaceAlt : colors.background,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: isDark ? "rgba(240,236,228,0.06)" : "transparent",
  },
  altLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textMuted,
    marginBottom: spacing.sm,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  altRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  altName: { fontSize: 13, color: colors.text },
  altConf: { fontSize: 13, color: colors.textMuted },

  // Save Location button
  saveLocBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 52,
    borderRadius: radius.full,
    backgroundColor: colors.saffron,
    shadowColor: colors.saffron,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: spacing.sm,
  },
  saveLocBtnSaved: {
    backgroundColor: isDark ? "#2d7a4f" : "#2d6a4f",
    shadowColor: colors.primary,
  },
  saveLocText: { color: "#fff", fontWeight: "700", fontSize: 15 },

  // CTA
  viewFullBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 52,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: spacing.sm,
  },
  viewFullText: { color: "#f6f2ea", fontWeight: "800", fontSize: 15 },
  tryAgainBtn: {
    alignItems: "center",
    paddingVertical: 10,
  },
  tryAgainText: { fontSize: 14, color: colors.textMuted, fontWeight: "600" },

  // ── Gemini Vision Verification Card ──
  verifyCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.sm,
    backgroundColor: isDark ? "rgba(240,236,228,0.04)" : "rgba(27,67,50,0.04)",
    borderWidth: 1,
    borderColor: colors.border,
  },
  verifyingText: {
    fontSize: 12,
    color: colors.textMuted,
    fontStyle: "italic",
  },
  verifyAgree: {
    backgroundColor: colors.primarySoft,
    borderColor: isDark ? "rgba(74,171,122,0.35)" : "rgba(45,106,79,0.2)",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 6,
  },
  verifyDisagree: {
    backgroundColor: "rgba(217,115,22,0.08)",
    borderColor: "rgba(217,115,22,0.3)",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 6,
  },
  verifyHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
  },
  verifyTitle: {
    fontSize: 13,
    fontWeight: "700",
    flex: 1,
  },
  confChip: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  confChipText: {
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  verifyReasoning: {
    fontSize: 12,
    color: colors.text,
    lineHeight: 17,
    opacity: 0.85,
  },
  verifyCaution: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 5,
  },
  verifyCautionText: {
    fontSize: 11,
    color: colors.danger,
    flex: 1,
    lineHeight: 16,
  },
  verifyFooter: {
    fontSize: 10,
    color: colors.textMuted,
    opacity: 0.6,
    fontStyle: "italic",
    alignSelf: "flex-end",
  },

  // 🧪 Source debug chip (testing only)
  sourceChip: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
    backgroundColor: "rgba(0,0,0,0.06)",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    marginBottom: 4,
  },
  sourceChipText: {
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "700",
    color: colors.textMuted,
    letterSpacing: 0.5,
  },

  // Modal Backdrop & Overlay
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "flex-end",
  },
  modalSheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: "88%",
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 24,
  },
  modalDragHandle: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.border,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 8,
  },
  modalScroll: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },

  // Modal Header Visual
  modalHeaderBox: {
    height: 180,
    borderRadius: radius.lg,
    overflow: "hidden",
    marginBottom: spacing.md,
    position: "relative",
    backgroundColor: colors.herbDark,
  },
  modalHeaderGrad: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeaderImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  modalCloseBtn: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  modalMatchPill: {
    position: "absolute",
    bottom: 12,
    left: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: isDark ? "#2d7a4f" : "#2d6a4f",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  modalMatchText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "800",
  },

  // Typography
  modalTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: colors.text,
    letterSpacing: -0.5,
  },
  modalSubtitle: {
    fontSize: 15,
    fontStyle: "italic",
    color: colors.textMuted,
    marginTop: 2,
    marginBottom: spacing.md,
  },

  // Quick Stats Grid
  modalStatsTable: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: isDark ? "rgba(240,236,228,0.02)" : "rgba(27,67,50,0.02)",
    padding: spacing.md,
    marginVertical: spacing.md,
    gap: 12,
  },
  modalStatsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalStatsLabelCol: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  modalStatsLabel: {
    fontSize: 14,
    color: colors.textMuted,
    fontWeight: "500",
  },
  modalStatsValue: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },
  modalStatsDivider: {
    height: 1,
    backgroundColor: colors.border,
  },

  // About Section
  modalSectionHeading: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.text,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    letterSpacing: -0.2,
  },
  modalAboutBody: {
    fontSize: 13,
    lineHeight: 20,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },

  // Confidence breakdown bars
  modalBreakdownCard: {
    backgroundColor: isDark ? colors.surfaceAlt : "rgba(27,67,50,0.03)",
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  modalBreakdownRow: {
    marginBottom: 12,
  },
  modalBreakdownLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  modalBreakdownLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text,
  },
  modalBreakdownPercent: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.primary,
  },
  modalBarTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
    overflow: "hidden",
  },
  modalBarFill: {
    height: "100%",
    borderRadius: 4,
    backgroundColor: colors.primary,
  },

  // Center Alert Popup Modal
  popupBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    alignItems: "center",
    justifyContent: "center",
  },
  popupCard: {
    width: "85%",
    backgroundColor: colors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    elevation: 24,
    position: "relative",
  },
  popupCloseBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    padding: 4,
  },
  popupIconWrap: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: isDark ? "rgba(240,144,48,0.12)" : "rgba(217,115,22,0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: isDark ? "rgba(240,144,48,0.25)" : "rgba(217,115,22,0.18)",
  },
  popupTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: colors.text,
    letterSpacing: -0.3,
    marginBottom: spacing.xs,
    textAlign: "center",
  },
  popupMsg: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: spacing.lg,
    paddingHorizontal: 6,
  },
  popupBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: "100%",
    height: 48,
    borderRadius: radius.full,
    backgroundColor: colors.saffron,
    shadowColor: colors.saffron,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  popupBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  });
}
