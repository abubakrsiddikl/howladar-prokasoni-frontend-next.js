import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Code, // 💡 পোর্টফোলিওর জন্য নতুন আইকন
} from "lucide-react";
import Link from "next/link"; // ধরে নিলাম আপনি Next.js ব্যবহার করছেন

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // 🚨 আপনার পোর্টফোলিও লিঙ্কটি এখানে দিন
  const portfolioLink = "https://abubakrsiddik-portfolio.vercel.app/";
  const portfolioName = "Abu Bakr Siddik";

  // quick navigation link
  const quickLinks = [
    { name: "হোম", href: "/" },
    { name: "বইয়ের ক্যাটাগরি", href: "/categories" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-200 pt-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-10 gap-x-8 pb-12">
          {/* Column 1: Brand Info & About (হাওলাদার প্রকাশনী) */}
          <div className="col-span-2 md:col-span-2 space-y-4">
            <h3 className="text-2xl font-extrabold text-white tracking-wider">
              হাওলাদার প্রকাশনী
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              আমরা সর্বশেষ বই ও প্রকাশনা সরবরাহ করি। আমাদের উদ্দেশ্য পাঠকদের
              কাছে মানসম্মত বই পৌঁছে দেওয়া এবং সাহিত্য সংস্কৃতিতে অবদান রাখা।
            </p>
          </div>

          {/* Column 2: Quick Links (তাড়াতাড়ি যাওয়ার পথ) */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-5 text-gray-100 uppercase">
              তাড়াতাড়ি যাওয়ার পথ
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info (যোগাযোগ) */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-lg font-semibold mb-5 text-gray-100 uppercase">
              যোগাযোগ
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5  text-yellow-500 mt-1" />
                <span className="text-gray-400">
                  বাংলাবাজার, ঢাকা, বাংলাদেশ
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5  text-yellow-500 mt-1" />
                <span className="text-gray-400">
                  +880136582963, +8801726956104
                </span>
              </li>
              <li className="flex items-center gap-3">
                <p>
                  <Mail className="w-5 h-5  text-yellow-500 mt-1" />
                </p>
                <span className="text-gray-400 hover:text-white transition duration-300 cursor-pointer">
                  info@howladarprokashoni.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar / Copyright & Socials */}
        <div className="border-t border-gray-800 pt-6 pb-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          {/* Copyright & Portfolio Reference */}
          <div className="text-center md:text-left order-2 md:order-1 mt-4 md:mt-0">
            &copy; {currentYear} হাওলাদার প্রকাশনী | সর্বস্বত্ব সংরক্ষিত
            {/* 💡 পোর্টফোলিও লিঙ্ক যোগ */}
            <p className="mt-1 text-xs flex items-center justify-center md:justify-start">
              <Code className="w-3 h-3 mr-1" />
              Designed & Developed by{" "}
              <a
                href={portfolioLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-400 ml-1 transition duration-300"
              >
                {portfolioName}
              </a>
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center gap-4 order-1 md:order-2">
            <a
              href="https://www.facebook.com/howladerprokashanioriginal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition duration-300"
              aria-label="Facebook"
            >
              <Facebook size={22} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 transition duration-300"
              aria-label="Instagram"
            >
              <Instagram size={22} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
