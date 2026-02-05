import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Code,
  ShieldCheck,
  Truck,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import sslBanner from "../../../public/ssl-banner.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const portfolioLink = "https://abubakrsiddik-portfolio.vercel.app/";
  const portfolioName = "Abu Bakr Siddik";

  return (
    <footer className="bg-gray-900 text-gray-200 pt-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 gap-x-8 pb-12">
          {/* Column 1: Brand & License (SSL Requirement 4, 6) */}
          <div className="col-span-1 space-y-4">
            <h3 className="text-2xl font-extrabold text-white tracking-wider">
              হাওলাদার প্রকাশনী
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              আমরা মানসম্মত বই ও প্রকাশনা সরবরাহ করি। আমাদের লক্ষ্য সাহিত্য
              সংস্কৃতিতে অবদান রাখা।
            </p>
            <div className="text-xs text-gray-500 space-y-1">
              <p>TIN: 779833596275</p>
            </div>
          </div>

          {/* Column 2: Useful Links (SSL Requirement 1, 3) */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-5 text-gray-100 uppercase">
              প্রয়োজনীয় লিংক
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/category"
                  className="text-gray-400 hover:text-white transition"
                >
                  ক্যাটাগরি
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="text-gray-400 hover:text-white transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-400 hover:text-white transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-conditions"
                  className="text-gray-400 hover:text-white transition"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-policy"
                  className="text-gray-400 hover:text-white transition"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Policy Details (SSL Requirement 2, 5) */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-5 text-gray-100 uppercase">
              ডেলিভারি ও রিফান্ড
            </h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex gap-2">
                <Truck className="w-5 h-5 text-yellow-500 shrink-0" />
                <span>ডেলিভারি: ঢাকা ৩ দিন, ঢাকার বাইরে ৭ দিন</span>
              </li>
              <li className="flex gap-2">
                <ShieldCheck className="w-5 h-5 text-yellow-500 shrink-0" />
                <span>রিফান্ড সময়কাল: ৩ থেকে ৭ কার্যদিবস</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact (SSL Requirement 4) */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-5 text-gray-100 uppercase">
              যোগাযোগ
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-yellow-500 mt-1" />
                <span className="text-gray-400">
                  ৩৮/৪, পি কে রায় রোড, বাংলাবাজার, ঢাকা
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-yellow-500" />
                <span className="text-gray-400">+8801726956104</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-yellow-500" />
                <span className="text-gray-400 line-clamp-2">
                  <a href="mailto:howladarprokasoni@gmail.com">
                    howladarprokasoni@gmail.com
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* SSLCOMMERZ Payment Banner (SSL Requirement 8) */}
        <div className="border-t border-gray-800 py-8 flex justify-center">
          <div className="">
            {/* আপনার পাবলিক ফোল্ডারে ব্যানার ইমেজটি রেখে এখানে সোর্স দিন */}
            <Image 
              src={sslBanner} 
              alt="SSLCOMMERZ Payment Methods" 
              width={1000} 
              height={200} 
              className="w-full grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition duration-500"
            />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 pb-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <div className="text-center md:text-left">
            &copy; {currentYear} হাওলাদার প্রকাশনী | সর্বস্বত্ব সংরক্ষিত
            <p className="mt-1 text-xs flex items-center justify-center md:justify-start">
              <Code className="w-3 h-3 mr-1" />
              Designed & Developed by{" "}
              <a
                href={portfolioLink}
                className="text-gray-400 hover:text-yellow-400 ml-1"
                target="_blank"
              >
                {portfolioName}
              </a>
            </p>
          </div>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a
              href="https://www.facebook.com/share/1JMaesPVJL/"
              className="hover:text-blue-500"
              target="_blank"
            >
              <Facebook size={22} />
            </a>
            <a href="#" className="hover:text-pink-500">
              <Instagram size={22} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
