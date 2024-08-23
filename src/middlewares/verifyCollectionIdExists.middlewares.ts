import { NextFunction, Request, Response } from "express";
import { Collection } from "../entities";
import { collectionRepository } from "../repositories";
import { AppError } from "../errors";

export const verifyCollectionIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id: number = Number(req.params.id);

  const foundCollection: Collection | null = await collectionRepository.findOneBy({ id });
  if (!foundCollection) throw new AppError("Coleção não encontrada!", 404);

  res.locals = { ...res.locals, foundCollection };

  return next();
};
