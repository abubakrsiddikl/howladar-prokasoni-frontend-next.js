import GenreFilters from "@/components/module/StoreManagement/Genre/GenreFilters";
import GenresManagementHeader from "@/components/module/StoreManagement/Genre/GenreManagementHeader";
import GenresTable from "@/components/module/StoreManagement/Genre/GenreTable";
import TablePagination from "@/components/shared/Management/TablePagination";
import { TableSkeleton } from "@/components/shared/Management/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatter";
import { getAllGenres } from "@/services/Genre/genre.api";
import { Suspense } from "react";

export default async function BookGenrePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const genres = await getAllGenres(queryString);

  return (
    <div className="space-y-4">
      <GenresManagementHeader></GenresManagementHeader>
      <GenreFilters></GenreFilters>
      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        <GenresTable genres={genres?.data || []} />
        <TablePagination
          currentPage={genres?.meta?.page || 1}
          totalPages={genres.meta?.totalPage || 1}
        />
      </Suspense>
    </div>
  );
}
