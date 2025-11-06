import { useEffect, useState } from "react";
import type { Difficulty } from "../types/settings.types";

export interface GameResult {
    time: number;
    score: number;
    difficulty: Difficulty;
    numberOfColors: number;
}

export function useResults() {
    const [history, setHistory] = useState<GameResult[]>([]);
    const STORAGE_KEY = "gameResults"; 

    useEffect(() => {
        loadResults();
    }, []); 

    const loadResults = () => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            const parsed = saved ? JSON.parse(saved) : [];
            setHistory(parsed);
        } catch (error) {
            console.error("Failed to load game history:", error);
            setHistory([]);
        }
    };

    const addResult = (result: GameResult) => {
        const newResult: GameResult = {
            ...result,
            time: Date.now(),
        };

        const updatedHistory = [...history, newResult];
        setHistory(updatedHistory);

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory)); 
        } catch (error) {
            console.error("Failed to save game result:", error);
        }
    };

    const getStats = () => {
        if (history.length === 0) {
            return {
                totalGames: 0,
                averageScore: 0,
                bestScore: 0,
                recentGames: [],
            };
        }

        const totalGames = history.length;
        const averageScore = Math.round(history.reduce((sum, game) => sum + game.score, 0) / totalGames);
        const bestScore = Math.max(...history.map((game) => game.score));
        const recentGames = [...history].reverse().slice(0, 10);

        return {
            totalGames,
            averageScore,
            bestScore,
            recentGames,
        };
    };

    return {
        history,
        addResult,
        getStats,
        loadResults,
    };
}
