import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import Admin from "@/models/admin";
import { generateToken } from "@/utils/generateToken";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    // ✅ Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    // ✅ Find admin (include password)
    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // ❗ Check active
    if (!admin.isActive) {
      return NextResponse.json(
        { success: false, message: "Account disabled" },
        { status: 403 }
      );
    }

    let isMatch = false;

    // 🔥 Handle password logic
    if (admin.role === "super_admin") {
      // ⚠️ Plain password comparison
      isMatch = password === admin.password;
    } else {
      // 🔐 Bcrypt comparison
      isMatch = await bcrypt.compare(password, admin.password);
    }

    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 🔄 Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // 🎟️ Generate token
    const token = generateToken(admin);

    // 🍪 Response + cookie
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        token,
      },
    });

    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      { status: 500 }
    );
  }
}