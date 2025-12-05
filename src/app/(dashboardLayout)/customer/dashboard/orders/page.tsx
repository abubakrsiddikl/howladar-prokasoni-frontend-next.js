import OrdersTable from "@/components/module/StoreManagement/Order/OrdersTable";
import TablePagination from "@/components/shared/Management/TablePagination";
import { TableSkeleton } from "@/components/shared/Management/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatter";
import { getUserProfile } from "@/services/Auth/auth.api";
import { getCustomerOrders } from "@/services/Order/order.api";
import { Suspense } from "react";

export default async function CustomerOrderPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const user = await getUserProfile();
  const orders = await getCustomerOrders(queryString);
  return (
    <div>
      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        <OrdersTable orders={orders?.data || []} user={user || {}} />
      </Suspense>
    </div>
  );
}
