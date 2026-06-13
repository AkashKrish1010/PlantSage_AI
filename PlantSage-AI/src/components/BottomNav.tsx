import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Keyboard,
  PanResponder,
} from "react-native";
import { useRouter, usePathname } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColors } from "../context/ThemeContext";
import { radius } from "../theme";
import { Home, Camera, Search, Leaf, MapPin } from "lucide-react-native";

type NavItem = {
  href: string;
  label: string;
  Icon: any;
};

const navItems: NavItem[] = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/identify", label: "Identify", Icon: Camera },
  { href: "/search", label: "Search", Icon: Search },
  { href: "/garden", label: "Garden", Icon: Leaf },
  { href: "/saved-plants", label: "Saved", Icon: MapPin },
];

const TAB_W = 58; // min-w-[58px] matches PCOSenseAI exactly

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { bottom } = useSafeAreaInsets();
  const colors = useThemeColors();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const currentIndex = navItems.findIndex((item) =>
    item.href === "/"
      ? pathname === "/" || pathname === "/index"
      : pathname.startsWith(item.href)
  );

  // Pill position animation — all hooks called before early returns
  const pillX = useSharedValue(currentIndex !== -1 ? currentIndex * TAB_W : 0);

  useEffect(() => {
    if (currentIndex !== -1) {
      pillX.value = withTiming(currentIndex * TAB_W, {
        duration: 220,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      });
    }
  }, [currentIndex]);

  const pillStyle = useAnimatedStyle(() => {
    const isVisible = currentIndex !== -1;
    return {
      transform: [{ translateX: pillX.value }],
      opacity: withTiming(isVisible ? 1 : 0, { duration: 150 }),
    };
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_evt, gs) =>
        Math.abs(gs.dx) > 15 && Math.abs(gs.dy) < 40,
      onPanResponderRelease: (_evt, gs) => {
        if (gs.dx < -40) {
          const next = Math.min(currentIndex + 1, navItems.length - 1);
          if (next !== currentIndex && next !== -1) router.push(navItems[next].href as any);
        } else if (gs.dx > 40) {
          const prev = Math.max(currentIndex - 1, 0);
          if (prev !== currentIndex && prev !== -1) router.push(navItems[prev].href as any);
        }
      },
    })
  ).current;

  if (keyboardVisible) return null;

  // Float the pill 12px above the home indicator (or 20px on flat-bottom devices)
  const pillBottom = bottom > 0 ? bottom + 12 : 20;

  return (
    <View
      style={[
        styles.wrapper,
        { bottom: pillBottom },
      ]}
      pointerEvents="box-none"
    >
      <View
        style={[
          styles.bar,
          {
            backgroundColor: colors.background,
            borderColor: colors.border,
          },
        ]}
        {...panResponder.panHandlers}
      >
        {/* Sliding pill indicator */}
        <Animated.View style={[styles.pillWrapper, pillStyle]} pointerEvents="none">
          <LinearGradient
            colors={[colors.primary, colors.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.pill}
          />
        </Animated.View>

        {/* Tab buttons */}
        {navItems.map((item, i) => {
          const active = i === currentIndex;
          return (
            <TouchableOpacity
              key={item.href}
              style={styles.tab}
              onPress={() => router.push(item.href as any)}
              accessibilityLabel={item.label}
              accessibilityRole="button"
              activeOpacity={0.7}
            >
              <item.Icon
                size={20}
                color={active ? colors.primaryForeground : colors.textMuted}
                strokeWidth={active ? 2.4 : 1.8}
              />
              <Text
                style={[
                  styles.label,
                  { color: active ? colors.primaryForeground : colors.textMuted },
                ]}
                numberOfLines={1}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 50,
  },
  bar: {
    flexDirection: "row",
    borderRadius: radius.full,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
    position: "relative",
    overflow: "hidden",
    shadowColor: "#1b4332",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 18,
  },
  pillWrapper: {
    position: "absolute",
    top: 8,
    left: 8,
    width: TAB_W,
    bottom: 8,
    borderRadius: radius.full,
    overflow: "hidden",
  },
  pill: {
    flex: 1,
    borderRadius: radius.full,
  },
  tab: {
    width: TAB_W,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    gap: 2,
    borderRadius: radius.full,
  },
  label: {
    fontSize: 10,
    fontWeight: "500",
  },
});
