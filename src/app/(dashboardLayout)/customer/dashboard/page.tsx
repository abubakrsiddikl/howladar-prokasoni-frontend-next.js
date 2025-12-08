import CustomerAnalyticsContent from "@/components/module/Analytics/Customer/CustomerAnalytics";
import { getUserProfile } from "@/services/Auth/auth.api";
import { getCustomerStats } from "@/services/Stats/stats.api";

export default async function CustomerDashboardPage() {
  const user = await getUserProfile();
  const stats = await getCustomerStats();
  return (
    <div>
      <CustomerAnalyticsContent
        stats={stats?.data}
        user={user}
      ></CustomerAnalyticsContent>
    </div>
  );
}
