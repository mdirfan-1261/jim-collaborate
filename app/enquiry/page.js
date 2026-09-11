"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Hotel,
  MapPin,
  Send,
  Users,
  Clock3,
  Trees,
} from "lucide-react";

export default function EnquiryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F7F5F0]" />
      }
    >
      <EnquiryContent />
    </Suspense>
  );
}

function EnquiryContent() {
  const searchParams = useSearchParams();

  // ================= DETAILS =================

  const safariName = searchParams.get("safari");

  const safariImage =
    searchParams.get("image") || "/safari/safari-hero.jpg";

  const hotelName =
    searchParams.get("hotel") || "Jim Corbett Hotel";

  const hotelImage =
    searchParams.get("hotelImage") || "/stay/stay-hero.jpg";

  const hotelLocation =
    searchParams.get("location") ||
    "Jim Corbett, Uttarakhand";

  const isSafari = Boolean(safariName);

  // ================= INITIAL FORM DATA =================

  const initialFormData = {
    name: "",
    company: "",
    phone: "",
    email: "",
    checkIn: "",
    checkOut: "",
    guests: "",
    rooms: "",
    safariDate: "",
    preferredTime: "Morning",
    zone: "",
    message: "",
  };

  // ================= FORM STATE =================

  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // ================= INPUT HANDLER =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (status) {
      setStatus("");
      setIsSuccess(false);
    }
  };

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus("Submitting your enquiry...");
    setIsSuccess(false);

    try {
      // Direct backend API endpoint
      const primaryApiUrl = "http://localhost:5000/api/enquiries";

      // Clean Payload to prevent backend schema validation crashes
      const enquiryData = {
        name: formData.name.trim(),
        company: formData.company.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        type: isSafari ? "Safari" : "Hotel",
        selectedService: isSafari
          ? safariName || "Safari"
          : hotelName || "Hotel",
        checkIn: formData.checkIn ? formData.checkIn : null,
        checkOut: formData.checkOut ? formData.checkOut : null,
        guests: formData.guests ? Number(formData.guests) : null,
        rooms: formData.rooms ? Number(formData.rooms) : null,
        safariDate: formData.safariDate ? formData.safariDate : null,
        preferredTime: formData.preferredTime || "Morning",
        zone: formData.zone ? formData.zone : null,
        message: formData.message.trim(),
      };

      console.log("📤 Sending enquiry:", enquiryData);

      const response = await fetch(primaryApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enquiryData),
      });

      // ================= READ RESPONSE =================

      let data = {};

      const contentType =
        response.headers.get("content-type") || "";

      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = {
          message: text,
        };
      }

      console.log("📥 Backend response:", {
        status: response.status,
        data,
      });

      // ================= API ERROR =================

      if (!response.ok) {
        const serverErrorMessage =
          data?.message ||
          data?.error ||
          data?.errorDetails ||
          (typeof data === "string" ? data : null) ||
          `Server error: ${response.status}`;

        throw new Error(serverErrorMessage);
      }

      // ================= SUCCESS =================

      setIsSuccess(true);

      setStatus(
        data?.message ||
          "Enquiry submitted successfully!"
      );

      setFormData({
        ...initialFormData,
      });
    } catch (error) {
      console.error(
        "❌ Enquiry submission error:",
        error
      );

      setIsSuccess(false);

      setStatus(
        error?.message ||
          "Unable to submit enquiry. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F5F0]">

      {/* ================= HERO ================= */}

      <section className="relative h-[260px] sm:h-[300px] md:h-[330px] lg:h-[360px] overflow-hidden">

        <Image
          src={isSafari ? safariImage : hotelImage}
          alt={
            isSafari
              ? safariName || "Safari Enquiry"
              : "Jim Corbett Hotel Enquiry"
          }
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-110"
        />

        <div className="absolute inset-0 bg-black/16" />

        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 h-full flex items-center">

          <div className="max-w-2xl text-white">

            <p className="text-xs md:text-sm font-semibold tracking-[3px] text-[#C88A3D] mb-3">
              {isSafari
                ? "SAFARI ENQUIRY"
                : "HOTEL ENQUIRY"}
            </p>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {isSafari ? (
                <>
                  Plan Your
                  <span className="block">
                    Corbett Safari
                  </span>
                </>
              ) : (
                <>
                  Plan Your Stay in
                  <span className="block">
                    Jim Corbett
                  </span>
                </>
              )}
            </h1>

            <p className="mt-4 text-sm md:text-base text-white/80 leading-6 max-w-xl">
              {isSafari
                ? "Share your safari requirements with our team and let us help you plan the right wildlife experience."
                : "Share your accommodation requirements with our team and let us arrange the right stay for your group."}
            </p>

          </div>

        </div>
      </section>

      {/* ================= MAIN ================= */}

      <section className="py-8 sm:py-10 md:py-12 lg:py-16">

        <div className="max-w-6xl mx-auto px-5 sm:px-6">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">

            {/* ================= LEFT INFO ================= */}

            <div className="md:col-span-1 lg:col-span-2 lg:sticky lg:top-6 lg:self-start">

              <div className="bg-[#172033] rounded-2xl overflow-hidden shadow-lg">

                {/* IMAGE */}

                <div className="relative h-[200px] sm:h-[220px] md:h-[240px]">

                  <Image
                    src={
                      isSafari
                        ? safariImage
                        : hotelImage
                    }
                    alt={
                      isSafari
                        ? safariName || "Selected Safari"
                        : hotelName
                    }
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                  <div className="absolute bottom-5 left-5 right-5">

                    <p className="text-[10px] sm:text-xs tracking-[2px] text-[#C88A3D] font-semibold">
                      {isSafari
                        ? "SELECTED SAFARI"
                        : "SELECTED PROPERTY"}
                    </p>

                    <h2 className="mt-1.5 text-lg sm:text-xl md:text-2xl font-bold text-white leading-snug break-words">
                      {isSafari
                        ? safariName
                        : hotelName}
                    </h2>

                  </div>
                </div>

                {/* INFO */}

                <div className="p-5 sm:p-6 text-white">

                  <div className="flex items-start gap-3 text-white/70 text-sm">

                    <MapPin
                      size={18}
                      className="text-[#C88A3D] shrink-0 mt-0.5"
                    />

                    <span className="break-words">
                      {isSafari
                        ? "Jim Corbett National Park, Uttarakhand"
                        : hotelLocation}
                    </span>

                  </div>

                  <p className="mt-4 text-sm text-white/60 leading-6">
                    {isSafari
                      ? "Tell us your safari date, preferred time, group size and safari preferences. Our local team will coordinate the experience."
                      : "Tell us your dates, group size and accommodation requirements. Our local team will coordinate a suitable stay option for you."}
                  </p>

                  {/* INFO BOXES */}

                  <div className="grid grid-cols-2 gap-3 mt-5">

                    <div className="border border-white/10 rounded-xl p-3.5">

                      {isSafari ? (
                        <Trees
                          size={18}
                          className="text-[#C88A3D]"
                        />
                      ) : (
                        <Hotel
                          size={18}
                          className="text-[#C88A3D]"
                        />
                      )}

                      <p className="mt-2 text-xs text-white/50">
                        {isSafari
                          ? "Experience"
                          : "Accommodation"}
                      </p>

                      <p className="text-sm font-semibold mt-1">
                        {isSafari
                          ? "Wildlife Safari"
                          : "Comfortable Stays"}
                      </p>

                    </div>

                    <div className="border border-white/10 rounded-xl p-3.5">

                      <Users
                        size={18}
                        className="text-[#C88A3D]"
                      />

                      <p className="mt-2 text-xs text-white/50">
                        Groups
                      </p>

                      <p className="text-sm font-semibold mt-1">
                        Group Friendly
                      </p>

                    </div>

                  </div>
                </div>
              </div>

              {/* BACK BUTTON */}

              <Link
                href={
                  isSafari
                    ? "/safari"
                    : "/stay/budget"
                }
                className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-[#172033] hover:text-[#C88A3D] transition"
              >
                <ArrowLeft size={17} />

                {isSafari
                  ? "Back to Safari"
                  : "Back to Stays"}
              </Link>

            </div>

            {/* ================= RIGHT FORM ================= */}

            <div className="md:col-span-1 lg:col-span-3">

              <div
                className="
                  bg-white/45
                  backdrop-blur-2xl
                  border border-white/60
                  rounded-3xl
                  shadow-2xl
                  p-5 sm:p-6 md:p-7
                "
              >

                {/* FORM HEADER */}

                <div className="mb-6">

                  <p className="text-xs md:text-sm font-semibold tracking-[2px] text-[#C88A3D]">
                    SEND YOUR REQUIREMENT
                  </p>

                  <h2 className="mt-2 text-xl sm:text-2xl md:text-3xl font-bold text-[#172033]">
                    {isSafari
                      ? "Safari Enquiry"
                      : "Hotel Enquiry"}
                  </h2>

                  <p className="mt-2 text-sm text-gray-600 leading-6">
                    {isSafari
                      ? "Fill in your details and our team will help you plan your safari."
                      : "Fill in your details and our team will get back to you shortly."}
                  </p>

                </div>

                {/* ================= FORM ================= */}

                <form
                  className="space-y-4"
                  onSubmit={handleSubmit}
                >

                  {/* SELECTED SERVICE */}

                  <div>

                    <label className="block text-sm font-semibold text-[#172033] mb-1.5">
                      {isSafari
                        ? "Selected Safari"
                        : "Selected Hotel"}
                    </label>

                    <div
                      className="
                        flex items-center gap-3
                        bg-white/40
                        backdrop-blur-xl
                        border border-white/60
                        rounded-xl
                        px-3.5 py-2.5
                      "
                    >

                      {isSafari ? (
                        <Trees
                          size={17}
                          className="text-[#C88A3D] shrink-0"
                        />
                      ) : (
                        <Hotel
                          size={17}
                          className="text-[#C88A3D] shrink-0"
                        />
                      )}

                      <input
                        type="text"
                        value={
                          isSafari
                            ? safariName || ""
                            : hotelName
                        }
                        readOnly
                        className="w-full bg-transparent outline-none text-sm text-[#172033] font-medium"
                      />

                    </div>
                  </div>

                  {/* NAME + COMPANY */}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <div>

                      <label className="block text-sm font-semibold text-[#172033] mb-1.5">
                        Your Name
                      </label>

                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        className="
                          w-full
                          bg-white/40
                          backdrop-blur-xl
                          border border-white/60
                          rounded-xl
                          px-3.5 py-2.5
                          text-sm
                          outline-none
                          focus:bg-white/60
                          focus:border-[#C88A3D]
                          focus:ring-1
                          focus:ring-[#C88A3D]/30
                          transition
                        "
                      />

                    </div>

                    <div>

                      <label className="block text-sm font-semibold text-[#172033] mb-1.5">
                        Company / Agency
                      </label>

                      <input
                        type="text"
                        name="company"
                        placeholder="Company or agency"
                        value={formData.company}
                        onChange={handleChange}
                        className="
                          w-full
                          bg-white/40
                          backdrop-blur-xl
                          border border-white/60
                          rounded-xl
                          px-3.5 py-2.5
                          text-sm
                          outline-none
                          focus:bg-white/60
                          focus:border-[#C88A3D]
                          focus:ring-1
                          focus:ring-[#C88A3D]/30
                          transition
                        "
                      />

                    </div>

                  </div>

                  {/* MOBILE + EMAIL */}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <div>

                      <label className="block text-sm font-semibold text-[#172033] mb-1.5">
                        Mobile Number
                      </label>

                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="Enter mobile number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="
                          w-full
                          bg-white/40
                          backdrop-blur-xl
                          border border-white/60
                          rounded-xl
                          px-3.5 py-2.5
                          text-sm
                          outline-none
                          focus:bg-white/60
                          focus:border-[#C88A3D]
                          focus:ring-1
                          focus:ring-[#C88A3D]/30
                          transition
                        "
                      />

                    </div>

                    <div>

                      <label className="block text-sm font-semibold text-[#172033] mb-1.5">
                        Email Address
                      </label>

                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={handleChange}
                        className="
                          w-full
                          bg-white/40
                          backdrop-blur-xl
                          border border-white/60
                          rounded-xl
                          px-3.5 py-2.5
                          text-sm
                          outline-none
                          focus:bg-white/60
                          focus:border-[#C88A3D]
                          focus:ring-1
                          focus:ring-[#C88A3D]/30
                          transition
                        "
                      />

                    </div>

                  </div>

                  {/* ================= HOTEL FORM ================= */}

                  {!isSafari && (
                    <>

                      {/* CHECK-IN + CHECK-OUT */}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div>

                          <label className="block text-sm font-semibold text-[#172033] mb-1.5">
                            Check-in Date
                          </label>

                          <div className="relative">

                            <CalendarDays
                              size={17}
                              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C88A3D] z-10"
                            />

                            <input
                              type="date"
                              name="checkIn"
                              value={formData.checkIn}
                              onChange={handleChange}
                              className="
                                w-full
                                bg-white/40
                                backdrop-blur-xl
                                border border-white/60
                                rounded-xl
                                pl-10 pr-3.5 py-2.5
                                text-sm
                                outline-none
                                focus:bg-white/60
                                focus:border-[#C88A3D]
                                focus:ring-1
                                focus:ring-[#C88A3D]/30
                                transition
                              "
                            />

                          </div>

                        </div>

                        <div>

                          <label className="block text-sm font-semibold text-[#172033] mb-1.5">
                            Check-out Date
                          </label>

                          <div className="relative">

                            <CalendarDays
                              size={17}
                              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C88A3D] z-10"
                            />

                            <input
                              type="date"
                              name="checkOut"
                              value={formData.checkOut}
                              onChange={handleChange}
                              className="
                                w-full
                                bg-white/40
                                backdrop-blur-xl
                                border border-white/60
                                rounded-xl
                                pl-10 pr-3.5 py-2.5
                                text-sm
                                outline-none
                                focus:bg-white/60
                                focus:border-[#C88A3D]
                                focus:ring-1
                                focus:ring-[#C88A3D]/30
                                transition
                              "
                            />

                          </div>

                        </div>

                      </div>

                      {/* GUESTS + ROOMS */}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div>

                          <label className="block text-sm font-semibold text-[#172033] mb-1.5">
                            Number of Guests
                          </label>

                          <div className="relative">

                            <Users
                              size={17}
                              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C88A3D] z-10"
                            />

                            <input
                              type="number"
                              name="guests"
                              min="1"
                              placeholder="e.g. 20"
                              value={formData.guests}
                              onChange={handleChange}
                              className="
                                w-full
                                bg-white/40
                                backdrop-blur-xl
                                border border-white/60
                                rounded-xl
                                pl-10 pr-3.5 py-2.5
                                text-sm
                                outline-none
                                focus:bg-white/60
                                focus:border-[#C88A3D]
                                focus:ring-1
                                focus:ring-[#C88A3D]/30
                                transition
                              "
                            />

                          </div>

                        </div>

                        <div>

                          <label className="block text-sm font-semibold text-[#172033] mb-1.5">
                            Rooms Required
                          </label>

                          <div className="relative">

                            <Hotel
                              size={17}
                              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C88A3D] z-10"
                            />

                            <input
                              type="number"
                              name="rooms"
                              min="1"
                              placeholder="e.g. 10"
                              value={formData.rooms}
                              onChange={handleChange}
                              className="
                                w-full
                                bg-white/40
                                backdrop-blur-xl
                                border border-white/60
                                rounded-xl
                                pl-10 pr-3.5 py-2.5
                                text-sm
                                outline-none
                                focus:bg-white/60
                                focus:border-[#C88A3D]
                                focus:ring-1
                                focus:ring-[#C88A3D]/30
                                transition
                              "
                            />

                          </div>

                        </div>

                      </div>

                    </>
                  )}

                  {/* ================= SAFARI FORM ================= */}

                  {isSafari && (
                    <>

                      {/* DATE + TIME */}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div>

                          <label className="block text-sm font-semibold text-[#172033] mb-1.5">
                            Safari Date
                          </label>

                          <div className="relative">

                            <CalendarDays
                              size={17}
                              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C88A3D] z-10"
                            />

                            <input
                              type="date"
                              name="safariDate"
                              value={formData.safariDate}
                              onChange={handleChange}
                              className="
                                w-full
                                bg-white/40
                                backdrop-blur-xl
                                border border-white/60
                                rounded-xl
                                pl-10 pr-3.5 py-2.5
                                text-sm
                                outline-none
                                focus:bg-white/60
                                focus:border-[#C88A3D]
                                focus:ring-1
                                focus:ring-[#C88A3D]/30
                                transition
                              "
                            />

                          </div>

                        </div>

                        <div>

                          <label className="block text-sm font-semibold text-[#172033] mb-1.5">
                            Preferred Time
                          </label>

                          <div className="relative">

                            <Clock3
                              size={17}
                              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C88A3D] z-10"
                            />

                            <select
                              name="preferredTime"
                              value={formData.preferredTime}
                              onChange={handleChange}
                              className="
                                w-full
                                bg-white/40
                                backdrop-blur-xl
                                border border-white/60
                                rounded-xl
                                pl-10 pr-3.5 py-2.5
                                text-sm
                                outline-none
                                focus:bg-white/60
                                focus:border-[#C88A3D]
                                focus:ring-1
                                focus:ring-[#C88A3D]/30
                                transition
                              "
                            >
                              <option value="Morning">
                                Morning
                              </option>

                              <option value="Afternoon">
                                Afternoon
                              </option>

                              <option value="Evening">
                                Evening
                              </option>
                            </select>

                          </div>

                        </div>

                      </div>

                      {/* GUESTS + ZONE */}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div>

                          <label className="block text-sm font-semibold text-[#172033] mb-1.5">
                            Number of Guests
                          </label>

                          <div className="relative">

                            <Users
                              size={17}
                              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C88A3D] z-10"
                            />

                            <input
                              type="number"
                              name="guests"
                              min="1"
                              placeholder="e.g. 4"
                              value={formData.guests}
                              onChange={handleChange}
                              className="
                                w-full
                                bg-white/40
                                backdrop-blur-xl
                                border border-white/60
                                rounded-xl
                                pl-10 pr-3.5 py-2.5
                                text-sm
                                outline-none
                                focus:bg-white/60
                                focus:border-[#C88A3D]
                                focus:ring-1
                                focus:ring-[#C88A3D]/30
                                transition
                              "
                            />

                          </div>

                        </div>

                        <div>

                          <label className="block text-sm font-semibold text-[#172033] mb-1.5">
                            Preferred Zone
                          </label>

                          <div className="relative">

                            <MapPin
                              size={17}
                              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C88A3D] z-10"
                            />

                            <select
                              name="zone"
                              value={formData.zone}
                              onChange={handleChange}
                              className="
                                w-full
                                bg-white/40
                                backdrop-blur-xl
                                border border-white/60
                                rounded-xl
                                pl-10 pr-3.5 py-2.5
                                text-sm
                                outline-none
                                focus:bg-white/60
                                focus:border-[#C88A3D]
                                focus:ring-1
                                focus:ring-[#C88A3D]/30
                                transition
                              "
                            >
                              <option value="">
                                Select Zone
                              </option>

                              <option value="Dhikala">
                                Dhikala
                              </option>

                              <option value="Bijrani">
                                Bijrani
                              </option>

                              <option value="Jhirna">
                                Jhirna
                              </option>

                              <option value="Dhela">
                                Dhela
                              </option>

                              <option value="Sitabani">
                                Sitabani
                              </option>
                            </select>

                          </div>

                        </div>

                      </div>

                    </>
                  )}

                  {/* ================= MESSAGE ================= */}

                  <div>

                    <label className="block text-sm font-semibold text-[#172033] mb-1.5">
                      {isSafari
                        ? "Safari Requirement / Message"
                        : "Requirement / Message"}
                    </label>

                    <textarea
                      name="message"
                      rows="4"
                      required
                      placeholder={
                        isSafari
                          ? "Tell us about your safari requirements, preferred zone, vehicle preference, group details..."
                          : "Tell us about your requirements, meal plan, group details, special requests..."
                      }
                      value={formData.message}
                      onChange={handleChange}
                      className="
                        w-full
                        bg-white/40
                        backdrop-blur-xl
                        border border-white/60
                        rounded-xl
                        px-3.5 py-2.5
                        text-sm
                        outline-none
                        focus:bg-white/60
                        focus:border-[#C88A3D]
                        focus:ring-1
                        focus:ring-[#C88A3D]/30
                        transition
                        resize-none
                      "
                    />

                  </div>

                  {/* ================= STATUS ================= */}

                  {status && (
                    <div
                      className={`
                        text-sm
                        text-center
                        font-semibold
                        rounded-xl
                        px-4
                        py-3
                        ${
                          isSuccess
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                        }
                      `}
                    >
                      {status}
                    </div>
                  )}

                  {/* ================= SUBMIT ================= */}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="
                      w-full
                      flex items-center justify-center gap-2
                      bg-[#C88A3D]
                      text-white
                      rounded-xl
                      px-5 py-3
                      font-semibold
                      text-sm
                      shadow-lg
                      hover:bg-[#A96F2E]
                      hover:scale-[1.01]
                      disabled:opacity-60
                      disabled:cursor-not-allowed
                      disabled:hover:scale-100
                      transition-all
                      duration-300
                    "
                  >
                    {isSubmitting
                      ? "Submitting..."
                      : isSafari
                      ? "Submit Safari Enquiry"
                      : "Submit Enquiry"}

                    {!isSubmitting && (
                      <Send size={17} />
                    )}
                  </button>

                  <p className="text-[11px] text-gray-500 text-center">
                    Our team will review your requirement
                    and contact you shortly.
                  </p>

                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}