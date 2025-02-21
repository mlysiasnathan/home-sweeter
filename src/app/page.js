import Carousels from "../components/Carousel";
import Explore from "../components/Explore";
import Subfooter from "../components/Subfooter";

export default function Home() {
    return (
        <div className="">
            <Carousels/>
            <div className="relative">
                <Explore/>
                <Subfooter/>
            </div>
        </div>
    );
}
