"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, MapPin, ChevronDown } from "lucide-react";

const safariOptions = [
    {
        id: 1,
        name: "Jeep Safari",
        location: "Jim Corbett National Park",
        image: "/safari/jeep-safari.jpg",
        description:
            "Explore the wilderness of Jim Corbett in an open gypsy with an experienced naturalist and driver.",
        price: "₹5,500",
        duration: "3–4 Hours",
        guests: "Up to 6 Guests",
    },
    {
        id: 2,
        name: "Canter Safari",
        location: "Jim Corbett National Park",
        image: "/safari/canter-safari.jpg",
        description:
            "Enjoy a shared safari experience through Corbett's forest zones with fellow wildlife enthusiasts.",
        price: "₹1,500",
        duration: "3–4 Hours",
        guests: "Up to 16 Guests",
    },
    {
        id: 3,
        name: "Elephant Safari",
        location: "Corbett Forest Area",
        image: "/safari/elephant-safari1.jpg",
        description:
            "Experience the forest from a unique perspective with a memorable elephant safari adventure.",
        price: "₹2,500",
        duration: "2–3 Hours",
        guests: "Limited Seats",
    },
];

export default function SafariPage() {
    const [expanded, setExpanded] = useState(null);

    const handleToggle = (id) => {
        setExpanded(expanded === id ? null : id);
    };

    return (
        <main className="bg-white">

            {/* ================= HERO ================= */}

            <section className="relative h-[560px] overflow-hidden">

                <Image
                    src="/safari/safari-hero.jpg"
                    alt="Safari in Jim Corbett"
                    fill
                    priority
                    quality={75}
                    sizes="100vw"
                    className="object-cover brightness-90"
                />

                <div className="absolute inset-0 bg-black/16" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">

                    <div className="max-w-2xl text-white">

                        <p className="text-sm font-semibold tracking-[3px] text-[#C88A3D] mb-5">
                            WILDLIFE & ADVENTURE
                        </p>

                        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                            Safari in Jim Corbett
                        </h1>

                        <p className="mt-6 text-lg text-white/85 leading-8 max-w-xl">
                            Discover the wild side of Jim Corbett with unforgettable
                            safari experiences through its forests, grasslands and
                            wildlife zones.
                        </p>

                        <Link
                            href="#safari-options"
                            className="inline-flex items-center gap-2 mt-8 bg-[#C88A3D] text-white px-7 py-3.5 rounded-full font-semibold hover:bg-[#A96F2E] transition"
                        >
                            Explore Safaris
                            <ArrowRight size={18} />
                        </Link>

                    </div>

                </div>

            </section>


            {/* ================= INTRO ================= */}

            <section className="py-20 bg-white">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="max-w-3xl">

                        <p className="text-sm font-semibold tracking-[3px] text-[#C88A3D] mb-4">
                            EXPERIENCE THE WILD
                        </p>

                        <h2 className="text-4xl md:text-5xl font-bold text-[#172033]">
                            Your Journey Into the Jungle
                        </h2>

                        <p className="mt-5 text-gray-600 leading-7">
                            From exciting jeep safaris to comfortable canter rides,
                            choose an experience that lets you discover the natural
                            beauty and wildlife of Jim Corbett.
                        </p>

                    </div>

                </div>

            </section>


            {/* ================= SAFARI OPTIONS ================= */}

            <section
                id="safari-options"
                className="py-24 bg-[#F7F5F0]"
            >

                <div className="max-w-7xl mx-auto px-6">

                    <div className="max-w-2xl mb-12">

                        <p className="text-sm font-semibold tracking-[3px] text-[#C88A3D] mb-4">
                            EXPLORE SAFARI EXPERIENCES
                        </p>

                        <h2 className="text-4xl md:text-5xl font-bold text-[#172033]">
                            Choose Your Safari
                        </h2>

                        <p className="mt-5 text-gray-600 leading-7">
                            Select the safari experience that suits your group,
                            schedule and adventure preferences.
                        </p>

                    </div>
                </div>
            </section>


                    {/* ================= CARDS ================= */}

                    {/* ================= CARDS ================= */}

<div className="grid grid-cols-1 md:grid-cols-3 gap-7">

    {safariOptions.map((safari) => (

        <div
            key={safari.id}
            onClick={() => handleToggle(safari.id)}
            className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer ${
                expanded === safari.id ? "shadow-xl" : ""
            }`}
        >

            {/* ================= IMAGE ================= */}

            <div className="h-[260px] overflow-hidden">

                <Image
                    src={safari.image}
                    alt={safari.name}
                    width={600}
                    height={400}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${
                        safari.id === 3
                            ? "object-contain bg-gray-100"
                            : "object-cover"
                    }`}
                />

            </div>


            {/* ================= CARD CONTENT ================= */}

            <div className="p-6">

                {/* NAME + ICON */}

                <div className="flex items-start justify-between gap-4">

                    <div className="flex-1">

                        {/* LOCATION */}

                        <div className="flex items-center gap-1.5 text-sm text-[#C88A3D] font-medium">

                            <MapPin size={16} />

                            <span>
                                {safari.location}
                            </span>

                        </div>


                        {/* NAME */}

                        <h3 className="mt-2 text-2xl font-bold text-[#172033]">
                            {safari.name}
                        </h3>

                    </div>


                    {/* CHEVRON */}

                    <div
                        className={`flex-shrink-0 w-10 h-10 rounded-full bg-[#F7F5F0] flex items-center justify-center text-[#172033] transition-transform duration-300 ${
                            expanded === safari.id
                                ? "rotate-180"
                                : ""
                        }`}
                    >
                        <ChevronDown size={20} />
                    </div>

                </div>


                {/* ================= SHORT DESCRIPTION ================= */}

                {expanded !== safari.id && (

                    <p className="mt-3 text-gray-600 leading-6 line-clamp-1">
                        {safari.description}
                    </p>

                )}


                {/* ================= CLOSED CARD PRICE ================= */}

                {expanded !== safari.id && (

                    <div className="mt-6 flex items-center justify-between gap-4">

                        {/* PRICE */}

                        <div>

                            <p className="text-xs text-gray-500">
                                Starting from
                            </p>

                            <p className="text-2xl font-bold text-[#172033]">
                                {safari.price}
                            </p>

                        </div>


                        {/* ENQUIRE */}

                        <Link
                            href={`/enquiry?safari=${encodeURIComponent(
                                safari.name
                            )}&image=${encodeURIComponent(
                                safari.image
                            )}`}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-2 bg-[#C88A3D] text-white px-5 py-3 rounded-full font-semibold hover:bg-[#A96F2E] transition whitespace-nowrap"
                        >
                            Enquire
                            <ArrowRight size={17} />
                        </Link>

                    </div>

                )}


                {/* ================= EXPANDED CONTENT ================= */}

                <div
                    className={`grid transition-all duration-500 ease-in-out ${
                        expanded === safari.id
                            ? "grid-rows-[1fr] opacity-100 mt-5"
                            : "grid-rows-[0fr] opacity-0"
                    }`}
                >

                    <div className="overflow-hidden">

                        {/* FULL DESCRIPTION */}

                        <p className="text-gray-600 leading-6">
                            {safari.description}
                        </p>


                        {/* DETAILS */}

                        <div className="mt-5 pt-5 border-t border-gray-100 space-y-3">

                            {/* DURATION */}

                            <div className="flex justify-between text-sm">

                                <span className="text-gray-500">
                                    Duration
                                </span>

                                <span className="font-medium text-[#172033]">
                                    {safari.duration}
                                </span>

                            </div>


                            {/* CAPACITY */}

                            <div className="flex justify-between text-sm">

                                <span className="text-gray-500">
                                    Capacity
                                </span>

                                <span className="font-medium text-[#172033]">
                                    {safari.guests}
                                </span>

                            </div>

                        </div>


                        {/* PRICE + ENQUIRE */}

                        <div className="mt-6 flex items-end justify-between gap-4">

                            {/* PRICE */}

                            <div>

                                <p className="text-xs text-gray-500">
                                    Starting from
                                </p>

                                <p className="text-2xl font-bold text-[#172033]">
                                    {safari.price}
                                </p>

                                <p className="text-xs text-green-600 font-medium mt-1">
                                    + taxes
                                </p>

                            </div>


                            {/* ENQUIRE */}

                            <Link
                                href={`/enquiry?safari=${encodeURIComponent(
                                    safari.name
                                )}&image=${encodeURIComponent(
                                    safari.image
                                )}`}
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-2 bg-[#C88A3D] text-white px-5 py-3 rounded-full font-semibold hover:bg-[#A96F2E] transition whitespace-nowrap"
                            >
                                Enquire
                                <ArrowRight size={17} />
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    ))}

</div>

            {/* ================= BOTTOM CTA ================= */}

            <section className="py-20 bg-[#172033]">

                <div className="max-w-4xl mx-auto px-6 text-center text-white">

                    <p className="text-sm font-semibold tracking-[3px] text-[#C88A3D]">
                        PLAN YOUR ADVENTURE
                    </p>

                    <h2 className="mt-4 text-4xl md:text-5xl font-bold">
                        Ready to Explore Corbett?
                    </h2>

                    <p className="mt-5 text-white/70 leading-7">
                        Tell us your travel plans and let us help you create
                        an unforgettable Corbett safari experience.
                    </p>


                    {/* CTA BUTTON */}

                    <Link
                        href="/enquiry?safari=Safari%20Experience"
                        className="inline-flex items-center gap-2 mt-8 bg-[#C88A3D] text-white px-7 py-3.5 rounded-full font-semibold hover:bg-[#A96F2E] transition"
                    >
                        Plan Your Safari
                        <ArrowRight size={18} />
                    </Link>

                </div>

            </section>

        </main>
    );
}