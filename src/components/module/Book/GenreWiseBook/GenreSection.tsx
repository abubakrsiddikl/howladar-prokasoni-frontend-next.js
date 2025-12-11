import { Card, CardContent } from "@/components/ui/card";

import type { IGenre } from "@/types";
import { GenreSwiper } from "./GenreSwiper";

import Link from "next/link";
import { getAllBooks } from "@/services/Book/book.api";

export async function GenreSection({ genre }: { genre: IGenre }) {
  const getAllBooksByGenre = await getAllBooks(`genre=${genre.name}&limit=10`);

  return (
    <Card className="relative border border-[#ff8600] shadow-none">
      <CardContent className="space-y-4">
        {/* Genre Title */}
        <div className="flex justify-between">
          <div className="flex justify-center gap-3">
            <h2 className="text-xl font-bold text-[#25517a]">
              {genre.name} বই কিনুন
            </h2>
            <p className="text-base mt-2 font-semibold text-[#25517a]">
              ({genre.description})
            </p>
          </div>

          <Link href={`/category/${genre.slug}`} className="text-[#ff8600]">
            See all {">"}
          </Link>
        </div>

        {/* Carousel inside Genre Card */}
        <GenreSwiper books={getAllBooksByGenre.data} />
      </CardContent>
    </Card>
  );
}
