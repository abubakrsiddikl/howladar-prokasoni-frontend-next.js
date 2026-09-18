"use client";

import { useEffect } from "react";
import { trackGoogleEvent } from "@/lib/analytics";

export default function HomeAnalytics() {
  useEffect(() => {
    trackGoogleEvent("home_view", {
      page_type: "landing_page",
    });
  }, []);

  return null;
}