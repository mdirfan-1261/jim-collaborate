import "./globals.css";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EnquiryWidget from "@/components/EnquiryWidget";

export const metadata = {
  title: "Destination Corbett",
  description: "Your Complete Jim Corbett Experience",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TopBar />
        <Navbar />

        {children}
        <EnquiryWidget/>
        <Footer/>
      </body>
    </html>
  );
}