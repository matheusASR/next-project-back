import { z } from "zod";

const collectionSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(100),
  description: z.string().max(100),
  coverImage: z.string().max(255),

});
const collectionCreateSchema = collectionSchema.omit({ id: true });
const collectionReturnSchema = collectionSchema;
const collectionReadSchema = collectionReturnSchema.array();

export {
  collectionSchema,
  collectionCreateSchema,
  collectionReturnSchema,
  collectionReadSchema,
};
