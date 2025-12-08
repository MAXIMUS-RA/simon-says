import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GameResult } from "../types/results.types";

interface ResultsState {
    results: GameResult[];
    highScore: number; 
    addResult: (result: GameResult) => void;
    clearResults: () => void;
    getStats: () => { totalGames: number; averageScore: number; bestScore: number; recentGames: GameResult[] };
}

export const useResults = create<ResultsState>()(
    persist(
        (set, get) => ({
            results: [],
            highScore: 0, 

            addResult: (newResult: GameResult) =>
                set((state) => {
                    
                    const newHighScore = newResult.score > state.highScore ? newResult.score : state.highScore;

                    return {
                        results: [...state.results, newResult],
                        highScore: newHighScore, 
                    };
                }),

            clearResults: () => set({ results: [] }),
            getStats: () => {
                const results = get().results;
                if (results.length === 0) {
                    return {
                        totalGames: 0,
                        averageScore: 0,
                        bestScore: 0,
                        recentGames: [],
                    };
                }
                return {
                    totalGames: results.length,
                    averageScore: Math.round(results.reduce((sum, game) => sum + game.score, 0) / results.length),
                    bestScore: Math.max(...results.map((game) => game.score)),
                    recentGames: [...results].reverse().slice(0, 10),
                };
            },
        }),
        {
            name: "simon-results-storage",
        }
    )
);
