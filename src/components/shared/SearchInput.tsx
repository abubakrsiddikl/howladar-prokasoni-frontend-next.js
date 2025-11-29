"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { getAllBooks } from "@/services/Book/book.api";

interface Book {
  _id: string;
  title: string;
  author: string;
  slug: string;
  coverImage: string;
}

export default function SearchInput() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  // 🕒 Debounce system — type stop for 400ms
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

      setBooks(books);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-11/12 mx-auto bg-white">
      <Input
        type="text"
        placeholder="🔍 বইয়ের শিরোনাম, লেখক বা প্রকাশক লিখুন"
        className="w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {search && (
        <div className="absolute z-50 bg-white border w-full mt-1 rounded-md shadow-2xl max-h-[400px] overflow-y-auto">
          {/* লোডিং */}
          {loading ? (
            <div className="space-y-2 p-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-2/4" />
              <Skeleton className="h-6 w-1/2" />
            </div>
          ) : books.length > 0 ? (
            books.map((book) => (
              <Link
                href={`/book/${book.slug}`}
                key={book._id}
                onClick={() => setSearch("")}
                className="flex gap-3 items-center px-4 py-2 hover:bg-blue-50 transition-colors"
              >
                <div className="w-12 h-16 relative flex-shrink-0">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="object-cover w-full h-full rounded"
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-sm">{book.title}</h3>
                  <p className="text-xs text-gray-600">{book.author}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="p-4 text-sm text-gray-600">
              😔 কোনো বই পাওয়া যায়নি।
            </p>
          )}
        </div>
      )}
    </div>
  );
}
