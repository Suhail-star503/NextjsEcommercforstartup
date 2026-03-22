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
        console.error("❌ API ERROR:");
        console.error(error); // full error
        console.error("Message:", error.message);
        console.error("Stack:", error.stack);

        return NextResponse.json(
            {
                success: false,
                message: error.message || "Server error",
            },
            { status: 500 } // ❗ change from 401 → 500
        );
    }
}

