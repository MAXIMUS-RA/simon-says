import { useEffect, useState } from "react";
import type { Color } from "../types/bussinesLogic.types";

export function useBussinesLogic() {
    const [currentRound, setCurrentRound] = useState<number>(1);
    const [sequenceColor, setSequenceColor] = useState<Color[]>([]);
    const [userSequence, setUserSequence] = useState<Color[]>([]);
    const [activeColor, setActiveColor] = useState<Color | null>();
    const [gameOver, setGameOver] = useState<boolean>(false);

    const colors: Color[] = ["blue", "green", "red", "purple"];
    const colorMap = {
        green: "#4A7C7E",
        red: "#6B3B4F",
        purple: "#5C5060",
        blue: "#3D5A6B",
    };

    const startGame = () => {
        setSequenceColor([]);
        setUserSequence([]);
        setGameOver(false);
        setCurrentRound(1);
        const firstColor = colors[Math.floor(Math.random() * colors.length)];
        setSequenceColor([firstColor]);
    };

    useEffect(() => {
        if (sequenceColor.length > 0) {
            let index = 0;
            const interval = setInterval(() => {
                if (index < sequenceColor.length) {
                    setActiveColor(sequenceColor[index]);
                    setTimeout(() => setActiveColor(null), 400);
                    index++;
                } else {
                    clearInterval(interval);
                }
            }, 800);
            return () => clearInterval(interval);
        }
    }, [sequenceColor]);

    const handleColorClick = (color: Color) => {
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
                setActiveColor(null);
                setUserSequence([]);
                setSequenceColor([...sequenceColor, colors[Math.floor(Math.random() * color.length)]]);
                setCurrentRound((prev) => prev + 1);
            });
        }
    };

    return {
        currentRound,
        activeColor,
        gameOver,
        handleColorClick,
        colorMap,
        startGame
    };
}
