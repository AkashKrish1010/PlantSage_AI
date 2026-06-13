import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    ReactNode,
} from "react";
import { Appearance } from "react-native";
import { lightColors, darkColors, AppColors } from "../theme";

interface ThemeContextValue {
    isDark: boolean;
    colors: AppColors;
    toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
    isDark: false,
    colors: lightColors,
    toggle: () => { },
});

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [isDark, setIsDark] = useState(
        () => Appearance.getColorScheme() === "dark"
    );

    const toggle = useCallback(() => setIsDark((d) => !d), []);

    const value = useMemo<ThemeContextValue>(
        () => ({ isDark, colors: isDark ? darkColors : lightColors, toggle }),
        [isDark, toggle]
    );

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
}

/** Full theme context — isDark, colors, toggle */
export function useTheme() {
    return useContext(ThemeContext);
}

/** Just the active color palette */
export function useThemeColors(): AppColors {
    return useContext(ThemeContext).colors;
}
