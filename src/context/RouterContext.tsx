import { createContext, useContext, useState, type ReactNode } from "react";
import type { Route, RouterContextType } from "../types/routerContext.types";

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export function RouterProvider({ children }: { children: ReactNode }) {
    const [currentRoute, setCurrentRoute] = useState<Route>("home");
    const [params, setParams] = useState<Record<string, string>>({});

    const navigate = (route: Route, routeParams?: Record<string, string>) => {
        setCurrentRoute(route);
        if (routeParams) {
            setParams(routeParams);
        }
    };

    return <RouterContext.Provider value={{ currentRoute, navigate, params }}>{children}</RouterContext.Provider>;
}

export function useRouter() {
    const context = useContext(RouterContext);
    if (!context) {
        throw new Error("useRouter must be used within RouterProvider");
    }
    return context;
}
