import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import LoginSuccessToast from "@/components/shared/LoginSuccessToast";
import LogoutSuccessToast from "@/components/shared/LogoutSuccessToast";
import { CartProvider } from "@/context/cart/CartContext";
import { Suspense } from "react";
import Script from "next/script";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://howladarporkasoni.com.bd"),

  title: {
    default: "হাওলাদার প্রকাশনী | Howladar Prokasoni",
    template: "%s | Howladar Prokasoni",
  },

  description:
    "হাওলাদার প্রকাশনী — অনলাইন বইয়ের বাজার। উপন্যাস, ইসলামিক ও শিক্ষাসাহিত্য কিনুন সহজে। সারা বাংলাদেশে হোম ডেলিভারি।",

  keywords: [
    "হাওলাদার প্রকাশনী",
    "Howladar Prokasoni",
    "Howladar Publication",
    "বাংলা বই অনলাইন",
    "Bangla Book Shop",
    "Online Book Store Bangladesh",
    "বাংলাদেশে বই কিনুন",
    "ইসলামিক বই বাংলাদেশ",
    "উপন্যাস বই",
    "শিক্ষামূলক বই",
    "বাংলা সাহিত্য",
    "বইয়ের দোকান",
    "বই কিনুন অনলাইন",
    "Book Shop BD",
    "Bangla Islamic Book",
    "Howladar Prokasoni Book Store",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "হাওলাদার প্রকাশনী | Howladar Prokasoni",
    description:
      "বাংলাদেশের নির্ভরযোগ্য অনলাইন বইয়ের দোকান। উপন্যাস, ইসলামিক ও শিক্ষাসাহিত্য এক জায়গায়।",
    url: "https://howladarporkasoni.com.bd",
    siteName: "হাওলাদার প্রকাশনী",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "হাওলাদার প্রকাশনী",
      },
    ],
    locale: "bn_BD",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "হাওলাদার প্রকাশনী | Howladar Prokasoni",
    description:
      "বাংলাদেশের অনলাইন বইয়ের দোকান — উপন্যাস, ইসলামিক ও শিক্ষাসাহিত্য।",
    images: ["/og-default.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    google: "921120890d4fa05e",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* meta pixel */}
        {/*  Meta Pixel Script */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '2579894919046283');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        {/* 🔵 Meta Pixel NoScript */}
        <noscript>
          <Image
            height={1}
            width={1}
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2579894919046283&ev=PageView&noscript=1"
            alt="meta-pixel"
          />
        </noscript>
        <CartProvider>{children}</CartProvider>

        <Toaster position="top-center" richColors></Toaster>
        <Suspense fallback={null}>
          <LoginSuccessToast></LoginSuccessToast>
          <LogoutSuccessToast></LogoutSuccessToast>
        </Suspense>
      </body>
    </html>
  );
}
