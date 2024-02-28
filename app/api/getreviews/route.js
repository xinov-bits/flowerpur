import { MongoClient } from 'mongodb';
import connectDb from '../../../middleware/mongoose';
import { NextResponse } from 'next/server';

// Retrieve MongoDB URI from environment variables
const uri = process.env.MONGO_URI;
const collectionName = 'reviews';

export async function GET(req) {
    try {
        const pn = JSON.parse(req.nextUrl.searchParams.get('pn'));

        // Connect to MongoDB
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        // Access your database from the URI
        const db = client.db();

        // Access your collection
        const collection = db.collection(collectionName);

        if (pn) {
            const reviews = await collection.find({ pname: pn }).toArray();
            if (reviews.length === 0) {
                return NextResponse.json({ message: 'Reviews not found for the specified product name' });
            }

            return NextResponse.json(reviews);
        } else {
            return NextResponse.json({ error: 'Query is undefined' });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}