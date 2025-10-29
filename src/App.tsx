import {  useState } from "react";
import Header from "./components/Header";
import { RouterProvider, useRouter } from "./context/RouterContext";
import About from "./screens/About";
import Game from "./screens/Game";
import Home from "./screens/Home";
import Settings from "./screens/Settings";
import { useColors } from "./hooks/useColors";

function AppContent() {
    const { currentRoute } = useRouter();

    const [backgroundColor, setBackgroundColor] = useState("#9333ea");

    useColors(setBackgroundColor, "backgroundColor");
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
        <div className="min-h-screen transition-colors duration-300 relative" style={{ backgroundColor }}>
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
