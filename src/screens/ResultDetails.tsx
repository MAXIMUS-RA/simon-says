import { useParams, useNavigate } from "react-router";
import { useResults } from "../hooks/useResults";
import { useColors } from "../hooks/useColors";
import { useState } from "react";

function ResultDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { history } = useResults();
    const [accentColor, setAccentColor] = useState("#9333ea");
    useColors(setAccentColor, "accentColor");

    // Find the game based on the timestamp ID from the URL
    const game = history.find((g) => g.time === Number(id));

    // Handle case where game is not found (or history hasn't loaded yet)
    if (!game) {
        return (
            <div className="text-center text-white mt-20">
                <h2 className="text-2xl">Game not found</h2>
                <button onClick={() => navigate("/results")} className="mt-4 text-blue-400 hover:underline">
                    Back to Results
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto text-white p-8 bg-white/10 rounded-lg mt-10 animate-scale-in">
            <h1 className="text-3xl font-bold mb-6 border-b border-white/20 pb-4">Game Details</h1>
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <span className="text-gray-400 block mb-1">Date</span>
                    <p className="text-xl">{new Date(game.time).toLocaleString()}</p>
                </div>
                <div>
                    <span className="text-gray-400 block mb-1">Score</span>
                    <p className="text-4xl font-bold" style={{ color: accentColor }}>
                        {game.score}
                    </p>
                </div>
                <div>
                    <span className="text-gray-400 block mb-1">Difficulty</span>
                    <p className="text-xl capitalize">{game.difficulty}</p>
                </div>
                <div>
                    <span className="text-gray-400 block mb-1">Colors</span>
                    <p className="text-xl">{game.numberOfColors}</p>
                </div>
            </div>
            <button
                onClick={() => navigate("/results")}
                className="mt-8 px-6 py-2 rounded font-semibold text-white transition-transform hover:scale-105"
                style={{ backgroundColor: accentColor }}
            >
                Back to List
            </button>
        </div>
    );
}

export default ResultDetails;
