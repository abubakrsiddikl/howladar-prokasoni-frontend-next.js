import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HeaderSection = () => (
  <>
    {/* Breadcrumb: দেখাচ্ছে -> লেখকগণ */}
    <div className="text-sm text-gray-500 mb-4 shadow bg-white flex items-center gap-4 p-3">
      <Link href={"/"} className="flex items-center gap-3">
        <Home width={24} height={24}></Home> {">"}
      </Link>
      <Link href={"/author"} className="font-medium text-blue-600">
        {" "}
        লেখকগণ
      </Link>
    </div>

    {/* Page Title */}
    <div className="flex items-center space-x-3 mb-6 shadow bg-white p-3">
      <Image
        src={"/authorNavIcon.png"}
        width={40}
        height={60}
        alt="Author Icon"
      />
      {/* লোগোর জন্য Placeholder */}
      <p className="text-3xl  text-gray-800 ">লেখকগণ</p>
    </div>
  </>
);

export default HeaderSection;
