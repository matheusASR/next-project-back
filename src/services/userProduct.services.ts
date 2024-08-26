import { User } from "../entities";
import {
  productRepository,
  userProductRepository,
  userRepository,
} from "../repositories";

const addToList = async (userId: number, productId: number): Promise<User> => {
  console.log(`userId: ${userId}, productId: ${productId}`); // Verifique os valores

  const user: any = await userRepository.findOne({
    where: { id: userId },
    relations: ["products"],
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

  return user;
};

const removeFromList = async (
  userId: number,
  productId: number
): Promise<User> => {
  // Encontra o usuário com os produtos relacionados
  const user: any = await userRepository.findOne({
    where: { id: userId },
    relations: ["products"],
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

  return user;
};

export default {
  addToList,
  removeFromList,
};
