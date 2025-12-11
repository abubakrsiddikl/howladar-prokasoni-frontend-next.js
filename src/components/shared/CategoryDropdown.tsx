"use client";

import { IGenre } from "@/types";
import Link from "next/link";
import { useState, useEffect, useRef } from "react"; // 💡 useRef যোগ করা হলো

const splitGenresIntoColumns = (genres: IGenre[], numColumns = 5) => {
  const columns: IGenre[][] = Array.from({ length: numColumns }, () => []);
  genres.forEach((genre, index) => {
    columns[index % numColumns].push(genre);
  });
  return columns;
};

export default function CategoryDropdown({ genres }: { genres: IGenre[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const genreColumns = splitGenresIntoColumns(genres, 5);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block h-full border" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-700 bg-gray-100 hover:bg-gray-200 font-semibold h-full px-6 transition-colors border-r border-gray-300 flex items-center justify-center text-base cursor-pointer"
      >
        ক্যাটাগরি
      </button>

     
      {isOpen && (
        <div className="absolute left-0 top-9 mt-0 w-[700px] max-w-4xl bg-white border border-black   z-50 p-6">
          <div className="grid grid-cols-4 gap-x-8 gap-y-2">
            {genreColumns.map((column, colIndex) => (
              <ul key={colIndex} className="space-y-2">
                {column.map((genre) => (
                  <li key={genre.slug} className="text-sm">
                    <Link
                      href={`/category/${genre.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="text-gray-700 hover:text-blue-600 transition duration-150"
                    >
                      - {genre.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>

          {/* See More Link (ঐচ্ছিক) */}
          <div className="border-t pt-4 mt-4">
            <Link
              href="/category"
              onClick={() => setIsOpen(false)} 
              className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
            >
              + See More
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
