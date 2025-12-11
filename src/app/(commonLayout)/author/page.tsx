import AuthorCard from "@/components/module/Author/AuthorCard";
import HeaderSection from "@/components/module/Author/AuthorHeaderSection";
import SearchFilter from "@/components/shared/Management/SearchFilter";
import TablePagination from "@/components/shared/Management/TablePagination";
import { Button } from "@/components/ui/button";
import { queryStringFormatter } from "@/lib/formatter";
import { getAllAuthors } from "@/services/Author/author.api";

const AuthorsListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const authors = await getAllAuthors(queryString);
  return (
    <div className="max-w-11/12 mx-auto  bg-[#eeeeee]">
      {/* 1. Header and Breadcrumb */}
      <HeaderSection />
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
          {authors?.data.map((author) => (
            <AuthorCard key={author._id} author={author} />
          ))}
        </div>
        <TablePagination
          currentPage={authors?.meta?.page as number}
          totalPages={authors?.meta?.totalPage as number}
        ></TablePagination>
      </div>
    </div>
  );
};

export default AuthorsListPage;
