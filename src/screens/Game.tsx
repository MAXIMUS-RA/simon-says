import { useEffect, useState } from "react";
import { useBussinesLogic } from "../hooks/useBussinesLogic";
import type { Color } from "../types/bussinesLogic.types";

function Game() {
    const { activeColor, currentRound, gameOver, handleColorClick, colorMap, startGame, colors, settings } = useBussinesLogic();

    const getColorStyle = (color: Color, isActive: boolean) => {
        const brightness = isActive ? "brightness-150" : "hover:brightness-110";
        return `cursor-pointer transition-all ${brightness}`;
    };

    const renderColorButtons = () => {
        const numColors = colors.length;

        if (numColors === 4) {
            // Original 4-color layout
            return (
                <div className="absolute inset-0">
                    <div
                        className={`absolute top-0 left-0 w-1/2 h-1/2 rounded-tl-full border-r-[8px] border-b-[8px] border-[#1a1a2e] ${getColorStyle(
                            "green",
                            activeColor === "green"
                        )}`}
                        onClick={() => handleColorClick("green")}
                        style={{ backgroundColor: colorMap.green }}
                    />
                    <div
                        className={`absolute top-0 right-0 w-1/2 h-1/2 rounded-tr-full border-l-[8px] border-b-[8px] border-[#1a1a2e] ${getColorStyle(
                            "red",
                            activeColor === "red"
                        )}`}
                        onClick={() => handleColorClick("red")}
                        style={{ backgroundColor: colorMap.red }}
                    />
                    <div
                        className={`absolute bottom-0 left-0 w-1/2 h-1/2 rounded-bl-full border-r-[8px] border-t-[8px] border-[#1a1a2e] ${getColorStyle(
                            "purple",
                            activeColor === "purple"
                        )}`}
                        onClick={() => handleColorClick("purple")}
                        style={{ backgroundColor: colorMap.purple }}
                    />
                    <div
                        className={`absolute bottom-0 right-0 w-1/2 h-1/2 rounded-br-full border-l-[8px] border-t-[8px] border-[#1a1a2e] ${getColorStyle(
                            "blue",
                            activeColor === "blue"
                        )}`}
                        onClick={() => handleColorClick("blue")}
                        style={{ backgroundColor: colorMap.blue }}
                    />
                </div>
            );
        }

        // 5 or 6 colors - circular layout
        const angleStep = 360 / numColors;
        return (
            <div className="absolute inset-0">
                {colors.map((color, index) => {
                    const angle = (angleStep * index - 90) * (Math.PI / 180);
                    return (
                        <div
                            key={color}
                            className={`absolute w-32 h-32 rounded-full border-4 border-[#1a1a2e] ${getColorStyle(color, activeColor === color)}`}
                            onClick={() => handleColorClick(color)}
                            style={{
                                backgroundColor: colorMap[color],
                                left: `calc(50% + ${Math.cos(angle) * 200}px - 64px)`,
                                top: `calc(50% + ${Math.sin(angle) * 200}px - 64px)`,
                            }}
                        />
                    );
                })}
            </div>
        );
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center flex-col gap-8">
            <div className="text-white text-center">
                <h2 className="text-3xl font-bold mb-2">Round: {currentRound}</h2>
                <p className="text-sm text-gray-300">
                    Difficulty: <span className="capitalize font-semibold">{settings.difficulty}</span> | Colors: {settings.numberOfColors}
                </p>
                {gameOver && <p className="text-red-400 text-xl mt-2">Game Over! Final Score: {currentRound - 1}</p>}
            </div>

            <div className="relative w-[600px] h-[600px]">
                {renderColorButtons()}

                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gradient-to-br from-[#1a1a4e] to-[#0a0a2e] border-8 border-[#2a2a4e] shadow-2xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                    onClick={startGame}
                >
                    <span className="text-white text-4xl font-bold text-center">
                        {gameOver ? "Retry" : currentRound === 0 ? "Start" : currentRound}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Game;
