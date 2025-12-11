import { z } from "zod";

const availableStatuses = [
  "Processing",
  "Approved",
  "Shipped",
  "Delivered",
  "Cancelled",
  "Returned",
] as const;

export const orderStatusSchema = z
  .object({
    status: z.enum(availableStatuses),
  })
  .refine((data) => data.status !== undefined, {
    message: "Order status is required.",
    path: ["status"],
  });

export const shippingInfoSchema = z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    address: z.string(),
    division: z.string(),
    district: z.string(),
    city: z.string(),
});


export const paymentMethodSchema = z.object({
    paymentMethod: z.enum(["COD", "SSLCommerz"]),
});





export const orderTraceSchema = z.object({
  // Order ID সাধারণত একটি নির্দিষ্ট স্ট্রিং লেন্থ বা প্যাটার্ন অনুসরণ করে
  orderId: z
    .string()
    .min(5, "অর্ডার নম্বর কমপক্ষে ৫ অক্ষরের হতে হবে।")
    .max(30, "অর্ডার নম্বরটি খুবই বড়।")
    .trim(),
});

export type IOrderTracePayload = z.infer<typeof orderTraceSchema>;