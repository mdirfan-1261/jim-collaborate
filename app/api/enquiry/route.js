import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";

// GET method to test in browser
export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Enquiry API Route is Active & Working!",
  });
}

// POST method for form submit
export async function POST(req) {
  try {
    const body = await req.json();
    const {
      hotel,
      name,
      company,
      phone,
      email,
      checkIn,
      checkOut,
      guests,
      rooms,
      message,
    } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, message: "Name, email and phone are required." },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectDB();

    // Save enquiry in MongoDB
    const newEnquiry = await Enquiry.create({
      hotel: hotel || "",
      name,
      company: company || "",
      phone,
      email,
      checkIn: checkIn || "",
      checkOut: checkOut || "",
      guests: guests || 0,
      rooms: rooms || 0,
      message: message || "",
    });

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully!",
      enquiry: newEnquiry,
    });
  } catch (error) {
    console.error("Enquiry API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to submit enquiry",
      },
      { status: 500 }
    );
  }
}