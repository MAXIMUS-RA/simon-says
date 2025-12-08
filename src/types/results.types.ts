import type { Difficulty } from "./settings.types";

export interface GameResult {
    time: number;
    score: number;
    difficulty: Difficulty;
    numberOfColors: number;
}