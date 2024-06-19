import User from '../../../models/User';
import connectDb from '../../../middleware/mongoose';
import { NextResponse } from 'next/server';

// JSON WEB TOKEN
import jwt from 'jsonwebtoken';

// Establish MongoDB connection
connectDb();

export async function POST(req) {
    try {
        const res = await req.json();

        const user = await User.findOne({ email: res[0].email, phone: res[0].phone });

        if (user) {
            if (res[0].phone === user.phone) {
                if (!process.env.JWT_SECRET) {
                    return NextResponse.json({ error: "JWT secret not set." }, { status: 400 });
                }

                const token = jwt.sign({ phone: user.phone }, process.env.JWT_SECRET);
                return NextResponse.json({ success: true, token, name: user.name, email: user.email, phone: user.phone, cart: user.cart }, { status: 200 });
            } else {
                return NextResponse.json({ error: "Invalid Credentials." }, { status: 400 });
            }
        } else {
            return NextResponse.json({ error: "No Such User Found." }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ error: "An error occurred while processing the request", details: error.message }, { status: 500 });
    }
}