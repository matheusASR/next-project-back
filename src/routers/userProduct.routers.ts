import { Router } from "express";
import middlewares from "../middlewares";
import { userProductControllers } from "../controllers";

export const userProductRouter: Router = Router();

// userProductRouter.use("/:id", middlewares.verifyIdExists);
// userProductRouter.use("/:productId", middlewares.verifyProductIdExists);

userProductRouter.post(
  "/:id/:productId",
  userProductControllers.addToList
);

userProductRouter.delete(
  "/:id/:productId",
  userProductControllers.removeFromList
);
