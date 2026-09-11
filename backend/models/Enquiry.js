const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      trim: true,
      default: "",
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      trim: true,
      default: "Hotel",
    },

    selectedService: {
      type: String,
      trim: true,
      default: "",
    },

    checkIn: {
      type: String,
      trim: true,
      default: "",
    },

    checkOut: {
      type: String,
      trim: true,
      default: "",
    },

    guests: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    rooms: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    safariDate: {
      type: String,
      trim: true,
      default: "",
    },

    preferredTime: {
      type: String,
      trim: true,
      default: "Morning",
    },

    zone: {
      type: String,
      trim: true,
      default: "",
    },

    message: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
    strict: false, // Ensures no extra/missing field ever crashes Mongoose
  }
);

module.exports = mongoose.model("Enquiry", enquirySchema);