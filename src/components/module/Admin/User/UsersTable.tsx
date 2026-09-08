"use client";

import ManagementTable from "@/components/shared/Management/ManagementTable";
import type { IUser } from "@/types";

import { userColumns } from "./userColumns";

const UsersTable = ({ users }: { users: IUser[] }) => (
  <ManagementTable
    data={users}
    columns={userColumns}
    getRowKey={(user) => user._id}
    emptyMessage="No users found"
  />
);

export default UsersTable;