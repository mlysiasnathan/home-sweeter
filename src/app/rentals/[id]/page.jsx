"use client";
import React, {useEffect, useState} from "react";
import {useParams, useRouter, useSearchParams} from "next/navigation";
import {IoBookmark, IoHome, IoLocation} from "react-icons/io5";
import {toast} from "react-toastify";
import {mutate} from "swr";
import {useSession} from "next-auth/react";
import TitleText from "../../../components/TitleText";


// https://youtu.be/h13mMp6-81Y

const PropertyPage = () => {
    const router = useRouter();
    const [booking, setBooking] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const {data: session} = useSession();

    async function addBooking() {
        if (!booking.checkIn) return toast.error('Check in date is required');
        if (!booking.checkOut) return toast.error('Check out date is required');
        setIsLoading(true);
        toast.promise(
            fetch("/api/booking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    propertyId: property.id,
                    checkIn: booking.checkIn,
                    checkOut: booking.checkOut,
                    renterId: session.user.id,
                }),
            }).then((response) => {
                if (!response.ok) {
                    setIsLoading(false);
                    throw new Error(`Failed to add booking`);
                }
                return response.json();
            }).then((booking) => {
                mutate();
                setIsLoading(false);
                return booking;
            }),
            {
                pending: `Adding new booking: ${booking.title}`,
                error: 'Failed to add booking',
                success: 'Done',
            });

    }


    const searchParams = useSearchParams();
    const {id} = useParams(); // Get ID from the URL
    const [error, setError] = useState(null);
    const [isInit, setIsInit] = useState(false);
    const [user, setUser] = useState(null);
    const [existingBooking, setExistingBooking] = useState({});
    const [property, setProperty] = useState(
        searchParams.get("state") ? JSON.parse(searchParams.get("state")) : null
    );
    // Fetch property by ID if not found in state
    useEffect(() => {
        if (!property) {
            fetch(`/api/properties/${id}`)
                .then((res) => res.json())
                .then((data) => setProperty(data))
                .catch((err) => setError(err));
        }
    }, [id, property]);
    if (property && !isInit) {
        fetch(`/api/users/${property.hostId}`)
            .then((res) => res.json())
            .then((data) => setUser(data))
            .catch((err) => setError(err))
            .then((_) =>
                fetch(`/api/booking/${property.id}`)
                    .then((res) => res.json())
                    .then((data) => setExistingBooking(data))
                    .catch((err) => setError(err))
                    .then((_) => setIsInit(true)))
        ;
    }
    if (error || property == null) return <div className="text-red-600">{error}</div>;
    if (!property) return <TitleText title="Loading property..."/>;
    return (
        <div
            className="w-full grid grid-cols-1 md:grid-cols-2 rounded-lg shadow-[0_2px_15px_-3px-rgba(0,0,0,0.07),0_10px_20px_-2px-rgba(0,0,0,0.04)] md:flex-row relative">
            <div className="row">
                <img
                    src={property.image}
                    alt=""
                    className="h-96 w-full object-cover md:h-[60vh] lg:h-[80vh]"
                />
                {(session && session.user.role === 'host' && session.user.id === property.hostId) && (<>
                        <button
                            className={`${
                                !isLoading
                                    ? "bg-red-600 text-white"
                                    : "bg-slate-200 text-slate-500"
                            } h-12 text-md w-48 px-7 rounded-full mt-3`}
                            disabled={isLoading}
                            onClick={() => {
                                toast.success("Deleting Done");
                                router.back()
                            }}>
                            {isLoading ? "Deleting..." : "Delete"}
                        </button>
                        <button
                            className={`${
                                !isLoading
                                    ? "bg-yellow-400 text-white"
                                    : "bg-slate-200 text-slate-500"
                            } h-12 text-md w-48 px-7 rounded-full mt-3 mx-3`}
                            disabled={isLoading}
                            onClick={() => toast.success("Feature available in next update")}>
                            {isLoading ? "Editing..." : "Edit"}
                        </button>
                    </>
                )}
            </div>


            <div className="flex flex-col justify-center gap-8 md:px-16 px-8 md:my-0 my-8">
                <div className="flex items-center gap-5">
          <span className="shadow-xl text-2xl p-6 rounded-full">
              <IoHome className="text-third-color"/>
          </span>
                    <div className="flex flex-col gap-2">
                        <h5 className="text-2xl text-gray-900 font-bold">{property.title}</h5>
                        <p className="mb-4 text-base text-gray-500 border-l-4 border-third-color pl-4">
                            {property.description}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-5">
          <span className="shadow-xl text-2xl p-6 rounded-full">
            <IoLocation className="text-third-color"/>
          </span>
                    <div className="flex flex-col gap-2">
                        <h5 className="text-2xl text-gray-900 font-bold">Location</h5>
                        <p className="mb-4 text-base text-gray-500 border-l-4 border-third-color pl-4">
                            {property.location}
                            <hr/>
                            <span className="text-third-color">{property.price}$</span> daily price
                            <hr/>
                            {user && <>Hosted by <span className="text-third-color">{user.name}</span></>}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-5">
          <span className="shadow-xl text-2xl p-6 rounded-full">
            <IoBookmark className="text-third-color"/>
          </span>
                    <div className="flex flex-col gap-2">
                        <h5 className="text-2xl text-gray-900 font-bold">Booking</h5>
                        <p className="mb-4 text-base text-gray-500 border-l-4 border-third-color pl-4">
                            {"id" in existingBooking ?
                                <>
                                    <p className="text-red-600">{existingBooking.status}</p>
                                </>
                                :
                                <>
                                    <p>Check In Date</p>
                                    <input
                                        className='md:w-[350px] w-full h-12 rounded-full mt-4 mr-10 bg-slate-200 text-third-color px-3 focus:outline-none border-third-color focus:border-4 border-2'
                                        type='date'
                                        placeholder='Check in Date'
                                        onChange={(e) => {
                                            booking.checkIn = e.target.value
                                            booking.checkIn.trim()
                                            setBooking({...booking})
                                        }}/>
                                    <hr/>
                                    <p>Check Out Date</p>
                                    <input
                                        className='md:w-[350px] w-full h-12 rounded-full mt-4 mr-10 bg-slate-200 text-third-color px-3 focus:outline-none border-third-color focus:border-4 border-2'
                                        type='date'
                                        placeholder='Check out Date'
                                        onChange={(e) => {
                                            booking.checkOut = e.target.value
                                            booking.checkOut.trim()
                                            setBooking({...booking})
                                        }}/>
                                    <button
                                        className={`${
                                            !isLoading
                                                ? "bg-third-color text-white"
                                                : "bg-slate-200 text-slate-500"
                                        } h-12 text-md w-48 px-7 rounded-full mt-3`}
                                        disabled={isLoading}
                                        onClick={addBooking}>
                                        {isLoading ? "Adding..." : "Book"}
                                    </button>
                                </>
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyPage;
