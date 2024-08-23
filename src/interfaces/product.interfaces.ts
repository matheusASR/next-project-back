import { z } from "zod";
import {
  productCreateSchema,
  productReadSchema,
  productReturnSchema,
  productSchema,
} from "../schemas";
import { Repository } from "typeorm";
import { Product } from "../entities";

type IProductReturn = z.infer<typeof productSchema>;
type ProductCreate = z.infer<typeof productCreateSchema>;
type ProductRead = z.infer<typeof productReadSchema>;
type ProductReturn = z.infer<typeof productReturnSchema>;

type ProductRepo = Repository<Product>;

export {
  ProductCreate,
  ProductRead,
  ProductReturn,
  ProductRepo,
  IProductReturn,
};
