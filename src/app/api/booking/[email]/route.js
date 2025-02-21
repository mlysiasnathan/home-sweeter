import {Booking, User} from "../../../../models";
import {address} from "framer-motion/m"; // Import your models

export async function GET(req, {params}) {
    const {email} = params; // Extract email from URL parameters

    if (!email) {
        return new Response(JSON.stringify({error: "Dynamic params Email or PropertyId is required"}), {status: 400});
    }


    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        // if this is a valid email address
        try {
            // Find the user by email
            const user = await User.findOne({where: {email}});

            if (!user) {
                return new Response(JSON.stringify({error: "User not found"}), {status: 404});
            }

            // Fetch all bookings for this user
            const bookings = await Booking.findAll({
                where: {renterId: user.id}, // Assuming 'renterId' is the FK for User
                include: [{model: User, as: "User", attributes: ["id", "name", "email"]}],
            });

            return new Response(JSON.stringify(bookings), {status: 200});
        } catch (error) {
            console.error("Error fetching bookings:", error);
            return new Response(JSON.stringify({error: "Internal Server Error"}), {status: 500});
        }
    } else {
        const id = email; // Extract id from URL parameters

        if (!id) {
            return new Response(JSON.stringify({error: "Id is required"}), {status: 400});
        }

        try {
            // Find the booking by id
            const existingBooking = await Booking.findOne({where: {propertyId: id}});

            if (!existingBooking) {
                return new Response(JSON.stringify({error: "Booking not found"}), {status: 404});
            }

            return new Response(JSON.stringify(existingBooking), {status: 200});
        } catch (error) {
            console.error("Error fetching bookings:", error);
            return new Response(JSON.stringify({error: "Internal Server Error"}), {status: 500});
        }
    }


}
