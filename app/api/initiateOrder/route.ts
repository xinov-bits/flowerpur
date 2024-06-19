import Razorpay from 'razorpay';
import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

export async function POST(req: NextRequest) {
    try {
        const { taxAmt } = await req.json();

        if (!taxAmt) {
            return NextResponse.json({ error: 'taxAmt is required' }, { status: 400 });
        }

        // Initialize razorpay object
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID!,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        // Create an order -> generate the OrderID -> Send it to the Front-end
        // Also, check the amount and currency on the backend (Security measure)
        const payment_capture = 1;
        const amount = taxAmt;
        const currency = "INR";
        const options = {
            amount: (amount * 100).toString(),
            currency,
            receipt: nanoid(),
            payment_capture,
        };

        const response = await razorpay.orders.create(options);

        return NextResponse.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount,
        }, { status: 200 });
    } catch (err) {
        console.error('Error creating Razorpay order:', err);
        return NextResponse.json({ error: err || 'Internal Server Error' }, { status: 400 });
    }
}