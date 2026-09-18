"use client";

import { useEffect, type ReactNode } from "react";
import { trackGoogleEvent } from "@/lib/analytics";

interface CampaignAnalyticsProps {
  campaignId: string;
  campaignName: string;
  campaignPrice: number;
}

export function CampaignAnalytics({
  campaignId,
  campaignName,
  campaignPrice,
}: CampaignAnalyticsProps) {
  useEffect(() => {
    trackGoogleEvent("view_item", {
      currency: "BDT",
      value: campaignPrice,
      items: [{
        item_id: campaignId,
        item_name: campaignName,
        price: campaignPrice,
        quantity: 1,
        item_category: "campaign",
      }],
    });
    trackGoogleEvent("campaign_view", {
      campaign_id: campaignId,
      campaign_name: campaignName,
      value: campaignPrice,
      currency: "BDT",
    });
  }, [campaignId, campaignName, campaignPrice]);

  return null;
}

export function CampaignCta({
  campaignId,
  campaignName,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  campaignId: string;
  campaignName: string;
  children: ReactNode;
}) {
  return (
    <a
      {...props}
      onClick={(event) => {
        props.onClick?.(event);
        if (!event.defaultPrevented) {
          trackGoogleEvent("campaign_cta_click", {
            campaign_id: campaignId,
            campaign_name: campaignName,
            cta_location: props.className?.includes("fixed")
              ? "mobile_sticky"
              : "hero_price_card",
          });
        }
      }}
    >
      {children}
    </a>
  );
}