import {NextResponse} from "next/server";
import {Property} from "../../../models/Property"; // Import the Property model

// Handle GET requests
export async function GET(req) {
    try {
        // Fetch all properties
        const properties = await Property.findAll();
        return NextResponse.json(properties, {status: 200});
    } catch (error) {
        console.error("Error fetching properties:", error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}

// Handle POST requests to add a property
export async function POST(req) {
    try {
        const {title, description, image, price, location, hostId} = await req.json(); // Get data from the request body
        // Ensure all required fields are provided
        if (!title || !price || !location || !hostId) {
            return NextResponse.json({error: "Missing required fields"}, {status: 400});
        }
        // Create the new property
        const newProperty = await Property.create({
            title: title,
            description: description,
            price: price,
            image: image,
            location: location,
            hostId: hostId, // Ensure hostId corresponds to an existing user in your DB
        });
        return NextResponse.json(newProperty, {status: 200});
    } catch (error) {
        console.error("Error adding property:", error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}

