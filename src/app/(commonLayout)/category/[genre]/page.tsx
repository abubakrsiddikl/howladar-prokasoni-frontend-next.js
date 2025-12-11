import GenreWiseAllBooks from "@/components/module/Book/GenreWiseBook/GenreWiseAllBooks";
import TablePagination from "@/components/shared/Management/TablePagination";
import { getAllBooks } from "@/services/Book/book.api";

interface ICategoryDetailsPageProps {
  params: Promise<{ genre: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function MoreBooksPage({
  params,
  searchParams,
}: ICategoryDetailsPageProps) {
  const { genre } = await params;
  const { limit, page } = await searchParams;

  const books = await getAllBooks(`genre=${genre}&page=${page}&limit=${limit}`);

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
