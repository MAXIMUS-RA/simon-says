import { useRouter } from "../context/RouterContext";

function Header() {
    const { navigate } = useRouter();

    return (
        <div className="text-center mb-16 bg-red-700">
            <ul>
                {/* {pages.map((el) => ( */}
                <li onClick={() => navigate("game")}></li>
                {/* ))} */}
            </ul>
        </div>
    );
}

export default Header;
