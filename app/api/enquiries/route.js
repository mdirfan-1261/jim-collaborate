import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Enquiry API Route is Active!",
  });
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

    const dataDir = path.join(process.cwd(), "data");
    const enquiryFile = path.join(dataDir, "enquiries.json");

    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    let enquiries = [];
    if (fs.existsSync(enquiryFile)) {
      try {
        enquiries = JSON.parse(fs.readFileSync(enquiryFile, "utf-8"));
      } catch (e) {
        enquiries = [];
      }
    }

    const newEnquiry = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
    };

    enquiries.push(newEnquiry);
    fs.writeFileSync(enquiryFile, JSON.stringify(enquiries, null, 2));

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully!",
      enquiry: newEnquiry,
    });
  } catch (error) {
    console.error("Enquiry API error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to submit enquiry" },
      { status: 500 }
    );
  }
}