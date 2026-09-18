export interface AnalyticsItem {
  item_id: string;
  item_name: string;
  price?: number;
  quantity?: number;
  item_category?: string;
  item_brand?: string;
}

type AnalyticsValue = string | number | boolean | AnalyticsItem[];
type AnalyticsParams = Record<string, AnalyticsValue | undefined>;

declare global {
  interface Window {
    dataLayer: Array<unknown>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackGoogleEvent(
  eventName: string,
  params: AnalyticsParams = {},
) {
  if (typeof window === "undefined" || !window.gtag) return;

  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined),
  );

  window.gtag("event", eventName, cleanParams);
}

export function getAnalyticsItem(book: {
  _id: string;
  title: string;
  price: number;
  discountedPrice?: number;
  genre?: { name: string };
  author?: { name: string };
}): AnalyticsItem {
  return {
    item_id: book._id,
    item_name: book.title,
    price: book.discountedPrice || book.price,
    item_category: book.genre?.name,
    item_brand: book.author?.name,
  };
}