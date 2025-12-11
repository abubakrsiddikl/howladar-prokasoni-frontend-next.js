"use client";

import ClearFiltersButton from "@/components/shared/Management/ClearFiltersButton";
import RefreshButton from "@/components/shared/Management/RefreshButton";
import SearchFilter from "@/components/shared/Management/SearchFilter";

const AuthorFilters = () => {
  return (
    <div className="space-y-3">
      {/* Row 1: Search and Refresh */}
      <div className="flex items-center gap-3">
        <SearchFilter paramName="searchTerm" placeholder="Search b by Author Name" />
        <RefreshButton />
      </div>

      {/* Row 2: Filter Controls - All on same line */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Clear All Filters */}
        <ClearFiltersButton />
      </div>
    </div>
  );
};

export default AuthorFilters;
