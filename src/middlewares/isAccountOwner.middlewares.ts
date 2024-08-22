import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

export const isAccountOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id: number = Number(req.params.id);

  if (Number(res.locals.userID) !== id) {
    throw new AppError(
      "Você não é o dono da conta!",
      401
    );
  }

  return next();
};
