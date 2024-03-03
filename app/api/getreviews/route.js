import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

// Retrieve MongoDB URI from environment variables
const uri = process.env.MONGO_URI;
const collectionName = 'reviews';

export async function GET(req) {
    const query = JSON.parse(req.nextUrl.searchParams.get('pn'));

    try {

        // Connect to MongoDB
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        // Access your database from the URI
        const db = client.db();

        // Access your collection
        const collection = db.collection(collectionName);

        // Fetch all reviews
        const reviews = await collection.find({
            pname: query
        }).toArray();

        // Close the connection
        await client.close();

        return NextResponse.json(reviews);
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}