import { useEffect } from "react";

type ColorKey = "accentColor" | "backgroundColor";

export function useColors(setValue: (value: string) => void, colorKey: ColorKey = "accentColor") {
    useEffect(() => {
        const loadColors = () => {
            const savedSettings = localStorage.getItem("gameSettings");
            const defaultColor = "#9333ea";

            if (savedSettings) {
                try {
                    const settings = JSON.parse(savedSettings);
                    setValue(settings[colorKey] || defaultColor);
                } catch (error) {
                    console.error("Failed to load colors", error);
                    setValue(defaultColor);
                }
            } else {
                setValue(defaultColor);
            }
        };

        loadColors();

        window.addEventListener("storage", loadColors);
        window.addEventListener("settingsUpdated", loadColors);

        return () => {
            window.removeEventListener("storage", loadColors);
            window.removeEventListener("settingsUpdated", loadColors);
        };
    }, [setValue, colorKey]);
}
