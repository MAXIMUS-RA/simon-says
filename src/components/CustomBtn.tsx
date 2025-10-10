import { useRouter } from "../context/RouterContext";

function CustomBtn() {
    const { navigate } = useRouter();

    return (
        <button className="bg-white w-30 h-10 p-2 rounded-2xl hover:bg-gray-500 duration-150" onClick={() => navigate("game")}>
            Game
        </button>
    );
}

export default CustomBtn;
