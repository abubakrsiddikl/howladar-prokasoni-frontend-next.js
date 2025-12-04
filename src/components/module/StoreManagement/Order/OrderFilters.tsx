"use client";

import ClearFiltersButton from "@/components/shared/Management/ClearFiltersButton";
import MultiSelectFilter from "@/components/shared/Management/MultiSelectFilter";

import RefreshButton from "@/components/shared/Management/RefreshButton";
import SearchFilter from "@/components/shared/Management/SearchFilter";

import {
  orderStatusOptions,
  paymentStatusOptions,
  paymentMethodOptions,
} from "@/utils/orderFilterOptions";

const OrderFilters = () => {
  return (
    <div className="space-y-3">
      {/* Row 1: Search and Refresh */}
      <div className="flex items-center gap-3">
        {/* Search orderId, shippingInfo.name, shippingInfo.phone */}
        <SearchFilter
          paramName="searchTerm"
          placeholder="Search Orders (ID, Name, Phone)..."
        />
        <RefreshButton />
      </div>

      {/* Row 2: Filter Controls - Order Status, Payment Status, Payment Method */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Order Status Multi-Select */}
        <MultiSelectFilter
          paramName="currentStatus"
          options={orderStatusOptions}
          placeholder="Filter Status"
          searchPlaceholder="Search status..."
          emptyMessage="No status found."
          showBadges={true}
        />

        {/* Payment Status Multi-Select */}
        <MultiSelectFilter
          paramName="paymentStatus"
          options={paymentStatusOptions}
          placeholder="Filter Payment Status"
          searchPlaceholder="Search payment status..."
          emptyMessage="No payment status found."
          showBadges={true}
        />

        {/* Payment Method Multi-Select */}
        <MultiSelectFilter
          paramName="paymentMethod"
          options={paymentMethodOptions}
          placeholder="Filter Payment Method"
          searchPlaceholder="Search payment method..."
          emptyMessage="No method found."
          showBadges={true}
        />

        {/* Clear All Filters */}
        <ClearFiltersButton />
      </div>
    </div>
  );
};

export default OrderFilters;
