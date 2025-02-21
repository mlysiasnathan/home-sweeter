'use client'
import React from "react";
import {useParams, useRouter} from "next/navigation";
import useSWR from "swr";
import Link from "next/link";

import Banners from "../../../components/Banners";
import Subfooter from "../../../components/Subfooter";
import TitleText from "../../../components/TitleText";
import {FiHome} from "react-icons/fi";
import {toast} from "react-toastify";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Booking = () => {
    const {email} = useParams(); // Get email from the URL
    const router = useRouter();

    const {data: bookings, error, isLoading} = useSWR(
        email ? `/api/booking/${email}` : null,
        fetcher
    );
    if (isLoading) return (<div className="relative p-20">
        <TitleText title="Loading..."/>
    </div>);
    if (error) return <p>Error: {error.message || "Failed to load bookings"}</p>;
    if (!bookings || bookings.length === 0) return (<div className="relative p-20">
        <TitleText title="Not entry"/>
    </div>);
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
            <div className="row flex-row flex justify-between items-center mx-32 my-6">
                {bookings.length
                    ? bookings.map((booking, index) => (
                        <div className="" key={index}>
                            <div
                                className="md:w-[350px] w-full h-[250px] rounded-[32px] bg-slate-200 flex items-center justify-center"
                            >
                                <FiHome className="text-third-color text-9xl"/>
                            </div>
                            <p>Status: {booking.status}</p>
                            <p>Check in date: {booking.checkIn}</p>
                            <p>Check out date: {booking.checkOut}</p>
                            <Link className="text-third-color underline" href={`/rentals/${booking.propertyId}`}>More
                                info about
                                this booking</Link>
                            <button
                                className={`${
                                    !isLoading
                                        ? "bg-yellow-400 text-white"
                                        : "bg-slate-200 text-slate-500"
                                } h-12 text-md w-48 px-7 rounded-full mt-3 mx-3`}
                                disabled={isLoading}
                                onClick={() => {
                                    toast.success("Canceling of booking Done");
                                    router.back()
                                }}>
                                {isLoading ? "Canceling..." : "Cancel"}
                            </button>
                        </div>
                    ))
                    : <div className="relative p-20">
                        <TitleText title="No bookings saved."/>
                    </div>
                }
            </div>
            <Subfooter/>
        </div>
    );
};

export default Booking;
