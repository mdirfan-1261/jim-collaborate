import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    hotel: {
      type: String,
      trim: true,
      default: "",
    },

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

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
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
      type: Number,
      default: 0,
    },

    rooms: {
      type: Number,
      default: 0,
    },

    message: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Enquiry =
  mongoose.models.Enquiry || mongoose.model("Enquiry", enquirySchema);

export default Enquiry;