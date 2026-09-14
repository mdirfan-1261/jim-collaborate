"use client";

import { useState } from "react";
import { ArrowRight, MessageSquareText, X, Loader2, CheckCircle2 } from "lucide-react";

export default function EnquiryWidget() {
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    checkIn: "",
    guests: "2 Guests",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.phone || !formData.email) {
      setError("Please fill name, phone and email.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          checkIn: formData.checkIn,
          guests: parseInt(formData.guests) || 0,
          message: "Quick enquiry via widget",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send enquiry");
      }

      setSuccess(true);
      setFormData({ name: "", phone: "", email: "", checkIn: "", guests: "2 Guests" });

      // Auto close after showing success
      setTimeout(() => {
        setSuccess(false);
        setShowEnquiry(false);
      }, 2500);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed right-5 bottom-5 z-50">
      {!showEnquiry && (
        <button
          onClick={() => setShowEnquiry(true)}
          className="flex items-center gap-2 bg-[#C88A3D] text-white px-4 py-3 rounded-full shadow-xl hover:bg-[#A96F2E] hover:scale-105 transition duration-300"
        >
          <MessageSquareText size={19} />
          <span className="text-sm font-semibold">Enquiry</span>
        </button>
      )}

      {showEnquiry && (
        <div
          className="
            w-80
            bg-white/30
            backdrop-blur-2xl
            rounded-3xl
            shadow-2xl
            border border-white/50
            overflow-hidden
          "
        >
          <div className="flex items-center justify-between px-5 py-4 bg-green-900 text-white">
            <div>
              <p className="text-xs text-[#C88A3D] font-semibold uppercase tracking-wider">
                Quick Enquiry
              </p>
              <h3 className="font-semibold text-lg">Plan Your Trip</h3>
            </div>

            <button
              onClick={() => setShowEnquiry(false)}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
            >
              <X size={17} />
            </button>
          </div>

          {success ? (
            <div className="p-8 flex flex-col items-center gap-3 text-center">
              <CheckCircle2 className="text-green-700" size={40} />
              <p className="font-semibold text-gray-800">Enquiry Sent!</p>
              <p className="text-sm text-gray-600">We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-5 space-y-3">
              {error && (
                <div className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {error}
                </div>
              )}

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none focus:border-[#C88A3D]"
              />

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone number"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none focus:border-[#C88A3D]"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none focus:border-[#C88A3D]"
              />

              <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none focus:border-[#C88A3D]"
              />

              <select
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none focus:border-[#C88A3D]"
              >
                <option>2 Guests</option>
                <option>3 Guests</option>
                <option>4 Guests</option>
                <option>5 Guests</option>
                <option>6+ Guests</option>
              </select>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#C88A3D] text-white py-3 rounded-lg font-semibold text-sm hover:bg-[#A96F2E] transition disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    Send Enquiry
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}