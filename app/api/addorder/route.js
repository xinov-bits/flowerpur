import Order from '../../../models/Order';
import connectDb from '../../../middleware/mongoose';
import { NextResponse } from 'next/server';

// Establish MongoDB connection
connectDb();

export async function POST(req) {
    const res = await req.json();

    if (res.length !== 0 && res.length !== undefined && res.length !== null) {
        for (let i = 0; i < res.length; i++) {
            let newOrder = new Order({
                name: res[i].name,
                email: res[i].email,
                phone: res[i].phone,
                products: res[i].products,
                amount: res[i].amount,
                pincode: res[i].pincode,
                address: res[i].address,
                city: res[i].city,
                state: res[i].state,
                transactionId: res[i].transactionid,
                orderId: res[i].orderId,
                paymentInfo: res[i].paymentInfo,
                status: res[i].status,
                deliveryStatus: res[i].deliveryStatus,

                invoiceNumber: res[i].invoiceNumber,
            });

            await newOrder.save();
        }

        return NextResponse.json({ success: "success" });
    } else {
        return NextResponse.json({ error: "Products array is empty" });
    }
}