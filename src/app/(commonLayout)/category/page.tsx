import CategoryCard from "@/components/module/Category/CategoryCard";
import CategoryHeaderSection from "@/components/module/Category/CategoryHeaderSection";
import SearchFilter from "@/components/shared/Management/SearchFilter";
import TablePagination from "@/components/shared/Management/TablePagination";
import { Button } from "@/components/ui/button";
import { queryStringFormatter } from "@/lib/formatter";
import { getAllGenres } from "@/services/Genre/genre.api";

export default async function CategoryPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const category = await getAllGenres(queryString);

  return (
    <div className="max-w-11/12 mx-auto  bg-[#eeeeee]">
      {/* 1. Header and Breadcrumb */}
      <CategoryHeaderSection />
      <div className=" bg-white p-2">
        {/* 2. Controls and Filtering */}
        <div className="flex items-center gap-4">
          <SearchFilter
            paramName="searchTerm"
            placeholder="লেখকের নাম দিয়ে সার্চ করুন "
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
