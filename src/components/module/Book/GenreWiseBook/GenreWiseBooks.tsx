import { getAllSortedGenre } from "@/services/Genre/genre.api";
import { GenreSection } from "./GenreSection";

export default async function GenreWiseBooks() {
  const genreRes = await getAllSortedGenre();
  

  return (
    <div className="space-y-10 w-11/12 mx-auto max-w-6xl ">
      {genreRes?.data.map((genre) => (
        <GenreSection key={genre._id} genre={genre} />
      ))}
    </div>
  );
}
