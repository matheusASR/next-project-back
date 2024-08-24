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

const addToList = async (userId: number, productId: number): Promise<User> => {
  const user: any = await userRepository.findOne({
    where: { id: userId },
    relations: ["userProducts"],
  });

  const product: any = await productRepository.findOne({
    where: { id: productId },
  });

  if (!user.products.some((p: any) => p.id === productId)) {
    const userProduct: any = userProductRepository.create({ user, product });
    await userProductRepository.save(userProduct);
  }
  await userRepository.save(user);

  return user;
};

const removeFromList = async (
  userId: number,
  productId: number
): Promise<User> => {
  const user: any = await userRepository.findOne({
    where: { id: userId },
    relations: ["userProducts"],
  });

  const userProduct = await userProductRepository.findOne({
    where: { user: { id: userId }, product: { id: productId } },
  });

  if (userProduct) {
    await userProductRepository.remove(userProduct);
  }

  return user;
};

export default {
  create,
  read,
  retrieve,
  update,
  destroy,
  addToList,
  removeFromList,
};
