// import AdminAnalytics from "@/components/module/Analytics/AdminAnalyticsContent";
// import { MonthlyRevenueChart } from "@/components/module/Analytics/MonthlyRevenuePieChart";
// import { OrderStatusChart } from "@/components/module/Analytics/OrderStatusChart";
// import { getAllStats, getMonthlyStats } from "@/services/Stats/stats.api";
// import { Suspense } from "react";

// export default async function AdminDashboardPage() {
//   const stats = await getAllStats();
//   const monthlyStats = await getMonthlyStats();

//   return (
//     <div className="space-y-4">
//       <p className="text-2xl font-bold">📊 Analytics Dashboard</p>
//       <Suspense fallback={"loading"}>
//         {" "}
//         <AdminAnalytics stats={stats.data || {}}></AdminAnalytics>
//         <OrderStatusChart
//           data={stats.data?.statusStats || []}
//         ></OrderStatusChart>
//         <MonthlyRevenueChart
//           data={monthlyStats?.data || []}
//         ></MonthlyRevenueChart>
//       </Suspense>
//     </div>
//   );
// }


import AdminAnalytics from "@/components/module/Analytics/AdminAnalyticsContent";
import { MonthlyRevenueChart } from "@/components/module/Analytics/MonthlyRevenuePieChart";
import { OrderStatusChart } from "@/components/module/Analytics/OrderStatusChart";
import { DailySalesChart } from "@/components/module/Analytics/DailySalesChart";
import { RecentOrdersCard } from "@/components/module/Analytics/RecentOrdersCard";
import {
  getAllStats,
  getMonthlyStats,
 
  getDailyStats,
} from "@/services/Stats/stats.api";
import { Suspense } from "react";
import { getAllOrders } from "@/services/Order/order.api";

export default async function AdminDashboardPage() {
  const [stats, monthlyStats, recentOrders, dailyStats] = await Promise.all([
    getAllStats(),
    getMonthlyStats(),
    getAllOrders("limit=5"),
    getDailyStats(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-2xl font-bold">📊 Analytics Dashboard</p>
        <p className="text-sm text-muted-foreground">
          Overview of your store&apos;s performance
        </p>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <AdminAnalytics stats={stats.data || {}} />

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
          <DailySalesChart data={dailyStats?.data || []} />
          <RecentOrdersCard orders={recentOrders?.data || []} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
          <OrderStatusChart data={stats.data?.statusStats || []} />
          <MonthlyRevenueChart data={monthlyStats?.data || []} />
        </div>
      </Suspense>
    </div>
  );
}