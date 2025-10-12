import { useEffect, useState } from "react";
import { useBussinesLogic } from "../hooks/useBussinesLogic";
import type { Color } from "../types/bussinesLogic.types";

function Game() {
    const { activeColor, currentRound, gameOver, handleColorClick, colorMap, startGame } = useBussinesLogic();

    const getColorStyle = (color: Color, position: string) => {
        const isActive = activeColor === color;
        const brightness = isActive ? "brightness-150" : "hover:brightness-110";

        return `absolute ${position} w-1/2 h-1/2 bg-[${colorMap[color]}] cursor-pointer transition-all ${brightness}`;
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center flex-col gap-8">
            <div className="text-white text-center">
                <h2 className="text-3xl font-bold mb-2">Round: {currentRound}</h2>
                {gameOver && <p className="text-red-400 text-xl">Game Over! Final Score: {currentRound - 1}</p>}
            </div>
            <div className="relative w-[600px] h-[600px]">
                <div className="absolute inset-0">
                    <div
                        className={getColorStyle("green", "top-0 left-0 rounded-tl-full border-r-[8px] border-b-[8px] border-[#1a1a2e]")}
                        onClick={() => handleColorClick("green")}
                        style={{ backgroundColor: colorMap.green }}
                    />
                    <div
                        className={getColorStyle("red", "top-0 right-0 rounded-tr-full border-l-[8px] border-b-[8px] border-[#1a1a2e]")}
                        onClick={() => handleColorClick("red")}
                        style={{ backgroundColor: colorMap.red }}
                    />
                    <div
                        className={getColorStyle("purple", "bottom-0 left-0 rounded-bl-full border-r-[8px] border-t-[8px] border-[#1a1a2e]")}
                        onClick={() => handleColorClick("purple")}
                        style={{ backgroundColor: colorMap.purple }}
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gradient-to-br from-[#1a1a4e] to-[#0a0a2e] border-8 border-[#2a2a4e] shadow-2xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                        <span className="text-white text-8xl font-bold">{currentRound}</span>
                    </div>

                    <div
                        className={getColorStyle("blue", "bottom-0 right-0 rounded-br-full border-l-[8px] border-t-[8px] border-[#1a1a2e]")}
                        onClick={() => handleColorClick("blue")}
                        style={{ backgroundColor: colorMap.blue }}
                    />
                </div>

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
