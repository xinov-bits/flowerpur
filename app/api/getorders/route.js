import Order from '@/models/Order';
import connectDb from '@/middleware/mongoose';
import { NextResponse } from 'next/server';
import jsonwebtoken from 'jsonwebtoken';

// Establish MongoDB connection
connectDb();

export async function GET(req) {
    const token = JSON.parse(req.nextUrl.searchParams.get('tkn'));

    try {
        if (!token) {
            return NextResponse.json({ error: 'Token is missing in the request body' });
        }

        const data = jsonwebtoken.verify(token, process.env.JWT_SECRET);

        if (!data.phone) {
            return NextResponse.json({ error: 'Invalid data in the token' });
        }

        const orders = await Order.find({ phone: data.phone });

        if (orders) {
            return NextResponse.json({ data, orders });
        } else {
            return NextResponse.json({ error: 'No orders found for the user' });
        }
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json({ error: 'An error occurred while fetching orders' });
    }
};