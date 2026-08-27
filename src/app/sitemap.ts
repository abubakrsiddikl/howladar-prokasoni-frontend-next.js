// app/sitemap.ts
import { MetadataRoute } from "next";
import { getAllBooks } from "@/services/Book/book.api";
import { IBook } from "@/types";
import { getAllActiveCampaigns } from "@/services/Campaign/campaign.api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const books = await getAllBooks("limit=3000");
  const campaigns = await getAllActiveCampaigns("limit=3000");

  const bookUrls: MetadataRoute.Sitemap = books?.data.map((book: IBook) => ({
    url: `https://howladarporkasoni.com.bd/book/${book.slug}`,
    lastModified: new Date(book.updatedAt!).toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // campaign urls
  const campaignUrls: MetadataRoute.Sitemap = campaigns?.data.map(
    (campaign) => ({
      url: `https://howladarporkasoni.com.bd/campaign/${campaign.slug}`,
      lastModified: new Date(campaign.updatedAt!).toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }),
  );

  return [
    {
      url: "https://howladarporkasoni.com.bd",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: "https://howladarporkasoni.com.bd/category",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://howladarporkasoni.com.bd/author",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...campaignUrls,
    ...bookUrls,
  ];
}
