import React from "react";
import { Column } from "@/components/shared/Management/ManagementTable";
import { IBook } from "@/types"; // আপনার IBook ইন্টারফেস ধরে নেওয়া হলো
import Link from "next/link"; // Next.js Link ব্যবহার করা হলো
import Image from "next/image";

// IBook টাইপের উপর ভিত্তি করে কলাম ডেফিনেশন
export const booksColumns: Column<IBook>[] = [
  {
    header: "Image",
    // কভার ইমেজ রেন্ডারিং করার জন্য কাস্টম এক্সেসর
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
      // Link কম্পোনেন্ট ব্যবহার করে টাইটেল রেন্ডার
      <Link
        href={`/book-details/${row.slug}`}
        className="hover:text-blue-700 hover:underline font-medium"
      >
        {row.title}
      </Link>
    ),
    sortKey: "title",
    className: "p-2 min-w-[200px]",
  },
  {
    header: "Author",
    accessor: "author", // সরাসরি 'author' প্রপার্টি ব্যবহার
    sortKey: "author",
    className: "p-2",
  },
  {
    header: "Genre",
    // নেস্টেড প্রপার্টি অ্যাক্সেসের জন্য কাস্টম এক্সেসর
    accessor: (row: IBook) => row.genre?.name || "N/A",
    sortKey: "genre",
    className: "p-2",
  },
  {
    header: "Original Price",
    // আপনার HTML লজিক অনুযায়ী: Original Price = Current Price + Discount Amount
    accessor: (row: IBook) => (
      <span className="text-muted-foreground line-through">
        {(row.price + (row.discountedPrice || 0)).toFixed(2)}৳
      </span>
    ),
    sortKey: "price",
    className: "p-2",
  },
  {
    header: "Selling Price", // আপনার HTML-এ এটি 'Current Price' ছিল
    accessor: (row: IBook) => (
      <span className="font-semibold text-green-600">
        {row.price.toFixed(2)}৳
      </span>
    ),
    sortKey: "price",
    className: "p-2",
  },
  {
    header: "Discount %",
    accessor: (row: IBook) => (
      <span className="text-red-500">{row.discount}%</span>
    ),
    sortKey: "discount",
    className: "p-2",
  },
  {
    header: "Discount Amt.", // আপনার HTML-এ এটি 'Discounted Price' ছিল
    // এটি ডিসকাউন্ট এর পরিমাণ (amount) দেখাচ্ছে
    accessor: (row: IBook) => (
      <span className="text-sm font-medium">
        {(row.discountedPrice || 0).toFixed(2)}৳
      </span>
    ),
    className: "p-2",
  },
  {
    header: "Stock",
    accessor: "stock", // সরাসরি 'stock' প্রপার্টি ব্যবহার
    sortKey: "stock",
    className: "p-2 text-center",
  },
];
