import { Request, Response } from "express";
import { userProductServices } from "../services";

const addToList = async (req: Request, res: Response): Promise<any> => {
  const userId: number = Number(req.params.id);
  const productId: number = Number(req.params.productId);

  const response = await userProductServices.addToList(userId, productId);
  return res.status(200).json(response);
};

const removeFromList = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = Number(req.params.id);
  const productId: number = Number(req.params.productId);
  const response = await userProductServices.removeFromList(userId, productId);
  return res.status(200).json(response);
};

export default {
  addToList,
  removeFromList,
};
