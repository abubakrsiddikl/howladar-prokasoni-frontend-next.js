
import SearchFilter from "@/components/shared/Management/SearchFilter";
import SelectFilter from "@/components/shared/Management/SelectFilter";
import TablePagination from "@/components/shared/Management/TablePagination";
import { TableSkeleton } from "@/components/shared/Management/TableSkeleton";
import UsersTable from "@/components/module/Admin/User/UsersTable";
import { queryStringFormatter } from "@/lib/formatter";
import { getAllUsers } from "@/services/Auth/auth.api";
import { Suspense } from "react";

const roleOptions = [
  { label: "Admin", value: "ADMIN" },
  { label: "Store Manager", value: "STORE_MANAGER" },
  { label: "Customer", value: "CUSTOMER" },
];

export default async function UserPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const users = await getAllUsers(queryString);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="mt-1 text-muted-foreground">
          Manage users and update their access roles
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchFilter placeholder="Search by name, email or phone..." />
        <SelectFilter
          paramName="role"
          placeholder="Filter by role"
          options={roleOptions}
        />
      </div>

      <Suspense fallback={<TableSkeleton columns={5} rows={10} />}>
        <UsersTable users={users.data || []} />
        <TablePagination
          currentPage={users.meta?.page || 1}
          totalPages={users.meta?.totalPage || 1}
        />
      </Suspense>
    </div>
  );
}
