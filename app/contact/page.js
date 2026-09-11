"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus("Sending...");

    try {
      const response = await fetch(
        "http://localhost:5000/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
          }),
        }
      );

      const responseText = await response.text();

      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(
          `Server returned ${response.status}: ${responseText}`
        );
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to send message"
        );
      }

      setStatus("Message sent successfully!");

      setTimeout(() => {
        setStatus("");
      }, 3000);

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);

      setStatus(
        "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F5F0]">

      {/* Hero */}

      <section className="relative min-h-[300px] sm:min-h-[340px] overflow-hidden">

        <div className="absolute inset-0 bg-[#172033]" />

        <div className="relative z-10 min-h-[300px] sm:min-h-[340px] flex items-center justify-center text-center text-white px-5">

          <div className="max-w-2xl">

            <p className="text-xs sm:text-sm font-semibold tracking-[3px] text-[#C88A3D] mb-3">
              GET IN TOUCH
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Contact Us
            </h1>

            <p className="mt-4 text-sm sm:text-base text-white/70 leading-6">
              Have a question about stays, safaris or experiences?
              We are here to help.
            </p>

          </div>

        </div>

      </section>


      {/* Contact Section */}

      <section className="py-12 sm:py-16 md:py-20">

        <div className="max-w-6xl mx-auto px-5 sm:px-6">

          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-12 items-start">

            {/* Contact Info */}

            <div className="pt-2">

              <p className="text-xs sm:text-sm font-semibold tracking-[3px] text-[#C88A3D] mb-3">
                JIM COLLABORATE
              </p>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#172033] leading-tight">
                Let&apos;s plan your Corbett experience
              </h2>

              <p className="mt-4 text-sm sm:text-base text-gray-600 leading-7">
                Get in touch with our team for help with hotels,
                safaris, transport, events and other Jim Corbett
                experiences.
              </p>


              <div className="mt-7 space-y-4">

                {/* Phone */}

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 shrink-0 rounded-xl bg-white/70 backdrop-blur-md border border-white/70 flex items-center justify-center">
                    <Phone
                      size={18}
                      className="text-[#C88A3D]"
                    />
                  </div>

                  <div>

                    <p className="text-xs text-gray-500">
                      Call us
                    </p>

                    <p className="text-sm sm:text-base font-semibold text-[#172033]">
                      +91 9205299338
                    </p>

                  </div>

                </div>


                {/* Email */}

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 shrink-0 rounded-xl bg-white/70 backdrop-blur-md border border-white/70 flex items-center justify-center">
                    <Mail
                      size={18}
                      className="text-[#C88A3D]"
                    />
                  </div>

                  <div>

                    <p className="text-xs text-gray-500">
                      Email us
                    </p>

                    <p className="text-sm sm:text-base font-semibold text-[#172033] break-all">
                      marketing@texora.ai
                    </p>

                  </div>

                </div>


                {/* Location */}

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 shrink-0 rounded-xl bg-white/70 backdrop-blur-md border border-white/70 flex items-center justify-center">
                    <MapPin
                      size={18}
                      className="text-[#C88A3D]"
                    />
                  </div>

                  <div>

                    <p className="text-xs text-gray-500">
                      Location
                    </p>

                    <p className="text-sm sm:text-base font-semibold text-[#172033]">
                      Jim Corbett, Uttarakhand
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* Liquid Glass Form */}

            <div className="w-full rounded-3xl bg-white/45 backdrop-blur-2xl border border-white/70 shadow-2xl p-5 sm:p-7 md:p-8">

              <h3 className="text-xl sm:text-2xl font-bold text-[#172033]">
                Send us a message
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Fill in the details and our team will get back to you.
              </p>


              <form
                onSubmit={handleSubmit}
                className="mt-6 space-y-4"
              >

                {/* Name */}

                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl bg-white/55 backdrop-blur-md border border-white/80 px-4 py-3 text-sm text-[#172033] placeholder:text-gray-500 outline-none focus:bg-white/70 focus:border-[#C88A3D] transition"
                />


                {/* Email */}

                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl bg-white/55 backdrop-blur-md border border-white/80 px-4 py-3 text-sm text-[#172033] placeholder:text-gray-500 outline-none focus:bg-white/70 focus:border-[#C88A3D] transition"
                />


                {/* Phone */}

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-white/55 backdrop-blur-md border border-white/80 px-4 py-3 text-sm text-[#172033] placeholder:text-gray-500 outline-none focus:bg-white/70 focus:border-[#C88A3D] transition"
                />


                {/* Message */}

                <textarea
                  name="message"
                  placeholder="Your message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full rounded-xl bg-white/55 backdrop-blur-md border border-white/80 px-4 py-3 text-sm text-[#172033] placeholder:text-gray-500 outline-none resize-none focus:bg-white/70 focus:border-[#C88A3D] transition"
                />


                {/* Status */}

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
                        status.includes("successfully")
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : status === "Sending..."
                            ? "bg-gray-50 text-[#172033] border border-gray-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                      }
                    `}
                  >
                    {status}
                  </div>
                )}


                {/* Submit Button */}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-[#C88A3D] text-white text-sm sm:text-base font-semibold rounded-xl py-3 hover:bg-[#A96F2E] disabled:opacity-60 disabled:cursor-not-allowed transition"
                >
                  {isSubmitting
                    ? "Sending..."
                    : "Send Message"}

                  {!isSubmitting && (
                    <Send size={17} />
                  )}
                </button>

              </form>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}