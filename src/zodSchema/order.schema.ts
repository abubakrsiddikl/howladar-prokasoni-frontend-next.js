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
    email: z.string().optional(),
    phone: z.string(),
    address: z.string(),
    division: z.string(),
    district: z.string(),
    city: z.string(),
});


export const paymentMethodSchema = z.object({
    paymentMethod: z.enum(["COD", "SSLCommerz"]),
});


// campaign order schema
export const campaignOrderSchema = z.object({
  campaignId: z
    .string()
    .min(1, "Campaign ID is required"),

  orderType: z.literal("CAMPAIGN"),

  shippingInfo: shippingInfoSchema,

  paymentMethod: z.literal("COD"),
});

export const customOrderSchema = z.object({
  orderType: z.enum(["REGULAR", "CAMPAIGN"]),
  orderSource: z.enum(["MESSENGER", "WHATSAPP", "WEBSITE", "OTHER"]),
  totalAmount: z.coerce.number().min(0, "Total amount cannot be negative."),
  deliveryCharge: z.coerce.number().min(0, "Delivery charge cannot be negative."),
  description: z.string().optional(),
  shippingInfo: shippingInfoSchema.extend({
    name: z.string().min(1, "Name is required."),
    phone: z.string().min(1, "Phone number is required."),
    address: z.string().min(1, "Address is required."),
    division: z.string().min(1, "Division is required."),
    district: z.string().min(1, "District is required."),
    city: z.string().min(1, "City is required."),
  }),
  paymentMethod: paymentMethodSchema.shape.paymentMethod,
});

// regular order schema
export const regularOrderSchema = z.object({
  orderType: z.literal("REGULAR"),

  shippingInfo: shippingInfoSchema,

  paymentMethod: paymentMethodSchema.shape.paymentMethod,

  items: z
    .array(
      z.object({
        book: z.string().min(1),
        quantity: z.number().int().min(1),
      })
    )
    .min(1, "কমপক্ষে একটি বই নির্বাচন করুন।"),
});


export const orderTraceSchema = z.object({
  orderId: z
    .string()
    .min(5, "অর্ডার নম্বর কমপক্ষে ৫ অক্ষরের হতে হবে।")
    .max(30, "অর্ডার নম্বরটি খুবই বড়।")
    .trim(),
});

export type IOrderTracePayload = z.infer<typeof orderTraceSchema>;