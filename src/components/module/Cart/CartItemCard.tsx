"use client"
import useCart from "@/hooks/useCart";
import { ICartItem } from "@/types/cart.type";
import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartItemCard({ item }: { item: ICartItem }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <tr className="border-b ">
      {/* Details */}
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.book?.coverImage}
          alt={item.book?.title}
          width={60}
          height={80}
          className="object-contain border rounded"
        />
        <div>
          <Link
            href={`/book-details/${item.book?.slug}`}
            className="font-semibold text-[#1a0dab] hover:underline"
          >
            {item.book?.title}
          </Link>
          <p className="text-sm text-gray-500">N/A</p>
          <>
            {(item.book?.discount as number) > 0 ? (
              <>
                <p className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl">
                  {item.book?.price} Tk.
                </p>
                <p className="text-[#fe5050] line-through text-xs sm:text-sm md:text-base lg:text-base font-semibold">
                  {item.book?.price + (item.book?.discountedPrice as number)} Tk.
                </p>
              </>
            ) : (
              <p className=" font-semibold text-sm sm:text-base md:text-lg lg:text-xl">
                ৳ {item.book?.price}
              </p>
            )}
          </>
        </div>
      </td>

      {/* Quantity */}
      <td className="text-center">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() =>
              item?.quantity > 1 &&
              updateQuantity(item?._id || item.book?._id, item?.quantity - 1)
            }
            className="border px-2 py-1 rounded hover:bg-gray-200 cursor-pointer"
          >
            <Minus></Minus>
          </button>
          <span className=" text-center">{item.quantity}</span>
          <button
            onClick={() =>
              updateQuantity(item?._id || item.book?._id, item.quantity + 1)
            }
            className="border px-2 py-1 rounded hover:bg-gray-200 cursor-pointer"
          >
            <Plus></Plus>
          </button>
        </div>
      </td>

      {/* Total */}
      <td className="text-center font-semibold">
        Tk. {item.book?.price * item?.quantity}
      </td>

      {/* Action */}
      <td className="text-center">
        <button
          onClick={() => removeFromCart(item?._id || item.book?._id)}
          className="text-red-500 hover:text-red-700 cursor-pointer"
        >
          <Trash />
        </button>
      </td>
    </tr>
  );
}
