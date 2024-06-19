import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
import { NextResponse } from "next/server";

// establish MongoDB connection
connectDb();

export async function POST(req) {
    try {
        const res = await req.json();

        console.log(res[0])

        const filter = {
            email: res[0].email,
            phone: res[0].phone,
        }
        const update = {
            cart: res[0].cart,
        }

        const user = await User.findOneAndUpdate(filter, update);

        if (!user) {
            console.log("No such user found.");
        }

        return NextResponse.json({ success: true, user });
    } catch (error) {
        return NextResponse.json({ error: "An error occurred while processing the request", details: error.message }, { status: 500 });
    }
}