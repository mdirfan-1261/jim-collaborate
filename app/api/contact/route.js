import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

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

    const dataDir = path.join(process.cwd(), "data");
    const contactFile = path.join(dataDir, "contacts.json");

    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    let contacts = [];
    if (fs.existsSync(contactFile)) {
      try {
        contacts = JSON.parse(fs.readFileSync(contactFile, "utf-8"));
      } catch (e) {
        contacts = [];
      }
    }

    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      phone: phone || "",
      message: message || "",
      createdAt: new Date().toISOString(),
    };

    contacts.push(newContact);
    fs.writeFileSync(contactFile, JSON.stringify(contacts, null, 2));

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
      contact: newContact,
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to send message" },
      { status: 500 }
    );
  }
}