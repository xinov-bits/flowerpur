import Product from '../../../models/Product';
import connectDb from '../../../middleware/mongoose';
import { NextResponse } from 'next/server';

// Establish MongoDB connection
connectDb();

export async function GET(req) {
    try {
        const products = await Product.find();
        return NextResponse.json({ products });
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}