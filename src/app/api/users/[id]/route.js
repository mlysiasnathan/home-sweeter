import {NextResponse} from "next/server";
import {User} from "../../../../models/User"; // Ensure the correct path

export async function GET(req, {params}) {
    try {
        const {id} = params;

        const user = await User.findByPk(id);

        if (!user) {
            return NextResponse.json({error: "User not found"}, {status: 404});
        }

        return NextResponse.json(user, {status: 200});
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}

