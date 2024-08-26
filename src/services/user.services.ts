import { IUserReturn, UserRead, UserReturn } from "../interfaces";
import { User } from "../entities";
import {
  productRepository,
  userProductRepository,
  userRepository,
} from "../repositories";
import { userReadSchema, userReturnSchema } from "../schemas";
import { DeepPartial } from "typeorm";
import "dotenv/config";

const create = async (payload: any): Promise<UserReturn> => {
  const userCreated: any = userRepository.create(payload);
  await userRepository.save(userCreated);

  return userReturnSchema.parse(userCreated);
};

const read = async (): Promise<UserRead> => {
  const users: UserReturn[] = await userRepository.find();
  return userReadSchema.parse(users);
};

const retrieve = async (id: number): Promise<any> => {
  const user: IUserReturn | null = await userRepository.findOne({
    where: { id },
  });
  return user;
};

const update = async (
  foundUser: IUserReturn,
  payload: DeepPartial<IUserReturn>
): Promise<any> => {
  const userUpdated = await userRepository.save({
    ...foundUser,
    ...payload,
  });

  return userReturnSchema.parse(userUpdated);
};

const destroy = async (user: User): Promise<void> => {
  await userRepository.remove(user);
};

export default {
  create,
  read,
  retrieve,
  update,
  destroy,
};
