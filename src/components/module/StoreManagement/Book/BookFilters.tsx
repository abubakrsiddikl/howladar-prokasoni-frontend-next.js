"use client";

import ClearFiltersButton from "@/components/shared/Management/ClearFiltersButton";
import MultiSelectFilter from "@/components/shared/Management/MultiSelectFilter";
import RefreshButton from "@/components/shared/Management/RefreshButton";
import SearchFilter from "@/components/shared/Management/SearchFilter";
import { IGenre } from "@/types";

interface BooksFilterProps {
  genres: IGenre[];
}

const BookFilters = ({ genres }: BooksFilterProps) => {
  return (
    <div className="space-y-3">
      {/* Row 1: Search and Refresh */}
      <div className="flex items-center gap-3">
        <SearchFilter paramName="searchTerm" placeholder="Search Books..." />
        <RefreshButton />
      </div>

      {/* Row 2: Filter Controls - All on same line */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Specialties Multi-Select */}
        <MultiSelectFilter
          paramName="genre"
          options={genres.map((genre) => ({
            value: genre.name,
            label: genre.name,
          }))}
          placeholder="Select genres"
          searchPlaceholder="Search genres..."
          emptyMessage="No specialty found."
          showBadges={false}
        />

        {/* Clear All Filters */}
        <ClearFiltersButton />
      </div>
    </div>
  );
};

export default BookFilters;
