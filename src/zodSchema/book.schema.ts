import { z } from "zod";

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),

  author: z.string().min(1, "Author is required"),

  price: z.coerce.number({
    message: "Price is required",
  }),

  stock: z.coerce
    .number({
      message: "Stock is required",
    })
    .min(0, "Stock cannot be negative"),

  genre: z.string({ message: "Genre is required" }),

  publisher: z.string().min(1, "Publisher is required"),

  discount: z.coerce
    .number({
      message: "Discount must be a number",
    })
    .min(0, "Discount cannot be less than 0")
    .max(100, "Discount cannot be more than 100"),

  description: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .optional(),
});
