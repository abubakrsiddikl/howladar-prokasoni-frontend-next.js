import CategoryCard from "@/components/module/Category/CategoryCard";
import CategoryHeaderSection from "@/components/module/Category/CategoryHeaderSection";
import SearchFilter from "@/components/shared/Management/SearchFilter";
import TablePagination from "@/components/shared/Management/TablePagination";
import { Button } from "@/components/ui/button";
import { queryStringFormatter } from "@/lib/formatter";
import { getAllGenres } from "@/services/Genre/genre.api";
import { IGenre } from "@/types";
import { Metadata } from "next";

// generate metadata
export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  // ডাইনামিক পেজিনেশন হ্যান্ডেল করুন
  const page = parseInt((searchParams.page as string) || "1");
  const pageTitle =
    page > 1 ? `বইয়ের ক্যাটাগরি - পাতা ${page}` : `বইয়ের ক্যাটাগরি`;

  const title = `${pageTitle} | হাওলাদার প্রকাশনী`;
  const description =
    "আমাদের প্রকাশিত সমস্ত বইয়ের ক্যাটাগরি এবং জেনার দেখুন। গল্প, কবিতা, উপন্যাস, বিজ্ঞান ও আরও অনেক কিছু।";
  const url = `https://howladarporkasoni.com.bd/category?page=${page}`;

  return {
    title: title,
    description: description,
    alternates: {
      canonical: url,
    },
    keywords: [
      "বইয়ের ক্যাটাগরি",
      "জেনার",
      "পুস্তক তালিকা",
      "হাওলাদার প্রকাশনী",
      "উপন্যাস",
      "কবিতা",
    ],

    // Open Graph (OG) বা Facebook মেটাডেটা
    openGraph: {
      title: title,
      description: description,
      url: url,
      siteName: "হাওলাদার প্রকাশনী",
      images: [{ url: "/og-image-default.jpg", alt: "বইয়ের ক্যাটাগরি" }], // একটি ডিফল্ট OG ইমেজ ব্যবহার করুন
      type: "website",
    },
  };
}

// json ld
const generateCategoriesSchema = (genres: IGenre[]) => {

  return {
    "@context": "http://schema.org",
    "@type": "CollectionPage", // অথবা WebPage
    name: "বইয়ের সমস্ত ক্যাটাগরি এবং জেনার",
    description: "আমাদের প্রকাশিত সমস্ত বইয়ের জেনার এবং ক্যাটাগরি তালিকা।",
    url: "https://howladarporkasoni.com.bd/category",
    mainEntity: {
      "@type": "ItemList",
      name: "বইয়ের ক্যাটাগরি তালিকা",
      numberOfItems: genres.length, // এই পেজে দেখানো আইটেম সংখ্যা
      itemListElement: genres.map((genre, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://howladarporkasoni.com.bd/category/${genre.slug}`, // আপনার ক্যাটাগরি ডিটেইল পেজের লিংক
        name: genre.name,
      })),
    },
  };
};

export default async function CategoryPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const category = await getAllGenres(queryString);
  const categoriesSchema = generateCategoriesSchema(category?.data || []);
  return (
    <div className="max-w-11/12 mx-auto  bg-[#eeeeee]">
      {/* JSON-LD Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoriesSchema) }}
      />
      {/* 1. Header and Breadcrumb */}
      <CategoryHeaderSection />
      <div className=" bg-white p-2">
        {/* 2. Controls and Filtering */}
        <div className="flex items-center gap-4">
          <SearchFilter
            paramName="searchTerm"
            placeholder="ক্যাটাগরি নাম দিয়ে সার্চ করুন "
          />
          <Button>Search</Button>
        </div>

        {/* 3. Content Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {category?.data.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
        <TablePagination
          currentPage={category?.meta?.page as number}
          totalPages={category?.meta?.totalPage as number}
        ></TablePagination>
      </div>
    </div>
  );
}
