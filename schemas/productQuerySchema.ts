import { z } from "zod";

export const queriesSchema = z.object({
  brand: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  searchTerm: z.string().optional(),
});

export const paginationSchema = z.object({
  pageIndex: z.number().nonnegative().default(0),
  productsPerPage: z.number().positive().nullable().default(null),
});
