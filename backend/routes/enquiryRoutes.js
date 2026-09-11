const express = require("express");
const mongoose = require("mongoose");
const Enquiry = require("../models/Enquiry");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("=================================");
    console.log("📩 ENQUIRY RECEIVED");
    console.log("=================================");
    console.log(req.body);

    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, email and phone are required.",
      });
    }

    const doc = {
      name: String(req.body.name || "").trim(),
      company: String(req.body.company || "").trim(),
      email: String(req.body.email || "").trim().toLowerCase(),
      phone: String(req.body.phone || "").trim(),
      type: String(req.body.type || "Hotel"),
      selectedService: String(req.body.selectedService || ""),
      checkIn: req.body.checkIn || null,
      checkOut: req.body.checkOut || null,
      guests: req.body.guests || null,
      rooms: req.body.rooms || null,
      safariDate: req.body.safariDate || null,
      preferredTime: req.body.preferredTime || "",
      zone: req.body.zone || "",
      message: String(req.body.message || "").trim(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    let savedResult;
    try {
      const enquiry = new Enquiry(doc);
      savedResult = await enquiry.save();
    } catch (saveErr) {
      console.warn("⚠️ Mongoose schema save failed, direct inserting to MongoDB...", saveErr.message);
      savedResult = await mongoose.connection.db.collection("enquiries").insertOne(doc);
    }

    console.log("=================================");
    console.log("✅ ENQUIRY SAVED SUCCESSFULLY TO DATABASE");
    console.log("=================================");

    return res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully!",
      enquiry: savedResult,
    });
  } catch (error) {
    console.error("=================================");
    console.error("❌ CRITICAL ERROR:", error);
    console.error("=================================");

    return res.status(500).json({
      success: false,
      message: `Error: ${error.message || "Failed to submit enquiry"}`,
    });
  }
});

module.exports = router;