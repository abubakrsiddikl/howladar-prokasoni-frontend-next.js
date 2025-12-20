import BookDetailsCard from "@/components/module/Book/BookDetailsCard";
import { getAllBooks, getSingleBook } from "@/services/Book/book.api";
import { IBook } from "@/types";
import { Metadata } from "next";

// generate metadata
export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const book = await getSingleBook(slug);

  if (!book) {
    return { title: "বই পাওয়া যায়নি" };
  }

  const title = `${book.title} | ${book.author.name} | হাওলাদার প্রকাশনী`;
  const description = book?.description!.substring(0, 150) + "...";
  const url = `https://howladarporkasoni.com.bd/book/${book.slug}`;
  const imageUrl =
    book.coverImage ||
    "https://howladarporkasoni.com.bd/og-default.jpg";

  return {
    title: title,
    description: description,
    alternates: { canonical: url },
    keywords: [
      book.title,
      book.author.name,
      book.genre.name,
      "হাওলাদার প্রকাশনী",
      "বই",
    ],

    // Open Graph (Facebook, Social Sharing)
    openGraph: {
      title: title,
      description: description,
      url: url,
      siteName: "হাওলাদার প্রকাশনী",
      images: [{ url: imageUrl, width: 800, height: 600, alt: book.title }],
      type: "book",
    },

    // Twitter Card
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [imageUrl],
    },
  };
}

// json ld schema
const generateBookSchema = (book: IBook) => {
  const availability =
    book.stock > 0
      ? "http://schema.org/InStock"
      : "http://schema.org/OutOfStock";

  const price = book.price;

  return {
    "@context": "http://schema.org/",
    "@type": "Product",
    name: book.title,
    description: book.description!.substring(0, 300) + "...",
    sku: `Book-${book._id}`,
    image: book.coverImage,
    offers: {
      "@type": "Offer",
      priceCurrency: "BDT",
      price: price,
      itemCondition: "http://schema.org/NewCondition",
      availability: availability,
      url: `https://howladarporkasoni.com.bd/book/${book.slug}`,
      seller: {
        "@type": "Organization",
        name: "হাওলাদার প্রকাশনী",
      },
    },

    // Product specific details (Book Type)
    bookEdition: "1st Edition",
    author: {
      "@type": "Person",
      name: book.author.name,
    },
    isbn: "Not_Available",
  };
};

export default async function BookDetailsPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  const book = await getSingleBook(slug);

  // create json ld
  const bookSchema = generateBookSchema(book);

  const similarBooks = await getAllBooks(`genre=${book.genre.name}`);
  return (
    <>
      {/* 📘 JSON-LD Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }}
      />
      <div>
        <BookDetailsCard
          book={book}
          similarBooks={similarBooks.data || []}
        ></BookDetailsCard>
      </div>
    </>
  );
}
