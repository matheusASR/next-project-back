import { Router } from "express";
import middlewares from "../middlewares";
import { collectionControllers } from "../controllers";
import { collectionCreateSchema } from "../schemas";

export const collectionRouter: Router = Router();

collectionRouter.use("/:id", middlewares.verifyCollectionIdExists);

collectionRouter.post(
  "",
  middlewares.validateBody(collectionCreateSchema),
  //   middlewares.verifyCollectionNameExists,
  collectionControllers.create
);

collectionRouter.get("", middlewares.verifyToken, collectionControllers.read);

collectionRouter.get("/:id", collectionControllers.retrieve);

collectionRouter.patch(
  "/:id",
  // middlewares.isAccountOwner,
  collectionControllers.update
);

collectionRouter.delete(
  "/:id",
  // middlewares.isAccountOwner,
  collectionControllers.destroy
);
