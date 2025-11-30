import { getUserProfile } from "@/services/Auth/auth.api";
import DashboardSidebarContent from "./DashboardSidebarContent";
import { NavSection } from "@/types";
import { getNavItemsByRole } from "@/lib/navItems.config";
import { getDefaultDashboardRoute } from "@/utils/auth-utils";

const DashboardSidebar = async () => {
  const userInfo = await getUserProfile();

  const navItems: NavSection[] = getNavItemsByRole(userInfo.role);
  const dashboardHome = getDefaultDashboardRoute(userInfo.role);

  return (
    <DashboardSidebarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome as string}
    />
  );
};

export default DashboardSidebar;
