import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

// Retrieve MongoDB URI from environment variables
const uri = process.env.MONGO_URI;
const collectionName = 'reviews';

export async function GET(req) {
    try {
        // Connect to MongoDB
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        // Access your database from the URI
        const db = client.db();

        // Access your collection
        const collection = db.collection(collectionName);

        // Fetch all reviews
        const reviews = await collection.find({}).toArray();

        const shortenReviews = Object.keys(reviews).map((review) => {
            return [
                {
                    stars: reviews[review].stars,
                    pname: reviews[review].pname
                }
            ]
        })

        function getReviewAmount(params) {
            const filteredReviews = Object.keys(reviews).filter((review) => {
                if (reviews[review].pname === params[0]) {
                    return reviews[review]
                }
            }).map((review) => reviews[review].stars)

            return filteredReviews
        }


        const getMeanReview = () => {
            const meanReviewBase = [];

            for (let i = 0; i < shortenReviews.length; i++) {
                const element = shortenReviews[i];

                let reviewAmount = getReviewAmount(element.map((k) => k.pname));
                let sumOfReviews = arr => arr.reduce((a, b) => a + b, 0);
                let meanOfReview = sumOfReviews(reviewAmount) / reviewAmount.length;

                let meanReview = {
                    name: element[0].pname,
                    stars: meanOfReview
                }

                meanReviewBase.push(meanReview);
            }

            return meanReviewBase;
        }

        const meanOfReviewArr = getMeanReview();


        await client.close();

        return NextResponse.json(meanOfReviewArr);
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}