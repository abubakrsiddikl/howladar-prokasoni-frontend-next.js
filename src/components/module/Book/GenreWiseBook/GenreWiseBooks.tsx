
import { GenreSection } from "./GenreSection";
import { getHomeBooks } from "@/services/Book/book.api";

export default async function GenreWiseBooks() {
  const homePageBooks = await getHomeBooks();


  return (
    <div className="space-y-10 w-11/12 mx-auto max-w-6xl ">
      {homePageBooks?.data.map((genre) => (
        <GenreSection
          key={genre.genreId}
          genre={genre.genreDetails}
          books={genre.books || []}
        />
      ))}
    </div>
  );
}
