import { Request, Response } from "express";
import { userProductServices } from "../services";

const addToList = async (req: Request, res: Response): Promise<any> => {
  const userId: number = Number(req.params.id);
  const productId: number = Number(req.params.productId);

  try {
    await userProductServices.addToList(userId, productId);
    return res.status(200).json({});
  } catch (error: any) {
    return res.status(500).json({});
  }
};

const removeFromList = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = Number(req.params.id);
  const productId: number = Number(req.params.productId);
  await userProductServices.removeFromList(userId, productId);
  return res.status(200).json();
};

export default {
    addToList,
    removeFromList
  };