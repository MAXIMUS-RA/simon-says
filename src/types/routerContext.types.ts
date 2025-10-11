export type Route = "home" | "game" | "results" | "about";

export interface RouterContextType {
    currentRoute: Route;
    navigate: (route: Route) => void;
    params?: Record<string, string>;
}