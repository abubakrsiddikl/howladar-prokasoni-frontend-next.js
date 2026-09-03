// import CampaignCheckoutForm from "@/components/module/Checkout/CampaignCheckoutForm";
// import MetaPixelEvent from "@/components/shared/MetaPixelEvent";
// import { getSingleCampaign } from "@/services/Campaign/campaign.api";
// import Image from "next/image";

// export default async function CampaignPage(props: {
//   params: Promise<{ slug: string }>;
// }) {

//   const { slug } = await props.params;
//   const campaign = await getSingleCampaign(slug);
//   // console.log("single",campaign)

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">

//        {/* Meta Pixel - View Content */}
//       <MetaPixelEvent
//         eventName="ViewContent"
//         data={{
//           content_ids: campaign._id ? [campaign._id] : [],
//           content_name: campaign.title,
//           content_type: "product",
//           value: campaign.campaignPrice,
//           currency: "BDT",
//         }}
//       />
//       <div className="max-w-4xl mx-auto space-y-6">
//         {/* Campaign Banner & Details Card */}
//         <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
//           <div className="relative w-full h-64 md:h-96">
//             <Image
//               src={campaign.bannerImage}
//               alt={campaign.title}
//               fill
//               className="object-cover"
//               priority
//             />
//           </div>

//           <div className="p-6 space-y-3">
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
//               {campaign.title}
//             </h1>
//             <p className="text-gray-600 leading-relaxed">
//               {campaign.description}
//             </p>

//             {/* Pricing Tag */}
//             <div className="flex items-center gap-3 pt-2">
//               <span className="text-3xl font-extrabold text-blue-600">
//                 ৳ {campaign.campaignPrice}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Dynamic Guest Checkout Form */}
//         <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-gray-100">
//           <div className="border-b pb-4 mb-6">
//             <h2 className="text-xl font-bold text-gray-900">
//               অর্ডারটি সম্পন্ন করতে আপনার তথ্য দিন
//             </h2>
//             <p className="text-sm text-gray-500">
//               কোনো অ্যাকাউন্ট খোলার প্রয়োজন নেই। ফর্মটি পূরণ করলেই ক্যাশ অন
//               ডেলিভারিতে অর্ডার কনফার্ম হবে।
//             </p>
//           </div>

//           <CampaignCheckoutForm campaign={campaign} />
//         </div>
//       </div>
//     </div>
//   );
// }

import CampaignCheckoutForm from "@/components/module/Checkout/CampaignCheckoutForm";
import MetaPixelEvent from "@/components/shared/MetaPixelEvent";
import { getSingleCampaign } from "@/services/Campaign/campaign.api";
import Image from "next/image";
import { Truck, ShieldCheck, BadgeCheck, Clock } from "lucide-react";
import { Metadata } from "next";

// metadata generate
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const campaign = await getSingleCampaign(slug);
  const url = `https://howladarporkasoni.com.bd/campaign/${slug}`;

  return {
    title: campaign.title,
    description: campaign.description,

    openGraph: {
      title: campaign.title,
      url: url,
      siteName: "হাওলাদার প্রকাশনী",
      description: campaign.description,
      images: [
        {
          url: campaign.bannerImage,
          width: 1200,
          height: 630,
          alt: campaign.title,
        },
      ],
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: campaign.title,
      description: campaign.description,
      images: [campaign.bannerImage],
    },

    robots: {
      index: true,
      follow: true,
    },
    alternates:{
      canonical: url
    }
  };
}

