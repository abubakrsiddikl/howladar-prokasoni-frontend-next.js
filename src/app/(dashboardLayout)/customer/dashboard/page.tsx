import CustomerAnalyticsContent from "@/components/module/Analytics/Customer/CustomerAnalytics";
import { getUserProfile } from "@/services/Auth/auth.api";
import { getCustomerStats } from "@/services/Stats/stats.api";
import CustomerDashboardAnalytics from "@/components/shared/CustomerDashboardAnalytics";

export default async function CustomerDashboardPage() {
  const user = await getUserProfile();
  const stats = await getCustomerStats();
  return (
    <div>
      <CustomerDashboardAnalytics userId={user._id} />
      <CustomerAnalyticsContent
        stats={stats?.data}
        user={user}
      ></CustomerAnalyticsContent>
    </div>
  );
}
