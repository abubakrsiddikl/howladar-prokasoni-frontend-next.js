import { z } from "zod";

export const bannerSchema = z.object({
  title: z.string().min(1, "Title is required"),

  link: z.string().optional(),

  active: z.boolean(),

  startDate: z.string().optional(),

  endDate: z.string().optional(),
});

export const validatedBannerSchema = bannerSchema.refine(
  (data) => {
    if (data.startDate && data.endDate) {
      return new Date(data.startDate) < new Date(data.endDate);
    }
    return true;
  },
  {
    message: "Start date must be before the end date.",
    path: ["startDate"],
  }
);
