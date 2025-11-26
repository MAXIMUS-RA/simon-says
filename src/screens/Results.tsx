import { useState } from "react";
import { useNavigate } from "react-router"; // Import useNavigate
import { useColors } from "../hooks/useColors";
import { useResults } from "../hooks/useResults";


function Results() {
    const [accentColor, setAccentColor] = useState("#9333ea");
    const [bg, setBg] = useState("#9333ea");
    const { getStats } = useResults();
    const navigate = useNavigate(); // Initialize hook


    useColors(setAccentColor, "accentColor");
    useColors(setBg, "backgroundColor");

    const stats = getStats();
    console.log(stats);


    return (
        <div className="w-full min-h-screen p-8">
            <h1 className="text-4xl font-bold text-white mb-8 text-center">Game Results</h1>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 rounded-lg p-6 text-center">
                    <h3 className="text-gray-400 text-sm mb-2">Total Games</h3>
                    <p className="text-4xl font-bold text-white">{stats.totalGames}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-6 text-center">
                    <h3 className="text-gray-400 text-sm mb-2">Best Score</h3>
                    <p className="text-4xl font-bold" style={{ color: accentColor }}>
                        {stats.bestScore}
                    </p>
                </div>
                <div className="bg-white/10 rounded-lg p-6 text-center">
                    <h3 className="text-gray-400 text-sm mb-2">Average Score</h3>
                    <p className="text-4xl font-bold text-white">{stats.averageScore}</p>
                </div>
            </div>

            <div className="bg-white/10 rounded-lg p-6">
                {stats.totalGames === 0 ? (
                    <p className="text-gray-400 text-center py-8">No games played yet. Start playing to see your results!</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/20">
                                    <th className="text-left text-gray-400 py-3 px-4">Date</th>
                                    <th className="text-left text-gray-400 py-3 px-4">Score</th>
                                    <th className="text-left text-gray-400 py-3 px-4">Difficulty</th>
                                    <th className="text-left text-gray-400 py-3 px-4">Colors</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.recentGames.map((game, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-white/10 hover:bg-white/5 cursor-pointer transition-colors"
                                        onClick={() => navigate(`/results/${game.time}`)}
                                    >
                                        <td className="text-white py-3 px-4">{new Date(game.time).toLocaleString()}</td>
                                        <td className="text-white py-3 px-4 font-bold">{game.score}</td>
                                        <td className="text-white py-3 px-4 capitalize">{game.difficulty}</td>
                                        <td className="text-white py-3 px-4">{game.numberOfColors}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Results;
