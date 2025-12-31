import AdminAnalytics from "@/components/module/Analytics/AdminAnalyticsContent";
import { MonthlyRevenueChart } from "@/components/module/Analytics/MonthlyRevenuePieChart";
import { OrderStatusChart } from "@/components/module/Analytics/OrderStatusChart";
import { getAllStats, getMonthlyStats } from "@/services/Stats/stats.api";
import { Suspense } from "react";

export default async function AdminDashboardPage() {
  const stats = await getAllStats();
  const monthlyStats = await getMonthlyStats();

  return (
    <div className="space-y-4">
      <p className="text-2xl font-bold">📊 Analytics Dashboard</p>
      <Suspense fallback={"loading"}>
        {" "}
        <AdminAnalytics stats={stats.data || {}}></AdminAnalytics>
        <OrderStatusChart
          data={stats.data?.statusStats || []}
        ></OrderStatusChart>
        <MonthlyRevenueChart
          data={monthlyStats?.data || []}
        ></MonthlyRevenueChart>
      </Suspense>
    </div>
  );
}
