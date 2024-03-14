import Product from '../../../models/Product';
import connectDb from '../../../middleware/mongoose';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const text = 'tanishq____'

    return NextResponse.json({ enc: `${text[1]}${text[9]}${text[0]}${text[1]}${text[2]}${text[0]}${text[0]}${text[9]}` });
}