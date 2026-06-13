import React, { createContext, useContext, useState, ReactNode } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View, Pressable } from "react-native";
import { useTheme } from "./ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { radius, spacing } from "../theme";

export interface AlertButton {
  text: string;
  onPress?: () => void | Promise<void>;
  style?: "default" | "cancel" | "destructive";
}

interface AlertState {
  visible: boolean;
  title: string;
  message?: string;
  buttons?: AlertButton[];
}

interface AlertContextValue {
  showAlert: (title: string, message?: string, buttons?: AlertButton[]) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextValue>({
  showAlert: () => {},
  hideAlert: () => {},
});

export function AlertProvider({ children }: { children: ReactNode }) {
  const { colors, isDark } = useTheme();
  const [state, setState] = useState<AlertState>({
    visible: false,
    title: "",
    message: "",
  });

  const showAlert = (title: string, message?: string, buttons?: AlertButton[]) => {
    setState({
      visible: true,
      title,
      message,
      buttons,
    });
  };

  const hideAlert = () => {
    setState((prev) => ({ ...prev, visible: false }));
  };

  const getIcon = () => {
    const titleLower = state.title.toLowerCase();
    const msgLower = (state.message || "").toLowerCase();

    if (
      titleLower.includes("remove") ||
      titleLower.includes("delete")
    ) {
      return {
        name: "trash-outline" as const,
        color: colors.danger,
        bg: colors.dangerLight,
      };
    }
    if (
      titleLower.includes("logout") ||
      titleLower.includes("sign out")
    ) {
      return {
        name: "log-out-outline" as const,
        color: colors.accent,
        bg: isDark ? "rgba(240,144,48,0.12)" : "rgba(217,115,22,0.12)",
      };
    }
    if (
      titleLower.includes("warning") ||
      titleLower.includes("already saved") ||
      titleLower.includes("caution") ||
      titleLower.includes("weak") ||
      titleLower.includes("exists")
    ) {
      return {
        name: "warning-outline" as const,
        color: colors.accent,
        bg: isDark ? "rgba(240,144,48,0.12)" : "rgba(217,115,22,0.12)",
      };
    }
    if (
      titleLower.includes("error") ||
      titleLower.includes("failed") ||
      titleLower.includes("invalid") ||
      titleLower.includes("required") ||
      titleLower.includes("mismatch")
    ) {
      return {
        name: "alert-circle-outline" as const,
        color: colors.danger,
        bg: colors.dangerLight,
      };
    }
    if (
      titleLower.includes("success") ||
      titleLower.includes("saved") ||
      titleLower.includes("completed")
    ) {
      return {
        name: "checkmark-circle-outline" as const,
        color: colors.primary,
        bg: colors.primarySoft,
      };
    }
    return {
      name: "leaf-outline" as const,
      color: colors.primary,
      bg: colors.primarySoft,
    };
  };

  const iconInfo = getIcon();

  const isTwoButtons = state.buttons && state.buttons.length === 2;

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      <Modal
        visible={state.visible}
        transparent
        animationType="fade"
        onRequestClose={hideAlert}
      >
        <View style={styles.backdrop}>
          <Pressable style={styles.dismissArea} onPress={hideAlert} />
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                shadowColor: isDark ? "#000" : "rgba(44,31,20,0.2)",
              },
            ]}
          >
            {/* Header Icon */}
            <View style={[styles.iconContainer, { backgroundColor: iconInfo.bg }]}>
              <Ionicons name={iconInfo.name} size={28} color={iconInfo.color} />
            </View>

            {/* Title */}
            <Text style={[styles.title, { color: colors.text }]}>{state.title}</Text>

            {/* Message */}
            {state.message ? (
              <Text style={[styles.message, { color: colors.textMuted }]}>{state.message}</Text>
            ) : null}

            {/* Buttons */}
            <View
              style={[
                styles.buttonContainer,
                { flexDirection: isTwoButtons ? "row" : "column" },
              ]}
            >
              {state.buttons && state.buttons.length > 0 ? (
                state.buttons.map((btn, index) => {
                  const isDestructive = btn.style === "destructive";
                  const isCancel = btn.style === "cancel";

                  let btnBg = colors.surfaceAlt;
                  let textColor = colors.text;

                  if (isDestructive) {
                    const isLogout = state.title.toLowerCase().includes("logout") ||
                                     state.title.toLowerCase().includes("sign out") ||
                                     (state.message || "").toLowerCase().includes("logout") ||
                                     (state.message || "").toLowerCase().includes("sign out");
                    btnBg = isLogout ? colors.accent : colors.danger;
                    textColor = isLogout ? (colors.accentForeground || "#fff") : "#fff";
                  } else if (!isCancel) {
                    btnBg = colors.primary;
                    textColor = colors.primaryForeground || "#fff";
                  }

                  const handlePress = () => {
                    hideAlert();
                    if (btn.onPress) {
                      btn.onPress();
                    }
                  };

                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.button,
                        {
                          backgroundColor: btnBg,
                          flex: isTwoButtons ? 1 : undefined,
                        },
                      ]}
                      onPress={handlePress}
                      activeOpacity={0.85}
                    >
                      <Text style={[styles.buttonText, { color: textColor }]}>
                        {btn.text}
                      </Text>
                    </TouchableOpacity>
                  );
                })
              ) : (
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: colors.primary, width: "100%" }]}
                  onPress={hideAlert}
                  activeOpacity={0.85}
                >
                  <Text style={[styles.buttonText, { color: colors.primaryForeground || "#fff" }]}>
                    OK
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </AlertContext.Provider>
  );
}

export function useAlert() {
  return useContext(AlertContext);
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
  },
  dismissArea: {
    ...StyleSheet.absoluteFillObject,
  },
  card: {
    width: "100%",
    maxWidth: 320,
    borderRadius: radius.xl,
    borderWidth: 1,
    padding: spacing.lg,
    alignItems: "center",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: spacing.sm,
    letterSpacing: -0.2,
  },
  message: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  buttonContainer: {
    width: "100%",
    gap: 8,
  },
  button: {
    height: 44,
    borderRadius: radius.full,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.md,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "700",
  },
});
