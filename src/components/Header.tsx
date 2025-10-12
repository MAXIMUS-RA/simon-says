import type { ILinks } from "../types/header.types";
import CustomBtn from "./CustomBtn";

function Header() {
    const links: ILinks[] = [
        { name: "Home", link: "home" },
        { name: "Game", link: "game" },
        { name: "About", link: "about" },
        { name: "Settings", link: "settings" },
    ];

    return (
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg py-6">
            <nav className="container mx-auto flex items-center justify-between">
                <h1 className="text-white text-2xl font-bold tracking-wider">Simon Says</h1>
                <ul className="flex space-x-6">
                    {links.map((el) => (
                        // <li key={el.link}>
                        <CustomBtn
                            link={el.link}
                            name={el.name}
                            key={Math.random() * 10}
                            // className="text-white px-4 py-2 rounded-full border-2 border-white hover:bg-white hover:text-indigo-600 transition duration-200"
                        />
                        // </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}

export default Header;
