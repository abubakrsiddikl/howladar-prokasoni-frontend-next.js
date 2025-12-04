// orderFilterOptions.ts

// আপনার ইন্টারফেস থেকে ইমপোর্ট করুন

// constants/payment.constants.ts

export const PaymentMethod = {
  COD: "COD",
  SSLCommerz: "SSLCommerz",
} as const; // 'as const' ব্যবহার করা হয়েছে যাতে TypeScript টাইপগুলো শক্তভাবে ধরে

export const PaymentStatus = {
  Paid: "Paid",
  Pending: "Pending",
  Cancelled: "Cancelled",
} as const;

export const OrderStatus = {
  Processing: "Processing",
  Approved: "Approved",
  Shipped: "Shipped",
  Delivered: "Delivered",
  Cancelled: "Cancelled",
  Returned: "Returned",
} as const;

export const orderStatusOptions = Object.values(OrderStatus).map((status) => ({
  value: status,
  label: status,
}));

export const paymentStatusOptions = Object.values(PaymentStatus).map(
  (status) => ({
    value: status,
    label: status,
  })
);

export const paymentMethodOptions = Object.values(PaymentMethod).map(
  (method) => ({
    value: method,
    label: method,
  })
);
