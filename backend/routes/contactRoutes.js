const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

/* ================= TEST ROUTE ================= */

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Contact route is working",
  });
});

/* ================= POST CONTACT ================= */

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const contact = new Contact({
      name,
      email,
      phone,
      message,
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      contact,
    });
  } catch (error) {
    console.error("Contact error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
});

module.exports = router;