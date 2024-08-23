import { z } from "zod";

const productSchema = z.object({
  id: z.number().positive(),
  title: z.string().max(100),
  content: z.object({
    // campos
  }),
  coverImage: z.string().max(255),
});
const productCreateSchema = productSchema.omit({ id: true });
const productReturnSchema = productSchema;
const productReadSchema = productReturnSchema.array();

export {
  productSchema,
  productCreateSchema,
  productReturnSchema,
  productReadSchema,
};
