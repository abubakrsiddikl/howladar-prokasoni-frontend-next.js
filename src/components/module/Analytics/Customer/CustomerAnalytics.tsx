"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Package,
  Truck,
  Heart,
  MapPin,
  History,
  DollarSign,
} from "lucide-react";

import { ICustomerDashboardStats, IUser } from "@/types";
import Link from "next/link";

const getActiveOrderCount = (stats: ICustomerDashboardStats): number => {
  if (!stats?.orderStatusStats) return 0;

  // Delivered, Cancelled, Returned ছাড়া বাকি সব স্ট্যাটাসকে Active ধরা হলো
  const inactiveStatuses = ["Delivered", "Cancelled", "Returned"];

  return stats.orderStatusStats.reduce((sum, current) => {
    if (!inactiveStatuses.includes(current.status)) {
      return sum + current.count;
    }
    return sum;
  }, 0);
};

export default function CustomerAnalyticsContent({
  stats,
  user,
}: {
  stats: ICustomerDashboardStats;
  user: IUser;
}) {
  const activeOrderCount = getActiveOrderCount(stats);

  // set last order default message
  const lastOrderStatus = stats.lastOrder?.status || "No recent orders";
  const lastOrderId = stats.lastOrder?.orderId || "N/A";

  // last order navigate link
  const lastOrderLink = stats.lastOrder
    ? `/order/${stats.lastOrder.orderId}`
    : "/dashboard/orders";

  

  return (
    <div className="p-6 space-y-6">
      {/* 1. Welcome Banner */}
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-3xl font-bold">👋 Welcome, {user?.name}</h1>
      </div>

      {/* 2. Overview Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Active Order Count  */}
        <Card className="hover:shadow-lg transition-shadow bg-blue-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <Package className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeOrderCount}</div>
            <p className="text-xs text-muted-foreground">
              Waiting for delivery
            </p>
          </CardContent>
        </Card>

        {/* Card 2: Total Orders  */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <History className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>{" "}
            {/* 💡 stats.totalOrders */}
            <p className="text-xs text-muted-foreground">
              Successfully delivered
            </p>
          </CardContent>
        </Card>

        {/* Card 3: Total Lifetime Spend  */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Lifetime Spend
            </CardTitle>
            <DollarSign className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ৳{stats.totalLifetimeSpend.toLocaleString("en-IN")}
            </div>{" "}
            {/*  */}
            <p className="text-xs text-muted-foreground">Total amount paid</p>
          </CardContent>
        </Card>

      </div>

      {/* 3. Detailed Tracking Card  */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="w-6 h-6 text-purple-600" />
            Last Order Tracking
          </CardTitle>
          <CardDescription>Order ID: **#{lastOrderId}**</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <div className="space-y-1">
            <p className="text-xl font-semibold text-purple-600">
              {lastOrderStatus}
            </p>
            <p className="text-sm text-muted-foreground">
              Your delivery status updates.
            </p>
          </div>
          <Link href={lastOrderLink}>
            <Button variant="outline" className="cursor-pointer">View Full Tracking</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
