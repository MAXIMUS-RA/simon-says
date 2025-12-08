import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { Difficulty, SettingsForm } from "../types/settings.types";
import { useDebounce } from "../hooks/useDebounce";
import { useSettings } from "../store/storeSettings";

function Settings() {
    const { setAccentColor, setBackgroundColor, setDifficulty, setNumberOfColors,backgroundColor,accentColor,difficulty,numberOfColors } =
        useSettings();

        console.log(backgroundColor);
    const { handleSubmit, formState, setValue, control } = useForm<SettingsForm>({
        defaultValues: {
            backgroundColor: backgroundColor,
            accentColor: accentColor,
            difficulty: difficulty,
            numberOfColors: numberOfColors,
        },
    });

    const [localBackgroundColor, setLocalBackgroundColor] = useState(backgroundColor);
    const [localAccentColor, setLocalAccentColor] = useState(accentColor);

    const debouncedBackgroundColor = useDebounce(localBackgroundColor, 300);
    const debouncedAccentColor = useDebounce(localAccentColor, 300);

    useEffect(() => {
        setValue("backgroundColor", debouncedBackgroundColor);
    }, [debouncedBackgroundColor, setValue]);

    useEffect(() => {
        setValue("accentColor", debouncedAccentColor);
    }, [debouncedAccentColor, setValue]);

    const onSubmit = (data: SettingsForm) => {
        try {
            setAccentColor(data.accentColor);
            setBackgroundColor(data.backgroundColor);
            setDifficulty(data.difficulty);
            setNumberOfColors(data.numberOfColors);
            alert("Settings saved successfully!");
        } catch (error) {
            console.error("Failed to save settings:", error);
            alert("Failed to save settings");
        }
    };

    

    const difficultyInfo = {
        easy: { speed: "Slow (1000ms)", description: "Perfect for beginners" },
        medium: { speed: "Normal (600ms)", description: "Standard gameplay" },
        hard: { speed: "Fast (300ms)", description: "For memory masters!" },
    };

    return (
        <div className="w-full min-h-screen mx-auto text-white" style={{ backgroundColor: localBackgroundColor }}>
            <div className=" py-10">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-4xl text-center mb-8 font-bold">Settings</h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div className="bg-white/10 rounded-lg p-6">
                            <h2 className="text-2xl font-semibold mb-4">Colors</h2>

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="backgroundColor" className="block text-lg font-medium mb-2">
                                        Background Color
                                    </label>
                                    <div className="flex gap-4 items-center">
                                        <input
                                            id="backgroundColor"
                                            type="color"
                                            value={localBackgroundColor}
                                            onChange={(e) => setLocalBackgroundColor(e.target.value)}
                                            className="w-24 h-24 rounded-lg cursor-pointer border-4 border-white/20"
                                        />
                                        <input
                                            type="text"
                                            value={localBackgroundColor}
                                            readOnly
                                            className="flex-1 px-4 py-2 rounded bg-white/10 text-white font-mono"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="accentColor" className="block text-lg font-medium mb-2">
                                        Accent Color
                                    </label>
                                    <div className="flex gap-4 items-center">
                                        <input
                                            id="accentColor"
                                            type="color"
                                            value={localAccentColor}
                                            onChange={(e) => setLocalAccentColor(e.target.value)}
                                            className="w-24 h-24 rounded-lg cursor-pointer border-4 border-white/20"
                                        />
                                        <input
                                            type="text"
                                            value={localAccentColor}
                                            readOnly
                                            className="flex-1 px-4 py-2 rounded bg-white/10 text-white font-mono"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/10 rounded-lg p-6">
                            <h2 className="text-2xl font-semibold mb-4">Game Difficulty</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-lg font-medium mb-3">Difficulty Level</label>
                                    <Controller
                                        name="difficulty"
                                        control={control}
                                        render={({ field: difficultyField }) => (
                                            <div className="grid grid-cols-3 gap-4">
                                                {(["easy", "medium", "hard"] as Difficulty[]).map((level) => (
                                                    <button
                                                        key={level}
                                                        type="button"
                                                        onClick={() => difficultyField.onChange(level)}
                                                        className={`relative flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                                            difficultyField.value === level
                                                                ? "border-white bg-white/20"
                                                                : "border-white/30 hover:border-white/50"
                                                        }`}
                                                    >
                                                        <span className="text-xl font-bold capitalize mb-1">{level}</span>
                                                        <span className="text-sm text-center">{difficultyInfo[level].speed}</span>
                                                        <span className="text-xs text-gray-300 text-center mt-2">
                                                            {difficultyInfo[level].description}
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    />
                                </div>

                                <Controller
                                    name="numberOfColors"
                                    control={control}
                                    render={({ field: colorsField }) => (
                                        <div>
                                            <label htmlFor="numberOfColors" className="block text-lg font-medium mb-2">
                                                Number of Colors: {colorsField.value}
                                            </label>
                                            <input
                                                id="numberOfColors"
                                                type="range"
                                                min="4"
                                                max="6"
                                                value={colorsField.value}
                                                onChange={(e) => colorsField.onChange(Number(e.target.value))}
                                                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
                                            />
                                            <div className="flex justify-between text-sm text-gray-300 mt-2">
                                                <span>4 Colors (Easy)</span>
                                                <span>5 Colors</span>
                                                <span>6 Colors (Hard)</span>
                                            </div>
                                        </div>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="bg-white/10 rounded-lg p-6">
                            <h2 className="text-2xl font-semibold mb-4">Preview</h2>
                            <div className="flex gap-4">
                                <div className="flex-1 h-20 rounded-lg" style={{ backgroundColor: localBackgroundColor }} />
                                <div className="flex-1 h-20 rounded-lg" style={{ backgroundColor: localAccentColor }} />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={formState.isSubmitting}
                                className="flex-1 py-3 px-6 rounded-lg font-semibold transition-all hover:scale-105 disabled:opacity-50"
                                style={{ backgroundColor: localAccentColor }}
                            >
                                {formState.isSubmitting ? "Saving..." : "Save Settings"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Settings;
