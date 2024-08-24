import {
  ICollectionReturn,
  CollectionRead,
  CollectionReturn,
} from "../interfaces";
import { Collection } from "../entities";
import { collectionRepository } from "../repositories";
import { collectionReadSchema, collectionReturnSchema } from "../schemas";
import { DeepPartial } from "typeorm";
import "dotenv/config";

const create = async (payload: any): Promise<CollectionReturn> => {
  const collectionCreated: any = collectionRepository.create(payload);
  await collectionRepository.save(collectionCreated);

  return collectionReturnSchema.parse(collectionCreated);
};

const read = async (): Promise<CollectionRead> => {
  const collections: CollectionReturn[] = await collectionRepository.find();
  return collectionReadSchema.parse(collections);
};

const retrieve = async (id: number): Promise<ICollectionReturn | null> => {
  const collection: ICollectionReturn | null =
    await collectionRepository.findOne({
      where: { id },
      relations: ["products"],
    });

  return collection;
};

const update = async (
  foundCollection: ICollectionReturn,
  payload: DeepPartial<ICollectionReturn>
): Promise<any> => {
  const collectionUpdated = await collectionRepository.save({
    ...foundCollection,
    ...payload,
  });

  return collectionReturnSchema.parse(collectionUpdated);
};

const destroy = async (collection: Collection): Promise<void> => {
  await collectionRepository.remove(collection);
};

export default { create, read, retrieve, update, destroy };
