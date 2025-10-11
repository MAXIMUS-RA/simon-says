import { useRouter } from "../context/RouterContext";
import type { Route } from "../types/routerContext.types";

function CustomBtn({ link, name }: { link: Route; name: string }) {
    const { navigate } = useRouter();

    return (
        <li className="text-white px-4 py-2 rounded-full border-2 border-white hover:bg-white hover:text-indigo-600 transition duration-200" onClick={() => navigate(link)}>
            {name}
        </li>
    );
}

export default CustomBtn;
