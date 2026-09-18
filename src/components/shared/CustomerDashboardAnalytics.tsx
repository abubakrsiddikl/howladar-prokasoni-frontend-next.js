"use client";

import { useEffect } from "react";
import { trackGoogleEvent } from "@/lib/analytics";

export default function CustomerDashboardAnalytics({
  userId,
}: {
  userId: string;
}) {
  useEffect(() => {
    trackGoogleEvent("customer_dashboard_view", {
      page_type: "customer_dashboard",
      user_id: userId,
    });
  }, [userId]);

  return null;
}