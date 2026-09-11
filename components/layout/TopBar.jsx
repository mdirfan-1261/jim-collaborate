export default function TopBar() {
    return (
        <div className="hidden md:block bg-[#172033] text-white text-sm py-2">
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

                <p>
                    🌿 Your Complete Jim Corbett Experience
                </p>

                <div className="flex gap-5">
                    <a
                        href="tel:+919876543210"
                        className="hover:text-gray-300 transition"
                    >
                        📞 +91 98765 43210
                    </a>

                    <a
                        href="mailto:hello@corbettdestination.in"
                        className="hover:text-gray-300 transition"
                    >
                        ✉️ hello@corbettdestination.in
                    </a>
                </div>
                <span className="italic">
                    Independent travel facilitator — not the official Forest Dept. portal
                </span>
            </div>
        </div>
    );
}