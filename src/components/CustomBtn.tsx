import { NavLink } from "react-router";
import type { Route } from "../types/routerContext.types";

function CustomBtn({ link, name, ...props }: { link: Route; name: string; [key: string]: any }) {

    return (
        <NavLink
            to={link}
            className="list-none text-white px-4 py-2 rounded-full border-2 border-white hover:bg-white hover:text-indigo-600 transition duration-200"
        >
            {name}
        </NavLink>
    );
}

export default CustomBtn;
