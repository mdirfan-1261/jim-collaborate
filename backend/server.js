require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const enquiryRoutes = require("./routes/enquiryRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

/* ================= CORS (ALLOW ALL) ================= */

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

/* ================= BODY PARSER ================= */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= MONGODB CONNECT ================= */

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://127.0.0.1:27017/jim_corbett";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("=================================");
    console.log("✅ MONGODB CONNECTED SUCCESSFULLY");
    console.log("=================================");
  })
  .catch((error) => {
    console.error("❌ MONGODB CONNECTION FAILED:", error.message);
  });

/* ================= ROUTES ================= */

app.use("/api/enquiries", enquiryRoutes);
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
  res.send("Jim Corbett Backend is running!");
});

/* ================= SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});