import AdminAnalytics from "@/components/module/Analytics/AdminAnalyticsContent";
import MonthlyRevenuePieChart from "@/components/module/Analytics/MonthlyRevenuePieChart";
import { getAllStats, getMonthlyStats } from "@/services/Stats/stats.api";
import { Suspense } from "react";

export default async function AdminDashboardPage() {
  const stats = await getAllStats();
  const monthlyStats = await getMonthlyStats();

  return (
    <div className="space-y-4">
      <Suspense fallback={'loading'}>
        {" "}
        <AdminAnalytics stats={stats.data || {}}></AdminAnalytics>
        <MonthlyRevenuePieChart
          stats={monthlyStats?.data || []}
        ></MonthlyRevenuePieChart>
      </Suspense>
    </div>
  );
}
