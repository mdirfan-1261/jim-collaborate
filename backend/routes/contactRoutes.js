const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const DATA_DIR = path.join(__dirname, "../data");
const CONTACT_FILE = path.join(DATA_DIR, "contacts.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

router.post("/", (req, res) => {
  console.log("📩 CONTACT RECEIVED:", req.body);
  const { name, email, phone, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: "Name and email are required.",
    });
  }

  const newContact = {
    id: Date.now().toString(),
    name,
    email,
    phone: phone || "",
    message: message || "",
    createdAt: new Date().toISOString(),
  };

  let contacts = [];
  if (fs.existsSync(CONTACT_FILE)) {
    try {
      contacts = JSON.parse(fs.readFileSync(CONTACT_FILE, "utf-8"));
    } catch (e) {
      contacts = [];
    }
  }

  contacts.push(newContact);
  fs.writeFileSync(CONTACT_FILE, JSON.stringify(contacts, null, 2));

  console.log("✅ CONTACT SAVED SUCCESSFULLY");
  return res.status(200).json({
    success: true,
    message: "Message sent successfully!",
    contact: newContact,
  });
});

module.exports = router;