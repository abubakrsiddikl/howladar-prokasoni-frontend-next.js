import { GenreSection } from "./GenreSection";
import { getAllGenres } from "@/services/Genre/genre.api";

export default async function GenreWiseBooks() {
  const genreRes = await getAllGenres("limit=20");
 
  return (
    <div className="space-y-10 w-11/12 mx-auto max-w-6xl ">
      {genreRes?.data.map((genre) => (
        <GenreSection key={genre._id} genre={genre} />
      ))}
    </div>
  );
}
