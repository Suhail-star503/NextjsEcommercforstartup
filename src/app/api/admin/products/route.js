import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import product from "@/models/product";
import jwt from "jsonwebtoken";

// GET ALL PRODUCTS

export async function GET(req) {
    try {
        await connectDB();

        // Read token from Authorization header
        const authHeader = req.headers.get("authorization");

        if (!authHeader) {
            return NextResponse.json(
                { success: false, message: "No token provided" },
                { status: 401 }
            );
        }

        const token = authHeader.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return NextResponse.json(
                { success: false, message: "Invalid token" },
                { status: 401 }
            );
        }

        const products = await product.find().sort({ createdAt: -1 });

        return NextResponse.json(
            { success: true, products },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 401 }
        );
    }
}

// CREATE PRODUCT
// export async function POST(req) {
//     try {
//         await connectDB();

//         const body = await req.json();

//         const product = await Product.create(body);

//         return NextResponse.json(
//             { success: true, product },
//             { status: 201 }
//         );
//     } catch (error) {
//         return NextResponse.json(
//             { success: false, message: error.message },
//             { status: 500 }
//         );
//     }
// }