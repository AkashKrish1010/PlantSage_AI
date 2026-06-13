import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Text,
} from "react-native";
import { usePathname } from "expo-router";
import { useThemeColors } from "../context/ThemeContext";
import { Spinner } from "./Spinner";

/**
 * Renders a full-screen branded overlay whenever the route changes.
 * It mounts instantly (opacity 1) to hide the blank incoming screen,
 * then fades out once the new screen has had time to mount & paint.
 *
 * Place this as a sibling of <Stack> inside _layout.tsx so it sits
 * above every page.
 */
export default function TransitionLoader() {
  // Disabled: this overlay makes tab/icon navigation feel delayed.
  // If you ever want it back, we can re-enable with "only on truly slow transitions".
  return null;
}



