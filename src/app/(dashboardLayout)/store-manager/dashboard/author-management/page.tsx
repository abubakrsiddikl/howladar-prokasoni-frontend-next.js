import AuthorFilters from "@/components/module/StoreManagement/Author/AuthorFilters";
import AuthorManagementHeader from "@/components/module/StoreManagement/Author/AuthorManagementHeader";
import AuthorsTable from "@/components/module/StoreManagement/Author/AuthorTable";
import TablePagination from "@/components/shared/Management/TablePagination";
import { TableSkeleton } from "@/components/shared/Management/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatter";
import { getAllAuthors } from "@/services/Author/author.api";
import { Suspense } from "react";

export default async function AuthorManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const authors = await getAllAuthors(queryString);
  // console.log(authors);
  return (
    <div className="space-y-4">
      <AuthorManagementHeader></AuthorManagementHeader>
      <AuthorFilters></AuthorFilters>
      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        <AuthorsTable authors={authors?.data || []} />
        <TablePagination
          currentPage={authors?.meta?.page || 1}
          totalPages={authors.meta?.totalPage || 1}
        />
      </Suspense>
    </div>
  );
}
