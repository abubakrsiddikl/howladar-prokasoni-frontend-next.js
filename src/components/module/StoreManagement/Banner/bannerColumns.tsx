import { Column } from "@/components/shared/Management/ManagementTable";
import type { IBanner } from "@/types";
import Image from "next/image";
import { format } from "date-fns";

export const bannerColumns: Column<IBanner>[] = [
  {
    header: "Image",

    accessor: (row: IBanner) => (
      <Image
        src={row.image || "/placeholder.png"}
        alt={row.title}
        height={64}
        width={48}
        className="h-16 w-12 rounded object-cover"
      />
    ),
    className: "p-2 w-[80px]",
  },
  {
    header: "Title",

    accessor: "title",

    className: "p-2 min-w-[200px] font-medium",
  },
  {
    header: "Active",

    accessor: (row: IBanner) => (
      <span
        className={row.active ? "text-green-600 font-medium" : "text-red-500"}
      >
        {row.active ? "Active" : "Inactive"}
      </span>
    ),
    sortKey: "active",
    className: "p-2",
  },
  {
    header: "Start Date",

    accessor: (row: IBanner) =>
      row.startDate ? format(new Date(row.startDate), "MMM dd, yyyy") : "N/A",
    sortKey: "startDate",
    className: "p-2",
  },
  {
    header: "End Date",

    accessor: (row: IBanner) =>
      row.endDate ? format(new Date(row.endDate), "MMM dd, yyyy") : "N/A",
    sortKey: "endDate",
    className: "p-2",
  },
];