// page
export default async function CampaignPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  const campaign = await getSingleCampaign(slug);

  // 🎯 JSON-LD Schema for E-commerce Product / Offer
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: campaign.title,
    image: [campaign.bannerImage],
    description: campaign.description,
    offers: {
      "@type": "Offer",
      url: `https://howladarporkasoni.com.bd/campaign/${slug}`,
      priceCurrency: "BDT",
      price: campaign.campaignPrice,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      {/* 🚀 JSON-LD Script for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Meta Pixel - View Content */}
      <MetaPixelEvent
        eventName="ViewContent"
        data={{
          content_ids: campaign._id ? [campaign._id] : [],
          content_name: campaign.title,
          content_type: "product",
          value: campaign.campaignPrice,
          currency: "BDT",
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 md:pb-12 pt-6 md:pt-10">
        {/* Hero banner */}
        <div className="relative">
          <div className="relative w-full h-72 md:h-[28rem] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={campaign.bannerImage}
              alt={campaign.title}
              fill
              className=""
              priority
            />
            {/* Gradient wash keeps title/badge legible on any photo */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            {/* Urgency badge */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-[#E8483A] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md animate-pulse">
              <Clock className="w-3.5 h-3.5" />
              সীমিত সময়ের অফার
            </div>

            <h1 className="absolute bottom-8 left-6 right-6 text-2xl md:text-4xl font-bold text-white drop-shadow-md leading-tight">
              {campaign.title}
            </h1>
          </div>

          {/* Overlapping price card — signature element.
              Bridges the banner and the body so price + CTA
              stay visible the moment the page paints. */}
          <div className="relative -mt-8 mx-4 md:mx-8 z-10">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 px-5 py-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-0.5">মূল্য</p>
                <span className="text-3xl md:text-4xl font-extrabold text-[#0F6F5C]">
                  ৳{campaign.campaignPrice}
                </span>
              </div>
              <a
                href="#checkout-form"
                className="shrink-0 bg-[#0F6F5C] hover:bg-[#0C5A4A] transition-colors text-white font-semibold px-5 py-3 rounded-xl text-sm md:text-base"
              >
                এখনই অর্ডার করুন
              </a>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-4">
          <p className="text-gray-700 leading-relaxed">
            {campaign.description}
          </p>

          {/* Trust row — the three things a COD buyer checks
              before handing over their phone number. Swap labels
              for whatever's actually true of your fulfillment. */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <TrustBadge
              icon={<Truck className="w-5 h-5" />}
              label="ক্যাশ অন ডেলিভারি"
            />
            <TrustBadge
              icon={<ShieldCheck className="w-5 h-5" />}
              label="১০০% অরিজিনাল"
            />
            <TrustBadge
              icon={<BadgeCheck className="w-5 h-5" />}
              label="সহজ রিটার্ন"
            />
          </div>
        </div>

        {/* Checkout form */}
        <div
          id="checkout-form"
          className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 scroll-mt-6"
        >
          <div className="border-b border-gray-100 pb-4 mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              অর্ডারটি সম্পন্ন করতে আপনার তথ্য দিন
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              কোনো অ্যাকাউন্ট খোলার প্রয়োজন নেই। ফর্মটি পূরণ করলেই ক্যাশ অন
              ডেলিভারিতে অর্ডার কনফার্ম হবে।
            </p>
          </div>

          <CampaignCheckoutForm campaign={campaign} />
        </div>
      </div>

      {/* Sticky mobile CTA — plain CSS + anchor scroll, no client
          component needed, so the page can stay async/server. */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between shadow-[0_-4px_12px_rgba(0,0,0,0.06)] z-20">
        <div>
          <p className="text-[11px] text-gray-500">মূল্য</p>
          <span className="text-lg font-bold text-[#0F6F5C]">
            ৳{campaign.campaignPrice}
          </span>
        </div>
        <a
          href="#checkout-form"
          className="bg-[#E8483A] text-white font-semibold px-6 py-3 rounded-xl text-sm"
        >
          অর্ডার করুন
        </a>
      </div>
    </div>
  );
}

function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 text-center py-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
      <span className="text-[#0F6F5C]">{icon}</span>
      <span className="text-[11px] font-medium text-gray-700 leading-tight">
        {label}
      </span>
    </div>
  );
}
