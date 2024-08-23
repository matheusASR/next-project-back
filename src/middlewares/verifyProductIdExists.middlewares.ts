import { NextFunction, Request, Response } from "express";
import { Product } from "../entities";
import { productRepository } from "../repositories";
import { AppError } from "../errors";

export const verifyProductIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id: number = Number(req.params.id);

  const foundProduct: Product | null = await productRepository.findOneBy({ id });
  if (!foundProduct) throw new AppError("Produto não encontrado!", 404);

  res.locals = { ...res.locals, foundProduct };

  return next();
};