import GenreWiseAllBooks from "@/components/module/Book/GenreWiseBook/GenreWiseAllBooks";
import TablePagination from "@/components/shared/Management/TablePagination";
import { getAllBooks } from "@/services/Book/book.api";
import React from "react";

export default async function MoreBooksPage(props: {
  params: Promise<{ genre: string }>;
}) {
  const { genre } = await props.params;
  const books = await getAllBooks(`genre=${genre}`);

  return (
    <div className="space-y-4">
      <GenreWiseAllBooks
        books={books.data || []}
        genreName={genre}
      ></GenreWiseAllBooks>
      <TablePagination
        currentPage={books?.meta?.page as number}
        totalPages={books.meta?.totalPage as number}
      ></TablePagination>
    </div>
  );
}
