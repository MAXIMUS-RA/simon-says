export type Route = "home" | "game" | "results" | "about" | "settings";

export interface RouterContextType {
    currentRoute: Route;
    navigate: (route: Route) => void;
    params?: Record<string, string>;
}
