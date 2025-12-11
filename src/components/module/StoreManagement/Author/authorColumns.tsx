import { Column } from "@/components/shared/Management/ManagementTable";
import { IAuthor } from "@/types";
import Image from "next/image";
import Link from "next/link";

export const authorColumns: Column<IAuthor>[] = [
  {
    header: "Profile Image",
    accessor: (row: IAuthor) => (
      <Image
        src={row.profileImage || "/writer.png"}
        alt={row.name}
        height={64}
        width={64}
        className="h-16 w-16 rounded-full object-cover border"
      />
    ),
    className: "p-2 w-[100px]",
  },
  {
    header: "Author Name",
    accessor: (row: IAuthor) => (
      <Link
        href={`store-manager/dashboard/author-management`}
        className="hover:text-blue-700 hover:underline font-semibold"
      >
        {row.name}
      </Link>
    ),
    className: "p-2 min-w-[250px]",
  },
  {
    header: "Biography (Excerpt)",
    accessor: (row: IAuthor) => (
      <span className="text-gray-600 text-sm">
        {row.bio ? `${row.bio.substring(0, 80)}...` : "No bio provided"}
      </span>
    ),
    className: "p-2 min-w-[300px]",
  },
  {
    header: "Total Books",
    accessor: "totalBooks",
    className: "p-2 text-center font-medium",
  },
  {
    header: "Joined Date",
    accessor: (row: IAuthor) => {
      if (!row.createdAt) return "N/A";
      return new Date(row.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
    className: "p-2 text-sm",
  },
];
