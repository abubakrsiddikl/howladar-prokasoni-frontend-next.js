import { Column } from "@/components/shared/Management/ManagementTable";
import { IBook } from "@/types";
import Link from "next/link";
import Image from "next/image";

export const booksColumns: Column<IBook>[] = [
  {
    header: "Image",

    accessor: (row: IBook) => (
      <Image
        src={row.coverImage || "/placeholder.png"}
        alt={row.title}
        height={64}
        width={48}
        className="h-16 w-12 rounded object-cover"
      />
    ),
    className: "p-2 w-[80px]",
  },
  {
    header: "Title",
    accessor: (row: IBook) => (
      <Link
        href={`/book-details/${row.slug}`}
        className="hover:text-blue-700 hover:underline font-medium"
      >
        {row.title}
      </Link>
    ),

    className: "p-2 min-w-[200px]",
  },
  {
    header: "Author",
    accessor: (row: IBook) => row.author?.name || "N/A",
    className: "p-2",
  },
  {
    header: "Genre",

    accessor: (row: IBook) => row.genre?.name || "N/A",
    className: "p-2",
  },
  {
    header: "Original Price",
    accessor: (row: IBook) => (
      <span className="text-muted-foreground line-through">
        {(row.price + (row.discountedPrice || 0)).toFixed(2)}৳
      </span>
    ),

    className: "p-2",
  },
  {
    header: "Selling Price",
    accessor: (row: IBook) => (
      <span className="font-semibold text-green-600">
        {row.price.toFixed(2)}৳
      </span>
    ),

    className: "p-2",
  },
  {
    header: "Discount %",
    accessor: (row: IBook) => (
      <span className="text-red-500">{row.discount}%</span>
    ),

    className: "p-2",
  },
  {
    header: "Discount Amt.",
    accessor: (row: IBook) => (
      <span className="text-sm font-medium">
        {(row.discountedPrice || 0).toFixed(2)}৳
      </span>
    ),
    className: "p-2",
  },
  {
    header: "Stock",
    accessor: "stock",
    className: "p-2 text-center",
  },
];
