import { z } from "zod";

const productSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(100),
  description: z.string().max(255),
  content: z.object({
    // campos
  }),
  coverImage: z.string().max(255),
});
const productCreateSchema = z.object({
  name: z.string().max(100),
  description: z.string().max(255),
  content: z.object({
    // campos
  }),
  coverImage: z.string().max(255),
  collection: z.string().max(255),
});
const productReturnSchema = productSchema;
const productReadSchema = productReturnSchema.array();

export {
  productSchema,
  productCreateSchema,
  productReturnSchema,
  productReadSchema,
};
