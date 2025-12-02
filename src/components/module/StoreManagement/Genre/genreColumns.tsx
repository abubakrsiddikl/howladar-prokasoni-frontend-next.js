import { Column } from "@/components/shared/Management/ManagementTable";
import { IGenre } from "@/types";

export const genreColumns: Column<IGenre>[] = [
  {
    header: "Genre Name",
    accessor: "name",
    className: "p-2 min-w-[200px] font-medium",
  },
];
