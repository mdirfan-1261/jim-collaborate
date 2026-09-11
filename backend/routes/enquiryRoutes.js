const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const DATA_DIR = path.join(__dirname, "../data");
const ENQUIRY_FILE = path.join(DATA_DIR, "enquiries.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

router.post("/", (req, res) => {
  console.log("📩 ENQUIRY RECEIVED:", req.body);
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({
      success: false,
      message: "Name, email and phone are required.",
    });
  }

  const newEnquiry = {
    id: Date.now().toString(),
    name,
    company: req.body.company || "",
    email,
    phone,
    type: req.body.type || "Hotel",
    selectedService: req.body.selectedService || "",
    checkIn: req.body.checkIn || null,
    checkOut: req.body.checkOut || null,
    guests: req.body.guests || null,
    rooms: req.body.rooms || null,
    safariDate: req.body.safariDate || null,
    preferredTime: req.body.preferredTime || "Morning",
    zone: req.body.zone || "",
    message: req.body.message || "",
    createdAt: new Date().toISOString(),
  };

  let enquiries = [];
  if (fs.existsSync(ENQUIRY_FILE)) {
    try {
      enquiries = JSON.parse(fs.readFileSync(ENQUIRY_FILE, "utf-8"));
    } catch (e) {
      enquiries = [];
    }
  }

  enquiries.push(newEnquiry);
  fs.writeFileSync(ENQUIRY_FILE, JSON.stringify(enquiries, null, 2));

  console.log("✅ ENQUIRY SAVED SUCCESSFULLY");
  return res.status(201).json({
    success: true,
    message: "Enquiry submitted successfully!",
    enquiry: newEnquiry,
  });
});

module.exports = router;