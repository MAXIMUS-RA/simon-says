import { useBussinesLogic } from "../hooks/useBussinesLogic";

function Game() {
    const { activeColor, currentRound, gameOver, handleColorClick, colorMap, startGame, colors, settings } = useBussinesLogic();

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
                            className={`absolute inset-0 ${getColorStyle(activeColor === color)}`}
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
                {gameOver && <p className="text-red-400 text-xl mt-2">Game Over! Final Score: {currentRound - 1}</p>}
            </div>

            <div className="relative w-[600px] h-[600px]">
                <div className="absolute inset-0 rounded-full overflow-hidden">{renderColorButtons()}</div>

                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gradient-to-br from-[#1a1a4e] to-[#0a0a2e] border-8 border-[#2a2a4e] shadow-2xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform z-10"
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
