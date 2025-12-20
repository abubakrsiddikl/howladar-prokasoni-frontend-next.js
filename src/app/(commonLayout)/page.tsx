import Banner from "@/components/module/Banner/Banner";
import GenreWiseBooks from "@/components/module/Book/GenreWiseBook/GenreWiseBooks";
import { Metadata } from "next";

const SITE_LOGO_URL = "https://howladarporkasoni.com.bd/logo.jpg";
const CONTACT_NUMBER = "+8801936582963";

// generate metadata
export const metadata: Metadata = {
  title:
    "হাওলাদার প্রকাশনী | অনলাইনে বই কিনুন: হাওলাদার প্রকাশনী | সেরা সাহিত্য, উপন্যাস, কবিতা ও ধর্মীয় বই",
  description:
    "হাওলাদার প্রকাশনীতে হাজারো বইয়ের বিশাল সংগ্রহ থেকে আপনার পছন্দের বইটি অনলাইনে কিনুন। দ্রুততম সময়ে সারা বাংলাদেশে ক্যাশ অন ডেলিভারি সুবিধা। আধুনিক সাহিত্য, ক্লাসিক উপন্যাস, অনুপ্রেরণামূলক বই ও শিক্ষামূলক প্রকাশনা।",
  alternates: {
    canonical: "https://howladarporkasoni.com.bd",
  },
  keywords: [
    "হাওলাদার প্রকাশনী",
    "অনলাইনে বই কিনুন",
    "সেরা দামে বই",
    "উপন্যাস",
    "কবিতা",
    "ইসলামিক বই",
    "ধর্মীয় বই",
    "বাংলা সাহিত্য",
    "বইয়ের দোকান অনলাইন",
    "ক্যাশ অন ডেলিভারি বই",
  ],

  // Open Graph (OG) বা Social Media Tags
  openGraph: {
    title:
      "হাওলাদার প্রকাশনী | হাওলাদার প্রকাশনী - অনলাইনে বই কিনুন | সাহিত্য ও নতুন বই",
    description:
      "সেরা দামে নতুন বইয়ের জন্য হাওলাদার প্রকাশনীই আপনার একমাত্র ঠিকানা। দ্রুত ডেলিভারি, সারা দেশ থেকে অর্ডার করুন।",
    url: "https://howladarporkasoni.com.bd",
    siteName: "হাওলাদার প্রকাশনী",
    images: [
      {
        url: SITE_LOGO_URL,
        width: 1200,
        height: 630,
        alt: "হাওলাদার প্রকাশনী লোগো ও ব্যানার",
      },
    ],
    type: "website",
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "হাওলাদার প্রকাশনী: অনলাইনে বইয়ের সেরা প্ল্যাটফর্ম",
    description:
      "বাংলা সাহিত্য, উপন্যাস, কবিতা ও ধর্মীয় বই কিনুন। দ্রুততম হোম ডেলিভারি।",
    images: [SITE_LOGO_URL],
  },
};

// json ld
const generateHomeSchema = () => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      // WebSite Schema (Google Sitelinks Searchbox এর জন্য)
      {
        "@type": "WebSite",
        url: "https://howladarporkasoni.com.bd/",
        potentialAction: {
          "@type": "SearchAction",
          target:
            "https://howladarporkasoni.com.bd/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      // Organization Schema (আপনার ব্যবসার তথ্য)
      {
        "@type": "Organization",
        name: "হাওলাদার প্রকাশনী",
        url: "https://howladarporkasoni.com.bd/",
        logo: SITE_LOGO_URL,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          telephone: CONTACT_NUMBER,
        },
      },
    ],
  };
};

export default function HomePage() {
  const homeSchema = generateHomeSchema();
  return (
    <>
      {/*  JSON-LD Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <div>
        <Banner></Banner>
        <GenreWiseBooks></GenreWiseBooks>
      </div>
    </>
  );
}
