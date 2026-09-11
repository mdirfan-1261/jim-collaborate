"use client";

import { useState } from "react";
import { ArrowRight, MessageSquareText, X } from "lucide-react";

export default function EnquiryWidget() {
  const [showEnquiry, setShowEnquiry] = useState(false);

  return (
    <div className="fixed right-5 bottom-5 z-50">

      {!showEnquiry && (
        <button
          onClick={() => setShowEnquiry(true)}
          className="flex items-center gap-2 bg-[#C88A3D] text-white px-4 py-3 rounded-full shadow-xl hover:bg-[#A96F2E] hover:scale-105 transition duration-300"
        >
          <MessageSquareText size={19} />
          <span className="text-sm font-semibold">
            Enquiry
          </span>
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

              <h3 className="font-semibold text-lg">
                Plan Your Trip
              </h3>
            </div>

            <button
              onClick={() => setShowEnquiry(false)}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
            >
              <X size={17} />
            </button>
          </div>

          <form className="p-5 space-y-3">

            <input
              type="text"
              placeholder="Your name"
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none focus:border-[#C88A3D]"
            />

            <input
              type="tel"
              placeholder="Phone number"
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none focus:border-[#C88A3D]"
            />

            <input
              type="date"
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none focus:border-[#C88A3D]"
            />

            <select
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none focus:border-[#C88A3D]"
            >
              <option>2 Guests</option>
              <option>3 Guests</option>
              <option>4 Guests</option>
              <option>5 Guests</option>
              <option>6+ Guests</option>
            </select>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-[#C88A3D] text-white py-3 rounded-lg font-semibold text-sm hover:bg-[#A96F2E] transition"
            >
              Send Enquiry
              <ArrowRight size={16} />
            </button>

          </form>
        </div>
      )}
    </div>
  );
}