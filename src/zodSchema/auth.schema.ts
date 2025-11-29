import z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .min(3, { message: "Name is too short" })
      .max(50, { message: "Name is too long" }),

    email: z.email({ message: "Invalid email address" }),
    phone: z
      .string({ message: "Phone number is required" })
      .min(11, { message: "Phone number is too short" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" }),

    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" })
      .min(8, { message: "Confirm Password must be at least 8 characters" }),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept Terms & Conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
});
