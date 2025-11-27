import { useEffect, useState, useMemo } from "react";
import type { Color } from "../types/bussinesLogic.types";
import type { Difficulty, GameSettings } from "../types/settings.types";

export function useBussinesLogic() {
    const [currentRound, setCurrentRound] = useState<number>(0);
    const [sequenceColor, setSequenceColor] = useState<Color[]>([]);
    const [userSequence, setUserSequence] = useState<Color[]>([]);
    const [activeColor, setActiveColor] = useState<Color | null>(null);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const getSpeedFromDifficulty = (difficulty: Difficulty): number => {
        switch (difficulty) {
            case "easy":
                return 1000;
            case "medium":
                return 600;
            case "hard":
                return 300;
            default:
                return 600;
        }
    };

    const loadGameSettings = (): GameSettings => {
        const savedSettings = localStorage.getItem("gameSettings");
        console.log(savedSettings);
        if (savedSettings) {
            try {
                const settings = JSON.parse(savedSettings);
                return {
                    difficulty: settings.difficulty || "medium",
                    numberOfColors: settings.numberOfColors || 4,
                    speed: getSpeedFromDifficulty(settings.difficulty || "medium"),
                };
            } catch (error) {
                console.error("Failed to load settings:", error);
            }
        }
        return {
            difficulty: "medium",
            numberOfColors: 4,
            speed: 600,
        };
    };

    const settings = useMemo(() => loadGameSettings(), []);

    const allColors: Color[] = ["blue", "green", "red", "purple", "yellow", "orange"];
    const colors = useMemo(() => allColors.slice(0, settings.numberOfColors), [settings.numberOfColors]);

    const colorMap: Record<Color, string> = {
        green: "#4A7C7E",
        red: "#6B3B4F",
        purple: "#5C5060",
        blue: "#3D5A6B",
        yellow: "#B8860B",
        orange: "#CC5500",
    };

    console.log(colorMap);
    const startGame = () => {
        setSequenceColor([]);
        setUserSequence([]);
        setGameOver(false);
        setCurrentRound(1);
        const firstColor = colors[Math.floor(Math.random() * colors.length)];
        setSequenceColor([firstColor]);
    };

    useEffect(() => {
        if (sequenceColor.length > 0 && userSequence.length === 0 && !gameOver) {
            setIsPlaying(true);
            let index = 0;
            const interval = setInterval(() => {
                if (index < sequenceColor.length) {
                    setActiveColor(sequenceColor[index]);
                    setTimeout(() => setActiveColor(null), settings.speed * 0.5);
                    index++;
                } else {
                    clearInterval(interval);
                    setIsPlaying(false);
                }
            }, settings.speed);
            return () => clearInterval(interval);
        }
    }, [sequenceColor, userSequence.length, settings.speed, gameOver]);

    const handleColorClick = (color: Color) => {
        if (isPlaying || gameOver) return;

        const newUserSequence = [...userSequence, color];
        setUserSequence(newUserSequence);

        setActiveColor(color);
        setTimeout(() => setActiveColor(null), 200);

        if (color !== sequenceColor[newUserSequence.length - 1]) {
            
            setGameOver(true);
            return;
        }

        if (sequenceColor.length === newUserSequence.length) {
            setTimeout(() => {
                setUserSequence([]);
                const nextColor = colors[Math.floor(Math.random() * colors.length)];
                setSequenceColor([...sequenceColor, nextColor]);
                setCurrentRound((prev) => prev + 1);
            }, 500);
        }
    };

    return {
        currentRound,
        activeColor,
        gameOver,
        isPlaying,
        handleColorClick,
        colorMap,
        startGame,
        colors,
        settings,
    };
}
