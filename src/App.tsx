import Header from "./components/Header";
import { RouterProvider, useRouter } from "./context/RouterContext";
import About from "./screens/About";
import Game from "./screens/Game";
import Home from "./screens/Home";
// import Results from "./screens/Results";

function AppContent() {
    const { currentRoute } = useRouter();

    const renderScreen = () => {
        switch (currentRoute) {
            case "home":
                return <Home />;
            case "game":
                return <Game />;
            case"about":
                return <About/>
            // case "results":
            //     return <Results />;
            default:
                return <Home />;
        }
    };

    return <div className="min-h-screen bg-[#0a0a0a]"><Header/>{renderScreen()}</div>;
}

function App() {
    return (
        <RouterProvider>
            <AppContent />
        </RouterProvider>
    );
}

export default App;
