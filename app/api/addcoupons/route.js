import Coupons from '@/models/Coupons';
import connectDb from '@/middleware/mongoose';
import { NextResponse } from 'next/server';

// Establish MongoDB connection
connectDb();

export async function POST(req) {
    const res = await req.json();

    try {
        for (let i = 0; i < res.length; i++) {
            const pc = new Coupons({
                code: res[i].code,
                discountType: res[i].discountType,
                discountAmount: res[i].discountAmount,
                expiry: res[i].expiry,
            })

            await pc.save();
        }

        return NextResponse.json({ success: 'success' });
    } catch (error) {
        console.error('Error saving promo code:', error);
        return NextResponse.json({ error: 'Error saving promo code' });
    }
}