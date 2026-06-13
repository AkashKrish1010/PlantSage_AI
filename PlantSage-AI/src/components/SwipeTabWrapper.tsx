import React, { useRef } from "react";
import { View, PanResponder, StyleSheet } from "react-native";
import { useRouter, usePathname } from "expo-router";

const TAB_ORDER = ["/", "/identify", "/search", "/garden", "/about"];

/**
 * Wraps a tab screen so that horizontal swipes cycle through tabs.
 * Swipe right → previous tab, swipe left → next tab.
 */
export default function SwipeTabWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const currentIndex = TAB_ORDER.findIndex((path) =>
    path === "/"
      ? pathname === "/" || pathname === "/index"
      : pathname.startsWith(path)
  );

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_evt, gestureState) => {
        // Only capture clearly horizontal swipes (not vertical scrolls)
        return (
          Math.abs(gestureState.dx) > 20 &&
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy) * 2
        );
      },
      onPanResponderRelease: (_evt, gestureState) => {
        if (gestureState.dx < -50) {
          // Swipe LEFT → go to next tab
          const nextIndex = Math.min(currentIndex + 1, TAB_ORDER.length - 1);
          if (nextIndex !== currentIndex) {
            router.push(TAB_ORDER[nextIndex] as any);
          }
        } else if (gestureState.dx > 50) {
          // Swipe RIGHT → go to previous tab
          const prevIndex = Math.max(currentIndex - 1, 0);
          if (prevIndex !== currentIndex) {
            router.push(TAB_ORDER[prevIndex] as any);
          }
        }
      },
    })
  ).current;

  return (
    <View style={styles.root} {...panResponder.panHandlers}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
