import BannerManagementHeader from "@/components/module/StoreManagement/Banner/BannerManagementHeader";
import BannersTable from "@/components/module/StoreManagement/Banner/BannersTable";
import TablePagination from "@/components/shared/Management/TablePagination";
import { TableSkeleton } from "@/components/shared/Management/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatter";
import { getAllBanners } from "@/services/Banner/banner.api";
import { Suspense } from "react";

export default async function BannerPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const banners = await getAllBanners(queryString);
  return (
    <div>
      <BannerManagementHeader></BannerManagementHeader>
      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        <BannersTable banners={banners?.data || []}></BannersTable>
        <TablePagination
          currentPage={banners?.meta?.page || 1}
          totalPages={banners?.meta?.totalPage || 1}
        />
      </Suspense>
    </div>
  );
}
