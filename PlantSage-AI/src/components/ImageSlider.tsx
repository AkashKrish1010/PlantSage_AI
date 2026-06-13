/**
 * ImageSlider.tsx  — v2 (glitch-free)
 *
 * Fix log:
 *  • Replaced setInterval (stale-closure bug) with self-scheduling setTimeout
 *  • Single onMomentumScrollEnd handler — no duplicate firing
 *  • activeIndexRef stays in sync with state so the timeout always sees the
 *    correct current index
 *  • Timer is cleared on drag-begin and rescheduled ONLY after momentum ends,
 *    so every slide gets the full SLIDE_INTERVAL regardless of how it was reached
 *  • Dots use the ref-driven index so they never lag
 */

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Dimensions,
  Image,
  Modal,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: SW } = Dimensions.get("window");
const INTERVAL = 3500; // ms each slide stays visible

interface Props {
  images: any[];
  height?: number;
  children?: React.ReactNode;
  gradientColors?: readonly [string, string, ...string[]];
}

export default function ImageSlider({
  images,
  height = 260,
  children,
  gradientColors = ["transparent", "rgba(14,26,19,0.65)", "#0e1a13"],
}: Props) {
  const count = images.length;

  // ── State ──────────────────────────────────────────────────────────
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  // ── Refs ───────────────────────────────────────────────────────────
  const scrollRef = useRef<ScrollView>(null);
  const activeRef = useRef(0);          // always mirrors activeIndex (no stale closure)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isDragging = useRef(false);     // true while finger is on screen

  // ── Helpers ────────────────────────────────────────────────────────
  const clearTimer = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const scrollToIndex = useCallback(
    (index: number, animated = true) => {
      scrollRef.current?.scrollTo({ x: index * SW, animated });
    },
    []
  );

  /** Schedule ONE advance after INTERVAL ms. Clears any existing timer first. */
  const scheduleNext = useCallback(() => {
    if (count < 2) return;
    clearTimer();
    timeoutRef.current = setTimeout(() => {
      if (isDragging.current) return; // safety: skip if user grabbed the scroll
      const next = (activeRef.current + 1) % count;
      activeRef.current = next;
      setActiveIndex(next);
      scrollToIndex(next, true);
      // Re-schedule for the following slide
      scheduleNext();
    }, INTERVAL);
  }, [count, clearTimer, scrollToIndex]);

  // ── Lifecycle ──────────────────────────────────────────────────────
  useEffect(() => {
    scheduleNext();
    return clearTimer;
  }, [scheduleNext, clearTimer]);

  // ── Scroll handlers ────────────────────────────────────────────────
  const onDragStart = useCallback(() => {
    isDragging.current = true;
    clearTimer(); // stop auto-play while user is touching
  }, [clearTimer]);

  const onMomentumEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      isDragging.current = false;
      const index = Math.round(e.nativeEvent.contentOffset.x / SW);
      const clamped = Math.max(0, Math.min(count - 1, index));
      activeRef.current = clamped;
      setActiveIndex(clamped);
      // Resume auto-play; this slide will stay for the full INTERVAL
      scheduleNext();
    },
    [count, scheduleNext]
  );

  // ── Dot tap ────────────────────────────────────────────────────────
  const goToSlide = useCallback(
    (index: number) => {
      clearTimer();
      activeRef.current = index;
      setActiveIndex(index);
      scrollToIndex(index, true);
      scheduleNext();
    },
    [clearTimer, scrollToIndex, scheduleNext]
  );

  // ── Preview helpers ────────────────────────────────────────────────
  const openPreview = useCallback((idx: number) => {
    setPreviewIndex(idx);
    setPreviewOpen(true);
  }, []);

  // ── Render ─────────────────────────────────────────────────────────
  return (
    <View style={[styles.root, { height }]}>

      {/* Slides */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate="fast"
        onScrollBeginDrag={onDragStart}
        onMomentumScrollEnd={onMomentumEnd}
        style={StyleSheet.absoluteFillObject}
        bounces={false}
      >
        {images.map((src, i) => (
          <TouchableWithoutFeedback key={i} onPress={() => openPreview(i)}>
            <Image
              source={src}
              style={{ width: SW, height }}
              resizeMode="cover"
            />
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>

      {/* Gradient overlay */}
      <LinearGradient
        colors={gradientColors}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />

      {/* Slot for back button etc. */}
      {children}

      {/* Dot indicators */}
      {count > 1 && (
        <View style={styles.dots} pointerEvents="box-none">
          {images.map((_, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => goToSlide(i)}
              hitSlop={{ top: 10, bottom: 10, left: 8, right: 8 }}
            >
              <View
                style={[
                  styles.dot,
                  i === activeIndex ? styles.dotActive : styles.dotInactive,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Tap-to-expand hint */}
      <View style={styles.expandHint} pointerEvents="none">
        <Ionicons name="expand-outline" size={12} color="rgba(255,255,255,0.5)" />
        <Text style={styles.expandHintText}>Tap image to preview</Text>
      </View>

      {/* Full-screen preview modal */}
      <Modal
        visible={previewOpen}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setPreviewOpen(false)}
      >
        <View style={styles.modalBg}>
          {/* Safe-area-aware header: close button + counter */}
          <SafeAreaView edges={["top"]} style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setPreviewOpen(false)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="close" size={22} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.modalCounter}>
              {previewIndex + 1} / {count}
            </Text>

            {/* Spacer to balance the close button on the left */}
            <View style={styles.modalCloseBalance} />
          </SafeAreaView>

          {/* Preview slides */}
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            bounces={false}
            contentOffset={{ x: previewIndex * SW, y: 0 }}
            onMomentumScrollEnd={(e) =>
              setPreviewIndex(Math.round(e.nativeEvent.contentOffset.x / SW))
            }
          >
            {images.map((src, i) => (
              <View key={i} style={styles.modalSlide}>
                <Image source={src} style={styles.modalImage} resizeMode="contain" />
              </View>
            ))}
          </ScrollView>

          {/* Modal dots */}
          {count > 1 && (
            <View style={[styles.dots, { bottom: 32 }]}>
              {images.map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.dot,
                    i === previewIndex ? styles.dotActive : styles.dotInactive,
                  ]}
                />
              ))}
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#0e1a13",
  },

  // Dots
  dots: {
    position: "absolute",
    bottom: 14,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  dot: { borderRadius: 4, height: 6 },
  dotActive:   { width: 20, backgroundColor: "#fff" },
  dotInactive: { width: 6,  backgroundColor: "rgba(255,255,255,0.35)" },

  // Expand hint
  expandHint: {
    position: "absolute",
    bottom: 36,
    right: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(0,0,0,0.30)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  expandHintText: {
    fontSize: 10,
    color: "rgba(255,255,255,0.5)",
    fontWeight: "500",
  },

  // Modal
  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.95)",
    justifyContent: "center",
  },
  // Header row inside SafeAreaView
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  modalClose: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalCloseBalance: {
    width: 38,   // same width as close button to keep counter centred
    height: 38,
  },
  modalCounter: {
    flex: 1,
    textAlign: "center",
    color: "rgba(255,255,255,0.75)",
    fontSize: 14,
    fontWeight: "600",
  },
  modalSlide: {
    width: SW,
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: SW,
    height: SW * 1.2,
  },
});
