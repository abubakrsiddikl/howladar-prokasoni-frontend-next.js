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
