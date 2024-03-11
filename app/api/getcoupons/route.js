import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

// Retrieve MongoDB URI from environment variables
const uri = process.env.MONGO_URI;
const collectionName = 'coupons';

export async function GET(req) {
    try {
        // Connect to MongoDB
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        // Access your database from the URI
        const db = client.db();

        // Access your collection
        const collection = db.collection(collectionName);

        // Fetch all coupons
        const coupons = await collection.find({}).toArray();

        // Close the connection
        await client.close();

        return NextResponse.json(coupons);
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}