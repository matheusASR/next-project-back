import { handleError } from "./handleErrors.middlewares";
import { verifyToken } from "./verifyToken.middlewares";
import { verifyIdExists } from "./verifyIdExists.middlewares";
import { verifyCollectionIdExists } from "./verifyCollectionIdExists.middlewares";
import { verifyProductIdExists } from "./verifyProductIdExists.middlewares";
import { verifyEmailExists } from "./verifyEmailExists.middlewares";
import { validateBody } from "./validateBody.middlewares";
import { isAccountOwner } from "./isAccountOwner.middlewares";
import { isAdmin } from "./isAdmin.middlewares";

export default {
  handleError,
  verifyToken,
  verifyIdExists,
  verifyEmailExists,
  validateBody,
  isAccountOwner,
  isAdmin,
  verifyCollectionIdExists,
  verifyProductIdExists,
};
