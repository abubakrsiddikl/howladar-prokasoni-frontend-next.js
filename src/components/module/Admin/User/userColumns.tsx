import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Column } from "@/components/shared/Management/ManagementTable";
import type { IUser } from "@/types";
import { format } from "date-fns";

import UserRoleSelect from "./UserRoleSelect";

export const userColumns: Column<IUser>[] = [
  {
    header: "User",
    accessor: (row) => (
      <div className="flex min-w-[220px] items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={row.picture || undefined} alt={row.name} />
          <AvatarFallback>{row.name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate font-medium">{row.name}</p>
          <p className="truncate text-sm text-muted-foreground">{row.email}</p>
        </div>
      </div>
    ),
    className: "p-2",
  },
  {
    header: "Phone",
    accessor: (row) => row.phone || "N/A",
    className: "p-2 min-w-[140px]",
  },
  {
    header: "Role",
    accessor: (row) => <UserRoleSelect userId={row._id} role={row.role} />,
    className: "p-2 min-w-[180px]",
  },
  {
    header: "Status",
    accessor: (row) => (
      <span
        className={row.isActive === "ACTIVE" ? "text-green-600" : "text-red-500"}
      >
        {row.isActive === "ACTIVE" ? "Active" : "Inactive"}
      </span>
    ),
    className: "p-2",
  },
  {
    header: "Joined Date",
    accessor: (row) =>
      row.createdAt ? format(new Date(row.createdAt), "MMM dd, yyyy") : "N/A",
    className: "p-2 min-w-[130px]",
  },
];