// orderColumns.ts

import { Column } from "@/components/shared/Management/ManagementTable";
import { userRoleConstant } from "@/constant/role";
import type { IOrder, IUser } from "@/types";
import { format } from "date-fns";

export const getOrderColumns = (user: IUser | undefined): Column<IOrder>[] => {
  const isManagerOrAdmin =
    user?.role === userRoleConstant.ADMIN ||
    user?.role === userRoleConstant.STORE_MANAGER;

  const baseColumns: Column<IOrder>[] = [
    {
      header: "Date",
      accessor: (row: IOrder) =>
        row.orderStatusLog?.[0]?.timestamp
          ? format(new Date(row.orderStatusLog[0].timestamp), "MMM dd, yyyy")
          : "N/A",
      sortKey: "createdAt",
      className: "p-2 min-w-[120px]",
    },
    {
      header: "Order ID",
      accessor: "orderId",
      className: "p-2 font-medium min-w-[150px]",
    },
    {
      header: "Status",
      accessor: "currentStatus",
      className: "p-2",
    },
    {
      header: "Payment Method",
      accessor: "paymentMethod",
      className: "p-2",
    },
  ];

  if (isManagerOrAdmin) {
    baseColumns.push({
      header: "Payment Status",
      accessor: "paymentStatus",
      className: "p-2",
    });
  }

  return baseColumns;
};
