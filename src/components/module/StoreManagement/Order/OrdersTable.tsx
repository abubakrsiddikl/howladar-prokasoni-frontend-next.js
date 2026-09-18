"use client";

import ManagementTable from "@/components/shared/Management/ManagementTable";

import { IOrder, IUser } from "@/types";
import { getOrderColumns } from "./orderColumns";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { userRoleConstant } from "@/constant/role";
import CustomOrderFormDialog from "./CustomOrderFormDialog";

interface OrdersTableProps {
  orders: IOrder[];
  user: IUser;
}

const OrdersTable = ({ orders, user }: OrdersTableProps) => {
  const [, startTransition] = useTransition();
  const router = useRouter();
  const [isCustomOrderOpen, setIsCustomOrderOpen] = useState(false);
  const orderColumns = getOrderColumns(user);
  const canCreateCustomOrder =
    user.role === userRoleConstant.ADMIN ||
    user.role === userRoleConstant.STORE_MANAGER;
  const handleView = (order: IOrder) => {
    startTransition(() => {
      router.push(`/order/${order.orderId}`);
    });
  };
  return (
    <>
      {canCreateCustomOrder && (
        <div className="flex justify-end">
          <Button onClick={() => setIsCustomOrderOpen(true)}>
            <Plus className="h-4 w-4" />
            Create Custom Order
          </Button>
        </div>
      )}
      <ManagementTable
        data={orders}
        columns={orderColumns}
        getRowKey={(order) => order._id!}
        onView={handleView}
        emptyMessage="No Orders found"
      />
      <CustomOrderFormDialog
        open={isCustomOrderOpen}
        onClose={() => setIsCustomOrderOpen(false)}
        onSuccess={() => router.refresh()}
      />
    </>
  );
};

export default OrdersTable;
