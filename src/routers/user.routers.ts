import { Router } from "express";
import middlewares from "../middlewares";
import { userControllers } from "../controllers";
import { userCreateSchema } from "../schemas";

export const userRouter: Router = Router();

userRouter.use("/:id", middlewares.verifyIdExists);
userRouter.use("/:productId", middlewares.verifyProductIdExists);

userRouter.post(
  "",
  // middlewares.validateBody(userCreateSchema),
  middlewares.verifyEmailExists,
  userControllers.create
);

userRouter.get("", middlewares.isAdmin, userControllers.read);

userRouter.get("/:id", middlewares.isAdmin, userControllers.retrieve);

userRouter.patch(
  "/:id",
  middlewares.verifyToken,
  // middlewares.isAccountOwner,
  userControllers.update
);

userRouter.delete(
  "/:id",
  middlewares.verifyToken,
  // middlewares.isAccountOwner,
  userControllers.destroy
);
