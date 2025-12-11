"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { getAllBooks } from "@/services/Book/book.api";
import CategoryDropdown from "./CategoryDropdown";
import { IBook, IGenre } from "@/types";

export default function SearchInput({ genres }: { genres: IGenre[] }) {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState(false);

  // 🕒 Debounce system
  useEffect(() => {
    const delay = setTimeout(() => {
      if (search.trim()) fetchBooks();
      else setBooks([]);
    }, 400);

    return () => clearTimeout(delay);
  }, [search]);

  // 🌐 API Call function
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const books = await getAllBooks(`searchTerm=${search}`);
      setBooks(books?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto ">
      <div className="flex border border-gray-300 rounded-md  bg-white shadow-md ">
        {/* category dropdown*/}
        <div className="relative hidden md:block">
          <CategoryDropdown genres={genres} />
        </div>

        {/* search input*/}
        <Input
          type="text"
          placeholder="বইয়ের নাম দিয়ে অনুসন্ধান"
          className=" rounded-none focus-visible:ring-0 shadow-none  flex-1 pl-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* search button */}
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white p-3 transition-colors flex items-center justify-center w-16"
          onClick={() => fetchBooks()} // বাটন ক্লিক করলে সার্চ কল হবে
          aria-label="Search"
        >
          <Search className="h-3 w-6" />
        </button>
      </div>

      {/* search result  */}
      {search && (
        <div className="absolute z-50 bg-white border w-full mt-1 rounded-md shadow-2xl max-h-[400px] overflow-y-auto">
          {loading ? (
            <div className="space-y-2 p-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-2/4" />
            </div>
          ) : books.length > 0 ? (
            books.map((book) => (
              <Link
                href={`/book/${book.slug}`}
                key={book._id}
                onClick={() => setSearch("")}
                className="flex gap-3 items-center px-4 py-2 hover:bg-blue-50 transition-colors"
              >
                <div className="w-12 h-16 relative">
                  <Image
                    src={book.coverImage as string}
                    alt={book.title}
                    width={48}
                    height={64}
                    className="object-cover w-full h-full rounded"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{book.title}</h3>
                  <p className="text-xs text-gray-600">{book.author.name}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="p-4 text-sm text-gray-600">
              😔 কোনো বই পাওয়া যায়নি।
            </p>
          )}
        </div>
      )}
    </div>
  );
}
