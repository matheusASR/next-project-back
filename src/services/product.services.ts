import { IProductReturn, ProductRead, ProductReturn } from "../interfaces";
import { Product } from "../entities";
import { collectionRepository, productRepository } from "../repositories";
import { productReadSchema, productReturnSchema } from "../schemas";
import { DeepPartial } from "typeorm";
import "dotenv/config";

const create = async (payload: any): Promise<ProductReturn> => {
  const collection: any = await collectionRepository.findOne({
    where: { name: payload.collection },
  });

  const newPayload = {
    ...payload, 
    collection: collection.id, 
  };

  const productCreated: any = productRepository.create(newPayload);
  await productRepository.save(productCreated);

  return productReturnSchema.parse(productCreated);
};

const read = async (): Promise<ProductRead> => {
  const products: ProductReturn[] = await productRepository.find();
  return productReadSchema.parse(products);
};

const retrieve = async (id: number): Promise<any> => {
  const product: IProductReturn | null = await productRepository.findOne({
    where: { id },
  });
  return product;
};

const update = async (
  foundProduct: IProductReturn,
  payload: DeepPartial<IProductReturn>
): Promise<any> => {
  const productUpdated = await productRepository.save({
    ...foundProduct,
    ...payload,
  });

  return productReturnSchema.parse(productUpdated);
};

const destroy = async (product: Product): Promise<void> => {
  await productRepository.remove(product);
};

export default { create, read, retrieve, update, destroy };
