import AdminAnalytics from "@/components/module/Analytics/AdminAnalyticsContent";
import MonthlyRevenuePieChart from "@/components/module/Analytics/MonthlyRevenuePieChart";
import { getAllStats, getMonthlyStats } from "@/services/Stats/stats.api";

export default async function AdminDashboardLayout() {
  const stats = await getAllStats();
  const monthlyStats = await getMonthlyStats();
 
  return (
    <div className="space-y-4">
      <AdminAnalytics stats={stats.data || {}}></AdminAnalytics>
      <MonthlyRevenuePieChart
        stats={monthlyStats?.data || []}
      ></MonthlyRevenuePieChart>
    </div>
  );
}
