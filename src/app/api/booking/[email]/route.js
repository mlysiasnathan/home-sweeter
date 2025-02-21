import {Booking, User} from "../../../../models";

// import {NextResponse} from "next/server";

export async function GET(req, res, {params}) {
    const {email} = req.query;

    if (!email) {
        return res.status(400).json({error: "Email is required"});
    }

    try {
        // Find the user by email
        const user = await User.findOne({where: {email}});

        if (!user) {
            return res.status(404).json({error: "User not found"});
        }

        // Fetch all bookings for this user
        const bookings = await Booking.findAll({
            where: {renterId: user.id}, // Assuming 'renterId' is the FK for User
            include: [{model: User, as: "renter", attributes: ["id", "name", "email"]}],
        });

        return res.status(200).json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return res.status(500).json({error: "Internal Server Error"});
    }
}

