import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { useThemeColors } from "../context/ThemeContext";
import { useAlert } from "../context/AlertContext";

const SIZE = 36;

export default function ProfileAvatar() {
    const { user, logout } = useAuth();
    const { showAlert } = useAlert();
    const router = useRouter();
    const colors = useThemeColors();

    const handleLogout = async () => {
        await logout();
        router.replace("/login");
    };

    const ring = {
        width: SIZE, height: SIZE,
        borderRadius: SIZE / 2,
        borderWidth: 2,
        borderColor: "rgba(249,245,239,0.4)",
        alignItems: "center" as const,
        justifyContent: "center" as const,
    };

    const handlePress = () => {
        if (!user) { router.replace("/login"); return; }
        showAlert(
            "Logout",
            `Are you sure you want to sign out of ${user.name || user.email}?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Logout",
                    style: "destructive",
                    onPress: handleLogout,
                },
            ]
        );
    };

    if (!user) {
        return (
            <TouchableOpacity
                style={[ring, { backgroundColor: "rgba(249,245,239,0.18)" }]}
                onPress={handlePress}
                activeOpacity={0.8}
            >
                <Ionicons name="person-outline" size={18} color="rgba(249,245,239,0.9)" />
            </TouchableOpacity>
        );
    }

    if (user.login_method === "google" && user.photo_url) {
        return (
            <TouchableOpacity
                style={[ring, { overflow: "hidden" }]}
                onPress={handlePress}
                activeOpacity={0.8}
            >
                <Image source={{ uri: user.photo_url }} style={{ width: "100%", height: "100%" }} />
            </TouchableOpacity>
        );
    }

    if (user.login_method === "google") {
        return (
            <TouchableOpacity
                style={[ring, { backgroundColor: "#fff" }]}
                onPress={handlePress}
                activeOpacity={0.8}
            >
                <Text style={{ fontSize: 17, fontWeight: "800", color: "#4285F4", lineHeight: 20 }}>G</Text>
            </TouchableOpacity>
        );
    }

    // Email login — first initial in saffron circle
    const initial = (user.name || user.email || "?")[0].toUpperCase();
    return (
        <TouchableOpacity
            style={[ring, { backgroundColor: colors.accent }]}
            onPress={handlePress}
            activeOpacity={0.8}
        >
            <Text style={{ fontSize: 15, fontWeight: "800", color: "#fff" }}>{initial}</Text>
        </TouchableOpacity>
    );
}
