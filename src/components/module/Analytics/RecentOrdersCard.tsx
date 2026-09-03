"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { motion } from "framer-motion";
import { IOrder } from "@/types";
import Link from "next/link";

interface Props {
  orders: IOrder[];
}

const statusColorMap: Record<string, string> = {
  Processing: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Approved: "bg-blue-100 text-blue-700 border-blue-200",
  Shipped: "bg-purple-100 text-purple-700 border-purple-200",
  Delivered: "bg-green-100 text-green-700 border-green-200",
  Cancelled: "bg-red-100 text-red-700 border-red-200",
  Returned: "bg-orange-100 text-orange-700 border-orange-200",
};

export function RecentOrdersCard({ orders }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="col-span-full lg:col-span-3"
    >
      <Card className="shadow-sm h-full">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Recent Orders</CardTitle>
          <CardDescription>
            Latest orders placed on the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-2 pr-4 font-medium">Order ID</th>
                  <th className="pb-2 pr-4 font-medium">Customer</th>
                  <th className="pb-2 pr-4 font-medium">Status</th>
                  <th className="pb-2 pr-4 font-medium text-right">Amount</th>
                  <th className="pb-2 pr-0 font-medium text-right">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-8 text-center text-muted-foreground"
                    >
                      No orders yet
                    </td>
                  </tr>
                ) : (
                  orders.map((order, index) => (
                    <motion.tr
                      key={order.orderId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.06 }}
                      className="border-b last:border-0 hover:bg-slate-50/60 transition-colors"
                    >
                      <td className="py-3 pr-4 font-medium hover:text-blue-600 hover:underline transition-colors">
                        <Link href={`/order/${order.orderId}`}>
                          {order.orderId}
                        </Link>
                      </td>
                      <td className="py-3 pr-4">
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {order.shippingInfo?.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {order.shippingInfo?.email}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 pr-4">
                        <Badge
                          variant="outline"
                          className={statusColorMap[order?.currentStatus] || ""}
                        >
                          {order?.currentStatus}
                        </Badge>
                      </td>
                      <td className="py-3 pr-4 text-right font-semibold">
                        ৳{order?.totalAmount}
                      </td>
                      <td className="py-3 pr-0 text-right text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
