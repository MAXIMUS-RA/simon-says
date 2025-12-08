import { useEffect, useState, useMemo, useCallback } from "react";
import type { Color } from "../types/bussinesLogic.types";
import type { Difficulty } from "../types/settings.types";
import { useSettings } from "../store/storeSettings";

export function useBussinesLogic() {
    const [currentRound, setCurrentRound] = useState<number>(0);
    const [sequenceColor, setSequenceColor] = useState<Color[]>([]);
    const [userSequence, setUserSequence] = useState<Color[]>([]);
    const [activeColor, setActiveColor] = useState<Color | null>(null);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const difficulty = useSettings((state) => state.difficulty);
    const numberOfColors = useSettings((state) => state.numberOfColors);

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

    const settings = useMemo(() => ({ difficulty, numberOfColors, speed: getSpeedFromDifficulty(difficulty) }), [difficulty, numberOfColors]);

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


    const soundFrequencies: Record<Color, number> = {
        green: 261.63, 
        red: 293.66, 
        yellow: 329.63, 
        blue: 349.23, 
        purple: 392.0, 
        orange: 440.0, 
    };

    const playSound = useCallback((color: Color) => {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine"; 
        osc.frequency.value = soundFrequencies[color];

        osc.connect(gain);
        gain.connect(ctx.destination);

        
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.5);
        osc.stop(ctx.currentTime + 0.5);
    }, []);

    const playErrorSound = useCallback(() => {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sawtooth"; 
        osc.frequency.value = 110; 

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.5);
        osc.stop(ctx.currentTime + 0.5);
    }, []);

    

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
                    const colorToPlay = sequenceColor[index];
                    setActiveColor(colorToPlay);
                    playSound(colorToPlay); 

                    setTimeout(() => setActiveColor(null), settings.speed * 0.5);
                    index++;
                } else {
                    clearInterval(interval);
                    setIsPlaying(false);
                }
            }, settings.speed);
            return () => clearInterval(interval);
        }
    }, [sequenceColor, userSequence.length, settings.speed, gameOver, playSound]);

    const handleColorClick = (color: Color) => {
        if (isPlaying || gameOver) return;

        playSound(color); 

        const newUserSequence = [...userSequence, color];
        setUserSequence(newUserSequence);

        setActiveColor(color);
        setTimeout(() => setActiveColor(null), 200);

        if (color !== sequenceColor[newUserSequence.length - 1]) {
            playErrorSound(); 
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
