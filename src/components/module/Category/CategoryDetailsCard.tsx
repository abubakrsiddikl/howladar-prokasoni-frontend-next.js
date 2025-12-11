import { IGenre } from "@/types";
import BookCard from "../Book/BookCard";
import Image from "next/image";
import Link from "next/link";

const CategoryDetailsCard = ({ category }: { category: IGenre }) => {
  if (!category) {
    return <div className="text-center py-10">লেখক খুঁজে পাওয়া যায়নি।</div>;
  }

  const totalBooks = category?.books?.length || 0;

  return (
    <div className="w-11/12 mx-auto p-4 md:p-6  min-h-screen">
      {/* 1. 🖼️ Header and Bio Section */}
      <div className=" p-4 rounded-lg border bg-white mb-8 flex flex-col md:flex-row items-start space-x-6">
        {/* Profile Image & Follow Button */}
        <div className="flex flex-col items-center">
          <div className="relative  mb-4">
            <Image
              src={"/writer.png"}
              alt={category.name}
              width={80}
              height={80}
              className="rounded-full object-cover h-full w-full border-4 border-gray-200 shadow-md"
            />
          </div>
        </div>

        {/* Bio Content */}
        <div className=" mt-4 md:mt-0">
          <h1 className="text-[17px] font-semibold  mb-3">{category.name}</h1>
          <div className="text-[15px] text-gray-700 leading-relaxed whitespace-pre-line">
            {category.description}
          </div>
        </div>
      </div>

      {/* 2.  Breadcrumb & Navigation */}
      <div className="bg-white p-4 rounded-sm">
        <div className="mb-6">
          <div className="text-sm text-gray-500 mb-3">
            <Link href={"/"} className="hover:underline hover:text-blue-400">
              Books
            </Link>
            /
            <Link
              href={"/category"}
              className="hover:underline hover:text-blue-400"
            >
              ক্যাটাগরি
            </Link>
            / <span className="font-medium text-gray-700">{category.name}</span>
          </div>

          <h2 className="text-xl text-gray-800">{category.name} এর বই সমূহ</h2>
          <p className="text-sm text-gray-500 mt-1">
            (Showing 1 to {totalBooks} of {totalBooks} items)
          </p>
        </div>

        {/* 3. 📚 Books Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {category?.books?.map((book) => (
            <BookCard key={book._id} {...book} />
          ))}
        </div>

        {/* যদি কোনো বই না থাকে */}
        {totalBooks === 0 && (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500">
              এই লেখকের কোনো বই বর্তমানে উপলব্ধ নেই।
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryDetailsCard;
