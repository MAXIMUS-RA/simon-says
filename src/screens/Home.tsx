import CustomBtn from "../components/CustomBtn";
import { useRouter } from "../context/RouterContext";

function Home() {
    return (
        <div className=" w-full min-h-screen flex justify-center items-center">
            <CustomBtn link={'game'} name="Game" ></CustomBtn>
        </div>
    );
}

export default Home;
