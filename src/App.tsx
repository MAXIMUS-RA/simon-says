import { useState } from "react";
import { Routes, Route } from "react-router";
import Header from "./components/Header";
import About from "./screens/About";
import Game from "./screens/Game";
import Home from "./screens/Home";
import Settings from "./screens/Settings";
import { useColors } from "./hooks/useColors";
import Results from "./screens/Results";
import ResultDetails from "./screens/ResultDetails";

function AppContent() {
    const [backgroundColor, setBackgroundColor] = useState("#9333ea");

    useColors(setBackgroundColor, "backgroundColor");

    return (
        <div className="min-h-screen transition-colors duration-300 relative" style={{ backgroundColor }}>
            <Header />
            <div className="pt-24 mx-auto container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/game" element={<Game />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/results" element={<Results />} />
                    {/* Dynamic Route for Game Details */}
                    <Route path="/results/:id" element={<ResultDetails />} />
                </Routes>
            </div>
        </div>
    );
}

function App() {
    return <AppContent />;
}

export default App;
