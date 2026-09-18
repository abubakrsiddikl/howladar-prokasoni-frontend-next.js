"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackGoogleEvent } from "@/lib/analytics";

export default function GoogleAnalyticsPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;

    const query = searchParams.toString();
    const pageLocation = `${window.location.origin}${pathname}${query ? `?${query}` : ""}`;

    trackGoogleEvent("page_view", {
      page_title: document.title,
      page_location: pageLocation,
      page_path: `${pathname}${query ? `?${query}` : ""}`,
    });
  }, [pathname, searchParams]);

  return null;
}