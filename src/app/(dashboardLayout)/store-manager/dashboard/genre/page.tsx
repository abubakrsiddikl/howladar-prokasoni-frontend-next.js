import GenresManagementHeader from "@/components/module/StoreManagement/Genre/GenreManagementHeader";
import GenresTable from "@/components/module/StoreManagement/Genre/GenreTable";
import TablePagination from "@/components/shared/Management/TablePagination";
import { TableSkeleton } from "@/components/shared/Management/TableSkeleton";
import { getAllGenres } from "@/services/Genre/genre.api";
import React, { Suspense } from "react";

export default async function BookGenrePage() {
  const genres = await getAllGenres();
  return (
    <div>
      <GenresManagementHeader></GenresManagementHeader>
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
