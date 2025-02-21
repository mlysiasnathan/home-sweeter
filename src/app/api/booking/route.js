import {NextResponse} from "next/server";
import {Booking} from "../../../models";

export async function POST(req) {
    try {
        const {renterId, propertyId, checkIn, checkOut} = await req.json();
        // Convert date strings to Date objects
        const newBooking = await Booking.create({
            renterId,
            propertyId,
            checkIn: checkIn, // Convert to Date
            checkOut: checkOut, // Convert to Date
        });
        return NextResponse.json(newBooking, {status: 200});
    } catch (error) {
        console.error("Error creating booking:", error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}