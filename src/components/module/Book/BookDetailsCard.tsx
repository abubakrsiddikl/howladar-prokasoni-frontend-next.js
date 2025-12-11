"use client";
import { IBook } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";

import PreviewGalleryDialog from "./PreviewGalleryDialog";
import BookCard from "./BookCard";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/useCart";

interface BookDetailsCardProps {
  book: IBook;
  similarBooks?: IBook[];
}

export default function BookDetailsCard({
  book,
  similarBooks = [],
}: BookDetailsCardProps) {
  const [open, setOpen] = useState(false);
  const { addToCart } = useCart();
  const handleAddToCart = () => {
    addToCart({
      quantity: 1,
      book: {
        _id: book._id,
        coverImage: book.coverImage ?? "",
        price: book.price,
        title: book.title,
        discount: book.discount,
        discountedPrice: book.discountedPrice,
      },
    });
  };

  // previewImages gallery setup
  const galleryItems =
    book.previewImages?.map((img) => ({
      original: img,
      thumbnail: img,
    })) || [];
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-8">
      {/* Book Main Section */}
      <Card className="shadow-lg rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Book Cover */}
          <div className="relative col-span-1 w-full h-[400px]">
            <Image
              src={book.coverImage!}
              alt={book.title}
              fill
              className="p-3  object-cover rounded-lg cursor-pointer "
              onClick={() => setOpen(true)}
            />
          </div>

          {/* Book Info */}
          <CardContent className="col-span-2 flex flex-col justify-between">
            <div>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  {book.title}
                </CardTitle>
              </CardHeader>

              <p className="text-gray-600 mb-2">
                by{" "}
                <span className="font-medium text-blue-400">
                  {book?.author?.name}
                </span>
              </p>

              {book.description && (
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                  {book.description}
                </p>
              )}

              <p>প্রকাশক: {book?.publisher ? book?.publisher : "N/A"}</p>

              {/* Price & Discount */}
              <div className="flex items-center gap-3 mb-4">
                {book.discount ? (
                  <>
                    <span className="text-2xl font-bold text-green-600">
                      {book.price}৳
                    </span>
                    <span className="line-through text-gray-500">
                      {book.price + book.discountedPrice!}৳
                    </span>
                    <span className="text-[#ff8600] text-sm font-medium">
                      Your Save Tk.{book.discountedPrice}({book.discount}%)
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-green-600">
                    {book.price}৳
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <Button className="flex-1 text-white" onClick={handleAddToCart}>
                🛒 Add to Cart
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setOpen(true)}
              >
                📖 একটু পড়ে দেখুন
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Preview Modal */}
      <PreviewGalleryDialog
        open={open}
        setOpen={setOpen}
        title={book.title}
        galleryItems={galleryItems}
      />

      {/* Recommendations */}
      <div>
        <h2 className="text-xl font-semibold mb-4">📚 Similar Books</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {similarBooks?.length > 0 &&
            similarBooks.map((similar) => (
              <BookCard key={similar._id} {...similar} />
            ))}
        </div>
      </div>
    </div>
  );
}
