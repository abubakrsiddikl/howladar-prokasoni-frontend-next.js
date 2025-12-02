
import BookDetailsCard from "@/components/module/Book/BookDetailsCard";
import { getAllBooks, getSingleBook } from "@/services/Book/book.api";

export default async function BookDetailsPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  const book = await getSingleBook(slug);
  const similarBooks = await getAllBooks(`genre=${book.genre.name}`);
  return (
    <div>
      <BookDetailsCard
        book={book}
        similarBooks={similarBooks}
      ></BookDetailsCard>
    </div>
  );
}
