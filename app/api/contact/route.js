import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";

// GET method to test in browser
export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Contact API Route is Active & Working!",
  });
}

// POST method for form submit
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: "Name and email are required." },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectDB();

    // Save contact in MongoDB
    const newContact = await Contact.create({
      name,
      email,
      phone: phone || "",
      message: message || "",
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
      contact: newContact,
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to send message",
      },
      { status: 500 }
    );
  }
}