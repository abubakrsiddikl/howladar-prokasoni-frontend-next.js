import CampaignManagementHeader from "@/components/module/StoreManagement/Campaign/CampaignManagementHeader";
import CampaignTable from "@/components/module/StoreManagement/Campaign/CampaignTable";
import TablePagination from "@/components/shared/Management/TablePagination";
import { TableSkeleton } from "@/components/shared/Management/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatter";
import { getAllCampaigns } from "@/services/Campaign/campaign.api";
import { Suspense } from "react";

export default async function CampaignManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const campaigns = await getAllCampaigns(queryString);

  return (
    <div>
      <CampaignManagementHeader></CampaignManagementHeader>
      <Suspense fallback={<TableSkeleton columns={6} rows={10} />}>
        <CampaignTable campaigns={campaigns?.data || []} />
        <TablePagination
          currentPage={campaigns?.meta?.page || 1}
          totalPages={campaigns?.meta?.totalPage || 1}
        />
      </Suspense>
    </div>
  );
}
