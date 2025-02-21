import Banners from "../../components/Banners";
import Insights from "../../components/Insights";
import React from "react";
import Subfooter from "../../components/Subfooter";


const Ourfleet = () => {
    return (
        <div>
            <Banners
                img="/home/2.jpg"
                title="Promotional Offers"
                text="Book your stay this month and get 10% off your first rental!"
            />
            <div className="relative p-20">
                <Insights/>
            </div>
            <Subfooter/>
        </div>
    );
};

export default Ourfleet;
