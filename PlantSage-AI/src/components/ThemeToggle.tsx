import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

/**
 * ThemeToggle — small sun/moon icon button.
 * Designed to sit on dark gradient hero headers.
 */
export default function ThemeToggle() {
    const { isDark, toggle } = useTheme();

    return (
        <TouchableOpacity
            onPress={toggle}
            activeOpacity={0.75}
            style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: "rgba(249,245,239,0.18)",
                borderWidth: 1,
                borderColor: "rgba(249,245,239,0.35)",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Ionicons
                name={isDark ? "sunny-outline" : "moon-outline"}
                size={18}
                color="rgba(249,245,239,0.9)"
            />
        </TouchableOpacity>
    );
}
