import { IAuthor } from "@/types";
import Image from "next/image";
import Link from "next/link";

const AuthorCard = ({ author }: { author: IAuthor }) => (
  <div className="flex flex-col items-center justify-center p-4 bg-white  rounded-lg   transition duration-300 cursor-pointer text-center h-full">
    {/* Profile Image (Placeholder/Actual Image) */}
    <Link
      href={`/author/${author.slug}`}
      className="text-base font-semibold text-[#3a8fd1] hover:text-red-400 hover:underline flex flex-col justify-center items-center"
    >
      <div className="relative h-24 w-24 mb-3 ">
        <Image
          src={author.profileImage || "/author-i.png"}
          alt={author.name}
          layout="fill"
          objectFit="cover"
          className="rounded-full border-2 border-gray-200"
        />
      </div>

      {/* Author Name */}

     <p> {author.name}</p>
    </Link>

    {/* Subtitle/Short Bio (ঐচ্ছিক) */}
    {/* <p className="text-xs text-gray-500 mt-1 line-clamp-2">
      {author.bio || "প্রকাশক / লেখক"}
    </p> */}

    {/* আপনি চাইলে এখানে মোট বইয়ের সংখ্যাও দেখাতে পারেন */}
    {/* <p className="text-xs font-medium text-green-600 mt-1">
      {author.totalBooks}টি বই
    </p> */}
  </div>
);

export default AuthorCard;
