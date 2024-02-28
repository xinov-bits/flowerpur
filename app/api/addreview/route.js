import Review from '@/models/Review';
import connectDb from '@/middleware/mongoose';
import { NextResponse } from 'next/server';

// Establish MongoDB connection
connectDb();

export async function POST(req) {
    const res = await req.json();

    try {
        for (let i = 0; i < res.length; i++) {
            const r = new Review({
                stars: res[i].stars,
                email: res[i].email,
                name: res[i].name,
                title: res[i].title,
                desc: res[i].desc,

                pname: res[i].pname,
                img: res[i].img,

                approved: res[i].approved,
            })
            await r.save()
        }
        return NextResponse.json({ success: 'success' });
    } catch (error) {
        console.error('Error saving review:', error);
        return NextResponse.json({ error: 'Error saving review' });
    }
}