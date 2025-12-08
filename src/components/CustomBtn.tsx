import { NavLink } from "react-router";
import type { ComponentProps } from "react";

type CustomBtnProps = { link: string; name: string } & Omit<ComponentProps<typeof NavLink>, "to">;

function CustomBtn({ link, name, ...props }: CustomBtnProps) {
    return (
        <NavLink
            to={link}
            className={({ isActive }) =>
                `px-4 py-2 rounded-full border-2 border-white transition duration-200 ${
                    isActive ? "bg-white text-indigo-600 font-bold" : "text-white hover:bg-white hover:text-indigo-600"
                }`
            }
            {...props}
        >
            {name}
        </NavLink>
    );
}

export default CustomBtn;
