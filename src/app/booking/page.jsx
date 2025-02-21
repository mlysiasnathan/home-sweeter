import React from "react";
import Banners from "../../components/Banners";
import Subfooter from "../../components/Subfooter";
import TitleText from "../../components/TitleText";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Booking = ({email}) => {
    const {data: bookings, error} = useSWR(`/api/booking/${email}`, fetcher);

    if (error) return <div>Error loading bookings.</div>;
    if (!bookings) return <div>Loading...</div>;
    return (
        <div>
            <Banners
                img="/home/2.jpg"
                title="Promotional Offers"
                text="Book your stay this month and get 10% off your first rental!"
            />
            <div className="relative p-20">
                <TitleText title="My Bookings"/>
            </div>
            {bookings.map((booking) => (
                <div key={booking.id}>
                    <p>Title: {booking.title}</p>
                    <p>Status: {booking.status}</p>
                </div>
            ))}
            <Subfooter/>
        </div>
    );
};

export default Booking;
