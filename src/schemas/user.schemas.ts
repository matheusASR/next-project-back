import { z } from "zod";

const userSchema = z.object({
  id: z.number().positive(),
  username: z.string().max(100),
  firstName: z.string().max(100),
  lastName: z.string().max(100),
  email: z.string().max(100),
  country: z.string().max(100),
  password: z.string().max(120),
  admin: z.boolean().default(false),
});

const userLoginSchema = z.object({
  email: z.string().max(100),
  password: z.string().max(120),
});

const userCreateSchema = userSchema.omit({ id: true });
const userReturnSchema = userSchema.omit({
  password: true,
});
const userReadSchema = userReturnSchema.array();

export {
  userSchema,
  userCreateSchema,
  userReturnSchema,
  userReadSchema,
  userLoginSchema,
};
