import { NextResponse } from "next/server";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is missing in .env file");
  }
  await mongoose.connect(MONGODB_URI);
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, message: "Name, email and phone are required." },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectDB();

    // Direct MongoDB Save
    const db = mongoose.connection.db;
    const result = await db.collection("enquiries").insertOne({
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully!",
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error("❌ API Route Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to submit enquiry" },
      { status: 500 }
    );
  }
}