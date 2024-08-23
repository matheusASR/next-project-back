import { z } from "zod";
import {
  collectionCreateSchema,
  collectionReadSchema,
  collectionReturnSchema,
  collectionSchema,
} from "../schemas";
import { Repository } from "typeorm";
import { Collection } from "../entities";

type ICollectionReturn = z.infer<typeof collectionSchema>;
type CollectionCreate = z.infer<typeof collectionCreateSchema>;
type CollectionRead = z.infer<typeof collectionReadSchema>;
type CollectionReturn = z.infer<typeof collectionReturnSchema>;

type CollectionRepo = Repository<Collection>;

export {
  CollectionCreate,
  CollectionRead,
  CollectionReturn,
  CollectionRepo,
  ICollectionReturn,
};
