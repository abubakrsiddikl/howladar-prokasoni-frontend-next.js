import { IGenre } from "@/types";
import Image from "next/image";
import Link from "next/link";

const CategoryCard = ({ category }: { category: IGenre }) => (
  <div className="flex flex-col items-center justify-center p-4 bg-white  rounded-lg   transition duration-300 cursor-pointer text-center h-full">
    {/* Profile Image (Placeholder/Actual Image) */}
    <Link
      href={`/category/${category.slug}`}
      className="text-base font-semibold text-[#3a8fd1] hover:text-red-400 hover:underline flex flex-col justify-center items-center"
    >
      <div className="relative h-24 w-24 mb-3">
        <Image
          src={"/category-i.png"}
          alt={category.name}
          layout="fill"
          objectFit="cover"
          className="rounded-full border-2 border-gray-200"
        />
      </div>

      {/* Genre Name */}

      <p>{category.name}</p>
    </Link>
  </div>
);

export default CategoryCard;
