import { User } from "../entities";
import {
  productRepository,
  userProductRepository,
  userRepository,
} from "../repositories";
import { userReturnSchema } from "../schemas";

const addToList = async (userId: number, productId: number): Promise<any> => {
  console.log(`userId: ${userId}, productId: ${productId}`); // Verifique os valores

  const user: any = await userRepository.findOne({
    where: { id: userId },
    relations: ["products", "products.collection"],
  });

  if (!user) {
    throw new Error(`User with id ${userId} not found`);
  }

  const product: any = await productRepository.findOne({
    where: { id: productId },
  });

  if (!product) {
    throw new Error(`Product with id ${productId} not found`);
  }

  if (!user.products.some((p: any) => p.id === productId)) {
    user.products.push(product); // Adiciona o produto ao usuário
    await userRepository.save(user); // Salva as alterações
  }

  return userReturnSchema.parse(user);
};

const removeFromList = async (
  userId: number,
  productId: number
): Promise<any> => {
  // Encontra o usuário com os produtos relacionados
  const user: any = await userRepository.findOne({
    where: { id: userId },
    relations: ["products", "products.collection"],
  });

  if (!user) {
    throw new Error(`User with id ${userId} not found`);
  }

  // Encontra o produto associado ao usuário
  const product: any = await productRepository.findOne({
    where: { id: productId },
  });

  if (!product) {
    throw new Error(`Product with id ${productId} not found`);
  }

  // Remove o produto da lista de produtos do usuário
  user.products = user.products.filter((p: any) => p.id !== productId);

  // Salva as alterações do usuário
  await userRepository.save(user);

  return userReturnSchema.parse(user);
};

export default {
  addToList,
  removeFromList,
};
