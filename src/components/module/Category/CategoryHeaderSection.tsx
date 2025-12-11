import { formatSlugToName } from "@/lib/formatter";
import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CategoryHeaderSection = ({ categoryName }: { categoryName?: string }) => {
  const name = formatSlugToName(categoryName as string);

  return (
    <>
      {/* Breadcrumb:  */}
      <div className="text-sm text-gray-500 mb-4 shadow bg-white flex items-center gap-4 p-3">
        <Link href={"/"} className="flex items-center gap-3">
          <Home width={24} height={24}></Home> {">"}
        </Link>
        <Link href={"/category"} className="font-medium text-blue-600">
          {" "}
          ক্যাটাগরি
        </Link>
        {">"}
        <Link
          href={`/category/${categoryName}`}
          className="font-medium text-blue-600"
        >
          {name}
        </Link>
      </div>

      {/* Page Title */}
      <div className="flex items-center space-x-3 mb-6 shadow bg-white p-3">
        <Image
          src={"/category-icon.png"}
          width={40}
          height={60}
          alt="Author Icon"
        />

        {/* লোগোর জন্য Placeholder */}
        <p className="text-3xl  text-gray-800 ">
          {categoryName ? `${name} এর বই সমূহ ` : "ক্যাটাগরি"}
        </p>
      </div>
    </>
  );
};

export default CategoryHeaderSection;
