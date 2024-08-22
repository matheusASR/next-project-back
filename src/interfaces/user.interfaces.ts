import { z } from "zod";
import {
  userCreateSchema,
  userReadSchema,
  userReturnSchema,
  userSchema,
} from "../schemas";
import { Repository } from "typeorm";
import { User } from "../entities";

type IUserReturn = z.infer<typeof userSchema>;
type UserCreate = z.infer<typeof userCreateSchema>;
type UserRead = z.infer<typeof userReadSchema>;
type UserReturn = z.infer<typeof userReturnSchema>;

type UserRepo = Repository<User>;

export { UserCreate, UserRead, UserReturn, UserRepo, IUserReturn };
