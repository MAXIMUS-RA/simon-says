import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import { RouterProvider, useRouter } from "./context/RouterContext";
import About from "./screens/About";
import Game from "./screens/Game";
import Home from "./screens/Home";
import Settings from "./screens/Settings";

function AppContent() {
    const { currentRoute } = useRouter();
    
    const [backgroundColor, setBackgroundColor] = useState("#9333ea");

    useEffect(() => {
        const loadBackgroundColor = () => {
            const savedSettings = localStorage.getItem("gameSettings");
            if (savedSettings) {
                try {
                    const settings = JSON.parse(savedSettings);
                    setBackgroundColor(settings.backgroundColor || "#9333ea");
                } catch (error) {
                    console.error("Failed to load colors", error);
                    setBackgroundColor("#9333ea");
                }
            }
        };

        loadBackgroundColor();

        window.addEventListener("storage", loadBackgroundColor);
        window.addEventListener("settingsUpdated", loadBackgroundColor);

        return () => {
            window.removeEventListener("storage", loadBackgroundColor);
            window.removeEventListener("settingsUpdated", loadBackgroundColor);
        };
    }, []);
    const renderScreen = () => {
        switch (currentRoute) {
            case "home":
                return <Home />;
            case "game":
                return <Game />;
            case "about":
                return <About />;
            case "settings":
                return <Settings />;
            default:
                return <Home />;
        }
    };

    return (
        <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor }}>
            <Header />
            {renderScreen()}
        </div>
    );
}

function App() {
    return (
        <RouterProvider>
            <AppContent />
        </RouterProvider>
    );
}

export default App;
