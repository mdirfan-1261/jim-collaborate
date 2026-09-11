import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#172033] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
        
<div>
  <div className="flex items-center gap-4">
    <div className="w-8 h-8 shrink-0  overflow-hidden bg-white flex items-center justify-center">
      <img
        src="/logo/corbett-logo.jpeg"
        alt="Destination Corbett"
        className="w-full h-full object-cover"
      />
    </div>

    <h2 className="text-2xl font-bold whitespace-nowrap">
      Destination Corbett
    </h2>
  </div>

  <p className="mt-5 text-white/70 leading-7 max-w-sm">
    Your complete Jim Corbett experience partner for stays,
    safaris, MICE, events and destination weddings.
  </p>
</div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold text-lg mb-5">
              Explore
            </h3>

            <div className="space-y-3 text-white/70">
              <Link href="/" className="block hover:text-[#C88A3D]">
                Home
              </Link>

              <Link href="/stay" className="block hover:text-[#C88A3D]">
                Stay
              </Link>

              <Link href="/safari" className="block hover:text-[#C88A3D]">
                Safari
              </Link>

              <Link href="/packages" className="block hover:text-[#C88A3D]">
                Packages
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-5">
              Services
            </h3>

            <div className="space-y-3 text-white/70">
              <Link href="/mice" className="block hover:text-[#C88A3D]">
                MICE & Events
              </Link>

              <Link href="/weddings" className="block hover:text-[#C88A3D]">
                Destination Weddings
              </Link>

              <Link
                href="/event-production"
                className="block hover:text-[#C88A3D]"
              >
                Event Production
              </Link>

              <Link href="/transport" className="block hover:text-[#C88A3D]">
                Transportation
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-5">
              Contact
            </h3>

            <div className="space-y-3 text-white/70">
              <p>Destination Corbett, Uttarakhand</p>
              <p>+91 98765 43210</p>
              <p>hello@destinationcorbett.com</p>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 mt-12 pt-6 text-sm text-white/50 text-center">
          © {new Date().getFullYear()} Destination Corbett. All rights reserved.
        </div>

      </div>
    </footer>
  );
}