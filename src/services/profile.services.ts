import { IUserReturn } from "../interfaces";
import { userRepository } from "../repositories";
import { userReturnSchema } from "../schemas";

const retrieve = async (id: any): Promise<any> => {
  const user: IUserReturn | null = await userRepository.findOne({
    where: { id },
    relations: ["products", "products.collection"]
  });

  return userReturnSchema.parse(user);
};

export default { retrieve };
