const express = require("express");
const enquiryRoutes = require("./routes/enquiryRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

/* ================= CORS ================= */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= ROUTES ================= */
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
  res.send("Jim Corbett Express Backend is running!");
});

/* ================= SERVER ================= */
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`🚀 Express Backend running on http://localhost:${PORT}`);
  console.log(`=================================`);
});