import { z } from "zod";

export const validatedCampaignSchema = z.object({
  title: z.string().min(1, "Title is required"),
  // slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  campaignPrice: z.coerce.number().min(1, "Price must be greater than 0"),
  isDeliveryFree: z.boolean().default(true),
  // deliveryCharge: z.coerce.number().min(0, "Delivery charge cannot be negative").default(60),
  isActive: z.boolean().default(true),
});
