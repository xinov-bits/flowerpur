import Product from '../../../models/Product';
import connectDb from '../../../middleware/mongoose';
import { NextResponse } from 'next/server';

// Establish MongoDB connection
connectDb();

export async function POST(req) {
    const res = await req.json();

    if (res.length !== 0 && res.length !== undefined && res.length !== null) {
        for (let i = 0; i < res.length; i++) {
            let p = new Product({
                title: res[i].title,
                slug: res[i].slug,
                // desc: res[i].desc,
                dimg: res[i].dimg,
                img1: res[i].img1,
                catagory: res[i].catagory,
                subCatagory: res[i].subCatagory,
                availableQty: res[i].availableQty,
                price: res[i].price,
                sku: res[i].sku,
                offer: res[i].offer,
            });
            await p.save();
        }

        console.log(res)
        return NextResponse.json({ success: "success" });
    } else {
        return NextResponse.json({ error: "Products array is empty" });
    }
}