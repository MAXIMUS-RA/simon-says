import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SettingsForm } from "../types/settings.types";

interface SettingsState extends SettingsForm {
    setBackgroundColor: (backgroundColor: SettingsState["backgroundColor"]) => void;
    setAccentColor: (accentColor: SettingsState["accentColor"]) => void;
    setDifficulty: (difficulty: SettingsState["difficulty"]) => void;
    setNumberOfColors: (numberOfColors: SettingsState["numberOfColors"]) => void;
}

export const useSettings = create<SettingsState>()(
    persist(
        (set) => ({
            backgroundColor: "#0000",
            accentColor: "#0000",
            difficulty: "medium",
            numberOfColors: 4,
            setBackgroundColor: (backgroundColor: SettingsState["backgroundColor"]) => set(() => ({ backgroundColor })),
            setAccentColor: (accentColor: SettingsState["accentColor"]) => set(() => ({ accentColor })),
            setDifficulty: (difficulty: SettingsState["difficulty"]) => set(() => ({ difficulty })),
            setNumberOfColors: (numberOfColors: SettingsState["numberOfColors"]) => set(() => ({ numberOfColors })),
        }),
        {
            name: "gameSettings",
            
        }
    )
);
