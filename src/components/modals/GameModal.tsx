import { useState } from "react";
import { Modal } from "./Modal";
import { useRouter } from "../../context/RouterContext";
import { useColors } from "../../hooks/useColors";

interface GameOverModalProps {
    isOpen: boolean;
    score: number;
    highScore: number;
    onRestart: () => void;
}

function GameModal({ isOpen, score, highScore, onRestart }: GameOverModalProps) {
    const { navigate } = useRouter();
    const [accentColor, setAccentColor] = useState("#6366f1");
    useColors(setAccentColor, "accentColor");

    const isNewHighScore = score === highScore && score > 0;

    const handleHome = () => {
        navigate("home");
    };

    return (
        <Modal isOpen={isOpen} onClose={onRestart}>
            <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 border-2 border-gray-700">
                <div className="text-center space-y-6">

                    <h2 className="text-4xl font-bold text-white">{isNewHighScore ? "New High Score!" : "Game Over"}</h2>

                    <div className="space-y-2">
                        <p className="text-lg text-gray-400">Your Score</p>
                        <p className="text-6xl font-bold" style={{ color: accentColor }}>
                            {score}
                        </p>
                    </div>

                    {!isNewHighScore && (
                        <div className="bg-gray-800 rounded-lg p-4">
                            <p className="text-sm text-gray-400">High Score</p>
                            <p className="text-3xl font-bold text-white">{highScore}</p>
                        </div>
                    )}

                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={handleHome}
                            className="flex-1 py-3 px-6 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all hover:scale-105"
                        >
                             Home
                        </button>
                        <button
                            onClick={onRestart}
                            className="flex-1 py-3 px-6 text-white rounded-lg font-semibold transition-all hover:scale-105 shadow-lg"
                            style={{ backgroundColor: accentColor }}
                        >
                             Play Again
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default GameModal;
