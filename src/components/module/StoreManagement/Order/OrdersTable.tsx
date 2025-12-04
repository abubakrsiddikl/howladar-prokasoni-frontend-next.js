"use client";

import ManagementTable from "@/components/shared/Management/ManagementTable";

import { IOrder, IUser } from "@/types";
import { getOrderColumns } from "./orderColumns";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

interface OrdersTableProps {
  orders: IOrder[];
  user: IUser;
}

const OrdersTable = ({ orders, user }: OrdersTableProps) => {
  const [, startTransition] = useTransition();
  const router = useRouter();
  const orderColumns = getOrderColumns(user);
  const handleView = (order: IOrder) => {
    startTransition(() => {
      router.push(`/order/${order.orderId}`);
    });
  };
  return (
    <>
      <ManagementTable
        data={orders}
        columns={orderColumns}
        getRowKey={(order) => order._id!}
        onView={handleView}
        emptyMessage="No Orders found"
      />

      {/* View Doctor Detail Dialog
      <DoctorViewDetailDialog
        open={!!viewingBanner}
        onClose={() => setViewingBanner(null)}
        doctor={viewingBanner}
      /> */}
    </>
  );
};

export default OrdersTable;
