import pincodes from '../../../public/db/pincodes.json';
import { NextResponse } from 'next/server';

export async function GET(req) {
    return NextResponse.json({ pincodes });
}