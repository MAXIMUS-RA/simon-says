import { useState, useEffect } from "react";
import { useBussinesLogic } from "../hooks/useBussinesLogic";
import { useColors } from "../hooks/useColors";
import GameModal from "../components/modals/GameModal";
import { useResults } from "../hooks/useResults";

function Game() {
    const { activeColor, currentRound, gameOver, handleColorClick, colorMap, startGame, colors, settings } = useBussinesLogic();

    const [accentColor, setAccentColor] = useState("#9333ea");
    const [highScore, setHighScore] = useState(0);
    const { addResult } = useResults();

    useColors(setAccentColor, "accentColor");

    useEffect(() => {
        const saved = localStorage.getItem("simonHighScore");
        if (saved) {
            setHighScore(parseInt(saved));
        }
    }, []);

    useEffect(() => {
        if (gameOver && currentRound > 0) {
            const finalScore = currentRound - 1;
            const newData = { time: Date.now(), score: finalScore, difficulty: settings.difficulty, numberOfColors: settings.numberOfColors };

            if (finalScore > highScore) {
                setHighScore(finalScore);
                localStorage.setItem("simonHighScore", finalScore.toString());
            }

            addResult(newData);
        }
    }, [gameOver, currentRound, highScore, settings.difficulty, settings.numberOfColors]);


    const getColorStyle = (isActive: boolean) => {
        const brightness = isActive ? "brightness-150" : "hover:brightness-110";
        return `cursor-pointer transition-all ${brightness}`;
    };

    const renderColorButtons = () => {
        const numColors = colors.length;
        const anglePerSlice = 360 / numColors;

        return (
            <div className="absolute inset-0">
                {colors.map((color, index) => {
                    const startAngle = index * anglePerSlice;
                    const endAngle = (index + 1) * anglePerSlice;

                    const clipPath = createPieSliceClipPath(startAngle, endAngle);
                    const borderStyle = getBorderStyle();

                    return (
                        <div
                            key={color}
                            className={`absolute -inset-1 ${getColorStyle(activeColor === color)}`}
                            onClick={() => handleColorClick(color)}
                            style={{
                                backgroundColor: colorMap[color],
                                clipPath: clipPath,
                                WebkitClipPath: clipPath,
                                ...borderStyle,
                            }}
                        />
                    );
                })}
            </div>
        );
    };

    const createPieSliceClipPath = (startAngle: number, endAngle: number): string => {
        const centerX = 50;
        const centerY = 50;
        const radius = 50;

        const points: string[] = [`${centerX}% ${centerY}%`];

        const steps = 20;
        for (let i = 0; i <= steps; i++) {
            const angle = startAngle + (endAngle - startAngle) * (i / steps);
            const radian = (angle - 90) * (Math.PI / 180);
            const x = centerX + radius * Math.cos(radian);
            const y = centerY + radius * Math.sin(radian);
            points.push(`${x}% ${y}%`);
        }

        return `polygon(${points.join(", ")})`;
    };

    const getBorderStyle = () => {
        return {
            boxShadow: `
                inset 0 0 0 4px rgba(26, 26, 46, 0.5),
                0 0 0 2px rgba(26, 26, 46, 0.8)
            `,
        };
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center flex-col gap-8">
            <div className="text-white text-center">
                <h2 className="text-3xl font-bold mb-2">Round: {currentRound}</h2>
                <p className="text-sm text-gray-300">
                    Difficulty: <span className="capitalize font-semibold">{settings.difficulty}</span> | Colors: {settings.numberOfColors}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                    High Score: <span className="font-bold text-yellow-400">{highScore}</span>
                </p>
            </div>

            <div className="relative w-[600px] h-[600px]">
                <div className="absolute -inset-0 rounded-full overflow-hidden">{renderColorButtons()}</div>

                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-8 border-[#2a2a4e] shadow-2xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform z-0"
                    style={{ backgroundColor: accentColor }}
                    onClick={startGame}
                >
                    <span className="text-white text-4xl font-bold text-center">{currentRound === 0 ? "Start" : currentRound}</span>
                </div>
            </div>

            <GameModal isOpen={gameOver} score={currentRound > 0 ? currentRound - 1 : 0} highScore={highScore} onRestart={startGame} />
        </div>
    );
}

export default Game;
