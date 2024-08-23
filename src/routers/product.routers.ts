import { Router } from "express";
import middlewares from "../middlewares";
import { productControllers } from "../controllers";
import { productCreateSchema } from "../schemas";

export const productRouter: Router = Router();

productRouter.use("/:id", middlewares.verifyProductIdExists);

productRouter.post(
  "",
  middlewares.validateBody(productCreateSchema),
  //   middlewares.verifyProductNameExists,
  productControllers.create
);

productRouter.get("", productControllers.read);

productRouter.get("/:id", productControllers.retrieve);

productRouter.patch(
  "/:id",
  // middlewares.isAccountOwner,
  productControllers.update
);

productRouter.delete(
  "/:id",
  // middlewares.isAccountOwner,
  productControllers.destroy
);
