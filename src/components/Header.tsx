import type { ILinks } from "../types/header.types";
import CustomBtn from "./CustomBtn";
import { useSettings } from "../store/storeSettings";

function Header() {
    const links: ILinks[] = [
        { name: "Home", link: "/home" },
        { name: "Game", link: "/game" },
        { name: "About", link: "/about" },
        { name: "Settings", link: "/settings" },
        { name: "Results", link: "/results" },
    ];


    const accentColor = useSettings((state) => state.accentColor);
    const backgroundColor = useSettings((state) => state.backgroundColor);

    return (
        <div className=" shadow-lg py-6 absolute top-0 w-full" style={{ background: `linear-gradient(to right,${accentColor}, ${backgroundColor})` }}>
            <nav className="container mx-auto flex items-center justify-between">
                <h1 className="text-white text-2xl font-bold tracking-wider">Simon Says</h1>
                <ul className="flex space-x-6">
                    {links.map((el) => (
                        <CustomBtn link={el.link} name={el.name} key={el.link} />
                    ))}
                </ul>
            </nav>
        </div>
    );
}

export default Header;
