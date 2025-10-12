import { useMemo } from "react";
import Header from "./components/Header";
import { RouterProvider, useRouter } from "./context/RouterContext";
import About from "./screens/About";
import Game from "./screens/Game";
import Home from "./screens/Home";
import Settings from "./screens/Settings";
// import Results from "./screens/Results";

function AppContent() {
    const { currentRoute } = useRouter();
    const backgroundColor = useMemo(() => {
        const savedColors = localStorage.getItem("colors");
        if (savedColors) {
            try {
                const color = JSON.parse(savedColors);
                return color.backgroundColor;
            } catch (error) {
                console.error("Failed to load colors", error);
                return "#fff";
            }
        }
        return "#fff";
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
