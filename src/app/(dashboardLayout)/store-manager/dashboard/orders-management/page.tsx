import OrderFilters from "@/components/module/StoreManagement/Order/OrderFilters";
import OrdersTable from "@/components/module/StoreManagement/Order/OrdersTable";
import TablePagination from "@/components/shared/Management/TablePagination";
import { TableSkeleton } from "@/components/shared/Management/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatter";
import { getUserProfile } from "@/services/Auth/auth.api";
import { getAllOrders } from "@/services/Order/order.api";
import { Suspense } from "react";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  const user = await getUserProfile();
  const orders = await getAllOrders(queryString);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Order Management</h1>
      <OrderFilters></OrderFilters>
      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        <OrdersTable orders={orders?.data || []} user={user || {}} />
        <TablePagination
          currentPage={orders?.meta?.page || 1}
          totalPages={orders.meta?.totalPage || 1}
        />
      </Suspense>
    </div>
  );
}
