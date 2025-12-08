import CustomBtn from "../components/CustomBtn";
import { useSettings } from "../store/storeSettings";

function Home() {
    const {accentColor} = useSettings();
    return (
        <div className=" w-full min-h-screen flex flex-col gap-10 justify-center items-center">
            <div className="space-y-4">
                <h1 className="text-7xl md:text-8xl font-bold " style={{ color: accentColor }}>
                    Simon Says
                </h1>
                <p className="text-xl md:text-2xl   " style={{ color: accentColor }}>
                    Test your memory. Beat your high score.
                </p>
            </div>
            <CustomBtn link={"game"} name="Game"></CustomBtn>
        </div>
    );
}

export default Home;
