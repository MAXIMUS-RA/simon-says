import { useState } from "react";

function Game() {
    const [currentNumber] = useState(1);

    return (
        <div className="w-full min-h-screen flex items-center justify-center ">
            <div className="relative w-[600px] h-[600px]">
                {/* Контейнер для кружка */}
                <div className="absolute inset-0">
                    {/* Верхній лівий сектор (темно-бірюзовий) */}
                    <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[#4A7C7E] rounded-tl-full border-r-[8px] border-b-[8px] border-[#1a1a2e] cursor-pointer hover:brightness-110 transition-all" />

                    {/* Верхній правий сектор (темно-червоний/бордовий) */}
                    <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#6B3B4F] rounded-tr-full border-l-[8px] border-b-[8px] border-[#1a1a2e] cursor-pointer hover:brightness-110 transition-all" />

                    {/* Нижній лівий сектор (темно-коричневий) */}
                    <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#5C5060] rounded-bl-full border-r-[8px] border-t-[8px] border-[#1a1a2e] cursor-pointer hover:brightness-110 transition-all" />

                    {/* Нижній правий сектор (темно-синій) */}
                    <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#3D5A6B] rounded-br-full border-l-[8px] border-t-[8px] border-[#1a1a2e] cursor-pointer hover:brightness-110 transition-all" />
                </div>

                {/* Центральна кнопка */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gradient-to-br from-[#1a1a4e] to-[#0a0a2e] border-8 border-[#2a2a4e] shadow-2xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                    <span className="text-white text-8xl font-bold">{currentNumber}</span>
                </div>
            </div>

            <a href=""></a>
            
        </div>
    );
}

export default Game;
