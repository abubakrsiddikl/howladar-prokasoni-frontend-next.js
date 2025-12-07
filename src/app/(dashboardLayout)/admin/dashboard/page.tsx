import AdminAnalytics from "@/components/module/Analytics/AdminAnalyticsContent";
import MonthlyRevenuePieChart from "@/components/module/Analytics/MonthlyRevenuePieChart";
import { getAllStats, getMonthlyStats } from "@/services/Stats/stats.api";

export default async function AdminDashboardLayout() {
  const stats = await getAllStats();
  const monthlyStats = await getMonthlyStats();
  const mstats = [
    { month: "December", totalOrders: 20, totalRevenue: 10000, year: 2024 },
    { month: "January", totalOrders: 3, totalRevenue: 20200, year: 2025 },
    { month: "October", totalOrders: 3, totalRevenue: 30336, year: 2025 },
    { month: "November", totalOrders: 3, totalRevenue: 60946, year: 2025 },
    { month: "February", totalOrders: 3, totalRevenue: 50946, year: 2025 },
    { month: "June", totalOrders: 3, totalRevenue: 40946, year: 2025 },
    { month: "July", totalOrders: 3, totalRevenue: 20946, year: 2025 },
    { month: "August", totalOrders: 3, totalRevenue: 90946, year: 2025 },
    { month: "September", totalOrders: 3, totalRevenue: 20946, year: 2025 },
    { month: "March", totalOrders: 3, totalRevenue: 60946, year: 2025 },
    { month: "April", totalOrders: 3, totalRevenue: 80946, year: 2025 },
    { month: "May", totalOrders: 3, totalRevenue: 10946, year: 2025 },
    
  ]; // দুটি ডেটা দিন

  return (
    <div className="space-y-4">
      <AdminAnalytics stats={stats.data || {}}></AdminAnalytics>
      <MonthlyRevenuePieChart stats={mstats || []}></MonthlyRevenuePieChart>
    </div>
  );
}
