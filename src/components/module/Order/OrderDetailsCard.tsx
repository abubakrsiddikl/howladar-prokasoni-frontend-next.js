"use client";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useActionState, useEffect, useState, useTransition } from "react";

import type { IOrder, IUser } from "@/types";
import OrderTimeline from "./OrderTimeline";
import Image from "next/image";
import { userRoleConstant } from "@/constant/role";
import { updateOrderStatus } from "@/services/Order/order.api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function OrderDetailsCard({
  order,
  user,
}: {
  order: IOrder;
  user: IUser;
}) {
  const [state, formAction, isPending] = useActionState(
    updateOrderStatus.bind(null, order._id),
    null
  );
  const [, startTransition] = useTransition();
  const router = useRouter();
  const [orderStatus, setOrderStatus] = useState(order.currentStatus);

  // totals
  const subTotal = order.totalAmount - 120;
  useEffect(() => {
    if (state?.success && state.message) {
      toast.success(state.message);
    } else if (state && !state.success && state.message) {
      toast.error(state.message);
    }
    startTransition(() => {
      router.refresh();
    });
  }, [state, router]);
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Banner */}
      <div
        className={`p-4 text-white font-semibold text-center rounded-lg ${
          order.currentStatus === "Delivered"
            ? "bg-green-600"
            : order.currentStatus === "Cancelled"
            ? "bg-red-600"
            : "bg-orange-500"
        }`}
      >
        This order has been {order.currentStatus.toLowerCase()}.
      </div>

      {/* Order Header */}
      <div className="border-b pb-4">
        <h1 className="text-xl font-bold">Order: {order.orderId}</h1>
        <p className="text-sm text-gray-500">
          Placed: {format(new Date(order.createdAt), "MMM d, yyyy h:mm a")}
        </p>
      </div>

      {/* Responsive Layout: left timeline, right summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Timeline */}
        <OrderTimeline order={order} />

        {/* Order Summary */}
        <div className="p-4 rounded-lg border bg-white">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>
          <div className="border-t border-dashed border-[#708dbf] my-4" />
          <div className="h-[200px] space-y-4 overflow-y-scroll">
            {order.items.map((item, idx: number) => (
              <div key={idx}>
                <div className="flex items-center gap-4">
                  <Image
                    src={item.book.coverImage}
                    alt={item.book.title}
                    width={64}
                    height={80}
                    className="object-cover rounded"
                  />
                  <div className="grow">
                    <p className="font-semibold">{item.book.title}</p>
                    {item.book.discount > 0 ? (
                      <>
                        <p className="text-[#4d3633] font-semibold text-sm sm:text-base md:text-lg lg:text-xl">
                          Tk. {item.book.price}
                        </p>
                        <p className="text-gray-400 line-through text-xs sm:text-sm md:text-sm lg:text-base">
                          Tk. {item.book.price + item.book.discountedPrice}
                        </p>
                      </>
                    ) : (
                      <p className="text-[#4d3633] font-semibold text-sm sm:text-base md:text-lg lg:text-xl">
                        Tk. {item.book.price}
                      </p>
                    )}
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-bold">
                    Tk. {item.quantity * item.book.price}
                  </p>
                </div>
                <div className="border-t border-dashed border-[#708dbf] my-4" />
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-2 text-right">
            <div className="flex justify-between">
              <span>Total items</span>
              <span>{order.items.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Sub Total</span>
              <span>Tk. {subTotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charge</span>
              <span>Tk. {order.deliveryCharge}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>Tk. {order.totalDiscountedPrice}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Payable Amount</span>
              <span>Tk. {order.totalAmount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Info */}
      <div className="p-4 rounded-lg border bg-white">
        <h2 className="text-lg font-bold mb-4">Shipping Info</h2>
        <p>🧑 {order.shippingInfo?.name}</p>
        <p>📧 {order.shippingInfo?.email}</p>
        <p>📞 {order.shippingInfo?.phone}</p>
        <p>
          📍 {order.shippingInfo?.address}, {order.shippingInfo?.city},
          District: {order.shippingInfo?.district},{" "}
          {order.shippingInfo?.division}
        </p>
      </div>

      {/* Payment Info */}
      <div className="p-4 rounded-lg border bg-white">
        <h2 className="text-lg font-bold mb-4">Payment Information</h2>
        <p>Selected Payment Method</p>
        <div className="bg-red-200 text-red-800 font-bold p-4 rounded-md text-center mt-2">
          {order.paymentMethod}
        </div>
      </div>

      {/* Status Update (Admin/Manager only) */}
      {(user?.role === userRoleConstant.ADMIN ||
        user?.role === userRoleConstant.STORE_MANAGER) && (
        <div className="p-4 rounded-lg border bg-white">
          <h2 className="text-lg font-bold mb-4">Update Order Status</h2>
          <form action={formAction}>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Select value={orderStatus} onValueChange={setOrderStatus}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Shipped">Shipped</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                  <SelectItem value="Returned">Returned</SelectItem>
                </SelectContent>
              </Select>

              <input type="hidden" name="status" value={orderStatus} />

              <Button
                className="bg-blue-600 hover:bg-blue-700"
                type="submit"
                disabled={isPending || orderStatus === order.currentStatus}
              >
                {isPending ? "Updating..." : "Update Status"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Action Button */}
      <div className="text-center">
        <Button variant="outline">
          {order.currentStatus === "Cancelled"
            ? "Go Shopping"
            : "Download Invoice"}
        </Button>
      </div>
    </div>
  );
}
