// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "admin/dashboard/",
          "store-manager/dashboard/",
          "customer/dashboard/",
          "/order",
          "/api/",
        ],
      },
    ],
    sitemap: "https://howladarporkasoni.com.bd/sitemap.xml",
  };
}
