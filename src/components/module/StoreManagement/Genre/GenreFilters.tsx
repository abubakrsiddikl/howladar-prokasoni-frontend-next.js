"use client";

import RefreshButton from "@/components/shared/Management/RefreshButton";
import SearchFilter from "@/components/shared/Management/SearchFilter";

const GenreFilters = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <SearchFilter paramName="searchTerm" placeholder="Search Category..." />
        <RefreshButton />
      </div>
    </div>
  );
};

export default GenreFilters;
