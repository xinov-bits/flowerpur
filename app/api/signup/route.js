import User from '../../../models/User';
import connectDb from '../../../middleware/mongoose';
import { NextResponse } from 'next/server';

import CryptoJS from 'crypto-js';

// Establish MongoDB connection
connectDb();

export async function POST(req) {
    try {
        const res = await req.json();

        const { name, email, phone } = req.body;

        for (let i = 0; i < res.length; i++) {
            let u = new User({
                name: res[i].name,
                email: res[i].email,
                phone: res[i].phone,
                key: CryptoJS.AES.encrypt(JSON.stringify(res[i].phone), process.env.AES_SECRET).toString(),
            });
            await u.save();
        }

        return NextResponse.json({ success: "success" });
    } catch (error) {
        // console.error("Error processing request:", error);
        return NextResponse.json({ error: "An error occurred while processing the request", details: error.message }, { status: 500 });
    }
}