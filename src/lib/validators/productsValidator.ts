import { z } from "zod";

export const ProductsValidator = z.object({
  code: z.number(),
  name: z.string(),
  category: z.string(),
  image: z.string(),
  isOffer: z.boolean(),
  offer: z.number(),
  description: z.string(),
});

export type ProductsValidator = z.infer<typeof ProductsValidator>;
