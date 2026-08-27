/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}

interface MetaPixelEventProps {
  eventName: string;
  data?: Record<string, any>;
}

export default function MetaPixelEvent({
  eventName,
  data,
}: MetaPixelEventProps) {
  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", eventName, data);
    }
  }, [eventName, data]);

  return null;
}

export const trackMetaEvent = (
  eventName: string,
  data?: Record<string, any>,
) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, data);
  }
};