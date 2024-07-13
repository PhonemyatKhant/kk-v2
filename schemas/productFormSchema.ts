import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string().min(1, "This field cannnot be empty"),
  brand: z.string().min(1, "This field cannnot be empty"),
  category: z.string().min(1, "This field cannnot be empty"),
  image: z
    .string()
    .array()
    .min(1, { message: "At least one image is required" }),
  countInStock: z.number(),
  price: z.number().min(1, "This field cannnot be empty"),
  discountPercentage: z.number().optional(),
  description: z
    .string()
    .max(100, { message: "Must be less than 100 characters" }),
});
