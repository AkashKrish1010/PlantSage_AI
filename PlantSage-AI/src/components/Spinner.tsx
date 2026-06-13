import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View, ViewStyle } from "react-native";
import { colors } from "../theme";

/**
 * Spinner — UIActivityIndicator-style radial-line spinner.
 *
 * Renders 8 radial bars that fade in sequence — identical to the
 * iOS UIActivityIndicatorView / lucide LoaderIcon look.
 * Built with React Native Animated so it works on React 19.
 *
 * Props:
 *   size   – outer diameter in dp (default 24)
 *   color  – bar color         (default colors.primary)
 *   style  – wrapper ViewStyle
 */
interface SpinnerProps {
    size?: number;
    color?: string;
    style?: ViewStyle;
}

const NUM_LINES = 8;
const DURATION = 800; // full cycle ms

export function Spinner({ size = 24, color = colors.primary, style }: SpinnerProps) {
    // One Animated.Value per bar — each starts at a different phase
    const opacities = useRef(
        Array.from({ length: NUM_LINES }, (_, i) =>
            new Animated.Value(i / NUM_LINES)   // stagger initial phase
        )
    ).current;

    useEffect(() => {
        const anims = opacities.map((opacity, i) =>
            Animated.loop(
                Animated.sequence([
                    // Start each bar at its staggered offset
                    Animated.delay((i / NUM_LINES) * DURATION),
                    Animated.timing(opacity, {
                        toValue: 1,
                        duration: 0,
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacity, {
                        toValue: 0.15,
                        duration: DURATION,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                ])
            )
        );

        // Start all loops simultaneously
        Animated.parallel(anims).start();
        return () => anims.forEach((a) => a.stop());
    }, []);

    const barW = Math.max(1.5, size * 0.09);   // bar width  scales with size
    const barH = Math.max(3, size * 0.28);   // bar height scales with size
    const r = size / 2 - barH / 2;          // radius to bar centre

    return (
        <View
            style={[
                {
                    width: size,
                    height: size,
                    alignItems: "center",
                    justifyContent: "center",
                },
                style,
            ]}
        >
            {opacities.map((opacity, i) => {
                const angle = (i * 360) / NUM_LINES;
                const rad = (angle * Math.PI) / 180;
                const x = r * Math.sin(rad);
                const y = -r * Math.cos(rad);

                return (
                    <Animated.View
                        key={i}
                        style={{
                            position: "absolute",
                            width: barW,
                            height: barH,
                            borderRadius: barW / 2,
                            backgroundColor: color,
                            opacity,
                            left: size / 2 - barW / 2 + x,
                            top: size / 2 - barH / 2 + y,
                            transform: [{ rotate: `${angle}deg` }],
                        }}
                    />
                );
            })}
        </View>
    );
}

/**
 * SpinnerLarge — centered block spinner for page-level loading states.
 */
export function SpinnerLarge({
    size = 36,
    color = colors.primary,
}: Pick<SpinnerProps, "size" | "color">) {
    return (
        <View style={styles.center}>
            <Spinner size={size} color={color} />
        </View>
    );
}

/**
 * SpinnerOverlay — cream-white spinner for dark/gradient backgrounds.
 * Used inside the scan overlay on the Identify screen.
 */
export function SpinnerOverlay({ size = 40 }: Pick<SpinnerProps, "size">) {
    return <Spinner size={size} color="rgba(249,245,239,0.9)" />;
}

const styles = StyleSheet.create({
    center: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
    },
});
