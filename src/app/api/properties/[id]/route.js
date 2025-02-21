import {NextResponse} from "next/server";
import {Property} from "../../../../models/Property"; // Ensure the correct path

export async function GET(req, {params}) {
    try {
        const {id} = params;

        const property = await Property.findByPk(id);

        if (!property) {
            return NextResponse.json({error: "Property not found"}, {status: 404});
        }

        return NextResponse.json(property, {status: 200});
    } catch (error) {
        console.error("Error fetching property:", error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}

