export type SettingsForm = {
    backgroundColor: string;
    accentColor: string;
    difficulty: Difficulty;
    numberOfColors: number;
};

export type Difficulty = "easy" | "medium" | "hard";

export interface GameSettings {
    difficulty: Difficulty;
    speed: number;
    numberOfColors: number;
}
