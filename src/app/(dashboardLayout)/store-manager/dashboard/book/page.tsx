import BooksManagementHeader from "@/components/module/StoreManagement/Book/BookManagementHeader";
import BooksTable from "@/components/module/StoreManagement/Book/BooksTable";
import TablePagination from "@/components/shared/Management/TablePagination";
import { TableSkeleton } from "@/components/shared/Management/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatter";
import { getAllBooks } from "@/services/Book/book.api";
import { getAllGenres } from "@/services/Genre/genre.api";
import { Suspense } from "react";

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  const genre = await getAllGenres();
  const books = await getAllBooks(queryString);

  return (
    <div>
      <BooksManagementHeader genre={genre}></BooksManagementHeader>
      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        <BooksTable books={books?.data || []} genres={genre || []} />
        <TablePagination
          currentPage={books?.meta?.page || 1}
          totalPages={books.meta?.totalPage || 1}
        />
      </Suspense>
    </div>
  );
}
