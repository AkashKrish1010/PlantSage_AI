import { useEffect, useLayoutEffect } from "react";
import { ActivityIndicator, Platform, View } from "react-native";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import * as NavigationBar from "expo-navigation-bar";
import * as SystemUI from "expo-system-ui";
import TransitionLoader from "../src/components/TransitionLoader";
import { AuthProvider, useAuth } from "../src/context/AuthContext";
import { ThemeProvider, useTheme } from "../src/context/ThemeContext";
import { AlertProvider } from "../src/context/AlertContext";


// ─── Bottom safe-area filler ─────────────────────────────────────────────────
function BottomInsetFill({ bg }: { bg: string }) {
  const { bottom } = useSafeAreaInsets();
  if (bottom === 0) return null;
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: bottom,
        backgroundColor: bg,
        zIndex: -1,
      }}
      pointerEvents="none"
    />
  );
}

// ─── Inner layout — lives inside ThemeProvider so it can read theme ──────────
function AppLayout() {
  const { colors, isDark } = useTheme();
  const { initializing, user } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const BG = colors.background;

  useLayoutEffect(() => {
    // Ensure system UI matches theme ASAP (fixes white nav bar on first load)
    SystemUI.setBackgroundColorAsync(BG).catch(() => {});
    if (Platform.OS === "android") {
      NavigationBar.setButtonStyleAsync(isDark ? "light" : "dark").catch(() => {});
    }
  }, [BG, isDark]);

  useEffect(() => {
    if (initializing) return;

    const inAuthGroup = segments[0] === "login" || segments[0] === "signup";

    if (!user && !inAuthGroup) {
      router.replace("/login");
    } else if (user && inAuthGroup) {
      router.replace("/");
    }
  }, [user, segments, initializing]);

  // While restoring session from AsyncStorage, show a minimal loader
  // to avoid a jarring flash to the login screen for returning users.
  if (initializing) {
    return (
      <View style={{ flex: 1, backgroundColor: BG, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: BG }}>
      <StatusBar
        style={isDark ? "light" : "dark"}
        backgroundColor={BG}
        translucent={false}
      />

      <Stack
        initialRouteName="login"
        screenOptions={{
          headerShown: false,
          animation: "none",
          gestureEnabled: true,
          contentStyle: { backgroundColor: BG },
        }}
      >
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="index" />
        <Stack.Screen name="identify" />
        <Stack.Screen name="search" />
        <Stack.Screen name="garden" />
        <Stack.Screen name="about" />
        <Stack.Screen name="saved-plants" />
        <Stack.Screen
          name="herb-detail/[id]"
          options={{ animation: "none", gestureEnabled: true }}
        />
      </Stack>

      <BottomInsetFill bg={BG} />
      <TransitionLoader />
    </SafeAreaProvider>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AlertProvider>
          <AppLayout />
        </AlertProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
