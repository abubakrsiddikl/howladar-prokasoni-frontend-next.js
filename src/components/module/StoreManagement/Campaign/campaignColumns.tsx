import Image from "next/image";
import { format } from "date-fns";

import { Column } from "@/components/shared/Management/ManagementTable";
import type { ICampaign } from "@/types";
import Link from "next/link";

export const campaignColumns: Column<ICampaign>[] = [
  {
    header: "Image",
    accessor: (row) => (
      <Image
        src={row.bannerImage || "/placeholder.png"}
        alt={row.title}
        height={64}
        width={96}
        className="h-16 w-24 rounded object-cover"
      />
    ),
    className: "p-2 w-[120px]",
  },
  {
    header: "Title",
    accessor: (row: ICampaign) => (
      <Link
        href={`/campaign/${row.slug}`}
        className="hover:text-blue-700 hover:underline font-medium"
      >
        {row.title}
      </Link>
    ),
    className: "p-2 min-w-[220px] font-medium",
  },
  {
    header: "Price",
    accessor: (row) => `৳ ${row.campaignPrice}`,
    // sortKey: "campaignPrice",
    className: "p-2",
  },
  {
    header: "Active",
    accessor: (row) => (
      <span
        className={row.isActive ? "text-green-600 font-medium" : "text-red-500"}
      >
        {row.isActive ? "Active" : "Inactive"}
      </span>
    ),
    // sortKey: "isActive",
    className: "p-2",
  },
  {
    header: "Created Date",
    accessor: (row) =>
      row.createdAt ? format(new Date(row.createdAt), "MMM dd, yyyy") : "N/A",
    // sortKey: "createdAt",
    className: "p-2",
  },
];
