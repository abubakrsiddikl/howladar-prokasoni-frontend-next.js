import { IBook } from "@/types";
import BookCard from "../BookCard";
import CategoryHeaderSection from "../../Category/CategoryHeaderSection";

export default function GenreWiseAllBooks({
  books,
  genreName,
}: {
  books: IBook[];
  genreName: string;
}) {
  return (
    <div>
      <div className=" w-11/12 mx-auto max-w-6xl my-6 min-h-screen">
        <CategoryHeaderSection categoryName={genreName}></CategoryHeaderSection>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3">
          {books?.map((book) => (
            <BookCard {...book} key={book._id}></BookCard>
          ))}
        </div>
      </div>
    </div>
  );
}
